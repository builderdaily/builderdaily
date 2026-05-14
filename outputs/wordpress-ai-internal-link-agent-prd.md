# WordPress AI 内链 Agent：Brainstorming 与 PRD

Version: 0.1
Date: 2026-05-12
Status: Draft
Owner: idea2biz

## 0. Brainstorming

### 0.1 核心判断

这个方向不应该从“做一个 WordPress 插件”开始，而应该从“帮站长把内链补好”开始。

原因是：用户不买“AI 内链建议”，用户买的是更少的手工 SEO 工作、更少的 orphan posts、更清楚的站点结构，以及未来可能更好的收录和流量。早期最需要验证的是建议质量和付费意愿，不是插件架构。

### 0.2 真实需求

WordPress 内容站、SEO freelancer 和小型 agency 的现状通常是：

- 文章越写越多，旧文没人记得，内链靠人工搜索和经验补。
- 重要页面缺少内部链接，孤立页面难被搜索引擎和用户发现。
- Yoast、AIOSEO、Link Whisper、LinkBoss 等产品证明“内链建议/自动插入”已经有人付费。
- 现有工具的机会缺口不在“也能建议链接”，而在“建议更准、可解释、可批量审阅、能交付给客户”。

### 0.3 三种产品路径

| 方案 | 描述 | 优点 | 风险 | 判断 |
|---|---|---|---|---|
| A. 半自动内链审计服务 | 用户提交站点 URL/导出文件，我们生成内链机会报告和可执行修改清单 | 最快收费、最快验证建议质量、无需先解决插件安装信任 | 不够 SaaS，人工参与多 | 推荐作为 v0 |
| B. WordPress 插件 | 在 WP 后台扫描、建议、确认、插入内链 | 最像最终产品，留存强 | 兼容性、安全、安装信任、插件分发都更重 | 作为 v1 |
| C. 外部 SaaS + 轻量连接插件 | SaaS 做分析，插件负责安全读取和写回 | 可扩展，体验好，适合 agency 管多个站 | 需要同时做 SaaS 和插件 | 作为 v1.5/v2 |

### 0.4 推荐楔子

第一版做：

> WordPress 内容站内链补洞 Agent：扫描 100+ 篇文章，找孤立页面、弱内链页面和可插入内链的位置，生成带理由的建议，人工确认后导出修改清单。

第一批用户：

> 手里管理 5-20 个 WordPress 内容站的 SEO freelancer / 小 agency。

他们比单个站长更适合早期验证，因为他们有重复需求、有客户预算、愿意为节省时间付费，也能清楚判断建议是否靠谱。

### 0.5 不做什么

- 不做完整 SEO 平台。
- 不做关键词排名追踪。
- 不做外链建设。
- 不自动改用户网站，除非用户逐条确认。
- 不生成新文章。
- 不承诺排名提升，只承诺减少内链维护工作和改善站点内部链接结构。

---

# Product Requirements Document: WordPress AI 内链 Agent

## 1. Executive Summary

WordPress AI 内链 Agent 是一个面向 WordPress 内容站和 SEO 服务商的内链修复工具。它扫描站点文章、页面、分类和现有内链，识别孤立页面、弱内链页面、重复锚文本、可补充链接的位置，并生成可解释的内链建议。v0 以半自动服务形式验证市场：用户提交站点，系统生成报告和修改清单；v1 再产品化为 WordPress 插件或 SaaS + connector。

产品的核心价值不是“AI 给建议”，而是让用户在 30 分钟内完成过去需要数小时的内链审计和补链工作。

## 2. Problem Statement

### 2.1 Problem Description

有大量内容的 WordPress 站点会不断产生内部链接债务：

- 新文章发布后没有链接到旧文章。
- 重要商业页面缺少来自相关文章的内部链接。
- 老文章之间没有形成主题集群。
- 孤立页面长期没有入口。
- SEO freelancer 给客户做月度维护时，需要手工搜索、复制链接、判断锚文本，非常耗时。

现有插件能部分解决，但常见问题是建议不够语义化、批量审阅体验弱、自动插入不可控、客户交付报告不够清晰。

### 2.2 Impact

不解决这个问题，内容站会持续出现：

- 可发现性差：搜索引擎和用户难以找到旧内容。
- SEO 维护成本高：每月人工检查内链消耗大量时间。
- 客户交付弱：agency 难以把“我们做了哪些内链优化”清楚展示给客户。
- 内容资产浪费：已发布文章没有互相导流。

### 2.3 Success Metrics

