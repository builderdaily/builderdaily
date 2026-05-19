from __future__ import annotations

import argparse
import csv
import html
import io
from dataclasses import dataclass
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs

from internal_link_agent.analyzer import analyze_pages
from internal_link_agent.importers import load_pages_from_csv_text
from internal_link_agent.models import LinkSuggestion
from internal_link_agent.reporting import render_markdown_report
from internal_link_agent.suggestions import generate_suggestions

_ROOT = Path(__file__).resolve().parents[2]
_DEMO_CSV_PATH = _ROOT / "samples" / "demo_site.csv"


@dataclass(frozen=True)
class WebAuditResult:
    site_url: str
    csv_text: str
    summary: dict[str, int]
    suggestions: list[LinkSuggestion]
    csv_export: str
    markdown_report: str
    error: str | None = None


def run_audit_from_csv_text(site_url: str, csv_text: str) -> WebAuditResult:
    try:
        pages = load_pages_from_csv_text(csv_text)
        audit = analyze_pages(pages, site_url=site_url)
        suggestions = generate_suggestions(audit, site_url=site_url)
        return WebAuditResult(
            site_url=site_url,
            csv_text=csv_text,
            summary={
                "pages": len(audit.pages),
                "links": len(audit.links),
                "orphan_pages": len(audit.orphan_urls),
                "weak_pages": len(audit.weak_urls),
                "suggestions": len(suggestions),
            },
            suggestions=suggestions,
            csv_export=_suggestions_to_csv_text(suggestions),
            markdown_report=render_markdown_report(audit, suggestions, site_url=site_url),
        )
    except Exception as exc:
        return WebAuditResult(
            site_url=site_url,
            csv_text=csv_text,
            summary={"pages": 0, "links": 0, "orphan_pages": 0, "weak_pages": 0, "suggestions": 0},
            suggestions=[],
            csv_export="",
            markdown_report="",
            error=str(exc),
        )


def demo_result() -> WebAuditResult:
    csv_text = _DEMO_CSV_PATH.read_text(encoding="utf-8")
    return run_audit_from_csv_text(site_url="https://example.com", csv_text=csv_text)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="internal-link-agent-web")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args(argv)
    server = ThreadingHTTPServer((args.host, args.port), _Handler)
    print(f"Internal Link Agent demo running at http://{args.host}:{args.port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        return 0
    finally:
        server.server_close()
    return 0


def _suggestions_to_csv_text(suggestions: list[LinkSuggestion]) -> str:
    handle = io.StringIO()
    writer = csv.DictWriter(
        handle,
        fieldnames=[
            "source_url",
            "target_url",
            "anchor_text",
            "insertion_context",
            "reason",
            "confidence",
            "issue_type",
            "status",
        ],
        lineterminator="\n",
    )
    writer.writeheader()
    for suggestion in suggestions:
        writer.writerow(
            {
                "source_url": suggestion.source_url,
                "target_url": suggestion.target_url,
                "anchor_text": suggestion.anchor_text,
                "insertion_context": suggestion.insertion_context,
                "reason": suggestion.reason,
                "confidence": suggestion.confidence,
                "issue_type": suggestion.issue_type,
                "status": suggestion.status,
            }
        )
    return handle.getvalue()


class _Handler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        if self.path == "/favicon.ico":
            self.send_response(HTTPStatus.NO_CONTENT)
            self.end_headers()
            return
        if self.path not in {"/", "/audit"}:
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        self._send_html(_render_page(demo_result()))

    def do_POST(self) -> None:
        if self.path != "/audit":
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        length = int(self.headers.get("Content-Length", "0"))
        body = self.rfile.read(length).decode("utf-8", errors="replace")
        form = parse_qs(body, keep_blank_values=True)
        site_url = form.get("site_url", ["https://example.com"])[0].strip() or "https://example.com"
        csv_text = form.get("csv_text", [""])[0]
        self._send_html(_render_page(run_audit_from_csv_text(site_url=site_url, csv_text=csv_text)))

    def log_message(self, format: str, *args: object) -> None:
        return

    def _send_html(self, body: str) -> None:
        encoded = body.encode("utf-8")
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)


