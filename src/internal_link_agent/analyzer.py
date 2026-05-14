from __future__ import annotations

from internal_link_agent.models import AuditResult, InternalLink, Page
from internal_link_agent.parser import extract_internal_links
from internal_link_agent.url_utils import normalize_url


def analyze_pages(
    pages: list[Page] | tuple[Page, ...],
    site_url: str,
    weak_threshold: int = 2,
    warnings: tuple[str, ...] = (),
) -> AuditResult:
    normalized_pages = tuple(
        Page(
            url=normalize_url(page.url),
            title=page.title,
            content=page.content,
            categories=page.categories,
            tags=page.tags,
            published_at=page.published_at,
            priority=page.priority,
        )
        for page in pages
    )
    known_urls = {page.url for page in normalized_pages}
    inbound_counts = {page.url: 0 for page in normalized_pages}
    outgoing_counts = {page.url: 0 for page in normalized_pages}
    links: list[InternalLink] = []
    seen_pairs: set[tuple[str, str]] = set()

    for page in normalized_pages:
        for target_url, anchor_text in extract_internal_links(page.content, page.url, site_url):
            if target_url not in known_urls or target_url == page.url:
                continue
            pair = (page.url, target_url)
            if pair in seen_pairs:
                continue
            seen_pairs.add(pair)
            links.append(InternalLink(source_url=page.url, target_url=target_url, anchor_text=anchor_text))
            inbound_counts[target_url] += 1
            outgoing_counts[page.url] += 1

    orphan_urls = tuple(url for url, count in inbound_counts.items() if count == 0)
    weak_urls = tuple(url for url, count in inbound_counts.items() if count < weak_threshold)

    return AuditResult(
        pages=normalized_pages,
        links=links,
        inbound_counts=inbound_counts,
        orphan_urls=orphan_urls,
        weak_urls=weak_urls,
        warnings=warnings,
        outgoing_counts=outgoing_counts,
    )
