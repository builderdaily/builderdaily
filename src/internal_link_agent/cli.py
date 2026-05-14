from __future__ import annotations

import argparse
from pathlib import Path

from internal_link_agent.analyzer import analyze_pages
from internal_link_agent.importers import load_pages_from_csv, load_pages_from_sitemap
from internal_link_agent.reporting import write_markdown_report, write_suggestions_csv
from internal_link_agent.suggestions import generate_suggestions


def main(argv: list[str] | None = None) -> int:
    parser = _build_parser()
    args = parser.parse_args(argv)
    if args.command == "audit":
        return _run_audit(args)
    parser.print_help()
    return 1


def console() -> None:
    raise SystemExit(main())


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="internal-link-agent")
    subparsers = parser.add_subparsers(dest="command")

    audit = subparsers.add_parser("audit", help="Run a read-only internal-link audit from CSV.")
    source = audit.add_mutually_exclusive_group(required=True)
    source.add_argument("--csv", help="Path to CSV with url,title,content,categories,tags columns.")
    source.add_argument("--sitemap", help="Sitemap URL or local sitemap XML path to crawl.")
    audit.add_argument("--site-url", required=True, help="Canonical site root, for example https://example.com")
    audit.add_argument("--out-dir", required=True, help="Directory for suggestions.csv and report.md")
    audit.add_argument("--weak-threshold", type=int, default=2, help="Inbound-link count below this is weak.")
    audit.add_argument("--max-per-source", type=int, default=3, help="Maximum new suggestions per source page.")
    audit.add_argument("--max-sources-per-target", type=int, default=10, help="Maximum source pages per target page.")
    return parser


def _run_audit(args: argparse.Namespace) -> int:
    warnings: tuple[str, ...] = ()
    if args.csv:
        pages = load_pages_from_csv(args.csv)
    else:
        import_result = load_pages_from_sitemap(args.sitemap, site_url=args.site_url)
        pages = import_result.pages
        warnings = import_result.warnings
    audit = analyze_pages(pages, site_url=args.site_url, weak_threshold=args.weak_threshold, warnings=warnings)
    suggestions = generate_suggestions(
        audit,
        site_url=args.site_url,
        max_per_source=args.max_per_source,
        max_sources_per_target=args.max_sources_per_target,
    )
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    write_suggestions_csv(suggestions, out_dir / "suggestions.csv")
    write_markdown_report(audit, suggestions, args.site_url, out_dir / "report.md")
    print(
        f"Audit complete: {len(audit.pages)} pages, {len(audit.orphan_urls)} orphan pages, "
        f"{len(audit.weak_urls)} weak-link pages, {len(suggestions)} suggestions, {len(audit.warnings)} warnings."
    )
    return 0


if __name__ == "__main__":
    console()
