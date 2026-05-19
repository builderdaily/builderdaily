from internal_link_agent.web import run_audit_from_csv_text


def test_run_audit_from_csv_text_returns_summary_and_exports():
    result = run_audit_from_csv_text(
        site_url="https://example.com",
        csv_text=(
            "url,title,content,categories,tags,published_at,priority\n"
            'https://example.com/a/,Internal Links,"WordPress SEO orphan pages.",SEO,links,,\n'
            'https://example.com/b/,Orphan Pages,"How to fix orphan pages.",SEO,orphan pages,,\n'
        ),
    )

    assert result.error is None
    assert result.summary["pages"] == 2
    assert result.summary["orphan_pages"] == 2
    assert "Internal Link Audit Report" in result.markdown_report
    assert "source_url,target_url" in result.csv_export
