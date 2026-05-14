from internal_link_agent.analyzer import analyze_pages
from internal_link_agent.models import Page
from internal_link_agent.suggestions import generate_suggestions


def test_generate_suggestions_targets_orphan_page_with_explainable_reason():
    pages = [
        Page(
            url="https://example.com/a/",
            title="Internal Linking Basics",
            content="This internal linking audit explains orphan pages and SEO structure.",
            categories=("SEO",),
            tags=("internal links",),
        ),
        Page(
            url="https://example.com/b/",
            title="Orphan Page SEO Checklist",
            content="Checklist for fixing orphan pages on WordPress.",
            categories=("SEO",),
            tags=("orphan pages",),
        ),
    ]
    result = analyze_pages(pages, site_url="https://example.com")

    suggestions = generate_suggestions(result, site_url="https://example.com")

    assert len(suggestions) == 1
    assert suggestions[0].source_url == "https://example.com/a/"
    assert suggestions[0].target_url == "https://example.com/b/"
    assert suggestions[0].issue_type == "orphan"
    assert suggestions[0].confidence >= 40
    assert "topical overlap" in suggestions[0].reason


def test_generate_suggestions_skips_existing_links_and_caps_per_source():
    pages = [
        Page(
            url="https://example.com/a/",
            title="Hub",
            content='<a href="/b/">Beta</a> WordPress SEO links audit orphan commercial page.',
        ),
        Page(url="https://example.com/b/", title="Beta", content="Beta body"),
        Page(url="https://example.com/c/", title="WordPress SEO", content="WordPress SEO body"),
        Page(url="https://example.com/d/", title="Commercial Page", content="Commercial body"),
    ]
    result = analyze_pages(pages, site_url="https://example.com")

    suggestions = generate_suggestions(result, site_url="https://example.com", max_per_source=1)

    assert all(s.target_url != "https://example.com/b/" for s in suggestions)
    assert len([s for s in suggestions if s.source_url == "https://example.com/a/"]) == 1
