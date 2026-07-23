(function () {
  const app = document.querySelector("#app");
  const themeToggle = document.querySelector(".theme-toggle");
  const articles = [...window.AI_OPPORTUNITY_ARTICLES].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
      themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    }
  }

  setTheme(document.documentElement.dataset.theme || "light");
  themeToggle?.addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });

  function escapeHtml(value) {
    if (value === undefined || value === null) return "";
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function paragraphList(items) {
    return (Array.isArray(items) ? items : [items])
      .filter(Boolean)
      .map((item) => {
        if (typeof item === "object") {
          const label = item.name ? `<strong>${escapeHtml(item.name)}</strong>` : "";
          const body = item.reason || item.body || item.text || "";
          return `<p>${label}${label && body ? "：" : ""}${escapeHtml(body)}</p>`;
        }
        return `<p>${escapeHtml(item)}</p>`;
      })
      .join("");
  }

  function bulletList(items) {
    return `<ul>${(Array.isArray(items) ? items : [items])
      .filter(Boolean)
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("")}</ul>`;
  }

  function scoreBoxes(article) {
    const scores = article.scores || {};
    const commercial = scores.commercial ?? scores.business ?? "";
    const traffic = scores.traffic ?? "";
    const wedge = scores.wedge ?? scores.validation ?? scores.productizable ?? "";
    return `
      <div class="score-stack" aria-label="文章评分">
        <div class="score-box"><strong>${escapeHtml(commercial)}</strong><span>商业价值</span></div>
        <div class="score-box"><strong>${escapeHtml(traffic)}</strong><span>流量潜力</span></div>
        <div class="score-box"><strong>${escapeHtml(wedge)}</strong><span>可验证切口</span></div>
      </div>
    `;
  }

  function sourceTags(article) {
    const tags = article.sourceTags || [];
    if (!tags.length) return "";
    return `<div class="source-tags" aria-label="数据来源">${tags
      .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join("")}</div>`;
  }

  function sourceLinks(article, options = {}) {
    const sources = options.limit ? article.sources.slice(0, options.limit) : article.sources;
    if (!sources.length) return "";
    return `
      <div class="source-links ${options.compact ? "is-compact" : ""}" aria-label="原文溯源">
        ${options.compact ? "" : `<strong>原文溯源</strong>`}
        <ul class="source-list source-link-list">
          ${sources
            .map(
              (source) => `
                <li class="source-item">
                  <span class="source-type">${escapeHtml(source.type || "来源")}</span>
                  <a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.label)}</a>
                </li>
              `,
            )
            .join("")}
        </ul>
      </div>
    `;
  }

  function renderSignalPool(article) {
    const signals = article.signalPool || [];
    if (!signals.length) return "";
    return `
      <section class="article-section" id="signal-pool">
        <div class="section-heading-row">
          <div>
            <h2>全量关键词/机会池</h2>
            <p class="section-note">先看过去一天全量信号，再独立判断搜索流量、真实需求、MVP 形态和变现路径。</p>
          </div>
          <div class="view-toggle" aria-label="切换机会池视图">
            <button type="button" data-signal-view="card" aria-label="卡片视图" title="卡片视图" aria-pressed="true">${iconGrid()}</button>
            <button type="button" data-signal-view="list" aria-label="列表视图" title="列表视图" aria-pressed="false">${iconRows()}</button>
          </div>
        </div>
        <div class="signal-pool-shell" data-signal-pool>
          <div class="signal-pool is-card-view" data-signal-panel="card">
            ${signals.map((signal, index) => renderSignalCard(signal, article, index)).join("")}
          </div>
          <div class="signal-table-wrap" data-signal-panel="list" hidden>
            <table class="signal-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">关键词</th>
                  <th scope="col">判断</th>
                  <th scope="col">场景/用户</th>
                  <th scope="col">搜索/MVP</th>
                  <th scope="col">变现/风险</th>
                </tr>
              </thead>
              <tbody>
                ${signals.map((signal, index) => renderSignalRow(signal, article, index)).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    `;
  }

  function renderSignalCard(signal, article, index) {
    const refs = signalSourceButtons(signal, article, "card");
    return `
      <article class="signal-card">
        <div class="signal-card-main">
          <div class="signal-card-head">
            <span class="signal-index">${String(index + 1).padStart(2, "0")}</span>
            <strong>${escapeHtml(signal.keyword)}</strong>
            <span class="signal-status">${escapeHtml(signal.status || "待筛选")}</span>
          </div>
          <div class="signal-card-copy">
            <p><b>原始信号</b>${escapeHtml(signal.signal)}</p>
            <p><b>隐含机会</b>${escapeHtml(signal.opportunity || signal.mvpShape || signal.decision || "")}</p>
            <p><b>初判</b>${escapeHtml(signal.read)}</p>
            ${renderSignalDetails(signal)}
          </div>
        </div>
        ${refs ? `<div class="signal-source-row">${refs}</div>` : ""}
      </article>
    `;
  }

  function renderSignalDetails(signal) {
    const details = [
      ["具体场景", signal.scene],
      ["目标用户", signal.persona],
      ["触发时刻", signal.moment],
      ["现有替代", signal.currentAlternative],
      ["痛点", signal.pain],
      ["搜索词", Array.isArray(signal.searchQueries) ? signal.searchQueries.join(" / ") : signal.searchQueries],
      ["MVP 形态", signal.mvpShape],
      ["变现", signal.monetization],
      ["价格", signal.pricing],
      ["平台风险", signal.platformRisk],
      ["结论", signal.decision],
    ].filter(([, value]) => value);
    if (!details.length) return "";
    return `
      <div class="signal-detail-list">
        ${details
          .map(
            ([label, value]) => `
              <p><b>${escapeHtml(label)}</b>${escapeHtml(value)}</p>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderSignalRow(signal, article, index) {
    const sources = signalSources(signal, article);
    const primarySource = sources[0];
    const keyword = primarySource
      ? `<a
          class="signal-keyword-link"
          href="${escapeHtml(primarySource.url)}"
          target="_blank"
          rel="noreferrer"
          title="${escapeHtml(`${primarySource.type || "来源"}：${primarySource.label}`)}"
          aria-label="${escapeHtml(`${signal.keyword}：${primarySource.label}`)}"
        >${escapeHtml(signal.keyword)}</a>`
      : `<strong>${escapeHtml(signal.keyword)}</strong>`;
    const secondaryLinks = sources.slice(1);
    return `
      <tr>
        <td class="signal-table-index">${String(index + 1).padStart(2, "0")}</td>
        <td>
          <div class="signal-keyword-cell">
            ${keyword}
            ${
              secondaryLinks.length
                ? `<div class="signal-inline-links">${secondaryLinks
                    .map(
                      (source) => `
                        <a
                          href="${escapeHtml(source.url)}"
                          target="_blank"
                          rel="noreferrer"
                          title="${escapeHtml(`${source.type || "来源"}：${source.label}`)}"
                          aria-label="${escapeHtml(`${signal.keyword}：${source.label}`)}"
                        >${escapeHtml(shortSourceType(source.type))}</a>
                      `,
                    )
                    .join("")}</div>`
                : ""
            }
          </div>
        </td>
        <td>
          <span class="signal-status">${escapeHtml(signal.decision || signal.status || "待筛选")}</span>
          <p>${escapeHtml(signal.read || signal.signal)}</p>
        </td>
        <td>${escapeHtml([signal.persona, signal.scene, signal.moment].filter(Boolean).join(" / ") || signal.signal)}</td>
        <td>${escapeHtml([
          Array.isArray(signal.searchQueries) ? signal.searchQueries.join(" / ") : signal.searchQueries,
          signal.mvpShape || signal.opportunity,
        ].filter(Boolean).join(" / "))}</td>
        <td>${escapeHtml([signal.monetization, signal.pricing, signal.platformRisk].filter(Boolean).join(" / ") || signal.read)}</td>
      </tr>
    `;
  }

  function signalSources(signal, article) {
    return (signal.sourceRefs || [])
      .map((index) => article.sources[index])
      .filter(Boolean);
  }

  function signalSourceButtons(signal, article) {
    const sources = signalSources(signal, article);
    if (!sources.length) return "";
    return sources
      .map(
        (source) => `
          <a
            class="signal-source-link"
            href="${escapeHtml(source.url)}"
            target="_blank"
            rel="noreferrer"
            title="${escapeHtml(`${source.type || "来源"}：${source.label}`)}"
            aria-label="${escapeHtml(`${source.type || "来源"}：${source.label}`)}"
          >
            <span>${escapeHtml(shortSourceType(source.type))}</span><strong>${escapeHtml(source.label)}</strong>${iconExternal()}
          </a>
        `,
      )
      .join("");
  }

  function setupSignalPoolControls() {
    const pool = document.querySelector("[data-signal-pool]");
    if (!pool) return;
    const panels = document.querySelectorAll("[data-signal-panel]");
    document.querySelectorAll("[data-signal-view]").forEach((button) => {
      button.addEventListener("click", () => {
        const view = button.dataset.signalView;
        panels.forEach((panel) => {
          panel.hidden = panel.dataset.signalPanel !== view;
        });
        document.querySelectorAll("[data-signal-view]").forEach((item) => {
          item.setAttribute("aria-pressed", String(item === button));
        });
      });
    });
  }

  function iconGrid() {
    return `<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="1.5"></rect><rect x="13" y="4" width="7" height="7" rx="1.5"></rect><rect x="4" y="13" width="7" height="7" rx="1.5"></rect><rect x="13" y="13" width="7" height="7" rx="1.5"></rect></svg>`;
  }

  function iconRows() {
    return `<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="3.5" rx="1.5"></rect><rect x="4" y="10.25" width="16" height="3.5" rx="1.5"></rect><rect x="4" y="15.5" width="16" height="3.5" rx="1.5"></rect></svg>`;
  }

  function iconExternal() {
    return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M8 6h10v10"></path><path d="M18 6 7 17"></path><path d="M6 10v8h8"></path></svg>`;
  }

  function shortSourceType(type) {
    return String(type || "来源")
      .replace("AI HOT 全量", "AI HOT")
      .replace("AI HOT 日报", "日报")
      .replace("原始信号", "原始")
      .replace("BuilderPulse", "BP");
  }

  function opportunitySourceButtons(item, article) {
    const refs = item.sourceRefs || [];
    if (!refs.length) return "";
    return refs
      .map((index) => article.sources[index])
      .filter(Boolean)
      .map(
        (source) => `
          <a
            class="opp-source-link"
            href="${source.url}"
            target="_blank"
            rel="noreferrer"
            title="${escapeHtml(`${source.type || "来源"}：${source.label}`)}"
            aria-label="${escapeHtml(`${source.type || "来源"}：${source.label}`)}"
          >
            <span>${escapeHtml(shortSourceType(source.type))}</span>
            ${iconExternal()}
          </a>
        `,
      )
      .join("");
  }

  function archiveRail(activeDate) {
    return `
      <aside class="archive-rail" aria-label="日期归档">
        <div class="rail-title">日期归档</div>
        ${articles
          .map(
            (article) => `
              <a class="date-link ${article.date === activeDate ? "is-active" : ""}" href="#/article/${article.date}">
                <strong>${article.date}</strong>
                <span>${escapeHtml(article.title)}</span>
              </a>
            `,
          )
          .join("")}
      </aside>
    `;
  }

  function renderHome() {
    const latest = articles[0];
    const latestDetailHref = latest.opportunities[0]?.deepDive
      ? `#/article/${latest.date}/opportunity/0`
      : `#/article/${latest.date}`;
    app.innerHTML = `
      <section class="hero">
        <div class="hero-copy">
          <h1>每天从 AI 热点里筛一个真正值得做的 WebApp。</h1>
          <p>这里不存新闻摘要。每篇先拆全量关键词背后的商业机会，再按真实需求、具体场景、替代方案、长期性和付费意愿筛出 3 个最值得验证的 WebApp。</p>
        </div>
        <a class="hero-panel hero-panel-link" href="${latestDetailHref}" aria-label="查看今日最强机会深度拆解">
          <div>
            <p class="panel-title">今日最强机会</p>
            <div class="signal-map" aria-label="今日机会信号">
              <div class="signal-row"><span>商业价值</span><div class="signal-bar"><span style="width: ${latest.scores.commercial}%"></span></div><strong>${latest.scores.commercial}</strong></div>
              <div class="signal-row"><span>流量潜力</span><div class="signal-bar"><span style="width: ${latest.scores.traffic}%"></span></div><strong>${latest.scores.traffic}</strong></div>
              <div class="signal-row"><span>验证速度</span><div class="signal-bar"><span style="width: ${latest.scores.wedge}%"></span></div><strong>${latest.scores.wedge}</strong></div>
            </div>
          </div>
          <div class="winner">
            <h2>${escapeHtml(latest.winner.name)}</h2>
            <p>${escapeHtml(latest.winner.short)}</p>
            ${sourceTags(latest)}
            <span class="hero-cta">查看深度拆解</span>
          </div>
        </a>
      </section>

      <section class="layout">
        ${archiveRail(latest.date)}
        <div class="content-stack">
          <div class="toolbar">
            <div>
              <strong>最新分析</strong>
              <span class="tag">${articles.length} 篇</span>
            </div>
            <input class="search" id="search" type="search" placeholder="搜索机会、行业、关键词" />
          </div>
          <div id="articleList">
            ${articleCards(articles)}
          </div>
        </div>
      </section>
    `;

    const input = document.querySelector("#search");
    const list = document.querySelector("#articleList");
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      const filtered = articles.filter((article) => {
        const signalBlob = (article.signalPool || [])
          .map((signal) => `${signal.keyword} ${signal.signal} ${signal.opportunity} ${signal.read}`)
          .join(" ");
        const blob = `${article.title} ${article.summary} ${article.winner.name} ${article.tags.join(" ")} ${(article.sourceTags || []).join(" ")} ${signalBlob} ${article.sources.map((source) => `${source.type || ""} ${source.label}`).join(" ")}`.toLowerCase();
        return blob.includes(q);
      });
      list.innerHTML = filtered.length ? articleCards(filtered) : `<div class="empty">没有匹配的文章。</div>`;
    });
  }

  function articleCards(items) {
    return items
      .map(
        (article) => `
          <article class="article-card">
            <div>
              <div class="meta">
                <time datetime="${article.date}">${article.date}</time>
                ${article.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
                ${(article.sourceTags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
              </div>
              <h2><a href="#/article/${article.date}">${escapeHtml(article.title)}</a></h2>
              <p>${escapeHtml(article.summary)}</p>
              ${sourceLinks(article, { limit: 2, compact: true })}
            </div>
            ${scoreBoxes(article)}
          </article>
        `,
      )
      .join("");
  }

  function renderArticle(date) {
    const article = articles.find((item) => item.date === date) || articles[0];
    app.innerHTML = `
      <section class="article-page">
        <article class="article-body">
          <header class="article-head">
            <div class="meta">
              <time datetime="${article.date}">${article.date}</time>
              ${article.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
              ${(article.sourceTags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
            </div>
            <h1>${escapeHtml(article.title)}</h1>
            <p class="lead">${escapeHtml(article.summary)}</p>
          </header>

          <section class="article-section" id="conclusion">
            <h2>最终判断</h2>
            ${paragraphList(article.conclusion)}
          </section>

          ${renderSignalPool(article)}

          <section class="article-section" id="shortlist">
            <h2>Top 3 推荐机会</h2>
            <div class="opportunity-grid">
              ${article.opportunities.map((item, index) => renderOpportunity(item, article, index)).join("")}
            </div>
          </section>

          <section class="article-section" id="not-selected">
            <h2>为什么其他热点没进前三</h2>
            ${paragraphList(article.rejected)}
          </section>

        </article>

        <aside class="side-panel">
          <h2>文章导航</h2>
          <ol>
            <li><button class="toc-button" type="button" data-scroll-target="conclusion">最终判断</button></li>
            ${
              article.signalPool?.length
                ? `<li><button class="toc-button" type="button" data-scroll-target="signal-pool">全量机会池</button></li>`
                : ""
            }
            <li><button class="toc-button" type="button" data-scroll-target="shortlist">候选机会</button></li>
            <li><button class="toc-button" type="button" data-scroll-target="not-selected">淘汰理由</button></li>
          </ol>
          ${sourceLinks(article)}
          <hr />
          ${scoreBoxes(article)}
        </aside>
      </section>
    `;

    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.scrollTarget);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    setupSignalPoolControls();
  }

  function renderOpportunity(item, article, index) {
    const framework = item.framework;
    return `
      <article class="opportunity-card">
        <header>
          <div>
            <h3>${escapeHtml(item.name)}</h3>
            <div class="meta">
              <span class="tag">商业 ${item.score.commercial}</span>
              <span class="tag">流量 ${item.score.traffic}</span>
              <span class="tag">验证 ${item.score.wedge}</span>
              ${opportunitySourceButtons(item, article)}
              ${
                item.deepDive
                  ? `<a class="detail-link" href="#/article/${article.date}/opportunity/${index}">深度拆解</a>`
                  : ""
              }
            </div>
          </div>
          <span class="verdict">${escapeHtml(item.verdict)}</span>
        </header>
        <div class="deep-grid">
          <div><strong>需求真实性</strong><p>${escapeHtml(item.demand)}</p></div>
          <div><strong>现有替代方案</strong><p>${escapeHtml(item.statusQuo)}</p></div>
          <div><strong>最窄切入</strong><p>${escapeHtml(item.wedge)}</p></div>
          <div><strong>获客与付费</strong><p>${escapeHtml(item.distribution)}</p></div>
          <div><strong>主要风险</strong><p>${escapeHtml(item.risk)}</p></div>
          <div><strong>下一步验证</strong><p>${escapeHtml(item.validation)}</p></div>
        </div>
        ${
          framework
            ? `
              <div class="framework-block">
                <h4>机会判断</h4>
                <div class="framework-score-grid">
                  ${framework.scores
                    .map(
                      (score) => `
                        <div>
                          <span>${escapeHtml(score.label)}</span>
                          <strong>${score.value}/10</strong>
                        </div>
                      `,
                    )
                    .join("")}
                </div>
                <div class="framework-grid">
                  <div><strong>a. 真实需求</strong><p>${escapeHtml(framework.demand)}</p></div>
                  <div><strong>b. 具体场景</strong><p>${escapeHtml(framework.scenario)}</p></div>
                  <div><strong>c. 现有方案</strong><p>${escapeHtml(framework.alternatives)}</p></div>
                  <div><strong>d. 解决方案</strong><p>${escapeHtml(framework.solution)}</p></div>
                  <div><strong>e/f. 长期性与供需</strong><p>${escapeHtml(framework.durability)}</p></div>
                  <div><strong>g. 付费意愿</strong><p>${escapeHtml(framework.pricing)}</p></div>
                </div>
              </div>
            `
            : ""
        }
      </article>
    `;
  }

  function renderOpportunityDetail(date, index) {
    const article = articles.find((item) => item.date === date) || articles[0];
    const opportunity = article.opportunities[Number(index)] || article.opportunities[0];
    if (!opportunity?.deepDive) {
      renderArticle(article.date);
      return;
    }

    const detail = opportunity.deepDive;
    const sectionIds = {
      why: "why-now",
      mvp: "mvp",
      tech: "tech",
      growth: "growth",
      validation: "validation",
      risks: "risks",
    };

    app.innerHTML = `
      <section class="article-page">
        <article class="article-body">
          <header class="article-head deep-dive-head">
            <a class="back-link" href="#/article/${article.date}">返回 ${article.date} 日报</a>
            <div class="meta">
              <time datetime="${article.date}">${article.date}</time>
              <span class="tag">第一优先级</span>
              <span class="tag">深度研究</span>
            </div>
            <h1>${escapeHtml(opportunity.name)}</h1>
            <p class="lead">${escapeHtml(detail.subtitle)}</p>
            <div class="detail-metrics" aria-label="机会评分">
              <div><strong>${opportunity.score.commercial}</strong><span>商业价值</span></div>
              <div><strong>${opportunity.score.traffic}</strong><span>流量潜力</span></div>
              <div><strong>${opportunity.score.wedge}</strong><span>可验证切口</span></div>
            </div>
            <div class="thesis-panel">
              <strong>一句话判断</strong>
              <p>${escapeHtml(detail.thesis)}</p>
            </div>
          </header>

          <section class="article-section research-section" id="${sectionIds.why}">
            <h2>为什么现在值得做</h2>
            ${paragraphList(detail.whyNow)}
          </section>

          <section class="article-section research-section" id="${sectionIds.mvp}">
            <h2>MVP 具体做什么</h2>
            <div class="mvp-timeline">
              ${detail.mvp
                .map(
                  (phase) => `
                    <article class="phase-card">
                      <span>${escapeHtml(phase.stage)}</span>
                      <h3>${escapeHtml(phase.title)}</h3>
                      <p>${escapeHtml(phase.body)}</p>
                      ${bulletList(phase.features)}
                    </article>
                  `,
                )
                .join("")}
            </div>
          </section>

          <section class="article-section research-section" id="${sectionIds.tech}">
            <h2>技术可行性</h2>
            <div class="research-grid">
              ${detail.technical
                .map(
                  (item) => `
                    <div>
                      <strong>${escapeHtml(item.title)}</strong>
                      <span>${escapeHtml(item.status)}</span>
                      <p>${escapeHtml(item.body)}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </section>

          <section class="article-section research-section" id="${sectionIds.growth}">
            <h2>推广和运营计划</h2>
            ${paragraphList(detail.goToMarket)}
            <div class="plan-list">
              ${detail.pricing
                .map(
                  (item) => `
                    <div>
                      <strong>${escapeHtml(item.name)}</strong>
                      <p>${escapeHtml(item.body)}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </section>

          <section class="article-section research-section" id="${sectionIds.validation}">
            <h2>两周验证计划</h2>
            <div class="plan-list">
              ${detail.validation
                .map(
                  (item) => `
                    <div>
                      <strong>${escapeHtml(item.week)}</strong>
                      <p>${escapeHtml(item.body)}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </section>

          <section class="article-section research-section" id="${sectionIds.risks}">
            <h2>主要风险和应对</h2>
            ${bulletList(detail.risks)}
          </section>
        </article>

        <aside class="side-panel">
          <h2>深度拆解</h2>
          <ol>
            <li><button class="toc-button" type="button" data-scroll-target="${sectionIds.why}">为什么现在</button></li>
            <li><button class="toc-button" type="button" data-scroll-target="${sectionIds.mvp}">MVP 功能</button></li>
            <li><button class="toc-button" type="button" data-scroll-target="${sectionIds.tech}">技术可行性</button></li>
            <li><button class="toc-button" type="button" data-scroll-target="${sectionIds.growth}">推广运营</button></li>
            <li><button class="toc-button" type="button" data-scroll-target="${sectionIds.validation}">验证计划</button></li>
            <li><button class="toc-button" type="button" data-scroll-target="${sectionIds.risks}">风险应对</button></li>
          </ol>
          ${sourceLinks(article)}
        </aside>
      </section>
    `;

    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.scrollTarget);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderArchive() {
    app.innerHTML = `
      <section class="layout">
        ${archiveRail(articles[0].date)}
        <div class="content-stack">
          <div class="article-head">
            <h1>日期归档</h1>
            <p class="lead">每天一篇，保留当日热点、候选机会、淘汰逻辑和最终推荐。</p>
          </div>
          ${articleCards(articles)}
        </div>
      </section>
    `;
  }

  function renderMethod() {
    const dimensions = [
      { name: "流量热词/新词潜力", description: "是否暴露可写页面、可做工具、可被搜索的新词或上升词。" },
      { name: "真实需求强度", description: "是否能说清谁在什么时刻遇到什么问题，而不是只有新闻热度。" },
      { name: "小工具/Mini SaaS 清晰度", description: "是否能做成查询器、计算器、检测器、生成器、目录、模板库或报告工具。" },
      { name: "MVP 与 GSC 验证速度", description: "是否能 1-3 天上线，提交 Google Search Console，并用曝光/点击决定继续还是放弃。" },
      { name: "变现路径", description: "是否适合 AdSense、订阅、一次性报告、模板包、affiliate 或线索收集。" },
      { name: "平台依赖风险", description: "是否需要双边网络、社区供给、平台冷启动或漫长企业销售；需要则降权。" },
    ];
    app.innerHTML = `
      <section class="article-head">
        <h1>筛选方法</h1>
        <p class="lead">每天先扫描过去一天全量信号，再按搜索流量、真实需求、产品化形态、MVP 速度和变现路径筛出最值得上站验证的机会。</p>
      </section>
      <section class="article-section">
        <h2>判断顺序</h2>
        <div class="method-grid">
          <div class="method-card"><h3>1. 全量信号</h3><p>先看过去一天完整信号池，不跟着源站标题、排序或推荐结论跑。</p></div>
          <div class="method-card"><h3>2. 独立拆词</h3><p>把每条信号拆成热词、新词、搜索 query、具体用户和触发场景。</p></div>
          <div class="method-card"><h3>3. 还原需求</h3><p>判断什么人、什么时刻、为了省什么时间或钱，愿意解决这个问题。</p></div>
          <div class="method-card"><h3>4. 产品化</h3><p>优先找能做成小工具、订阅站、目录站、报告站或模板库的单点切口。</p></div>
          <div class="method-card"><h3>5. 上站验证</h3><p>设计 1-3 天 MVP、首批页面和 GSC 观察指标，低成本看有没有搜索需求。</p></div>
          <div class="method-card"><h3>6. 淘汰重模式</h3><p>双边平台、社区冷启动、长销售周期和无明确搜索入口的机会默认降权。</p></div>
        </div>
      </section>
      <section class="article-section">
        <h2>评分维度</h2>
        <div class="dimension-grid">
          ${dimensions
            .map((dimension) => {
              const name =
                typeof dimension === "string"
                  ? dimension.split("：")[0] || dimension
                  : dimension.name;
              const description =
                typeof dimension === "string"
                  ? dimension.split("：").slice(1).join("：") || dimension
                  : dimension.description;
              return `
                <div>
                  <strong>${escapeHtml(name)}</strong>
                  <p>${escapeHtml(description)}</p>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  function router() {
    const hash = window.location.hash || "#/";
    const opportunityMatch = hash.match(/^#\/article\/([^/]+)\/opportunity\/(\d+)/);
    if (opportunityMatch) {
      renderOpportunityDetail(opportunityMatch[1], opportunityMatch[2]);
    } else if (hash.startsWith("#/article/")) {
      renderArticle(hash.replace("#/article/", ""));
    } else if (hash === "#/archive") {
      renderArchive();
    } else if (hash === "#/method") {
      renderMethod();
    } else {
      renderHome();
    }
    app.focus({ preventScroll: true });
  }

  window.addEventListener("hashchange", router);
  router();
})();
