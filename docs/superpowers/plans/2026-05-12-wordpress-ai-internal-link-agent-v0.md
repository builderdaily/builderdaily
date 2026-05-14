# WordPress AI Internal Link Agent V0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local v0 audit CLI that imports WordPress-like content, finds weak internal-link targets, generates explainable link suggestions, and exports CSV/Markdown reports.

**Architecture:** A small Python package keeps import, parsing, graph analysis, suggestion scoring, reporting, and CLI orchestration separated. v0 is read-only and export-only, matching the PRD's concierge validation wedge before any WordPress plugin or writeback work.

**Tech Stack:** Python 3.11+, standard library, pytest.

---

## Scope Split

### V0 Now
- CSV import for repeatable local audits.
- Sitemap URL extraction for the no-access import path.
- HTML/body parsing for existing internal links.
- Inbound-link counts, orphan pages, weak-link pages, and basic hub candidates.
- Deterministic lexical suggestion scoring with explainable reasons.
- Review-ready exports as Google-Sheets-compatible CSV and client-friendly Markdown.
- CLI command that runs an audit from CSV into an output folder.

### Later
- WordPress export XML parsing.
- Authenticated WordPress REST API scan.
- PDF export.
- In-app review workflow.
- WordPress plugin writeback with revisions.
- Embedding/LLM scoring.

## File Structure

- `pyproject.toml`: package metadata, pytest config, console script.
- `README.md`: v0 usage and import CSV schema.
- `src/internal_link_agent/__init__.py`: package exports.
- `src/internal_link_agent/models.py`: dataclasses for pages, links, suggestions, and audit results.
- `src/internal_link_agent/url_utils.py`: URL normalization and same-site helpers.
- `src/internal_link_agent/importers.py`: CSV page importer and sitemap URL loader.
- `src/internal_link_agent/parser.py`: internal-link extraction from HTML/content.
- `src/internal_link_agent/analyzer.py`: graph builder and weak/orphan page analysis.
- `src/internal_link_agent/suggestions.py`: deterministic candidate generation and scoring.
- `src/internal_link_agent/reporting.py`: CSV and Markdown report rendering.
- `src/internal_link_agent/cli.py`: `internal-link-agent audit` CLI.
- `tests/test_importers.py`: CSV and sitemap import behavior.
- `tests/test_analyzer.py`: internal-link graph and page issue detection.
- `tests/test_suggestions.py`: duplicate avoidance, anchor choice, caps, and reasons.
- `tests/test_reporting.py`: export shape and summary content.
- `tests/test_cli.py`: end-to-end CLI smoke test.
- `samples/demo_site.csv`: tiny sample WordPress-like content set.

## Task 1: Project Scaffold And Importers

**Files:**
- Create: `pyproject.toml`
- Create: `src/internal_link_agent/__init__.py`
- Create: `src/internal_link_agent/models.py`
- Create: `src/internal_link_agent/url_utils.py`
- Create: `src/internal_link_agent/importers.py`
- Test: `tests/test_importers.py`

- [ ] **Step 1: Write failing importer tests**

```python
from pathlib import Path

from internal_link_agent.importers import load_pages_from_csv, load_urls_from_sitemap


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
```

- [ ] **Step 2: Run tests and verify they fail because the package does not exist**

Run: `pytest tests/test_importers.py -q`

Expected: `ModuleNotFoundError: No module named 'internal_link_agent'`

- [ ] **Step 3: Implement package metadata, models, URL helpers, and importers**

Implement dataclasses for `Page`, URL normalization that preserves trailing slash paths, CSV parsing with `|`-separated categories/tags, and sitemap XML parsing from either a local file path or HTTP(S) URL.

- [ ] **Step 4: Run importer tests and verify they pass**

Run: `pytest tests/test_importers.py -q`

Expected: `2 passed`

## Task 2: Link Graph Analysis

**Files:**
- Create: `src/internal_link_agent/parser.py`
- Create: `src/internal_link_agent/analyzer.py`
- Test: `tests/test_analyzer.py`

- [ ] **Step 1: Write failing analyzer tests**

