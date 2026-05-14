from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class Page:
    url: str
    title: str
    content: str
    categories: tuple[str, ...] = ()
    tags: tuple[str, ...] = ()
    published_at: str = ""
    priority: str = ""


@dataclass(frozen=True)
class ImportResult:
    pages: list[Page]
    warnings: tuple[str, ...] = ()


@dataclass(frozen=True)
class InternalLink:
    source_url: str
    target_url: str
    anchor_text: str = ""


@dataclass(frozen=True)
class AuditResult:
    pages: tuple[Page, ...]
    links: list[InternalLink]
    inbound_counts: dict[str, int]
    orphan_urls: tuple[str, ...]
    weak_urls: tuple[str, ...]
    warnings: tuple[str, ...] = ()
    outgoing_counts: dict[str, int] = field(default_factory=dict)

    @property
    def existing_pairs(self) -> set[tuple[str, str]]:
        return {(link.source_url, link.target_url) for link in self.links}


@dataclass(frozen=True)
class LinkSuggestion:
    source_url: str
    target_url: str
    anchor_text: str
    insertion_context: str
    reason: str
    confidence: int
    issue_type: str
    status: str = "pending"