| Metric | Current Baseline | v0 Target | Timeframe |
|---|---:|---:|---|
| 付费验证 | 0 | 3 个付费审计客户 | 14 天 |
| 报告生成成功率 | 0 | 90% 以上站点成功生成 | 30 天 |
| 建议接受率 | 未知 | 40% 以上建议被用户认为可用 | 30 天 |
| 单站节省时间 | 手工 2-6 小时 | 用户主观反馈节省 50% 以上 | 30 天 |
| 内链补洞效果 | 未知 | 每站识别 20+ 条高置信建议 | 30 天 |
| 复购信号 | 0 | 1 个用户愿意按月继续跑 | 30 天 |

## 3. User Analysis

### 3.1 Target Users

Primary:

- SEO freelancer：一个人管理多个 WordPress 内容站，每月给客户做 SEO 维护。
- 小型 SEO agency：管理 5-50 个客户站，需要批量审计和交付报告。

Secondary:

- WordPress 内容站站长：站点有 100+ 篇文章，靠内容流量赚钱。
- Affiliate site operator：靠评测、教程、榜单页变现，需要把信息页导向商业页。

### 3.2 User Personas

#### Persona A: SEO Freelancer

- 管理 8 个客户 WordPress 站。
- 每月要做内容更新、技术检查、内链优化和报告。
- 当前做法：用 Screaming Frog、Google Search Console、站内搜索、Excel 手工整理。
- 付费动机：节省每个客户站 1-3 小时工作，并把交付物做得更专业。

#### Persona B: 内容站站长

- 运营一个 300 篇文章的 niche site。
- 当前做法：写新文时凭记忆加几条旧文链接。
- 痛点：不知道哪些旧文缺链接，也不知道该把哪些文章导向商业页。
- 付费动机：提高站点结构质量，减少手工维护。

### 3.3 User Scenarios

1. SEO freelancer 接入客户站，生成一份“本月内链机会报告”，筛选高置信建议并交付客户。
2. 内容站站长发布 20 篇新文章后，扫描全站并发现哪些旧文章应该补链到新商业页。
3. Agency 为客户做站点改版后，检查是否有孤立页面和主题集群断裂。
4. Affiliate 站长把信息类文章导流到产品评测页、对比页和购买意图页。

## 4. Goals & Objectives

### 4.1 Business Goals

1. 在 30 天内验证用户是否愿意为“内链补洞报告 + 修改清单”付费。
2. 找到建议接受率足够高的内链算法和人工审阅流程。
3. 判断最终产品形态应该是 WordPress 插件、SaaS，还是 SaaS + connector。

### 4.2 User Goals

1. 快速知道站点哪里缺内链。
2. 获得具体、可执行、可解释的链接建议。
3. 避免自动插入低质量或破坏格式的链接。
4. 能把优化结果交付给客户或团队。

## 5. Scope Definition

### 5.1 MVP In Scope

Must-have:

- 输入站点 URL、sitemap URL、WordPress export 或 CSV。
- 抓取/导入文章标题、URL、正文、分类、标签、发布时间、现有内链。
- 识别 orphan posts、低入链页面、候选 hub pages。
- 基于标题、正文、分类、标签和语义相似度生成内链建议。
- 每条建议包含源文章、目标文章、推荐锚文本、插入位置、推荐理由、置信度。
- 用户可接受/拒绝建议。
- 导出 CSV/Markdown 报告。

Should-have:

- 为 SEO agency 生成客户友好的 PDF 报告。
- 按商业页、信息页、分类页区分推荐策略。
- 检查重复锚文本和过度链接。
- 支持手动标记重点页面。

### 5.2 v1 In Scope

- WordPress 插件读取文章和页面。
- 插件后台展示审计结果。
- 用户逐条确认后插入链接。
- 插入前创建 revision，支持回滚。
- API key / SaaS 连接配置。

### 5.3 Out of Scope

- 自动发布未确认链接。
- 外链建设。
- 关键词排名监控。
- Search Console 排名归因。
- AI 生成文章。
- Shopify、Webflow、Ghost 等非 WordPress CMS。
- 多语言 SEO 策略自动判断。
- 承诺搜索排名提升。

### 5.4 Future Considerations

- Google Search Console 接入，用曝光/点击辅助确定重点页面。
- Topic cluster 可视化。
- Agency 多客户 dashboard。
- 自动月度报告。
- 多 CMS 支持。
- 内链 A/B 测试。

## 6. Functional Requirements