```python
from internal_link_agent.analyzer import analyze_pages
from internal_link_agent.models import Page


def test_analyze_pages_counts_inbound_internal_links_and_marks_orphans():
    pages = [
        Page(
            url="https://example.com/a/",
            title="Alpha",
            content='<p>Read <a href="/b/">Beta guide</a>.</p>',
        ),
        Page(url="https://example.com/b/", title="Beta", content="<p>Useful beta guide.</p>"),
        Page(url="https://example.com/c/", title="Gamma", content="<p>No links here.</p>"),
    ]

    result = analyze_pages(pages, site_url="https://example.com", weak_threshold=2)

    assert result.inbound_counts["https://example.com/b/"] == 1
    assert "https://example.com/c/" in result.orphan_urls
    assert "https://example.com/b/" in result.weak_urls
    assert result.links[0].source_url == "https://example.com/a/"
    assert result.links[0].target_url == "https://example.com/b/"


def test_analyze_pages_ignores_external_and_unknown_internal_links():
    pages = [
        Page(
            url="https://example.com/a/",
            title="Alpha",
            content='<a href="https://external.test/x">External</a><a href="/missing/">Missing</a>',
        ),
        Page(url="https://example.com/b/", title="Beta", content="Body"),
    ]

    result = analyze_pages(pages, site_url="https://example.com")

    assert result.links == []
    assert result.inbound_counts == {
        "https://example.com/a/": 0,
        "https://example.com/b/": 0,
    }
```

- [ ] **Step 2: Run tests and verify they fail because analyzer is missing**

Run: `pytest tests/test_analyzer.py -q`

Expected: `ModuleNotFoundError` or `ImportError` for `internal_link_agent.analyzer`

- [ ] **Step 3: Implement HTML link extraction and graph analysis**

Use `html.parser.HTMLParser`, `urllib.parse.urljoin`, and same-site checks. Return `AuditResult` containing pages, links, inbound counts, orphan URLs, weak URLs, and warnings.

- [ ] **Step 4: Run analyzer tests and verify they pass**

Run: `pytest tests/test_analyzer.py -q`

Expected: `2 passed`

## Task 3: Link Opportunity Generation

**Files:**
- Create: `src/internal_link_agent/suggestions.py`
- Modify: `src/internal_link_agent/models.py`
- Test: `tests/test_suggestions.py`

- [ ] **Step 1: Write failing suggestion tests**

```python
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
        Page(url="https://example.com/a/", title="Hub", content='<a href="/b/">Beta</a> WordPress SEO links audit orphan commercial page.'),
        Page(url="https://example.com/b/", title="Beta", content="Beta body"),
        Page(url="https://example.com/c/", title="WordPress SEO", content="WordPress SEO body"),
        Page(url="https://example.com/d/", title="Commercial Page", content="Commercial body"),
    ]
    result = analyze_pages(pages, site_url="https://example.com")

    suggestions = generate_suggestions(result, site_url="https://example.com", max_per_source=1)

    assert all(s.target_url != "https://example.com/b/" for s in suggestions)
    assert len([s for s in suggestions if s.source_url == "https://example.com/a/"]) == 1
```

- [ ] **Step 2: Run tests and verify they fail because suggestions are missing**

Run: `pytest tests/test_suggestions.py -q`

Expected: `ModuleNotFoundError` or `ImportError` for `internal_link_agent.suggestions`

- [ ] **Step 3: Implement deterministic lexical suggestions**

Tokenize titles, categories, tags, and content. Score by title/tag/category overlap, source content overlap, orphan/weak issue weight, commercial target priority, and source saturation. Avoid same-page and already-linked pairs. Prefer anchor phrases already found in source content, then fall back to target title.

- [ ] **Step 4: Run suggestion tests and verify they pass**

Run: `pytest tests/test_suggestions.py -q`

Expected: `2 passed`

## Task 4: Report Export

**Files:**
- Create: `src/internal_link_agent/reporting.py`
- Test: `tests/test_reporting.py`

- [ ] **Step 1: Write failing reporting tests**

