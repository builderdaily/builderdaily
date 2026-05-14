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
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function paragraphList(items) {
    return items.map((item) => `<p>${escapeHtml(item)}</p>`).join("");
  }

  function bulletList(items) {
    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function scoreBoxes(article) {
    return `
      <div class="score-stack" aria-label="文章评分">
        <div class="score-box"><strong>${article.scores.commercial}</strong><span>商业价值</span></div>
        <div class="score-box"><strong>${article.scores.traffic}</strong><span>流量潜力</span></div>
        <div class="score-box"><strong>${article.scores.wedge}</strong><span>可验证切口</span></div>
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
          >
            <span>${escapeHtml(shortSourceType(source.type))}</span>
            <strong>${escapeHtml(source.label)}</strong>
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
          <h1>每天从 AI 热点里筛一个真正值得做的 WebApp</h1>
          <p>这里不存新闻摘要。每篇文章按需求真实性、现有替代方案、最窄切入、获客路径、风险和验证动作拆开写，最后只选一个最该做的机会。</p>
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
        const blob = `${article.title} ${article.summary} ${article.winner.name} ${article.tags.join(" ")} ${(article.sourceTags || []).join(" ")} ${article.sources.map((source) => `${source.type || ""} ${source.label}`).join(" ")}`.toLowerCase();
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

          <section class="article-section" id="shortlist">
            <h2>筛出的候选机会</h2>
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
  }

  function renderOpportunity(item, article, index) {
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
    app.innerHTML = `
      <section class="article-head">
        <h1>筛选方法</h1>
        <p class="lead">AI HOT 优先跑全量池，再结合 BuilderPulse 信号；先看热点是不是能变成真实购买行为，再看能不能用一个很窄的 WebApp 切口在一周内验证。</p>
      </section>
      <section class="article-section method-grid">
        <div class="method-card"><h2>1. 需求现实</h2><p>用户今天是不是已经在花钱、花时间、冒风险解决这个问题。</p></div>
        <div class="method-card"><h2>2. 替代方案</h2><p>如果没有新产品，用户现在怎么做。替代方案越笨、越贵、越急，机会越好。</p></div>
        <div class="method-card"><h2>3. 最窄切入</h2><p>不做平台梦，先找一个可以收费、能复购、能被搜索到的具体工作流。</p></div>
        <div class="method-card"><h2>4. 获客路径</h2><p>优先选能靠事故、模板、报告、开源工具或 SEO 自传播的机会。</p></div>
        <div class="method-card"><h2>5. 风险边界</h2><p>避开只靠大模型能力领先、巨头功能顺手覆盖、法律风险太重的切口。</p></div>
        <div class="method-card"><h2>6. 今日推荐</h2><p>每篇至少筛 3 个机会，但只把一个作为最值得推进的候选；超过 AI HOT 全量接口保留窗口的日期会明确标注为日报追溯。</p></div>
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