### FR-1 Site Import

User Story:

> As an SEO freelancer, I want to import a WordPress site without installing a plugin so that I can run a fast audit before asking the client for deeper access.

Acceptance Criteria:

- Given a sitemap URL, when the user starts an audit, then the system retrieves all eligible post/page URLs.
- Given a WordPress export file, when uploaded, then the system extracts post title, slug, content, categories, tags, and publish date.
- Given a site cannot be crawled, when the audit fails, then the system shows a clear reason and fallback import options.

Business Rules:

1. v0 must support at least sitemap import and CSV import.
2. Crawling must respect robots and rate limits.
3. Private posts are out of scope unless provided via export or authenticated API.

### FR-2 Content Analysis

User Story:

> As a site owner, I want the system to identify pages with weak internal links so that I know where my content structure is leaking value.

Acceptance Criteria:

- Given imported posts, when analysis completes, then the system calculates inbound internal link count per URL.
- Given a page has zero internal inbound links, then it is marked as orphan.
- Given a page has fewer links than the configured threshold, then it is marked as weakly linked.
- Given content cannot be parsed safely, then it is excluded with a warning.

Business Rules:

1. Default orphan threshold: 0 inbound internal links.
2. Default weak-link threshold: fewer than 2 inbound internal links.
3. Navigation/sidebar/footer links should be excluded when possible; v0 may label this as best-effort.

### FR-3 Link Opportunity Generation

User Story:

> As an SEO specialist, I want specific source-to-target link suggestions so that I can apply useful internal links without manually searching the whole site.

Acceptance Criteria:

- Given a target page, when candidates are generated, then each suggestion includes source URL, target URL, anchor text, insertion context, confidence score, and reason.
- Given a source already links to the target, then the system does not suggest a duplicate link.
- Given a source page has too many suggested links, then suggestions are capped by configurable limits.
- Given no good match exists, then no suggestion is generated.

Business Rules:

1. Default cap: max 3 new links per source article.
2. Default cap: max 10 candidate source pages per target page.
3. Suggestions must be explainable. No black-box “because AI said so.”
4. Suggested anchors must be natural phrases already present in the source content when possible.

### FR-4 Review Workflow

User Story:

> As an agency user, I want to review suggestions before applying them so that I can avoid low-quality or risky internal links.

Acceptance Criteria:

- Given suggestions exist, when the user reviews them, then each suggestion can be accepted, rejected, or marked “needs edit.”
- Given the user filters by target page, confidence, or issue type, then only matching suggestions appear.
- Given the user accepts suggestions, then they appear in the export package.

Business Rules:

1. No suggestion is treated as approved by default.
2. Rejected suggestions should be saved for future algorithm tuning.
3. v0 can use spreadsheet-style review; v1 should have an in-app review UI.

### FR-5 Export & Client Report

User Story:

> As an SEO freelancer, I want a client-ready report so that I can show what was found and what should be fixed.

Acceptance Criteria:

- Given an audit is complete, when the user exports, then the system generates CSV and Markdown outputs.
- Report includes summary counts: total pages scanned, orphan pages, weak-link pages, suggestions generated, suggestions accepted.
- Report includes each accepted recommendation with source, target, anchor, location, and reason.
- Report includes warnings and excluded pages.

Business Rules:

1. v0 report must be readable by a client without seeing internal model details.
2. CSV must be compatible with Google Sheets.
3. Markdown report must be usable in Notion, GitHub, or client docs.

### FR-6 WordPress Writeback (v1)

User Story:

> As a WordPress admin, I want accepted links to be inserted safely so that I do not manually edit dozens of posts.

Acceptance Criteria:

- Given accepted suggestions, when the admin clicks apply, then the plugin creates revisions before modifying posts.
- Given insertion fails for a post, then the plugin skips that post and reports the error.
- Given the user wants to undo, then the plugin links to the relevant WordPress revision or provides a rollback action.

Business Rules:

1. Writeback must require administrator capability.
2. Auto-insertion must never run without explicit confirmation.
3. Block editor content, shortcodes, and existing HTML must be preserved.

## 7. Non-Functional Requirements

### 7.1 Performance

- v0 should process a 300-post site in under 10 minutes.
- v1 plugin should avoid long blocking admin requests; large scans should run in batches.
- Crawl rate should be configurable to avoid stressing small hosts.

### 7.2 Security

- API credentials must be encrypted at rest if stored.
- v0 should prefer read-only import paths when possible.
- v1 writeback requires explicit admin confirmation.
- No customer content should be used for model training.
- Reports should redact credentials and private tokens.