```python
import csv
from pathlib import Path

from internal_link_agent.analyzer import analyze_pages
from internal_link_agent.models import LinkSuggestion, Page
from internal_link_agent.reporting import render_markdown_report, write_suggestions_csv


def test_write_suggestions_csv_is_google_sheets_friendly(tmp_path: Path):
    suggestion = LinkSuggestion(
        source_url="https://example.com/a/",
        target_url="https://example.com/b/",
        anchor_text="orphan pages",
        insertion_context="Text about orphan pages.",
        reason="High topical overlap.",
        confidence=82,
        issue_type="orphan",
    )
    output = tmp_path / "suggestions.csv"

    write_suggestions_csv([suggestion], output)

    rows = list(csv.DictReader(output.open(encoding="utf-8-sig")))
    assert rows[0]["source_url"] == "https://example.com/a/"
    assert rows[0]["status"] == "pending"
    assert rows[0]["confidence"] == "82"


def test_render_markdown_report_includes_client_summary():
    pages = [
        Page(url="https://example.com/a/", title="Alpha", content='<a href="/b/">Beta</a>'),
        Page(url="https://example.com/b/", title="Beta", content="Body"),
        Page(url="https://example.com/c/", title="Gamma", content="Body"),
    ]
    result = analyze_pages(pages, site_url="https://example.com")
    suggestion = LinkSuggestion(
        source_url="https://example.com/a/",
        target_url="https://example.com/c/",
        anchor_text="Gamma",
        insertion_context="Body",
        reason="Target is orphan with topical overlap.",
        confidence=75,
        issue_type="orphan",
    )

    report = render_markdown_report(result, [suggestion], site_url="https://example.com")

    assert "# Internal Link Audit Report" in report
    assert "Pages scanned: 3" in report
    assert "Orphan pages: 1" in report
    assert "https://example.com/c/" in report
```

- [ ] **Step 2: Run tests and verify they fail because reporting is missing**

Run: `pytest tests/test_reporting.py -q`

Expected: `ModuleNotFoundError` or `ImportError` for `internal_link_agent.reporting`

- [ ] **Step 3: Implement CSV and Markdown exports**

CSV uses UTF-8 BOM for Google Sheets compatibility. Markdown includes summary counts, orphan/weak pages, suggestions, warnings, and a plain-language note that no website changes were made.

- [ ] **Step 4: Run reporting tests and verify they pass**

Run: `pytest tests/test_reporting.py -q`

Expected: `2 passed`

## Task 5: CLI And Sample Audit

**Files:**
- Create: `src/internal_link_agent/cli.py`
- Create: `samples/demo_site.csv`
- Modify: `README.md`
- Test: `tests/test_cli.py`

- [ ] **Step 1: Write failing CLI test**

```python
from pathlib import Path

from internal_link_agent.cli import main


def test_cli_audit_writes_csv_and_markdown_outputs(tmp_path: Path):
    input_csv = tmp_path / "site.csv"
    input_csv.write_text(
        "url,title,content,categories,tags,published_at,priority\n"
        "https://example.com/a/,Internal Links,\"WordPress SEO orphan pages and content audit.\",SEO,links,,\n"
        "https://example.com/b/,Orphan Pages,\"How to fix orphan pages.\",SEO,orphan pages,,\n",
        encoding="utf-8",
    )
    out_dir = tmp_path / "audit"

    exit_code = main(["audit", "--csv", str(input_csv), "--site-url", "https://example.com", "--out-dir", str(out_dir)])

    assert exit_code == 0
    assert (out_dir / "suggestions.csv").exists()
    assert (out_dir / "report.md").exists()
    assert "Internal Link Audit Report" in (out_dir / "report.md").read_text(encoding="utf-8")
```

- [ ] **Step 2: Run tests and verify they fail because CLI is missing**

Run: `pytest tests/test_cli.py -q`

Expected: `ModuleNotFoundError` or `ImportError` for `internal_link_agent.cli`

- [ ] **Step 3: Implement CLI orchestration**

The `audit` command loads CSV pages, analyzes links, generates suggestions, creates the output directory, writes `suggestions.csv` and `report.md`, and prints a concise summary.

- [ ] **Step 4: Run CLI test and verify it passes**

Run: `pytest tests/test_cli.py -q`

Expected: `1 passed`

- [ ] **Step 5: Run the full test suite**

Run: `pytest -q`

Expected: all tests pass.

- [ ] **Step 6: Run sample audit**

Run: `python -m internal_link_agent.cli audit --csv samples/demo_site.csv --site-url https://example.com --out-dir outputs/demo-internal-link-audit`

Expected: `outputs/demo-internal-link-audit/suggestions.csv` and `outputs/demo-internal-link-audit/report.md` exist.

## Self-Review

- PRD FR-1 is covered for CSV and sitemap import; WordPress export remains later.
- PRD FR-2 is covered by inbound counts, orphan pages, and weak pages.
- PRD FR-3 is covered by source/target/anchor/context/reason/confidence suggestions with duplicate prevention and caps.
- PRD FR-4 is represented by `status=pending` export for spreadsheet review; in-app accept/reject remains later.
- PRD FR-5 is covered by CSV and Markdown output; PDF remains later.
- PRD FR-6 is explicitly out of scope for v0.
