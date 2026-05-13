# Builder Daily

Builder Daily is an open-source daily research site for turning fast-moving AI
and developer-tooling signals into concrete business webapp opportunities.

The project is intentionally narrow: it is not a news feed, a launch tracker, or
another AI hype board. Each daily article asks one practical question:

> If a builder had to ship a commercial webapp from today's AI signals, what is
> the highest-value opportunity worth validating first?

Production site:

```text
https://builderdaily.news
```

Repository:

```text
https://github.com/builderdaily/builderdaily
```

## Why This Exists

AI news moves too quickly for builders to turn it into product judgment. Model
launches, agent frameworks, security incidents, infrastructure changes, and
platform shifts all arrive as scattered links. Most summaries stop at "what
happened"; Builder Daily tries to answer "what can be built and sold from this?"

Each daily report filters the day's signals through a business lens:

- Is there a real buyer with urgency?
- What are users doing today instead?
- Can the opportunity be tested with a narrow MVP?
- Is there a plausible acquisition channel?
- What platform, legal, trust, or competition risks matter?
- Which single opportunity deserves deeper work first?

## What Is In The Site

The current static site includes:

- A dated archive of AI opportunity reports.
- Source tags that distinguish AI HOT, AI HOT daily fallback, BuilderPulse, and
  other original sources.
- Source links on both article pages and opportunity cards.
- Scored opportunity cards for commercial value, traffic potential, and
  validation wedge.
- A deep-dive page for the top opportunity of the latest report.
- Dark mode.
- Static deployment support for GitHub Pages, Cloudflare Pages, Netlify, Vercel,
  or any plain file server.

## Current Research Sources

Builder Daily currently uses two primary signal streams:

- **AI HOT**: daily and all-pool AI trend items from `aihot.virxact.com`.
- **BuilderPulse**: builder and developer-tooling signals from
  `github.com/BuilderPulse/BuilderPulse`.

When the AI HOT full-pool window does not cover an older date, the article marks
that date as an AI HOT daily fallback instead of pretending it was full-pool
coverage.

## Repository Structure

```text
.
├── index.html              # Static HTML shell
├── CNAME                   # Custom domain for static hosting
├── assets/
│   ├── app.js              # Hash-router, rendering, filtering, article pages
│   └── styles.css          # Responsive layout, dark mode, cards, research UI
└── data/
    └── articles.js         # Daily report data and deep-dive content
```

There is no build step. This is deliberate: the project should be easy to fork,
audit, deploy, and contribute to.

## Local Development

Serve the repository root with any static file server:

```powershell
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

You can also use any other static server, for example:

```powershell
npx serve .
```

## Validation

The site is plain JavaScript. Before committing content or UI changes, run:

```powershell
node --check assets\app.js
node --check data\articles.js
```

For UI changes, open the site in a browser and check:

- Homepage article spacing and archive navigation.
- Article pages and source links.
- Top-opportunity deep-dive pages.
- Dark mode contrast.
- Mobile layout around `390px` width.

## Content Model

Daily reports live in `data/articles.js` under:

```js
window.AI_OPPORTUNITY_ARTICLES = [
  {
    date,
    title,
    summary,
    tags,
    sourceTags,
    scores,
    winner,
    conclusion,
    opportunities,
    rejected,
    sources,
  },
];
```

Each report should include at least three opportunities. Every opportunity should
cover:

- `demand`: why the need is real.
- `statusQuo`: what users do today.
- `wedge`: the narrowest useful MVP.
- `distribution`: how the product can acquire customers.
- `risk`: what could kill the idea.
- `validation`: the next practical test.

The top opportunity can also include a `deepDive` object with:

- Why now.
- MVP phases.
- Technical feasibility.
- Go-to-market plan.
- Pricing.
- Validation plan.
- Risks and mitigations.

## Editorial Standard

Builder Daily should be useful to someone deciding what to build next. A good
article is specific enough that a builder can leave with a concrete test plan.

Preferred writing style:

- Write from evidence, not vibes.
- Link to source material for traceability.
- Separate traffic potential from commercial value.
- Prefer narrow, testable products over broad platform ideas.
- Be explicit about buyer, workflow, risk, and first validation step.
- Do not turn every model launch into a startup idea.

## Deployment

Because this is a static site, deployment is simple:

- GitHub Pages: serve `main` from `/`.
- Cloudflare Pages: framework preset `None`, build command empty, output
  directory `/`.
- Vercel/Netlify: static project with no build command.

The intended custom domain is:

```text
builderdaily.news
```

## Contributing

Contributions are welcome when they improve research quality, source coverage,
or the reading experience.

Useful contribution types:

- Add a new daily report.
- Add or improve a top-opportunity deep dive.
- Improve source attribution and link quality.
- Improve mobile, dark mode, or accessibility.
- Add lightweight validation tooling that keeps the project static-first.

Please keep changes focused. If you add a daily report, include source links and
make sure the top opportunity is connected to its source material.

## License

No license has been selected yet. Until a license is added, all rights are
reserved by the repository owner.