### 7.3 Privacy

- Store only content needed for analysis.
- Provide a delete audit data action.
- Make retention explicit: default delete raw content after 30 days for paid audits unless user opts into history.

### 7.4 Compatibility

- v1 target: WordPress 6.x, PHP 8.0+.
- Must handle classic editor HTML and Gutenberg blocks best-effort.
- Must not assume a specific SEO plugin is installed.

### 7.5 Reliability

- Failed pages should not fail the entire audit.
- Every excluded page must have a reason.
- Writeback must be atomic per post: either update one post successfully or leave it unchanged.

## 8. Technical Requirements

### 8.1 Architecture

v0:

```text
Input: sitemap/export/CSV
  -> crawler/importer
  -> content parser
  -> internal link graph builder
  -> semantic candidate generator
  -> deterministic validators
  -> review/export report
```

v1:

```text
WordPress plugin
  -> local scan / SaaS sync
  -> SaaS analysis API
  -> suggestion review UI
  -> confirmed writeback with revision
```

### 8.2 Integrations

- WordPress REST API for posts/pages where authenticated access is available.
- WordPress sitemap and public HTML crawl for no-access v0.
- WordPress Settings API for plugin configuration.
- WP-Cron or background batch jobs for scheduled scans in v1.

### 8.3 Data Requirements

Core entities:

- Site
- Audit Run
- Page/Post
- Internal Link
- Link Suggestion
- Review Decision
- Export Report

Suggested Link Suggestion fields:

| Field | Description |
|---|---|
| source_url | Page where link should be inserted |
| target_url | Page receiving the link |
| anchor_text | Suggested anchor text |
| insertion_context | Sentence or paragraph around insertion point |
| reason | Human-readable reason |
| confidence | 0-100 score |
| issue_type | orphan, weak_link, cluster_gap, commercial_page_support |
| status | pending, accepted, rejected, needs_edit |

### 8.4 AI / Algorithm Requirements

The AI layer should generate candidates, not make unchecked edits.

Pipeline:

1. Parse titles, headings, paragraphs, categories, tags, and existing anchors.
2. Build internal link graph.
3. Identify target pages needing links.
4. Use lexical + semantic matching to find source pages.
5. Extract candidate anchor phrases from source content.
6. Score by topical similarity, anchor naturalness, duplicate risk, commercial priority, and link saturation.
7. Run deterministic validators before showing suggestions.

Validators:

- Source and target are not the same URL.
- Source does not already link to target.
- Anchor text appears in source content or is explicitly marked as inserted copy.
- Source page does not exceed max new link count.
- Target URL is canonical and reachable.
- Suggestion does not target noindex/private pages unless user explicitly includes them.

## 9. Dependencies

### 9.1 Technical Dependencies

- WordPress sitemap or export availability.
- HTML parser that preserves content structure.
- Embedding or semantic similarity provider.
- Optional LLM provider for explanation and anchor refinement.
- PDF/Markdown/CSV export library.
- For v1: WordPress plugin development, admin UI, authenticated writeback.

### 9.2 Business Dependencies

- Access to 10-20 real WordPress sites for validation.
- Feedback from SEO freelancers or agencies.
- Outreach channel: SEO communities, WordPress groups, indie content site operators.

## 10. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|---|---:|---:|---|
| Suggestions are too generic | High | High | Require reason, confidence, and user review; tune on rejected suggestions |
| Existing competitors are good enough | Medium | High | Focus on agency workflow, client reports, and semantic patch quality |
| WordPress formatting breaks on writeback | Medium | High | v0 export-only; v1 create revisions and update per post atomically |
| Users distrust site access | High | Medium | Start with sitemap/export mode; only request write access in v1 |
| SEO outcome is hard to prove quickly | High | Medium | Sell time saved and structure cleanup first, not ranking guarantees |
| Crawl misses JS/private content | Medium | Medium | Clearly report excluded pages and offer authenticated/plugin mode |
| AI cost scales with site size | Medium | Medium | Batch embeddings, cache results, cap pages by plan |
| Plugin approval/distribution slows launch | Medium | Medium | Delay plugin until paid service validates demand |

## 11. Timeline & Milestones

### Phase 0: Concierge Validation, Days 1-14

- Build manual/semi-automated audit pipeline.
- Run 10 free/low-cost mini audits.
- Sell 3 paid full audits.
- Collect accepted/rejected labels from users.

Deliverables:

