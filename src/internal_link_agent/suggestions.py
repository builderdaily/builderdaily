from __future__ import annotations

import re
from collections import defaultdict

from internal_link_agent.models import AuditResult, LinkSuggestion, Page
from internal_link_agent.parser import extract_text
from internal_link_agent.url_utils import normalize_url

_TOKEN_RE = re.compile(r"[a-z0-9]+", re.IGNORECASE)
_STOPWORDS = {
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "how",
    "in",
    "is",
    "it",
    "of",
    "on",
    "or",
    "the",
    "this",
    "to",
    "with",
}


def generate_suggestions(
    audit: AuditResult,
    site_url: str,
    max_per_source: int = 3,
    max_sources_per_target: int = 10,
    min_confidence: int = 50,
) -> list[LinkSuggestion]:
    _ = normalize_url(site_url)
    page_by_url = {page.url: page for page in audit.pages}
    target_urls = _target_urls(audit)
    existing_pairs = audit.existing_pairs
    raw_candidates: list[tuple[int, LinkSuggestion]] = []

    for target_url in target_urls:
        target = page_by_url[target_url]
        issue_type = "orphan" if target_url in audit.orphan_urls else "weak_link"
        for source in audit.pages:
            if source.url == target_url or (source.url, target_url) in existing_pairs:
                continue
            score, overlap_terms = _score_pair(source, target, issue_type, audit.outgoing_counts.get(source.url, 0))
            if score < min_confidence:
                continue
            suggestion = LinkSuggestion(
                source_url=source.url,
                target_url=target_url,
                anchor_text=_choose_anchor(source, target, overlap_terms),
                insertion_context=_context_for_source(source, overlap_terms),
                reason=_reason(issue_type, overlap_terms, audit.inbound_counts.get(target_url, 0)),
                confidence=score,
                issue_type=issue_type,
            )
            raw_candidates.append((score, suggestion))

    raw_candidates.sort(key=lambda item: (-item[0], item[1].target_url, item[1].source_url))
    per_source: dict[str, int] = defaultdict(int)
    per_target: dict[str, int] = defaultdict(int)
    selected: list[LinkSuggestion] = []

    for _score, suggestion in raw_candidates:
        if per_source[suggestion.source_url] >= max_per_source:
            continue
        if per_target[suggestion.target_url] >= max_sources_per_target:
            continue
        per_source[suggestion.source_url] += 1
        per_target[suggestion.target_url] += 1
        selected.append(suggestion)

    return selected


def _target_urls(audit: AuditResult) -> list[str]:
    ordered: list[str] = []
    for page in audit.pages:
        if page.url in audit.orphan_urls or page.url in audit.weak_urls:
            ordered.append(page.url)
    return ordered


def _score_pair(source: Page, target: Page, issue_type: str, outgoing_count: int) -> tuple[int, tuple[str, ...]]:
    source_tokens = _page_tokens(source, include_content=True)
    target_tokens = _page_tokens(target, include_content=False)
    overlap = tuple(sorted(source_tokens & target_tokens))
    if not overlap:
        return 0, ()

    score = 20 + min(len(overlap) * 12, 45)
    if issue_type == "orphan":
        score += 12
    if target.priority.lower() in {"commercial", "money", "sales"}:
        score += 8
    score -= min(outgoing_count * 3, 12)
    return max(0, min(score, 100)), overlap


def _page_tokens(page: Page, include_content: bool) -> set[str]:
    pieces = [page.title, " ".join(page.categories), " ".join(page.tags)]
    if include_content:
        pieces.append(extract_text(page.content))
    return _tokens(" ".join(pieces))


def _tokens(value: str) -> set[str]:
    return {token.lower() for token in _TOKEN_RE.findall(value) if token.lower() not in _STOPWORDS and len(token) > 2}


def _choose_anchor(source: Page, target: Page, overlap_terms: tuple[str, ...]) -> str:
    source_text = extract_text(source.content)
    source_lower = source_text.lower()
    title = " ".join(target.title.split())
    if title and title.lower() in source_lower:
        return title
    for term in sorted(overlap_terms, key=len, reverse=True):
        if term in source_lower:
            return _matching_text(source_text, term)
    return title or target.url


def _matching_text(source_text: str, term: str) -> str:
    match = re.search(re.escape(term), source_text, flags=re.IGNORECASE)
    return match.group(0) if match else term


def _context_for_source(source: Page, overlap_terms: tuple[str, ...]) -> str:
    text = extract_text(source.content)
    if not text:
        return ""
    lowered = text.lower()
    for term in overlap_terms:
        index = lowered.find(term)
        if index >= 0:
            start = max(0, index - 80)
            end = min(len(text), index + 160)
            return text[start:end].strip()
    return text[:220].strip()


def _reason(issue_type: str, overlap_terms: tuple[str, ...], inbound_count: int) -> str:
    issue = "Target is orphan" if issue_type == "orphan" else f"Target has only {inbound_count} inbound internal links"
    terms = ", ".join(overlap_terms[:6]) if overlap_terms else "related terms"
    return f"{issue}; topical overlap on {terms}; source does not already link to target."