def _render_page(result: WebAuditResult) -> str:
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Internal Link Agent Demo</title>
  <style>
    :root {{
      --bg: #f7f8fa;
      --panel: #ffffff;
      --text: #17202a;
      --muted: #667085;
      --line: #d9dee8;
      --accent: #0f766e;
      --accent-dark: #115e59;
      --amber: #b45309;
      --blue: #1d4ed8;
      --shadow: 0 18px 55px rgba(23, 32, 42, 0.08);
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      letter-spacing: 0;
    }}
    header {{
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 28px;
      background: #ffffff;
      border-bottom: 1px solid var(--line);
    }}
    .brand {{
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 760;
      font-size: 17px;
    }}
    .mark {{
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      border-radius: 7px;
      background: var(--accent);
      color: white;
      font-weight: 800;
    }}
    .status {{
      color: var(--muted);
      font-size: 13px;
    }}
    main {{
      max-width: 1440px;
      margin: 0 auto;
      padding: 24px;
      display: grid;
      grid-template-columns: minmax(360px, 0.42fr) minmax(520px, 0.58fr);
      gap: 20px;
    }}
    section {{
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      box-shadow: var(--shadow);
      min-width: 0;
    }}
    .input-panel {{
      padding: 18px;
      align-self: start;
    }}
    .results-panel {{
      overflow: hidden;
    }}
    h1 {{
      margin: 0;
      font-size: 22px;
      line-height: 1.25;
    }}
    h2 {{
      margin: 0;
      font-size: 15px;
      line-height: 1.3;
    }}
    label {{
      display: block;
      color: #344054;
      font-size: 13px;
      font-weight: 650;
      margin-bottom: 7px;
    }}
    input, textarea {{
      width: 100%;
      border: 1px solid #cfd6e2;
      border-radius: 6px;
      background: #ffffff;
      color: var(--text);
      font: 13px/1.45 ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
      outline: none;
    }}
    input {{
      height: 38px;
      padding: 0 11px;
      font-family: inherit;
    }}
    textarea {{
      min-height: 390px;
      resize: vertical;
      padding: 11px;
    }}
    input:focus, textarea:focus {{
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.12);
    }}
    .field {{ margin-bottom: 14px; }}
    .actions {{
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }}
    button, .link-button {{
      height: 38px;
      border: 0;
      border-radius: 6px;
      padding: 0 14px;
      font: 700 13px/1 inherit;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }}
    button {{
      background: var(--accent);
      color: #ffffff;
    }}
    button:hover {{ background: var(--accent-dark); }}
    .link-button {{
      color: var(--accent-dark);
      background: #e6f4f1;
    }}
    .result-head {{
      padding: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      border-bottom: 1px solid var(--line);
    }}
    .metrics {{
      display: grid;
      grid-template-columns: repeat(5, minmax(84px, 1fr));
      border-bottom: 1px solid var(--line);
      background: #fbfcfe;
    }}
    .metric {{
      padding: 14px 16px;
      border-right: 1px solid var(--line);
    }}
    .metric:last-child {{ border-right: 0; }}
    .metric strong {{
      display: block;
      font-size: 24px;
      line-height: 1;
    }}
    .metric span {{
      display: block;
      margin-top: 6px;
      color: var(--muted);
      font-size: 12px;
      font-weight: 650;
    }}
    .error {{
      margin: 18px;
      padding: 12px;
      border: 1px solid #fecaca;
      border-radius: 6px;
      background: #fff1f2;
      color: #991b1b;
      font-size: 13px;
    }}
    .table-wrap {{
      overflow-x: auto;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }}
    th, td {{
      padding: 12px 14px;
      border-bottom: 1px solid var(--line);
      text-align: left;
      vertical-align: top;
    }}
    th {{
      color: #475467;
      background: #ffffff;
      font-size: 12px;
      text-transform: uppercase;
    }}
    td a {{
      color: var(--blue);
      text-decoration: none;
      word-break: break-word;
    }}
    .confidence {{
      display: inline-flex;
      min-width: 38px;
      justify-content: center;
      border-radius: 999px;
      padding: 4px 8px;
      background: #ecfdf3;
      color: #027a48;
      font-weight: 760;
    }}
    .issue {{
      color: var(--amber);
      font-weight: 720;
    }}
    .exports {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      padding: 18px;
      background: #fbfcfe;
    }}
    .export-box textarea {{
      min-height: 220px;
      background: #ffffff;
    }}
    @media (max-width: 980px) {{
      header {{ padding: 0 16px; }}
      main {{
        grid-template-columns: 1fr;
        padding: 16px;
      }}
      .metrics {{
        grid-template-columns: repeat(2, 1fr);
      }}
      .exports {{
        grid-template-columns: 1fr;
      }}
    }}
  </style>
