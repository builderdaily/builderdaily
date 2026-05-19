from pathlib import Path

from internal_link_agent.importers import (
    load_pages_from_csv,
    load_pages_from_csv_text,
    load_pages_from_sitemap,
    load_urls_from_sitemap,
)


def test_load_pages_from_csv_normalizes_required_fields(tmp_path: Path):
    csv_path = tmp_path / "pages.csv"
    csv_path.write_text(
        "url,title,content,categories,tags,published_at,priority\n"
        "https://example.com/b/,Beta,Body text,SEO|Content,links|audit,2026-01-02,commercial\n",
        encoding="utf-8",
    )

    pages = load_pages_from_csv(csv_path)

    assert len(pages) == 1
    assert pages[0].url == "https://example.com/b/"
    assert pages[0].title == "Beta"
    assert pages[0].categories == ("SEO", "Content")
    assert pages[0].tags == ("links", "audit")
    assert pages[0].priority == "commercial"


def test_load_pages_from_csv_text_supports_web_form_input():
    pages = load_pages_from_csv_text(
        "url,title,content,categories,tags,published_at,priority\n"
        'https://example.com/a/,Alpha,"WordPress orphan pages.",SEO,wordpress|links,,\n'
    )

    assert len(pages) == 1
    assert pages[0].url == "https://example.com/a/"
    assert pages[0].tags == ("wordpress", "links")


def test_load_urls_from_sitemap_supports_local_xml_file(tmp_path: Path):
    sitemap = tmp_path / "sitemap.xml"
    sitemap.write_text(
        "<?xml version='1.0' encoding='UTF-8'?>"
        "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>"
        "<url><loc>https://example.com/a/</loc></url>"
        "<url><loc>https://example.com/b/</loc></url>"
        "</urlset>",
        encoding="utf-8",
    )

    urls = load_urls_from_sitemap(str(sitemap))

    assert urls == ["https://example.com/a/", "https://example.com/b/"]


def test_load_urls_from_sitemap_recurses_sitemap_indexes(tmp_path: Path):
    child = tmp_path / "post-sitemap.xml"
    child.write_text(
        "<?xml version='1.0' encoding='UTF-8'?>"
        "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>"
        "<url><loc>https://example.com/post-a/</loc></url>"
        "</urlset>",
        encoding="utf-8",
    )
    index = tmp_path / "sitemap_index.xml"
    index.write_text(
        "<?xml version='1.0' encoding='UTF-8'?>"
        "<sitemapindex xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>"
        f"<sitemap><loc>{child}</loc></sitemap>"
        "</sitemapindex>",
        encoding="utf-8",
    )

    urls = load_urls_from_sitemap(str(index))

    assert urls == ["https://example.com/post-a/"]


def test_load_pages_from_sitemap_fetches_pages_and_keeps_failures_as_warnings(tmp_path: Path):
    sitemap = tmp_path / "sitemap.xml"
    sitemap.write_text(
        "<?xml version='1.0' encoding='UTF-8'?>"
        "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>"
        "<url><loc>https://example.com/a/</loc></url>"
        "<url><loc>https://example.com/b/</loc></url>"
        "</urlset>",
        encoding="utf-8",
    )

    def fetcher(url: str) -> str:
        if url.endswith("/b/"):
            raise RuntimeError("blocked")
        return "<html><head><title>Alpha Page</title></head><body><p>Internal link audit.</p></body></html>"

    result = load_pages_from_sitemap(str(sitemap), site_url="https://example.com", fetcher=fetcher)

    assert len(result.pages) == 1
    assert result.pages[0].url == "https://example.com/a/"
    assert result.pages[0].title == "Alpha Page"
    assert result.warnings == ("Failed to fetch https://example.com/b/: blocked",)
