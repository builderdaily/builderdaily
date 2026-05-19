# WordPress AI Internal Link Agent

Read-only v0 tooling for the WordPress AI internal-link agent PRD. It imports a CSV export of pages/posts, builds an internal-link graph, finds orphan and weak-link pages, generates explainable link suggestions, and exports a spreadsheet plus Markdown report.

## Setup

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install pytest
.\.venv\Scripts\python -m pip install -e .
```

## CSV Schema

Required columns:

- `url`
- `title`
- `content`

Optional columns:

- `categories`: use `|` between terms
- `tags`: use `|` between terms
- `published_at`
- `priority`: set `commercial`, `money`, or `sales` to slightly boost target priority

## Run An Audit From CSV

```powershell
.\.venv\Scripts\python -m internal_link_agent.cli audit --csv samples/demo_site.csv --site-url https://example.com --out-dir outputs/demo-internal-link-audit
```

## Run An Audit From Sitemap

```powershell
.\.venv\Scripts\python -m internal_link_agent.cli audit --sitemap https://example.com/sitemap.xml --site-url https://example.com --out-dir outputs/example-sitemap-audit
```

The sitemap mode fetches public HTML pages, follows `robots.txt`, rate limits requests, and records failed pages as report warnings instead of stopping the whole audit.

Outputs:

- `suggestions.csv`: spreadsheet review queue, all suggestions start as `pending`
- `report.md`: client-friendly summary and recommendation list

No website changes are made by v0.

## Run The Local Demo Website

```powershell
.\.venv\Scripts\python -m internal_link_agent.web --port 8765
```

Then open:

```text
http://127.0.0.1:8765
```

The page loads `samples/demo_site.csv` by default. Change the CSV text and click
`Run audit` to rerun the same internal-link analysis from the browser.

## AI Opportunity Daily Website

Daily AI business-opportunity analysis lives in `website/`.

Open it directly:

```powershell
Start-Process .\website\index.html
```

Articles are stored in `website/data/articles.js` and rendered by the static
blog UI. The daily automation updates that file by date.
