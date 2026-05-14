from __future__ import annotations

import csv
from pathlib import Path

from internal_link_agent.models import AuditResult, LinkSuggestion

_CSV_FIELDS = [
    "source_url",
    "target_url",
    "anchor_text",
    "insertion_context",
    "reason",
    "confidence",
    "issue_type",
    "status",
]


def write_suggestions_csv(suggestions: list[LinkSuggestion], output_path: str | Path) -> None:
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=_CSV_FIELDS)
        writer.writeheader()
        for suggestion in suggestions:
            writer.writerow(
                {
                    "source_url": suggestion.source_url,
                    "target_url": suggestion.target_url,
                    "anchor_text": suggestion.anchor_text,
                    "insertion_context": suggestion.insertion_context,
                    "reason": suggestion.reason,
                    "confidence": suggestion.confidence,
                    "issue_type": suggestion.issue_type,
                    "status": suggestion.status,
                }
            )


def render_markdown_report(audit: AuditResult, suggestions: list[LinkSuggestion], site_url: str) -> str:
    lines = [
        "# Internal Link Audit Report",
        "",
        f"Site: {site_url}",
        "",
        "## Summary",
        "",
        f"- Pages scanned: {len(audit.pages)}",
        f"- Internal links found: {len(audit.links)}",
        f"- Orphan pages: {len(audit.orphan_urls)}",
        f"- Weak-link pages: {len(audit.weak_urls)}",
        f"- Suggestions generated: {len(suggestions)}",
        "",
        "No website changes were made. Review each pending suggestion before editing WordPress content.",
        "",
        "## Orphan Pages",
        "",
    ]
    lines.extend(_url_bullets(audit.orphan_urls))
    lines.extend(["", "## Weak-Link Pages", ""])
    lines.extend(_url_bullets(audit.weak_urls))
    lines.extend(["", "## Recommendations", ""])
    if not suggestions:
        lines.append("- No high-confidence recommendations generated.")
    for index, suggestion in enumerate(suggestions, start=1):
        lines.extend(
            [
                f"### {index}. Add Internal Link",
                "",
                f"- Source: {suggestion.source_url}",
                f"- Target: {suggestion.target_url}",
                f"- Anchor: {suggestion.anchor_text}",
                f"- Issue: {suggestion.issue_type}",
                f"- Confidence: {suggestion.confidence}",
                f"- Reason: {suggestion.reason}",
                f"- Context: {suggestion.insertion_context}",
                "",
            ]
        )
    if audit.warnings:
        lines.extend(["## Warnings", ""])
        lines.extend(f"- {warning}" for warning in audit.warnings)
    return "\n".join(lines).rstrip() + "\n"


def write_markdown_report(audit: AuditResult, suggestions: list[LinkSuggestion], site_url: str, output_path: str | Path) -> None:
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(render_markdown_report(audit, suggestions, site_url), encoding="utf-8")


def _url_bullets(urls: tuple[str, ...]) -> list[str]:
    if not urls:
        return ["- None found."]
    return [f"- {url}" for url in urls]
