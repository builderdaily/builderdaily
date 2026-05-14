# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WordPress AI Internal Link Agent — a read-only v0 CLI tool that audits WordPress-like content sites for internal linking issues. It imports page data (CSV or sitemap), builds an internal-link graph, identifies orphan and weak-link pages, generates explainable link suggestions with confidence scores, and exports a review-ready CSV and Markdown report. No website changes are made.

The repository also contains a static AI business-opportunity daily blog in `website/`.

## Commands

### Setup
```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install pytest
.\.venv\Scripts\python -m pip install -e .
```

### Run Tests
```powershell
# Full suite
.\.venv\Scripts\python -m pytest -q

# Single test file
.\.venv\Scripts\python -m pytest tests/test_analyzer.py -q

# Single test function
.\.venv\Scripts\python -m pytest tests/test_analyzer.py::test_analyze_pages_counts_inbound_internal_links_and_marks_orphans -q
```

### Run Audit CLI
```powershell
# From CSV
.\.venv\Scripts\python -m internal_link_agent.cli audit --csv samples/demo_site.csv --site-url https://example.com --out-dir outputs/demo-internal-link-audit

# From sitemap
.\.venv\Scripts\python -m internal_link_agent.cli audit --sitemap https://example.com/sitemap.xml --site-url https://example.com --out-dir outputs/example-sitemap-audit
```

### Website
```powershell
Start-Process .\website\index.html
```

## Architecture

The project uses a **src layout** (`src/internal_link_agent/`) with zero external runtime dependencies — only Python 3.11+ standard library.

### Data Flow

```
CSV/Sitemap → Importers → Page objects → Analyzer → AuditResult → Suggestions → LinkSuggestion → Reporting → CSV + Markdown
```

### Module Responsibilities

| Module | Role |
|--------|------|
| `models.py` | Frozen dataclasses: `Page`, `ImportResult`, `InternalLink`, `AuditResult`, `LinkSuggestion` |
| `url_utils.py` | URL normalization (lowercase, strip fragments, resolve relative) and same-site checks |
| `importers.py` | CSV parser (`load_pages_from_csv`) and sitemap crawler (`load_pages_from_sitemap`) with robots.txt compliance and rate limiting |
| `parser.py` | HTML parsing via `html.parser.HTMLParser` — extracts internal `<a>` links and plain text from content |
| `analyzer.py` | Builds link graph, counts inbound/outbound links per page, identifies orphan (0 inbound) and weak-link pages (< threshold) |
| `suggestions.py` | Deterministic lexical scoring: tokenizes titles/categories/tags/content, scores by overlap + issue type + commercial priority, caps per-source and per-target |
| `reporting.py` | Writes Google-Sheets-compatible CSV (UTF-8 BOM) and client-friendly Markdown reports |
| `cli.py` | `argparse`-based CLI with `audit` subcommand, orchestrates the full pipeline |

### Key Design Decisions

- **Frozen dataclasses everywhere** — all models use `@dataclass(frozen=True)`, ensuring immutability throughout the pipeline
- **No LLM/embedding dependency in v0** — suggestion scoring is purely lexical (token overlap), keeping it deterministic and explainable
- **Read-only by design** — v0 only exports suggestions as `pending`; no WordPress writeback
- **Sitemap mode is resilient** — failed fetches become warnings, not errors; respects `robots.txt`; rate-limited at 0.2s per request

### CSV Input Schema

Required columns: `url`, `title`, `content`

Optional columns: `categories` (pipe-separated), `tags` (pipe-separated), `published_at`, `priority` (set to `commercial`/`money`/`sales` to boost target priority in scoring)

### Test Patterns

- Tests use `tmp_path` (pytest fixture) for file I/O isolation
- Sitemap tests use a `fetcher` callable injection to avoid real HTTP calls
- CLI tests use `monkeypatch` to stub out the sitemap importer
- All tests run from `tests/` with `pythonpath = ["src"]` configured in `pyproject.toml`

## Website Component

`website/` is a standalone static blog for daily AI business-opportunity analysis. Articles are stored in `website/data/articles.js` (a `window.AI_OPPORTUNITY_ARTICLES` array) and rendered by `website/assets/app.js`. No build step — open `index.html` directly.
