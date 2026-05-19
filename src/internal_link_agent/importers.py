from __future__ import annotations

import csv
import io
import time
from pathlib import Path
from html.parser import HTMLParser
from typing import Callable
from urllib import robotparser
from urllib.parse import urlparse, urlunparse
from urllib.request import Request, urlopen
from xml.etree import ElementTree

from internal_link_agent.models import ImportResult, Page
from internal_link_agent.url_utils import normalize_url, same_site

_USER_AGENT = "Mozilla/5.0 (compatible; InternalLinkAgent/0.1; +https://example.com/internal-link-agent)"
csv.field_size_limit(10_000_000)


def load_pages_from_csv(path: str | Path) -> list[Page]:
    csv_path = Path(path)
    with csv_path.open("r", encoding="utf-8-sig", newline="") as handle:
        rows = csv.DictReader(handle)
        return [_page_from_row(row) for row in rows]


def load_pages_from_csv_text(csv_text: str) -> list[Page]:
    handle = io.StringIO(csv_text)
    rows = csv.DictReader(handle)
    return [_page_from_row(row) for row in rows]


def load_urls_from_sitemap(location: str, _depth: int = 0) -> list[str]:
    xml_text = _read_sitemap(location)
    root = ElementTree.fromstring(xml_text)
    if root.tag.endswith("sitemapindex") and _depth < 3:
        urls: list[str] = []
        for element in root.iter():
            if element.tag.endswith("loc") and element.text:
                urls.extend(load_urls_from_sitemap(element.text.strip(), _depth=_depth + 1))
        return urls
    urls: list[str] = []
    for element in root.iter():
        if element.tag.endswith("loc") and element.text:
            urls.append(normalize_url(element.text))
    return urls


def load_pages_from_sitemap(
    sitemap_location: str,
    site_url: str,
    fetcher: Callable[[str], str] | None = None,
    delay_seconds: float = 0.2,
    limit: int | None = None,
    respect_robots: bool = True,
) -> ImportResult:
    pages: list[Page] = []
    warnings: list[str] = []
    urls = load_urls_from_sitemap(sitemap_location)
    if limit is not None:
        urls = urls[:limit]

    robots_cache: dict[str, robotparser.RobotFileParser | None] = {}
    for url in urls:
        if _is_non_html_asset(url):
            warnings.append(f"Skipped non-HTML asset {url}")
            continue
        if not same_site(url, site_url):
            warnings.append(f"Skipped off-site URL {url}")
            continue
        if fetcher is None and respect_robots and not _can_fetch(url, robots_cache):
            warnings.append(f"Skipped by robots.txt {url}")
            continue
        try:
            html = fetcher(url) if fetcher else _fetch_url(url)
        except Exception as exc:  # pragma: no cover - exact network errors vary.
            warnings.append(f"Failed to fetch {url}: {exc}")
            continue
        pages.append(Page(url=normalize_url(url), title=_extract_title(html) or _fallback_title(url), content=html))
        if fetcher is None and delay_seconds > 0:
            time.sleep(delay_seconds)

    return ImportResult(pages=pages, warnings=tuple(warnings))


def _page_from_row(row: dict[str, str]) -> Page:
    return Page(
        url=normalize_url(row.get("url", "")),
        title=(row.get("title") or "").strip(),
        content=row.get("content") or "",
        categories=_split_terms(row.get("categories", "")),
        tags=_split_terms(row.get("tags", "")),
        published_at=(row.get("published_at") or "").strip(),
        priority=(row.get("priority") or "").strip(),
    )


def _split_terms(value: str | None) -> tuple[str, ...]:
    if not value:
        return ()
    return tuple(part.strip() for part in value.split("|") if part.strip())


def _read_sitemap(location: str) -> str:
    if location.startswith(("http://", "https://")):
        request = Request(location, headers={"User-Agent": _USER_AGENT})
        with urlopen(request, timeout=10) as response:
            return response.read().decode("utf-8")
    return Path(location).read_text(encoding="utf-8")


def _fetch_url(url: str) -> str:
    request = Request(url, headers={"User-Agent": _USER_AGENT})
    with urlopen(request, timeout=8) as response:
        charset = response.headers.get_content_charset() or "utf-8"
        return response.read().decode(charset, errors="replace")


def _can_fetch(url: str, cache: dict[str, robotparser.RobotFileParser | None]) -> bool:
    parsed = urlparse(url)
    robots_url = urlunparse((parsed.scheme, parsed.netloc, "/robots.txt", "", "", ""))
    if robots_url not in cache:
        parser = robotparser.RobotFileParser()
        parser.set_url(robots_url)
        try:
            parser.read()
        except Exception:
            cache[robots_url] = None
        else:
            cache[robots_url] = parser
    parser = cache[robots_url]
    if parser is None:
        return True
    if not parser.entries and parser.default_entry is None:
        return True
    return parser.can_fetch(_USER_AGENT, url)


def _is_non_html_asset(url: str) -> bool:
    path = urlparse(url).path.lower()
    return path.endswith(
        (
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".webp",
            ".svg",
            ".pdf",
            ".mp3",
            ".mp4",
            ".zip",
            ".css",
            ".js",
        )
    )


class _TitleParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.in_title = False
        self.parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        _ = attrs
        if tag.lower() == "title":
            self.in_title = True

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "title":
            self.in_title = False


def _extract_title(html: str) -> str:
    parser = _TitleParser()
    parser.feed(html or "")
    return " ".join("".join(parser.parts).split())


def _fallback_title(url: str) -> str:
    path = urlparse(url).path.strip("/")
    return path.rsplit("/", 1)[-1].replace("-", " ").title() if path else url