</head>
<body>
  <header>
    <div class="brand"><div class="mark">IL</div><div>Internal Link Agent</div></div>
    <div class="status">Local demo · read-only</div>
  </header>
  <main>
    <section class="input-panel">
      <form method="post" action="/audit">
        <div class="field">
          <label for="site_url">Site URL</label>
          <input id="site_url" name="site_url" value="{_e(result.site_url)}">
        </div>
        <div class="field">
          <label for="csv_text">CSV</label>
          <textarea id="csv_text" name="csv_text" spellcheck="false">{_e(result.csv_text)}</textarea>
        </div>
        <div class="actions">
          <button type="submit">Run audit</button>
          <a class="link-button" href="/">Reset demo</a>
        </div>
      </form>
    </section>
    <section class="results-panel">
      <div class="result-head">
        <div>
          <h1>Audit demo</h1>
        </div>
        <div class="status">{_e(result.site_url)}</div>
      </div>
      {_render_metrics(result)}
      {_render_error(result)}
      {_render_table(result.suggestions)}
      <div class="exports">
        <div class="export-box">
          <label for="csv_export">suggestions.csv</label>
          <textarea id="csv_export" readonly>{_e(result.csv_export)}</textarea>
        </div>
        <div class="export-box">
          <label for="markdown_report">report.md</label>
          <textarea id="markdown_report" readonly>{_e(result.markdown_report)}</textarea>
        </div>
      </div>
    </section>
  </main>
</body>
</html>"""


def _render_metrics(result: WebAuditResult) -> str:
    labels = [
        ("pages", "Pages"),
        ("links", "Links"),
        ("orphan_pages", "Orphans"),
        ("weak_pages", "Weak"),
        ("suggestions", "Ideas"),
    ]
    items = "".join(
        f'<div class="metric"><strong>{result.summary[key]}</strong><span>{label}</span></div>' for key, label in labels
    )
    return f'<div class="metrics">{items}</div>'


def _render_error(result: WebAuditResult) -> str:
    if not result.error:
        return ""
    return f'<div class="error">{_e(result.error)}</div>'


def _render_table(suggestions: list[LinkSuggestion]) -> str:
    if not suggestions:
        return '<div class="error">No suggestions generated for this input.</div>'
    rows = []
    for suggestion in suggestions:
        rows.append(
            "<tr>"
            f'<td><a href="{_e(suggestion.source_url)}">{_e(suggestion.source_url)}</a></td>'
            f'<td><a href="{_e(suggestion.target_url)}">{_e(suggestion.target_url)}</a></td>'
            f"<td>{_e(suggestion.anchor_text)}</td>"
            f'<td><span class="issue">{_e(suggestion.issue_type)}</span></td>'
            f'<td><span class="confidence">{suggestion.confidence}</span></td>'
            f"<td>{_e(suggestion.reason)}</td>"
            "</tr>"
        )
    return (
        '<div class="table-wrap"><table><thead><tr>'
        "<th>Source</th><th>Target</th><th>Anchor</th><th>Issue</th><th>Score</th><th>Reason</th>"
        "</tr></thead><tbody>"
        + "".join(rows)
        + "</tbody></table></div>"
    )


def _e(value: object) -> str:
    return html.escape(str(value), quote=True)


if __name__ == "__main__":
    raise SystemExit(main())
