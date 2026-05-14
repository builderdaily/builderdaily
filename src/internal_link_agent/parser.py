from __future__ import annotations

from html.parser import HTMLParser

from internal_link_agent.url_utils import normalize_url, same_site


class _LinkHTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.links: list[tuple[str, str]] = []
        self._active_href: str | None = None
        self._active_text: list[str] = []
        self.text_parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() != "a":
            return
        href = dict(attrs).get("href")
        if href:
            self._active_href = href
            self._active_text = []

    def handle_data(self, data: str) -> None:
        if data:
            self.text_parts.append(data)
        if self._active_href is not None:
            self._active_text.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() != "a" or self._active_href is None:
            return
        anchor = " ".join("".join(self._active_text).split())
        self.links.append((self._active_href, anchor))
        self._active_href = None
        self._active_text = []


def extract_internal_links(content: str, page_url: str, site_url: str) -> list[tuple[str, str]]:
    parser = _LinkHTMLParser()
    parser.feed(content or "")
    internal_links: list[tuple[str, str]] = []
    for raw_href, anchor_text in parser.links:
        target_url = normalize_url(raw_href, base_url=page_url)
        if same_site(target_url, site_url):
            internal_links.append((target_url, anchor_text))
    return internal_links


def extract_text(content: str) -> str:
    parser = _LinkHTMLParser()
    parser.feed(content or "")
    return " ".join(" ".join(parser.text_parts).split())