- Sample report.
- CSV suggestion sheet.
- Before/after internal link graph summary.

### Phase 1: MVP Tooling, Days 15-30

- Create repeatable importer and report generator.
- Add review workflow.
- Add confidence scoring and validators.
- Package paid audit offer.

Deliverables:

- Self-serve audit request page or internal CLI + report workflow.
- 3-5 paid customer reports.
- Decision on plugin vs SaaS next.

### Phase 2: Product v1, Days 31-60

- Build WordPress plugin prototype or connector.
- Add authenticated scan.
- Add admin review UI.
- Add confirmed writeback with revision safety.

## 12. Success Measurement

### 12.1 Tracking Metrics

Acquisition:

- Outreach messages sent.
- Reply rate.
- Audit request rate.
- Paid conversion rate.

Activation:

- % audits successfully generated.
- Time from site input to first report.
- Number of pages scanned per audit.

Quality:

- Suggestion acceptance rate.
- Rejection reasons.
- Average confidence of accepted vs rejected suggestions.
- Number of accepted links per site.

Revenue:

- Paid audit count.
- Average audit price.
- Monthly recurring interest.
- Agency multi-site interest.

### 12.2 Success Criteria

The idea deserves productization if, within 30 days:

- 3+ customers pay for an audit or implementation help.
- 40%+ of generated suggestions are accepted as useful.
- At least 1 agency/freelancer asks to run this on multiple sites.
- Users describe the value as time saved or better client deliverables, not “interesting AI.”

Kill or pivot if:

- Users will accept free reports but no one pays.
- Suggestions require heavy manual rewriting.
- Users already use existing plugins and do not feel enough pain to switch.
- Site access friction prevents audits from starting.

## 13. Pricing Hypothesis

v0 service:

- Mini audit: free or $19, limited to 50 pages.
- Full audit: $99/site, up to 300 pages.
- Agency batch: $299 for 5 sites.

v1 product:

- Solo: $19/month, 1 site, monthly audit.
- Pro: $49/month, 5 sites, exports and scheduled scans.
- Agency: $149/month, 25 sites, client reports and white-label exports.

Pricing must be tested against existing anchors:

- Link Whisper annual plugin pricing.
- Yoast SEO Premium annual pricing.
- LinkBoss monthly credit pricing.

## 14. Distribution Plan

First channels:

- Direct outreach to SEO freelancers and small agencies.
- WordPress/SEO communities where users discuss internal linking.
- Public teardown posts: “I audited 20 WordPress sites and found 1,437 missed internal links.”
- Free orphan-page checker lead magnet.
- Before/after case study for one site.

Offer copy:

> I’ll run a WordPress internal link audit on your site and send a spreadsheet of exact links to add: source post, target post, anchor text, and reason. If it does not find at least 20 useful opportunities, you do not pay.

## 15. Open Questions

1. First geography/language: English WordPress sites, Chinese sites, or both?
2. First customer type: SEO freelancers, affiliate site operators, or agencies?
3. Should v0 include “done-for-you insertion” or only the report?
4. How much site access will users tolerate before trust is built?
5. Is the strongest wedge orphan-page cleanup, commercial-page support, or monthly client reporting?

## 16. Research & References

- WordPress REST API Reference: https://developer.wordpress.org/rest-api/reference/
- WordPress REST API Posts endpoint: https://developer.wordpress.org/rest-api/reference/posts/
- WordPress Settings API: https://developer.wordpress.org/plugins/settings/settings-api/
- WordPress Cron: https://developer.wordpress.org/plugins/cron/
- Link Whisper WordPress plugin: https://wordpress.org/plugins/link-whisper/
- Link Whisper pricing reference: https://linkwhisper.helpscoutdocs.com/article/15-pricing-plans-comparison
- Yoast internal linking suggestions: https://yoast.com/features/internal-linking-suggestions/
- AIOSEO pricing and Link Assistant: https://aioseo.com/pricing
- LinkBoss: https://linkboss.io/

## 17. PRD Self-Review

Validation checklist:

- Clear problem statement: Pass
- Target users defined: Pass
- Success metrics specified: Pass
- Scope bounded: Pass
- User stories included: Pass
- Acceptance criteria included: Pass
- Dependencies and risks identified: Pass
- Timeline included: Pass
- Technical constraints documented: Pass

Known gaps:

- Needs real user interviews before v0 pricing is trusted.
- Needs sample site testing to estimate AI cost per 100 pages.
- Needs decision on first customer segment before outreach copy is finalized.
