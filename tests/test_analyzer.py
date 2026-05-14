from internal_link_agent.analyzer import analyze_pages
from internal_link_agent.models import Page


def test_analyze_pages_counts_inbound_internal_links_and_marks_orphans():
    pages = [
        Page(
            url="https://example.com/a/",
            title="Alpha",
            content='<p>Read <a href="/b/">Beta guide</a>.</p>',
        ),
        Page(url="https://example.com/b/", title="Beta", content="<p>Useful beta guide.</p>"),
        Page(url="https://example.com/c/", title="Gamma", content="<p>No links here.</p>"),
    ]

    result = analyze_pages(pages, site_url="https://example.com", weak_threshold=2)

    assert result.inbound_counts["https://example.com/b/"] == 1
    assert "https://example.com/c/" in result.orphan_urls
    assert "https://example.com/b/" in result.weak_urls
    assert result.links[0].source_url == "https://example.com/a/"
    assert result.links[0].target_url == "https://example.com/b/"


def test_analyze_pages_ignores_external_and_unknown_internal_links():
    pages = [
        Page(
            url="https://example.com/a/",
            title="Alpha",
            content='<a href="https://external.test/x">External</a><a href="/missing/">Missing</a>',
        ),
        Page(url="https://example.com/b/", title="Beta", content="Body"),
    ]

    result = analyze_pages(pages, site_url="https://example.com")

    assert result.links == []
    assert result.inbound_counts == {
        "https://example.com/a/": 0,
        "https://example.com/b/": 0,
    }
