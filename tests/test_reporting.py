import csv
from pathlib import Path

from internal_link_agent.analyzer import analyze_pages
from internal_link_agent.models import LinkSuggestion, Page
from internal_link_agent.reporting import render_markdown_report, write_suggestions_csv


def test_write_suggestions_csv_is_google_sheets_friendly(tmp_path: Path):
    suggestion = LinkSuggestion(
        source_url="https://example.com/a/",
        target_url="https://example.com/b/",
        anchor_text="orphan pages",
        insertion_context="Text about orphan pages.",
        reason="High topical overlap.",
        confidence=82,
        issue_type="orphan",
    )
    output = tmp_path / "suggestions.csv"

    write_suggestions_csv([suggestion], output)

    rows = list(csv.DictReader(output.open(encoding="utf-8-sig")))
    assert rows[0]["source_url"] == "https://example.com/a/"
    assert rows[0]["status"] == "pending"
    assert rows[0]["confidence"] == "82"


def test_render_markdown_report_includes_client_summary():
    pages = [
        Page(url="https://example.com/a/", title="Alpha", content='<a href="/b/">Beta</a>'),
        Page(url="https://example.com/b/", title="Beta", content="Body"),
        Page(url="https://example.com/c/", title="Gamma", content="Body"),
    ]
    result = analyze_pages(pages, site_url="https://example.com")
    suggestion = LinkSuggestion(
        source_url="https://example.com/a/",
        target_url="https://example.com/c/",
        anchor_text="Gamma",
        insertion_context="Body",
        reason="Target is orphan with topical overlap.",
        confidence=75,
        issue_type="orphan",
    )

    report = render_markdown_report(result, [suggestion], site_url="https://example.com")

    assert "# Internal Link Audit Report" in report
    assert "Pages scanned: 3" in report
    assert "Orphan pages: 2" in report
    assert "https://example.com/c/" in report
