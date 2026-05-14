from pathlib import Path

from internal_link_agent import cli as cli_module
from internal_link_agent.cli import main
from internal_link_agent.models import ImportResult, Page


def test_cli_audit_writes_csv_and_markdown_outputs(tmp_path: Path):
    input_csv = tmp_path / "site.csv"
    input_csv.write_text(
        "url,title,content,categories,tags,published_at,priority\n"
        'https://example.com/a/,Internal Links,"WordPress SEO orphan pages and content audit.",SEO,links,,\n'
        'https://example.com/b/,Orphan Pages,"How to fix orphan pages.",SEO,orphan pages,,\n',
        encoding="utf-8",
    )
    out_dir = tmp_path / "audit"

    exit_code = main(
        [
            "audit",
            "--csv",
            str(input_csv),
            "--site-url",
            "https://example.com",
            "--out-dir",
            str(out_dir),
        ]
    )

    assert exit_code == 0
    assert (out_dir / "suggestions.csv").exists()
    assert (out_dir / "report.md").exists()
    assert "Internal Link Audit Report" in (out_dir / "report.md").read_text(encoding="utf-8")


def test_cli_audit_accepts_sitemap_input(monkeypatch, tmp_path: Path):
    def fake_load_pages_from_sitemap(*args, **kwargs):
        return ImportResult(
            pages=[
                Page(
                    url="https://example.com/a/",
                    title="Internal Links",
                    content="WordPress SEO orphan pages.",
                    categories=("SEO",),
                ),
                Page(
                    url="https://example.com/b/",
                    title="Orphan Pages",
                    content="How to fix orphan pages.",
                    categories=("SEO",),
                ),
            ],
            warnings=("Failed to fetch https://example.com/missing/: blocked",),
        )

    monkeypatch.setattr(cli_module, "load_pages_from_sitemap", fake_load_pages_from_sitemap)
    out_dir = tmp_path / "audit"

    exit_code = main(
        [
            "audit",
            "--sitemap",
            "https://example.com/sitemap.xml",
            "--site-url",
            "https://example.com",
            "--out-dir",
            str(out_dir),
        ]
    )

    report = (out_dir / "report.md").read_text(encoding="utf-8")
    assert exit_code == 0
    assert "Warnings" in report
    assert "Failed to fetch https://example.com/missing/: blocked" in report
