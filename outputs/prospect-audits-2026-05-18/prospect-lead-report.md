# WordPress SEO Prospect Audit Batch

Date: 2026-05-18

Scope: 10 publicly listed WordPress SEO freelancers/agencies or WordPress-service businesses. Emails below were exact matches on public source pages. Audits were lightweight: sitemap mode with `--limit 12`, or CSV fallback from public pages when the sitemap returned 403 to Python.

| # | Prospect | Email | WordPress site | Method | Pages | Orphans | Weak | Suggestions | Report |
|---:|---|---|---|---|---:|---:|---:|---:|---|
| 1 | [WordPress SEO Agency](https://www.wordpressseoagency.com/contact/) | `info@wordpressseoagency.com` | [https://www.wordpressseoagency.com/](https://www.wordpressseoagency.com/) | sitemap | 5 | 0 | 0 | 0 | [wordpressseoagency/report.md](outputs\prospect-audits-2026-05-18\wordpressseoagency\report.md) |
| 2 | [Vertigo Studio](https://vertigostudio.co/contact/) | `info@vertigostudio.co` | [https://vertigostudio.co/](https://vertigostudio.co/) | sitemap | 6 | 0 | 3 | 10 | [vertigo-studio/report.md](outputs\prospect-audits-2026-05-18\vertigo-studio\report.md) |
| 3 | [TMC Digital Works](https://tmcdigitalworks.com/) | `hello@tmcdigitalworks.com` | [https://tmcdigitalworks.com/](https://tmcdigitalworks.com/) | csv fallback, sitemap blocked 403 | 4 | 2 | 2 | 6 | [tmc-digital-works/report.md](outputs\prospect-audits-2026-05-18\tmc-digital-works\report.md) |
| 4 | [WP BigBang](https://wpbigbang.com/about-wpbigbang/) | `hello@wpbigbang.com` | [https://wpbigbang.com/](https://wpbigbang.com/) | csv fallback, sitemap blocked 403 | 4 | 0 | 0 | 0 | [wpbigbang/report.md](outputs\prospect-audits-2026-05-18\wpbigbang\report.md) |
| 5 | [Octave Agency](https://www.octaveagency.com/wordpress-seo-agency/) | `hello@octaveagency.com` | [https://www.octaveagency.com/](https://www.octaveagency.com/) | sitemap | 7 | 0 | 1 | 5 | [octave-agency/report.md](outputs\prospect-audits-2026-05-18\octave-agency\report.md) |
| 6 | [CheckSite Websites & SEO](https://checksite.ca/) | `info@checksite.ca` | [https://checksite.ca/](https://checksite.ca/) | sitemap | 6 | 6 | 6 | 18 | [checksite/report.md](outputs\prospect-audits-2026-05-18\checksite\report.md) |
| 7 | [WiseRank](https://wiserank.co.uk/) | `info@wiserank.co.uk` | [https://wiserank.co.uk/](https://wiserank.co.uk/) | sitemap | 4 | 4 | 4 | 10 | [wiserank/report.md](outputs\prospect-audits-2026-05-18\wiserank\report.md) |
| 8 | [WP Maintenance UK](https://wpmaintenance.uk/) | `info@wpmaintenance.uk` | [https://wpmaintenance.uk/](https://wpmaintenance.uk/) | csv fallback, sitemap blocked 403 | 4 | 4 | 4 | 12 | [wpmaintenance-uk/report.md](outputs\prospect-audits-2026-05-18\wpmaintenance-uk\report.md) |
| 9 | [WP Speed Fix](https://www.wpspeedfix.com/) | `questions@wpspeedfix.com` | [https://www.wpspeedfix.com/](https://www.wpspeedfix.com/) | sitemap | 3 | 0 | 2 | 2 | [wpspeedfix/report.md](outputs\prospect-audits-2026-05-18\wpspeedfix\report.md) |
| 10 | [AI Engine Optim](https://aiengineoptim.ro/contact/) | `contact@aiengineoptim.ro` | [https://aiengineoptim.ro/](https://aiengineoptim.ro/) | sitemap | 7 | 0 | 0 | 0 | [ai-engine-optim/report.md](outputs\prospect-audits-2026-05-18\ai-engine-optim\report.md) |

## Notes

- Reports are lead-gen demos, not full SEO audits. Several sites have warnings because the lightweight crawler respected robots rules, skipped media assets, or hit fetch limits.
- Best outreach targets by demo value: CheckSite, WP Maintenance UK, WiseRank, Vertigo Studio, TMC Digital Works, and Octave Agency. They produced concrete suggestions in this small sample.
- WordPressSEOAgency, WPBigBang, and AI Engine Optim produced low/no suggestions in the sample. They can still be prospects, but the demo hook is weaker unless you run a deeper authenticated/export-based audit.
