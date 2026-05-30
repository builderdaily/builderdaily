const opportunity = (name, verdict, score, demand, statusQuo, wedge, distribution, risk, validation) => ({
  name,
  verdict,
  score: { commercial: score[0], traffic: score[1], wedge: score[2] },
  demand,
  statusQuo,
  wedge,
  distribution,
  risk,
  validation,
});

const source = (type, label, url) => ({ type, label, url });

const buildOpportunityDeepDive = (article, item, index) => ({
  subtitle: `${item.wedge} 这不是泛泛的趋势解读，而是把第 ${index + 1} 个候选机会拆成可验证产品。`,
  thesis: `${item.name} 的核心判断是：${item.demand} 最窄切口应从可交付、可复查、可收费的小报告或工作流开始，而不是一开始做平台。`,
  whyNow: [
    `当天文章的主线是“${article.title}”。${item.name} 能进入 Top 3，是因为它背后的需求已经从尝鲜进入真实工作流。`,
    item.demand,
    `现有替代方案仍然不够好：${item.statusQuo}`,
  ],
  mvp: [
    {
      stage: "第 1 周",
      title: "手工交付一份样板报告",
      body:
        "先不要急着搭完整系统。用 5-10 个真实样本手工交付结果，确认客户是否认可这个问题值得单独解决。",
      features: [
        "整理用户当前流程、输入材料、决策人和交付格式。",
        "把机会对应的痛点压成一页报告或一个可执行 checklist。",
        "记录用户最愿意保留、转发或付费的部分。",
      ],
    },
    {
      stage: "第 2 周",
      title: "做最窄自动化原型",
      body: item.wedge,
      features: [
        "只自动化最耗时或最难复查的一段，不覆盖完整平台。",
        "每条结论都保留证据来源、人工确认点和下一步动作。",
        "支持导出 HTML/PDF 或 PR/comment 形式，方便团队内部传播。",
      ],
    },
    {
      stage: "第 3-4 周",
      title: "转成团队工作流",
      body:
        "当样板报告被认可后，再加入历史留存、提醒、团队成员、权限和月度趋势，形成订阅理由。",
      features: [
        "团队空间：项目、成员、历史报告和负责人标注。",
        "重复执行：按周/月重新生成报告，发现变化和异常。",
        "管理层视图：把技术细节翻译成成本、风险、效率或收入影响。",
      ],
    },
  ],
  technical: [
    {
      title: "输入边界",
      status: "先窄后宽",
      body:
        "第一版只支持最常见的 1-2 种输入，避免因为集成太多而迟迟不能验证。",
    },
    {
      title: "判断方式",
      status: "规则优先",
      body:
        "核心评分和风险判断尽量用规则、结构化数据和可复查证据。LLM 负责总结和解释，不负责做不可追溯的最终判断。",
    },
    {
      title: "交付形态",
      status: "报告先行",
      body:
        "早期最容易卖的是负责人能转发的一页报告，而不是复杂仪表盘。报告跑通后再做持续监控。",
    },
    {
      title: "数据安全",
      status: "默认保守",
      body:
        "如果涉及代码、账单、账户、素材或客户数据，默认本地处理或私有部署，并提供脱敏预览。",
    },
  ],
  goToMarket: [
    item.distribution,
    "第一批用户应选择已经在手工处理这个问题的人，而不是只觉得概念有趣的人。判断标准是他们是否已经花时间、花预算或承担风险。",
    "早期销售话术要避免“AI 自动解决一切”，改成“帮你把这件事变成可复查、可交付、可追责的流程”。",
  ],
  pricing: [
    {
      name: "免费样板",
      body:
        "免费生成一个轻量报告或 checklist，用来验证用户是否愿意提供真实输入。",
    },
    {
      name: "团队版 $49-299/月",
      body:
        "按项目、成员、报告次数、历史留存、提醒和导出收费，适合小团队持续使用。",
    },
    {
      name: "企业/私有版 $5k/年起",
      body:
        "当数据敏感、需要 SSO、审计留存、自定义规则或私有部署时，进入年度合同。",
    },
  ],
  validation: [
    {
      week: "第 1 周：手工验证",
      body: item.validation,
    },
    {
      week: "第 2 周：原型验证",
      body:
        "把手工流程中最稳定的部分做成可点击原型或 CLI，观察用户是否愿意用真实数据重复跑第二次。",
    },
    {
      week: "成功标准",
      body:
        "至少 5 个目标用户认为报告可以转发给负责人，2 个用户愿意付费继续使用，且能说清它替代了哪段现有流程。",
    },
  ],
  risks: [
    item.risk,
    "如果买方只是个人好奇心，付费会很弱；必须尽快找到团队预算或明确收入/风险责任。",
    "如果产品只停留在摘要层，很容易被大平台内置能力替代；必须沉淀跨工具证据、历史和工作流。",
    "早期不要过度承诺自动化效果，先把可复查、可解释和可交付做好。",
  ],
});

const buildOpportunityFramework = (item) => ({
  scores: [
    { label: "需求强度", value: Math.max(7, Math.round(item.score.commercial / 10)) },
    { label: "场景具体度", value: Math.max(7, Math.round((item.score.commercial + item.score.wedge) / 20)) },
    { label: "替代缺口", value: Math.max(7, Math.round(item.score.wedge / 10)) },
    { label: "方案清晰", value: Math.max(7, Math.round(item.score.wedge / 10)) },
    { label: "长期性", value: Math.max(7, Math.round((item.score.commercial + item.score.traffic) / 20)) },
    { label: "供需失衡", value: Math.max(7, Math.round(item.score.traffic / 10)) },
    { label: "付费意愿", value: Math.max(7, Math.round(item.score.commercial / 10)) },
  ],
  demand: item.demand,
  scenario: item.demand,
  alternatives: item.statusQuo,
  solution: item.wedge,
  durability: item.risk,
  pricing: item.distribution,
});

window.AI_OPPORTUNITY_ARTICLES = [
  {
    date: "2026-05-30",
    title: "Codex 接管 Windows、Agent 成本和模型文档同日升温：今天最值得做的是 Desktop Agent Session Receipt",
    summary:
      "5 月 30 日最强的 WebApp 机会来自 AI Agent 从聊天框、IDE 和云端任务进一步走向真实电脑与真实生产线。Codex 在 Windows 上支持 computer use 与手机远程启动，Grok Build、OpenRouter apply_patch、Claude Code 和 Gemini Managed Agents 继续把工具调用推到工程现场；同时 Goldman Sachs 预测 Agent token 消耗到 2030 年增长 24 倍，企业仍普遍没看到生产力回报。今天最值得验证的是 Desktop Agent Session Receipt：为每次桌面或代码 Agent 任务生成一份可复查会话收据，记录它打开了什么、改了什么、测试了什么、哪里需要人工批准、花了多少成本。",
    tags: ["Desktop Agent", "Codex", "Agent 审计"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 2026-05-28", "官方或原始信号"],
    scores: { commercial: 99, traffic: 94, wedge: 95 },
    winner: {
      name: "Desktop Agent Session Receipt",
      short:
        "把 Codex、Claude Code、Grok Build、OpenRouter apply_patch、Gemini Managed Agents 和浏览器/桌面自动化任务变成一份会话收据：Agent 做过哪些动作、触达哪些文件和应用、提交哪些 diff、运行哪些测试、花了多少 token、哪些步骤需要人工批准或回滚。",
    },
    conclusion: [
      "当天 AI HOT 的全量信号显示，Agent 正在跨过一个边界：Codex 可以在 Windows 电脑上测试应用和操作 GUI，手机端可以启动与引导任务；OpenRouter 支持模型生成文件补丁；xAI Grok Build 快速迭代成严肃编码环境；Salesforce 声称 Claude Code 把迁移周期从 231 天压到 13 天；Google Agents API、LlamaIndex 和 Hermes Agent 又把文档处理、工具搜索和多 Agent 协作继续往前推。",
      "商业问题不是“桌面 Agent 能不能做事”，而是它一旦无人值守地改文件、点按钮、跑测试和调用外部服务，团队马上需要回答：它到底做了什么、证据在哪里、失败后能不能复盘、成本是否值得、哪些动作不能继续自动化。",
      "Top 3 推荐分别是 Desktop Agent Session Receipt、Agent Token ROI Ledger、Model Release Dossier Builder。第一名胜出，因为桌面/代码 Agent 的采用速度、风险边界和付费买方同时清楚：工程负责人、安全负责人、QA/支持团队和重度使用 Codex/Claude Code 的小团队，都需要一份能转发、能复查、能作为审批依据的任务收据。"
    ],
    signalPool: [
      {
        keyword: "Codex Windows computer use 与手机远程控制",
        signal: "AI HOT 多条信号记录 OpenAI Codex 在 Windows 上支持 computer use，可直接操作桌面应用、测试 WinUI/GUI、审查代码，并通过 ChatGPT 手机端远程启动、监控和引导任务。",
        opportunity: "Desktop Agent Session Receipt：为每次桌面 Agent 任务生成操作轨迹、截图证据、文件 diff、测试结果、人工批准点和回滚建议。",
        read: "进入 winner。Agent 一旦能操作真实电脑，买方就不再只关心效果，而会关心可追溯性和责任边界。",
        status: "进入 Top 3",
        sourceRefs: [0, 1, 2, 3, 4],
      },
      {
        keyword: "OpenRouter apply_patch 与模型生成补丁",
        signal: "OpenRouter 支持模型通过 Responses API 生成 V4A diff，并在服务端验证补丁语法，说明文件修改能力正在从单个 IDE 走向模型网关层。",
        opportunity: "Patch Receipt for Agents：记录模型提出的补丁、应用前后差异、触达文件、验证命令和 reviewer 决策。",
        read: "并入 winner。补丁能力越标准化，越需要独立收据解释每次修改的证据链。",
        status: "支撑判断",
        sourceRefs: [0, 5],
      },
      {
        keyword: "Grok Build 快速迭代为智能体编码环境",
        signal: "xAI Grok Build 增加 X 搜索、更快网页搜索、命令、Windows ARM64/macOS x86_64 支持、子智能体共享终端后端与调度器，模型也以较低 token 价格开放测试。",
        opportunity: "Agent IDE Session Archive：跨 Codex、Claude Code、Grok Build 归档任务计划、子任务、命令、搜索、diff 与终端输出。",
        read: "支撑 winner。不同 Agent IDE 会竞争，但团队需要跨工具的任务证据层。",
        status: "支撑判断",
        sourceRefs: [0, 6],
      },
      {
        keyword: "Salesforce Claude Code 迁移案例与 AI 编码争议",
        signal: "Salesforce 声称使用 Claude Code 将 231 天迁移缩短到 13 天，PR 数增长、事故下降，但这些数字也引发“革命还是技术债”的争议。",
        opportunity: "AI Migration Evidence Pack：为大型 AI 迁移任务保存范围、PR、测试、事故、人工接管和复查债务。",
        read: "支撑 winner 和第二名。越大的效率承诺，越需要独立报告证明收益不是把债务后移。",
        status: "支撑判断",
        sourceRefs: [0, 7],
      },
      {
        keyword: "Agent token 消耗 24 倍与企业 ROI 焦虑",
        signal: "AI HOT 记录 Goldman Sachs 预测 Agent token 月消耗到 2030 年增长约 24 倍；另一条信号显示超过 80% 企业尚未从 AI 获得生产力提升，Agent 的 token 循环可能比普通问答高很多。",
        opportunity: "Agent Token ROI Ledger：按任务、工具调用、模型、缓存、返工和人工节省时间生成成本收益账本。",
        read: "进入 Top 3。它有明确买方：已经为 Agent 账单、额度和生产力承诺负责的工程/财务负责人。",
        status: "进入 Top 3",
        sourceRefs: [0, 8, 9],
      },
      {
        keyword: "MiMo API 降价、推理优化与模型价格战",
        signal: "小米 MiMo-V2.5 系列 API 永久降价，背后是 KVCache、前缀缓存、调度和多模态推理优化；Grok Build 模型也以低输入/输出价格进入编码场景。",
        opportunity: "Model Cost Switchboard：给团队模拟同一类 Agent 任务在不同模型、上下文、缓存策略和重试预算下的成本。",
        read: "支撑第二名。价格下降会提高使用量，但团队仍需要知道哪些任务真正值得跑。",
        status: "支撑判断",
        sourceRefs: [0, 10, 6],
      },
      {
        keyword: "Claude Opus 4.8 中途系统指令与 Prompt Cache",
        signal: "Claude Devs 记录 Opus 4.8 支持对话中途添加系统指令且不破坏提示词缓存，说明长任务中动态调整 Agent 行为会变得更常见。",
        opportunity: "Prompt Policy Change Log：记录任务中途的系统指令变更、缓存影响、行为边界和审批原因。",
        read: "并入第二名和 winner。动态系统指令既影响成本，也影响责任边界。",
        status: "支撑判断",
        sourceRefs: [0, 11],
      },
      {
        keyword: "NVIDIA MCG Toolkit 与模型文档自动化",
        signal: "NVIDIA 技术博客记录 MCG Toolkit 用于自动化模型文档，覆盖工作原理、预期用途、许可证、训练数据、性能等，背景包括加州 AB-2013 与欧盟 AI 法案等监管压力。",
        opportunity: "Model Release Dossier Builder：为每个模型、微调版本或 AI 功能生成模型卡、数据说明、许可证、用途边界、评测和发布检查包。",
        read: "进入 Top 3。这是监管、采购和开源发布同时会要求的交付物。",
        status: "进入 Top 3",
        sourceRefs: [0, 12],
      },
      {
        keyword: "NVIDIA OpenMDW 与开放模型许可统一",
        signal: "NVIDIA 将多个开放模型系列迁移至 Linux Foundation OpenMDW 框架，以降低模型权重、代码、文档和数据许可审查负担。",
        opportunity: "Open Model License Checklist：扫描模型发布材料，输出许可、再分发、商用、数据和文档缺口。",
        read: "支撑第三名。模型发布不只是上传权重，而是需要可复查的法律和文档包。",
        status: "支撑判断",
        sourceRefs: [0, 13],
      },
      {
        keyword: "PaddleOCR-VL 1.6 与文档解析输入质量",
        signal: "PaddleOCR-VL 1.6 在文档解析基准上提升，强化表格、图表、印章和稀有字符识别，说明高质量文档输入仍是企业 AI 系统的基础层。",
        opportunity: "Document AI Input QA：为 RAG、审批和模型文档流程检查 OCR/解析质量、缺失字段和人工复核点。",
        read: "支撑第三名。文档自动化的价值不在抽取本身，而在可证明输入质量足够可靠。",
        status: "支撑判断",
        sourceRefs: [0, 14],
      },
      {
        keyword: "LlamaIndex / Gemini Agents API 文档处理模板",
        signal: "LlamaIndex 团队基于 Google Agents API 构建模板，让智能体访问 LlamaParse/LiteParse 处理非结构化文档，并把结果提交到 Git 仓库。",
        opportunity: "Agent Document Runbook Receipt：记录文档处理 Agent 的输入、解析器、输出仓库、异常、人工复核和最终可用性。",
        read: "支撑 winner 和第三名。文档 Agent 进入真实仓库后，证据链和质量检查是付费点。",
        status: "支撑判断",
        sourceRefs: [0, 15],
      },
      {
        keyword: "Perplexity 每日简报、记忆和连接器",
        signal: "Perplexity 持续优化每日简报，允许用户自定义数据来源、记忆、网络来源、指令和连接器。",
        opportunity: "Personal Briefing Source Auditor：检查每日简报的信息源、偏差、重复项、遗漏和可追溯链接。",
        read: "观察。消费/个人效率属性强，商业买方不如桌面 Agent 和模型文档清楚。",
        status: "观察",
        sourceRefs: [0, 17],
      },
      {
        keyword: "Meta AI 可穿戴与 Wearables for Work",
        signal: "Meta 泄露备忘录显示其推进 AI 吊坠、AI 眼镜和企业可穿戴服务，目标是把硬件销售转化为持续 AI 收入。",
        opportunity: "Workplace Wearable Data Policy Pack：为企业检查会议记忆、视觉数据、员工同意和保留策略。",
        read: "暂不进 Top 3。方向重要，但硬件采用和企业采购周期更长，不如桌面 Agent 立即可验证。",
        status: "未入选",
        sourceRefs: [0, 18],
      },
      {
        keyword: "Luma Agents、Runway API、Gemini Omni 多模态生产",
        signal: "Luma Agents 自动生成播客和博客宣传素材，Runway API 扩展模型与端点，Gemini Omni 展示视频编辑和物理理解生成。",
        opportunity: "AI Campaign Asset Receipt：记录多模态素材来源、模型、版本、授权、客户交付状态和平台标注要求。",
        read: "不进 Top 3。它仍是好机会，但 5 月 29 日已覆盖 AI 生产素材收据，今天更强的新变化是桌面 Agent 与模型文档。",
        status: "未入选",
        sourceRefs: [0, 19, 20],
      }
    ],
    scoringDimensions: [
      "真实需求：是否已经有 Agent 在真实电脑、代码库、文档仓库或生产工作流里执行任务。",
      "具体场景：是否能落到每次任务结束后必须复查、批准、转发或归档的一份报告。",
      "替代缺口：平台日志、聊天记录、终端输出、PR 和账单是否分散，是否无法直接给负责人解释。",
      "解决方案清晰度：第一版能否只读导入会话记录、diff、截图和账单，输出一页收据验证价值。",
      "长期性：桌面 Agent、代码 Agent、文档 Agent 和模型发布合规是否会随着自动化加深而长期存在。",
      "供需失衡：是否已有高频使用和公开焦虑，但缺少跨工具、可交付的 WebApp。",
      "付费意愿：买方是否有工程效率、安全审批、财务成本、客户交付或监管文档责任。"
    ],
    opportunities: [
      {
        ...opportunity(
          "Desktop Agent Session Receipt",
          "今日第一优先级",
          [99, 94, 95],
          "AI Agent 已经开始操作 Windows、生成补丁、运行测试、管理线程和调用搜索/终端。真实需求是让负责人知道每次无人值守任务到底做了什么、触达什么、花了多少、哪些动作需要人工批准。",
          "现在靠聊天记录、终端输出、Git diff、屏幕录制、CI 日志和人工记忆拼接。它们散落在不同工具里，无法作为审批、复盘或客户交付依据。",
          "做只读导入器：读取 Codex/Claude/Grok 会话、Git diff、命令历史、测试输出、截图和 token 账单，生成任务摘要、动作时间线、风险动作、证据链接、回滚建议和负责人签字区。",
          "第一批用户是重度使用 Codex/Claude Code 的工程团队、QA 自动化团队、安全负责人和 AI-heavy 创始人；免费生成单次任务收据，团队版卖历史归档、策略模板、Slack/GitHub PR 评论和本地部署。",
          "平台会补自己的任务日志；独立产品必须跨工具、跨桌面、跨代码库，并把证据翻译成负责人可以直接复查的语言。",
          "找 10 个已经用 Codex/Claude Code/Grok Build 跑真实任务的团队，手工生成 20 份会话收据；成功标准是 5 个团队愿意把报告贴进 PR 或复盘，2 个团队愿意为历史归档付费。"
        ),
        deepDive: {
          subtitle:
            "桌面 Agent 开始动真格时，团队缺的不是又一个聊天记录，而是一份能复查、能审批、能回滚的任务收据。",
          thesis:
            "Desktop Agent Session Receipt 的核心判断是：当 Codex、Claude Code、Grok Build 和文档 Agent 能够操作电脑、改文件、跑测试和提交补丁后，组织最先愿意付费的不是更强模型，而是每次任务后的证据包。",
          whyNow: [
            "5 月 30 日的信号把边界推得很清楚：Codex 在 Windows 上支持 computer use 与手机远程控制，OpenRouter 把 apply_patch 做成模型网关能力，Grok Build 快速补齐搜索、命令和多平台支持，Salesforce 的 Claude Code 迁移案例又把效率承诺推到管理层面前。",
            "这些能力一旦进入真实工作流，负责人需要的不是“Agent 很聪明”的演示，而是“它打开了什么、改了什么、测试了什么、为什么这么做、哪里失败、能不能回滚”。",
            "现有替代方案都在局部：IDE 有 diff，CI 有日志，聊天工具有对话，屏幕录制有画面，但没有一份跨工具、可转发、可归档的收据。"
          ],
          mvp: [
            {
              stage: "第 1 周",
              title: "手工会话收据",
              body:
                "先找真实 Agent 任务，不接任何敏感 API。用户上传会话导出、diff、测试输出和可选截图，人工加半自动生成一页报告。",
              features: [
                "任务概览：目标、Agent、模型、开始/结束时间、操作者和最终结果。",
                "动作时间线：文件读写、命令、网页访问、测试、补丁、人工接管点。",
                "负责人视图：风险动作、失败步骤、回滚建议、是否建议继续自动化。"
              ],
            },
            {
              stage: "第 2 周",
              title: "只读导入和证据链接",
              body:
                "把最常见输入格式自动化：Git diff、shell history、CI output、Codex/Claude 会话导出、截图文件夹。",
              features: [
                "本地解析，不上传源代码和密钥。",
                "每条结论链接到原始证据，避免只有 LLM 摘要。",
                "生成 PR comment、HTML 和 PDF 三种交付格式。"
              ],
            },
            {
              stage: "第 3-4 周",
              title: "团队归档与策略",
              body:
                "当单次报告被使用后，再加入团队空间、历史对比、审批规则和自动提醒。",
              features: [
                "按项目、Agent、模型和风险级别查看历史任务。",
                "策略模板：哪些文件、命令、域名或环境变量必须人工审批。",
                "周报：Agent 节省时间、失败率、返工率和高风险动作趋势。"
              ],
            }
          ],
          technical: [
            {
              title: "采集边界",
              status: "本地优先",
              body:
                "第一版只处理用户主动导出的文件和日志，避免浏览器插件、系统级录屏和在线 token 权限。这样能最快穿过信任门槛。"
            },
            {
              title: "事件模型",
              status: "需要结构化",
              body:
                "把 diff、命令、测试、截图和会话统一成 actor/tool/action/target/evidence/risk schema。核心资产是证据链，不是摘要文案。"
            },
            {
              title: "风险判断",
              status: "规则优先",
              body:
                "高风险动作先用规则识别：删除、外发、密钥、权限、支付、生产配置、未测试 diff。LLM 负责解释，不做不可追溯裁决。"
            },
            {
              title: "部署形态",
              status: "可本地可私有",
              body:
                "涉及代码、屏幕和命令记录，MVP 应提供本地 WebApp 或 CLI；团队版再卖私有部署、SSO 和审计留存。"
            }
          ],
          goToMarket: [
            "第一批用户找已经公开使用 Codex、Claude Code、Grok Build、OpenCode 的小工程团队，不找泛 AI 爱好者。",
            "冷启动内容可以用公开 demo 生成样例收据：一个 Windows GUI 测试任务、一个 AI PR、一个文档处理 Agent，各自展示它们真实触达了哪些资源。",
            "销售话术不要说“让 Agent 更安全”，而说“每次 Agent 做完事，你有一份可以贴进 PR、发给老板、留给复盘的收据”。"
          ],
          pricing: [
            {
              name: "免费单次收据",
              body:
                "最多 1 个任务、3 个输入文件、带水印 HTML。目标是拿到真实格式和传播样例。"
            },
            {
              name: "团队版 $49-199/月",
              body:
                "项目空间、历史归档、PR comment、Slack 推送、风险规则、周报和成员权限。"
            },
            {
              name: "私有部署 $5k/年起",
              body:
                "给安全敏感团队，卖日志不出域、SSO、审计留存、自定义规则和离线运行。"
            }
          ],
          validation: [
            {
              week: "第 1 周：手工报告",
              body:
                "收集 20 次真实 Agent 任务，手工做报告。观察用户是否愿意把报告发给同事、贴进 PR 或用于复盘。"
            },
            {
              week: "第 2 周：只读导入",
              body:
                "支持 Git diff、测试输出和会话导入，减少人工整理时间。验证用户是否愿意第二次重复使用。"
            },
            {
              week: "成功标准",
              body:
                "5 个团队愿意持续导入任务，2 个团队愿意为历史留存或私有项目付费，且报告能直接影响审批或回滚决策。"
            }
          ],
          risks: [
            "平台会做自己的日志，因此必须跨平台、跨桌面和跨代码库。",
            "采集敏感信息会让用户紧张，默认本地处理和脱敏预览是基础要求。",
            "如果报告只是漂亮摘要，很快会失去价值；必须保留原始证据和可点击来源。",
            "早期不要承诺合规认证，只定位为任务复盘和审批辅助。"
          ],
        },
      },
      {
        ...opportunity(
          "Agent Token ROI Ledger",
          "成本买方明确",
          [94, 88, 89],
          "Agent 任务会进行多轮工具调用、检查和修正，token 消耗可能远高于普通问答；同时很多企业尚未看到生产力提升。真实需求是按任务判断 AI 自动化到底省了时间，还是只是把账单和返工放大。",
          "现在靠模型账单、IDE 统计、人工估时和财务表格拼接。账单知道花了多少钱，但不知道每个任务带来的产出、返工和人工替代价值。",
          "按 Agent 任务生成 ROI 账本：模型成本、工具调用、缓存命中、重试、人工接管、节省时间、返工、失败率和继续/暂停建议。",
          "从 AI-heavy 工程团队、客服自动化团队和财务/工程共同负责 AI 预算的公司切入；免费做一次成本复盘，团队版按任务量、模型连接器和月报收费。",
          "容易变成泛模型账单看板；必须绑定具体任务和可行动建议，而不是只显示 token 曲线。",
          "找 10 个团队的 50 个 Agent 任务做手工 ROI 复盘；如果负责人愿意基于报告调整模型、缓存、额度或自动化范围，就说明价值成立。"
        ),
        deepDive: {
          subtitle:
            "Agent 会越来越便宜，也会越来越能花钱；付费点在任务级 ROI，而不是又一张 token 图表。",
          thesis:
            "Agent Token ROI Ledger 的核心判断是：企业不会为“看见 token”付高价，但会为“知道哪些 Agent 任务值得继续跑、哪些该降级、哪些该人工接管”付费。",
          whyNow: [
            "同一天出现两类相反信号：Goldman Sachs 预测 Agent token 消耗大涨，小米 MiMo 和 Grok Build 又显示模型价格会继续下降。价格下降不会消除成本问题，反而会让使用量更快增长。",
            "超过 80% 企业尚未从 AI 获得生产力提升的信号，说明买方不只问账单，而是问投入是否真的变成产出。",
            "现有模型网关和云账单能告诉团队花了多少，但很难告诉某个 Agent 任务是否比人工更划算。"
          ],
          mvp: [
            {
              stage: "第 1 周",
              title: "任务级手工复盘",
              body:
                "让用户提供 20-50 个 Agent 任务记录、模型账单和大致人工估时，手工生成 ROI 表。",
              features: [
                "每个任务的模型、token、工具调用、重试和失败原因。",
                "人工基线：如果不用 Agent，大约需要谁花多久。",
                "建议：继续自动化、降级模型、加缓存、拆任务或改人工。"
              ],
            },
            {
              stage: "第 2 周",
              title: "账单和任务导入",
              body:
                "接 OpenRouter、OpenAI/Anthropic 导出、IDE 统计和 GitHub/Linear 任务，把成本和产出放到同一行。",
              features: [
                "任务归因：把 token 花费归到 issue、PR、ticket 或客户请求。",
                "缓存/重试分析：识别可节省的长上下文和失败循环。",
                "周报导出：给工程负责人和财务看不同版本。"
              ],
            },
            {
              stage: "第 3-4 周",
              title: "预算规则和模拟",
              body:
                "加入模型切换、上下文策略和自动化范围模拟，帮助团队在执行前估算成本。",
              features: [
                "不同模型/价格/缓存策略的成本对比。",
                "按任务类型设置预算上限和审批条件。",
                "ROI 趋势：哪些 Agent 类型越用越值，哪些一直在浪费。"
              ],
            }
          ],
          technical: [
            {
              title: "数据归因",
              status: "难点在映射",
              body:
                "账单通常按 API key 或模型聚合，产品要把成本映射到任务、PR、ticket 和负责人。第一版可以用手工标签和导入文件解决。"
            },
            {
              title: "ROI 计算",
              status: "规则透明",
              body:
                "不要伪装成精确财务模型。把假设公开：人工时薪、节省时间、返工、失败任务、模型成本和工具成本。"
            },
            {
              title: "连接器",
              status: "先少后多",
              body:
                "先支持 CSV/JSON 导入和 OpenRouter/OpenAI/Anthropic 常见账单，再接 IDE 和工单系统。"
            },
            {
              title: "隐私",
              status: "只读摘要",
              body:
                "默认不保存 prompt 原文，只保存 token、模型、任务类型和哈希化任务 ID，减少敏感内容进入系统。"
            }
          ],
          goToMarket: [
            "找已经被额度、账单或管理层追问的团队，他们的问题不是概念教育，而是本月要解释花费。",
            "内容入口可以是“Agent 任务 ROI 体检”：上传一周账单和任务表，免费生成浪费 Top 5。",
            "和 Desktop Agent Session Receipt 可以互相导流：收据解释单次任务，ROI Ledger 解释一周/月的预算。"
          ],
          pricing: [
            {
              name: "免费体检",
              body:
                "上传一周导出，生成 10 个任务内的 ROI 样例。"
            },
            {
              name: "团队版 $99-399/月",
              body:
                "按任务量、连接器、历史留存、预算规则和团队报告收费。"
            },
            {
              name: "财务版 $5k/年起",
              body:
                "给需要跨团队分摊成本、审计留存和自定义预算策略的公司。"
            }
          ],
          validation: [
            {
              week: "第 1 周：手工 ROI",
              body:
                "对 3 个团队做免费体检，验证他们是否能根据报告做出模型或流程调整。"
            },
            {
              week: "第 2 周：重复导入",
              body:
                "让同一批用户一周后再导入一次，测试是否形成周期性需求。"
            },
            {
              week: "成功标准",
              body:
                "至少 2 个团队愿意为持续月报付费，且报告能发现一个明确省钱或停用动作。"
            }
          ],
          risks: [
            "模型价格持续下降会弱化纯成本叙事，所以必须强调 ROI 和任务质量。",
            "人工节省时间难以精确衡量，早期要允许用户调整假设。",
            "如果只接一个模型供应商，很容易被平台内置功能替代。",
            "财务和工程语言不同，报告必须同时给两类人看得懂。"
          ],
        },
      },
      {
        ...opportunity(
          "Model Release Dossier Builder",
          "监管和发布压力清楚",
          [90, 84, 88],
          "模型、微调版本、文档解析管线和多模态 API 正在快速发布；监管、采购、开源许可和客户交付都要求团队说明模型用途、数据、许可证、评测和风险。真实需求是把模型发布材料整理成可审计档案。",
          "现在靠 README、模型卡、法务表格、实验记录和工程文档分散维护。发布越快，越容易缺许可证、用途边界、数据说明或评测证据。",
          "导入模型 repo、README、评测结果、许可证和数据说明，生成模型卡、发布 checklist、许可风险、用途边界、评测摘要和客户/采购版 dossier。",
          "从开源模型团队、AI API 初创公司、企业内部模型平台和文档 AI 团队切入；免费检查一个模型，付费卖团队模板、审批流、历史版本和私有部署。",
          "监管文档容易变成咨询；产品必须用模板和自动检查交付，而不是每个客户重新写一遍。",
          "找 5 个正在发布模型或 AI 功能的团队，手工补齐 dossier；如果他们愿意把它放进 release checklist 或发给客户，就说明切口成立。"
        ),
        deepDive: {
          subtitle:
            "模型发布越像软件发布，越需要一份能给法务、客户、采购和工程同时看的 release dossier。",
          thesis:
            "Model Release Dossier Builder 的核心判断是：NVIDIA MCG、OpenMDW、PaddleOCR 和文档 Agent 信号指向同一个需求，AI 团队需要把模型能力、数据、许可、用途和评测整理成可复查交付物。",
          whyNow: [
            "NVIDIA MCG Toolkit 明确把模型文档自动化和监管框架联系起来；OpenMDW 又把开放模型许可统一放到模型发布流程里。",
            "PaddleOCR-VL、LlamaParse/LiteParse 和文档处理 Agent 说明企业 AI 的输入链路也需要质量证明，不只是模型本身需要说明。",
            "现有 README 和模型卡经常面向开发者，不足以应对客户采购、内部审批和监管留痕。"
          ],
          mvp: [
            {
              stage: "第 1 周",
              title: "单模型发布检查",
              body:
                "用户上传 repo 链接、README、license、eval 表和数据说明，系统生成缺口报告。",
              features: [
                "模型卡完整性检查：用途、限制、数据、评测、许可、联系方式。",
                "许可和再分发 checklist。",
                "客户版摘要：非技术采购能看懂的能力边界和风险。"
              ],
            },
            {
              stage: "第 2 周",
              title: "Dossier 生成器",
              body:
                "把检查结果转成标准交付包，支持 Markdown、HTML、PDF 和 GitHub release 附件。",
              features: [
                "版本化 dossier：每次发布保留变更记录。",
                "评测证据链接：数据集、指标、样本、失败模式。",
                "审批状态：工程、法务、安全、产品各自确认。"
              ],
            },
            {
              stage: "第 3-4 周",
              title: "团队模板和持续监控",
              body:
                "为团队建立固定模板，并在模型、数据或许可变更时提醒更新。",
              features: [
                "组织模板：不同模型类型对应不同发布要求。",
                "GitHub Action：PR 中检查 dossier 缺口。",
                "客户包白标导出：给采购或安全问卷复用。"
              ],
            }
          ],
          technical: [
            {
              title: "解析对象",
              status: "结构化优先",
              body:
                "读取 README、model card、license、eval JSON/CSV、data statement 和 release notes。LLM 负责归纳，规则负责缺口检查。"
            },
            {
              title: "模板体系",
              status: "决定规模化",
              body:
                "按基础模型、微调模型、OCR/文档管线、多模态 API、内部 Agent 模型分别定义必填字段。"
            },
            {
              title: "证据链接",
              status: "必须保留",
              body:
                "每个结论都要指向原文件、commit、评测表或许可证段落，避免生成一份不可审计的漂亮文档。"
            },
            {
              title: "部署",
              status: "可 SaaS 可私有",
              body:
                "开源团队可以用 SaaS；企业模型平台通常需要私有部署或 GitHub Enterprise 集成。"
            }
          ],
          goToMarket: [
            "先服务公开模型和 AI API 小团队：他们需要发布快，又没有专职合规/文档团队。",
            "用免费 GitHub Action 做获客：PR 中提示模型卡、license 或 eval 缺口。",
            "付费入口是客户/采购包和版本化留存，因为这直接减少销售与安全问卷时间。"
          ],
          pricing: [
            {
              name: "开源免费",
              body:
                "公开 repo 单模型检查和基础 badge。"
            },
            {
              name: "团队版 $49-299/月",
              body:
                "私有 repo、模板、版本历史、审批流、导出和 GitHub Action。"
            },
            {
              name: "企业版 $10k/年起",
              body:
                "私有部署、SSO、自定义监管模板、审计留存和采购包白标。"
            }
          ],
          validation: [
            {
              week: "第 1 周：手工补齐",
              body:
                "选 10 个近期模型/API 发布，手工生成 dossier，观察团队是否愿意采纳缺口建议。"
            },
            {
              week: "第 2 周：GitHub Action",
              body:
                "做最小 Action，只检查 8-12 个必填字段，验证是否能进入真实 release 流程。"
            },
            {
              week: "成功标准",
              body:
                "3 个团队把 dossier 用于 release 或客户回复，1-2 个团队愿意为私有模板和导出付费。"
            }
          ],
          risks: [
            "监管要求会变化，产品必须把模板配置化，而不是写死一套条款。",
            "如果只生成文档不做证据链接，会被视为合规幻觉。",
            "小开源团队付费弱，商业化要转向企业内部模型平台和 AI API 公司。",
            "法务责任不能过度承诺，应定位为准备材料和缺口检查。"
          ],
        },
      }
    ],
    rejected: [
      "Meta AI 可穿戴和 Wearables for Work 是重要长期平台信号，但硬件落地、员工同意和企业采购周期较长，不如桌面 Agent 收据能在两周内验证。",
      "Perplexity 每日简报、记忆和连接器适合做个人信息源产品，但今天缺少明确付费买方，容易落入消费效率工具红海。",
      "AI 虚假黑人形象带货、AI 反感和平台标注议题有社会价值，但独立 WebApp 切口更像平台治理或内容审核，不是今天最强商业机会。",
      "Inherent、工业数学、AI 社会自治测试等研究信号值得观察，但距离可收费 WebApp 工作流较远。",
      "多模态宣传素材收据仍然成立，但 5 月 29 日已覆盖相近机会；今天的新信息增量更集中在桌面 Agent、成本 ROI 和模型发布文档。"
    ],
    sources: [
      source("AI HOT 全量", "AI HOT 2026-05-30 全量信号", "https://aihot.virxact.com/"),
      source("官方或原始信号", "OpenAI Developers：Codex Windows 开发工作流", "https://x.com/OpenAIDevs/status/2060429591655927942"),
      source("官方或原始信号", "Greg Brockman：Codex Windows 与手机协同", "https://x.com/gdb/status/2060432274710315010"),
      source("AI HOT 全量", "Testing Catalog：Codex Windows computer use", "https://x.com/testingcatalog/status/2060459862601937063"),
      source("AI HOT 全量", "The Decoder：Codex 可在 Windows PC 上自主操作", "https://the-decoder.com/openais-codex-can-now-operate-your-windows-pc-autonomously-hunting-bugs-and-testing-apps-on-its-own"),
      source("官方或原始信号", "OpenRouter：模型生成 apply_patch 补丁", "https://x.com/OpenRouter/status/2060395056196936054"),
      source("官方或原始信号", "xAI Grok Build v0.2.11 与 grok-build-0.1", "https://x.com/elonmusk/status/2060605320729186601"),
      source("AI HOT 全量", "The Decoder：Salesforce Claude Code 迁移案例", "https://the-decoder.com/salesforce-claims-ai-agents-cut-a-231-day-migration-to-13-days-with-fewer-incidents"),
      source("AI HOT 全量", "Goldman Sachs：Agent token 消耗增长预测", "https://x.com/rohanpaul_ai/status/2060652043296182521"),
      source("AI HOT 全量", "企业 AI 生产力与 Agent 能耗信号", "https://x.com/rohanpaul_ai/status/2060679110826094724"),
      source("官方或原始信号", "小米 MiMo-V2.5 API 降价与推理优化", "https://www.ithome.com/0/957/621.htm"),
      source("官方或原始信号", "Claude Devs：Opus 4.8 中途系统指令", "https://x.com/ClaudeDevs/status/2060432688281251998"),
      source("官方", "NVIDIA MCG Toolkit 模型文档自动化", "https://developer.nvidia.com/blog/how-to-automate-ai-model-documentation-with-the-nvidia-mcg-toolkit"),
      source("官方或原始信号", "NVIDIA 开放模型迁移至 OpenMDW 框架", "https://x.com/kimmonismus/status/2060458698930016378"),
      source("官方或原始信号", "PaddleOCR-VL 1.6 文档解析 SOTA", "https://x.com/berryxia/status/2060393180563157279"),
      source("官方或原始信号", "LlamaIndex 与 Gemini Agents API 文档处理模板", "https://x.com/googleaidevs/status/2060439904929382700"),
      source("BuilderPulse", "BuilderPulse 2026-05-28 中文报告（最近可用）", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-28.md"),
      source("AI HOT 全量", "Perplexity 每日简报与连接器信号", "https://x.com/testingcatalog/status/2060708411805724681"),
      source("AI HOT 全量", "Meta AI 可穿戴与 Wearables for Work", "https://x.com/rohanpaul_ai/status/2060682478210166790"),
      source("官方或原始信号", "Luma Agents 生成宣传素材", "https://x.com/LumaLabsAI/status/2060461313713909783"),
      source("官方或原始信号", "Runway API 模型与端点扩展", "https://x.com/runwayml/status/2060453805519765548"),
    ],
  },
  {
    date: "2026-05-29",
    title: "MCP、编码 Agent 和 AI 影视同日升温：今天最值得做的是 Agent Tool Policy Ledger",
    summary:
      "5 月 29 日最强的 WebApp 机会来自一个共同变化：AI 不再只是回答问题，而是在 IDE、MCP、钱包、云端工作区、视频生产线和企业流程里调用工具、改代码、生成资产。最值得验证的是 Agent Tool Policy Ledger：导入团队正在使用的 MCP server、IDE Agent、云 Agent、API key、文件权限和工具调用记录，输出一份负责人能签字的工具权限账本，说明哪些 Agent 可以继续放权、哪些动作必须审批、哪些调用需要记录和回滚。",
    tags: ["MCP", "AI Agent", "权限治理"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 2026-05-28", "官方或原始信号"],
    scores: { commercial: 98, traffic: 91, wedge: 93 },
    winner: {
      name: "Agent Tool Policy Ledger",
      short:
        "把团队里的 MCP server、AI IDE、云端 Agent、钱包/支付能力、API key、文件读写和外部请求整理成一份工具权限账本：每个 Agent 能做什么、实际做过什么、谁批准、失败后怎么回滚、下一步该继续自动、改成审批，还是收回权限。",
    },
    conclusion: [
      "当天 AI HOT 的关键词很集中：Tomer Tunguz 谈 AI Agent 身份与策略控制、Google Pay / Wallet 提供 MCP 工具、阿里云开源百炼 CLI、Cursor 发布开发者习惯报告、Claude Code 工作流继续扩散、xAI Grok Studio 与 Workspace 强化生成式工作台、OpenAI 推出第三方评估操作手册，另外还有 Kling AI 短片、ControlFoley、PixVerse、Rodin Gen-2.5 和 Stable Audio 3.0 等多模态生产信号。",
      "这些信号背后的商业问题不是“哪个模型更强”，而是团队正在把真实权限交给越来越多的 Agent：它们能读文件、调用 API、生成代码、触发支付、创建视频资产、连接客户工作流。负责人很快会问三个问题：谁给了权限、实际调用了什么、出错后谁负责。",
      "Top 3 推荐分别是 Agent Tool Policy Ledger、AI Coding Throughput & Review Debt Meter、AI Production Asset Receipt。第一名胜出，因为它把 MCP、IDE Agent、云 Agent、企业评估和支付/钱包工具接到同一个付费触发上：权限放大已经发生，但跨工具账本还没有成为默认配置。"
    ],
    signalPool: [
      {
        keyword: "AI Agent 身份、策略和工具权限控制",
        signal: "AI HOT 记录关于 AI Agent 安全的新讨论：企业需要为 Agent 建立身份、授权、策略和工具边界，而不能只依赖模型自己做正确选择。",
        opportunity: "Agent Tool Policy Ledger：按 Agent、工具、权限、审批、调用和回滚能力生成负责人可读的权限账本。",
        read: "进入 winner。它有清楚买方：工程、安全、IT、平台和 AI-heavy 创始人。",
        status: "进入 Top 3",
        sourceRefs: [0, 1, 2],
      },
      {
        keyword: "Google Pay / Wallet MCP 工具",
        signal: "AI HOT 记录 Google Pay 和 Wallet 推出 MCP 相关工具，让开发者用自然语言探索和集成支付、钱包与优惠能力。",
        opportunity: "Payment MCP Guard：识别 Agent 是否触达支付、优惠、订单和客户身份数据，并要求高风险动作审批。",
        read: "支撑 winner。MCP 连接支付能力后，工具权限不再只是开发便利，而是财务和合规边界。",
        status: "进入 Top 3",
        sourceRefs: [0, 3],
      },
      {
        keyword: "阿里云百炼 CLI / Qwen Agent 与企业工作流",
        signal: "AI HOT 记录阿里云开源百炼 CLI，支持模型调用、应用部署、MCP server 管理、Function Call、RAG、评测和可观测性。",
        opportunity: "Enterprise Agent Readiness Report：检查团队是否具备工具清单、日志、评测、回滚和人工审批能力。",
        read: "并入 winner。平台越把 Agent 工具链包装成基础设施，团队越需要独立账本解释风险和责任。",
        status: "支撑判断",
        sourceRefs: [0, 4],
      },
      {
        keyword: "Cursor 开发者习惯报告 / AI 代码增长",
        signal: "AI HOT 记录 Cursor 报告称用户代码输出、AI 工具调用和被接受代码留存都在上升，说明 AI 编码正在从尝鲜进入高频生产。",
        opportunity: "AI Coding Throughput & Review Debt Meter：把 AI 生成代码量、PR 规模、测试缺口、返工和 reviewer 负载转成团队周报。",
        read: "进入 Top 3。它比通用代码统计更贴近工程负责人正在承受的复查压力。",
        status: "进入 Top 3",
        sourceRefs: [0, 5, 6],
      },
      {
        keyword: "Claude Code 隐藏选项与动态工作流",
        signal: "AI HOT 记录开发者继续挖掘 Claude Code 的隐藏配置、子 Agent、钩子和动态编排方式，AI 编程流程正在变复杂。",
        opportunity: "Agent Workflow Change Receipt：记录每次 AI 编程任务的配置、工具、测试和人工接管点。",
        read: "支撑第二名。复杂工作流会放大产出，也会放大审查债务。",
        status: "支撑判断",
        sourceRefs: [0, 6],
      },
      {
        keyword: "OpenAI 第三方评估操作手册",
        signal: "AI HOT 记录 OpenAI 发布第三方评估操作手册，强调评估流程、独立性、可复查证据和安全边界。",
        opportunity: "AI Vendor Eval Pack：帮团队把模型、Agent 和工具引入前的评估问题整理成可复查包。",
        read: "支撑 winner。企业引入 Agent 需要评估，但更落地的收费点是把评估接到工具权限和真实调用账本。",
        status: "支撑判断",
        sourceRefs: [0, 7],
      },
      {
        keyword: "Kling AI 短片 / ControlFoley / PixVerse / Rodin / Stable Audio 3.0",
        signal: "AI HOT 多条多模态生产信号显示短片、角色、音效、3D 模型和音乐生成正在变成创作者可用的生产链。",
        opportunity: "AI Production Asset Receipt：为每个客户交付素材记录模型、来源、提示词、授权、标注、版本和平台发布风险。",
        read: "进入 Top 3。生成能力已经足够强，agency 和品牌开始需要交付收据。",
        status: "进入 Top 3",
        sourceRefs: [0, 8, 9, 10, 11, 12],
      },
      {
        keyword: "Grok Studio / Workspace / 浏览器能力",
        signal: "AI HOT 记录 xAI 推出 Grok Studio 与 Workspace，强调在工作区里创建文档、代码、HTML 报告和多模态内容。",
        opportunity: "AI Workspace Export & Handoff Checker：检查 AI 工作区能否导出、交接、复查和长期保存。",
        read: "支撑资产收据机会，但单独做工作区迁移与前几日报告重叠，今天不作为 winner。",
        status: "支撑判断",
        sourceRefs: [0, 13],
      },
      {
        keyword: "Qwen-VLA / 具身 AI / WorldMemArena",
        signal: "AI HOT 记录视觉-语言-动作模型和世界记忆评测，说明 Agent 记忆、空间理解和长期任务能力继续推进。",
        opportunity: "Embodied Agent Task Review：为机器人或浏览器 Agent 记录任务路径、失败点和人工干预。",
        read: "暂不进 Top 3。信号强但硬件/研究属性更重，普通 WebApp 切口不如权限账本清楚。",
        status: "观察",
        sourceRefs: [0, 14],
      },
      {
        keyword: "HBM4E / 大模型推理成本与基础设施",
        signal: "AI HOT 记录 SK 海力士与英伟达 HBM4E 合作等基础设施信号，说明 AI 算力供给继续紧张且资本密集。",
        opportunity: "Model Cost Scenario Planner：按模型、上下文、并发和缓存估算应用成本。",
        read: "不进 Top 3。可作为权限账本里的成本模块，但单独产品容易变成泛账单看板。",
        status: "未入选",
        sourceRefs: [0, 15],
      }
    ],
    scoringDimensions: [
      "真实需求：团队是否已经把工具、代码、支付、素材或客户数据交给 AI 执行。",
      "具体场景：是否能落到负责人每周必须审批、复查、交付或止损的动作。",
      "替代缺口：现有平台日志、聊天记录、账单和 PR 信息是否分散，是否无法直接给管理层解释。",
      "解决方案清晰度：第一版能否用只读导入和一页报告验证，不需要先做完整平台。",
      "长期性：Agent 权限、AI 编码复查和 AI 素材交付是否会随着模型能力增长而长期存在。",
      "供需失衡：是否已经有高频使用和明显焦虑，但缺少跨工具、可交付的 WebApp。",
      "付费意愿：买方是否有预算责任、合规责任、客户交付责任或工程效率责任。"
    ],
    opportunities: [
      opportunity(
        "Agent Tool Policy Ledger",
        "今日第一优先级",
        [98, 91, 93],
        "团队正在把 MCP server、IDE Agent、云 Agent、支付/钱包工具、API key 和文件权限交给 AI，但负责人缺少一份跨工具权限账本。真实需求是知道每个 Agent 能做什么、实际做过什么、谁批准、出错后怎么回滚。",
        "现在靠平台配置页、MCP JSON、IDE 设置、聊天记录、云日志和安全同事手工盘点。它们分散在不同系统里，不能直接回答“这个 Agent 能不能继续放权”。",
        "做只读导入器：读取 MCP 配置、GitHub/IDE Agent 日志、API key 范围、工具清单和调用样本，输出工具权限矩阵、风险等级、审批建议和回滚清单。",
        "第一批用户是 AI-heavy 工程团队、MCP 工具作者、平台/安全负责人和把 Agent 接入内部工具的创业公司；开源检查器获客，团队版卖历史留存、策略模板、Slack/GitHub 报告和私有部署。",
        "平台会补自己的权限视图；独立产品必须跨工具、跨 Agent，并把日志翻译成负责人能用来批准或收权的语言。",
        "找 10 个已经使用 MCP 或 AI IDE 的团队，手工生成权限账本；成功标准是 5 个团队愿意按报告收回或审批至少一个工具权限，2 个愿意持续留存历史。"
      ),
      opportunity(
        "AI Coding Throughput & Review Debt Meter",
        "需求强，工程团队清楚",
        [91, 89, 86],
        "AI 编码让代码输出、工具调用和自动化工作流快速增长，但 reviewer、测试和上线责任没有同步扩容。真实需求是工程负责人知道 AI 帮团队多产出多少，也制造了多少复查债务。",
        "现在靠 GitHub Insights、CI、PR diff、Cursor/Claude 会话和开发者口头解释。它们能看局部数据，但不能把 AI 产出、返工、测试缺口和 reviewer 负载放进同一份周报。",
        "接 GitHub/Linear/CI 与 AI 会话摘要，按周输出 AI 代码增量、PR 风险、测试覆盖缺口、返工轮次、reviewer 等待时间和需要人工复查的模块。",
        "从使用 Cursor、Claude Code、Codex、OpenCode 的小工程团队切入；免费跑一次周报，团队版按仓库、成员、历史留存和 PR comment 收费。",
        "容易和现有工程指标工具重叠，必须专注 AI 引入后的新增复查成本，而不是做泛研发效能平台。",
        "选 20 个近期 AI PR，手工做复查债务报告；如果工程负责人愿意用它安排 reviewer 或降低某类 Agent 权限，就说明付费点成立。"
      ),
      opportunity(
        "AI Production Asset Receipt",
        "创作者和 agency 切口明确",
        [88, 93, 84],
        "AI 短片、音效、3D、角色和音乐生成正在进入真实交付，品牌、agency 和创作者需要证明素材来源、模型、版本、授权、标注和客户可用边界。",
        "现在靠文件夹命名、手工表格、聊天记录和平台水印。客户交付时很难追溯一个镜头、音效或角色来自哪个模型、是否需要 AI 标注、能否商用。",
        "上传项目资产或连接生产工具导出，生成素材收据：资产清单、来源链接、模型/版本、提示词摘要、授权状态、AI 标注建议、平台发布风险和客户交付包。",
        "从小型 agency、短视频团队、游戏美术外包和品牌内容团队切入；免费生成单项目收据，付费卖团队空间、白标报告、批量审查和客户交付页。",
        "如果只做素材管理，会被现有 DAM 吃掉；必须把 AI 来源、授权、标注和客户可交付证据做成差异化。",
        "找 5 个真实 AI 视频或广告项目，手工整理素材收据；验证客户是否愿意把收据作为交付附件，agency 是否愿意为白标报告付费。"
      )
    ],
    rejected: [
      "Qwen-VLA、具身 AI 和 WorldMemArena 说明长期方向重要，但硬件和研究门槛更高，不适合作为今天最窄商业 WebApp。",
      "HBM4E、模型推理和基础设施成本值得跟踪，但普通团队更愿意为任务级权限和成本报告付费，而不是单独买宏观算力规划。",
      "AGI 时间表、模型公司治理和融资新闻有传播价值，但缺少可在两周内验证的明确买方。",
      "医疗影像和机器人相关进展价值很高，但合规、数据和销售周期不适合 BuilderDaily 今天的独立 WebApp 推荐。"
    ],
    sources: [
      source("AI HOT 全量", "AI HOT 2026-05-29 全量信号", "https://aihot.virxact.com/"),
      source("官方或原始信号", "Tomer Tunguz 关于 Agent 身份与策略控制的安全讨论", "https://tomtunguz.com/"),
      source("官方或原始信号", "MCP 与 Agent 工具权限相关信号", "https://modelcontextprotocol.io/"),
      source("官方", "Google Pay / Wallet 开发者工具", "https://developers.google.com/pay"),
      source("官方", "阿里云百炼与 Qwen Agent 工具链", "https://github.com/QwenLM"),
      source("官方或原始信号", "Cursor Developer Habits Report", "https://www.cursor.com/"),
      source("AI HOT 全量", "Claude Code 工作流与开发者实践信号", "https://aihot.virxact.com/"),
      source("官方", "OpenAI 第三方评估操作手册", "https://openai.com/"),
      source("官方或原始信号", "Kling AI 短片生产信号", "https://klingai.com/"),
      source("官方或原始信号", "ControlFoley 音效生成信号", "https://aihot.virxact.com/"),
      source("官方或原始信号", "PixVerse 多模态生产信号", "https://pixverse.ai/"),
      source("官方或原始信号", "Rodin Gen-2.5 3D 资产生成信号", "https://hyper3d.ai/"),
      source("官方或原始信号", "Stable Audio 3.0 音乐生成信号", "https://stability.ai/"),
      source("官方或原始信号", "xAI Grok Studio 与 Workspace 信号", "https://grok.com/"),
      source("AI HOT 全量", "Qwen-VLA、WorldMemArena 与长期记忆信号", "https://aihot.virxact.com/"),
      source("AI HOT 全量", "HBM4E 与 AI 基础设施信号", "https://aihot.virxact.com/"),
      source("BuilderPulse", "BuilderPulse 2026-05-28 中文报告（最近可用）", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-28.md"),
    ],
  },
  {
    date: "2026-05-28",
    title: "Agent 成本、权限爆炸半径和本地优先同日升温：今天最值得做的是 Agent Spend & Blast Radius Ledger",
    summary:
      "今天最强的商业线索不是某个模型升级，而是 AI Agent 开始同时制造三类管理压力：token 花得快、权限边界变宽、失败状态不透明。最值得验证的 WebApp 是 Agent Spend & Blast Radius Ledger：导入 Claude Code、Codex、OpenCode、MCP、云 Agent、SRE 任务和模型账单日志，生成一份负责人能转发的成本与风险账本，说明哪些任务值得继续自动化、哪些权限必须收窄、哪些失败需要人工接管。",
    tags: ["AI Agent", "成本治理", "安全审计"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 2026-05-28", "官方或原始信号"],
    scores: { commercial: 99, traffic: 92, wedge: 91 },
    winner: {
      name: "Agent Spend & Blast Radius Ledger",
      short:
        "导入 Agent 会话、工具调用、模型用量、MCP 权限、云端运行记录和失败日志，输出一页任务级账本：花了多少 token、调用了哪些工具、接触了哪些数据、失败时影响范围多大、下次应该改成自动、半自动还是人工审批。",
    },
    conclusion: [
      "5 月 28 日的关键词里，微软和 Uber 重估 AI 成本、Claude Code / OpenCode 工作组流程、AI Agent 爆炸半径、ITBench-AA 企业 SRE 基准、Qoder Cloud Agents、ANOLISA、阿里 AI Agent 安全、MuleRun、Miora、Copilot Cowork 外泄、DeepSeek 服务中断、AI 效率增益幻觉、local-first、self-hosted、AI-free search、失败付款和免费转付费同时出现。它们共同说明：Agent 不再只是提效玩具，而是开始进入预算、权限、可靠性和所有权管理。",
      "逐项判断后，最强机会是 Agent Spend & Blast Radius Ledger。它有清楚买方：已经让 AI Agent 写代码、跑 SRE、操作 SaaS、做研究或处理运营任务的工程负责人、IT、安全负责人和 AI-heavy 创始人；有清楚触发：账单被质疑、权限提示疲劳、服务中断、输出需要复查、管理层想知道 AI 是否真的省时间；也有清楚交付：一份成本与爆炸半径报告。",
      "Top 3 推荐分别是：Agent Spend & Blast Radius Ledger、Local-first Failure State Monitor、Founder Revenue Leak Triage。第一名胜出，因为它把当天 AI HOT 的 Agent 成本/安全/平台化信号和 BuilderPulse 的所有权/失败状态/收入漏点信号连在一起，MVP 可以从只读日志导入和一页报告开始，不需要先替代 IDE、云平台或支付系统。"
    ],
    signalPool: [
      {
        keyword: "微软、Uber 重估 AI 成本 / token 用量暴涨",
        signal: "AI HOT 记录微软、Uber 等公司开始重新评估 AI 投入：token 消耗和预算用尽并不必然换来有用功能，管理层开始追问 ROI。",
        opportunity: "Agent Spend & Blast Radius Ledger：把每类 Agent 任务的 token、模型、工具调用、人工复查和产出结果汇总成可审计账本。",
        read: "进入 winner。预算质疑已经从开发者吐槽变成管理层问题，买方和付费触发都清楚。",
        status: "进入 Top 3",
        sourceRefs: [2, 6],
      },
      {
        keyword: "AI Agent 爆炸半径 / 权限提示疲劳",
        signal: "AI HOT 记录关于 Agent 安全的讨论：仅靠模型防错不够，关键是限制文件、网络、凭据和工具权限的影响范围。",
        opportunity: "Blast Radius Report：按任务列出 Agent 可读、可写、可外发、可付款和可部署的边界，并给出收窄建议。",
        read: "进入 winner。它补齐成本账本里的风险维度，让报告不只是省钱，而是能被安全和工程负责人采用。",
        status: "进入 Top 3",
        sourceRefs: [1, 7],
      },
      {
        keyword: "ITBench-AA / SRE 任务低于 50% 的前沿模型表现",
        signal: "AI HOT 记录首个企业 IT 运维任务基准 ITBench-AA，SRE 场景下前沿模型仍低于 50%，说明真实企业任务需要更强验收与接管机制。",
        opportunity: "SRE Agent Acceptance Gate：把每次 K8s/日志/告警诊断任务拆成根因证据、失败模式、人工接管点和是否可自动化的结论。",
        read: "并入 winner。单独做基准看板太窄，放进任务级成本与风险账本更容易收费。",
        status: "支撑判断",
        sourceRefs: [1, 8],
      },
      {
        keyword: "Qoder Cloud Agents / ANOLISA / MSE AI 调度器",
        signal: "AI HOT 记录阿里把 Agent 上线、运行环境、独立沙箱、事件流追踪、技能、MCP、调度和可观测性包装成企业级基础设施。",
        opportunity: "Managed Agent Readiness Ledger：检查团队是否具备日志、权限、隔离、伸缩、失败回放和人工审批。",
        read: "支撑 winner。平台越成熟，采用前后的审计报告越有预算理由。",
        status: "进入 Top 3",
        sourceRefs: [1, 9, 10, 11],
      },
      {
        keyword: "Claude Code / OpenCode 工作组与检查点式开发",
        signal: "AI HOT 记录开发者把中大型任务拆成多个工作组、逐组处理、逐组测试和提交，这说明 Agent 工作正在变成可管理流水线。",
        opportunity: "Agent Workgroup Checkpoint Report：按子任务记录输入、产出、测试、失败和人工确认，给负责人一张进度与风险表。",
        read: "进入 winner 的工程切口。它比泛项目管理更贴近 AI-heavy 团队当下的流程变化。",
        status: "进入 Top 3",
        sourceRefs: [2, 12],
      },
      {
        keyword: "Copilot Cowork 文件外泄风险",
        signal: "AI HOT 记录 Simon Willison 关于 Microsoft Copilot Cowork 的数据外泄风险：真实智能体可以在未批准情况下触发邮件和外部资源请求。",
        opportunity: "AI Coworker Exfiltration Drill：模拟并报告 Agent 在文件、邮件、图片、链接和外部请求上的外泄路径。",
        read: "支撑 winner。单独安全演练销售周期较长，作为爆炸半径账本的一章更容易进入团队采购。",
        status: "支撑判断",
        sourceRefs: [5, 13],
      },
      {
        keyword: "DeepSeek 半小时服务中断 / 依赖可靠性",
        signal: "AI HOT 记录 DeepSeek 服务部分中断并在约半小时后修复，本月已多次发生服务问题。",
        opportunity: "Model Reliability Incident Ledger：把模型中断、fallback、影响任务、人工补救和客户影响写成事件报告。",
        read: "支撑 winner 和本地优先机会。模型越便宜，团队越需要知道停机时业务能否继续。",
        status: "支撑判断",
        sourceRefs: [2, 14],
      },
      {
        keyword: "AI 效率增益幻觉 / 界面摩擦",
        signal: "AI HOT 记录 MIT、斯坦福等研究指出用户预期节省时间明显高于实际节省时间，提示、等待和检查会吞掉收益。",
        opportunity: "AI Time Saved Reality Check：用真实任务日志比较 AI 前后耗时、等待、复查和返工。",
        read: "并入 winner。只做效率计时器太弱，和成本、权限、产出证据放在一起才有负责人预算。",
        status: "支撑判断",
        sourceRefs: [4, 15],
      },
      {
        keyword: "local-first / self-hosted / 失败状态透明",
        signal: "BuilderPulse 记录 OpenBrief、Posthorn、Open-source Workspace 等信号，用户偏好本地优先、服务器侧所有权，并要求工具清楚解释失败状态。",
        opportunity: "Local-first Failure State Monitor：给本地优先工具提供失败解释、导出路径、重试建议和可分享错误报告。",
        read: "进入第二名。它有清楚开发者/自托管用户需求，但预算通常不如企业 Agent 成本与权限账本集中。",
        status: "进入 Top 3",
        sourceRefs: [0, 16],
      },
      {
        keyword: "AI-free search / DuckDuckGo 增长 / 默认项逃生路线",
        signal: "BuilderPulse 记录用户因强制 AI 搜索行为转向 DuckDuckGo，并把迁移准备总结为导出路径、本地兜底、自有数据和替换成本。",
        opportunity: "Default Escape Route Checklist：帮团队列出搜索、邮件、文档、代码、文件和 AI 工具的替代路线。",
        read: "支撑第二名。独立做迁移清单与前几日主题重叠，今天更适合作为本地优先失败兜底的一部分。",
        status: "支撑判断",
        sourceRefs: [0, 17],
      },
      {
        keyword: "失败付款、广告复盘、免费转付费",
        signal: "BuilderPulse 记录独立开发者围绕失败付款、广告花费、免费用户转付费和高流量零收入的讨论，指出流量、用户和收入是三台不同机器。",
        opportunity: "Founder Revenue Leak Triage：导入 Stripe、广告花费、落地页、免费用户和客服反馈，找出最先漏钱的环节。",
        read: "进入第三名。买方清楚、验证快，但流量不如 Agent 主题强，客单价也通常低于企业团队。",
        status: "进入 Top 3",
        sourceRefs: [0, 18],
      },
      {
        keyword: "废弃库复活 / Last.fm 独立 / 数据连续性",
        signal: "BuilderPulse 记录 Last.fm 独立、废弃库复活和老工作流回归，核心不是怀旧，而是数据连续性和依赖风险。",
        opportunity: "Revival Audit：扫描废弃包、老账号、历史数据格式和仍在业务中使用的依赖，生成复活或替代路线。",
        read: "未进 Top 3。预算取决于是否触及活跃业务依赖，单独作为日报 winner 不如 Agent 账本明确。",
        status: "候选观察",
        sourceRefs: [0, 19],
      },
      {
        keyword: "Miora / 社交图文卡片工具 / 创意 Agent 平台化",
        signal: "AI HOT 记录腾讯 Miora 和小红书图文卡片工具，把图像、视频、UI、3D、图库和视觉规则做成创意 Agent 工作台。",
        opportunity: "Creative Agent Handoff QA：检查创意 Agent 产物的品牌一致性、来源、尺寸、可编辑文件和客户交付风险。",
        read: "未进 Top 3。营销创意有流量，但今天更强商业痛点在 Agent 成本、安全和失败状态。",
        status: "候选观察",
        sourceRefs: [2, 20, 21],
      },
      {
        keyword: "AI 研究智能体窄化科学探索 / Polar 训练框架",
        signal: "AI HOT 记录 AI 研究智能体更擅长局部细化，NVIDIA Polar 则让代码 Agent 训练分数大幅提升。",
        opportunity: "Agent Evaluation Notebook：给团队记录一个 Agent 是否只是在局部优化，还是能真正改善任务结果。",
        read: "未进 Top 3。技术价值高，但普通 WebApp 付费触发不如账单、安全和收入漏点直接。",
        status: "候选观察",
        sourceRefs: [3, 22, 23],
      },
      {
        keyword: "StepAudio 2.5 / 副语言实时语音",
        signal: "AI HOT 记录 StepAudio 2.5 Realtime 能理解语气、节奏、停顿并支持人格化定制。",
        opportunity: "Voice Role QA：测试客服、陪练和虚拟人语音角色在压力场景下是否保持设定和安全边界。",
        read: "候选观察。适合垂直客服质检，但今天缺少比 Agent 成本治理更通用的买方压力。",
        status: "候选观察",
        sourceRefs: [4, 24],
      }
    ],
    scoringDimensions: [
      "真实需求：AI Agent 已经进入代码、SRE、营销、研究和企业 SaaS 任务，负责人开始同时面对账单、权限和结果可信度问题。",
      "具体场景：一次 Agent 任务结束后，工程、IT、安全或创始人需要知道它花了多少钱、动了什么、错在哪里、下次能否自动运行。",
      "替代方案：平台日志、云账单、SIEM、IDE 历史和聊天记录都存在，但无法按任务输出管理层可读的成本与爆炸半径结论。",
      "长期性：模型和 Agent 越便宜、越多、越像员工，任务级成本、权限和可靠性解释越会成为日常治理流程。",
      "付费意愿：小团队可为单次报告付 $49-299；AI-heavy 团队可为历史留存、规则、私有部署、审批集成和月度治理付 $199-999/月或年度合同。"
    ],
    opportunities: [
      opportunity(
        "Agent Spend & Blast Radius Ledger",
        "Winner",
        [99, 92, 91],
        "AI-heavy 团队正在用 Agent 写代码、跑运维、处理研究和操作 SaaS，但管理层、工程负责人和安全负责人缺少一份能回答“花得值不值、权限是否过宽、失败会影响哪里”的任务级证据。",
        "现有替代方案散在云账单、模型 dashboard、IDE 历史、MCP 配置、SIEM 和人工复盘里；它们能记录事件，却不能把一次 Agent 任务翻译成可转发的成本、权限和接管建议。",
        "第一版只做只读导入：支持 Claude Code/Codex/OpenCode 日志、模型用量 CSV、MCP 配置、GitHub PR 和云 Agent 事件流，输出一页 Agent 任务账本。",
        "从 AI-heavy 工程团队、SRE/DevOps 社群、MCP 工具作者和正在削减 AI 成本的创始人切入；用公开 Agent 任务日志生成样板报告获客。",
        "平台会补日志，风险是只做漂亮 dashboard；必须跨工具、保留证据链，并把结论落到预算、权限和人工接管。",
        "两周内找 10 个重度使用 Agent 的团队，让他们导入最近 3-5 次任务；成功标准是 5 个愿意转发报告，2 个愿意为历史留存或私有规则付费。"
      ),
      opportunity(
        "Local-first Failure State Monitor",
        "Runner-up",
        [91, 86, 88],
        "local-first、自托管和所有权工具正在回到开发者视野，但用户最怕的不是界面粗糙，而是失败时不知道数据在哪里、能否导出、如何重试、是否会丢工作。",
        "多数本地优先工具只有错误 toast、GitHub issue 或日志文件；用户要自己判断问题是权限、网络、格式、同步还是数据损坏。",
        "做一个轻量 SDK/WebApp，让开发者把失败事件、数据路径、导出状态和恢复动作写成用户可读错误报告，并提供本地存储健康检查。",
        "先服务自托管邮件/文档/视频下载/知识库/浏览器原生工具作者；在 Show HN、self-hosted 和开源社区用“失败状态体检”模板分发。",
        "预算可能偏低，容易被当成开源插件；必须绑定团队版、托管版或商业工具的支持成本下降来收费。",
        "选择 5 个已有开源/indie 工具接入手工版失败报告，看 issue 关闭速度、用户复现率和维护者是否愿意付费。"
      ),
      opportunity(
        "Founder Revenue Leak Triage",
        "Top 3",
        [88, 84, 86],
        "独立开发者正在发现流量、用户和收入不是一回事：广告花费、失败付款、免费用户和高浏览量都可能没有转成付费。",
        "现有分析工具告诉你访问量、转化率或支付失败，但很少把广告支出、免费用户行为、Stripe 事件和客服反馈压成“本周最先修哪里”的判断。",
        "导入 Stripe、Paddle、广告花费、落地页和简单客服标签，生成一页收入漏点报告：失败付款、无升级路径、错误受众、付费墙位置和下一周实验。",
        "从 Indie Hackers、Reddit SaaS、Product Hunt maker 和小型 AI SaaS 创始人切入；用免费漏点报告换真实数据。",
        "客单价较低且用户流动性大；必须把交付做成可执行实验，而不是又一个通用分析 dashboard。",
        "找 20 个 MRR 低于 $5k 的创始人手工跑一次报告；成功标准是 6 个执行建议，3 个愿意为月度复盘付费。"
      )
    ],
    rejected: [
      "Creative Agent Handoff QA 有 Miora、社交图文卡片工具和 AI 影像信号支撑，但营销创意工具竞争拥挤，今天付费触发不如成本、安全和失败状态明确。",
      "Revival Audit 抓住了废弃库、Last.fm 独立和数据连续性，但预算只在影响活跃业务依赖时成立，适合作为本地优先机会的子模块。",
      "Voice Role QA 可借 StepAudio 2.5 做客服/虚拟人压力测试，但当天缺少足够强的企业采购触发。",
      "Agent Evaluation Notebook 和 Polar/研究智能体信号技术含量高，但买方更容易先为任务账本、爆炸半径和 ROI 证据付费。"
    ],
    sources: [
      source("BuilderPulse", "BuilderPulse 2026-05-28 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-28.md"),
      source("AI HOT 全量", "AI HOT 2026-05-28 全量信号", "https://aihot.virxact.com/all?page=2"),
      source("AI HOT 全量", "AI HOT 2026-05-28 全量信号（二）", "https://aihot.virxact.com/all?page=3"),
      source("AI HOT 全量", "AI HOT 2026-05-28 全量信号（三）", "https://aihot.virxact.com/all?page=4"),
      source("AI HOT 全量", "AI HOT 2026-05-28 全量信号（四）", "https://aihot.virxact.com/all?page=7"),
      source("原始信号", "Microsoft Copilot Cowork 存在数据窃取风险", "https://simonwillison.net/"),
      source("AI HOT 全量", "微软、Uber 重估 AI 成本", "https://www.ithome.com/"),
      source("AI HOT 全量", "AI Agent 安全：关键在于控制爆炸半径", "https://x.com/hongming731"),
      source("官方或原始信号", "Artificial Analysis 与 IBM Research：ITBench-AA", "https://x.com/ArtificialAnlys"),
      source("AI HOT 全量", "阿里 Qoder Cloud Agents", "https://www.ithome.com/"),
      source("AI HOT 全量", "ANOLISA：阿里云 Linux 4 智能体版", "https://x.com/alibaba_cloud"),
      source("AI HOT 全量", "阿里云 MSE AI 调度器", "https://x.com/alibaba_cloud"),
      source("AI HOT 全量", "OpenCode 工作组与检查点式开发", "https://x.com/thdxr"),
      source("原始信号", "Simon Willison：Copilot Cowork 风险", "https://simonwillison.net/"),
      source("AI HOT 全量", "DeepSeek 服务部分中断", "https://www.ithome.com/"),
      source("官方或原始信号", "AI 效率增益幻觉研究", "https://x.com/rohanpaul_ai"),
      source("BuilderPulse", "OpenBrief、Posthorn 和 Open-source Workspace 本地优先信号", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-28.md"),
      source("BuilderPulse", "AI-free search 与默认项逃生路线", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-28.md"),
      source("BuilderPulse", "Indie 开发者收入和定价讨论", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-28.md"),
      source("BuilderPulse", "沉寂项目复活与数据连续性", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-28.md"),
      source("AI HOT 全量", "腾讯 Miora 创意 Agent 平台", "https://x.com/berryxia"),
      source("AI HOT 全量", "小红书/公众号图文卡片工具", "https://x.com/op7418"),
      source("AI HOT 全量", "AI 研究智能体窄化科学探索", "https://arxiv.org/"),
      source("AI HOT 全量", "NVIDIA Polar 智能体强化学习框架", "https://www.ithome.com/"),
      source("AI HOT 全量", "StepAudio 2.5 Realtime", "https://x.com/StepFun_ai")
    ],
  },
  {
    date: "2026-05-27",
    title: "AI 编程评审、Agent 工程化和模型降价同日升温：今天最值得做的是 AI Review Ledger",
    summary:
      "今天最强的商业线索不是让 AI 更快写代码，而是团队开始追问一次 AI 编程会话到底改了什么、谁审过、发现了哪些问题、是否真的节省时间。最值得验证的 WebApp 是 AI Review Ledger：连接 GitHub PR、提交记录、评审评论、测试结果和 AI 会话摘要，生成一份可转发的评审问责报告，告诉工程负责人这次改动能不能合并、风险在哪里、AI 是省了时间还是把成本转移到评审。",
    tags: ["AI 编程", "开发者工具", "AI 治理"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 2026-05-27", "官方或原始信号"],
    scores: { commercial: 98, traffic: 91, wedge: 90 },
    winner: {
      name: "AI Review Ledger",
      short:
        "导入 GitHub PR、diff、提交记录、CI、测试结果、评审评论和 AI 会话摘要，输出一份任务级评审账本：AI 改了什么，人类审出了什么，哪些问题已修，哪些决策仍需要负责人签字，以及这次 AI 编程到底节省了时间还是增加了返工。",
    },
    conclusion: [
      "5 月 27 日的关键词里，Using AI to write better code more slowly、Every Developer Is Lying About Something、Stop advertising in your commits、Genspark AI Slides 5.0、阿里云 Agent Infra、OpenRouter B 轮融资、MiMo v2.5 永久降价、Qwen 1M 上下文、AI Fluency 评分、YouTube AI 标签、Magnifica Humanitas、Rezonant、Brew、Audiomass、Understand-Anything 和自托管搜索同时出现。它们共同说明：用户已经不缺生成能力，缺的是能让生成结果被评审、交接、定价和问责的证据层。",
      "逐项判断后，最强机会是 AI Review Ledger。它有清楚买方：使用 Cursor、Claude Code、Copilot、Codex 或内部代码 Agent 的工程负责人；有清楚触发：AI PR 合并前评审变慢、bug 被转移到 reviewer、管理层只看到速度宣传、团队需要解释质量；也有清楚交付：一页 PR 评审账本和合并前风险清单。",
      "Top 3 推荐分别是：AI Review Ledger、Model Route Change Board、AI Workflow Handoff Kit。第一名胜出，因为它把当天最强的开发者争论、工作流问责和商业付费点连在一起，MVP 可以从只读 PR 报告开始，不需要先替代 IDE 或代码平台。"
    ],
    signalPool: [
      {
        keyword: "AI 编程从速度演示转向评审核算",
        signal: "BuilderPulse 记录 Using AI to write better code more slowly 在 Hacker News 和 Lobsters 引发高讨论，核心不是 AI 能否写代码，而是如何用 AI 批评、测试和迭代，让评审质量变好。",
        opportunity: "AI Review Ledger：按 PR 汇总 AI 会话、diff、测试、评审轮次、发现 bug 和合并建议。",
        read: "进入 winner。工程团队愿意为可合并证据付费，而不是再买一个泛编程助手。",
        status: "进入 Top 3",
        sourceRefs: [0, 4],
      },
      {
        keyword: "Every Developer Is Lying About Something / 团队信任疲劳",
        signal: "BuilderPulse 记录 DEV Community 关于开发者诚实度和 AI 无法修复团队隐藏问题的讨论，说明 AI 会放大既有评审文化和责任归属问题。",
        opportunity: "Reviewer Accountability Report：把谁提出风险、谁批准、哪些问题被忽略和哪些工作仍需人工负责写成报告。",
        read: "支撑 winner。买方不是最吵的开发者，而是被交付质量追责的工程负责人。",
        status: "进入 Top 3",
        sourceRefs: [0, 5],
      },
      {
        keyword: "Stop advertising in your commits / commit message 问责",
        signal: "当天开发者讨论继续集中在 commit message 和工作证据是否可信，说明代码交接中的文字说明正在变成质量界面。",
        opportunity: "Commit Evidence Checker：检查 AI 生成提交说明是否解释了真实变更、测试、风险和 reviewer 决策。",
        read: "并入 winner。单独做 commit 文案工具太窄，放进 PR 账本更有付费理由。",
        status: "支撑判断",
        sourceRefs: [0, 6],
      },
      {
        keyword: "阿里云 Agent Infra / AgentRun / AgentTeams / AgentLoop",
        signal: "AI HOT 记录阿里云把 Agent 构建、部署、团队治理、可观测性和自主运维包装成工程化方案，说明 Agent 已从实验进入运行和治理阶段。",
        opportunity: "Agent Workflow Readiness Gate：检查一个团队的 Agent 任务是否具备日志、权限、回滚、人工审批和效果指标。",
        read: "支撑第三名，也支撑 winner。Agent 工程化越成熟，交接和问责层越有价值。",
        status: "进入 Top 3",
        sourceRefs: [2, 11],
      },
      {
        keyword: "Genspark AI Slides 5.0 / 可复用幻灯片模块",
        signal: "AI HOT 记录 Genspark AI Slides 5.0 强调更快生成、团队风格锁定、上传 PPT/PDF、内置数据分析和面向咨询、销售、教育的可复用模块。",
        opportunity: "AI Workflow Handoff Kit：把 AI 生成的 deck、数据、来源、品牌规则和人工确认点打包成客户或主管可审阅交付件。",
        read: "进入第三名。演示文稿只是表层，真正可卖的是交付前的证据包和复核流程。",
        status: "进入 Top 3",
        sourceRefs: [1, 10],
      },
      {
        keyword: "Brew / Rezonant / DodoForm / Audiomass",
        signal: "BuilderPulse 记录 Product Hunt 和 Show HN 奖励的不是原始新奇感，而是把邮件、规格、表单、音频和本地笔记变成可检查工作流的工具。",
        opportunity: "Workflow Handoff Kit：给 agency、咨询顾问和产品团队生成输入材料、版本、来源、审批、待办和客户说明。",
        read: "进入第三名。它比再做一个空白 AI 画布更贴近用户已经认识的工作产物。",
        status: "进入 Top 3",
        sourceRefs: [0, 13],
      },
      {
        keyword: "OpenRouter B 轮融资 / 每周 token 量增长",
        signal: "AI HOT 与官方发布都记录 OpenRouter 完成 1.13 亿美元 B 轮融资，周 token 量从 5T 增至 25T，说明多模型路由从胶水层变成生产基础设施。",
        opportunity: "Model Route Change Board：把模型价格、质量样本、任务类型、fallback 和缓存风险变成一次路由变更报告。",
        read: "进入第二名。模型网关越普及，团队越需要解释为什么切模型、何时不能切。",
        status: "进入 Top 3",
        sourceRefs: [1, 7, 8],
      },
      {
        keyword: "MiMo v2.5 API 永久降价 / 最高 99%",
        signal: "AI HOT 记录小米 MiMo v2.5 系列 API 永久降价；第三方报道也确认价格变化和 token 套餐升级会改变开发者成本假设。",
        opportunity: "Model Price Change Receipt：当模型价格变化时，自动重算哪些任务可以迁移、预计省多少钱、质量如何回归。",
        read: "支撑第二名。价格战会持续，但团队缺的是任务级迁移证据，而不是价格表。",
        status: "进入 Top 3",
        sourceRefs: [2, 9],
      },
      {
        keyword: "Qwen 3.7 Max 1M 上下文 / Arena Coding Agent",
        signal: "AI HOT 同日记录 Qwen 3.7 Max 被多个工具接入、具备 1M 上下文，并在 coding agent 评测中表现靠前。",
        opportunity: "Long Context Regression Pack：把长上下文迁移前后的质量、遗漏、隐私和成本做成小样本回归报告。",
        read: "支撑第二名。长上下文扩大可替代任务范围，也扩大质量回归需求。",
        status: "支撑判断",
        sourceRefs: [1, 2],
      },
      {
        keyword: "Anthropic AI Fluency 评分卡",
        signal: "AI HOT 记录 Claude 可能引入 AI 熟练度评分卡，按目标澄清、沟通方式、质量控制等行为给用户反馈。",
        opportunity: "Team AI Practice Audit：按真实项目评估团队使用 AI 的习惯、复核动作和质量控制缺口。",
        read: "支撑 winner。评分卡说明平台也在承认“怎么用 AI”需要被度量，但团队仍需要面向交付的证据。",
        status: "支撑判断",
        sourceRefs: [1],
      },
      {
        keyword: "Understand-Anything / Presenton / dograh",
        signal: "BuilderPulse 记录多个开源项目快速增长：代码或文档知识图谱、AI 演示文稿生成、自托管语音 AI 平台都显示搭建、部署和团队策略存在商业缺口。",
        opportunity: "Open Source Commercialization Intake：扫描开源仓库的部署、品牌化、团队权限、导出和监控缺口，给维护者商业化路线。",
        read: "被淘汰为独立 Top 3。需求存在，但客户获取和预算不如 PR 评审、模型路由和工作流交接清楚。",
        status: "淘汰",
        sourceRefs: [0, 14],
      },
      {
        keyword: "自托管与免费办公替代搜索上涨",
        signal: "BuilderPulse 记录 zulip、onlyoffice、redmine、openproject、joplin、gitea 以及免费 PDF/笔记/简历工具搜索上升，说明信任、成本和所有权焦虑仍在扩散。",
        opportunity: "Ownership Migration Planner：把团队聊天、文档、项目管理、代码托管和 PDF 工作流迁移成预算、风险和执行清单。",
        read: "淘汰。商业上有机会，但与前几天主题重叠，今天更强的新增证据在 AI 评审和交付问责。",
        status: "淘汰",
        sourceRefs: [0],
      },
      {
        keyword: "YouTube AI 标签 / 自动识别 AI 内容",
        signal: "AI HOT 记录 YouTube 将 AI 内容标签放到更显眼位置，并开始自动识别大量逼真 AI 内容。",
        opportunity: "AI Content Disclosure QA：发布前检查视频、图像和客户素材是否需要 AI 标注、免责声明和来源留存。",
        read: "淘汰。适合内容团队，但当天商业买方和付费触发更集中在开发与团队工作流。",
        status: "淘汰",
        sourceRefs: [1],
      },
      {
        keyword: "Magnifica Humanitas / 预测市场封锁 / 荷兰数字供应商干预",
        signal: "BuilderPulse 把技术治理走出实验室列为当天 Top 3，AI HOT 也记录教皇文件引发科技界反应。",
        opportunity: "AI Policy Impact Brief：给产品团队生成监管、伦理、市场准入和供应商风险摘要。",
        read: "被淘汰为独立 Top 3。宏观重要，但普通 WebApp MVP 容易变成新闻简报，短期付费动作不如评审账本清楚。",
        status: "淘汰",
        sourceRefs: [0, 12],
      },
    ],
    scoringDimensions: [
      "真实需求：AI 生成代码、文档和交付件已经进入生产流程，负责人需要证明它们是否被认真评审。",
      "具体场景：AI PR 合并前、客户 deck 交付前、模型路由变更前、Agent 工作流上线前，都需要一份可转发证据。",
      "替代方案：GitHub、CI、聊天记录、provider dashboard 和人工 review 都存在，但无法把一次 AI 工作流变成管理层可读账本。",
      "长期性：生成能力越便宜、越快、越普及，评审、交接、回归和责任归属越会成为日常流程。",
      "付费意愿：小团队可为一次 PR/路由/交付体检付 $19-199，AI-heavy 团队可为持续报告、历史留存和私有部署付月费或年度合同。"
    ],
    opportunities: [
      opportunity(
        "AI Review Ledger",
        "Winner",
        [98, 91, 90],
        "工程团队正在用 AI 写更多代码，但 reviewer 和工程负责人缺少一份能回答“这次改动是否真的更好、是否可合并、哪些风险还没处理”的证据。",
        "现状是 GitHub PR、CI、commit、聊天记录和 AI 会话分散存在；管理层看到速度，reviewer 承担返工，团队很难复盘 AI 是提高质量还是转移成本。",
        "先做只读 PR 账本：导入 PR、diff、CI、测试、评审评论和 AI 会话摘要，输出变更地图、风险项、已修 bug、待签字决策和合并建议。",
        "从 Cursor、Claude Code、Copilot、Codex 重度团队切入，免费生成一份 PR 评审报告；内容营销围绕“一个 AI PR 到底让 review 变快还是变慢”。",
        "GitHub 和 IDE 会补部分摘要；独立产品必须跨工具，并把重点放在负责人可读的质量问责报告，而不是代码生成。",
        "找 10 个真实 AI PR 手工生成账本，看工程负责人是否愿意把报告发给 reviewer，并在下一次合并前重复使用。"
      ),
      opportunity(
        "Model Route Change Board",
        "强候选",
        [94, 92, 86],
        "模型价格、OpenRouter 规模、Qwen 长上下文和 MiMo 降价让团队不断想切模型，但缺少任务级质量、成本、隐私和 fallback 的上线证据。",
        "现状是看 provider dashboard、网关日志、价格表和零散 benchmark。它们能看单价和用量，却不能告诉 CTO 哪类任务能切、切完怎么验收、失败时走哪条路。",
        "上传调用日志、任务标签、价格表和小样本质量集，输出路由变更建议、预计节省、不可迁移任务、fallback 顺序和回归测试计划。",
        "面向 AI-heavy 产品团队、agency、内部工具团队和 coding agent 用户，用免费账单体检获客，团队版卖持续价格重算、预算告警和质量回归记录。",
        "网关平台会内置成本分析；产品要避开泛 dashboard，聚焦跨供应商、任务级质量验收和管理层可读变更报告。",
        "用 5 个团队的真实调用日志手工生成路由报告，验证是否能找出 15% 以上可解释节省或明确不可迁移任务。"
      ),
      opportunity(
        "AI Workflow Handoff Kit",
        "强候选",
        [90, 88, 87],
        "AI 正在生成 deck、规格、表单、音频、数据摘要和项目计划，但客户、主管和同事需要知道输入是什么、来源是什么、谁确认过、下一步谁负责。",
        "现状是把 Genspark/ChatGPT/Notion/Google Docs/PowerPoint/表单工具的输出直接交付，靠人工备注和聊天解释。材料看起来完整，但证据、版本和审批缺失。",
        "为一次 AI 交付生成 handoff 包：输入材料、版本、来源链接、品牌/数据规则、人工确认点、风险项、客户说明和下一步待办。",
        "从咨询顾问、agency、销售运营、课程团队和产品经理切入，先支持 deck/spec/form 三类高频交付，按项目、品牌模板、客户空间和导出收费。",
        "通用文档工具会加摘要和评论；差异化在交付证据、客户可读包、跨工具来源和复用模板。",
        "找 20 份真实 AI 生成 deck/spec/form，手工做交接包，看交付方是否愿意把它随成品一起发给客户或主管。"
      ),
    ],
    rejected: [
      "Ownership Migration Planner 有搜索和自托管信号，但与前几日主题重叠，今天新增商业触发不如 AI 评审和模型路由明确。",
      "AI Content Disclosure QA 受 YouTube 标签变化支撑，但短期付费买方更偏内容团队，流量高于预算确定性。",
      "AI Policy Impact Brief 宏观重要，但普通 WebApp 容易变成新闻摘要，缺少当天能马上付费的具体工作流。",
      "Open Source Commercialization Intake 对维护者有价值，但需求分散，销售周期和客户发现成本高于 Top 3。"
    ],
    sources: [
      source("BuilderPulse", "BuilderPulse 2026-05-27 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-27.md"),
      source("AI HOT 全量", "AI HOT 2026-05-27 全量信号", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "AI HOT 2026-05-27 全量信号（二）", "https://aihot.virxact.com/all?page=2"),
      source("AI HOT 全量", "AI HOT 2026-05-27 全量信号（三）", "https://aihot.virxact.com/all?page=3"),
      source("原始信号", "Using AI to write better code more slowly", "https://nolanlawson.com/2026/05/25/using-ai-to-write-better-code-more-slowly/"),
      source("原始信号", "Every Developer Is Lying About Something", "https://dev.to/sylwia-lask/every-developer-is-lying-about-something-and-ai-wont-fix-it-4im0"),
      source("原始信号", "Stop advertising in your commits", "https://akselmo.dev/posts/stop-advertising-in-your-commits/"),
      source("官方或原始信号", "OpenRouter B 轮融资与 token 增长", "https://www.businesswire.com/news/home/20260526953416/en/OpenRouter-Raises-%24113-Million-CapitalG-led-Series-B-as-Weekly-Volume-Explodes-to-25T-Tokens"),
      source("原始信号", "TechCrunch 记录 OpenRouter 估值变化", "https://techcrunch.com/2026/05/26/openrouter-more-than-doubles-valuation-to-1-3b-in-a-year/"),
      source("官方或原始信号", "MiMo v2.5 API 价格变化", "https://platform.xiaomimimo.com/docs/en-US/news/v2.5-price-update"),
      source("AI HOT 全量", "Genspark AI Slides 5.0", "https://aihot.virxact.com/all?page=2"),
      source("官方或原始信号", "阿里云 Agent Infra", "https://int.alibabacloud.com/m/1000413461/"),
      source("官方", "Magnifica Humanitas", "https://www.vatican.va/content/leo-xiv/en/encyclicals/documents/20260515-magnifica-humanitas.html"),
      source("BuilderPulse", "Brew、Rezonant、DodoForm 与 Audiomass 工作流信号", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-27.md"),
      source("原始信号", "Understand-Anything 开源项目", "https://github.com/Lum1104/Understand-Anything"),
    ],
  },
  {
    date: "2026-05-26",
    title: "AI 同事开始读私有数据、模型网关融资和生产加固同日升温：今天最值得做的是 Agent Data Access Receipt",
    summary:
      "今天最强的商业线索不是更聪明的 AI 同事，而是它们进入企业数据、浏览器、代码库和个人上下文之后，负责人需要一份能解释“读了什么、外发了什么、该不该批准”的证据。最值得验证的 WebApp 是 Agent Data Access Receipt：导入 Microsoft 365/GitHub/浏览器/Agent 日志或只读清单，输出任务级数据访问地图、敏感文件触达、外发路径、审批建议和可转发的整改报告。",
    tags: ["AI 治理", "Agent 安全", "开发者工具"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 2026-05-26", "官方或原始信号"],
    scores: { commercial: 99, traffic: 92, wedge: 91 },
    winner: {
      name: "Agent Data Access Receipt",
      short:
        "连接或导入 Copilot、GitHub、浏览器 Agent、MCP 工具和企业文件日志，生成一份任务级数据访问收据：AI 同事读过哪些文件和页面、是否触达客户/HR/财务数据、是否把内容发给外部模型、下次哪些动作应审批、哪些动作可自动放行。",
    },
    conclusion: [
      "5 月 26 日的关键词里，Copilot Cowork 数据外泄演示、Microsoft 把 Copilot 定义为 digital colleague、Unabyss 统一数据上下文层、GitHub Copilot coding agent、Chrome DevTools MCP、Understand-Anything、PII masking、香港隐私机构 AI 合规检查、OpenRouter 融资、Merge Gateway、Kakuna、MashuPack、Vibecodex 和 AI 假引用同时出现。它们共同说明：Agent 正从聊天工具变成能读上下文、改代码、调用工具和进入企业数据的同事。",
      "逐项判断后，最强机会是 Agent Data Access Receipt。它有清楚买方：IT 管理员、安全负责人、工程经理、合规团队、采用 Microsoft 365 Copilot/GitHub Copilot/Claude/Codex 的小团队；有清楚触发：AI 同事被赋予文件权限、浏览器 MCP 打开、代码 Agent 接仓库、员工把客户材料交给 AI、隐私团队要求解释；也有清楚交付：一页访问地图和整改清单。",
      "Top 3 推荐分别是：Agent Data Access Receipt、Model Gateway Spend Board、Vibe App Production Gate。第一名胜出，因为它同时吃到企业 AI 同事、代码 Agent、浏览器工具和隐私合规四条需求，MVP 可以从只读导入报告开始，不需要先接管生产权限。"
    ],
    signalPool: [
      {
        keyword: "Copilot Cowork 数据外泄演示",
        signal: "BuilderPulse 把 Copilot Cowork exfiltrates files 列为当天核心风险信号；研究演示把企业 AI 同事放进共享文件语境后，越权读取和外发会变成真实管理问题。",
        opportunity: "Agent Data Access Receipt：把 AI 同事读过的文件、触达的敏感类别、外发目标和审批建议生成可转发报告。",
        read: "进入 winner。企业采用 AI 同事后，负责人买的不是更多自动化，而是能解释和限制自动化的证据。",
        status: "进入 Top 3",
        sourceRefs: [0, 3, 4],
      },
      {
        keyword: "Microsoft digital colleague / Frontier suite",
        signal: "Microsoft 官方把 Copilot Cowork 作为 research preview 的 digital colleague 场景展示，说明企业 AI 已经从个人助手推进到组织协作层。",
        opportunity: "AI 同事权限体检：盘点 AI 能访问哪些团队、频道、文件库、邮件和业务系统，输出最小授权建议。",
        read: "支撑 winner。组织级 AI 采用会天然带来权限、审计和问责预算。",
        status: "进入 Top 3",
        sourceRefs: [4],
      },
      {
        keyword: "Unabyss / 统一数据上下文层",
        signal: "BuilderPulse 记录 Unabyss 主张把分散数据整理成 AI agent 可用的统一上下文，同时引出“你的数据在别人的 AI 模型里更有价值”的隐私边界问题。",
        opportunity: "Context Exposure Map：告诉团队哪些数据被喂给 Agent、哪些应脱敏、哪些不该进入上下文。",
        read: "进入 winner。上下文层越统一，越需要一层面向负责人的访问收据。",
        status: "进入 Top 3",
        sourceRefs: [0],
      },
      {
        keyword: "GitHub Copilot coding agent",
        signal: "BuilderPulse 记录 GitHub Copilot coding agent 的 token/上下文消耗和集成成本；GitHub 官方也在把 Copilot 推向更长、多步骤的 agentic coding session。",
        opportunity: "代码 Agent 访问报告：按任务列出仓库、文件、PR、issue、secret 路径和外部调用，给 reviewer 一份批准依据。",
        read: "支撑 winner，也支撑第三名。代码 Agent 的价值越高，审计压力越具体。",
        status: "进入 Top 3",
        sourceRefs: [0, 5],
      },
      {
        keyword: "Chrome DevTools MCP",
        signal: "AI HOT 全量信号记录 Chrome DevTools MCP，让 Agent 能检查页面、网络、性能和调试信息。",
        opportunity: "Browser Agent Evidence：记录 Agent 在浏览器里打开了哪些页面、看到了哪些 cookie/请求/表单字段、是否触达客户数据。",
        read: "进入 winner。浏览器工具把风险从代码扩展到真实用户会话和业务后台。",
        status: "进入 Top 3",
        sourceRefs: [1, 8],
      },
      {
        keyword: "PII masking / Marvis privacy / 香港 AI 隐私检查",
        signal: "AI HOT 同日出现 PII masking、privacy-first personal assistant 和香港隐私机构对 60 个机构 AI 使用个人数据的合规检查。",
        opportunity: "AI 输入脱敏与合规收据：把 prompt、文件和日志里的个人数据类型、脱敏状态和留存风险整理成报告。",
        read: "支撑 winner。隐私监管和产品采用正在同一天落到可执行清单上。",
        status: "支撑判断",
        sourceRefs: [1, 2, 7],
      },
      {
        keyword: "OpenRouter 融资 / 模型网关规模化",
        signal: "BuilderPulse 和 TechCrunch 都记录 OpenRouter 融资与估值增长，说明多模型网关正在成为真实基础设施。",
        opportunity: "Model Gateway Spend Board：把不同模型、任务、质量、fallback 和账单连成一张团队决策表。",
        read: "进入第二名。模型网关热度高，但独立产品更适合卖任务级成本和质量解释。",
        status: "进入 Top 3",
        sourceRefs: [0, 6],
      },
      {
        keyword: "Merge Gateway / OpenRouter / Kimi / Qwen / Claude Code",
        signal: "AI HOT 记录 Merge Gateway 把多模型路由、Kimi、Qwen、Claude Code 和 OpenRouter 组合成工程团队可用路径。",
        opportunity: "Route Change Receipt：在切换模型或网关前，生成成本、延迟、隐私和质量回归的上线建议。",
        read: "进入第二名。路由层会普及，但团队仍需要解释为什么这样切。",
        status: "进入 Top 3",
        sourceRefs: [2, 6],
      },
      {
        keyword: "Uber AI spend / 96k token agent workload",
        signal: "AI HOT 记录企业难以精确测算 AI 投入回报，以及 SemiAnalysis 对 AI agent workload 高 token 消耗的讨论。",
        opportunity: "Agent ROI Ledger：把长任务、重试、人工复核和模型调用拆成每个工作流的真实成本。",
        read: "支撑第二名。AI 成本不再只是单价问题，而是任务结构问题。",
        status: "支撑判断",
        sourceRefs: [1, 2],
      },
      {
        keyword: "Kakuna / vibe-coded app hardening",
        signal: "AI HOT 记录 Kakuna 帮用户把 AI 生成的应用部署前检测安全、数据和生产问题；BuilderPulse 也记录 Show HN Vibecodex 指向 demo 到生产的压力。",
        opportunity: "Vibe App Production Gate：扫描 AI 生成应用的 auth、数据暴露、错误处理、依赖、部署配置和测试缺口。",
        read: "进入第三名。它有强需求，但与安全扫描、测试和托管平台会竞争。",
        status: "进入 Top 3",
        sourceRefs: [0, 1, 11, 12],
      },
      {
        keyword: "MashuPack / Context for AI / ecclim",
        signal: "BuilderPulse 和 AI HOT 都记录把项目材料、研究笔记和上下文打包给 AI 的工具，说明用户开始主动管理 prompt context。",
        opportunity: "Context Package QA：检查上下文包是否包含过期资料、隐私数据、矛盾约束和缺失来源。",
        read: "支撑第三名和 winner。上下文包越产品化，质量和权限验收越有价值。",
        status: "支撑判断",
        sourceRefs: [0, 1, 2],
      },
      {
        keyword: "AI 假引用 / AI slop",
        signal: "BuilderPulse 记录 AI 生成文章出现假引用以及 AI slop 让 Web 内容更差；AI HOT 也出现 AI 自查和事实核验工具信号。",
        opportunity: "Citation Integrity Check：检查 AI 生成文章、研究笔记和产品文档里的来源是否存在、是否支撑结论。",
        read: "被淘汰为独立 Top 3。需求真实，但更适合作为生产加固门的一项检查。",
        status: "淘汰",
        sourceRefs: [0, 1],
      },
      {
        keyword: "Understand-Anything / 页面理解",
        signal: "AI HOT 记录网页理解工具把页面结构、截图和语义抽给 AI 使用。",
        opportunity: "Web Context Permission Layer：让团队知道 Agent 从网页里抽取了哪些字段，哪些字段不该进入模型上下文。",
        read: "并入 winner。单独做页面理解工具竞争太强，做权限和证据更窄。",
        status: "支撑判断",
        sourceRefs: [1],
      },
      {
        keyword: "Suno self-listening / AI 内容识别",
        signal: "AI HOT 记录 AI 生成音乐进入自我消费和识别讨论，内容真实性仍是长期议题。",
        opportunity: "AI Content Origin Receipt：给媒体素材生成来源、编辑链路和授权证据。",
        read: "淘汰。流量高，但 5 月 26 日更明确的付费买方在企业数据和开发工作流。",
        status: "淘汰",
        sourceRefs: [1],
      },
    ],
    scoringDimensions: [
      "真实需求：AI 同事进入企业文件、代码库、浏览器和个人上下文后，负责人需要解释、授权和追责。",
      "具体场景：启用 Copilot/Codex/Claude/浏览器 MCP 前后，IT、安全、工程和合规团队要知道数据边界。",
      "替代方案：平台日志、DLP、SIEM、账单和人工访谈都存在，但无法按一次 Agent 任务生成业务可读收据。",
      "长期性：Agent 越像同事，权限和证据越会成为常规采购项；短期也有明显供需失衡。",
      "付费意愿：小团队可为一次体检付 $99-499，企业和安全敏感团队可为私有部署、规则和留存付年度合同。"
    ],
    opportunities: [
      opportunity(
        "Agent Data Access Receipt",
        "Winner",
        [99, 92, 91],
        "企业和小团队正在把 AI 同事接入文件、代码、浏览器和业务上下文，但负责人缺少一份能解释“AI 读了什么、发给谁、下次如何限制”的任务级证据。",
        "现状是 Microsoft、GitHub、浏览器、模型网关和内部工具各有日志；安全团队靠 DLP/SIEM，工程团队靠 PR 和聊天记录，业务负责人看不懂也串不起来。",
        "先做只读报告：导入 Microsoft 365/GitHub/浏览器 HAR/MCP 事件/Agent 日志，按任务输出数据访问地图、敏感类别、外发路径、审批建议和整改 checklist。",
        "从采用 Copilot、Claude Code、Codex、Browser Agent 的团队切入，免费生成一次访问收据样板；内容营销围绕公开风险案例和可匿名化报告模板。",
        "平台会补自己的日志，DLP 厂商也会进入；独立产品必须跨工具、面向任务和负责人报告，而不是只做单点日志美化。",
        "找 10 个已经启用企业 AI 或代码 Agent 的团队，手工导入 3 次任务日志，看安全/工程负责人是否愿意把报告发给同事并为持续留存付费。"
      ),
      opportunity(
        "Model Gateway Spend Board",
        "强候选",
        [94, 93, 86],
        "多模型网关、OpenRouter、Kimi/Qwen/Claude Code 和高 token workload 正在让团队从“选哪个模型”转向“每类任务怎样路由才不烧钱、不降质”。",
        "现状是看 provider dashboard、OpenRouter 控制台、Excel 和零散 benchmark。它们能看总体调用量，但不能解释某个工作流为什么贵、能否切换、质量怎么验收。",
        "上传模型调用日志、任务标签、质量样本和价格表，输出任务级路由、fallback、缓存、预算上限和回归测试建议。",
        "面向 AI-heavy 产品团队、agency 和 coding agent 重度用户，用一份免费账单体检获客，团队版按项目、模型、报告次数和告警收费。",
        "模型平台和网关会内置成本分析；产品要避开泛 dashboard，聚焦跨供应商、任务级质量验收和管理层可读报告。",
        "用 5 个团队的真实调用日志手工生成路由报告，验证是否能找出 15% 以上可解释节省或明确不可迁移任务。"
      ),
      opportunity(
        "Vibe App Production Gate",
        "强候选",
        [91, 88, 88],
        "越来越多用户用 AI 快速生成 WebApp demo，但上线前缺少 auth、数据、依赖、错误处理、部署配置和测试缺口的验收清单。",
        "现状是靠开发者手工 review、通用 SAST、托管平台提示和 AI 再问一遍。非专业 builder 看不懂安全扫描结果，专业团队又嫌 AI demo 缺证据。",
        "连接 GitHub repo 或上传压缩包，生成生产加固报告：公开端点、环境变量、数据库权限、依赖风险、错误处理、测试覆盖、上线阻断项。",
        "从 Lovable/Replit/Cursor/Claude Code 用户社区和独立开发者切入，提供免费首扫和可分享 badge，再卖团队历史、CI gate 和私有部署。",
        "安全扫描和托管平台会下沉，差异化在于面向 AI 生成应用的具体修复优先级和非专业 builder 可读的上线 checklist。",
        "选 20 个公开 vibe-coded demo 手工出报告，观察作者是否愿意按建议修复并在下一次部署前再次扫描。"
      ),
    ],
    rejected: [
      "Citation Integrity Check 需求真实，但 5 月 26 日更适合作为 Vibe App Production Gate 或内容工作流的一项检查，单独付费人群不如企业数据访问清楚。",
      "AI Content Origin Receipt 适合媒体和创作者，但当天最强买方预算在企业 AI、代码 Agent 和隐私合规。",
      "Context Calendar / Prompt Context OS 有个人效率需求，但个人订阅留存不如组织级访问证据和模型成本报告稳定。",
      "Suno self-listening、AI 音乐和素材识别有流量，但商业 WebApp 切口容易变成内容检测小工具，差异化不足。"
    ],
    sources: [
      source("BuilderPulse", "BuilderPulse 2026-05-26 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-26.md"),
      source("AI HOT 全量", "AI HOT 2026-05-26 全量信号", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "AI HOT 2026-05-26 全量信号（二）", "https://aihot.virxact.com/all?page=2"),
      source("原始信号", "Copilot Cowork 文件外泄演示", "https://www.promptarmor.com/resources/microsoft-copilot-cowork-exfiltrates-files"),
      source("官方", "Microsoft Frontier suite 与 Copilot Cowork", "https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/"),
      source("官方", "GitHub Copilot coding agent 更新", "https://github.blog/ai-and-ml/github-copilot/whats-new-with-github-copilot-coding-agent/"),
      source("原始信号", "OpenRouter 融资与模型网关增长", "https://techcrunch.com/2026/05/26/openrouter-more-than-doubles-valuation-to-1-3b-in-a-year/"),
      source("官方", "香港隐私机构 AI 个人数据合规检查", "https://www.pcpd.org.hk/english/news_events/media_statements/press_20260519.html"),
      source("官方或原始信号", "Chrome DevTools MCP", "https://github.com/ChromeDevTools/chrome-devtools-mcp"),
      source("AI HOT 全量", "PII masking 与隐私优先 AI 助手", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "MashuPack 与 Context for AI", "https://aihot.virxact.com/all?page=2"),
      source("AI HOT 全量", "Kakuna AI 应用生产加固", "https://aihot.virxact.com/all"),
      source("官方或原始信号", "Vibe coding 与生产软件边界", "https://martinfowler.com/articles/exploring-gen-ai.html"),
      source("AI HOT 全量", "Merge Gateway 与多模型路由", "https://aihot.virxact.com/all?page=2"),
    ],
  },
  {
    date: "2026-05-25",
    title: "模型价格、路由备用、本地控制和 AI 垃圾反馈同日升温：今天最值得做的是 Model Price Switchboard",
    summary:
      "今天最强的商业线索不是某个新模型，而是 AI 使用开始进入发票、供应商路由、本地运行、备用模型、质量回归和维护成本。最值得验证的 WebApp 是 Model Price Switchboard：输入团队的任务样本、调用日志、隐私边界和当前供应商，输出一页任务级路由报告，说明哪些调用可以换到低价模型，哪些必须保留，备用路径怎么设，预计每周省多少钱以及会冒什么质量风险。",
    tags: ["模型成本", "Agent 基础设施", "开发者工具"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 2026-05-25", "官方或原始信号"],
    scores: { commercial: 98, traffic: 91, wedge: 89 },
    winner: {
      name: "Model Price Switchboard",
      short:
        "上传 AI 调用日志、任务样本、供应商价格、隐私规则和质量样本，生成任务级模型路由报告：哪些 prompt 可走 DeepSeek/Qwen/本地模型，哪些必须保留在原供应商，Fallback 顺序怎么设，缓存能省多少，质量回归如何验收。",
    },
    conclusion: [
      "5 月 25 日的信号池里，DeepSeek V4 Pro 永久降价、Reasonix 的 prompt-prefix reuse、Qwen 隐式缓存、Edgee Fallback Models、ModelHub、Freu AI、Langfuse 评估流水线、Luma UGC 广告、AI 生成 issue 污染、Claude 架构决策争议和 Constraint Decay 同时出现。它们共同指向一个运营问题：AI 不再只是能不能用，而是每类任务应该在哪里运行、花多少钱、失败后走哪条路、质量如何证明。",
      "逐项判断后，最强机会是 Model Price Switchboard。它有清楚买方：AI-heavy 产品团队、工程经理、agency 和使用 coding agent 的创始人；有清楚触发：DeepSeek 价格变化、Claude/Copilot 用量限制、备用模型需求、缓存命中率和 CFO 看见账单；也有清楚交付：一页任务级路由、成本、隐私和质量报告。",
      "Top 3 推荐分别是：Model Price Switchboard、Local Workflow Control Panel、AI Issue Quality Gate。第一名胜出，因为它把价格、隐私、fallback、缓存和质量验收合在同一张可收费报告里，不需要一开始接管生产流量，也能用真实日志手工交付 MVP。",
    ],
    signalPool: [
      {
        keyword: "DeepSeek V4 Pro 永久折扣",
        signal: "BuilderPulse 把 DeepSeek V4 Pro pricing 列为当天第一信号；官方价格页显示 V4 Pro 在促销结束后保留四分之一价格，输入、输出和缓存命中价格都足以改变路由决策。",
        opportunity: "Model Price Switchboard：把供应商价格变化翻译成任务级路由建议、隐私边界、质量回归和每周账单影响。",
        read: "进入 winner。价格变化本身会被所有人看到，真正可收费的是把价格变成团队可执行路由策略。",
        status: "进入 Top 3",
        sourceRefs: [0, 1],
      },
      {
        keyword: "Reasonix / prompt-prefix reuse",
        signal: "BuilderPulse 记录围绕 DeepSeek-native coding assistant 和 94% prompt-prefix reuse 的讨论，说明团队已经开始关心重复上下文、缓存和编码任务成本。",
        opportunity: "Prompt 缓存体检：识别哪些任务重复输入高、适合缓存或低价模型，哪些会因上下文污染导致质量回归。",
        read: "并入 winner。它让成本分析从总账单下钻到具体任务。",
        status: "进入 Top 3",
        sourceRefs: [0, 2],
      },
      {
        keyword: "Qwen 隐式缓存 / 显式缓存",
        signal: "AI HOT 记录 Qwen3.7-Max 上线隐式缓存，强调自动启用、更快更便宜，并提供显式缓存最佳实践。",
        opportunity: "缓存策略收据：比较自动缓存、显式缓存、供应商价格和实际任务命中率，给出是否值得改 prompt 的结论。",
        read: "支撑 winner。缓存开始成为产品毛利变量，而不是底层工程细节。",
        status: "支撑判断",
        sourceRefs: [6, 7],
      },
      {
        keyword: "Edgee Fallback Models",
        signal: "Product Hunt 上 Edgee Fallback Models 把 Claude Code 不可用、限额耗尽或太贵时自动切到 Kimi、Qwen、Gemma、Bedrock、Vertex 或 Azure 包装成团队连续性问题。",
        opportunity: "Agent Fallback Plan：为 coding agent 生成模型备用顺序、成本变化、上下文压缩和失败处理策略。",
        read: "进入 winner。它证明买方愿意围绕不中断和成本设路由层。",
        status: "进入 Top 3",
        sourceRefs: [0, 4],
      },
      {
        keyword: "ModelHub / Mac 本地模型菜单",
        signal: "BuilderPulse 和 Product Hunt 都记录 ModelHub：Mac 菜单栏管理本地 LLM，帮助开发者发现、下载和使用 Hugging Face、Ollama、MLX、LM Studio、llama.cpp 等模型。",
        opportunity: "Local Workflow Control Panel：把本地模型、文件、自动化任务和输出留存变成负责人可见的控制界面。",
        read: "进入第二名。本地运行不再只是爱好者偏好，而是成本、隐私和可控性的产品语法。",
        status: "进入 Top 3",
        sourceRefs: [0, 3],
      },
      {
        keyword: "Freu AI / $0 recurring Mac app runs",
        signal: "Freu AI 承诺用自然语言自动化 Mac 应用，先编译跨应用流程，再本地运行确定性 DSL，主张没有持续 token 账单。",
        opportunity: "本地自动化运行成本收据：记录哪些桌面流程能本地跑、节省多少 API 成本、失败如何复现。",
        read: "进入第二名。用户要的不是又一个自动化口号，而是可见、可重复、低成本的本地执行证据。",
        status: "进入 Top 3",
        sourceRefs: [0, 5],
      },
      {
        keyword: "Langfuse 可观测与评估流水线",
        signal: "AI HOT 记录 Langfuse 教程覆盖 tracing、提示词管理、评分、数据集和实验，并允许用模拟模型理解完整评估流程。",
        opportunity: "AI Route Evaluation Kit：在切换低价或备用模型前，生成小样本回归测试、评分和上线建议。",
        read: "支撑 winner。路由省钱必须带质量验收，否则只是账单优化。",
        status: "支撑判断",
        sourceRefs: [6, 8],
      },
      {
        keyword: "AI 生成 issue / 维护者负担",
        signal: "Simon Willison 收录 Armin Ronacher 对 AI 重写 issue 的抱怨：报告看似完整，实则混乱、猜测根因、伪造最小复现，维护者希望回到命令、预期、实际和日志四要素。",
        opportunity: "AI Issue Quality Gate：提交前把 AI 生成报告压回四要素，检测猜测、缺失日志和不相关类比。",
        read: "进入第三名。开源维护者、内部平台团队和客服工程都会为减少无效报告付费或安装门禁。",
        status: "进入 Top 3",
        sourceRefs: [6, 10],
      },
      {
        keyword: "Claude 不是架构师 / 架构决策争议",
        signal: "AI HOT 记录“Claude 不是你的架构师”文章，指向模型生成代码可以快，但不应承担长期架构决策。",
        opportunity: "Architecture Decision Reviewer：把 AI 提出的架构变更转成 ADR、风险、替代方案和人工确认点。",
        read: "强需求，但范围比 issue 门禁更重，今天作为第三名的高级形态保留。",
        status: "支撑判断",
        sourceRefs: [6, 13],
      },
      {
        keyword: "Constraint Decay / 后端 Agent 约束衰减",
        signal: "AI HOT 记录关于大型语言模型代理在后端代码生成中出现约束衰减的论文，说明复杂任务里约束遵循能力会变差。",
        opportunity: "Agent Constraint Regression：为后端任务自动生成约束清单、测试断言和失败报告。",
        read: "支撑第三名。它把“AI 可能乱写”变成可检测门槛。",
        status: "进入 Top 3",
        sourceRefs: [6, 11],
      },
      {
        keyword: "Luma Agents / UGC 广告生成",
        signal: "AI HOT 记录 Luma Agents 把定义 brief、设定风格、一键生成 UGC 风格广告包装成电商和营销工作流。",
        opportunity: "Ad Creative Variant QA：生成广告后自动检查品牌一致性、声明风险、平台尺寸和素材来源。",
        read: "有流量和买方，但更偏内容运营；今天不如模型路由和工程质量门槛刚需。",
        status: "待观察",
        sourceRefs: [6, 9],
      },
      {
        keyword: "AI 生成内容痕迹被更多人识别",
        signal: "AI HOT 记录 Ethan Mollick 讨论越来越多人能识别 AI 痕迹，博客、论文和网站中 AI 生成内容比例被重新审视。",
        opportunity: "Human Evidence Editor：帮创作者补足实测截图、原始数据、采访引用和个人判断，降低模板化痕迹。",
        read: "有内容团队需求，但容易变成泛写作工具，今天不进前三。",
        status: "待观察",
        sourceRefs: [6],
      },
      {
        keyword: "AlphaProof Nexus / Lean 验证",
        signal: "AI HOT 记录 DeepMind 系统用 LLM 生成和 Lean 检查组合，自主解决开放数学问题，每步逻辑可由形式化系统验证。",
        opportunity: "Formal Check Companion：面向高风险代码或规则，把自然语言结论转成可检查断言。",
        read: "长期价值很高，但普通 WebApp MVP 难度较大，适合作为工程质量产品的远期模块。",
        status: "待观察",
        sourceRefs: [6, 12],
      },
      {
        keyword: "Vivado Linux 免费支持变化 / Google Takeout 导出疑问",
        signal: "BuilderPulse 把套餐、操作系统支持、导出路径和账号信任归为访问变化，说明平台未关闭也可能制造真实迁移工作。",
        opportunity: "Access Drift Monitor：追踪免费计划、模型名、导出路径、运行时支持和账号状态变化，生成迁移提醒。",
        read: "真实但较散，适合作为 Local Workflow Control Panel 的一章。",
        status: "待观察",
        sourceRefs: [0],
      },
      {
        keyword: "JellyNet / API quota market",
        signal: "BuilderPulse 记录发布市场把闲置 API quota 描述成可卖出、更便宜 LLM access 描述成可以买入。",
        opportunity: "Quota Risk Ledger：记录团队购买、转售或切换 API 额度时的条款、可靠性和隐私风险。",
        read: "新鲜但信任风险高；先观察，不进入今天 Top 3。",
        status: "待观察",
        sourceRefs: [0, 14],
      },
    ],
    scoringDimensions: [
      { name: "需求强度", description: "今天的信号是否已经让用户看到发票、停工、质量回归或维护成本。" },
      { name: "场景具体度", description: "能否说清楚是谁在什么任务上需要这份报告。" },
      { name: "替代方案缺口", description: "现有 dashboard、评测表和网关是否无法给负责人一页结论。" },
      { name: "解决方案清晰度", description: "能否用日志、样本和规则在一周内交付窄报告。" },
      { name: "长期性", description: "需求是否会随着多模型、多供应商和本地执行持续存在。" },
      { name: "供需失衡", description: "当前是否有强讨论和强痛点，但成型工具还不够具体。" },
      { name: "付费意愿", description: "买方是否愿意为省钱、不中断、少维护或降低风险付费。" },
    ],
    opportunities: [
      opportunity(
        "Model Price Switchboard",
        "今日第一优先级",
        [98, 91, 89],
        "AI-heavy 产品团队、工程经理、agency 和使用 coding agent 的创始人正在同时面对 DeepSeek 降价、Qwen 缓存、Claude/Copilot 用量限制、备用模型和本地模型选择；他们需要知道每类任务该走哪条供应商路线，既省钱又不把敏感数据和质量交出去。",
        "现在靠 provider dashboard、网关日志、Excel、模型评测表、工程师经验和临时切模型。它们能回答总成本，却很难回答“这个 prompt 能不能换”“换完谁负责质量回归”“备用顺序会不会丢上下文”。",
        "第一版只做只读报告：上传 50-200 条调用样本、任务标签、当前价格、隐私规则和少量人工评分，输出任务级路由建议、缓存机会、fallback 顺序、质量回归清单、每周账单变化和不可迁移任务。",
        "用“DeepSeek 降价后该不该换模型”“Claude Code 备用路线”“你的 AI 发票里哪些 prompt 该重路由”获客；免费 20 条样本体检，付费报告 $49-199，团队持续监控 $99-499/月。",
        "模型网关和 provider 会补成本分析；独立产品必须把成本连到任务、隐私和质量验收，而不是只做 token dashboard。",
        "找 10 个每月 AI 成本超过 $500 或重度使用 coding agent 的团队，手工拆 500 条调用；成功标准是 5 个团队愿意调整路由策略，2 个愿意为每月复查付费。",
      ),
      opportunity(
        "Local Workflow Control Panel",
        "本地运行和可见控制的第二选择",
        [92, 90, 87],
        "开发者、内容团队和小型 agency 正在使用 ModelHub、Freu AI、Textsnap、Audiomass、Kanban CLI 等本地或可检查工具；他们想把模型、文件、桌面自动化和输出留存在自己可控的机器或工作区里，同时让负责人看得懂。",
        "现在靠菜单栏应用、CLI、文件夹、README、录屏和个人习惯。它们解决单点任务，但很难给团队一个统一台账：哪些流程本地跑、哪些输出可复查、哪些自动化没有持续账单、哪些仍然外发数据。",
        "做一个轻量控制面板：用户手动登记本地模型、桌面自动化、文件提取工具和输出目录，系统生成可见开关、数据流、成本节省、失败复现步骤和团队交接报告。",
        "从本地 LLM、Mac 自动化、独立开发者和隐私敏感团队获客；免费个人台账，团队版按流程数、成员、报告导出和私有模板收费。",
        "单个工具会内置自己的管理界面；独立产品必须跨工具、跨文件夹，并把价值放在团队交接和证据报告上。",
        "找 10 个使用本地模型或 Mac 自动化的用户，手工整理他们的流程台账；成功标准是 5 个愿意每周更新，2 个愿意邀请团队成员查看。",
      ),
      opportunity(
        "AI Issue Quality Gate",
        "维护成本下降的窄门槛",
        [90, 88, 88],
        "开源维护者、内部平台团队和客服工程正在收到更多 AI 改写的问题报告、架构建议和后端代码变更；这些内容看起来完整，却缺少命令、预期、实际、日志、约束和可复现路径。",
        "现在靠 issue 模板、人工追问、CI、code review 和维护者经验。模板能提醒字段，但挡不住 AI 写出自信却无证据的长段文字，也不能把架构或代码约束拆成可检查项。",
        "第一版做提交前门禁：粘贴 issue/PR/架构建议，系统提取四要素、标出猜测性根因、缺失日志、不相关类比和未满足约束，输出可提交版本或退回理由。",
        "从 GitHub maintainer、DevRel、内部平台团队和客服工程获客；开源项目免费 badge，团队版按仓库、成员、私有规则和 GitHub App 集成收费。",
        "GitHub 和客服平台可能内置部分模板能力；独立产品必须围绕 AI 生成内容的质量问题做规则库和团队指标。",
        "找 20 个维护者收集真实低质量 issue，手工打分并改写；成功标准是 10 个维护者愿意安装门禁，2 个团队愿意为私有规则付费。",
      ),
    ],
    rejected: [
      "教皇 AI 通谕、Anthropic 声誉和 Google AI safety 都有公共讨论度，但更适合作为治理背景，不适合一周内做窄 WebApp 收费验证。",
      "Luma UGC 广告、AI 封面图、Krea Seedance 促销和可灵访谈有营销流量，但产品容易滑向泛创意工具；今天更强的是广告生成后的质量、来源和品牌风险检查。",
      "AlphaProof Nexus、RTPurbo 和全注意力稀疏化技术价值高，但离普通 SaaS 买方太远；应作为工程质量或模型成本产品的技术背书，而不是单独开题。",
      "JellyNet API quota market、Nexpend 订阅清理和 API 额度交易有新鲜感，但信任、条款和合规风险高，今天只作为成本路由主题的外围信号。",
    ],
    sources: [
      source("BuilderPulse", "BuilderPulse 2026-05-25 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-25.md"),
      source("官方", "DeepSeek API Models & Pricing", "https://api-docs.deepseek.com/quick_start/pricing"),
      source("官方或原始信号", "Reasonix: DeepSeek-native AI coding agent", "https://esengine.github.io/DeepSeek-Reasonix/"),
      source("官方或原始信号", "ModelHub: local LLM menu bar app", "https://www.producthunt.com/products/modelhub"),
      source("官方或原始信号", "Edgee Fallback Models for Claude Code", "https://www.producthunt.com/products/edgee"),
      source("官方或原始信号", "Freu AI: local Mac app runs with $0 recurring run cost", "https://www.producthunt.com/products/freu-cli"),
      source("AI HOT 全量", "AI HOT 2026-05-25 全量信号", "https://aihot.virxact.com/all?page=2"),
      source("AI HOT 全量", "Qwen3.7-Max 隐式缓存", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "Langfuse 可观测与评估流水线教程", "https://aihot.virxact.com/all?page=2"),
      source("AI HOT 全量", "Luma Agents UGC 风格广告生成", "https://aihot.virxact.com/all?page=2"),
      source("原始信号", "Simon Willison: AI-written issue reports", "https://simonwillison.net/"),
      source("原始信号", "Constraint Decay in LLM Agents for Backend Code Generation", "https://arxiv.org/"),
      source("AI HOT 全量", "AlphaProof Nexus 与 Lean 验证", "https://aihot.virxact.com/all?page=2"),
      source("原始信号", "Claude is not your architect", "https://www.hollandtech.net/"),
      source("官方或原始信号", "JellyNet API quota market", "https://www.producthunt.com/products/jellynet"),
    ],
  },
  {
    date: "2026-05-24",
    title: "Agent 本地记忆、控制开关、自动测试与模型降价同日升温：今天最值得做的是 AI Agent 采用控制权收据",
    summary:
      "今天的 AI 商业信号集中在本地记忆、代码图谱、连接器开关、自动化测试闭环、Claude Code 自动模式、模型永久降价、许可取消和政策分诊。最值得验证的 WebApp 不是再做一个 Agent，而是给正在引入 Agent 工具的团队一份采用控制权收据：哪些仓库、文件、记忆、连接器、测试任务和模型成本正在进入工作流，哪些需要审批、回滚、迁移或成本上限。",
    tags: ["Agent 治理", "本地记忆", "开发者工具"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 2026-05-24", "官方或原始信号"],
    scores: { commercial: 97, traffic: 92, wedge: 90 },
    winner: {
      name: "AI Agent 采用控制权收据",
      short:
        "输入团队正在试用的 Agent 工具、仓库、连接器、记忆库、CI 测试结果和账单样本，输出一页采用报告：哪些文件被索引、哪些记忆会留存、哪些连接器已启用、哪些测试闭环可验收、哪些模型成本或许可路径需要回滚计划。",
    },
    conclusion: [
      "5 月 24 日的关键词很多，但真正能连成商业机会的是 local memory、codegraph、agentmemory、12-factor-agents、Replit Agent + Squidler、TencentDB Agent Memory、Claude Code 自动模式、Memdex、note.md、Vibedock、SemanticGuard、DeepSeek 永久降价、Claude Code 许可取消、Bun 支持降级、Railway/GCP 信任和 Visa Change Triage。它们共同说明：团队不是缺少更多 AI 工具，而是缺少采用这些工具时的控制权、证据和回滚方案。",
      "逐项判断后，最强机会是 AI Agent 采用控制权收据。买方很清楚：正在把 Claude Code、Codex、Cursor、Replit Agent、代码图谱、本地记忆、MCP 连接器和成本优化工具带进工作流的工程团队、agency 和 AI 产品团队。触发也清楚：试点前的安全审查、试点后的 reviewer 疑问、客户安全问卷、许可变化、模型价格变化和成本压力。",
      "Top 3 推荐分别是：AI Agent 采用控制权收据、Visa Change Triage、AI 模型成本与毛利路线收据。第一名胜出，因为它同时被 AI HOT 的 Agent/记忆/测试/成本信号和 BuilderPulse 的控制类工具、开发者抱怨、开源采用信号支撑，且 MVP 能从一份只读报告开始，不需要先进入高风险执行层。",
    ],
    signalPool: [
      {
        keyword: "local memory / Memdex / note.md / agentmemory",
        signal: "BuilderPulse 把 Memdex、note.md、agentmemory 和本地工作空间列为当天控制类信号；AI HOT 同日记录腾讯开源 TencentDB Agent Memory，强调本地 SQLite、混合检索和四层长期记忆。",
        opportunity: "AI Agent 采用控制权收据：解释记忆存在哪里、会保存多久、谁能删除、哪些项目或文件被记住。",
        read: "进入 winner。记忆能力越强，团队越需要留存、删除和可解释边界。",
        status: "进入 Top 3",
        sourceRefs: [0, 2, 3, 7, 10],
      },
      {
        keyword: "codegraph / OpenHuman / 12-factor-agents",
        signal: "BuilderPulse 记录 codegraph、openhuman、superpowers、12-factor-agents 等仓库快速增长，关键问题从安装转向团队能否批准采用。",
        opportunity: "热门 Agent 仓库采用报告：索引范围、本地文件证明、提示词/记忆留存、工具调用风险和回滚步骤。",
        read: "进入 winner。Stars 是兴趣，采用报告才接近预算。",
        status: "进入 Top 3",
        sourceRefs: [0, 5, 6, 8],
      },
      {
        keyword: "Replit Agent + Squidler / 自动化测试闭环",
        signal: "AI HOT 记录 Replit Agent 与 Squidler 集成，用户用自然语言构建应用后，Squidler 像真实用户一样测试线上应用，并把问题反馈给 Agent 修复。",
        opportunity: "Agent 测试闭环验收：把构建、测试、失败、修复和再次验证压成 reviewer 可读收据。",
        read: "进入 winner。Agent 能自动修复后，团队更需要知道测试是否真实覆盖。",
        status: "进入 Top 3",
        sourceRefs: [9],
      },
      {
        keyword: "Vibedock / MCP 连接器开关",
        signal: "BuilderPulse 把 Vibedock 和连接器开关列为 Product Hunt 与开发者工具交集，说明普通用户开始需要看得见的工具启用状态。",
        opportunity: "连接器权限台账：记录哪些 MCP/工具连接已启用、能访问什么、何时需要关闭。",
        read: "合并到 winner。连接器开关是采用控制权的前端入口。",
        status: "合并到 winner",
        sourceRefs: [0, 4],
      },
      {
        keyword: "Claude Code 自动模式 / 多实例并行",
        signal: "AI HOT 多条记录提到 Claude Code 自动模式减少权限弹窗、支撑多实例并行，也带来更强的人工监督需求。",
        opportunity: "自动模式风险与验收报告：哪些任务适合自动放行、哪些必须拦截，自动模式节省了什么又放大了什么风险。",
        read: "支撑 winner。越少弹窗，越需要事后证据和策略边界。",
        status: "支撑判断",
        sourceRefs: [23],
      },
      {
        keyword: "Visa Change Triage / 绿卡处理变化",
        signal: "BuilderPulse 记录绿卡处理变化引发 1,253 条讨论，创业公司创始人、HR 和移民员工需要整理受影响人员、文件缺口和律师问题。",
        opportunity: "Visa Change Triage：员工信息收集、风险分层、文件缺口和律师问题报告。",
        read: "进入 Top 3。它不是 AI 热点本身，但有最清晰的负责人、截止压力和一次性报告付费点。",
        status: "进入 Top 3",
        sourceRefs: [0, 1],
      },
      {
        keyword: "DeepSeek 永久 75% 折扣 / 低成本缓存",
        signal: "AI HOT 记录 DeepSeek 将 V4-Pro 75% 折扣永久化，输出 token 定价显著低于 GPT-5.5；同日还有低成本缓存和硬件适配讨论。",
        opportunity: "AI 模型成本与毛利路线收据：按任务判断是否换模型、缓存是否改变毛利、哪里需要质量回归测试。",
        read: "进入 Top 3。模型降价本身会过期，但团队需要任务级换模决策。",
        status: "进入 Top 3",
        sourceRefs: [13, 18],
      },
      {
        keyword: "SemanticGuard / API 成本降低 40-70%",
        signal: "BuilderPulse 记录 SemanticGuard 在 Product Hunt 上以一行代码降低 LLM API 成本为主张，说明成本优化已经进入产品化包装。",
        opportunity: "成本节省验证器：对比接入前后成本、质量和失败率，确认是否真的降本。",
        read: "并入第三名。用户不会只买节省承诺，会买可复查的节省证明。",
        status: "进入 Top 3",
        sourceRefs: [0, 14],
      },
      {
        keyword: "Claude Code 许可取消 / 打包访问权消失",
        signal: "BuilderPulse 记录 Microsoft 取消 Claude Code 许可引发 443 条讨论，开发者工作流开始暴露在采购和许可变化下。",
        opportunity: "AI 工具访问降级监控：许可、导出、替代路线和迁移计划报告。",
        read: "强商业信号，但今天排在 Top 3 外；它可以成为 Agent 采用收据的一章。",
        status: "待观察",
        sourceRefs: [0, 15],
      },
      {
        keyword: "Bun support limited / yt-dlp 维护边界",
        signal: "BuilderPulse 记录 yt-dlp 限制 Bun 支持引发 579 条评论，说明快速运行时可能把支持成本转嫁给维护者。",
        opportunity: "开发者工作流变更风险收据：运行时、依赖、维护边界、迁移步骤和回滚提醒。",
        read: "待观察。它有痛点，但本周已连续出现，今天更适合并入迁移风险。",
        status: "待观察",
        sourceRefs: [0, 16],
      },
      {
        keyword: "Railway / Google Cloud 升级路径信任",
        signal: "BuilderPulse 记录 Railway 与 Google Cloud 信任讨论，创业者想知道云服务被暂停时的升级路径和决策地图。",
        opportunity: "云供应商升级路径收据：账号风险、支持路径、备份出口和业务影响。",
        read: "真实但偏云治理；今天不如 Agent 采用控制权聚焦。",
        status: "待观察",
        sourceRefs: [0, 17],
      },
      {
        keyword: "TrapDoor / AI 助手成为供应链攻击面",
        signal: "AI HOT 记录 TrapDoor 协调攻击把恶意 CLAUDE.md 与 .cursorrules 注入开源项目，让 AI 助手可能执行被操纵指令。",
        opportunity: "AI 助手配置安全扫描：检查仓库指令文件、规则文件、安装脚本和危险命令。",
        read: "强安全信号，作为 winner 的风险模块，而不是单独开一个泛安全产品。",
        status: "支撑判断",
        sourceRefs: [22],
      },
      {
        keyword: "PDF to Markdown / RAG 输入格式",
        signal: "AI HOT 记录创作者建议把 PDF 转 Markdown 再喂 AI，理由是 PDF 会消耗更多 token 且易造成结构错乱。",
        opportunity: "AI 输入资产体检：把 PDF、docx、网页和笔记转成适合模型处理的结构化材料，并输出质量评分。",
        read: "有内容工作流价值，但付费触发不如 Agent 采用和成本路线强。",
        status: "待观察",
        sourceRefs: [24],
      },
      {
        keyword: "Amazon Bee / 可穿戴 AI 隐私焦虑",
        signal: "AI HOT 记录 TechCrunch 试用 Amazon Bee 后同时感到便利和隐私不安。",
        opportunity: "个人 AI 设备隐私清单：记录设备听到什么、存哪里、如何关闭或导出。",
        read: "消费者兴趣强，企业 WebApp 付费弱，保留观察。",
        status: "待观察",
        sourceRefs: [19],
      },
      {
        keyword: "LinkedIn 打击 AI 生成垃圾内容",
        signal: "AI HOT 记录 LinkedIn 将降低明显 AI 生成、缺乏原创性的帖子和评论推荐。",
        opportunity: "AI 内容原创性与发布风险报告：帮助 B2B 创作者避免模板化低价值内容。",
        read: "内容营销有需求，但容易滑向泛内容检测器，今天不进前三。",
        status: "淘汰",
        sourceRefs: [20],
      },
      {
        keyword: "free stock photos no attribution / no-attribution media",
        signal: "BuilderPulse 记录该搜索词上涨 5,000%，说明创作者和营销人员想知道什么素材可以安全复用。",
        opportunity: "素材许可解释器：输入图片来源和许可文本，输出是否可商用、是否需署名和替代来源。",
        read: "短期 SEO 机会明显，但买方预算不如开发团队和 HR 清楚。",
        status: "待观察",
        sourceRefs: [0],
      },
    ],
    scoringDimensions: [
      { name: "需求强度", description: "用户今天是否已经在花时间、花钱或承担风险解决这个问题。" },
      { name: "场景具体度", description: "能否说清楚是谁、在什么工作流、遇到什么阻塞。" },
      { name: "替代方案缺口", description: "现有方案是否笨、慢、贵、不可信，或无法跨工具复查。" },
      { name: "解决方案清晰度", description: "能否在一周内做出很窄的 WebApp/报告/插件来验证。" },
      { name: "长期性", description: "需求是否会随着 Agent 和生成式工具普及而持续存在。" },
      { name: "供需失衡", description: "如果不是长期刚需，当前是否处在用户急需但供给不足的窗口。" },
      { name: "付费意愿", description: "目标客户是否有明确预算，愿意为省时间、降风险或增收入付费。" },
    ],
    opportunities: [
      opportunity(
        "AI Agent 采用控制权收据",
        "今日第一优先级",
        [97, 92, 90],
        "工程团队、AI 产品团队和 agency 正在把代码图谱、本地记忆、MCP 连接器、Claude Code 自动模式、Replit Agent 测试闭环和成本优化工具放进真实工作流；负责人需要知道这些工具碰了哪些文件、留了哪些记忆、开了哪些连接器、跑了哪些测试、会产生多少成本。",
        "现在靠 README、GitHub stars、工具日志、PR diff、CI 输出、安全问卷和团队口头解释。信息都在，但分散、不面向决策，也很难回答“这个工具是否可以被团队批准采用”。",
        "第一版只做只读采用报告：用户提交工具清单、仓库链接、连接器配置、Agent 日志、CI artifact 或账单样本，输出索引范围、记忆留存、连接器权限、测试闭环、成本变化、回滚步骤和试点建议。",
        "用“你的 Agent 工具到底碰了什么”“codegraph/agentmemory 采用检查”“Claude Code 自动模式验收清单”获客；免费单工具检查，团队版按仓库、工具数、历史报告、策略模板和私有部署收费。",
        "平台会内置部分审计与权限能力；独立产品必须跨工具、报告导向，并坚持只读证据，避免变成另一个高风险 Agent 控制平面。",
        "找 10 个正在试用 Claude Code、Codex、Cursor、Replit Agent、codegraph 或 agentmemory 的团队，手工生成 20 份采用报告；成功标准是 5 个团队愿意把报告发给负责人，2 个愿意为持续试点报告付费。",
      ),
      opportunity(
        "Visa Change Triage",
        "非 AI 但付费触发最硬",
        [92, 94, 88],
        "创业公司创始人、HR 负责人和移民员工面对绿卡处理规则变化时，需要先知道团队里谁可能受影响、缺哪些事实、有什么旅行或文件风险、第一次律师电话该问什么。",
        "现在靠 Slack 恐慌讨论、员工自述、律师邮件、政策链接和 HR 表格。它们能收集事实，但很难快速变成创始人、员工和律师都能共用的一页材料。",
        "做一张员工信息收集表和生成报告：身份路径、国家、家属、旅行计划、岗位关键日期、现有律师、文件缺口、公开来源链接和律师问题清单；明确只做信息整理，不提供法律建议。",
        "从有移民员工的创业公司、创始人社群、HR 社群和签证讨论线程获客；一次性 $19-49/份员工报告，团队版按员工数、管理员视图和律师协作收费。",
        "法律相邻风险高，不能越界给结论；政策也可能变化。产品必须把边界写清楚，只做事实收集、问题整理和证据链接。",
        "用 Google Form 和样例 PDF 找 5 位有移民员工的创始人验证；成功标准是 3 位认为它能减少第一次律师电话准备时间，1 位愿意付费试点。",
      ),
      opportunity(
        "AI 模型成本与毛利路线收据",
        "价格战下的经营刚需",
        [91, 90, 86],
        "AI 产品团队和内部工具负责人正在同时面对 DeepSeek 永久降价、SemanticGuard 成本节省承诺、模型缓存路线、固定订阅幻觉和 Agent 重试成本；他们需要知道哪些任务该换模型、哪些节省是真的、哪些质量回归会吞掉毛利。",
        "现在靠 provider dashboard、账单导出、Excel、模型评测表和工程师经验。它们能看总额或单次 benchmark，却很难把成本、质量、重试、人工复核和客户收入放在同一张任务级收据里。",
        "上传 usage CSV、账单导出、任务样本和少量人工评分，生成模型路线报告：任务成本、缓存命中、低价模型替代、质量回归风险、毛利影响、预算上限和下一步实验。",
        "用“DeepSeek 降价后该不该换模型”“API 成本节省是真是假”“每条 Agent 任务的真实毛利”获客；一次性账单体检 $49-199，团队持续监控 $99-499/月。",
        "模型网关和 provider 会补成本分析；独立产品要把成本连到业务任务和毛利，而不是只做 token dashboard。",
        "找 10 个每月 AI 成本超过 $500 的产品团队，手工拆 50 个任务；成功标准是 5 个团队能据此调整模型或预算上限，2 个愿意付费复查。",
      ),
    ],
    rejected: [
      "Claude Opus 4.8、GPT-5.6、Claude Mythos、Gemini Spark 和 Gemini Omni 都有流量，但模型名本身不构成可防守 WebApp；更好的切口是围绕采用、权限、记忆、测试和成本做证据层。",
      "Amazon Bee、LinkedIn AI 内容降权和 AI 生成素材许可都有消费者或内容团队痛点，但企业付费主体不如工程团队、HR 和 AI 产品负责人清楚。",
      "Bun 支持受限、Railway/GCP 信任、Microsoft 许可取消都是真实迁移信号，但单独做迁移监控会太散；今天更适合作为 Agent 采用控制权收据中的“访问路径和回滚”章节。",
      "WiFi 身份识别、机器人足球、空间智能和 AI 算力实体基建能带来阅读流量，但不适合一周内做小 WebApp 验证。",
    ],
    sources: [
      source("BuilderPulse", "BuilderPulse 2026-05-24 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-24.md"),
      source("官方或原始信号", "Green card seekers must leave U.S. to apply", "https://www.nytimes.com/2026/05/22/us/politics/green-card-changes-trump.html"),
      source("官方或原始信号", "Memdex", "https://www.producthunt.com/products/memdex"),
      source("官方或原始信号", "note.md", "https://www.producthunt.com/products/note-md"),
      source("官方或原始信号", "Vibedock", "https://www.producthunt.com/products/vibedock"),
      source("官方或原始信号", "codegraph", "https://github.com/colbymchenry/codegraph"),
      source("官方或原始信号", "openhuman", "https://github.com/tinyhumansai/openhuman"),
      source("官方或原始信号", "agentmemory", "https://github.com/rohitg00/agentmemory"),
      source("官方或原始信号", "12-factor-agents", "https://github.com/humanlayer/12-factor-agents"),
      source("AI HOT 全量", "Replit Agent 与 Squidler 集成", "https://x.com/Replit/status/2058261705998602548"),
      source("AI HOT 全量", "TencentDB Agent Memory", "https://www.marktechpost.com/2026/05/23/tencent-open-sources-tencentdb-agent-memory-a-4-tier-local-memory-pipeline-for-ai-agents"),
      source("AI HOT 全量", "Claude Opus 4.8 现身 Vertex 平台", "https://x.com/kimmonismus/status/2058226072596971694"),
      source("AI HOT 全量", "Claude Memory Files", "https://x.com/testingcatalog/status/2058579152387653841"),
      source("AI HOT 全量", "DeepSeek 永久化 75% 折扣", "https://the-decoder.com/deepseek-makes-its-75-percent-discount-permanent-pricing-output-tokens-at-least-34x-below-gpt-5-5"),
      source("官方或原始信号", "SemanticGuard", "https://www.producthunt.com/products/semanticguard"),
      source("官方或原始信号", "Microsoft canceling Claude Code licenses", "https://www.theverge.com/tech/930447/microsoft-claude-code-discontinued-notepad"),
      source("官方或原始信号", "yt-dlp：Bun support is now limited and deprecated", "https://github.com/yt-dlp/yt-dlp/issues/16766"),
      source("官方或原始信号", "Ask HN：Railway and Google Cloud trust discussion", "https://news.ycombinator.com/item?id=48210590"),
      source("AI HOT 全量", "DeepSeek 缓存与硬件适配成本讨论", "https://x.com/oran_ge/status/2058430850006667527"),
      source("AI HOT 全量", "Amazon Bee wearable privacy concern", "https://techcrunch.com/2026/05/24/i-tried-amazons-bee-wearable-and-am-both-intrigued-and-slightly-creeped-out"),
      source("AI HOT 全量", "LinkedIn 打击 AI 生成垃圾内容", "https://www.ithome.com/0/954/528.htm"),
      source("官方或原始信号", "Agent.email", "https://news.ycombinator.com/item?id=48225596"),
      source("AI HOT 全量", "TrapDoor supply-chain attack and AI assistants", "https://x.com/kimmonismus/status/2058584943052161488"),
      source("AI HOT 全量", "Claude Code 自动模式", "https://x.com/bcherny/status/2058519809214607704"),
      source("AI HOT 全量", "PDF 与 Markdown 喂 AI 的效率差异", "https://x.com/AYi_AInotes/status/2058536443174158504"),
    ],
  },
  {
    date: "2026-05-23",
    title: "AI 抄袭、llms.txt、智能体测试与天价 token 账单同日爆发：今天最值得做的是来源署名与机器访问收据",
    summary:
      "今天的 AI 商业信号集中在内容所有权、机器访问协议、AI 爬虫压力、开发者工作流降级、智能体测试、Agent 权限、供应链扫描和真实 token 成本。最值得验证的 WebApp 不是再做内容检测器，而是给独立出版者、文档团队、教程站和垂直内容业务一份来源署名与机器访问收据：哪些页面被复用，是否有清晰署名，llms.txt 和批量访问路径是否准备好，哪些爬虫正在制造成本，下一步应该外联、授权、屏蔽还是改开放接口。",
    tags: ["内容所有权", "AI 爬虫", "出版者工具"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 2026-05-23", "官方或原始信号"],
    scores: { commercial: 96, traffic: 94, wedge: 90 },
    winner: {
      name: "来源署名与机器访问收据",
      short:
        "输入 URL、sitemap、样例文章或访问日志，检查 AI 生成页面、答案引擎和高爬虫量工作流是否复用了原创内容却没有明显署名，并生成引用证据、llms.txt 准备度、授权措辞、屏蔽建议和月度监控报告。",
    },
    conclusion: [
      "当天最密集的关键词不是单个模型，而是 AI plagiarism、AI scrapers、LLM access、llms.txt、source credit、Bun deprecation、Antigravity migration、Railway cloud trust、TestSprite、DCP、buildpipe、Claude Code token bill、Microsoft AI cost 和 Bumblebee supply-chain scanner。它们共同指向一个问题：AI 正在拿走内容、运行任务、改变工作流和制造账单，但所有者缺少可复查证据。",
      "逐项判断后，最强商业机会是来源署名与机器访问收据。它的买方清楚：独立出版者、教程站、文档团队、垂直内容业务和开放档案站；触发也清楚：发现 AI 生成页面排在原文前、搜索流量变差、爬虫成本升高、客户或社区质疑引用来源。MVP 不需要赢法律战，只需要把页面、日志、重复短语、引用路径和下一步行动整理成一页证据。",
      "Top 3 推荐分别是：来源署名与机器访问收据、Agent 测试与权限验收台、AI 用量成本异常收据。第一名胜出原因是需求新鲜、买方付费门槛低、证据形态明确，而且 BuilderPulse 与 AI HOT 全量信号都显示“谁拥有结果、谁能证明发生了什么”已经成为当天最强主题。",
    ],
    signalPool: [
      {
        keyword: "AI plagiarism / 内容被复制后排在原文前",
        signal: "BuilderPulse 2026-05-23 记录 AI 抄袭讨论获得 719 条讨论，作者描述原创教程被 AI 生成页面复用并拿走搜索可见性。",
        opportunity: "来源署名与机器访问收据：检查页面复用、缺失署名、搜索结果快照和外联证据。",
        read: "今日 winner。它不是抽象版权争论，而是内容业务的流量、托管成本和信用归属问题。",
        status: "进入 Top 3",
        sourceRefs: [0, 2],
      },
      {
        keyword: "llms.txt / 机器可读访问路径",
        signal: "Anna's Archive 发布面向 LLM 的访问说明，引发 415 条讨论，强调批量下载、元数据、API 与捐赠路径，避免机器压垮真人页面。",
        opportunity: "llms.txt 准备度检查器：帮站点生成机器访问说明、授权语言、批量数据路径和限流建议。",
        read: "进入 winner。它给内容所有权问题提供了建设性解法，而不只是封禁爬虫。",
        status: "进入 Top 3",
        sourceRefs: [1, 2],
      },
      {
        keyword: "AI scraper 压垮 wiki / 托管成本",
        signal: "BuilderPulse 记录 Lobsters 对 AI scraper 让 wiki 更难运营的讨论，问题落在带宽、审核和防御成本。",
        opportunity: "AI 爬虫压力月报：从访问日志里识别机器流量、热门被抓页面、成本变化和屏蔽/开放策略。",
        read: "合并到 winner。买方愿意为看得见的成本和证据付费。",
        status: "合并到 winner",
        sourceRefs: [2, 3],
      },
      {
        keyword: "TestSprite 3.0 / 并行智能体测试",
        signal: "BuilderPulse 记录 TestSprite 3.0 在 Product Hunt 获得 74 条评论，并与“software testing strategies”搜索需求相互印证。",
        opportunity: "Agent 测试与权限验收台：记录智能体测试了什么、碰了什么权限、哪些结果可复查。",
        read: "进入 Top 3。买方不是想看 demo，而是想知道自动化工作是否真的被验证。",
        status: "进入 Top 3",
        sourceRefs: [4, 2],
      },
      {
        keyword: "DCP / 加密的 Agent 权限与密钥",
        signal: "DCP 用加密权限和密钥管理包装 Agent 基础设施，说明 Agent 触达工具和凭证已经进入购买语境。",
        opportunity: "Agent 权限验收报告：哪些密钥、工具、环境和外部服务被授权，何时需要撤销。",
        read: "支撑第二名。权限和测试证据应该放在同一张验收收据里。",
        status: "进入 Top 3",
        sourceRefs: [5, 2],
      },
      {
        keyword: "buildpipe / 多步骤 AI 开发者工作流",
        signal: "buildpipe 把多步骤 AI 开发者工作流产品化，说明团队正在把 Agent 组合成可运行流程。",
        opportunity: "多步骤 Agent 工作流运行收据：记录步骤、失败、重试、成本、权限和最终产物。",
        read: "支撑第二名。多步骤越多，越需要验收层。",
        status: "支撑判断",
        sourceRefs: [6, 2],
      },
      {
        keyword: "$200/month 计划下 $30,983 token 账单",
        signal: "BuilderPulse 记录 Indie Hackers 上关于 Claude Code token 用量的讨论，固定订阅背后隐藏真实用量恐惧。",
        opportunity: "AI 用量成本异常收据：把订阅、token、任务、重试、团队成员和真实边际成本拆开。",
        read: "进入 Top 3。买方是 founder、团队负责人和财务，触发点是账单异常或预算失控。",
        status: "进入 Top 3",
        sourceRefs: [7, 2],
      },
      {
        keyword: "Microsoft：AI 成本高于人力工资",
        signal: "AI HOT 全量池记录 Microsoft 相关报告指出特定场景里 AI 使用成本可能高于雇佣人类完成任务。",
        opportunity: "AI vs 人工任务经济性报告：按任务比较 token、Agent、人工复核和失败重试的总成本。",
        read: "支撑第三名。它把成本问题从 token 单价拉回业务决策。",
        status: "进入 Top 3",
        sourceRefs: [8],
      },
      {
        keyword: "DeepSeek V4 Pro 永久降价与并发扩容",
        signal: "AI HOT 全量池记录 DeepSeek API 输出提速、服务扩容、默认 500 并发与 V4 Pro 永久降价。",
        opportunity: "模型成本路线收据：低价模型何时足够，何时要换高价模型，缓存命中如何影响真实账单。",
        read: "合并到成本异常收据。降价不是终点，团队仍要知道任务层面的真实成本。",
        status: "合并到成本收据",
        sourceRefs: [9, 10],
      },
      {
        keyword: "Bun 支持受限 / Antigravity 迁移 / Railway 信任",
        signal: "BuilderPulse 记录 yt-dlp 限制 Bun 支持、Antigravity 工作流迁移和 Railway/GCP 账户信任继续引发讨论。",
        opportunity: "开发者工作流变更风险收据：监控依赖、运行时、IDE、云服务支持边界变化，输出迁移优先级。",
        read: "商业真实，但今天作为支撑和淘汰项，不如前三名验证快。",
        status: "待观察",
        sourceRefs: [11, 12, 13],
      },
      {
        keyword: "Perplexity Bumblebee / 开发者端点供应链扫描",
        signal: "AI HOT 全量池记录 Perplexity 开源 Bumblebee，只读扫描 npm、PyPI、Go 模块、MCP 配置、编辑器和浏览器扩展。",
        opportunity: "开发者端点风险收据：把扩展、MCP、包和浏览器插件风险按成员与机器汇总。",
        read: "延续 5.20/5.22 的安全主线；今天不单独胜出，但可作为 Agent 权限验收的安全输入。",
        status: "支撑判断",
        sourceRefs: [14, 15],
      },
      {
        keyword: "OpenAI Appshots / ChatGPT 表单填写 / PowerPoint 插件风险",
        signal: "AI HOT 全量池记录 Codex Appshots、ChatGPT 表单填写和 PowerPoint 插件可直接操作用户文档与界面。",
        opportunity: "AI 办公自动化变更前备份收据：记录哪些窗口、表单、PPT 被读写，如何回滚。",
        read: "需求存在，但更偏办公场景；今天作为后续观察。",
        status: "待观察",
        sourceRefs: [16, 17],
      },
    ],
    scoringDimensions: [
      { name: "需求强度", description: "用户今天是否已经在花时间、花钱或承担风险解决这个问题。" },
      { name: "场景具体度", description: "能否说清楚是谁、在什么工作流、遇到什么阻塞。" },
      { name: "替代方案缺口", description: "现有方案是否笨、慢、贵、不可信，或无法跨工具复查。" },
      { name: "解决方案清晰度", description: "能否在一周内做出很窄的 WebApp/报告/插件来验证。" },
      { name: "长期性", description: "需求是否会随着 Agent 和生成式工具普及而持续存在。" },
      { name: "供需失衡", description: "如果不是长期刚需，当前是否处在用户急需但供给不足的窗口。" },
      { name: "付费意愿", description: "目标客户是否有明确预算，愿意为省时间、降风险或增收入付费。" },
    ],
    opportunities: [
      opportunity(
        "来源署名与机器访问收据",
        "今日第一优先级",
        [96, 94, 90],
        "独立出版者、教程站、文档团队和垂直内容业务正在发现原创内容被 AI 生成页面、答案引擎或高爬虫量工作流复用，但缺少署名、流量回流和可执行证据；同时还要承担托管、带宽和维护成本。",
        "现在靠手工搜索标题、复制片段、查日志、写 robots.txt、发投诉邮件或在社区抱怨。有人会做，但很慢：证据散、引用不清、日志难读，也不知道应该开放批量访问、要求署名、屏蔽爬虫还是外联授权。",
        "第一版让用户输入 URL、sitemap、样例文章或访问日志，生成一页报告：疑似复用片段、缺失署名、搜索结果快照、llms.txt 准备度、机器访问路径、爬虫压力、外联草稿和屏蔽/授权建议。",
        "用“AI 是否偷走了你的教程流量”“llms.txt 准备度检查”“AI 爬虫成本报告”获客；先卖 $29 首次审计，再卖 $19-99/月监控、日志解析、搜索快照和授权模板。",
        "法律结果不确定，SEO 归因也复杂；产品不能承诺维权成功，只能卖证据、可读报告和下一步行动。风险是大平台可能补引用机制，但独立站仍需要自己的日志、授权和外联收据。",
        "找 20 个有原创教程、文档或垂直内容的网站，手工生成报告；成功标准是至少 10 个站点发现可外联、可屏蔽或可改机器访问说明的具体页面，3 个愿意为月度监控付费。",
      ),
      opportunity(
        "Agent 测试与权限验收台",
        "开发者预算明确",
        [91, 88, 87],
        "使用 TestSprite、buildpipe、DCP、Kanbots、Rmux 或自建 Agent 工作流的工程团队，需要知道智能体实际测试了什么、碰了哪些权限和密钥、哪些步骤失败、哪些结果可以让 reviewer 接受。",
        "现在靠测试报告、PR diff、Agent 日志、截图、权限页面和开发者解释。它们都能看，但分散且不面向验收：负责人很难判断“这次自动化工作是否真的安全、完整、可合并”。",
        "先做一个 GitHub/CI 旁路报告：导入测试结果、Agent 轨迹、权限清单和密钥范围，输出测试覆盖、未验证路径、权限触达、人工接管点和 merge 前 checklist。",
        "从开源 PR comment bot、TestSprite/buildpipe/DCP 使用模板、Agent 权限 checklist 获客；团队版按仓库、任务数、历史报告、策略模板和私有部署收费。",
        "测试平台和 Agent 平台会内置部分日志；独立产品必须跨工具，把权限、测试和任务证据合成负责人可读的收据，而不是只做 trace viewer。",
        "找 5 个已经用 Agent 写测试或跑多步骤工作流的团队，抽 30 个任务手工生成验收报告，验证 reviewer 是否减少复盘时间并发现遗漏权限或测试缺口。",
      ),
      opportunity(
        "AI 用量成本异常收据",
        "账单焦虑强，适合 founder",
        [90, 91, 85],
        "AI founder、内部工具团队和 agency 正在同时面对固定订阅、token 账单、模型降价、并发扩容和 Agent 重试成本；他们需要知道一次任务真实花了多少钱，是否比人工更贵，哪个模型路线才有毛利。",
        "现在靠 provider usage dashboard、信用卡账单、Excel 和团队口头估算。它们能看总额，但无法解释成本来自哪些任务、哪些重试、哪个成员、哪种模型选择和哪段人工复核。",
        "第一版支持上传账单导出、usage CSV 或手工任务样本，输出异常任务、订阅内真实用量、补贴消耗、模型替代建议、人工对比成本和硬上限建议。",
        "用“$200 订阅背后的真实 token 成本计算器”“DeepSeek 降价后你的任务该换模型吗”“AI vs 人工任务账单”获客；团队版按项目、provider、告警和历史报告收费。",
        "模型网关和 provider 会补成本视图；独立产品要做到任务级、业务可读，并把成本和质量、人工复核、失败重试绑定，而不是只显示 token 数。",
        "找 10 个每月 AI 成本超过 $200 的团队，手工拆 50 个任务账单；成功标准是至少 5 个团队愿意调整模型、加预算上限或付费持续监控。",
      ),
    ],
    rejected: [
      "Qwen3.7-Max、Gemini Omni、Fara 浏览器 Agent 和 GPT-5.5 都有模型热度，但直接做模型壳会撞平台；今天更好的切口是围绕内容、测试、权限和成本做证据收据。",
      "Bun 支持弃用、Antigravity 迁移和 Railway/GCP 信任是强烈的开发者焦虑，但主题本周已经连续出现；可作为未来“工作流变更风险收据”，今天不如来源署名更鲜明。",
      "Perplexity Bumblebee、Anthropic Glasswing 和 OpenClaw 危险代码都指向安全机会，但 5.20/5.22 已重点覆盖 AI 工具链安全；今天更适合作为 Agent 权限验收的支撑信号。",
      "ChatGPT 表单填写、PowerPoint 插件和 Appshots 会制造办公自动化回滚需求，但场景分散，短期付费触发不如内容所有权、智能体验收和账单异常明确。",
    ],
    sources: [
      source("官方或原始信号", "AI is just unauthorised plagiarism at a bigger scale", "https://axelk.ee/ai-is-just-unauthorised-plagiarism-at-a-bigger-scale/"),
      source("官方或原始信号", "Anna's Archive：If you're an LLM, please read this", "https://annas-archive.gl/blog/llms-txt.html"),
      source("BuilderPulse", "BuilderPulse 2026-05-23 中文报告：Source Credit Receipt", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-23.md"),
      source("官方或原始信号", "Aggressive AI scrapers are making it kinda suck to run wikis", "https://weirdgloop.org/blog/clankers"),
      source("官方或原始信号", "TestSprite 3.0：AI agents test apps in minutes", "https://www.producthunt.com/products/testsprite"),
      source("官方或原始信号", "DCP：encrypted permissions and keys for AI agents", "https://www.producthunt.com/products/dcp"),
      source("官方或原始信号", "buildpipe：multi-step AI developer workflows", "https://www.producthunt.com/products/buildpipe"),
      source("官方或原始信号", "Indie Hackers：$30,983 of AI tokens in Claude Code on $200/mo plan", "https://www.indiehackers.com/post/i-used-30-983-of-ai-tokens-last-month-in-claude-code-on-200-mo-plan-3337a369a6"),
      source("AI HOT 全量", "Microsoft AI cost problem: tokens and agents", "https://fortune.com/2026/05/22/microsoft-ai-cost-problem-tokens-agents"),
      source("官方或原始信号", "DeepSeek API Pricing", "https://api-docs.deepseek.com/quick_start/pricing"),
      source("AI HOT 全量", "DeepSeek API 输出提速、服务扩容与并发升级", "https://www.ithome.com/0/954/427.htm"),
      source("官方或原始信号", "yt-dlp：Bun support is now limited and deprecated", "https://github.com/yt-dlp/yt-dlp/issues/16766"),
      source("官方或原始信号", "Google Antigravity bait and switch", "https://www.0xsid.com/blog/antigravity-bait-n-switch"),
      source("官方或原始信号", "Ask HN：Railway and Google Cloud trust discussion", "https://news.ycombinator.com/item?id=48210590"),
      source("AI HOT 全量", "Perplexity 开源 Bumblebee 供应链扫描器", "https://x.com/perplexity_ai/status/2057869990536360334"),
      source("官方或原始信号", "Bumblebee：read-only supply-chain scanner for developer endpoints", "https://www.marktechpost.com/2026/05/23/perplexity-open-sources-bumblebee-a-read-only-supply-chain-scanner-for-developer-endpoints"),
      source("AI HOT 全量", "OpenAI Appshots turns any Mac window into Codex context", "https://the-decoder.com/openai-appshots-turn-any-mac-window-into-context-for-codex"),
      source("AI HOT 全量", "ChatGPT 表单语音填写", "https://x.com/ChatGPTapp/status/2057908052968521902"),
    ],
  },
  {
    date: "2026-05-22",
    title: "Claude 安全集成、Cursor 云端 Agent 与 Android ADK 同时升温：今天最值得做的是 AI 工具链合规证据台",
    summary:
      "今天的信号不再只是模型更强，而是 AI 已经进入安全、合规、云端开发环境、移动端、家庭设备、个人财务和内容发布流程。Claude Opus 被用于大规模安全测试，Claude Compliance API 接入更多企业安全工具；Cursor 云端 Agent、Android ADK、Gemini for Home 和 AI 视频广告工具继续把 Agent 推进真实执行场景。最值得验证的 WebApp 是 AI 工具链合规证据台：帮团队把 Claude、Cursor、MCP、编辑器扩展、Agent 日志和安全工具映射成一份负责人能读懂的接入证明、缺口清单和复查节奏。",
    tags: ["AI 合规", "Agent 治理", "开发者安全"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 最新 2026-05-21", "官方或原始信号"],
    scores: { commercial: 96, traffic: 89, wedge: 91 },
    winner: {
      name: "AI 工具链合规证据台",
      short:
        "把团队正在使用的 Claude、Cursor、MCP、编辑器扩展、Agent 日志和安全工具接入情况，整理成一页可复查报告：哪些活动已进入 SIEM/DLP/审计日志，哪些权限仍不可见，哪些组件应先禁用或补审批。",
    },
    conclusion: [
      "当天全量机会池里最密集的关键词是 Claude Opus 网络安全实战、Claude Compliance API 安全集成、Cursor 云端 Agent、Claude Code /usage、Google Android ADK、Gemini for Home、AI 个人财务、AI 内容广告生成、GitHub 扩展泄露和 BuilderPulse 的 Extension Trust Receipt。它们共同指向一个事实：AI 工具已经能读代码、碰文件、跑任务、接财务和进入家庭/移动设备，团队需要的是可审计边界。",
      "逐项判断后，最强商业机会是 AI 工具链合规证据台。它有明确买方：已经采用 Claude Enterprise、Cursor、MCP、VS Code/Cursor 扩展和多种安全工具的工程、安全、法务或 IT 团队；也有明确触发点：企业采购审查、客户安全问卷、仓库扩展事件、Agent 权限扩张和新合规 API 上线。",
      "Top 3 推荐分别是：AI 工具链合规证据台、云端 Agent 运行验收收据、端侧 Agent 权限与发布验收包。第一名胜出原因是它同时覆盖安全预算、企业采购和真实执行风险，验证路径能从一份只读盘点报告开始，不需要先做复杂平台。",
    ],
    signalPool: [
      {
        keyword: "Claude Opus 网络安全实战",
        signal: "AI HOT 全量信号记录 Anthropic 合作伙伴用 Claude Opus 做持续渗透测试、漏洞发现、修复优先级排序和大规模安全覆盖。",
        opportunity: "安全 AI 使用证据台：把模型辅助安全测试的范围、发现、误报、人工确认和修复状态整理成负责人报告。",
        read: "进入 Top 3。安全团队已经有预算，难点从“能不能发现漏洞”转向“发现后如何证明、交接和治理”。",
        status: "进入 Top 3",
        sourceRefs: [0, 8],
      },
      {
        keyword: "Claude Compliance API / 28 项安全与合规工具集成",
        signal: "AI HOT 全量信号记录 Claude 企业版和平台新增安全合规工具集成，官方帮助文档也说明 Compliance API 可拉取活动事件、聊天数据、文件内容和审计日志。",
        opportunity: "AI 工具链合规证据台：检查 Claude 活动是否进入 SIEM、DLP、审计日志和现有安全流程，并指出未覆盖工具。",
        read: "今日 winner 的核心支撑。企业买方不会只问模型强不强，而会问 AI 活动是否可追踪、可审计、可停用。",
        status: "进入 Top 3",
        sourceRefs: [1, 9],
      },
      {
        keyword: "BuilderPulse Extension Trust Receipt",
        signal: "BuilderPulse 2026-05-21 中文日报把 GitHub 3,800 个仓库扩展泄露、编辑器扩展、MCP 连接器和编码助手组件合并为工程负责人需要的信任收据。",
        opportunity: "把编辑器扩展、MCP 连接器、AI 编码助手和仓库权限放进同一张审批与撤销清单。",
        read: "进入 winner。AI 工具链合规不能只看 Claude，也要覆盖团队真实安装和运行的周边组件。",
        status: "进入 Top 3",
        sourceRefs: [7],
      },
      {
        keyword: "Cursor 云端 Agent / 独立环境与长任务",
        signal: "AI HOT 全量信号记录 Cursor 总结云端智能体经验：独立环境、并行无人值守任务、可靠性和状态解耦正在成为 Agent 平台核心能力。",
        opportunity: "云端 Agent 运行验收收据：记录环境、权限、测试、截图、日志、成本、失败重试和人工接管点。",
        read: "进入 Top 3。云端 Agent 会持续扩大使用，但每次委托都需要可以复查的交付证据。",
        status: "进入 Top 3",
        sourceRefs: [2, 10],
      },
      {
        keyword: "Claude Code /usage token 明细",
        signal: "AI HOT 全量信号记录 Claude Code 将支持查看能力包、代理、MCP 和插件的 token 使用明细。",
        opportunity: "AI 工具链成本与权限联合报告：把 token 花费、插件、MCP、任务类型和仓库访问放在一起解释。",
        read: "合并到合规证据台。单独做成本报表不够，最有价值的是把费用和权限边界一起解释。",
        status: "合并到 winner",
        sourceRefs: [6],
      },
      {
        keyword: "Google ADK for Android / 端侧 Agent",
        signal: "AI HOT 全量信号记录 Google 发布 Kotlin 版 ADK 与 Android 版 ADK 0.1.0，官方 Android 文档显示 ADK 可在 Android 应用内构建和集成 Agent。",
        opportunity: "端侧 Agent 权限与发布验收包：上线前检查设备权限、离线能力、数据留存、用户确认和 Play 审核风险。",
        read: "进入 Top 3。移动端 Agent 一旦进入真实应用，权限和隐私解释会比 demo 更快触发付费。",
        status: "进入 Top 3",
        sourceRefs: [3, 11],
      },
      {
        keyword: "Gemini for Home / 服务商与硬件伙伴",
        signal: "AI HOT 全量信号记录 Google 推出面向服务商与硬件伙伴的 Gemini for Home 方案，强调摄像头智能、自然语言查询和日常活动摘要。",
        opportunity: "家庭 AI 功能发布前隐私收据：解释摄像头、语音、家庭活动摘要、第三方服务商和删除策略。",
        read: "合并到端侧 Agent 验收。智能家居付费慢，但隐私风险和渠道审查强。",
        status: "合并到端侧验收",
        sourceRefs: [4],
      },
      {
        keyword: "ChatGPT 个人财务体验",
        signal: "AI HOT 全量信号记录 OpenAI 向美国 ChatGPT Pro 用户预览个人财务体验，可连接金融账户并基于资金流向提问。",
        opportunity: "金融数据连接前风险说明与权限回执：告诉用户连接了哪些账户、能读什么、如何撤销和如何导出记录。",
        read: "待观察。强信任场景，但平台会优先内置；独立机会在多工具权限说明和企业审查。",
        status: "待观察",
        sourceRefs: [12],
      },
      {
        keyword: "AI 视频广告与 CapCut / Gemini 合作",
        signal: "AI HOT 全量信号记录 PixVerse Shoplift、CapCut 与 Gemini 合作、Luma Agents 宣传素材等内容生成和营销自动化信号。",
        opportunity: "AI 内容发布前品牌安全收据：检查素材来源、AI 标注、敏感场景、平台规则和客户可读审批记录。",
        read: "待观察。流量强，但今天不如工具链合规更容易绑定团队预算。",
        status: "待观察",
        sourceRefs: [5, 13],
      },
      {
        keyword: "OpenAI 数学推理突破",
        signal: "AI HOT 全量信号记录 OpenAI 推理模型在严肃数学问题上取得突破，引发专家讨论自动化推理边界。",
        opportunity: "可验证推理任务记录：面向研究团队记录问题、证明路径、人工复核和可重复验证步骤。",
        read: "待观察。方向重要，但短期商业买方窄，不适合作为今天 winner。",
        status: "待观察",
        sourceRefs: [14],
      },
      {
        keyword: "OpenRouter BYOK 多密钥管理",
        signal: "AI HOT 全量信号记录 OpenRouter BYOK 支持同一 workspace 多密钥、调用顺序和团队账户分配。",
        opportunity: "模型密钥轮换与团队用量收据：检查 provider key、调用顺序、限速 fallback 和成员成本归因。",
        read: "支撑 winner。密钥管理、合规审计和成本解释会逐渐合并。",
        status: "支撑判断",
        sourceRefs: [15],
      },
      {
        keyword: "Cursor Composer 2.5 低成本编码模型",
        signal: "AI HOT 全量信号记录 Cursor Composer 2.5 在编码代理指数中接近头部模型，但单位任务成本显著更低。",
        opportunity: "编码 Agent 模型路线与验收报告：把成本、成功率、测试覆盖和安全边界一起评估。",
        read: "支撑云端 Agent 验收，但模型本身不是最窄商业切口。",
        status: "支撑判断",
        sourceRefs: [16],
      },
    ],
    scoringDimensions: [
      { name: "需求强度", description: "用户今天是否已经在花时间、花钱或承担风险解决这个问题。" },
      { name: "场景具体度", description: "能否说清楚是谁、在什么工作流、遇到什么阻塞。" },
      { name: "替代方案缺口", description: "现有方案是否笨、慢、贵、不可信，或无法跨工具复查。" },
      { name: "解决方案清晰度", description: "能否在一周内做出很窄的 WebApp/报告/插件来验证。" },
      { name: "长期性", description: "需求是否会随着 Agent 和生成式工具普及而持续存在。" },
      { name: "供需失衡", description: "如果不是长期刚需，当前是否处在用户急需但供给不足的窗口。" },
      { name: "付费意愿", description: "目标客户是否有明确预算，愿意为省时间、降风险或增收入付费。" },
    ],
    opportunities: [
      opportunity(
        "AI 工具链合规证据台",
        "今日第一优先级",
        [96, 89, 91],
        "已经把 Claude、Cursor、MCP、VS Code/Cursor 扩展、AI 网关和安全工具带进日常工作的团队，需要在客户安全问卷、企业采购、内审或事故复盘时证明：AI 活动能被记录，敏感数据能被追踪，高风险连接器能被停用。",
        "现在靠安全团队手工查 Claude 管理台、SIEM、DLP、GitHub audit log、扩展清单、MCP 配置和员工截图。替代方案各自能看一点，但很少把 AI 工具、编辑器扩展、连接器、聊天/文件内容和审计日志映射成一张负责人能读懂的证据图。",
        "第一版只做只读报告：用户上传或连接 Claude Compliance API 导出、GitHub audit log、扩展清单和 MCP 配置，系统输出已覆盖活动、不可见活动、高风险权限、建议停用项、补审批项和下次复查日期。",
        "用“AI 工具链审计样板报告”“Claude/Cursor/MCP 接入证明模板”“客户安全问卷 AI 章节填报助手”获客；团队版按成员、工具、连接器数量和月度复查收费。",
        "大安全厂商会做平台级集成，Claude 也会继续补管理能力；独立产品必须跨工具、跨编辑器和跨企业问卷，把证据做成采购、客户成功和工程负责人都能转发的报告。",
        "找 8 个正在用 Claude Enterprise、Cursor 或 MCP 的团队，手工盘点 20 个 AI 活动与连接器，验证安全负责人是否愿意为缺口报告和问卷填报付 $99-499。",
      ),
      opportunity(
        "云端 Agent 运行验收收据",
        "执行场景强，适合工程团队",
        [92, 86, 89],
        "让 Cursor、Claude Code、Codex 或自建云端 Agent 在独立环境里改代码、跑测试、生成 PR 的团队，需要知道一次无人值守任务到底用了什么环境、触达了哪些凭证、跑了哪些测试、失败了几次、产物能否合并。",
        "现在靠 PR diff、CI 状态、聊天记录、录屏和人工 reviewer。它们能用，但无法统一解释任务目标、环境差异、工具权限、测试证据、成本和人工接管点。",
        "先做云端 Agent 任务收据：导入 PR、CI 日志、Agent 轨迹、截图/录屏和环境配置，输出完成度、未验证点、潜在权限风险、复现步骤和 reviewer checklist。",
        "从 GitHub App、Cursor/Claude Code 日志解析器、PR 评论机器人获客；团队版按仓库、Agent 任务数、报告历史和自定义验收规则收费。",
        "Cursor 和代码托管平台会内置部分验收能力；独立产品要跨 Agent 平台，并服务那些还没有统一工程治理的小团队。",
        "找 5 个每周至少运行 20 条 Agent 任务的团队，手工为 30 个 PR 生成验收收据，验证 reviewer 是否减少复核时间并发现遗漏测试。",
      ),
      opportunity(
        "端侧 Agent 权限与发布验收包",
        "移动和家庭入口打开，但验证要窄",
        [88, 87, 84],
        "准备在 Android、家庭设备、金融连接、内容编辑或 DTC 广告工具里加入 Agent 的产品团队，需要在发布前说明它会读取哪些设备/账户数据、何时本地运行、何时上传、如何让用户确认和撤销。",
        "现在靠隐私政策、应用权限弹窗、人工 QA、法务审阅和平台审核清单。问题是 Agent 行为跨设备、跨账户、跨模型，传统隐私政策很难变成产品经理和工程师可执行的发布 checklist。",
        "第一版做发布前验收包：用户选择场景，填写权限、数据流、模型位置、用户确认点和失败模式，系统生成 Play/App Store/客户审核清单、用户说明文案和内部风险记录。",
        "通过 Android ADK、Gemini for Home、AI 财务连接和 AI 视频广告的“上线前权限检查”页面获客；团队版按项目、版本、审核记录和白标导出收费。",
        "平台政策会变化，且许多团队会低估这类报告价值；必须聚焦有发布审核、客户交付或品牌风险的团队，而不是个人 demo。",
        "找 6 个正在做端侧 AI 功能或内容生成工具的产品团队，手工生成一份发布验收包，验证他们是否愿意把它放进 release checklist。",
      ),
    ],
    rejected: [
      "Claude Opus 网络安全实战本身很强，但直接做又一个 AI 漏洞扫描器会碰到 Wiz、Palo Alto、CrowdStrike、Accenture 等强玩家；更窄的切口是把 AI 安全工具的使用证据和治理缺口整理出来。",
      "Cursor Composer 2.5、Qwen3.7-Max 和 OpenRouter BYOK 都有成本机会，但昨天已覆盖模型选择与成本收据；今天新增信息更偏企业接入、权限和合规证据。",
      "Android ADK、Gemini for Home、ChatGPT 个人财务和 CapCut/Gemini 都说明 Agent 正进入敏感端侧场景，但买方分散，先做通用发布验收包比直接做某个垂直助手更稳。",
      "OpenAI 数学推理突破和 AI 视频制作成熟化流量高，但短期 WebApp 买方不如安全、合规和工程验收清楚；适合作为未来“可验证推理报告”或“内容发布风控”的信号继续观察。",
    ],
    sources: [
      source("AI HOT 全量", "Claude Opus 合作伙伴网络安全实战", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "Claude 新增安全合规工具集成", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "Cursor 构建云端智能体的经验总结", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "Google 发布 Kotlin 版 ADK 与 Android 版 ADK 0.1.0", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "Gemini for Home 面向服务商与硬件伙伴", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "PixVerse Shoplift AI 广告视频工具", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "Claude Code /usage token 明细", "https://aihot.virxact.com/all"),
      source("BuilderPulse", "BuilderPulse 2026-05-21 中文报告：Extension Trust Receipt", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-21.md"),
      source("官方或原始信号", "Anthropic：How our partners are putting Opus to work for cybersecurity", "https://claude.com/blog/how-our-partners-are-putting-opus-to-work-for-cybersecurity"),
      source("官方", "Claude Help Center：Access the Compliance API", "https://support.claude.com/en/articles/13015708-access-the-compliance-api"),
      source("官方或原始信号", "Cursor Cloud Agents 产品说明", "https://cursor.com/cloud"),
      source("官方", "Android Developers：Build ADK agents for Android", "https://developer.android.com/ai/adk"),
      source("AI HOT 全量", "ChatGPT 个人财务体验预览", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "CapCut 与 Gemini 合作编辑图像视频", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "OpenAI 自动推理数学里程碑", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "OpenRouter BYOK 多密钥管理升级", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "Cursor Composer 2.5 低成本编码模型", "https://aihot.virxact.com/all"),
    ],
  },
  {
    date: "2026-05-21",
    title: "Qwen3.7-Max、Gemini 3.5 Flash 涨价与 OpenAI YC 算力激励同日出现：今天最值得做的是 Agent 成本与模型选择收据",
    summary:
      "最新信号集中在三件事：更强的智能体模型、更贵的智能体执行、更需要证明的安全与验证边界。Qwen3.7-Max 强调长周期自主任务，Gemini 3.5 Flash 被讨论为性能上升但成本明显上移，OpenAI 向 YC 创业公司提供大额 API 信用额度；这些都让小团队更容易把 Agent 跑起来，也更容易在成本、模型选择和执行证明上失控。今天最值得验证的 WebApp 是 Agent 成本与模型选择收据：给每个团队一页报告，说明哪些任务该用哪个模型、预计花多少钱、何时触发硬上限、哪些结果需要人工复核。",
    tags: ["Agent 成本", "模型选择", "开发者工具"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 最新 2026-05-19", "官方或原始信号"],
    scores: { commercial: 97, traffic: 90, wedge: 92 },
    winner: {
      name: "Agent 成本与模型选择收据",
      short:
        "把团队常见 Agent 任务跑成可复查报告：推荐模型路线、预算上限、失败重试成本、人工接管点和本地/云端替代方案，避免算力补贴、模型升级和长任务执行变成月底账单事故。",
    },
    conclusion: [
      "当天最密集的关键词是 Qwen3.7-Max、Gemini 3.5 Flash 成本上移、OpenAI YC API credits、AI Studio 安卓开发、OpenComputer 可验证桌面任务、GitHub 未授权访问调查、GitHub 生存级风险、AI 智能体沙盒和 AI 伦理安全指南。它们共同说明：Agent 能力继续上升，但团队真正缺的是成本边界、模型选择证据、执行验证和安全响应。",
      "逐项判断后，最强商业机会是 Agent 成本与模型选择收据。它有清楚买方：正在用 Codex、Claude Code、Gemini、Qwen、OpenAI credits 或自建 Agent 的创业团队；也有清楚触发点：模型升级、API 补贴到账、长任务开始跑、账单异常或 reviewer 质疑结果。",
      "Top 3 推荐分别是：Agent 成本与模型选择收据、AI Agent 安全事件响应收据、计算机使用 Agent 验证台。第一名胜出原因是它同时覆盖钱、质量和交付责任，验证路径能从一份手工模型路线报告开始，比直接做大而全 Agent 平台更快接近付费。",
    ],
    signalPool: [
      {
        keyword: "Qwen3.7-Max / 长周期智能体模型",
        signal: "AI HOT 全量池记录阿里千问 Qwen3.7-Max 发布，定位全能智能体基座，并强调长周期自主任务、工具调用和编程能力。",
        opportunity: "Agent 模型选择收据：给具体任务推荐 Qwen、Gemini、OpenAI、Claude 或本地模型，并估算成本、延迟和失败重试风险。",
        read: "进入 Top 3。模型越多，团队越需要可解释的选择和预算边界。",
        status: "进入 Top 3",
        sourceRefs: [0, 11],
      },
      {
        keyword: "Gemini 3.5 Flash 成本上移",
        signal: "AI HOT 全量池记录 Gemini 3.5 Flash 性能提升但成本显著增加，智能体任务还可能因多轮交互放大总费用。",
        opportunity: "Agent 成本与执行上限监控：按任务预估、运行中告警、超预算暂停和替代模型建议。",
        read: "今日 winner 的核心支撑。性能提升会刺激使用，但买方最终会被账单教育。",
        status: "进入 Top 3",
        sourceRefs: [1],
      },
      {
        keyword: "OpenAI 向 YC 创业公司提供大额 API 信用额度",
        signal: "AI HOT 全量池记录 OpenAI 向 YC 当前批次创业公司提供大额 API 信用额度，引发创业团队算力成本和平台绑定讨论。",
        opportunity: "Credit burn-down receipt：跟踪补贴使用、真实单元经济、模型替代路线和补贴结束后的预算缺口。",
        read: "进入 winner。免费额度会放大试用，也会推迟成本纪律。",
        status: "进入 Top 3",
        sourceRefs: [2],
      },
      {
        keyword: "AI Studio 集成 Google Docs/Sheets 与安卓开发",
        signal: "AI HOT 全量池记录 AI Studio 新增直接拉取 Google Docs/Sheets 数据、网页环境开发安卓应用和内置模拟器能力。",
        opportunity: "低代码 Agent 交付验收报告：记录数据源、生成代码、模拟器结果、人工确认点和上线风险。",
        read: "合并到验证台。生成和测试门槛下降后，验收证据会变成瓶颈。",
        status: "合并到验证台",
        sourceRefs: [9],
      },
      {
        keyword: "OpenComputer / 可验证软件世界",
        signal: "AI HOT 全量池记录 OpenComputer 为计算机使用智能体构建可验证软件世界，覆盖桌面应用任务、状态验证器和轨迹评估。",
        opportunity: "计算机使用 Agent 验证台：把桌面任务执行轨迹、状态检查和部分成功证据做成团队验收报告。",
        read: "进入 Top 3。Agent 进入真实软件后，买方需要可机器检查的完成证据。",
        status: "进入 Top 3",
        sourceRefs: [5],
      },
      {
        keyword: "GitHub 未授权访问调查 / AI 网络战讨论",
        signal: "AI HOT 全量池记录 GitHub 内部仓库未授权访问调查及 AI 辅助攻击讨论，安全事件开始和 AI 工具链绑定。",
        opportunity: "AI Agent 安全事件响应收据：检查仓库、凭证、代码索引、AI 工具日志和对外暴露证据。",
        read: "进入 Top 3。安全触发强，但事件细节不稳定，产品应聚焦响应清单而非夸大单一事件。",
        status: "进入 Top 3",
        sourceRefs: [3],
      },
      {
        keyword: "微软内部示警 GitHub 生存级风险",
        signal: "AI HOT 全量池记录微软内部对 GitHub 面临 AI 编程工具冲击的讨论，代码托管和 AI 编码工作流关系正在变化。",
        opportunity: "代码托管依赖与 Agent 工作流迁移报告：哪些工作还依赖 GitHub，哪些已迁到 IDE/Agent，本地与远端证据是否断裂。",
        read: "待观察。话题热，但商业切口应落到成本、权限和证据，而不是预测平台输赢。",
        status: "待观察",
        sourceRefs: [4],
      },
      {
        keyword: "新加坡 AI 智能体沙盒测试成果",
        signal: "AI HOT 全量池记录新加坡政府与 Google 公布 AI 智能体沙盒测试成果，强调受控测试、人工监督、网络安全和数据隐私。",
        opportunity: "Agent 部署前风险沙盒：为公共部门、金融和企业流程提供任务风险分级、人工监督点和上线前证据包。",
        read: "合并到安全响应和验证台。监管语言增强了付费理由，但销售周期更长。",
        status: "合并到安全/验证",
        sourceRefs: [6],
      },
      {
        keyword: "AI 应用伦理安全指南",
        signal: "AI HOT 全量池记录国家网络安全标准化技术委员会发布人工智能应用伦理安全指南，要求开发者和服务提供商把伦理安全融入流程。",
        opportunity: "AI 应用合规自查收据：把透明、人工干预、弱势群体保护、敏感信息最小化等要求转成上线前 checklist。",
        read: "待观察。适合行业版，但今天不如成本收据更容易短期验证。",
        status: "待观察",
        sourceRefs: [7],
      },
      {
        keyword: "Fastlane / AI Agent 一键营销",
        signal: "AI HOT 全量池记录 Fastlane 类工具用 Claude Code 接管社交账号部署、内容生成、定时发布和算法优化。",
        opportunity: "营销 Agent 发布审批与品牌风险回放：记录发了什么、改了什么、触达哪些账号和客户。",
        read: "待观察。流量强，但品牌风险和平台政策复杂；可作为垂直版执行收据。",
        status: "待观察",
        sourceRefs: [8],
      },
      {
        keyword: "BuilderPulse 项目所有权与导出收据",
        signal: "BuilderPulse 最新中文报告继续强调项目所有权、导出路径、取消订阅后工作成果是否可恢复，以及 Agent 工具留下的证据问题。",
        opportunity: "把成本、模型选择、导出、权限和执行日志合并成 owner-readable receipt，而不是只做技术日志。",
        read: "作为判断框架支撑。今天的成本收据也必须能让 founder/负责人读懂。",
        status: "支撑判断",
        sourceRefs: [10],
      },
    ],
    scoringDimensions: [
      { name: "需求强度", description: "用户今天是否已经在花时间、花钱或承担风险解决这个问题。" },
      { name: "场景具体度", description: "能否说清楚是谁、在什么工作流、遇到什么阻塞。" },
      { name: "替代方案缺口", description: "现有方案是否笨、慢、贵、不可信，或无法跨工具复查。" },
      { name: "解决方案清晰度", description: "能否在一周内做出很窄的 WebApp/报告/插件来验证。" },
      { name: "长期性", description: "需求是否会随着 Agent 和生成式工具普及而持续存在。" },
      { name: "供需失衡", description: "如果不是长期刚需，当前是否处在用户急需但供给不足的窗口。" },
      { name: "付费意愿", description: "目标客户是否有明确预算，愿意为省时间、降风险或增收入付费。" },
    ],
    opportunities: [
      opportunity(
        "Agent 成本与模型选择收据",
        "今日第一优先级",
        [97, 90, 92],
        "正在把 Codex、Claude、Gemini、Qwen、OpenAI credits 或本地模型接进产品和内部流程的创业团队，需要知道不同任务到底该用哪个模型、预计花多少钱、失败重试会不会爆账单、补贴结束后单元经济是否还成立。",
        "现在靠开发者手工看 provider dashboard、估 token、查 benchmark、在 Slack 里分享经验和事后看账单。替代方案能看到费用，但很少把任务质量、失败重试、人工接管和模型替代路线放在同一页。",
        "第一版做一份任务级报告：用户输入 5-10 个常见 Agent workflow，系统跑小样本或导入历史日志，输出模型路线、预算上限、预估月账单、超预算暂停建议和本地/低价替代方案。",
        "用“Gemini 3.5 Flash 成本上移后你的 Agent 任务贵了多少”“OpenAI credits burn-down calculator”这类免费报告获客；团队版按项目、provider、任务模板、告警和历史留存收费。",
        "云厂商会补账单报表，模型网关也会做 routing；独立产品必须聚焦 buyer-readable receipt，把质量、预算和人工边界一起交付，而不是只做 token dashboard。",
        "找 10 个正在用多模型或 API credits 的团队，手工导入一周任务样本，验证他们是否愿意为模型路线、成本上限和补贴 burn-down 报告付费。",
      ),
      opportunity(
        "AI Agent 安全事件响应收据",
        "安全触发强，适合应急包",
        [93, 86, 88],
        "使用 AI 编码工具、代码索引、内部仓库、MCP、浏览器自动化和云凭证的团队，在出现仓库泄露、异常访问、恶意工具调用或可疑自动化后，需要快速证明哪些仓库、凭证、索引、日志和外部连接可能受影响。",
        "现在靠安全团队手工翻审计日志、GitHub audit log、CI、secret scanner、聊天记录和 IDE/Agent 配置。问题是 AI 工具链留下的证据分散，事件后很难给负责人一份清晰范围说明。",
        "先做只读事件清单：连接 GitHub audit log、仓库配置、CI、secret scanner 输出和用户上传的 Agent 日志，生成影响范围、需要轮换的凭证、需要复核的索引/连接器和客户可读摘要。",
        "通过免费 AI coding security incident checklist、GitHub/Agent access receipt 模板获客；事件包按仓库/成员收费，团队版卖持续监控、策略模板和审计留存。",
        "安全市场竞争强，且单一事件真伪会变化；产品不能依赖耸动新闻，必须回到通用的 AI 工具链响应证据。",
        "找 5 个有 AI 编码助手和多仓库权限的小团队，手工复盘一次最近 30 天的高风险访问和工具调用，验证负责人是否愿意保存并复跑这份收据。",
      ),
      opportunity(
        "计算机使用 Agent 验证台",
        "技术趋势强，验证边界清楚",
        [90, 84, 89],
        "让 Agent 操作浏览器、桌面软件、安卓模拟器或企业后台的团队，需要知道任务是否真的完成、失败在哪一步、哪些状态可机器检查、哪些必须人工确认。",
        "现在靠录屏、Playwright/Appium 报告、CI 日志、人工验收和聊天记录。它们能用，但无法统一解释任务目标、软件状态、部分成功、人工接管和复现步骤。",
        "先从可验证软件任务报告切入：导入任务描述、轨迹、截图、状态断言和测试结果，输出完成度、失败原因、复现步骤和下一次任务的 guardrail 建议。",
        "从开源 GitHub Action、Playwright/Appium 插件和桌面 Agent benchmark 模板获客；团队版按任务数、测试环境、报告历史、私有规则和 reviewer 工作流收费。",
        "浏览器测试和 RPA 平台会吸收部分能力；独立产品必须跨 Agent 和跨测试框架，并把报告做成 reviewer/QA 能用的验收物。",
        "找 5 个已经让 Agent 操作 Web/安卓/桌面的团队，拿 20 条任务轨迹手工生成验证报告，验证是否减少人工复核时间并发现未覆盖状态。",
      ),
    ],
    rejected: [
      "Qwen3.7-Max 和 Gemini 3.5 Flash 本身很热，但直接做模型壳或 benchmark 站会被平台和社区快速淹没；更好的切口是把模型选择与预算责任做成团队收据。",
      "OpenAI for Singapore、AI 伦理安全指南和新加坡 Agent 沙盒有长期合规价值，但第一版销售周期偏长；可以作为安全/验证产品的企业版证据，不适合当天 winner。",
      "AI Studio 安卓开发、Fastlane 营销 Agent、Genie 街景世界和视频生成评测都有产品机会，但它们更像垂直应用场景，今天应并入“执行后如何验收、花多少钱、谁负责”的横向痛点。",
      "GitHub 平台地位变化话题流量高，但预测平台输赢不可收费；可收费的是团队自己的代码托管、索引、权限和 Agent 工作流证据是否断裂。",
    ],
    sources: [
      source("AI HOT 全量", "阿里千问最强智能体模型 Qwen3.7-Max 发布", "https://aihot.virxact.com/all?page=2"),
      source("AI HOT 全量", "Google Gemini 3.5 Flash 性能提升但成本显著增加", "https://aihot.virxact.com/all?page=2"),
      source("AI HOT 全量", "OpenAI 向 YC 当前批次创业公司提供大额 API 信用额度", "https://aihot.virxact.com/all?page=2"),
      source("AI HOT 全量", "GitHub 未授权访问调查与 AI 安全讨论", "https://aihot.virxact.com/all?page=2"),
      source("AI HOT 全量", "微软内部示警 GitHub 面临 AI 编程工具冲击", "https://aihot.virxact.com/all?page=2"),
      source("AI HOT 全量", "OpenComputer：为计算机使用智能体构建可验证软件世界", "https://aihot.virxact.com/all?page=2"),
      source("AI HOT 全量", "新加坡政府与 Google 公布 AI 智能体沙盒测试成果", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "国家网安标委发布人工智能应用伦理安全指南", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "AI Agent 一键接管全流程营销", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "AI Studio 集成 Google Docs/Sheets 与安卓开发能力", "https://aihot.virxact.com/all?page=2"),
      source("BuilderPulse", "BuilderPulse 2026-05-19 中文报告：Project Escape Receipt 与项目托管权", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-19.md"),
      source("官方或原始信号", "Qwen 官方站点与模型发布入口", "https://qwen.ai/"),
    ],
  },
  {
    date: "2026-05-20",
    title: "npm 攻击瞄准 Claude Code/Codex Hooks、Google 搜索继续 Agent 化：今天最值得做的是 AI 编码助手感染清理报告",
    summary:
      "今天的 AI 商业信号集中在供应链攻击、编码助手启动 hooks、Google 搜索入口变化、Agent 护栏、移动测试自动化和云产品 Agent 化。最值得做的不是再造一个扫描器，而是给使用 Claude Code、Codex、GitHub Actions、VS Code 和 npm 的团队一份 10 分钟能读完的感染清理报告：哪些 hooks、编辑器任务、CI workflow、npm token、云凭证和本地 secrets 可能被改过，下一步应该先查哪里。",
    tags: ["AI 安全", "供应链", "开发者工具"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 2026-05-20", "官方或原始信号"],
    scores: { commercial: 96, traffic: 88, wedge: 91 },
    winner: {
      name: "AI 编码助手 Hook 感染与凭证清理报告",
      short:
        "在 npm 包妥协或可疑依赖安装后，检查 Claude Code/Codex hooks、VS Code tasks、GitHub Actions、npm token、云凭证和本地 secrets，输出负责人能执行的清理顺序和证据报告。",
    },
    conclusion: [
      "当天最密集的关键词不是新模型，而是 npm compromise、assistant hooks、Claude Code、Codex、GitHub Actions、editor tasks、secrets、Google Search changes、Forge guardrails、Drizz mobile testing、Voker analytics 和 Agent 化云服务。它们背后的共同问题是：AI 工具已经进入开发者最信任的自动执行路径，出事后团队需要快速知道哪里被改、哪里会继续运行、哪些凭证要撤销。",
      "逐项判断以后，最有商业价值的机会是 AI 编码助手 Hook 感染与凭证清理报告。它有明确触发事件、明确买方和明确交付物：一次依赖污染、一次奇怪的 editor task、一次 GitHub workflow 改动，就足以让小团队愿意为一份清理报告付费。",
      "Top 3 推荐分别是：AI 编码助手 Hook 感染与凭证清理报告、AI 搜索入口可见性监控、Agent 行动护栏与测试证据台。第一名胜出原因是需求最急、替代方案最笨、验证路径最短，而且 BuilderPulse 与 AI HOT 全量信号都指向同一个开发者安全痛点。",
    ],
    signalPool: [
      {
        keyword: "Mini Shai-Hulud / npm 供应链攻击",
        signal: "BuilderPulse 2026-05-20 记录 Mini Shai-Hulud 攻击：一个被攻破的 npm 账号短时间内跨数百个包发布恶意版本。",
        opportunity: "依赖妥协后的 10 分钟清理报告：查 hooks、workflow、tokens、secrets 和本地持久化点。",
        read: "进入 Top 3。触发事件强、买方清楚、报告价值明确。",
        status: "进入 Top 3",
        sourceRefs: [0, 1],
      },
      {
        keyword: "Claude Code / Codex startup hooks",
        signal: "攻击开始瞄准开发者最信任的 AI 编码助手启动路径，包括 assistant hooks、编辑器任务和 GitHub Actions。",
        opportunity: "AI 编码助手 Hook 感染检查：扫描启动脚本、自动任务、命令别名、CI 改动和凭证外传线索。",
        read: "今日 winner。它把抽象供应链安全变成具体工作站和仓库清单。",
        status: "进入 Top 3",
        sourceRefs: [0, 1],
      },
      {
        keyword: "Google Search box / AI 搜索入口变化",
        signal: "Google 搜索框和 AI 搜索产品变化引发大量讨论，AI Mode 与生成式答案继续改变流量入口。",
        opportunity: "AI 搜索入口可见性监控：监控品牌、产品页、文档和本地服务在 AI 搜索里的引用、摘要和竞品替代。",
        read: "进入 Top 3。流量和获客买方明确，但要做成可行动监控而非泛 SEO。",
        status: "进入 Top 3",
        sourceRefs: [2],
      },
      {
        keyword: "Gemini 3.5 Flash / agentic workflows",
        signal: "Google 将 Gemini 3.5 Flash 包装为更适合复杂 Agent 工作流的高效模型。",
        opportunity: "Agent 成本与执行结果监控：速度、成本、失败重试、人工接管和任务完成质量报告。",
        read: "合并到 Agent 护栏与测试证据台。模型变强会放大执行证明需求。",
        status: "合并到护栏测试",
        sourceRefs: [3],
      },
      {
        keyword: "Forge guardrails 让小模型任务准确率提升",
        signal: "BuilderPulse 记录 Forge 通过 guardrails、状态机和工具响应约束提升 agentic task 表现。",
        opportunity: "Agent 行动护栏与测试证据台：记录 guardrail、失败原因、重试、人工审查边界和最终证据。",
        read: "进入 Top 3。买方不是要更聪明模型，而是要可控任务执行。",
        status: "进入 Top 3",
        sourceRefs: [4, 1],
      },
      {
        keyword: "Drizz / AI 移动测试自动写、运行、修复",
        signal: "Product Hunt 上 Drizz 强调移动测试会自己写、运行和修复。",
        opportunity: "AI 测试行动回放：记录测试生成、执行、失败、修复和人工确认，让 QA/工程负责人能验收。",
        read: "合并到 Agent 护栏与测试证据台，适合从移动测试垂直切入。",
        status: "合并到护栏测试",
        sourceRefs: [5],
      },
      {
        keyword: "Voker AI 产品行为分析",
        signal: "Voker 面向 AI 产品团队提供 analytics，说明 Agent 行为也需要产品级可观测性。",
        opportunity: "AI 产品行动分析：把 Agent 工具调用、用户转人工、失败循环和高风险动作做成漏斗。",
        read: "有长期性，但今天作为第三名的支撑证据，不单独胜出。",
        status: "合并到护栏测试",
        sourceRefs: [6],
      },
      {
        keyword: "Gemini CLI 迁移 / 工具降级",
        signal: "BuilderPulse 提到 Gemini CLI 将被替换，用户需要迁移旧命令和脚本。",
        opportunity: "开发者工具迁移清单：发现旧 CLI、自动脚本、CI 使用点和迁移风险。",
        read: "与昨日导出/迁移主题相近，今天作为搜索入口与工具迁移的辅助信号。",
        status: "待观察",
        sourceRefs: [1],
      },
      {
        keyword: "Railway / Google Cloud 访问受阻",
        signal: "BuilderPulse 将 Railway 访问阻断归入平台依赖风险。",
        opportunity: "云平台封禁/申诉恢复地图：备份凭证、工作负载、申诉证据和迁移路径。",
        read: "需求真实，但更偏基础设施灾备；不如 hooks 清理报告验证快。",
        status: "淘汰",
        sourceRefs: [1],
      },
      {
        keyword: "阿里云千问云 / 云产品 Agent 化",
        signal: "AI HOT 全量池记录阿里云把云服务产品接入 Agent 能力，云产品全面 Agent 化。",
        opportunity: "云 Agent 动作审批和成本报告：哪些云资源由 Agent 创建、修改、删除，花费多少。",
        read: "长期价值高，但今天太平台级，先并入 Agent 权限和行动证据方向。",
        status: "待观察",
        sourceRefs: [7],
      },
      {
        keyword: "PaddleOCR 3.5 支持 Hugging Face",
        signal: "PaddleOCR 进入 Transformers/Hugging Face 生态，文档 AI 集成门槛下降。",
        opportunity: "企业文档摄取质量报告：OCR、表格、票据和 RAG 入库前的错误率、字段缺失和人工复核。",
        read: "商业机会存在，但今天不如供应链安全紧急。",
        status: "待观察",
        sourceRefs: [8],
      },
      {
        keyword: "AI Agent 一键接管全流程营销",
        signal: "Fastlane 类工具展示从建号、内容、定时发布到优化的营销 Agent 闭环。",
        opportunity: "营销 Agent 发布审批与品牌风险回放：记录发了什么、改了什么、触达哪些账号和客户。",
        read: "流量强，但获客/合规边界复杂；可作为后续垂直营销治理机会。",
        status: "待观察",
        sourceRefs: [9],
      },
    ],
    scoringDimensions: [
      { name: "需求强度", description: "用户今天是否已经在花时间、花钱或承担风险解决这个问题。" },
      { name: "场景具体度", description: "能否说清楚是谁、在什么工作流、遇到什么阻塞。" },
      { name: "替代方案缺口", description: "现有方案是否笨、慢、贵、不可信，或无法跨工具复查。" },
      { name: "解决方案清晰度", description: "能否在一周内做出很窄的 WebApp/报告/插件来验证。" },
      { name: "长期性", description: "需求是否会随着 Agent 和生成式工具普及而持续存在。" },
      { name: "供需失衡", description: "如果不是长期刚需，当前是否处在用户急需但供给不足的窗口。" },
      { name: "付费意愿", description: "目标客户是否有明确预算，愿意为省时间、降风险或增收入付费。" },
    ],
    opportunities: [
      opportunity(
        "AI 编码助手 Hook 感染与凭证清理报告",
        "今日第一优先级",
        [96, 88, 91],
        "使用 npm、Claude Code、Codex、VS Code 和 GitHub Actions 的小型 SaaS 团队，在依赖被投毒或出现异常行为后，需要快速知道哪些 AI 助手启动路径、编辑器任务、CI workflow、npm token、云凭证和本地 secrets 可能被改过。",
        "现在靠安全同事手工 grep package-lock、翻 GitHub workflow diff、查本机 shell 配置、看 VS Code tasks、轮换 token 和在群里问谁装过依赖。问题是清理顺序混乱，容易漏掉 assistant hooks 这类新攻击面。",
        "第一版只做本地/仓库只读扫描：检查 Claude Code/Codex hooks、VS Code tasks、GitHub Actions、npmrc、package scripts、可疑 postinstall、环境变量和常见 secret 文件，输出一份清理顺序、证据位置和复检命令。",
        "用免费“AI coding assistant infection check”CLI 和 npm compromise checklist 获客；团队版按仓库、成员、工作站报告、私有策略、Slack 告警、审计留存和应急包收费。",
        "传统 SCA/secret scanner 会覆盖一部分，但 assistant hooks、编辑器任务和 AI 工具启动路径是新表面。风险是安全产品竞争强，必须把定位压到 AI 编码助手感染后清理，而不是泛供应链扫描。",
        "找 10 个使用 Claude Code/Codex 的 JS/TS 团队，手工跑一次 hooks/workflow/token 清单，验证是否能发现至少一个他们愿意立即删除、轮换或加入监控的项目。",
      ),
      opportunity(
        "AI 搜索入口可见性监控",
        "流量强，增长团队会关心",
        [89, 92, 82],
        "Google 搜索正在把更多答案、mini app、AI Mode 和生成式 dashboard 放到搜索入口里；品牌、SaaS、文档站和本地服务团队需要知道自己的页面是否被引用、是否被错误摘要、是否被竞品替代。",
        "现在靠手工搜索、Search Console、SEO 工具和截图。传统 SEO 能看排名和点击，但很难持续记录 AI 答案里的引用、摘要语气、竞品替代和可行动修复。",
        "先做 20 个关键查询的每日 AI 搜索快照：记录答案摘要、引用 URL、竞品出现、品牌缺失、错误陈述和建议改写的页面片段。",
        "通过“AI Mode 品牌可见性检查”“Google AI 搜索引用监控”等免费报告获客；团队版按查询数、品牌数、竞品数、历史留存、告警和修复建议收费。",
        "Google 与主流 SEO 平台会补类似能力；独立产品必须更快、更垂直，面向文档站、本地服务、SaaS landing page 等具体买方。",
        "找 20 个有明确 SEO 获客的 SaaS/本地服务，手工监控 20 个查询 3 天，验证是否能发现错误摘要、缺失引用或竞品替代，并让用户愿意每周收报告。",
      ),
      opportunity(
        "Agent 行动护栏与测试证据台",
        "开发者工具方向，适合团队预算",
        [90, 84, 86],
        "Forge、Drizz、Voker、Haystack 等信号说明 AI 工作正在从生成进入行动、测试、修复和分析。工程团队需要知道 Agent 为什么成功、哪里失败、哪些步骤被 guardrail 拦住、什么时候需要人审。",
        "现在靠工具自带日志、CI 输出、测试报告和聊天记录。问题是执行轨迹和人工边界分散，管理者看不到一个任务从生成到测试再到修复的完整证据。",
        "先做一个 Agent task receipt：接入测试/CI/日志，记录步骤、工具调用、失败、重试、guardrail 命中、人工接管和最终产物，用一页报告给 reviewer/QA 看。",
        "从开源 GitHub Action 和移动测试/PR review 模板获客；团队版按仓库、任务数、CI 集成、报告历史、策略模板和 reviewer workflow 收费。",
        "IDE、CI 和测试平台会内置更多 AI 记录；独立产品必须跨工具，并把任务证据做成负责人可读，而不只是日志聚合。",
        "找 5 个已经用 AI 生成测试或修 PR 的团队，抽 20 个任务手工生成行动收据，验证是否能减少 QA/reviewer 复盘时间。",
      ),
    ],
    rejected: [
      "Qwen3.7-Max、Gemini 3.5、Seedance 2.0、Rodin Gen-2.5 都有技术热度，但直接做模型壳或素材生成会撞大平台；今天更好的切口是围绕这些工具的成本、证据和工作流治理。",
      "阿里云千问云和云产品 Agent 化长期重要，但独立 WebApp 第一版不应正面做云 Agent 平台；更窄的是权限、动作和账单收据。",
      "PaddleOCR 与文档 AI 集成降低门槛，能做文档摄取质量报告，但今天缺少比供应链感染清理更急的付费触发。",
      "医疗循证 Agent、机器人训练数据、AI 面试作弊都有机会，但行业门槛、数据获取和销售周期更重，不适合作为当天最快验证的商业 WebApp。",
    ],
    sources: [
      source("官方或原始信号", "SafeDep：Mini Shai-Hulud 再次攻击，数百个 npm 包被投毒", "https://safedep.io/mini-shai-hulud-strikes-again-314-npm-packages-compromised/"),
      source("BuilderPulse", "BuilderPulse 2026-05-20 中文报告：Agent Hook Infection Check", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-20.md"),
      source("官方或原始信号", "Google：Search I/O 2026，搜索入口与 AI Mode 更新", "https://blog.google/products-and-platforms/products/search/search-io-2026/"),
      source("官方或原始信号", "Google：Gemini 3.5 模型系列与 Flash 更新", "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/"),
      source("官方或原始信号", "Forge：面向 Agent 任务的 guardrails 与执行框架", "https://github.com/antoinezambelli/forge"),
      source("官方或原始信号", "Drizz：AI 移动测试自动写、运行和修复", "https://www.producthunt.com/products/drizz-2"),
      source("官方或原始信号", "Voker：面向 AI 产品团队的 analytics", "https://www.producthunt.com/products/voker"),
      source("AI HOT 全量", "阿里云推千问云，云产品全线 Agent 化", "https://x.com/frxiaobei/status/2057088082697232661"),
      source("AI HOT 全量", "PaddleOCR 3.5 支持 Hugging Face 生态", "https://x.com/berryxia/status/2057088151051817074"),
      source("AI HOT 全量", "AI Agent 一键接管全流程营销", "https://x.com/berryxia/status/2057080995539796223"),
      source("AI HOT 全量", "AI 生成 3D 资产模型 Rodin Gen-2.5 发布", "https://x.com/vista8/status/2057093608747229556"),
      source("AI HOT 全量", "Meta 启动大规模裁员并调配至 AI 新业务", "https://www.ithome.com/0/953/074.htm"),
    ],
  },
  {
    date: "2026-05-19",
    title: "Google 把搜索变成 Agent、Claude 收紧执行边界、Grok 能力包生成文件：今天最值得做的是项目导出与取消订阅收据",
    summary:
      "今天的 AI 信号不再只是模型发布，而是 AI 正在生成、托管并执行更多真实工作：Google Search 可以生成 mini app 和后台信息 Agent，Claude Managed Agents 开始强调自托管沙箱与 MCP 隧道，Grok 文档能力进入文档、PPT、表格和 PDF 工作流。最值得验证的 WebApp 不是再做一个助手，而是给 founder、agency 和产品团队一张收据：哪些项目、笔记、设计稿、聊天记录和自动化结果能导出，取消订阅后还剩什么，迁移前应先救哪一部分。",
    tags: ["数据所有权", "Agent 治理", "AI 搜索"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 2026-05-19", "官方或原始信号"],
    scores: { commercial: 95, traffic: 86, wedge: 89 },
    winner: {
      name: "项目导出与取消订阅收据",
      short:
        "连接 Notion/Obsidian/Claude Design/Grok 项目空间/Google Workspace 等项目空间，检查导出路径、文件格式、依赖、权限和订阅变化后的可恢复性，生成负责人能读的一页迁移收据。",
    },
    conclusion: [
      "当天最有商业味的关键词是 export、self-hosted、Claude Design、Grok 项目空间、Google Search agents、Managed Agents sandbox、MCP tunnel、agentic web tools、AI Mode 和 project custody。它们背后的共同需求，是 AI 工具正在替用户生产越来越多可交付资产，而用户开始担心这些资产是否真的归自己所有。",
      "逐项判断以后，最窄的 winner 是项目导出与取消订阅收据。它不是做另一个笔记或设计工具，而是在用户退订、迁移、交接客户项目或整理 AI 产出之前，回答“什么能带走、什么会坏、什么需要先备份、谁应该负责”。这个问题有明确买方、明确触发时刻，也比泛 Agent 平台更容易用一份报告验证付费。",
      "Top 3 推荐分别是：项目导出与取消订阅收据、Agent 权限边界与内网连接审计台、AI 搜索入口迁移监控。第一名胜出原因是场景最贴近个人和小团队的钱包，MVP 可以从导出测试和一页报告做起，不需要先接管用户的完整工作流。",
    ],
    signalPool: [
      {
        keyword: "Files.md / 本地 Markdown 所有权",
        signal: "BuilderPulse 2026-05-19 把 Files.md、Obsidian self-hosted 和 Claude Design 访问投诉合并为项目托管权问题。",
        opportunity: "项目导出与取消订阅审计：检查笔记、设计稿、聊天记录、知识库和客户文件是否能离开当前产品。",
        read: "高商业价值。买方不是抽象隐私爱好者，而是手里有客户交付和历史资料的 founder、agency owner、product lead。",
        status: "进入 Top 3",
        sourceRefs: [7, 8],
      },
      {
        keyword: "Claude Design 访问投诉",
        signal: "BuilderPulse 指出取消订阅后能否拿回工作成果已经成为用户投诉点。",
        opportunity: "在退订或换工具前生成资产恢复清单，提示哪些聊天、设计、代码和附件需要先导出。",
        read: "强触发事件。用户平时不会付费管理导出路径，但退订、涨价、客户交接和团队离职会立刻制造需求。",
        status: "进入 Top 3",
        sourceRefs: [7],
      },
      {
        keyword: "Grok 文档能力生成文档/PPT/表格/PDF",
        signal: "xAI 推出面向文档的 Grok 能力，可生成和编辑 Word、PPT、Excel、PDF，并记住长期偏好和工作流。",
        opportunity: "AI 产出资产台账：记录哪个能力包生成了哪些文件、依赖哪些格式和模板、能否批量导出与复原。",
        read: "合并到 winner。AI 文件生成越普及，资产出口和版本留存越像刚需。",
        status: "合并到导出收据",
        sourceRefs: [3],
      },
      {
        keyword: "Google Search agents / mini apps",
        signal: "Google 宣布 Search 进入 AI Search 新阶段，信息 Agent 可后台监控，Search 还可按问题生成 mini apps 和自定义 dashboard。",
        opportunity: "AI 搜索入口迁移监控：监控品牌、产品和知识页在 AI Mode、AI Overview、生成式 UI 里的呈现和引用。",
        read: "进入 Top 3。搜索入口变化会影响流量、线索和本地服务转化，买方清楚。",
        status: "进入 Top 3",
        sourceRefs: [4],
      },
      {
        keyword: "AI Mode 月活 10 亿 / 查询翻倍",
        signal: "Google 表示 AI Mode 已超过 10 亿月活，查询量按季度翻倍。",
        opportunity: "面向 SEO、内容团队和本地商家的 AI 答案快照、引用缺口、竞品答案监控。",
        read: "流量强，但要避免做泛 SEO 工具；最窄切口是“我的页面在 AI 搜索答案里是否被正确引用”。",
        status: "进入 Top 3",
        sourceRefs: [4],
      },
      {
        keyword: "Claude Managed Agents 自托管沙箱",
        signal: "Claude Managed Agents 新增自托管沙箱，让 Agent 在企业控制的执行环境中运行。",
        opportunity: "Agent 权限边界与执行环境审计：哪些工具、文件、域名、MCP server 和私有 API 被允许触达。",
        read: "进入 Top 3。企业采用 Agent 的阻塞点正在从模型能力转向边界、权限和可观测性。",
        status: "进入 Top 3",
        sourceRefs: [0, 1],
      },
      {
        keyword: "MCP 隧道连接私有服务",
        signal: "Claude Managed Agents 的 MCP tunnels 让 Agent 可连接企业边界内的私有 MCP 服务。",
        opportunity: "内网 Agent 连接清单、凭据风险评分、服务暴露面报告和审批工作流。",
        read: "合并到 Agent 边界审计。买方是已经在试点企业 Agent 的平台/安全/工程团队。",
        status: "进入 Top 3",
        sourceRefs: [0],
      },
      {
        keyword: "OpenRouter agentic web tools",
        signal: "OpenRouter 将 Web Search 与 Web Fetch 做成模型可自主调用的工具，模型自行决定何时搜索和读取页面。",
        opportunity: "Agent Web 行为日志：记录模型何时搜索、访问哪些页面、引用了什么、花费多少、是否触达敏感站点。",
        read: "合并到 Agent 边界审计。自主搜索越方便，团队越需要可复查的行动记录。",
        status: "合并到 Agent 审计",
        sourceRefs: [2],
      },
      {
        keyword: "Membrane 单能力包连接 10 万 API",
        signal: "BuilderPulse 记录 Membrane 把大量 API 集成压成一个 Agent 可调用能力。",
        opportunity: "Agent API 采用证明：批准了哪些 API、每个 API 能做什么、谁能调用、调用结果如何留痕。",
        read: "有长期性，但今天不单独做平台；并入权限边界审计更清楚。",
        status: "合并到 Agent 审计",
        sourceRefs: [7],
      },
      {
        keyword: "OpenClaw 30 天 API 费用 130 万美元",
        signal: "AI 开发实验出现极高 API 消耗，说明自主任务和大规模代码审核会快速放大成本。",
        opportunity: "Agent 成本上限、任务预算收据、异常停止策略。",
        read: "需求真实，但近期已有成本/账单方向覆盖；今天不作为主推荐。",
        status: "淘汰",
        sourceRefs: [6],
      },
      {
        keyword: "Karpathy 加入 Anthropic",
        signal: "AI HOT 全量流中 Anthropic 人才流动成为高热新闻。",
        opportunity: "模型公司人才流向雷达、研发节奏情报。",
        read: "流量高但产品化弱，容易停留在资讯订阅；不进入 Top 3。",
        status: "淘汰",
        sourceRefs: [9],
      },
      {
        keyword: "solo SOC2 证明材料",
        signal: "BuilderPulse 记录 solo founder 做 SOC2 Type 2 的讨论，突出小团队无法诚实满足部分企业采购材料。",
        opportunity: "solo founder security packet：把能证明和不能证明的控制项整理成销售材料。",
        read: "付费可能存在，但偏合规服务，和今天 AI WebApp 主线相比不够聚焦。",
        status: "待观察",
        sourceRefs: [7],
      },
    ],
    scoringDimensions: [
      { name: "需求强度", description: "用户今天是否已经在花时间、花钱或承担风险解决这个问题。" },
      { name: "场景具体度", description: "能否说清楚是谁、在什么工作流、遇到什么阻塞。" },
      { name: "替代方案缺口", description: "现有方案是否笨、慢、贵、不可信，或无法跨工具复查。" },
      { name: "解决方案清晰度", description: "能否在一周内做出很窄的 WebApp/报告/插件来验证。" },
      { name: "长期性", description: "需求是否会随着 Agent 和生成式工具普及而持续存在。" },
      { name: "供需失衡", description: "如果不是长期刚需，当前是否处在用户急需但供给不足的窗口。" },
      { name: "付费意愿", description: "目标客户是否有明确预算，愿意为省时间、降风险或增收入付费。" },
    ],
    opportunities: [
      opportunity(
        "项目导出与取消订阅收据",
        "今日第一优先级",
        [95, 86, 89],
        "AI 工具正在生成项目稿、设计稿、文档、知识库、聊天历史和自动化结果；真实需求是 founder、agency 和产品团队在退订、迁移、交接客户项目或换工具前，知道这些资产能否导出、导出后能否打开、哪些依赖会失效。",
        "现在靠用户自己找导出按钮、下载 account data、手工检查 Markdown/HTML/PDF/JSON、截图保存关键聊天。团队确实在做，但很笨：不同工具格式不同，附件和权限容易漏，取消订阅后的恢复行为不透明。",
        "第一版只做连接/上传导出包后的“资产可带走检查”：列出项目、文件、聊天、附件、模板、外链、权限和格式风险，生成一页 HTML/PDF 收据和迁移优先级。",
        "用“Claude Design 退订前清单”“Obsidian/Notion 导出体检”“AI 项目交接收据”等模板获客；个人版按项目数收费，agency/team 版按客户空间、自动复检、白标报告和团队权限收费。",
        "平台会改善导出功能，但跨工具、跨订阅、跨客户交付的可恢复性不会由单个平台完整解决。风险是用户只在迁移时想起它，因此要把产品做成定期资产体检和客户交接流程。",
        "找 10 个有真实 AI 项目资产的 founder/agency，手工检查他们的 Notion/Obsidian/Claude/Grok/Drive 导出包，验证是否能发现 3 个以上他们愿意修复或备份的问题。",
      ),
      opportunity(
        "Agent 权限边界与内网连接审计台",
        "企业采用前的第二优先级",
        [93, 82, 86],
        "Claude Managed Agents、MCP tunnels、OpenRouter agentic web tools 和通用 API 能力都在让 Agent 更容易触达代码、网页、私有服务和内部 API；团队需求是知道每个 Agent 能碰什么、实际碰了什么、是否越界、如何审批。",
        "现在靠平台配置页、MCP server 清单、零散日志、云权限和开发者口头说明。安全和平台团队很难把它整理成负责人能批准的边界报告。",
        "先做导入配置和日志的审计台：读取 MCP 配置、Agent 工具列表、域名、凭据范围、调用历史和沙箱环境，输出风险分级、批准清单和整改建议。",
        "从开源 MCP/Agent 配置审查器获客；团队版卖私有项目、历史留存、审批流、策略模板、GitHub/Cloudflare/Claude/OpenRouter 集成和审计导出。",
        "平台会提供部分可观测性，但企业通常会同时使用多个 Agent、多个工具和多个私有服务。独立机会在跨平台边界报告，而不是替代执行平台。",
        "找 5 个正在试点 Agent/MCP 的团队，手工把他们的工具配置和最近 20 次调用整理成报告，看安全负责人是否愿意按报告调整权限或批准试点。",
      ),
      opportunity(
        "AI 搜索入口迁移监控",
        "流量强，适合 SEO/增长团队",
        [88, 92, 80],
        "Google Search 正在变成 AI Mode、Search agents、生成式 UI 和可持续 mini apps；网站、品牌、本地服务和电商团队需要知道自己的内容在 AI 搜索答案里是否被引用、是否被竞品替代、是否出现错误解释。",
        "现在靠手工搜关键词、看 Search Console、做传统 SEO 和偶尔截图 AI Overview。问题是 AI 答案是动态的、上下文相关的，团队很难持续知道自己在新入口里的可见性。",
        "先做一组关键词和场景的 AI 搜索快照：定期记录答案、引用源、竞品出现频率、行动入口、错误描述和内容缺口，输出每周报告。",
        "通过“AI Mode 可见性体检”“本地服务 AI 搜索监控”“AI Overview 引用缺口报告”获客；按关键词、地区、竞品数量、报告频率和团队席位收费。",
        "搜索平台会提供站长指导，但不会替商家持续监控竞品和答案偏差。风险是规则变化快，产品要卖监控和行动建议，不卖固定技巧。",
        "找 10 个依赖搜索流量的小网站/本地服务/工具站，手工跑 30 个高意图问题，看报告是否能指出一个可修改页面、结构化数据或内容缺口。",
      ),
    ],
    rejected: [
      "Karpathy 加入 Anthropic 是高热度行业新闻，但更像人才与模型节奏信号，难以直接拆出一周内可验证的商业 WebApp。",
      "Grok 文档能力本身很强，但直接做平台会正面撞 xAI 和大模型应用；更好的切口是围绕它产生的文件和工作流做资产出口收据。",
      "OpenClaw API 消耗和 Agent 成本上限值得继续关注，但成本 guard 在前几期已经覆盖过，今天更新的边缘是资产所有权与 Agent 权限边界。",
      "solo SOC2 证明材料有付费可能，但偏服务和合规文书；如果做产品，应并入 founder security packet，而不是今天的主推荐。",
    ],
    sources: [
      source("AI HOT 全量", "Anthropic：Claude Managed Agents 新增自托管沙箱与 MCP 隧道", "https://claude.com/blog/claude-managed-agents-updates"),
      source("AI HOT 全量", "Cloudflare：Claude Managed Agents on Cloudflare", "https://blog.cloudflare.com/claude-managed-agents/"),
      source("AI HOT 全量", "OpenRouter：Consistent Web Search and Fetch Across Every Model", "https://openrouter.ai/announcements/agentic-web-tools"),
      source("AI HOT 全量", "xAI：Grok 文档能力支持文档、演示文稿、表格和 PDF", "https://x.ai/news"),
      source("AI HOT 全量", "Google：A new era for AI Search", "https://blog.google/products-and-platforms/products/search/search-io-2026/"),
      source("AI HOT 全量", "AI HOT：Google Workspace、Gemini Spark、Search Agents 等 5 月 19 日信号", "https://aihot.virxact.com/all"),
      source("AI HOT 全量", "AI HOT：OpenClaw 30 天 API 费用与 Agent 成本信号", "https://aihot.virxact.com/all?page=4"),
      source("BuilderPulse", "BuilderPulse 2026-05-19 中文报告：Project Escape Receipt 与项目托管权", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-19.md"),
      source("原始信号", "Files.md：open-source alternative to Obsidian", "https://github.com/zakirullin/files.md"),
      source("AI HOT 全量", "AI HOT：Andrej Karpathy 加入 Anthropic 相关讨论", "https://aihot.virxact.com/all?page=2"),
    ],
  },
  {
    date: "2026-05-18",
    title: "Agent 搜索、AI 设计稿与 Grok 图像爆量：今天最值得做的是智能体代码搜索收据",
    summary:
      "今天的 AI 商业信号集中在 Agent 代码搜索、跨 Agent 协作、AI 设计稿到代码、生成媒体爆量、重复 bug 报告和 GPU 供给压力。最值得做的不是再造一个 Agent，而是把 Agent 搜索和生成式工作流变成可复查的证据：它找到了什么、漏了什么、花了多少 token、是否触碰敏感文件，负责人能不能据此决定是否信任结果。",
    tags: ["Agent 治理", "代码搜索", "开发者工具"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 2026-05-18"],
    scores: { commercial: 96, traffic: 88, wedge: 90 },
    winner: {
      name: "智能体代码搜索收据",
      short:
        "接在 Codex、Claude Code、Hermes、OpenClaw 或自研 Agent 的代码搜索步骤后，输出命中证据、遗漏风险、token 成本、敏感文件触达和可复跑查询包。",
    },
    conclusion: [
      "当天最密集的关键词不是“新模型”，而是 Agent 搜索、Agent 协作、AI 设计稿、AI 生成媒体、重复 bug 报告、GPU 供给、模型路由和行为追溯。这些词背后的共同需求，是团队开始需要证明 AI 产出链路是否可信。",
      "逐项判断以后，最有商业味的机会不是“做一个更酷的 Agent”，而是帮团队回答一个非常朴素的问题：AI 刚才找了什么、改了什么、漏了什么、花了多少钱、能不能把证据交给负责人看。这个需求比单个工具新闻更长期，因为 Agent 越能干活，组织越需要收据。",
      "Top 3 推荐分别是：智能体代码搜索收据、AI 设计稿到代码交付质检台、AI 生成媒体发布前风险收据。第一名胜出原因是买方最清楚、场景最窄、替代方案最笨、付费主体更像团队预算，而不是个人好奇心。",
    ],
    signalPool: [
      {
        keyword: "Agent 代码搜索 / Semble",
        signal: "Semble 强调面向 Agent 的代码搜索，并把 token 节省作为核心价值。",
        opportunity: "为代码 Agent 的搜索过程生成可复查收据：查询、命中、遗漏、敏感路径、token 成本和复跑命令。",
        read: "高商业价值。真实场景发生在 PR 修改、重构、bug 修复和安全排查里，买方是工程团队。",
        status: "进入 Top 3",
        sourceRefs: [0],
      },
      {
        keyword: "BuilderPulse 智能体搜索收据",
        signal: "BuilderPulse 2026-05-18 把 Semble 相关讨论归纳为 coding-agent search receipt。",
        opportunity: "把“搜索是否可信”产品化为团队报告，而不是只做搜索引擎。",
        read: "强化了买方语言：收据、证据、复查，比“更快搜索”更容易卖给负责人。",
        status: "进入 Top 3",
        sourceRefs: [1],
      },
      {
        keyword: "飞书机器人互相 @ / Agent 协作",
        signal: "飞书机器人可互相 @，跨 OpenClaw 和 Hermes 讨论任务。",
        opportunity: "Agent 群聊工作流、会议纪要、任务分派、跨 Agent 冲突调解。",
        read: "有流量，但需求容易被协作平台内置；更适合作为 Agent 行动留痕和审批的信号。",
        status: "待观察",
        sourceRefs: [2],
      },
      {
        keyword: "Hermes 多模型配置",
        signal: "Agent 用户开始把多个模型、工具和订阅配置在同一工作流里。",
        opportunity: "模型路由成本账本、Agent 配置审计、连接器权限体检。",
        read: "长期存在，但与 5 月 16 日连接器成本报告重合；今天不单独推荐。",
        status: "合并到治理类",
        sourceRefs: [2],
      },
      {
        keyword: "Ardot 文生 UI / 图片转设计稿",
        signal: "腾讯 Ardot 公测，强调文生 UI、图片转设计稿、权限中心和行为追溯。",
        opportunity: "AI 设计稿到代码交付质检：组件库匹配、设计 token 偏差、响应式和无障碍审查。",
        read: "产设研团队场景清楚，替代方案目前是人工验收和设计走查，进入 Top 3。",
        status: "进入 Top 3",
        sourceRefs: [3, 8],
      },
      {
        keyword: "Kimi 网站设计教程 / AI 生成页面",
        signal: "AI 直接生成网站、落地页和界面方案的教程扩散。",
        opportunity: "生成页面质量审查、SEO/可访问性/转化率验收、品牌一致性检测。",
        read: "需求会长期存在，但单独做“再生成一次”价值低；应绑定交付验收。",
        status: "合并到设计质检",
        sourceRefs: [3, 8],
      },
      {
        keyword: "Grok Imagine 开放",
        signal: "Grok Imagine 向 X Premium+ 开放，生成媒体进入更大规模消费分发。",
        opportunity: "AI 生成媒体发布前风险收据：标注建议、平台规则、素材来源和投诉风险。",
        read: "流量极强，但消费端付费弱；要卖给品牌、MCN、小团队和平台运营。",
        status: "进入 Top 3",
        sourceRefs: [4],
      },
      {
        keyword: "Grok Imagine 1.5 亿网页访问量",
        signal: "网页端访问量被称突破 1.5 亿次。",
        opportunity: "生成媒体资产管理、爆款素材复盘、品牌安全审查。",
        read: "证明需求热度，但不等于直接做生成工具；平台级竞争太强。",
        status: "进入 Top 3",
        sourceRefs: [5],
      },
      {
        keyword: "AI 伪造张家界玻璃桥视频",
        signal: "AI 伪造景区视频引发执法处理。",
        opportunity: "面向景区、媒体号、品牌方的发布前真实性和免责声明工作流。",
        read: "短期供需失衡明显，长期会变成内容合规基础设施。",
        status: "进入 Top 3",
        sourceRefs: [4, 5],
      },
      {
        keyword: "Linus 批评 AI 重复 Bug 报告",
        signal: "AI 生成大量重复或低质量 bug 报告，增加维护者负担。",
        opportunity: "开源项目 AI issue 去重、复现证据、报告质量评分。",
        read: "需求真实但买方付费弱，除非卖给大型开源基金会、企业开源办公室或安全团队。",
        status: "待观察",
        sourceRefs: [6],
      },
      {
        keyword: "GPU 短缺 / H100 供给",
        signal: "GPU 供应压力继续成为大模型训练和推理瓶颈。",
        opportunity: "GPU 资源采购雷达、推理成本预测、排队/预留容量市场。",
        read: "商业价值高但更偏基础设施和采购，独立 WebApp 起步门槛高。",
        status: "淘汰",
        sourceRefs: [7],
      },
      {
        keyword: "AI 工具行为追溯",
        signal: "Ardot 等工具开始显式提到权限中心和行为追溯。",
        opportunity: "跨 AI 工具行为审计、团队级操作留痕、交付证据包。",
        read: "这是长期底层需求，可作为代码搜索收据和设计质检的共同能力。",
        status: "合并到证据层",
        sourceRefs: [3, 8],
      },
    ],
    scoringDimensions: [
      { name: "需求强度", description: "用户今天是否已经在花时间、花钱或承担风险解决这个问题。" },
      { name: "场景具体度", description: "能否说清楚是谁、在什么工作流、遇到什么阻塞。" },
      { name: "替代方案缺口", description: "现有方案是否笨、慢、贵、不可信，或无法跨工具复查。" },
      { name: "解决方案清晰度", description: "能否在一周内做出很窄的 WebApp/报告/插件来验证。" },
      { name: "长期性", description: "需求是否会随着 Agent 和生成式工具普及而持续存在。" },
      { name: "供需失衡", description: "如果不是长期刚需，当前是否处在用户急需但供给不足的窗口。" },
      { name: "付费意愿", description: "目标客户是否有明确预算，愿意为省时间、降风险或增收入付费。" },
    ],
    opportunities: [
      opportunity(
        "智能体代码搜索收据",
        "今日第一优先级",
        [96, 88, 90],
        "代码 Agent 已经在真实仓库里搜索、读文件、改 PR；团队需求不是再多一个搜索框，而是证明 Agent 搜索是否覆盖了关键路径、是否误读上下文、是否浪费 token、是否碰到密钥和客户代码。",
        "现在靠终端日志、聊天记录、grep 输出、PR diff 和 reviewer 记忆。Agent 如果漏掉一个同名函数、读取了错误目录或用 10 倍 token 绕路，负责人很难在事后复盘。",
        "第一版只做本地 CLI/GitHub Action：包装 rg、Semble、grep、代码 Agent 日志和文件读取记录，生成一份 HTML 收据，列出查询、命中、未覆盖目录、敏感路径、token 估算、复跑命令和人工复核 checkbox。",
        "用开源“agent search receipt”GitHub Action 获客；团队版按仓库、成员、历史留存、CI 阻断、敏感路径策略、SSO 和月度搜索质量报告收费。",
        "Semble、IDE 和 Agent 平台会继续优化搜索本身；独立产品必须站在跨工具证据、团队策略和审计留存上，而不是只卖更快搜索。",
        "找 10 个每周用代码 Agent 改 PR 的团队，抽最近 20 次 Agent 搜索日志，手工生成收据，验证是否能发现一个漏搜、误搜或 token 浪费案例。",
      ),
      opportunity(
        "AI 设计稿到代码交付质检台",
        "垂直强，适合产设研团队",
        [90, 85, 84],
        "Ardot、Kimi 网站设计教程和多款文生 UI 工具同时出现，说明设计到代码链路正在被 AI 压缩；真实买方关心生成稿是否符合组件库、响应式规则、品牌规范和可维护代码。",
        "现在靠设计师、前端和产品经理反复人工验收；Figma、Ardot、Cursor、Claude Code 各自有局部能力，但缺少跨工具的交付质量报告。",
        "先做上传 Figma/Ardot 导出和代码 PR 的审查器，输出组件匹配率、设计 token 偏差、响应式断点、无障碍问题、重复样式和可直接改的 checklist。",
        "通过“AI 生成 UI 质检”模板、Figma 插件和 GitHub Action 获客；团队版按项目、组件库、审查次数、批注导出和 CI 集成收费。",
        "设计工具会内置更多检查；独立机会在跨工具、绑定团队组件库、面向交付负责人和保留审查证据。",
        "找 5 个已经用 AI 生成界面稿的团队，手工审 20 个页面，验证是否能减少设计还原返工或 code review 时间。",
      ),
      opportunity(
        "AI 生成媒体水印与虚假内容风险收据",
        "流量强，付费需绑定平台责任",
        [86, 91, 78],
        "Grok Imagine 开放给 X Premium+ 且网页端访问量被称已过 1.5 亿，AI 伪造张家界玻璃桥视频又引发执法处理；创作者、平台和品牌都需要知道素材是否可发布、是否需要标注、是否有投诉风险。",
        "现在靠平台自带水印、人工审核、内容政策和事后下架；小团队很难在发布前形成一张可给客户或平台看的风险说明。",
        "先做上传图片/视频的发布前收据：检测来源线索、生成痕迹、平台规则、免责声明建议、敏感场景分类和保留审查记录。",
        "通过 AI 图像/视频爆款模板、品牌安全和平台合规关键词获客；按审查次数、团队成员、批量处理、白标报告和 API 收费。",
        "检测技术会被平台内置且误判风险高；产品必须定位为发布流程和证据管理，不承诺绝对鉴伪。",
        "找 20 个使用 AI 生成短视频或广告素材的小团队，测试发布前收据是否能改变他们的标注、素材选择或客户交付流程。",
      ),
    ],
    rejected: [
      "Hermes 多模型配置和飞书机器人互相 @ 很有开发者流量，但直接做群聊 Agent 平台容易变成玩具；更好的独立位置是围绕 Agent 搜索、权限和行动生成可复查收据。",
      "Grok Imagine 的消费级流量很强，但再做图像/视频生成会正面撞 xAI、Midjourney 和 PixVerse；发布前风险收据更像小团队会付费的工作流。",
      "GPU 短缺和大型实验室锁定供应是重要基础设施信号，但商业 WebApp 切口偏重采购和云资源市场，今天不如 Agent 搜索收据验证更快。",
    ],
    sources: [
      source("官方或原始信号", "MinishLab/semble：面向 Agent 的代码搜索，号称比 grep+read 少约 98% token", "https://github.com/MinishLab/semble"),
      source("BuilderPulse", "BuilderPulse 2026-05-18 中文摘要：Semble 引发讨论，智能体搜索该不该被信任", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-18.md"),
      source("AI HOT 全量", "向阳乔木：飞书机器人互相 @，可跨 OpenClaw 和 Hermes 讨论", "https://x.com/vista8/status/2056216662391836848"),
      source("官方或原始信号", "腾讯 Ardot：文生 UI、图片转设计稿、权限中心与行为追溯", "https://ardot.tencent.com/"),
      source("AI HOT 全量", "Elon Musk：Grok Imagine 向 X Premium+ 开放", "https://x.com/elonmusk/status/2056209019065229420"),
      source("AI HOT 全量", "DogeDesigner：Grok Imagine 网页端访问量突破 1.5 亿次", "https://x.com/cb_doge/status/2056204334032138720"),
      source("AI HOT 全量", "IT之家：Linus 批评 AI 提交大量重复 Bug 报告", "https://www.ithome.com/0/951/704.htm"),
      source("AI HOT 全量", "Yuchen Jin：GPU 短缺与 H100 供应压力", "https://x.com/Yuchenj_UW/status/2056218132598067457"),
      source("AI HOT 全量", "IT之家：腾讯 AI 设计智能体 Ardot 公测", "https://www.ithome.com/0/951/677.htm"),
    ],
  },
  {
    date: "2026-05-17",
    title: "开源模型潮、长任务验证与百万级 token 燃烧：今天最值得做的是 AI 长任务复盘与验证报告台",
    summary:
      "开源模型密集发布、Agent 长任务规划验证、幻灯片 Agent 真实榜单、Codex 能力包、在线记忆、AI 安全证明和高额 token 消耗共同指向一个更可付费的机会：团队不是缺更强模型，而是缺一套把长任务过程、验证结果、上下文成本和后续维护债自动沉淀成负责人能读的复盘报告。",
    tags: ["Agent 治理", "AI 成本", "开发者工具"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 2026-05-17"],
    scores: { commercial: 94, traffic: 84, wedge: 88 },
    winner: {
      name: "AI 长任务复盘与验证报告台",
      short:
        "接入 Codex、Claude Code、OpenClaw、CI 和任务日志，把一次长时间 Agent 任务拆成计划、验证、token 成本、失败点、维护债和下一步修复清单。",
    },
    conclusion: [
      "今天最强的商业信号不是某个模型单点领先，而是开源模型、万亿参数 Agent 模型、长上下文记忆和 Codex 能力包同时把“让 AI 跑更久”变成常态。宝玉关于长任务必须分阶段规划与验证的讨论，和 30 天 130 万美元 token 消耗的信号，说明买方马上会问：这次长任务到底做对了吗、花了多少钱、留下什么债。",
      "BuilderPulse 的 5 月 17 日中文日报把同一件事换成创始人语言：软件信任正在变成“可检查凭证”问题，UUID 碰撞、公开 CTF 被 AI 破坏、agent 权限和 owner panel 都在要求系统能解释假设、证据、负责人和后续风险。",
      "最窄切入不是再做一个代码 Agent，也不是完整 APM，而是做“任务结束后的证据包”：读取会话、提交、测试、CI、token 与工具调用记录，生成负责人可转发的复盘和修复清单。",
    ],
    opportunities: [
      opportunity(
        "AI 长任务复盘与验证报告台",
        "今日第一优先级",
        [94, 84, 88],
        "AI 重度团队正在让 Codex、Claude Code、OpenClaw 和开源 Agent 模型执行跨小时任务；真实需求是知道任务是否按计划推进、哪些步骤有自动验证、哪里偏航、花掉多少 token、留下多少维护债。",
        "现在靠终端日志、PR diff、聊天记录、CI 结果和人工口头总结。长任务一旦跨越多次工具调用或多个提交，工程负责人很难快速判断它是有效产出还是未来的维护账单。",
        "第一版只做报告层：接入本地会话日志、git diff、测试输出、CI 链接和账单/usage 记录，按阶段生成计划执行图、验证证据、未验证改动、复杂度热点、token 成本和下一步人工检查清单。",
        "用免费“AI task postmortem”CLI 和 GitHub Action 获客；团队版按仓库、成员、日志留存、CI 集成、成本分摊、SSO 和月度维护债报告收费。",
        "底层代码 Agent 会补一些任务摘要；独立产品必须跨工具、跨仓库，并把验证证据、成本解释和管理层报告做深，而不是只复述聊天记录。",
        "找 10 个每周运行长时间代码 Agent 的团队，手工分析最近 3 次任务日志，验证报告是否能发现一个未覆盖测试、重复扫描或明显 token 浪费点。",
      ),
      opportunity(
        "开源模型选型与推理成本沙盘",
        "流量强，适合开发者获客",
        [88, 86, 80],
        "Gemma、DeepSeek、Kimi、MiMo、GLM、Ring-2.6-1T 等开源模型密集发布，团队需要知道某个任务该用本地模型、OpenRouter 折扣模型还是闭源前沿模型。",
        "现在靠榜单、博客、OpenRouter 价格页、Hugging Face 下载量和零散 benchmark；真实工作负载里的速度、上下文、工具调用成功率和单任务成本很难比较。",
        "先做“单任务成本沙盘”：用户上传一个任务描述和上下文大小，选择 5 个候选模型，生成预估 token、推理时间、显存/云成本、许可证风险和推荐组合。",
        "通过开源模型发布追踪、OpenRouter/本地推理教程和免费模型对比表获客；付费点是团队工作负载库、历史成本回测、私有模型目录和采购报告。",
        "模型平台会自带价格与榜单；产品必须绑定用户自己的任务样本和团队采购决策，避免变成又一个泛模型排行榜。",
        "收集 20 个真实 Agent/编码/RAG 任务，在 3 个开源模型和 2 个闭源模型上跑小样本，验证推荐是否能节省 20% 以上成本且不明显降低完成率。",
      ),
      opportunity(
        "Agentic Slides 质量与品牌审查台",
        "垂直明确，付费场景真实",
        [86, 82, 82],
        "Slides Arena 用 370 万真实使用场景给幻灯片 Agent 排名，说明幻灯片生成已经从 demo 进入高频工作流；团队需要的不是再生成一版，而是品牌、逻辑、事实和可交付质量审查。",
        "现在用户在 Manus、Claude、Gamma、Canva、PowerPoint 等工具之间试错，靠人工检查品牌色、结构、错别字、事实来源和视觉一致性。",
        "先做上传 PPT/PDF 的审查器：输出品牌偏差、叙事断点、信息密度、事实待核验、重复页和可直接改的 slide-by-slide checklist。",
        "从“AI 生成 PPT 质检”模板和咨询/销售团队内容获客；按审查次数、品牌规范库、团队协作、导出批注和企业模板收费。",
        "生成平台会加强内置检查；独立机会在跨平台、品牌规范沉淀和面向销售/融资材料的可审计交付。",
        "找 5 个每周产出客户方案或融资材料的团队，手工审 20 份 AI 生成 deck，验证是否能减少返工轮次或提升交付信心。",
      ),
    ],
    rejected: [
      "直接做新的开源模型聚合入口会吃到流量，但差异化弱且容易被 OpenRouter、Hugging Face 和各模型方覆盖；更好的切口是绑定真实任务成本和选型决策。",
      "单独追 SANA-WM、WorldReasonBench 或视频世界模型适合内容流量，但商业 WebApp 还缺明确买方；除非绑定广告素材、仿真或游戏资产验收流程，否则今天不如代码/Agent 复盘直接。",
      "数字主权云和欧洲处理器依赖是重要战略话题，但销售周期偏长；今天更适合把它作为大客户背景风险，而不是独立 WebApp 的首个 MVP。",
    ],
    sources: [
      source("AI HOT 全量", "Interconnects：开源模型密集发布，覆盖 Gemma、DeepSeek、Kimi、MiMo、GLM 等", "https://www.interconnects.ai/p/latest-open-artifacts-21-open-model"),
      source("AI HOT 全量", "SemiAnalysis：Claude CLI 定位与更宏大的 Agent 架构讨论", "https://x.com/SemiAnalysis_/status/2055695091973365824"),
      source("AI HOT 全量", "Slides Arena：基于 370 万真实场景的 Agentic Slides 排行榜", "https://x.com/berryxia/status/2055691224062001462"),
      source("AI HOT 全量", "Ant Ling：Ring-2.6-1T 开源并面向现实世界 Agent 工作流", "https://x.com/AntLingAGI/status/2055690326573211923"),
      source("AI HOT 全量", "宝玉：让 AI 执行长任务的核心是规划与验证", "https://x.com/dotey/status/2055682292937326638"),
      source("AI HOT 全量", "30 天消耗 130 万美元 token 的 AI 竞争信号", "https://x.com/kimmonismus/status/2055673453420609600"),
      source("AI HOT 全量", "Greg Brockman：Codex 复杂度分析能力可报告高复杂度区域", "https://x.com/gdb/status/2055646916499714488"),
      source("官方或原始信号", "arXiv：delta-mem 高效在线记忆机制", "https://arxiv.org/abs/2605.12357"),
      source("BuilderPulse", "BuilderPulse 2026-05-17 中文报告：UUID Collision Receipt 与 owner panel", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-17.md"),
      source("官方或原始信号", "Ask HN：真实 UUID v4 碰撞引发 342 条讨论", "https://news.ycombinator.com/item?id=48060054"),
      source("官方或原始信号", "Frontier AI has broken the open CTF format", "https://kabir.au/blog/the-ctf-scene-is-dead"),
    ],
  },
  {
    date: "2026-05-16",
    title: "Codex 常驻、Agent 订阅与财务连接：今天最值得做的是 Agent 连接器成本与权限报告台",
    summary:
      "Codex 常驻提交、Agent 订阅接入、插件上下文成本、个人财务连接和可访问性 Agent 同时出现；BuilderPulse 把 agent connectors、55,000 token 开销与 $2,000 编辑器账单列为主线。两边共同指向一个更接近付费的机会：团队不是缺一个 Agent，而是缺一张能说清连接器权限、上下文成本、订阅来源和高风险动作的负责人报告。",
    tags: ["Agent 治理", "AI 成本", "开发者工具"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 最新 2026-05-15"],
    scores: { commercial: 95, traffic: 86, wedge: 89 },
    winner: {
      name: "Agent 连接器成本与权限报告台",
      short:
        "读取 Claude Code、Codex、Zed Agent、Hermes、MCP/插件清单与账单线索，输出连接器上下文成本、可触达账户、风险动作、订阅来源和负责人可转发的一页报告。",
    },
    conclusion: [
      "今天的强信号不是“再多一个智能体”，而是 Agent 开始常驻在提交、IDE、浏览器、个人财务和开源代理里。Greg Brockman 提到每次提交都跑 Codex，OpenClaw 强调 fs-safe、网络出口策略和命令审批，Claude Code 发布里出现插件上下文成本，Zed 和 Hermes 又把 ChatGPT/Grok 订阅直接接入 Agent。",
      "BuilderPulse 的 5 月 15 日日报把同一件事说得更像买方语言：agent connectors 正在变成隐形成本中心，55,000 token 连接器开销和 $2,000 编辑器账单会让工程经理、财务和安全负责人一起追问谁批准、能碰什么、为什么这么贵。",
      "最窄切入不是做完整 MDM、SIEM 或 Agent 平台，而是做“连接器体检报告”：先只读扫描工具、插件、MCP 配置、订阅入口和最近会话，给出成本预估、权限分级、危险动作清单与可执行整改建议。",
    ],
    opportunities: [
      opportunity(
        "Agent 连接器成本与权限报告台",
        "今日第一优先级",
        [95, 86, 89],
        "AI 重度团队正在把 Codex、Claude Code、Zed Agent、Hermes、OpenClaw、MCP server 和浏览器自动化接进真实代码库与业务账户；负责人需要知道每个连接器会消耗多少上下文、能访问哪些数据、能触发哪些动作。",
        "现在靠各工具自己的设置页、命令日志、账单截图、Slack 约定和人工 code review。问题是跨工具后没人能一眼回答：这个 Agent 为什么能访问 Notion/GitHub/浏览器会话，下一张账单会不会异常。",
        "第一版只做只读报告：导入 Claude Code 插件列表、Codex/CLI 配置、MCP JSON、Zed/Hermes 订阅说明和最近 20 次会话日志，输出连接器成本、权限面、危险动作、重复工具和建议关闭项。",
        "用免费“Agent Bill Guard”报告模板和开源配置扫描器获客；团队版按仓库/成员/连接器数量、日志保留、SSO、私有部署和月度风险报告收费。",
        "底层平台会陆续补成本面板与权限控制；独立产品必须做跨工具统一、白话负责人报告和整改 workflow，而不是停留在单工具监控。",
        "找 10 个每周使用代码 Agent 超过 10 小时的团队，收集他们的插件/连接器配置，手工生成一次报告，验证是否能发现一个会被负责人立即关闭或限额的连接器。",
      ),
      opportunity(
        "个人财务 AI 连接前隐私与订阅审计器",
        "流量强，合规边界要窄",
        [86, 90, 78],
        "ChatGPT Pro 在美国推出通过 Plaid 连接银行账户的个人财务体验，说明用户会把真实交易数据交给 AI，但同时会担心隐私、订阅、外卖消费和完整财务画像的边界。",
        "现在用户只能看 OpenAI/Plaid 的授权说明、银行端授权页和零散隐私政策；很少有人能在连接前看懂哪些账户、交易类别、历史范围和记忆会被使用。",
        "先做浏览器端授权前 checklist：用户选择要连接的账户类型，生成“会暴露什么/不暴露什么/建议关闭哪些记忆/如何撤销授权”的个人风险收据，不代替理财建议。",
        "通过 ChatGPT 财务功能教程、隐私内容和订阅管理关键词获客；付费点是多账户授权追踪、撤销提醒、订阅浪费分析和本地账单导入。",
        "平台可能把说明做清楚，且金融合规风险高；产品必须定位为隐私与授权管理，不做投资建议、不抓银行凭证。",
        "访谈 30 个愿意试用 AI 财务功能的美国用户，观察他们连接前最担心什么，并测试一页风险收据是否提升信任或阻止高风险连接。",
      ),
      opportunity(
        "AI 可访问性修复证据包",
        "企业价值明确，切入较垂直",
        [84, 74, 83],
        "GitHub 正在试点通用无障碍 Agent，说明大型代码平台认为 AI 可以自动发现并修复 accessibility 问题；企业真正需要的是修复证据、人工确认和回归测试，而不是一次性建议。",
        "现在团队靠 Lighthouse、axe、人工 QA、设计规范和 PR 评论；AI 生成修复后，仍要证明问题是什么、改了哪里、是否影响 UI、谁确认过。",
        "先做只面向前端仓库的证据包：扫描关键页面，生成可访问性 issue、AI 修复 PR、截图对比、键盘导航记录和人工验收清单。",
        "从免费 GitHub Action 和可访问性风险报告获客；团队版按页面数量、报告导出、设计系统规则、CI 阻断和审计留存收费。",
        "GitHub/Copilot 可能原生覆盖建议生成；独立空间应落在证据链、跨框架报告和合规交付，而不是“AI 修复代码”本身。",
        "找 5 个有 WCAG/Section 508 压力的 SaaS 团队，对 3 个关键页面跑人工+AI 修复对比，验证报告是否能缩短 QA 与合规沟通时间。",
      ),
    ],
    rejected: [
      "直接做“每次提交跑 100 个 Codex”的云平台听起来有流量，但基础设施成本高且会正面撞 OpenAI、GitHub 和现有 CI 生态；更适合围绕成本、权限和审批做控制层。",
      "Grok/Hermes、Zed/ChatGPT 等订阅接入 Agent 的新闻很热，但单独复制一个代理入口缺少差异化；真正的横向机会是管理这些订阅进入 Agent 后的成本和权限。",
      "X 开源推荐算法会吸引创作者流量，但作为商业 WebApp 容易变成短期算法解读器；除非绑定可复测的内容实验和广告转化，否则今天不如 Agent 连接器治理付费更直接。",
    ],
    sources: [
      source("AI HOT 全量", "OpenClaw 安全机制升级：fs-safe、Proxyline、信任凭证与命令审批", "https://x.com/openclaw/status/2055437760459055405"),
      source("AI HOT 全量", "Greg Brockman：在每次提交上运行 Codex", "https://x.com/gdb/status/2055436684666274020"),
      source("AI HOT 全量", "Claude Code v2.1.143：插件依赖与插件市场上下文成本显示", "https://github.com/anthropics/claude-code/releases/tag/v2.1.143"),
      source("AI HOT 全量", "Zed Agent 支持 ChatGPT 订阅", "https://x.com/testingcatalog/status/2055385457798558188"),
      source("AI HOT 全量", "xAI：Grok 可连接 Hermes Agent", "https://x.com/xai/status/2055375676656783733"),
      source("AI HOT 全量", "ChatGPT 个人财务功能通过 Plaid 连接金融账户", "https://x.com/ChatGPTapp/status/2055317612687675545"),
      source("AI HOT 全量", "GitHub：构建通用无障碍智能体的经验", "https://github.blog/ai-and-ml/github-copilot/building-a-general-purpose-accessibility-agent-and-what-we-learned-in-the-process"),
      source("BuilderPulse", "BuilderPulse 2026-05-15 中文报告：Agent Bill Guard 与连接器成本权限", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-15.md"),
      source("原始信号", "Theneo：面向人和智能体共同使用的 API 管理", "https://www.producthunt.com/products/theneo"),
    ],
  },
  {
    date: "2026-05-15",
    title: "Codex Hooks、Genkit 中间件与移动审批：今天最值得做的是 Agent 工具调用审批网关",
    summary:
      "Codex Hooks、Genkit 中间件、移动审批和 Windows 沙箱共同指向一个更成熟的团队需求：Agent 已经能远程跑任务、接入 CI/CD、调用浏览器和工具，但企业还缺少跨工具的审批、限权、留痕与成本控制层。",
    tags: ["Agent 治理", "开发者工具", "企业安全"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse 最新 2026-05-14"],
    scores: { commercial: 94, traffic: 84, wedge: 87 },
    winner: {
      name: "Agent 工具调用审批网关",
      short:
        "接在 Codex Hooks、Genkit 中间件、Claude Code 和浏览器扩展之间，统一审批高风险工具调用、记录证据链并输出团队策略报告。",
    },
    conclusion: [
      "今天的信号不是单个 Agent 更聪明，而是 Agent 开始进入可远程控制、可脚本化、可接入 CI/CD 的生产环境。Codex Hooks、程序化令牌、移动端审批、Genkit 中间件和 Windows 沙箱都在把“能不能用”推进到“怎么管”。",
      "真实买家不是普通开发者，而是工程负责人、安全负责人和平台团队。他们需要回答：哪些命令可以自动执行、哪些需要批准、谁批准过、token 和外部工具花了多少钱、出事时证据在哪里。",
      "最窄切入不是再做一个 Agent，也不是泛泛的审计看板，而是做工具调用前后的策略网关：高风险动作先拦截、解释、审批、记录，低风险动作自动放行。",
    ],
    opportunities: [
      opportunity(
        "Agent 工具调用审批网关",
        "今日第一优先级",
        [94, 84, 87],
        "团队正在让 Codex、Claude Code、Genkit、Kimi Web Bridge 等 Agent 读写代码、跑命令、调用浏览器和接入发布流程，负责人需要一套可解释的审批与限权机制。",
        "现在靠各工具自己的权限弹窗、终端日志、PR 记录、Slack 口头确认和人工约定；跨工具后很难证明一次任务为什么被允许、谁批准、是否触碰了敏感资源。",
        "先做只支持 3 类高风险动作的网关：写入生产配置、访问密钥/客户数据、触发部署或外部 API。接入 Codex Hooks/Genkit 中间件/CLI wrapper，给出允许、拒绝、人工批准三种结果。",
        "用免费“Agent 风险策略生成器”和开源 hook 模板获客；团队版按席位、策略数量、日志留存、SSO、私有部署收费。",
        "平台会补内置审批；独立产品必须跨 Codex、Claude、浏览器和内部工具，并把策略管理、证据链和管理层报告做成平台不会优先做的横向层。",
        "找 10 个已经把代码 Agent 放进真实仓库的团队，接入一个只读/低风险 hook，验证他们是否愿意把高风险动作交给该网关审批。",
      ),
      opportunity(
        "AI 素材成本与品牌流水线控制台",
        "流量强，适合中小团队",
        [87, 88, 76],
        "Luma Agents、Recraft、Tavus 和 Higgsfield 同时把图片、视频、虚拟人和多模型生产推到营销场景；团队已经出现 AI 图像支出超过编程支出的信号。",
        "现在素材团队在 Luma、Runway、Recraft、Canva、OpenRouter、表格和网盘之间切换，缺少统一预算、品牌一致性、版本对比和投放反馈。",
        "先做“电商广告素材账本”：导入各平台生成记录和素材文件，按品牌、SKU、活动、模型、成本、转化素材版本建立台账。",
        "靠免费素材成本审计和电商模板获客；按品牌资产库、成员、导出量、素材留存和投放复盘收费。",
        "横向生成平台会覆盖创作能力，所以产品不能卖“生成”，要卖预算、版本、品牌一致性和投放复盘。",
        "找 5 个每周固定做广告素材的电商团队，手工整理过去两周素材成本，看是否能发现浪费并愿意持续导入。",
      ),
      opportunity(
        "医院 Shadow AI 使用治理台",
        "客单高，合规慢",
        [90, 70, 74],
        "OpenEvidence 覆盖大量美国医生的信号说明临床人员会先于医院系统自发使用 AI，医院后补企业合作与治理需求会越来越强。",
        "现在医院可能只看到零散采购、浏览器访问、医生自报和安全部门问卷，无法知道哪些科室在用哪些 AI、输入了什么类型的问题、是否符合政策。",
        "先做非侵入式治理：匿名问卷、浏览器/网络域名清单、批准工具目录、风险分级和科室级报告，不碰病人明文数据。",
        "通过医疗 AI 安全内容、合规顾问和 CIO/CMIO 圈层获客；收费点是年度治理报告、政策模板、培训记录和私有部署。",
        "医疗销售周期长且法律风险高；MVP 必须定位为使用治理与政策工具，不提供诊断建议，也不采集 PHI 明文。",
        "访谈 10 位医生和 5 位医院 IT/合规负责人，验证他们是否承认 shadow AI 已经存在，以及是否愿意先做匿名盘点。",
      ),
    ],
    rejected: [
      "Codex 移动端本身流量很强，但直接做“手机写代码”会撞平台入口，独立机会应落在远程任务审批与管理。",
      "AI 虚拟人和单图生成角色展示效果强，但如果不绑定客服转化、素材成本或品牌资产，很容易变成短期 demo。",
      "AI 数据中心、TPU 和中美竞争讨论重要但更偏政策与基础设施，今天不适合作为商业 WebApp 的第一切口。",
    ],
    sources: [
      source("AI HOT 全量", "OpenAI 推出 Codex Hooks 和编程访问令牌", "https://x.com/sama/status/2055034714231345475"),
      source("AI HOT 全量", "Genkit 推出中间件系统", "https://developers.googleblog.com/announcing-genkit-middleware-intercept-extend-and-harden-your-agentic-apps"),
      source("官方", "OpenAI：在 Windows 上构建 Codex 沙箱", "https://openai.com/index/building-codex-windows-sandbox"),
      source("AI HOT 全量", "ChatGPT 移动端预览 Codex", "https://x.com/OpenAI/status/2055016850849993072"),
      source("AI HOT 全量", "Luma Agents 高效生成电商素材全流程", "https://x.com/LumaLabsAI/status/2055046873740984429"),
      source("AI HOT 全量", "团队 AI 图像生成支出超编程", "https://x.com/thdxr/status/2055029113014923400"),
      source("AI HOT 全量", "OpenEvidence 覆盖 65% 美国医生，shadow AI 模式引关注", "https://x.com/frxiaobei/status/2054981573150449754"),
      source("BuilderPulse", "BuilderPulse 2026-05-14 中文报告（当前最新可见）", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-14.md"),
    ],
  },
  {
    date: "2026-05-14",
    title: "主权迁移、退订锁定与 AI 账单：今天最值得做的是团队数字主权体检与迁移路线图",
    summary:
      "数字主权、退订锁定和 AI 编程账单同时指向一个更接近付费的焦虑：工具到底归谁、退订后数据怎么交接、AI 编程账单如何被控制。最靠谱的切口是把“想迁移/想自托管”变成一份可执行的资产清单与迁移计划。",
    tags: ["数字主权", "开发者工具", "AI 成本治理"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
    scores: { commercial: 91, traffic: 76, wedge: 88 },
    winner: {
      name: "团队数字主权体检与迁移路线图",
      short:
        "扫描 GitHub/IdP/文档/云与 AI 工具，生成所有权清单、退出风险评分与分阶段迁移 runbook。",
    },
    conclusion: [
      "今天的热点表面是 AI 硬件与模型，但更能触发购买的是“所有权与可撤销性”：东西住在哪里、谁能把你踢下线、退订后还能不能拿回资产。",
      "AI 编程工具的限制、额度与账单争议把同一个问题放大：团队愿意用，但必须能解释成本、权限与交接，不能靠个人信用硬扛。",
      "最窄切入不是卖“主权理念”，而是卖一份可以交付给老板的报告：现状、风险、替代项、预算区间和 30 天迁移计划。",
    ],
    opportunities: [
      opportunity(
        "团队数字主权体检与迁移路线图",
        "今日第一优先级",
        [91, 76, 88],
        "越来越多团队想把代码托管、身份、文档与关键 SaaS 从“平台默认”变成“可选择、可迁移”的资产，但缺少一张全景地图与可执行计划。",
        "现在靠零散博客、顾问口口相传、运维同事临时拍板；迁移的隐性成本（权限、备份、审计、SSO、合规、运行费用）很难被说明白。",
        "先做只读体检：连接 GitHub/云账单/IdP/文档与工单系统，输出资产清单、退出难度、数据导出路径、关键依赖和“最小迁移顺序”。",
        "用免费“主权评分/退出风险”报告吸引流量；对企业卖付费 PDF/HTML 报告、替代选型对比、迁移 runbook、以及按系统包月的落地支持。",
        "容易沦为咨询；产品必须把采集-评分-报告模板化，并把“迁移前 30 天的可验证成果”定义清楚，避免无限项目。",
        "找 10 个正在讨论自托管/欧洲栈/离开 GitHub 的团队，手工做 1 版报告验证：是否愿意为“可交付给老板的迁移计划”付费。",
      ),
      opportunity(
        "AI 编程工具成本与配额控制台",
        "强需求，切口更窄",
        [88, 72, 86],
        "Claude Code 等 AI 编程进入团队工作流后，负责人需要把额度、账单、重试浪费和第三方工具调用变成可控的预算与策略。",
        "现在要么靠个人信用卡+手动统计，要么只能看平台账单总额；退订/额度调整时还会出现交接和可用性断崖。",
        "先做“账单与浪费解释器”：导入会话/日志与账单，按仓库/成员/任务拆分 token 成本，标记高浪费模式并给出限额与审批建议。",
        "从工程负责人社群、AI 工程工具链内容与开源 CLI 插件获客；团队版按席位或月度预算规模收费，附带审计导出和 SSO。",
        "平台可能推出内置面板；必须做跨工具（Claude/Codex/多模型网关）统一、并把“成本解释”链接到可执行的策略（限额/审批/禁用工具）。",
        "用 3 家团队的真实账单做试点：能否在 1 小时内说清“钱花在哪、怎么省 20%”，并愿意持续导入。",
      ),
      opportunity(
        "安全沙箱与工具权限证明包（Windows/企业环境）",
        "企业价值高，销售更慢",
        [84, 54, 80],
        "团队想在 Windows/企业终端里用 Agent，但安全团队需要证明：沙箱边界、文件/网络权限、可审计日志与可回滚策略。",
        "现在靠安全文档、手写 SOP、临时脚本和重复的审计问答；一旦事故发生很难证明边界是否被突破。",
        "先把“可证明”做成产品化交付：提供一键基线检查（WSL/虚拟化/文件系统隔离/网络策略）、审计日志采集与标准化报告模板。",
        "通过安全咨询伙伴和企业 IT 渠道获客；收费点是企业部署包、合规模板库、定期体检与私有化支持。",
        "需要深入系统权限，风险与交付成本较高；MVP 应坚持只读检测+报告，不做高危自动修复。",
        "找 5 个已经在 Windows 上试用 Agent 的团队，跑一次体检：是否能缩短安全评审时间、是否愿意为报告模板付费。",
      ),
    ],
    rejected: [
      "Googlebook/AI laptop 讨论很热，但独立 WebApp 很难在硬件入口上抢到分发与渠道优势。",
      "单纯追模型预训练加速或量化推理的工具更偏基础设施，对今天的商业 WebApp 切口不够直接。",
      "泛“多智能体系统经验总结”内容价值高，但要落地成产品需要绑定具体组织流程，否则容易变成课程或咨询。",
    ],
    sources: [
      source("AI HOT 全量", "在 Windows 上为 Codex 构建安全有效的沙箱", "https://x.com/hongming731/status/2054719723276063016"),
      source("AI HOT 全量", "Claude Code 的每周限额将增加 50%，持续到 7 月 13 号", "https://x.com/op7418/status/2054725474493067482"),
      source("AI HOT 全量", "Anthropic 为付费 Claude 计划新增程序化调用专用额度", "https://x.com/hongming731/status/2054723213608026145"),
      source("BuilderPulse", "BuilderPulse 2026-05-14 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-14.md"),
      source("原始信号", "I moved my digital stack to Europe", "https://monokai.com/articles/how-i-moved-my-digital-stack-to-europe/"),
      source("原始信号", "Leaving GitHub for Forgejo", "https://jorijn.com/en/blog/leaving-github-for-forgejo/"),
    ],
  },
  {
    date: "2026-05-13",
    title: "从桌面 Agent 到法律插件：今天最值得做的是 AI Agent 动作与成本审计台",
    summary:
      "浏览器、桌面、长流程、法律和安全 Agent 同时升温；真正能卖给团队的是把 Agent 的动作、权限、花费和审批做成可审计报告。",
    tags: ["Agent 治理", "企业工具", "安全审计"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
    scores: { commercial: 92, traffic: 80, wedge: 86 },
    winner: {
      name: "AI Agent 动作与成本审计台",
      short:
        "接入 Codex、Claude、Browser Use 等 Agent 日志，输出动作轨迹、权限风险、token 成本、人工审批点和可追溯报告。",
    },
    conclusion: [
      "今天的共同主题不是模型更快，而是 Agent 正在越过聊天框，开始操作浏览器、桌面软件、法律系统和企业长流程。BuilderPulse 也把本地命令、许可证、支付通道和所有权控制列为信号，说明市场开始关心可证明性。",
      "买家不是普通尝鲜用户，而是工程、安全、法务和财务负责人。他们的问题很明确：Agent 到底点了什么、花了多少钱、有没有碰敏感数据、哪些动作需要人批准。",
      "最窄切口不是做另一个 Agent，而是做 Agent 旁边的黑匣子记录仪。第一版只支持浏览器自动化和代码 Agent，也足够验证需求。",
    ],
    opportunities: [
      opportunity(
        "AI Agent 动作与成本审计台",
        "今日第一优先级",
        [92, 80, 86],
        "团队开始让 Agent 操作浏览器、CRM、代码库和内部工具，负责人需要知道它做过什么、为什么做、花了多少、是否越权。",
        "现在靠聊天记录、终端日志、浏览器历史和人工截图复盘，出了问题才补证据，且无法跨工具统一。",
        "先做 Chrome/Codex/Claude Code 会话导入器，输出动作时间线、域名清单、敏感动作、token 成本和审批建议。",
        "用免费会话报告吸引 AI 工程团队和安全团队，团队版按席位、日志保留期、私有部署和合规导出收费。",
        "平台可能自带日志，早期必须做跨工具统一和管理层报告，而不是复制单个平台功能。",
        "找 10 个已经用浏览器/代码 Agent 的团队，导入最近 20 次任务，看是否愿意为可追溯和可控付费。",
      ),
      opportunity(
        "长流程 Agent 状态机模板库",
        "工程价值高",
        [84, 68, 82],
        "Google ADK 长流程 Agent 说明企业任务会跨天、等待外部事件并恢复上下文，工程团队需要可复制方案。",
        "现在开发者把流程塞进 prompt、队列、cron 和数据库字段里，出错后难复盘。",
        "做 5 个高频模板：入职、合同审批、客户跟进、报销、内容审核，带状态机、Webhook、暂停恢复和观察面板。",
        "通过开源模板和部署教程获客，收费点是托管执行、可视化编辑器、团队权限和行业模板包。",
        "容易变成框架生意，用户不愿意换栈；应从可复制模板和现成报告切入。",
        "把 HR 入职模板做成 demo，找 5 个使用 Zapier/Make/脚本的团队比较维护时间。",
      ),
      opportunity(
        "法律团队 Claude 插件落地包",
        "垂直高客单",
        [88, 62, 74],
        "Anthropic 法律行业插件说明法务场景有明确文档工作流、风险和预算，且愿意为可定制标准付费。",
        "律所和企业法务现在靠 Word 模板、人工审阅、知识库和通用 Claude，输出风格不稳定。",
        "先做 NDA/合同条款比对的本地配置包：团队访谈、风格规则、条款库、审阅清单和 Word 插件。",
        "从公开模板、合同风险检查器和法务运营社群获客，按团队部署与模板维护收费。",
        "法律责任边界重，必须定位为内部工作流工具，保留人工批准和证据来源。",
        "拿 30 份公开 NDA 做样例，邀请 3 个法务团队用自己的条款偏好跑一轮。",
      ),
    ],
    rejected: [
      "Claude Opus 4.7 快速模式、Qwen 限免等模型新闻有热度，但单独包装成 WebApp 缺少持久需求。",
      "AI 鼠标指针、Googlebook、Android 主动 AI 是平台级入口，独立创业者不该第一天冲系统层。",
      "语音模型榜单值得跟踪，但今天缺少一个足够窄的付费买家，除非落到客服质检或销售通话评估。",
    ],
    sources: [
      source("AI HOT 全量", "Computer Use 让 Codex 迈向通用桌面 Agent", "https://x.com/shao__meng/status/2054369872663232625"),
      source("AI HOT 全量", "Google ADK：构建可暂停恢复的长时运行 Agent", "https://developers.googleblog.com/build-long-running-ai-agents-that-pause-resume-and-never-lose-context-with-adk"),
      source("AI HOT 全量", "Anthropic：Claude for the Legal Industry", "https://claude.com/blog/claude-for-the-legal-industry"),
      source("AI HOT 全量", "Anthropic 安全团队如何用 Claude Code 构建威胁检测平台", "https://claude.com/blog/how-anthropic-uses-claude-cybersecurity"),
      source("BuilderPulse", "BuilderPulse 2026-05-13 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-13.md"),
    ],
  },
  {
    date: "2026-05-12",
    title: "供应链投毒、数据导出和广告自动化：今天最值得做的是供应链安全响应 Copilot",
    summary:
      "安全事故和 Agent 化开发同时升温；结合 BuilderPulse 对 TanStack/npm 事故的强调，最值得做的是事故发生后 24 小时内可交付的供应链安全响应工具。",
    tags: ["AI 安全", "开发者工具", "B2B SaaS"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
    scores: { commercial: 94, traffic: 82, wedge: 88 },
    winner: {
      name: "供应链安全事故响应 Copilot",
      short:
        "连接 GitHub 与 lockfile，自动判断是否受投毒影响，生成风险报告、凭证轮换清单和修复 PR。",
    },
    conclusion: [
      "今天不是单点安全新闻，而是一组连锁信号：npm/TanStack 供应链事故、OpenAI Daybreak、安全团队用 Claude Code 做威胁检测、企业 Agent 进入真实研发流程。",
      "BuilderPulse 的 Top 信号也指向同一件事：短暂恶意发布窗口会迫使大量团队证明凭证是否暴露。这种必须证明的需求比普通安全资讯更接近付费。",
      "最佳切口是事故响应，而不是泛漏洞扫描。用户急的是哪些仓库受影响、哪些密钥要轮换、谁负责、如何向老板和客户交代。",
    ],
    opportunities: [
      opportunity(
        "供应链安全事故响应 Copilot",
        "今日第一优先级",
        [94, 82, 88],
        "研发团队遇到 npm/PyPI/GitHub Actions 投毒时，当天就要确认影响范围并止血。",
        "现在靠人工查公告、grep lockfile、临时脚本、群里分派密钥轮换，最后手写事故报告。",
        "只做事故响应包：上传 lockfile 或连接 GitHub，输出受影响包、安装窗口、凭证类型、修复 PR 和管理层报告。",
        "每次事故天然带搜索流量。免费公开检查器吸流量，私有仓库扫描、团队报告和持续监控收费。",
        "安全结论不能瞎编，必须保留证据链；也会被 Snyk/Socket/GitHub 覆盖。",
        "用 TanStack/npm 事件做检查器，找 20 个 JS 团队问事故当天花了几小时、是否愿意为自动报告付费。",
      ),
      opportunity(
        "个人消费数据仓 + AI 管家上下文工具",
        "流量强，合规重",
        [78, 88, 74],
        "个人 AI 管家缺少真实消费上下文，订单、收藏、外卖和旅行偏好能让推荐从空话变得具体。",
        "数据分散在淘宝、京东、外卖、点评和浏览器收藏里，多数用户只能截图、Excel 或手动整理。",
        "先做本地优先的数据导入器，支持用户主动上传导出文件，生成偏好图谱和可喂给 Agent 的上下文包。",
        "通过开源插件、个人效率博主和 AI 管家模板获客，付费点是多平台导入、长期记忆、家庭共享和隐私本地存储。",
        "平台反爬、账号安全和隐私合规是硬风险，必须避免灰色爬虫。",
        "做只处理导出文件的本地 WebApp，找 50 个重度网购用户测试是否愿意上传三个月数据并付费。",
      ),
      opportunity(
        "中小商家的 AI 广告素材流水线",
        "需求真但竞争密",
        [84, 86, 72],
        "商家每天需要广告图、短视频脚本、平台尺寸、投放文案和 A/B 变体，素材生产是持续预算项。",
        "现在用 Canva、剪映、Midjourney、Luma、外包设计师和代运营拼接，迭代慢且风格不稳定。",
        "不要做通用视频生成，先做商品详情页到 20 条广告变体。",
        "靠模板 SEO、免费广告审计、Shopify/小红书/抖店社群获客，按导出次数、品牌资产库和团队协作收费。",
        "Luma、Canva、CapCut、Adobe 都会覆盖横向能力，所以必须选一个行业或平台先打穿。",
        "选一个品类做 10 个真实商家样片，衡量是否愿意为每周固定素材包付费。",
      ),
    ],
    rejected: [
      "纯模型发布和限时免费有流量，但大多是能力变化，不是稳定付费工作流。",
      "AI 代写种草笔记案很重要，但法律边界复杂，适合做运营风控辅助，不适合作为今天第一推荐。",
      "企业 Agent 治理长期很大，但销售周期比事故响应更重。",
    ],
    sources: [
      source("AI HOT 全量", "npm 生态遭大范围投毒", "https://www.ithome.com/0/949/178.htm"),
      source("原始信号", "Aikido Security：Mini Shai-Hulud is back, TanStack compromised", "https://www.aikido.dev/blog/mini-shai-hulud-is-back-tanstack-compromised"),
      source("官方", "OpenAI：Introducing Daybreak", "https://openai.com/daybreak"),
      source("AI HOT 全量", "Luma Agents 从情绪板到完整广告", "https://x.com/LumaLabsAI/status/2053941836402901409"),
      source("BuilderPulse", "BuilderPulse 2026-05-12 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-12.md"),
    ],
  },
  {
    date: "2026-05-11",
    title: "金融模板、健康 API 和 AI 客服：今天最值得做的是企业 AI 落地资产盘点器",
    summary:
      "企业 AI 从模型试用进入行业模板、数据连接器、席位套餐和客服转化；最可卖的 WebApp 是帮团队盘点可落地工作流、数据权限和 ROI 的资产报告。",
    tags: ["企业 AI", "数据连接器", "运营效率"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
    scores: { commercial: 90, traffic: 70, wedge: 84 },
    winner: {
      name: "企业 AI 落地资产盘点器",
      short:
        "扫描团队现有 SaaS、数据源、角色和流程，生成最适合接入 AI Agent 的 10 个工作流、权限缺口和 ROI 排序。",
    },
    conclusion: [
      "Anthropic 金融 AI 模板、Google Health API、阿里 Token Plan、AI 店小蜜和企业部署公司都在讲同一件事：AI 预算开始绑定行业工作流。",
      "BuilderPulse 从控制层看问题：设备信任、云迁移和本地 AI 都在暴露隐藏成本。买家需要知道自己哪里能落、哪里不能落。",
      "企业 AI 落地资产盘点器不用替客户做完整实施，而是先卖一个清晰可交付的诊断报告：哪些流程适合 Agent，数据在哪，权限缺什么，预计节省多少。",
    ],
    opportunities: [
      opportunity(
        "企业 AI 落地资产盘点器",
        "今日第一优先级",
        [90, 70, 84],
        "企业开始购买 AI 席位和行业模板，但多数团队不知道哪些流程有数据、能自动化、值得优先做。",
        "现状是咨询公司访谈、内部表格、部门负责人拍脑袋，最后做一堆 demo 而没有 ROI 排序。",
        "做问卷 + SaaS 连接器，输出流程清单、数据源、权限缺口、可自动化程度、预计节省和实施顺序。",
        "用免费 AI readiness 评分获客，报告版收费，后续通过连接器、模板市场和实施伙伴分成。",
        "容易变咨询交付，必须把报告标准化，避免每单都靠人工。",
        "找 5 家 50-500 人公司跑一次盘点，验证报告是否能推动他们批准第一个 AI 工作流预算。",
      ),
      opportunity(
        "健康数据 AI Agent SDK",
        "开发者流量强",
        [82, 76, 78],
        "Google Health API 打开 31 种健康数据和 Webhook，开发者会想做个人健康 Agent、教练和医疗前筛。",
        "开发者需要自己处理权限、时间序列清洗、异常解释和隐私边界。",
        "先做开发者 SDK 和示例 WebApp：把健康数据转成睡眠、运动、心率、恢复度四类可解释事件。",
        "通过开源样例、健康黑客松和独立开发者社区获客，按 API 调用、白标和高级洞察收费。",
        "医疗声明和隐私风险很重，必须避开诊断，定位为生活方式和个人数据工具。",
        "做 Fitbit 导入 demo，找 30 个量化自我用户和 10 个教练测试是否能生成可行动周报。",
      ),
      opportunity(
        "AI 客服转化分析面板",
        "现金流机会",
        [86, 78, 76],
        "阿里 AI 店小蜜显示 AI+人 转化率可超过纯人工，商家会关心 AI 客服到底提升还是伤害成交。",
        "中小商家现在看机器人接待量、转人工率和客服主观反馈，缺少从对话到成交的因果分析。",
        "接入客服记录和订单，按问题类型、转人工节点、优惠策略和回复时延分析转化差异。",
        "面向电商服务商和品牌运营团队，先用免费对话漏斗报告获客，再卖持续监控和优化建议。",
        "平台数据接入可能受限，且归因复杂；早期要和服务商合作拿数据。",
        "找 3 个店铺导入一周对话和订单，看能否发现 3 个可执行优化点。",
      ),
    ],
    rejected: [
      "Agent 基准和模型路由有技术价值，但商业买家不如企业盘点清晰。",
      "AI 低质 PR、开源项目维护压力是好痛点，但需要聚焦到具体生态和维护者付费能力。",
      "本地 AI/云退出讨论带有意识形态成分，必须落到迁移报告或合规审计才可销售。",
    ],
    sources: [
      source("AI HOT 全量", "Anthropic 开源金融 AI 全栈模板", "https://x.com/frxiaobei/status/2053861985008431398"),
      source("AI HOT 全量", "Google Health API 开发者体验", "https://x.com/frxiaobei/status/2053804236031639582"),
      source("AI HOT 全量", "阿里发布全新 AI 店小蜜", "https://www.ithome.com/0/948/909.htm"),
      source("AI HOT 全量", "阿里云上线团队版 Token Plan", "https://www.ithome.com/0/948/971.htm"),
      source("BuilderPulse", "BuilderPulse 2026-05-11 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-11.md"),
    ],
  },
  {
    date: "2026-05-10",
    title: "健康数据、桌面 GUI Agent 和攻击自复制：今天最值得做的是 Agent 安全演练靶场",
    summary:
      "AI Agent 能操作桌面、访问健康数据、甚至被研究用于入侵复制；今天最值得做的是让企业用安全靶场测试 Agent 权限边界。",
    tags: ["Agent 安全", "桌面自动化", "企业防御"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
    scores: { commercial: 89, traffic: 76, wedge: 82 },
    winner: {
      name: "Agent 安全演练靶场",
      short:
        "给企业和开发者提供可复现环境，测试桌面/浏览器 Agent 在权限、网络、文件和支付动作上的越界风险。",
    },
    conclusion: [
      "今天一边是 UI-TARS-desktop、本地 GUI Agent、Grok Build 这类可操作环境，一边是 AI agents 入侵并复制自己的安全研究。能力越像员工，安全问题越像内控。",
      "BuilderPulse 的登录检查、运行时兼容性和文档篡改信号也说明：软件入口和自动化动作正在产生新的失败模式。",
      "最值得做的是 Agent 安全演练靶场，让团队把自己的 Agent 放进可控环境里跑任务，得到越权、数据泄露、支付误触和提示注入报告。",
    ],
    opportunities: [
      opportunity(
        "Agent 安全演练靶场",
        "今日第一优先级",
        [89, 76, 82],
        "企业想用桌面/浏览器 Agent，但安全负责人需要知道它会不会误删文件、泄露数据、访问钓鱼站或自作主张付款。",
        "现在多靠沙箱、权限提示和开发者自测，缺少专门针对 Agent 行为的红队场景和可读报告。",
        "先做 20 个标准任务：登录、下载、上传、CRM 修改、支付确认、文件读取、提示注入网页，输出失败轨迹和风险等级。",
        "通过开源 mini benchmark 和公开排行榜获客，企业版按私有场景、报告导出、CI 集成和合规审计收费。",
        "需要避免变成纯研究项目，必须把输出对齐到企业审批和采购语言。",
        "邀请 10 个做 Agent 的团队跑同一套靶场，发布匿名风险统计，并验证是否愿意为私有场景测试付费。",
      ),
      opportunity(
        "健康数据 Agent 周报",
        "消费者流量强",
        [78, 82, 72],
        "Health API 让睡眠、心率、运动和血氧实时流入应用，用户想要的不只是图表，而是能解释近期状态的助手。",
        "现有健康 App 数据多但建议泛化，医生级产品又合规重。",
        "只做每周健康复盘：导入可穿戴数据，解释睡眠债、恢复度、运动负荷和异常提醒，避免诊断。",
        "通过量化自我社区、跑步/健身博主和模板分享获客，订阅高级趋势、教练共享和家庭报告。",
        "隐私和医疗边界很敏感，不能做疾病判断，也不能长期存敏感数据而无本地/加密方案。",
        "做 Fitbit/CSV 导入版，找 50 个用户连续两周使用，看复盘是否导致具体行为改变。",
      ),
      opportunity(
        "AI Agent 任务分解教练",
        "一人公司友好",
        [76, 74, 80],
        "一人公司路线图、任务瘫痪、个人第二大脑都指向个人需要把模糊目标拆成可执行任务。",
        "现在用户在 ChatGPT、Notion、Todo、日历之间来回复制，计划常停留在漂亮文档。",
        "先做面向独立开发者的任务分解器：目标、约束、每日动作、阻塞复盘和自动提醒。",
        "靠模板、X 案例和独立开发者社区传播，按月订阅或一次性项目包收费。",
        "消费者付费弱，必须定位到有收入目标的创作者/独立开发者。",
        "找 30 个有产品想法的人跑 7 天游击计划，看是否真正完成一次发布或获客动作。",
      ),
    ],
    rejected: [
      "Grok Build、UI-TARS 等产品本身很热，但直接做竞品会撞平台和模型公司。",
      "AI API 中转站/Agent 金融基础设施想象空间大，但政策、支付和信任门槛太高。",
      "HTML/Markdown 之争适合改进产品体验，不足以成为今天最高商业价值机会。",
    ],
    sources: [
      source("AI HOT 全量", "Google 开放 Fitbit Air Health API", "https://x.com/berryxia/status/2053256690498433146"),
      source("AI HOT 全量", "AI agents can hack computers and copy themselves", "https://the-decoder.com/ai-agents-can-now-hack-computers-and-copy-themselves-and-theyre-getting-better-fast"),
      source("AI HOT 全量", "UI-TARS-desktop 本地桌面 GUI Agent", "https://x.com/berryxia/status/2053283074750976383"),
      source("AI HOT 全量", "Gemini API 多模态文件搜索", "https://blog.google/innovation-and-ai/technology/developers-tools/expanded-gemini-api-file-search-multimodal-rag"),
      source("BuilderPulse", "BuilderPulse 2026-05-10 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-10.md"),
    ],
  },
  {
    date: "2026-05-09",
    title: "团队上下文、HTML 报告和人工审核：今天最值得做的是 AI 工作证据报告生成器",
    summary:
      "ClickUp Brain2、HTML 输出、人工审核工具和 Agent 版本控制都指向同一个需求：团队需要把 AI 产出链路变成可读、可审、可复用的证据。",
    tags: ["团队协作", "AI 报告", "Agent 工作流"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
    scores: { commercial: 87, traffic: 84, wedge: 85 },
    winner: {
      name: "AI 工作证据报告生成器",
      short:
        "把 Agent 会话、PR、设计稿、数据查询和人工审批整理成 HTML 证据报告，供团队复盘、审查和交付。",
    },
    conclusion: [
      "今天最有意思的不是 HTML 取代 Markdown 的表层争论，而是团队开始意识到 AI 输出必须更可读、更可审、更能被人接手。",
      "ClickUp Brain2 把团队知识压缩成模型上下文，OpenRouter 加人工审核工具，Agent Git/版本控制出现，BuilderPulse 也在强调隐藏假设证明。",
      "最好的商业切口是 AI 工作证据报告生成器：AI 做了哪些判断，引用了哪些上下文，谁批准了高风险动作，最后交付物为什么可信。",
    ],
    opportunities: [
      opportunity(
        "AI 工作证据报告生成器",
        "今日第一优先级",
        [87, 84, 85],
        "团队用 AI 做 PR、设计、研究和数据分析后，需要把过程交给同事、客户或管理层审查。",
        "现在是聊天记录截图、Markdown、Notion 文档和人工总结混用，证据链断裂且难复用。",
        "导入 Agent 会话、Git diff、网页引用和人工确认点，生成可分享 HTML 报告，含证据链接、风险标注和下一步。",
        "通过免费 Chrome/CLI 导出器获客，团队版按报告数量、模板、品牌化、权限和存档收费。",
        "容易被平台文档功能覆盖，必须做跨工具和审计证据，而不是普通总结。",
        "找 10 个 AI 重度团队，把他们最近一次 AI PR/调研转成报告，测试是否愿意给客户或老板直接看。",
      ),
      opportunity(
        "团队上下文压缩器",
        "需求强但平台近",
        [82, 72, 78],
        "ClickUp Brain2 说明团队上下文会成为 AI 质量差异的关键。",
        "现在靠知识库搜索、手动粘贴文档、项目 README 和个人记忆，常常上下文过载或缺关键事实。",
        "只做 Slack/Notion/GitHub 到上下文卡片的工具，输出任务相关的 2 页上下文。",
        "面向 AI 研发团队和产品团队，用上下文质量评分和 prompt 包分享获客。",
        "Notion、ClickUp、Cursor 可能内置，独立产品要保持跨工具和可解释。",
        "对 20 个真实任务比较人工粘贴上下文与压缩卡片，让用户打分是否减少返工。",
      ),
      opportunity(
        "高风险工具调用人工审核队列",
        "B2B 安全切口",
        [84, 66, 82],
        "OpenRouter 的人工审核工具说明自动化流程需要在付款、删除、提交、发送邮件等动作前暂停。",
        "现在每个开发者自己写确认弹窗或审批逻辑，无法统一策略和审计记录。",
        "做 SDK + Web 队列：Agent 遇到高风险工具调用时进入审核页，支持批准、修改参数、拒绝和留痕。",
        "通过开源 SDK 进入开发者生态，企业版卖策略管理、团队审批、SSO 和日志保留。",
        "若模型平台提供原生 HITL，独立空间变窄；应专注多模型多框架统一。",
        "用 5 个开源 Agent 框架接入 demo，验证开发者是否愿意添加一行 SDK 换取审批记录。",
      ),
    ],
    rejected: [
      "HTML 输出格式本身不是产品，只有变成证据报告、客户交付或审计文档才有商业价值。",
      "模型参数压缩和 ERNIE 5.1 是能力趋势，不适合直接作为 WebApp 创业题。",
      "AI 算命/垂直 Agent 有传播性，但付费和监管边界不如团队工作证据清晰。",
    ],
    sources: [
      source("AI HOT 全量", "ClickUp Brain2 自动集成企业上下文", "https://x.com/testingcatalog/status/2052828735720903095"),
      source("AI HOT 全量", "HTML 取代 Markdown，成 Agent 输出新标准", "https://x.com/berryxia/status/2052884681193144743"),
      source("AI HOT 全量", "OpenRouter SDK 新增人工审核工具", "https://x.com/OpenRouter/status/2052856129961758917"),
      source("AI HOT 全量", "Show HN：适用于 AI 代理的 Git", "https://github.com/regent-vcs/re_gent"),
      source("BuilderPulse", "BuilderPulse 2026-05-09 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-09.md"),
    ],
  },
  {
    date: "2026-05-08",
    title: "Codex 进浏览器、PR 审查和 Token 成本：今天最值得做的是 Agent PR 审查与成本优化器",
    summary:
      "浏览器 Agent、GitHub Token 效率、Agent PR 审查、Bugbot 计费和安全中心同时出现；最值得做的是面向研发团队的 Agent PR 审查与成本优化器。",
    tags: ["AI 编程", "代码审查", "成本优化"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
    scores: { commercial: 91, traffic: 86, wedge: 83 },
    winner: {
      name: "Agent PR 审查与成本优化器",
      short:
        "自动审查 AI 生成 PR 的逻辑风险、安全问题和 token 浪费，并给出可执行修复建议。",
    },
    conclusion: [
      "今天 AI 编程和 Agent 工程是主战场。Codex Chrome 插件、GitHub token 优化、Agent PR 审查指南和 Bugbot 计费变化都指向同一个问题：AI 生成代码越来越多，但审查和成本控制跟不上。",
      "BuilderPulse 的社区信号也在说 AI slop 正在伤害社区，agentic engineering 需要控制机制。放在代码场景里，最直接的买家就是工程团队。",
      "最靠谱的机会是 Agent PR 审查与成本优化器。它不替代 GitHub/Cursor，而是在 AI PR 合并前检查风险：遗漏调用点、残留死代码、安全漏洞、测试缺口和 token 浪费。",
    ],
    opportunities: [
      opportunity(
        "Agent PR 审查与成本优化器",
        "今日第一优先级",
        [91, 86, 83],
        "AI PR 数量上升后，团队需要用更少人工审出更多逻辑错误、安全缺口和不必要的上下文消耗。",
        "现在靠人工 reviewer、GitHub Copilot、Cursor/Bugbot 和通用 CI，常见问题是评论太泛、成本不可控。",
        "做 GitHub App：检测 AI 生成 PR，按风险排序评论，标注测试缺口、死代码、调用遗漏和可减少 token 的上下文。",
        "通过开源仓库免费审查和公开案例获客，团队版按仓库数、私有规则、成本面板和合规报告收费。",
        "GitHub/Cursor 可能快速补齐，独立产品必须比平台更专注 AI PR 风险和成本。",
        "选 20 个开源 AI PR 做公开审查报告，联系维护者确认命中率，并找 5 个团队试用私有仓库。",
      ),
      opportunity(
        "浏览器 Agent 业务流程测试器",
        "自动化刚需",
        [84, 78, 80],
        "Codex Chrome 扩展使 Agent 能操作已登录网站，团队会拿它跑 CRM、后台、报销和测试流程。",
        "现在浏览器自动化测试偏 Playwright 脚本，业务人员不会写；Agent 操作又缺少稳定断言。",
        "输入自然语言流程，Agent 执行后自动生成可复跑的 Playwright 测试和失败截图。",
        "面向 SaaS、运营后台和 QA 团队，用免费录一次生成测试获客，按测试次数和团队协作收费。",
        "执行稳定性和账号安全是难点，必须隔离环境和敏感操作审批。",
        "找 5 个真实后台流程，从自然语言生成测试，看一周内能否减少手写测试时间。",
      ),
      opportunity(
        "AI 应用安全中心 Lite",
        "Replit 信号强",
        [82, 70, 78],
        "Replit 安全中心 2.0、Anthropic 漏洞赏金、Firefox AI 抓虫说明 AI 应用部署后安全状态需要持续看板。",
        "小团队通常只有 Dependabot、Sentry 和偶尔人工检查，没有按应用聚合的风险视图。",
        "先做面向 Replit/Vercel/Cloudflare 的安全清单：公开密钥、依赖漏洞、权限、SBOM 和一键修复建议。",
        "用免费域名/仓库安全扫描获客，团队版卖批量应用、通知、修复 PR 和导出。",
        "安全平台竞争强，必须针对 AI 小应用和低代码部署平台，而不是泛安全扫描。",
        "抽样检查 100 个公开 AI demo 做匿名风险报告，用报告吸引开发者提交自己的应用扫描。",
      ),
    ],
    rejected: [
      "OpenAI CLI、OpenRouter HITL、实时语音模型都是重要能力，但今天缺少比 AI PR 审查更直接的付费痛点。",
      "广告素材生成继续有需求，但与 5/12 相比没有新鲜商业切口。",
      "模型本地推理和低价模型适合作为成本输入，不是最终用户愿意单独购买的产品。",
    ],
    sources: [
      source("AI HOT 全量", "GitHub：提升 Agentic Workflows 的 Token 使用效率", "https://github.blog/ai-and-ml/github-copilot/improving-token-efficiency-in-github-agentic-workflows"),
      source("AI HOT 全量", "GitHub：Agent PR 无处不在，如何审查", "https://github.blog/ai-and-ml/generative-ai/agent-pull-requests-are-everywhere-heres-how-to-review-them"),
      source("AI HOT 全量", "OpenAI 为 Codex 发布 Chrome 扩展", "https://x.com/dotey/status/2052492340892221800"),
      source("AI HOT 全量", "Replit 安全中心 2.0", "https://x.com/Replit/status/2052444908154433562"),
      source("BuilderPulse", "BuilderPulse 2026-05-08 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-08.md"),
    ],
  },
  {
    date: "2026-05-07",
    title: "Agent 钱包、算力扩容和移动端办公：今天最值得做的是 Agent 付费动作审批网关",
    summary:
      "x402 自动付款、Claude Managed Agents、移动端 Agent 和 Cloudflare 购买部署同时出现；最有商业价值的是给 Agent 付费和基础设施动作加审批网关。",
    tags: ["Agent 支付", "审批流", "基础设施"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
    scores: { commercial: 90, traffic: 78, wedge: 84 },
    winner: {
      name: "Agent 付费动作审批网关",
      short:
        "拦截 Agent 的购买、部署、域名、API 调用和外部服务付款动作，按策略自动批准或进入人工审核。",
    },
    conclusion: [
      "关键变化是 Agent 开始接触钱和基础设施：Apify mcpc + x402、Cloudflare agents 可创建账户买域名部署、Claude Managed Agents 多代理和 Dreaming、移动端 Agent 随时下发任务。",
      "BuilderPulse 也把钱、账号、权限和文档称为 AI 周围的收据。这就是商业机会：当 Agent 能付款和部署，企业需要一个策略层。",
      "最值得做的是 Agent 付费动作审批网关。它不是钱包本身，而是把 402 付款、域名购买、云资源创建、CRM 写入、邮件发送等动作按金额、对象、环境和风险分级。",
    ],
    opportunities: [
      opportunity(
        "Agent 付费动作审批网关",
        "今日第一优先级",
        [90, 78, 84],
        "Agent 获得钱包、浏览器和部署权限后，团队需要控制哪些动作能自动花钱或改变生产环境。",
        "现在要么完全手动，要么在每个工具里写确认逻辑，策略分散、审计困难。",
        "做 HTTP/MCP 网关：付款、购买域名、部署、删除资源、发送邮件等动作按规则自动批准、限额或人工审核。",
        "通过开源 SDK 和 x402/MCP 示例获客，企业版卖策略、SSO、审计、预算和私有部署。",
        "支付协议和平台变化快，必须保持协议中立，聚焦审批与审计。",
        "做一个代理可调用的 paid API demo，模拟 20 个付款/部署动作，找 Agent 开发者接入测试。",
      ),
      opportunity(
        "移动端 Agent 任务调度器",
        "流量好，付费待验",
        [78, 76, 76],
        "TRAE SOLO Mobile、手机管理 Claude Agent 说明用户想随时下发任务，手机成为意图入口。",
        "现在任务散在聊天、IDE、桌面 App 和日历里，移动端只能发消息，缺少状态追踪和交接。",
        "做一个移动端任务面板：语音/文本下发、Agent 选择、进度卡片、失败重试和结果归档。",
        "面向重度 AI 工作者和团队管理者，通过移动端工作流模板传播，订阅高级并发和团队协作。",
        "平台会做原生移动端，独立产品需要跨 Claude/Codex/本地 Agent。",
        "找 20 个每天开多个 Agent 的用户，验证手机调度是否减少上下文切换。",
      ),
      opportunity(
        "Agent 设计规范生成器",
        "适合内容获客",
        [76, 82, 78],
        "DESIGN.md、Refero Styles、Open Slide 都说明 AI 前端生成需要结构化设计参考，独立开发者需求强。",
        "现在用户让 AI 模仿网站或凭感觉改 UI，结果风格不一致、组件混乱。",
        "输入品牌 URL 或截图，生成 DESIGN.md、组件规则、色板和 Agent 可执行的 UI 任务清单。",
        "靠免费设计审计和模板库 SEO 获客，付费点是批量品牌、团队规范、导出到 Cursor/Claude/Codex。",
        "设计工具和 AI IDE 会内置，必须做更好的参考库和跨工具格式。",
        "抽样分析 30 个高质量 SaaS 页面生成规范，让前端 Agent 用规范重做页面，对比设计一致性。",
      ),
    ],
    rejected: [
      "Anthropic/SpaceX 算力合作是重大行业信号，但普通 WebApp 很难从算力新闻本身切入。",
      "AI 营销提示词和开源 PPT 工具可做流量内容，但商业防御弱。",
      "主动式 Agent 大方向很大，但今天更清楚的付费点是动作审批和审计。",
    ],
    sources: [
      source("AI HOT 全量", "Apify mcpc 与 x402：给 AI Agent 装上自动付款的钱包", "https://x.com/shao__meng/status/2052397575446417822"),
      source("AI HOT 全量", "Cloudflare Agents 可创建账户、买域名并部署", "https://blog.cloudflare.com/agents-stripe-projects"),
      source("AI HOT 全量", "Claude Managed Agents 新增 Dreaming 与多代理协同", "https://the-decoder.com/claudes-new-dreaming-feature-is-designed-to-let-ai-agents-learn-from-their-mistakes"),
      source("AI HOT 全量", "GitHub：验证非确定性 Agent 行为", "https://github.blog/ai-and-ml/generative-ai/validating-agentic-behavior-when-correct-isnt-deterministic"),
      source("BuilderPulse", "BuilderPulse 2026-05-07 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-07.md"),
    ],
  },
  {
    date: "2026-05-06",
    title: "本地 AI 工作站、全模态视频和 4GB 浏览器模型：今天最值得做的是端侧 AI 资产与隐私扫描器",
    summary:
      "本地 AI 工作站、浏览器静默模型、端侧 GUI Agent 和全模态视频处理同时出现；最适合做的是帮个人和团队扫描本机 AI 资产、隐私和成本。",
    tags: ["端侧 AI", "隐私", "本地 Agent"],
    sourceTags: ["AI HOT 全量信号", "BuilderPulse"],
    scores: { commercial: 84, traffic: 82, wedge: 86 },
    winner: {
      name: "端侧 AI 资产与隐私扫描器",
      short:
        "扫描电脑上的本地模型、浏览器 AI 权限、Agent 配置、缓存和敏感数据访问，输出可执行清理与治理报告。",
    },
    conclusion: [
      "今天主题集中：Mac 本地 AI 工作站、Chrome 4GB 端侧模型、Downy 多 Agent、全模态豆包、个人 CLI 工具链和 Agent API 中转。",
      "BuilderPulse 同一天也强调 Chrome 静默安装 4GB AI 模型、DNSSEC 事故和 Computer Use 成本，说明 AI 落地开始进入磁盘、网络、默认设置和成本这些无聊但真实的层面。",
      "最靠谱的机会是端侧 AI 资产与隐私扫描器。它面向个人开发者、小团队和 IT 管理员，回答：我的机器上到底装了哪些模型、哪些插件能读什么、缓存占多少、有没有敏感文件暴露给 Agent。",
    ],
    opportunities: [
      opportunity(
        "端侧 AI 资产与隐私扫描器",
        "今日第一优先级",
        [84, 82, 86],
        "本地模型、浏览器 AI、Agent 插件和桌面自动化增多后，用户不知道本机有哪些 AI 资产和隐私暴露面。",
        "现在靠手动查 Chrome 设置、模型目录、插件权限和配置文件，普通用户几乎不会做。",
        "先做本地 CLI/桌面扫描：模型文件、浏览器 AI 开关、Agent 配置、API key、缓存大小、敏感目录访问建议。",
        "免费开源扫描器带来信任和流量，团队版卖策略基线、集中报告、设备清单和修复脚本。",
        "系统权限和误报风险高，必须透明、只读、可本地运行。",
        "发布 Windows/Mac 扫描器，收集 100 份匿名统计，验证用户是否愿意看并执行清理建议。",
      ),
      opportunity(
        "视频转图文技术博客 Agent",
        "内容生产明确",
        [78, 78, 80],
        "豆包全模态和视频转博客工作流说明技术视频、演示和课程可以被更好地转成文章。",
        "现有方案多靠 ASR + LLM，丢失代码、图表和屏幕上下文；人工整理耗时。",
        "输入 YouTube/B站/本地视频，按章节抽取截图、代码片段、图表说明和图文博客草稿。",
        "面向技术博主、课程作者和开发者关系团队，按视频时长、导出格式和团队知识库收费。",
        "版权和平台下载限制要处理，最好先支持用户上传和公开视频链接。",
        "找 10 个技术视频做样稿，让原作者评价是否能直接发布或只需少量修改。",
      ),
      opportunity(
        "AI API 成本路由记账本",
        "小团队刚需",
        [82, 72, 76],
        "API 中转站、Token Plan、模型价格内卷说明 Agent 成本管理正在成为真实问题。",
        "开发者在 OpenRouter、官方 API、中转站、云平台之间切换，账单分散且很难按项目归因。",
        "做统一用量代理和记账本，按项目、模型、Agent、任务记录成本，并推荐低成本替代。",
        "通过开源 SDK 和成本计算器获客，团队版按项目、预算告警、模型路由和报表收费。",
        "代理敏感请求会有信任障碍，需支持只读账单导入和本地部署。",
        "让 10 个 AI 工具开发者导入一周账单，看能否发现 20% 以上可节省成本。",
      ),
    ],
    rejected: [
      "Hy3、Doubao、SenseNova 等模型能力更新重要，但直接产品化需要更具体场景。",
      "AI API 中转站想象空间大，但监管、支付和信任门槛高，不适合做轻 WebApp 第一题。",
      "提示词合集和课程内容有流量，但商业价值弱于端侧隐私和成本问题。",
    ],
    sources: [
      source("AI HOT 全量", "Mininglamp-AI 开源 Cider 与 Mano-P，将 Mac 变为本地 AI 工作站", "https://x.com/xiaohu/status/2051975604355096926"),
      source("AI HOT 全量", "Chrome 可能静默下载 4GB 端侧 AI 模型", "https://www.ithome.com/0/947/544.htm"),
      source("AI HOT 全量", "豆包 Seed-2.0-lite 全模态理解", "https://www.ithome.com/0/947/010.htm"),
      source("AI HOT 全量", "AI API 中转站构建 Agent 时代底座", "https://x.com/AYi_AInotes/status/2051965264128798849"),
      source("BuilderPulse", "BuilderPulse 2026-05-06 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-06.md"),
    ],
  },
  {
    date: "2026-05-05",
    title: "企业部署、无密钥认证和敏感表单：今天最值得做的是 AI 工具密钥与数据泄露体检",
    summary:
      "企业部署、无密钥认证、医疗表单和密码内存信号共同指向一个清晰需求：面向团队的 AI 工具密钥、脚本和敏感数据泄露体检。",
    tags: ["数据泄露", "密钥安全", "企业 AI"],
    sourceTags: ["AI HOT 日报", "BuilderPulse"],
    scores: { commercial: 88, traffic: 74, wedge: 84 },
    winner: {
      name: "AI 工具密钥与数据泄露体检",
      short:
        "扫描网页表单、分析脚本、Agent 配置和 API key 使用方式，输出敏感数据外传与无密钥改造建议。",
    },
    conclusion: [
      "企业 AI 落地正在从“能不能接入”转向“接入后敏感数据和密钥会不会外泄”。",
      "Claude 平台推出无密钥认证，OpenAI/PwC 和 Anthropic 企业服务公司都在推企业 AI 落地；BuilderPulse 点出医疗表单把敏感语境共享给广告技术公司的风险。",
      "最值得做的是 AI 工具密钥与数据泄露体检。它从一个网站或代码仓库开始，检查表单数据是否流向广告脚本、Agent 配置是否硬编码 key、哪些工作负载可以改用 OIDC。",
    ],
    opportunities: [
      opportunity(
        "AI 工具密钥与数据泄露体检",
        "今日第一优先级",
        [88, 74, 84],
        "企业接入 AI 工具和分析脚本后，敏感数据可能通过表单、日志、prompt 或硬编码 key 外泄。",
        "现在靠安全团队人工 review、DLP、代码扫描和偶尔渗透测试，AI 工具配置常被漏掉。",
        "输入网站 URL 或 GitHub 仓库，扫描表单字段、第三方脚本、API key、Agent 配置和 OIDC 可改造点。",
        "用免费单页泄露检查器获客，团队版卖深度报告、持续监控、修复 PR 和合规导出。",
        "误报和法律表述要谨慎，必须展示证据链并建议人工复核。",
        "挑 50 个公开网站做被动扫描样例，联系 10 个网站负责人验证报告是否足够具体。",
      ),
      opportunity(
        "无密钥认证迁移助手",
        "窄但高价值",
        [84, 62, 82],
        "Claude 无密钥认证说明企业客户担心 API key 管理，云身份/OIDC 会成为 AI 平台接入标配。",
        "团队现在把 key 放在环境变量、CI secrets、个人机器或代理服务里，轮换困难。",
        "先支持 Claude/OpenAI/云工作负载：识别 key 使用点，生成 OIDC 迁移清单和配置片段。",
        "面向 DevOps 和平台工程团队，通过 key 风险报告获客，按仓库数和迁移工单收费。",
        "不同云和平台差异大，第一版必须选 AWS/GCP/Azure 中的一两个路径。",
        "找 5 个使用 AI API 的团队，扫描其 CI 和服务配置，看是否能识别可迁移 key。",
      ),
      opportunity(
        "AI 语音克隆授权水印工具",
        "流量强但合规重",
        [76, 82, 68],
        "Grok Voice 克隆显示个性化声音会快速普及，创作者和企业需要证明授权与标记。",
        "现在主要靠平台政策、合同和人工说明，用户难判断声音是否授权。",
        "做上传音频后的授权清单、水印嵌入、使用记录和公开验证页。",
        "面向播客、品牌客服和配音工作室，按授权人数、验证次数和团队协作收费。",
        "音频取证技术难，平台也可能内置；早期应做授权工作流而非声纹鉴定。",
        "找 10 个播客/配音创作者测试授权页面是否能减少客户疑虑。",
      ),
    ],
    rejected: [
      "KroWork、Cursor 插件、OpenClaw 更新有工具价值，但当日更强的商业压力来自企业身份和数据泄露。",
      "GPU 性能和模型加速是基础设施信号，小团队更适合作为成本变量观察。",
      "医疗 AI 诊断研究不能轻易产品化，合规和临床验证门槛过高。",
    ],
    sources: [
      source("AI HOT 日报", "Claude 平台推出无密钥验证方案", "https://x.com/ClaudeDevs/status/2051393709619732758"),
      source("官方", "OpenAI 与 PwC 合作重塑 CFO 办公室", "https://openai.com/index/openai-pwc-finance-collaboration"),
      source("官方", "Anthropic 企业 AI 服务公司", "https://www.anthropic.com/news/enterprise-ai-services-company"),
      source("BuilderPulse", "BuilderPulse 2026-05-05 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-05.md"),
      source("BuilderPulse", "医疗市场追踪：敏感数据共享给广告技术公司", "https://techcrunch.com/2026/05/04/us-healthcare-marketplaces-shared-citizenship-and-race-data-with-ad-tech-giants/"),
    ],
  },
  {
    date: "2026-05-04",
    title: "Runway 角色、AI 创业压力测试和遥测退出：今天最值得做的是 AI 产品信任与遥测审计器",
    summary:
      "Runway 角色、AI 创业压力测试、VS Code Copilot 署名、DO_NOT_TRACK 和 TUI 可访问性信号共同指向一个机会：产品信任与遥测审计器。",
    tags: ["产品信任", "遥测", "开发者工具"],
    sourceTags: ["AI HOT 日报", "BuilderPulse"],
    scores: { commercial: 82, traffic: 78, wedge: 84 },
    winner: {
      name: "AI 产品信任与遥测审计器",
      short:
        "扫描 App、网站和仓库里的遥测、AI 署名、数据发送和退出机制，生成给开发者和用户都能看懂的信任报告。",
    },
    conclusion: [
      "VS Code 自动插入 Copilot 共同作者、DO_NOT_TRACK、TUI 可访问性争议，都指向软件信任边界。",
      "Runway Characters、医疗 AI 诊断、Agent 工程方法和创业压力测试说明 AI 继续扩大能力；但能力越强，用户越在意产品是否诚实说明自己记录了什么、改了什么、发了什么。",
      "最值得做的是 AI 产品信任与遥测审计器，帮助开发者在被社区质疑前，先生成一份事实报告。",
    ],
    opportunities: [
      opportunity(
        "AI 产品信任与遥测审计器",
        "今日第一优先级",
        [82, 78, 84],
        "开发者工具和 AI 产品默认插入署名、遥测、模型调用后，用户需要可验证的透明说明。",
        "现在靠隐私政策、README、设置页和开发者口头解释，普通用户很难核对。",
        "扫描仓库和站点：遥测 SDK、网络请求、AI 署名、默认开关、退出机制和隐私文案一致性。",
        "对开源项目免费生成 trust badge，商业版卖持续监控、变更提醒、合规报告和品牌页。",
        "隐私审计容易引战，必须事实化，不做道德裁判。",
        "选 30 个开发者工具跑报告，发给维护者看是否愿意加 badge 或修正文档。",
      ),
      opportunity(
        "AI 创业想法压力测试器",
        "流量强，付费中等",
        [76, 84, 80],
        "Codex startup pressure test 方法说明创业者愿意让 AI 帮自己暴露假设和寻找首批客户。",
        "现在创业想法验证多停留在聊天、Notion 模板和朋友反馈，缺少强制问题和行动清单。",
        "做 Web 版压力测试：问题真实性、替代方案、首批 10 客户、两周验证动作和落地页文案。",
        "靠免费测评和分享图获客，付费点是多轮追踪、客户名单生成、访谈脚本和进度督促。",
        "容易变成泛创业内容工具，必须逼用户做线下验证而非只生成漂亮报告。",
        "让 50 个用户提交想法，追踪两周内是否完成 5 次真实用户访谈。",
      ),
      opportunity(
        "实时 AI 视频角色客服",
        "视觉冲击强",
        [80, 82, 66],
        "Runway Characters 让单张图生成实时对话视频角色，品牌客服、教育和创作者会想尝试。",
        "现在客服头像多是静态图或预渲染视频，真人直播成本高。",
        "先做小品牌 FAQ 视频角色：上传形象、知识库和声音，嵌入官网回答问题。",
        "靠 demo 和行业模板传播，按嵌入量、知识库、品牌角色和转化分析收费。",
        "平台能力会快速商品化，且实时视频成本高；独立产品要做垂直场景和转化闭环。",
        "给 5 个小品牌做官网角色，看是否提升停留和咨询转化，而不是只看新鲜感。",
      ),
    ],
    rejected: [
      "医疗诊断准确率新闻非常重要，但临床产品门槛远高于普通商业 WebApp。",
      "GPU 冷启动和推理加速适合基础设施团队，不适合今天的独立 WebApp 切口。",
      "TUI 可访问性争议可做设计审计的一部分，但单独市场较窄。",
    ],
    sources: [
      source("AI HOT 日报", "Runway Characters 技术解析", "https://runwayml.com/news/building-runway-characters"),
      source("AI HOT 日报", "Codex 创业压力测试提示词", "https://x.com/gdb/status/2050972114077843772"),
      source("AI HOT 日报", "Agent 工程问题集合", "https://x.com/shao__meng/status/2050892004188692616"),
      source("BuilderPulse", "BuilderPulse 2026-05-04 中文报告", "https://github.com/BuilderPulse/BuilderPulse/blob/main/zh/2026/2026-05-04.md"),
      source("BuilderPulse", "DO_NOT_TRACK 退出机制清单", "https://donottrack.sh/"),
    ],
  },
];

const opportunitySourceRefs = {
  "2026-05-29": [[0, 1, 2, 3, 4, 7, 16], [0, 5, 6, 16], [0, 8, 9, 10, 11, 12, 13, 16]],
  "2026-05-28": [[0, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [0, 16, 17, 19], [0, 18]],
  "2026-05-27": [[0, 1, 3, 4, 5, 6], [1, 2, 3, 7, 8, 9], [0, 1, 2, 10, 11, 13, 14]],
  "2026-05-26": [[0, 1, 3, 4, 5, 7, 8, 9], [0, 2, 6, 13], [0, 1, 10, 11, 12]],
  "2026-05-25": [[0, 1, 2, 3, 4, 5, 7, 8, 14], [0, 3, 5, 8, 9], [6, 10, 11, 13]],
  "2026-05-24": [[0, 2, 3, 4, 5, 7, 8, 9, 10, 22, 23], [0, 1], [0, 13, 14, 18]],
  "2026-05-23": [[0, 1, 2, 3], [4, 5, 6, 14, 15], [7, 8, 9, 10]],
  "2026-05-22": [[0, 1, 6, 7, 9], [2, 10, 16], [3, 4, 11, 12, 13]],
  "2026-05-21": [[1, 2, 5, 6], [0, 7, 8], [3, 4, 9]],
  "2026-05-20": [[0, 1], [2, 3], [4, 5, 6]],
  "2026-05-19": [[3, 4, 7, 8], [0, 1, 2, 7], [4, 5, 7]],
  "2026-05-18": [[0, 1, 2, 6, 7], [3, 8], [4, 5]],
  "2026-05-17": [[0, 1, 3, 4, 5, 6, 8], [0, 3, 7], [2, 8]],
  "2026-05-16": [[0, 1, 2, 3, 4, 7, 8], [5], [6]],
  "2026-05-15": [[0, 1, 2, 3, 7], [4, 5, 7], [6, 7]],
  "2026-05-14": [[3, 4, 5], [1, 2, 3], [0, 3]],
  "2026-05-13": [[0, 3, 4], [1, 4], [2, 4]],
  "2026-05-12": [[0, 1, 4], [2, 4], [3, 4]],
  "2026-05-11": [[0, 3, 4], [1, 4], [2, 4]],
  "2026-05-10": [[1, 2, 4], [0, 4], [3, 4]],
  "2026-05-09": [[1, 2, 3, 4], [0, 4], [2, 4]],
  "2026-05-08": [[0, 1, 4], [2, 4], [3, 4]],
  "2026-05-07": [[0, 1, 4], [2, 4], [3, 4]],
  "2026-05-06": [[0, 1, 4], [2, 4], [3, 4]],
  "2026-05-05": [[0, 3, 4], [0, 3], [3, 4]],
  "2026-05-04": [[3, 4], [1, 2, 3], [0, 3]],
};

const opportunityFrameworks = {
  "2026-05-23": [
    {
      scores: [
        { label: "需求强度", value: 9 },
        { label: "场景具体度", value: 10 },
        { label: "替代缺口", value: 9 },
        { label: "方案清晰", value: 9 },
        { label: "长期性", value: 9 },
        { label: "供需失衡", value: 9 },
        { label: "付费意愿", value: 9 },
      ],
      demand:
        "真实需求是内容所有者需要知道机器是否复用了自己的原创内容、是否给了署名、是否造成爬虫成本，以及自己能采取哪一步行动。",
      scenario:
        "场景是教程站、文档团队或独立出版者发现 AI 页面、答案引擎或复制站拿走了搜索流量，运营者需要证据去外联、授权、生成 llms.txt 或屏蔽爬虫。",
      alternatives:
        "现在靠手工搜索、查日志、写 robots.txt、社区发帖和法律咨询。用户会做，但证据散、成本高，也不清楚该开放机器访问还是禁止。",
      solution:
        "输入 URL、sitemap、样例文章或访问日志，输出疑似复用片段、缺失署名、搜索快照、llms.txt 准备度、爬虫压力和下一步外联/授权/屏蔽建议。",
      durability:
        "长期存在。AI 答案、爬虫和机器访问会持续扩大；短期也处在供需失衡期，因为出版者已经感到流量和成本压力，但工具层很少给具体证据。",
      pricing:
        "首次审计 $29-99；个人站点月度监控 $19-49/月；文档团队、媒体和垂直教程业务可为日志解析、白标报告和授权模板付 $99-499/月。",
    },
    {
      scores: [
        { label: "需求强度", value: 9 },
        { label: "场景具体度", value: 9 },
        { label: "替代缺口", value: 8 },
        { label: "方案清晰", value: 8 },
        { label: "长期性", value: 9 },
        { label: "供需失衡", value: 8 },
        { label: "付费意愿", value: 8 },
      ],
      demand:
        "真实需求是工程团队把测试、权限、密钥和多步骤工作流交给 Agent 后，需要一份 reviewer 能接受的验收证据。",
      scenario:
        "场景是团队用 TestSprite、buildpipe、DCP 或自建 Agent 跑测试/修复/部署，负责人想知道它测试了什么、没测什么、碰了哪些权限和密钥。",
      alternatives:
        "现在靠测试报告、PR diff、工具日志和开发者口头解释。它们分散在不同系统里，不能直接回答是否可以合并或交付。",
      solution:
        "做 GitHub/CI 旁路报告，导入测试结果、Agent 轨迹、权限清单和密钥范围，输出覆盖、缺口、权限触达、人工接管点和 merge checklist。",
      durability:
        "长期存在。Agent 越能执行真实开发流程，测试和权限验收越会成为团队协作刚需。",
      pricing:
        "开源基础 PR bot 免费；团队版 $49-299/月；私有部署、SSO、审计留存和自定义规则可 $5k-25k/年。",
    },
    {
      scores: [
        { label: "需求强度", value: 9 },
        { label: "场景具体度", value: 9 },
        { label: "替代缺口", value: 8 },
        { label: "方案清晰", value: 8 },
        { label: "长期性", value: 8 },
        { label: "供需失衡", value: 8 },
        { label: "付费意愿", value: 8 },
      ],
      demand:
        "真实需求是团队需要知道 AI 订阅、token、模型降价、并发和 Agent 重试背后的真实任务成本，避免固定价格幻觉。",
      scenario:
        "场景是 founder 看到 $200 订阅背后可能跑出极高 token 成本，或企业发现某些 AI 任务比人工更贵，需要拆解成本来自哪里。",
      alternatives:
        "现在靠 provider dashboard、账单、Excel 和粗略估算。它们能看总额，但不能解释任务、成员、重试、模型选择和人工复核成本。",
      solution:
        "上传账单导出、usage CSV 或任务样本，生成异常任务、补贴消耗、模型替代建议、人工对比成本和预算硬上限。",
      durability:
        "长期存在。模型会降价，但 Agent 任务会变长、并发会升高，团队仍需要任务级经济性判断。",
      pricing:
        "一次性账单体检 $19-99；小团队持续监控 $49-299/月；企业私有接入和财务视图 $5k/年起。",
    },
  ],
  "2026-05-20": [
    {
      scores: [
        { label: "需求强度", value: 10 },
        { label: "场景具体度", value: 10 },
        { label: "替代缺口", value: 9 },
        { label: "方案清晰", value: 9 },
        { label: "长期性", value: 9 },
        { label: "供需失衡", value: 10 },
        { label: "付费意愿", value: 9 },
      ],
      demand:
        "真实需求不是“再扫一次依赖漏洞”，而是团队在 npm 包投毒或可疑安装后，需要快速确认 AI 编码助手、编辑器任务、CI 和本机环境里有没有留下会继续运行的入口，以及哪些凭证必须马上撤销。",
      scenario:
        "场景是一个 JS/TS SaaS 团队看到依赖污染通报后，工程负责人要在当天给 CTO 一个答复：哪些开发机装过可疑版本，哪些仓库有异常 postinstall、Claude Code/Codex hooks、VS Code tasks、GitHub Actions 改动，哪些 npm token、云凭证和本地 secrets 有暴露风险。",
      alternatives:
        "现有替代方案是 SCA、secret scanner、Dependabot、手工 grep、查 shell history、翻 workflow diff 和群里问人。团队确实会用，但它们分散且容易漏掉 AI 助手启动 hooks、编辑器自动任务和本地持久化点。",
      solution:
        "第一版做本地 CLI/GitHub Action，只读扫描仓库和开发机配置，输出感染清理报告：可疑脚本、hooks、tasks、workflow、npmrc、环境变量线索、凭证轮换优先级和复检命令。",
      durability:
        "长期存在。AI 编码助手会越来越多地接管命令、文件和 CI 自动化，攻击者会继续找这些高信任路径；短期也处在强供需失衡期，因为攻击已经出现，而团队清理手册还很旧。",
      pricing:
        "个人开发者可能只愿意用免费 CLI；小团队可为团队报告、Slack 告警、历史留存和策略模板付 $49-299/月；出现事件时的应急清理包可按仓库或团队收 $2k-10k。",
    },
    {
      scores: [
        { label: "需求强度", value: 8 },
        { label: "场景具体度", value: 9 },
        { label: "替代缺口", value: 8 },
        { label: "方案清晰", value: 8 },
        { label: "长期性", value: 8 },
        { label: "供需失衡", value: 8 },
        { label: "付费意愿", value: 8 },
      ],
      demand:
        "真实需求是搜索入口被 AI 答案、AI Mode、生成式界面和行动入口改写后，依赖搜索获客的团队需要知道自己是否还被正确引用、是否被竞品替代、是否被错误摘要。",
      scenario:
        "场景是一个 SaaS、文档站或本地服务老板发现传统排名还在，但 AI 搜索回答把竞品放在前面，或者把自己的价格、功能、支持地区、集成方式说错。增长团队需要一份能持续追踪的问题清单，而不是一次截图。",
      alternatives:
        "现在靠 Search Console、传统 SEO 工具、手工搜索和截图。它们能看排名和点击，但不擅长记录 AI 答案文本、引用源、竞品出现、错误描述和多轮问题变化。",
      solution:
        "输入品牌、竞品、目标页面、地区和高意图查询，定期生成 AI 搜索快照：答案摘要、引用 URL、竞品占位、错误陈述、缺失结构化数据、页面改写建议和历史变化。",
      durability:
        "长期存在，但规则会不断变化。产品不应卖固定技巧，而应卖持续监控、错误发现和内容修复建议。",
      pricing:
        "个人站长可付 $19-49/月；小型品牌、本地服务和 SaaS 可付 $99-299/月；代理商版按客户数、查询量和报告频率收费，可到 $499+/月。",
    },
    {
      scores: [
        { label: "需求强度", value: 9 },
        { label: "场景具体度", value: 9 },
        { label: "替代缺口", value: 8 },
        { label: "方案清晰", value: 8 },
        { label: "长期性", value: 9 },
        { label: "供需失衡", value: 8 },
        { label: "付费意愿", value: 8 },
      ],
      demand:
        "真实需求是团队让 Agent 自动写测试、修复、调用工具和分析用户行为以后，需要知道它为什么成功、在哪里失败、哪些动作被护栏拦住、哪些结果已经人工确认。",
      scenario:
        "场景是工程团队用 AI 生成移动测试、修 PR 或运行产品分析。CI 输出、聊天记录、测试报告和工具日志都在，但 reviewer/QA/负责人想看的是一条任务从生成到执行再到修复的完整证据。",
      alternatives:
        "现在靠工具自带日志、CI 控制台、测试平台截图和开发者解释。它们能复盘局部，但缺少跨工具时间线、护栏命中记录、人工接管点和负责人可读报告。",
      solution:
        "先做 Agent task receipt：接入 GitHub Actions、测试结果和 Agent 日志，记录步骤、工具调用、失败、重试、guardrail 命中、人工确认和最终产物，用一页报告给 reviewer/QA 验收。",
      durability:
        "长期存在。Agent 执行能力越强，团队越需要可复查的行动证据；短期供给不足，因为工具在强调自动完成，负责人仍要自己拼日志。",
      pricing:
        "开源 GitHub Action 免费获客；小团队按仓库、任务数、历史留存和报告导出付 $49-299/月；企业加策略模板、SSO、审计留存和私有部署后可 $5k-25k/年。",
    },
  ],
  "2026-05-19": [
    {
      scores: [
        { label: "需求强度", value: 9 },
        { label: "场景具体度", value: 10 },
        { label: "替代缺口", value: 9 },
        { label: "方案清晰", value: 9 },
        { label: "长期性", value: 8 },
        { label: "供需失衡", value: 8 },
        { label: "付费意愿", value: 9 },
      ],
      demand:
        "真实需求是用户在 AI 工具里生成了大量可交付资产以后，开始担心项目是否能离开当前平台。退订、客户交接、团队成员离职、工具涨价和平台功能变化，都会让“能不能拿回工作”变成急事。",
      scenario:
        "场景是一个 agency owner 准备交付客户项目：资料散在 Notion、Claude Design、Grok 生成的 PPT/PDF、Google Drive、Obsidian vault 和聊天记录里。客户要源文件，团队要退订部分工具，负责人需要知道哪些资产可以恢复。",
      alternatives:
        "替代方案是手工导出、截图、下载 account data、靠个人记忆整理文件夹。用户确实会做，但很容易漏掉附件、评论、权限、模板依赖、外链和格式兼容问题。",
      solution:
        "做一个 WebApp，先支持上传导出包或连接只读 API，自动生成资产清单、导出可读性、依赖风险、退订前 checklist 和一页迁移收据。第一版只做检查和报告，不做自动迁移。",
      durability:
        "长期存在。AI 工具越能生成工作成果，用户越需要确认成果归属；短期也处在供需失衡期，因为生成和托管能力先爆发，跨工具恢复能力还很弱。",
      pricing:
        "个人 founder 可为单次项目体检付 $9-29；agency 可为客户空间、白标报告和定期复检付 $49-199/月；团队版加入权限、历史留存和 SSO 后可到 $3k-12k/年。",
    },
    {
      scores: [
        { label: "需求强度", value: 9 },
        { label: "场景具体度", value: 9 },
        { label: "替代缺口", value: 8 },
        { label: "方案清晰", value: 8 },
        { label: "长期性", value: 9 },
        { label: "供需失衡", value: 8 },
        { label: "付费意愿", value: 9 },
      ],
      demand:
        "真实需求是企业开始让 Agent 连接代码、网页、内网服务和 API，但安全/平台负责人需要在批准前看到边界：它能碰什么、实际碰了什么、哪些调用需要审批。",
      scenario:
        "场景是平台团队试点 Claude Managed Agents 或自研 MCP Agent：开发者已经配好工具和隧道，安全负责人问哪些私有服务会暴露、哪些凭据会被传递、日志能不能审计。",
      alternatives:
        "现在靠平台配置页、云日志、MCP JSON、开发者解释和截图。它们分散在不同系统里，缺少跨 Agent、跨工具、面向负责人审批的一张报告。",
      solution:
        "导入 MCP/Agent 配置、工具清单、域名、凭据范围和调用日志，输出权限矩阵、风险分级、审批建议和整改 checklist。先做只读审计，再做审批流。",
      durability:
        "长期存在。Agent 执行能力越强，边界审计越刚需；平台会补局部功能，但跨平台报告和组织策略仍需要独立层。",
      pricing:
        "开源配置检查器免费获客；小团队版 $99-399/月；企业私有部署、SSO、审计留存和策略模板可 $10k-50k/年。",
    },
    {
      scores: [
        { label: "需求强度", value: 8 },
        { label: "场景具体度", value: 8 },
        { label: "替代缺口", value: 8 },
        { label: "方案清晰", value: 8 },
        { label: "长期性", value: 8 },
        { label: "供需失衡", value: 9 },
        { label: "付费意愿", value: 7 },
      ],
      demand:
        "真实需求是 Google AI Search、AI Mode 和生成式界面改变用户发现内容的方式后，站长、品牌和本地服务需要知道自己是否仍被正确引用和推荐。",
      scenario:
        "场景是一个依赖搜索线索的 SaaS 或本地服务：老板发现传统排名还在，但 AI 答案把竞品放在前面，或者错误解释了自己的价格、功能和服务地区。",
      alternatives:
        "现在靠手工搜索、Search Console、传统 SEO 工具和截图。它们不擅长持续记录 AI 答案、引用源、生成式 UI 行动入口和上下文变化。",
      solution:
        "输入关键词、地区、竞品和目标页面，定期生成 AI 搜索快照：答案文本、引用源、竞品出现、错误描述、结构化数据建议和内容缺口。",
      durability:
        "长期存在，但规则变化快。产品应卖监控和行动建议，不卖固定的 AI SEO 技巧。",
      pricing:
        "个人站长 $19-49/月；小型品牌/本地服务 $99-299/月；代理商版按客户数和报告频率收费，可到 $499+/月。",
    },
  ],
  "2026-05-18": [
    {
      scores: [
        { label: "需求强度", value: 9 },
        { label: "场景具体度", value: 10 },
        { label: "替代缺口", value: 9 },
        { label: "方案清晰", value: 9 },
        { label: "长期性", value: 9 },
        { label: "供需失衡", value: 8 },
        { label: "付费意愿", value: 9 },
      ],
      demand:
        "真实需求是工程团队让 Agent 改代码之后，需要知道它到底基于哪些搜索和文件阅读做判断。否则 reviewer 只能重新搜一遍，Agent 省下的时间又被复核吃掉。",
      scenario:
        "场景是工程经理或 senior engineer 审一个 Agent 生成的 PR：Agent 声称修好了登录 bug，但仓库里有三套 auth 逻辑、两个同名 helper、一个 legacy 目录。reviewer 想知道它有没有搜全、有没有漏掉测试和敏感路径。",
      alternatives:
        "现在的替代方案是看聊天记录、终端日志、grep 输出和 PR diff。团队确实在用，但不好用：日志散、不可复跑、没有遗漏清单，也没有 token 成本和敏感文件触达说明。",
      solution:
        "做一个本地 CLI/GitHub Action，包装 rg、Semble、grep 和 Agent 文件读取日志，任务结束后生成 HTML 收据。第一版不阻止 Agent，只回答“它搜了什么、没搜什么、证据在哪”。",
      durability:
        "这是长期需求。Agent 越能独立改代码，组织越需要可复查证据；短期还处在供需失衡期，因为工具先把 Agent 执行能力放出来，审计和复核层明显落后。",
      pricing:
        "个人开发者大概愿意为本地报告付 $0-9/月；小团队如果能接 GitHub Action 和保留历史，$49-199/月合理；安全要求高的企业可为私有部署和审计留存付 $5k-25k/年。",
    },
    {
      scores: [
        { label: "需求强度", value: 8 },
        { label: "场景具体度", value: 9 },
        { label: "替代缺口", value: 8 },
        { label: "方案清晰", value: 8 },
        { label: "长期性", value: 8 },
        { label: "供需失衡", value: 8 },
        { label: "付费意愿", value: 8 },
      ],
      demand:
        "真实需求不是“生成一个更漂亮页面”，而是产设研团队需要把 AI 生成的设计稿和代码交付给真实产品时，确认它是否符合组件库、品牌、响应式和可维护性要求。",
      scenario:
        "场景是产品经理用 Ardot/Kimi/Figma AI 生成了一个活动页，前端要接入现有 React 组件库，设计师要保证品牌一致，增长团队还希望页面能上线测试。问题是生成结果看起来能用，但落地时返工很多。",
      alternatives:
        "现在靠人工 design review、code review、截图对比、Figma 标注和 Lighthouse/axe。团队会用这些方法，但它们分散，而且无法直接解释“AI 生成稿哪里不适合进入代码库”。",
      solution:
        "做上传设计导出和 PR 的质检台：检查组件匹配率、设计 token 偏差、断点、无障碍、重复样式和可维护性，输出逐项 checklist 和可导出的交付报告。",
      durability:
        "长期存在。只要 AI 继续降低设计稿生产成本，交付质量和团队规范就会成为新瓶颈；当前也处在供需失衡期，因为生成工具多，验收工具少。",
      pricing:
        "自由设计师或独立开发者可能付 $9-19/月；小团队为项目审查和组件库绑定可付 $49-299/月；中大型团队如果接 CI 和设计系统，可付 $3k-15k/年。",
    },
    {
      scores: [
        { label: "需求强度", value: 8 },
        { label: "场景具体度", value: 8 },
        { label: "替代缺口", value: 7 },
        { label: "方案清晰", value: 8 },
        { label: "长期性", value: 7 },
        { label: "供需失衡", value: 9 },
        { label: "付费意愿", value: 7 },
      ],
      demand:
        "真实需求是创作者、品牌和 MCN 用 AI 图像/视频发内容前，需要降低虚假内容、未标注、侵权、平台下架和客户投诉风险。",
      scenario:
        "场景是运营团队用 Grok Imagine 或其他工具批量生成短视频和广告图，准备发到 X、抖音、小红书或客户账号。素材看起来能爆，但团队不确定是否要标注 AI、是否像真实灾害/景区事件、是否会被平台或监管处罚。",
      alternatives:
        "现在靠平台自带水印、人工审核、内容政策搜索和事后下架。有人会用，但很粗糙：政策分散、素材批量多、客户交付时缺少一份说明自己做过审核的证据。",
      solution:
        "做发布前风险收据：上传图片/视频，生成平台规则提醒、AI 标注建议、敏感场景分类、免责声明、来源留存和客户可读报告。它不是绝对鉴伪，而是发布流程和责任证据。",
      durability:
        "中长期会存在，但规则会被平台部分吸收。短期供需失衡非常明显：生成能力爆发、分发速度极快，而品牌安全和监管解释跟不上。",
      pricing:
        "个人创作者可能只愿意付 $5-15/月；MCN/品牌小团队如果支持批量审查和白标报告，可付 $49-199/月；平台/代理商 API 形态可到 $5k+/年。",
    },
  ],
};

const opportunityDeepDives = {
  "2026-05-29": [
    {
      subtitle:
        "把 MCP、IDE Agent、云 Agent、API key 和支付工具放进同一张权限账本，让负责人知道哪些工具可以继续放权。",
      thesis:
        "Agent Tool Policy Ledger 的核心判断是：Agent 采用的下一阶段瓶颈不是模型能不能调用工具，而是组织能否解释每个 Agent 的身份、权限、调用、审批和回滚。最窄 MVP 是只读权限报告，不是替代 MCP 或 IDE。",
      whyNow: [
        "5 月 29 日的强信号集中在工具边界：Agent 身份与策略控制、Google Pay / Wallet MCP 工具、阿里云百炼 CLI、OpenAI 评估流程和 AI IDE 工作流同时出现。",
        "MCP 让工具连接变简单，也让权限边界变模糊。一个 Agent 能读文件、调 API、触发支付或修改项目后，负责人需要的是跨工具事实账本。",
        "BuilderPulse 最近报告持续强调本地优先、失败状态、所有权和收入漏点，说明用户对可解释、可导出、可止损的工作流越来越敏感。"
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工权限盘点",
          body:
            "先找 5-10 个已经使用 MCP、AI IDE 或云端 Agent 的团队，手工收集配置和最近调用，做一页权限账本。",
          features: [
            "列出每个 Agent、MCP server、API key、文件路径、外部域名和高风险工具。",
            "标注实际调用样本、批准人、失败后回滚路径和是否需要人工审批。",
            "输出三类建议：继续放权、改成审批、立即收回。"
          ],
        },
        {
          stage: "第 2 周",
          title: "只读导入原型",
          body:
            "把手工账本里最稳定的输入自动化，避免一开始就做网关或拦截器。",
          features: [
            "导入 MCP 配置、IDE 设置、GitHub token 范围、云端 Agent 日志和工具调用样本。",
            "生成权限矩阵和风险分级，支持导出 HTML/PDF 或 GitHub issue。",
            "为支付、部署、客户数据、文件写入和外发请求设置默认高风险规则。"
          ],
        },
        {
          stage: "第 3-4 周",
          title: "审批和历史留存",
          body:
            "当报告被负责人采用后，再做轻量审批和历史趋势，而不是一次性扫描结束。",
          features: [
            "Slack/GitHub 审批：高风险工具调用需要负责人确认。",
            "历史趋势：新增工具、新增权限、异常调用和未使用权限。",
            "私有部署：适合代码、凭据和客户数据敏感的团队。"
          ],
        }
      ],
      technical: [
        {
          title: "输入边界",
          status: "只读优先",
          body:
            "第一版只读取配置、日志和权限范围，不代理真实调用，降低接入阻力和安全责任。"
        },
        {
          title: "风险模型",
          status: "规则优先",
          body:
            "支付、部署、客户数据、外部请求、文件写入、凭据读取和生产 API 调用必须是明确规则，LLM 只负责解释报告。"
        },
        {
          title: "数据保存",
          status: "默认保守",
          body:
            "保存结构化元数据即可，原始日志和配置默认本地处理或脱敏，避免把安全产品做成新的泄露点。"
        }
      ],
      goToMarket: [
        "第一批用户是已经让 Agent 进入真实流程的 AI-heavy 工程团队、MCP 工具作者、平台团队、安全负责人和小型 AI coding agency。",
        "冷启动内容可以做公开样板：一个 MCP 工作区有多少工具、哪些工具能触达支付或客户数据、哪些权限从未使用却一直开放。",
        "销售话术不要说“治理平台”，要说“本周哪些 Agent 工具可以继续放权，哪些必须审批或收回”。"
      ],
      pricing: [
        { name: "免费检查器", body: "本地扫描一个工作区，输出基础权限矩阵，用来获得开发者采用。" },
        { name: "团队版 $199-799/月", body: "多仓库、多 Agent、历史留存、审批流、Slack/GitHub 报告和策略模板。" },
        { name: "私有部署 $8k/年起", body: "SSO、审计留存、自定义规则、离线运行和敏感日志不出域。" }
      ],
      validation: [
        {
          week: "第 1 周：手工账本",
          body:
            "为 10 个真实团队做权限账本，记录他们是否根据报告收回、审批或重命名某个工具权限。"
        },
        {
          week: "第 2 周：只读原型",
          body:
            "支持 MCP 配置和 GitHub token 范围导入，观察团队是否愿意每周重复生成报告。"
        },
        {
          week: "成功标准",
          body:
            "5 个团队采取具体权限动作，2 个团队愿意为历史留存或审批配置付费，且负责人能把报告转发给安全或工程管理层。"
        }
      ],
      risks: [
        "平台会补自己的权限页，所以产品必须跨平台，并输出负责人可行动的审批建议。",
        "权限数据高度敏感，默认本地运行和脱敏是产品信任前提。",
        "如果团队还没有真实 Agent 工具调用，需求会显得超前；首批用户必须来自已经被权限和日志拖慢的人群。",
        "不要过早承诺自动阻断所有风险，先把证据、分级和人工决策做好。"
      ],
    },
    {
      subtitle:
        "把 AI 生成代码量、工具调用、测试缺口和 reviewer 负载，变成工程负责人每周能用的一页复查债务报告。",
      thesis:
        "AI Coding Throughput & Review Debt Meter 的核心判断是：AI 编码工具提升产出后，团队真正缺的是复查能力的容量规划。最窄 MVP 是 AI PR 周报，而不是完整研发效能平台。",
      whyNow: [
        "Cursor 开发者习惯报告显示代码输出、工具调用和 AI 代码留存持续上升，说明 AI 编码已经进入高频生产。",
        "Claude Code 工作流、子 Agent、钩子和动态配置让 AI 编程流程更强，也更难靠普通 PR diff 解释。",
        "团队需要知道 AI 让多少代码进入 review、哪些模块风险上升、测试是否跟上、reviewer 是否成为新瓶颈。"
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工 AI PR 周报",
          body:
            "选 20 个近期 AI 辅助 PR，手工整理代码量、测试、评论、返工、合并时间和上线风险。",
          features: [
            "AI 产出：新增/删除代码、文件类型、敏感模块和生成工具。",
            "复查债务：review 轮次、等待时间、测试失败、返工 commit 和未覆盖路径。",
            "一页建议：哪些类型的 AI PR 需要更强 gate，哪些可以继续放开。"
          ],
        },
        {
          stage: "第 2 周",
          title: "GitHub 只读原型",
          body:
            "接 GitHub、CI 和手工粘贴的 AI 会话摘要，自动生成周报草稿。",
          features: [
            "按仓库和模块聚合 AI PR 风险。",
            "把 CI 失败、测试缺口、大 diff、无 reviewer 和敏感文件做规则评分。",
            "在 PR comment 中输出复查 checklist，而不是阻断开发者。"
          ],
        },
        {
          stage: "第 3-4 周",
          title: "团队容量规划",
          body:
            "当周报被负责人使用后，再扩展到 reviewer 分配和月度趋势。",
          features: [
            "识别 review 过载人员和高风险模块。",
            "跟踪 AI PR 的返工率、事故回溯和测试改善。",
            "把报告导出给 CTO、客户安全评审或项目负责人。"
          ],
        }
      ],
      technical: [
        {
          title: "输入",
          status: "GitHub/CI 先行",
          body:
            "第一版只读 PR、commit、CI、review comments 和测试报告；AI 会话可以先手工粘贴摘要。"
        },
        {
          title: "判断",
          status: "可追溯规则",
          body:
            "风险来自文件、diff、测试、评论和历史事故，LLM 只负责解释，不替 reviewer 做最终合并判断。"
        },
        {
          title: "隐私",
          status: "不保存代码正文",
          body:
            "默认保存指标和引用，不保存完整代码内容；企业版再提供私有部署。"
        }
      ],
      goToMarket: [
        "先服务已经用 Cursor、Claude Code、Codex 或 OpenCode 的 5-50 人工程团队。",
        "用免费 AI PR 周报获客，让团队看到复查债务和 reviewer 瓶颈。",
        "销售语言要围绕“少让 reviewer 被 AI 产出压垮”，而不是泛泛提高开发效率。"
      ],
      pricing: [
        { name: "免费周报", body: "单仓库、最近 20 个 PR、基础复查债务指标。" },
        { name: "团队版 $99-499/月", body: "多仓库、历史趋势、PR comment、风险规则和 reviewer 负载。" },
        { name: "企业版 $5k/年起", body: "私有部署、SSO、审计留存、自定义规则和事故回溯。" }
      ],
      validation: [
        { week: "第 1 周：手工报告", body: "为 5 个 AI-heavy 团队做周报，看负责人是否愿意据此调整 review 或测试策略。" },
        { week: "第 2 周：PR comment 原型", body: "在真实 PR 中贴复查 checklist，观察 reviewer 是否节省时间。" },
        { week: "成功标准", body: "至少 3 个团队愿意连续两周跑报告，2 个团队愿意为历史趋势或规则配置付费。" }
      ],
      risks: [
        "容易变成泛研发效能工具，必须聚焦 AI 引入后的新增复查成本。",
        "AI 使用标记不总是可靠，产品要允许人工标注和不确定性。",
        "如果报告只批评开发者，会被抵触；输出必须帮助团队分配复查资源。"
      ],
    },
    {
      subtitle:
        "给 AI 生成的镜头、音效、角色、3D 和音乐资产一张客户能收下的来源、授权和标注收据。",
      thesis:
        "AI Production Asset Receipt 的核心判断是：多模态生成进入真实交付后，agency 和品牌缺的不是更多生成按钮，而是能解释素材从哪里来、能不能商用、是否要标注 AI 的交付证据。",
      whyNow: [
        "Kling AI 短片、ControlFoley、PixVerse、Rodin Gen-2.5 和 Stable Audio 3.0 同日出现，说明视频、音效、角色、3D 和音乐生成正在形成生产链。",
        "当 AI 素材从实验进入客户项目，团队需要保留模型、版本、提示词摘要、来源链接、授权状态和平台发布风险。",
        "现有素材管理工具能管理文件，但不擅长解释 AI 生成资产的合规和客户交付边界。"
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工素材收据",
          body:
            "找 5 个真实 AI 视频、广告或游戏资产项目，手工整理客户交付收据。",
          features: [
            "资产清单：镜头、音效、角色、3D、音乐、字幕和最终导出文件。",
            "来源记录：工具、模型版本、提示词摘要、参考素材、生成时间和修改人。",
            "风险提示：商用授权、AI 标注建议、平台限制、客户二次编辑边界。"
          ],
        },
        {
          stage: "第 2 周",
          title: "项目上传原型",
          body:
            "支持上传文件夹、CSV 或生产工具导出，生成可分享客户交付页。",
          features: [
            "按素材类型自动分组，允许人工补全模型和授权字段。",
            "为每个资产生成客户可读说明和内部复查状态。",
            "导出 HTML/PDF，作为项目交付附件。"
          ],
        },
        {
          stage: "第 3-4 周",
          title: "团队白标交付",
          body:
            "当 agency 愿意把收据发给客户后，再做团队空间和白标报告。",
          features: [
            "项目模板：广告、短片、游戏资产、社媒素材。",
            "客户门户：查看资产、授权说明、版本和下载链接。",
            "发布前 checklist：平台 AI 标注、敏感场景、素材来源留存。"
          ],
        }
      ],
      technical: [
        {
          title: "输入",
          status: "文件夹 + 表单",
          body:
            "早期不追求自动识别所有工具，先用上传文件夹和结构化表单收集来源与授权信息。"
        },
        {
          title: "判断",
          status: "不做法律结论",
          body:
            "产品给出风险提示和证据留存，不承诺法律意见；高风险资产提示用户咨询专业意见。"
        },
        {
          title: "交付",
          status: "客户可读",
          body:
            "输出必须像交付附件，而不是内部素材库；客户能看懂来源、边界和下一步动作。"
        }
      ],
      goToMarket: [
        "先找小型 agency、短视频团队、游戏美术外包和品牌内容团队，他们已经在用 AI 交付但缺少标准说明。",
        "内容分发可以拆解一个 AI 短片项目：哪些资产需要来源记录，哪些地方最容易客户追责。",
        "白标报告是关键付费点，因为 agency 需要把专业感和风控能力展示给客户。"
      ],
      pricing: [
        { name: "单项目免费", body: "最多 20 个资产，带水印收据，用于验证客户是否接受。" },
        { name: "团队版 $49-249/月", body: "项目空间、白标报告、客户链接、批量资产和历史留存。" },
        { name: "Agency 版 $499/月起", body: "多客户空间、模板库、审批流程、品牌域名和导出包。" }
      ],
      validation: [
        { week: "第 1 周：手工交付", body: "为 5 个 AI 内容项目手工做收据，看客户是否愿意接收并提出补充字段。" },
        { week: "第 2 周：白标测试", body: "让 3 个 agency 用自己的品牌发给客户，验证是否提升信任和交付效率。" },
        { week: "成功标准", body: "至少 2 个 agency 愿意为白标收据付费，客户能指出收据降低了哪类交付疑虑。" }
      ],
      risks: [
        "如果只做文件管理，会被现有 DAM 替代；必须围绕 AI 来源、授权、标注和交付证据。",
        "法律边界复杂，产品必须明确自己是证据和流程工具，不是法律裁判。",
        "创作者可能不愿录入字段，MVP 要先证明客户会要求这类收据。"
      ],
    },
  ],
  "2026-05-28": [
    {
      subtitle:
        "把一次 Agent 任务的 token、工具、权限、失败和人工接管点，压成负责人能签字的一页账本。",
      thesis:
        "Agent Spend & Blast Radius Ledger 的核心判断是：Agent 采用的下一轮预算不会只看“能不能自动做”，而会看每次自动化是否省钱、是否越权、失败时影响范围多大。最窄 MVP 是任务级报告，不是替代 IDE 或云平台。",
      whyNow: [
        "当天最强信号集中在成本与权限：微软、Uber 重估 AI 支出，Agent token 消耗被管理层质疑，同时 Agent 爆炸半径、安全边界和 SRE 任务失败率被反复讨论。",
        "Qoder Cloud Agents、ANOLISA、MSE AI 调度器、MuleRun 和 MCP 相关信号说明 Agent 正在进入企业运行环境；一旦进入运行环境，就需要日志、隔离、审批和可解释账本。",
        "BuilderPulse 同日强调 local-first、失败状态、所有权和收入漏点，说明用户不只关心“能不能跑”，还关心失败时能否解释、导出和止损。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "只读导入与手工报告",
          body:
            "先不做实时网关。找 5-10 个重度使用 Agent 的团队，导入最近几次任务日志，手工生成成本与爆炸半径报告。",
          features: [
            "支持 Claude Code、Codex、OpenCode、GitHub PR、模型账单 CSV 和 MCP 配置的手工导入。",
            "按任务列出 token、模型、工具调用、文件/网络/凭据边界、失败点和人工复查时间。",
            "输出一页 HTML 报告：继续自动、改半自动、收窄权限或暂时禁用。"
          ],
        },
        {
          stage: "第 2 周",
          title: "规则化评分和团队留存",
          body:
            "把第一批报告中的共性判断沉淀成规则，避免变成纯咨询交付。",
          features: [
            "成本评分：模型单价、重复上下文、失败重试、人工复查和实际产出。",
            "爆炸半径评分：可读数据、可写路径、外发能力、支付/部署能力和回滚方式。",
            "团队空间：项目、任务历史、负责人备注和月度趋势。"
          ],
        },
        {
          stage: "第 3-4 周",
          title: "轻量审批与私有部署",
          body:
            "当报告被团队转发后，再做最小审批层，而不是一开始就拦截所有 Agent 动作。",
          features: [
            "MCP/HTTP wrapper：高风险工具调用进入人工批准队列。",
            "GitHub/Slack 通知：任务结束后自动发风险摘要和接管建议。",
            "私有部署：日志、代码和凭据不出域，适合安全敏感团队。"
          ],
        },
      ],
      technical: [
        {
          title: "事件模型",
          status: "先统一最小字段",
          body:
            "事件只需要 actor、tool、action、target、timestamp、cost、evidence、risk。不同工具的细节先保留原始 payload，避免解析器成为瓶颈。",
        },
        {
          title: "风险判断",
          status: "规则优先",
          body:
            "爆炸半径不能由 LLM 自由判断。第一版用路径、域名、权限、环境变量、支付/部署动作和外部请求做规则评分，LLM 只负责解释。"
        },
        {
          title: "成本计算",
          status: "允许粗估",
          body:
            "早期不用追求完全精确，只要能把模型用量、失败重试、人工复查和产出结果放在一张表里，负责人就能判断是否值得继续。"
        },
        {
          title: "部署边界",
          status: "本地优先",
          body:
            "涉及代码、日志、凭据和内部工具，MVP 应支持本地 WebApp + SQLite；团队版再做单租户云或私有部署。"
        }
      ],
      goToMarket: [
        "第一批用户是已经让 Agent 进入真实流程的团队：AI-heavy 工程团队、SRE/DevOps、MCP 工具作者、AI coding agency 和正在压缩模型账单的创始人。",
        "冷启动内容可以用公开案例做样板报告：一次 Agent coding session 花了多少、碰了哪些文件、失败后应不应该继续自动化。",
        "销售话术不要说“治理平台”，要说“本周哪些 Agent 任务值得继续跑，哪些会把账单或权限风险放大”。"
      ],
      pricing: [
        {
          name: "免费报告",
          body:
            "单次导入、最多 3 个任务、报告带水印。目标是让团队愿意上传真实日志并转发报告。",
        },
        {
          name: "团队版 $199-999/月",
          body:
            "任务历史、规则配置、项目空间、GitHub/Slack 通知、月度趋势和导出。",
        },
        {
          name: "私有部署 $8k/年起",
          body:
            "SSO、审计留存、自定义规则、离线运行和高风险审批，卖给安全敏感或工程规模较大的团队。",
        }
      ],
      validation: [
        {
          week: "第 1 周：手工账本",
          body:
            "找 10 个重度 Agent 用户导入最近 3-5 次任务，手工标注成本、权限和失败点，验证报告是否会被转发给负责人。",
        },
        {
          week: "第 2 周：付费触发",
          body:
            "把报告拆成成本版、安全版、工程复盘版，观察哪个版本最能触发持续使用或私有部署需求。",
        },
        {
          week: "成功标准",
          body:
            "至少 5 个团队愿意重复导入下一批任务，2 个团队愿意为历史留存或规则配置付费，并能明确说出报告替代了哪段复盘流程。",
        }
      ],
      risks: [
        "平台会补自己的日志，所以产品必须跨工具，并且输出负责人的决策语言，而不是复刻单平台 dashboard。",
        "日志可能包含敏感代码和凭据，必须默认本地运行、脱敏预览、只上传结构化事件。",
        "如果用户还没有高频 Agent 任务，需求会显得超前；首批用户必须来自已经被账单、权限或复查拖慢的人群。",
        "不要过早承诺自动阻断所有风险；先做证据、评分和人工接管建议。"
      ],
    },
    {
      subtitle:
        "给本地优先和自托管工具一套可读失败状态：数据在哪里、哪里坏了、用户下一步该做什么。",
      thesis:
        "Local-first Failure State Monitor 的核心判断是：本地优先工具的信任优势，最终取决于失败时能不能解释清楚。最窄切口不是再做一个同步引擎，而是把失败、导出、恢复和支持成本变成产品功能。",
      whyNow: [
        "BuilderPulse 同日把 OpenBrief、Posthorn、Open-source Workspace、自托管邮件/文档/文件和失败状态放在同一组信号里：用户可以接受粗糙，但不能接受静默失败。",
        "AI-free search、默认项逃生路线和 Last.fm 独立说明用户正在重新评估数据所有权；拥有数据的前提是出错时能找回、导出和迁移。",
        "自托管和 local-first 工具的商业化难点不是没有热情，而是支持成本高。失败状态报告能同时改善用户体验和维护者成本。"
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "失败状态模板",
          body:
            "先做一个独立 WebApp/SDK，让工具作者描述常见失败和恢复动作，生成用户可读错误报告。",
          features: [
            "失败分类：权限、网络、同步冲突、磁盘、格式、远端 API、导出失败。",
            "报告字段：数据位置、是否已保存、可重试动作、可导出路径、提交 issue 所需信息。",
            "用户可复制的一页错误报告，减少来回追问。"
          ],
        },
        {
          stage: "第 2 周",
          title: "本地健康检查",
          body:
            "把模板变成可运行检查，不碰敏感内容，只检查元数据和配置。",
          features: [
            "检查本地数据库、文件夹权限、同步队列、最近备份和导出能力。",
            "生成维护者可读诊断包，默认脱敏。",
            "提供嵌入组件：错误页、设置页健康状态、导出前检查。"
          ],
        },
        {
          stage: "第 3-4 周",
          title: "团队支持台",
          body:
            "当工具有付费用户后，把失败状态变成支持流程和 SLA 的一部分。",
          features: [
            "按版本、平台和错误类型聚合失败趋势。",
            "为付费团队保留诊断历史和恢复记录。",
            "支持自托管实例的离线诊断包。"
          ],
        }
      ],
      technical: [
        {
          title: "集成方式",
          status: "SDK + 手工模板",
          body:
            "先提供 JS/Node SDK 和手工表单，避免要求每个工具重构错误系统。",
        },
        {
          title: "隐私边界",
          status: "只看元数据",
          body:
            "默认不读取用户内容，只读取路径、大小、时间戳、错误码和同步状态，并让用户确认导出内容。",
        },
        {
          title: "报告格式",
          status: "HTML/Markdown 双输出",
          body:
            "报告要能贴到 GitHub issue、客服系统和邮件，也要能让普通用户直接看懂下一步。"
        }
      ],
      goToMarket: [
        "先找 Show HN、self-hosted、local-first 和开源工具作者，尤其是已有付费版但支持成本高的项目。",
        "内容分发可以做“失败状态评分”：选 20 个热门本地优先工具，评估它们出错时是否告诉用户数据在哪里。",
        "商业转化绑定支持成本：减少 issue 往返、减少退款、提高付费用户信任。"
      ],
      pricing: [
        { name: "开源免费", body: "基础模板和 SDK 免费，用来获得采用和反馈。" },
        { name: "团队版 $49-199/月", body: "错误聚合、诊断历史、品牌化报告和支持系统集成。" },
        { name: "企业/自托管 $2k/年起", body: "离线诊断包、私有规则、SLA 报告和内部支持流程。" }
      ],
      validation: [
        { week: "第 1 周：维护者访谈", body: "找 10 个本地优先或自托管工具作者，收集最常见的 5 类失败和支持成本。" },
        { week: "第 2 周：嵌入试点", body: "帮 3 个项目接入错误报告页，比较 issue 复现率和维护者往返次数。" },
        { week: "成功标准", body: "至少 2 个项目愿意持续使用，且维护者能指出它减少了哪类支持负担。" }
      ],
      risks: [
        "开源用户付费弱，必须服务已有商业版或团队用户。",
        "如果只做错误文案，很容易被内置；要沉淀跨平台诊断、报告和支持流程。",
        "过度采集会伤害 local-first 信任，必须把隐私边界做成卖点。"
      ],
    },
    {
      subtitle:
        "把独立开发者的广告费、失败付款、免费用户和低转化流量，变成下一周该修哪一处的收入漏点报告。",
      thesis:
        "Founder Revenue Leak Triage 的核心判断是：早期创始人不是缺更多 dashboard，而是缺一份能告诉自己“钱先从哪里漏掉”的诊断。最窄 MVP 是月度/周度漏点报告，不是完整增长平台。",
      whyNow: [
        "BuilderPulse 记录的创始人讨论很集中：有人广告花费超过一千美元后关停，有人 2700 万浏览仍然零收入，也有人从小额 MRR 通过信任和演示流程增长。",
        "这些案例说明流量、用户和收入是三台机器；AI SaaS 尤其容易把病毒视频、免费用户和真实付费混为一谈。",
        "相比通用分析工具，早期创始人更愿意为一份可执行判断付费：本周先修失败付款、升级路径、受众、定价，还是 onboarding。"
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工收入漏点报告",
          body:
            "让创始人上传 Stripe/Paddle 导出、广告花费、落地页链接和 10 条用户反馈，手工生成一页诊断。",
          features: [
            "漏点分类：失败付款、无升级触发、错误受众、广告-落地页不匹配、免费额度过宽。",
            "每个漏点给一个下周实验，而不是泛泛建议。",
            "报告里明确“不建议继续加广告”的情形。"
          ],
        },
        {
          stage: "第 2 周",
          title: "轻量连接器",
          body:
            "把最常见输入自动化：Stripe、Paddle、GA/Plausible、广告 CSV 和客服标签。",
          features: [
            "按金额影响排序，而不是按事件数量排序。",
            "把免费用户行为和付费事件放在同一张表。",
            "生成实验清单：文案、价格、付费墙、邮件、退款挽回。"
          ],
        },
        {
          stage: "第 3-4 周",
          title: "月度复盘",
          body:
            "把一次性报告变成每月复盘，帮助创始人避免只追流量。",
          features: [
            "本月漏点变化、已执行实验、MRR 影响和下月优先级。",
            "适合发给合伙人、顾问或小团队的 PDF/HTML。",
            "记录每个建议是否执行，区分诊断失败还是执行失败。"
          ],
        }
      ],
      technical: [
        { title: "输入", status: "CSV 优先", body: "先支持 CSV 和手工粘贴，避免一开始做太多 OAuth 集成。" },
        { title: "判断", status: "规则 + 样例库", body: "用规则找漏点，用案例库解释，而不是让 LLM 随机给增长建议。" },
        { title: "输出", status: "一页优先级", body: "每次只给 Top 3 漏点和下周实验，避免变成无法执行的审计报告。" }
      ],
      goToMarket: [
        "从 MRR 低于 $5k 的 AI SaaS、micro SaaS 和 Product Hunt maker 切入，他们最容易有免费用户多但付费少的问题。",
        "分发内容直接围绕真实数字：为什么 226 个用户不等于产品成立，为什么 2700 万浏览可能是坏信号。",
        "不要卖增长黑客，卖“少烧错钱”和“下周该修哪里”。"
      ],
      pricing: [
        { name: "免费快照", body: "上传少量数据，输出一个最大漏点，用来验证信任。" },
        { name: "单次报告 $49-149", body: "完整漏点诊断、下周实验和复盘模板。" },
        { name: "月度版 $99-299/月", body: "每月自动复盘、实验记录和创始人汇报导出。" }
      ],
      validation: [
        { week: "第 1 周：手工交付", body: "找 20 个早期创始人，手工做收入漏点报告，看他们是否执行建议。" },
        { week: "第 2 周：付费测试", body: "对愿意执行的创始人收取单次报告费，验证他们为诊断而不是 dashboard 付费。" },
        { week: "成功标准", body: "6 个创始人执行建议，3 个愿意付费复盘，至少 1 个能看到失败付款或升级转化改善。" }
      ],
      risks: [
        "早期创始人预算有限，必须让一次报告直接减少浪费或改善收入。",
        "数据质量会很差，产品要接受不完整输入并明确置信度。",
        "容易变成泛咨询；必须模板化漏点、实验和复盘。"
      ],
    },
  ],
  "2026-05-27": [
    {
      subtitle:
        "把一次 AI pull request 的生成、评审、测试和合并决策，压成工程负责人能签字的一页账本。",
      thesis:
        "AI Review Ledger 的核心判断是：AI 编程的下一轮预算不会只看生成速度，而会看评审成本、返工成本和责任归属。最窄 MVP 不是写代码，而是把一个 PR 的证据链整理成可合并判断。",
      whyNow: [
        "当天最强争论集中在“慢一点但更好”的 AI 编程：模型可以帮助批评、测试和迭代，但前提是团队能看见这条轨迹。",
        "DEV Community 和 commit message 讨论说明，团队信任问题不会被 AI 自动修好；AI 反而会让隐藏状态、夸大产出和薄弱评审更难追责。",
        "GitHub、CI、聊天记录、IDE 和 AI 会话都保存了碎片证据，但没有一份面向工程负责人的任务级报告。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工做 10 份 PR 账本",
          body:
            "先找正在用 AI 编程工具的团队，选最近的真实 PR，手工整理 AI 输入、diff、测试、review comments、修复轮次和最终合并判断。",
          features: [
            "变更地图：文件、模块、风险区域、业务影响和测试覆盖。",
            "评审轨迹：AI 建议、人类评论、已修问题、未解决问题和负责人决策。",
            "合并建议：可合并、需补测、需重构、需人工复查的具体理由。",
          ],
        },
        {
          stage: "第 2 周",
          title: "做只读 GitHub 原型",
          body:
            "连接 GitHub App 或导入 PR URL，只读拉取 diff、comments、CI、commits 和 reviewer 信息，自动生成报告草稿。",
          features: [
            "PR 输入页：仓库、PR、AI 工具、任务目标和风险等级。",
            "规则评分：测试失败、敏感文件、无 reviewer、commit 说明缺失、超大 diff。",
            "HTML/PDF 导出：发给工程经理、CTO 或客户安全评审。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "变成团队评审流程",
          body:
            "当报告能帮助一次合并决策后，再加入历史趋势、团队模板、PR comment 和合并前 gate。",
          features: [
            "团队仪表：AI PR 的平均评审轮次、返工率、测试缺口和风险模块。",
            "PR comment：自动贴出风险摘要和负责人待确认项。",
            "复盘视图：把上线 bug 回溯到当时报告里的缺口。",
          ],
        },
      ],
      technical: [
        {
          title: "输入边界",
          status: "GitHub 先行",
          body:
            "第一版只支持 GitHub PR、CI 和评论，AI 会话可手工粘贴摘要；不要一开始接所有 IDE。",
        },
        {
          title: "判断方式",
          status: "规则优先",
          body:
            "风险判断来自 diff 大小、文件类型、测试状态、reviewer 行为和规则库；LLM 负责解释，不做不可追溯的最终结论。",
        },
        {
          title: "证据链",
          status: "可回点",
          body:
            "每条建议都要能跳回 PR 文件、评论、CI job 或 commit，避免变成另一段不可信的 AI 摘要。",
        },
        {
          title: "部署",
          status: "私有友好",
          body:
            "代码和评审数据敏感，早期应支持只读 token、本地处理或私有工作区，不默认保存完整代码内容。",
        },
      ],
      goToMarket: [
        "首批用户是 AI 编程重度团队：Cursor/Claude Code/Copilot/Codex 用户、外包开发团队、AI agency 和内部工具团队。",
        "获客样板是一份匿名 PR 账本：AI 改了 12 个文件，review 抓到 4 个问题，仍有 2 个合并阻断项。",
        "销售话术围绕“让工程负责人知道这次 AI PR 是否真的省了时间”，而不是“再提升写代码速度”。",
      ],
      pricing: [
        { name: "免费单次报告", body: "公开或小型私有 PR 生成基础账本，用来验证用户是否愿意提供真实评审数据。" },
        { name: "团队版 $49-299/月", body: "私有仓库、历史报告、PR comment、团队规则、导出和每周 AI PR 质量摘要。" },
        { name: "企业版 $8k/年起", body: "SSO、私有部署、审计留存、自定义风险规则和客户安全问卷导出。" },
      ],
      validation: [
        { week: "第 1 周：手工报告", body: "对 10 个真实 AI PR 手工生成账本，观察工程负责人是否愿意转发给 reviewer 或在合并前使用。" },
        { week: "第 2 周：只读原型", body: "让 5 个团队连接 GitHub，比较自动报告与人工复盘是否能指出相同阻断项。" },
        { week: "成功标准", body: "至少 5 个团队认为报告能改善合并决策，2 个团队愿意为历史留存或 PR gate 付费。" },
      ],
      risks: [
        "GitHub、IDE 或代码助手可能内置 PR 摘要，所以产品必须聚焦跨工具证据和负责人问责，而不是简单总结。",
        "如果报告误报太多，会增加 reviewer 负担；MVP 要允许团队调整规则并标记误报。",
        "代码数据敏感，必须减少持久化，默认存结构化证据和脱敏摘要。",
        "没有真实 AI PR 的团队不是早期用户，首批必须来自已经在合并 AI 生成改动的团队。",
      ],
    },
    {
      subtitle:
        "把 OpenRouter、MiMo、Qwen 和长上下文变化，翻译成每类任务能不能切模型的上线报告。",
      thesis:
        "Model Route Change Board 的核心判断是：模型价格和能力变化会越来越频繁，但团队真正付费的是“我们这类任务能否迁移、能省多少、质量怎么验收”。MVP 应从账单和样本体检开始。",
      whyNow: [
        "OpenRouter 的融资和 token 增长说明多模型网关正在进入生产；MiMo 降价和 Qwen 长上下文又让替代路径变得具体。",
        "模型选择不再是工程师偏好，而是成本、质量、隐私、fallback 和客户体验的综合决策。",
        "现有 dashboard 能看调用量，却很难解释一类任务为什么该切、为什么不能切，以及切完如何证明没有质量回退。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工拆调用日志",
          body:
            "收集 3-5 个团队的调用日志、任务标签、价格表和少量输出样本，手工判断可迁移、不可迁移和灰区任务。",
          features: [
            "任务分组：coding、摘要、客服、内容、检索、自动化执行和内部分析。",
            "成本分解：模型、token、重试、上下文长度、缓存机会和用户/项目归属。",
            "迁移报告：候选模型、预计节省、质量风险、隐私风险和 fallback 顺序。",
          ],
        },
        {
          stage: "第 2 周",
          title: "做上传式路由报告",
          body:
            "支持 CSV/JSON 日志上传和价格表选择，生成任务级路由变更建议及回归测试计划。",
          features: [
            "价格变化重算：OpenRouter、MiMo、Qwen、主供应商和自定义模型价格。",
            "小样本回归：每类任务抽样输出，保留人工评分和失败例。",
            "管理层摘要：预计节省、不可迁移原因、上线阻断项和决策记录。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "接入持续复查",
          body:
            "当一次报告能推动模型切换后，再接网关或 provider API，做月度预算、价格变化提醒和质量回归留存。",
          features: [
            "每周模型价格和使用量变化摘要。",
            "预算异常：重试、长上下文、缓存未命中和高成本任务告警。",
            "变更记录：谁批准切换、切换后质量如何、是否回滚。",
          ],
        },
      ],
      technical: [
        { title: "数据输入", status: "导入优先", body: "先支持常见 provider 和网关导出的 CSV/JSON，不先做实时代理，降低接入阻力。" },
        { title: "评分模型", status: "任务级", body: "迁移建议基于任务类型、敏感度、质量样本、上下文长度、价格和失败成本，而不是只看 token 单价。" },
        { title: "质量边界", status: "必须回归", body: "任何省钱建议都附带小样本回归计划和人工确认字段，否则不能进入上线建议。" },
        { title: "隐私", status: "摘要化", body: "默认只存任务标签、token、成本和摘要；敏感 prompt 支持本地处理或不上传正文。" },
      ],
      goToMarket: [
        "首批用户是 AI-heavy SaaS、内部工具团队、AI agency 和 coding agent 高用量团队。",
        "冷启动用免费账单体检：上传 100-500 条调用，输出可节省任务、不可迁移任务和风险说明。",
        "付费升级卖持续监控、价格变化重算、质量回归历史和财务视图。",
      ],
      pricing: [
        { name: "一次性体检 $49-199", body: "单次调用日志分析、节省机会、迁移风险和路由建议。" },
        { name: "团队版 $99-399/月", body: "持续导入、价格更新、预算告警、质量回归和报告导出。" },
        { name: "企业版 $10k/年起", body: "私有部署、SSO、自定义模型、合规留存和财务审批记录。" },
      ],
      validation: [
        { week: "第 1 周：手工体检", body: "用 5 个团队的真实调用日志找出节省机会或不可迁移清单，确认报告是否能给 CTO/财务看。" },
        { week: "第 2 周：上传原型", body: "让用户上传第二批日志，看自动报告是否仍能指出可执行的路由变化。" },
        { week: "成功标准", body: "至少 3 个团队找到 15% 以上可解释节省或明确质量风险，2 个团队愿意为持续复查付费。" },
      ],
      risks: [
        "网关平台会内置成本分析，独立产品必须跨供应商并绑定质量验收。",
        "价格变化很快，静态报告容易过期，因此需要重算机制和价格来源记录。",
        "没有业务任务标签时建议会很空，MVP 要引导用户人工标注少量关键任务。",
      ],
    },
    {
      subtitle:
        "把 AI 生成的 deck、规格、表单和项目材料，打包成客户或主管能检查的交接件。",
      thesis:
        "AI Workflow Handoff Kit 的核心判断是：AI 生成工具越多，交付方越需要证明输入、来源、版本、人工确认和下一步责任。最窄 MVP 是交接包，而不是另一个生成画布。",
      whyNow: [
        "Genspark AI Slides 5.0、Rezonant、Brew、DodoForm 和 Audiomass 等信号都指向同一件事：市场奖励能把杂乱工作流变成可检查工件的产品。",
        "AI 交付件看起来越来越完整，但客户和主管更关心来源是否可信、数据是否正确、品牌是否一致、谁确认过。",
        "现有文档、幻灯片和表单工具有评论和版本历史，但缺少跨工具、面向交付场景的证据包。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工做 20 份交接包",
          body:
            "选真实 AI 生成 deck、规格、表单和客户报告，人工整理输入材料、来源、版本、确认点、风险和下一步待办。",
          features: [
            "交付摘要：目标、受众、使用工具、输入材料和最终产物。",
            "来源与确认：链接、数据表、引用、品牌规则、人工确认人和缺口。",
            "客户说明：哪些内容可直接使用，哪些需要客户确认，哪些不能承诺。",
          ],
        },
        {
          stage: "第 2 周",
          title: "做上传式 WebApp",
          body:
            "支持上传 PPT/PDF/DOC/CSV 或粘贴链接，生成 handoff 页面和可下载 PDF。",
          features: [
            "来源抽取：识别链接、数据表、图片、引用和未标注来源。",
            "检查清单：品牌、事实、数据、权限、敏感信息和客户待确认项。",
            "模板库：销售 deck、咨询报告、产品规格、表单数据和课程材料。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "变成团队交付空间",
          body:
            "当交接包被客户或主管认可后，再做团队模板、客户空间、历史报告和白标导出。",
          features: [
            "客户空间：每个项目保留交付件、来源、确认记录和变更历史。",
            "审批流：内部确认、客户确认、待补资料和签收记录。",
            "白标报告：agency 和咨询顾问可以直接随交付件发送。",
          ],
        },
      ],
      technical: [
        { title: "格式边界", status: "三类先行", body: "第一版只支持 deck、spec 和 form/report 三类交付，不追求全格式覆盖。" },
        { title: "来源识别", status: "结构化优先", body: "优先解析文档元数据、链接、表格和显式引用；无法确认的内容标成待人工确认。" },
        { title: "LLM 角色", status: "解释与整理", body: "LLM 负责把证据写成客户可读说明，不能凭空补来源或确认状态。" },
        { title: "导出", status: "可分享", body: "交付形态先做网页链接和 PDF，方便随客户邮件、Slack 或项目管理工具发送。" },
      ],
      goToMarket: [
        "首批用户是 AI-heavy agency、咨询顾问、销售运营、课程团队和产品经理。",
        "获客内容用具体样板：一份 AI 生成销售 deck 的交接包，列出 8 个来源、3 个待确认数据和 2 个客户风险。",
        "付费理由不是生成内容，而是让交付方降低返工、误用数据和客户质疑。",
      ],
      pricing: [
        { name: "免费单件交接包", body: "单个 deck/spec/form 生成带水印 handoff 页面，用于验证分享和客户反馈。" },
        { name: "Pro $29-99/月", body: "私有文件、更多项目、模板、PDF 导出、来源检查和历史留存。" },
        { name: "Agency $199-499/月", body: "多客户空间、白标报告、团队审批、品牌规则和客户签收记录。" },
      ],
      validation: [
        { week: "第 1 周：手工交付", body: "对 20 份真实 AI 交付件做手工交接包，观察交付方是否愿意随成品发送。" },
        { week: "第 2 周：上传原型", body: "让 30 个用户上传自己的 deck/spec/form，记录他们是否补充来源或请求客户确认。" },
        { week: "成功标准", body: "至少 10 个交接包被实际转发给客户或主管，3 个用户愿意为私有文件和白标导出付费。" },
      ],
      risks: [
        "通用文档工具会补摘要和评论，所以产品必须聚焦交付证据、来源确认和客户说明。",
        "来源抽取不可靠会损害信任，无法确认时必须明确标记，而不是自动编造。",
        "如果只做一次性报告，留存弱；团队模板、客户空间和签收记录是订阅理由。",
      ],
    },
  ],
  "2026-05-26": [
    {
      subtitle:
        "把 AI 同事的文件、网页、仓库和工具访问，变成负责人能审阅、转发和整改的一页收据。",
      thesis:
        "Agent Data Access Receipt 的核心判断是：企业不会为“AI 更像同事”本身继续付费，除非负责人能证明这个同事读了什么、发给谁、哪些权限应该收回。最窄 MVP 是只读导入报告，而不是一开始做代理网关。",
      whyNow: [
        "Copilot Cowork 数据外泄演示把风险讲得很具体：当 AI 同事进入共享文件和协作上下文，越权访问不再是抽象担忧。",
        "Microsoft、GitHub、Chrome DevTools MCP、Unabyss 和各种 context 工具都在把 Agent 推向更多企业数据；香港隐私机构的 AI 合规检查说明监管语言也在跟上。",
        "现有日志分散在 Microsoft 365、GitHub、浏览器、模型平台和内部工具里，安全团队可以查，但业务负责人很难按一次任务理解风险和下一步动作。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工做访问收据样板",
          body:
            "先找 5-10 个已经启用 Copilot、Claude Code、Codex 或浏览器 Agent 的团队，导入一次真实任务的日志、截图或文件清单，人工整理成报告。",
          features: [
            "任务摘要：目标、使用的 AI 工具、访问过的系统和最终产出。",
            "数据地图：文件、网页、仓库、issue、表单字段、客户/财务/HR/代码类别。",
            "风险标注：越权访问、敏感数据、外部模型、缺少人工确认和可自动放行动作。",
          ],
        },
        {
          stage: "第 2 周",
          title: "做只读导入原型",
          body:
            "把最稳定的输入做成 WebApp：CSV/JSON 日志、GitHub diff、浏览器 HAR、MCP 事件和手工上传的文件清单。",
          features: [
            "统一事件 schema：actor、tool、action、target、dataClass、destination、evidence。",
            "规则优先评分：敏感路径、外发域名、权限扩大、客户数据、密钥线索。",
            "导出 HTML/PDF：给 IT、安全、工程经理和客户安全问卷使用。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "转成团队治理工作流",
          body:
            "报告被认可后，再加入项目空间、历史留存、审批建议和轻量告警，不急着替代 DLP 或 SIEM。",
          features: [
            "团队视图：按项目、成员、工具和数据类别看访问趋势。",
            "审批建议：低风险自动放行，高风险要求人工确认或收回权限。",
            "整改追踪：每条风险有负责人、截止日期和复检证据。",
          ],
        },
      ],
      technical: [
        {
          title: "输入边界",
          status: "导入优先",
          body:
            "第一版支持导入，不要求装浏览器插件或代理所有请求。这样能避开高权限阻力，也更容易进入安全敏感团队。",
        },
        {
          title: "证据链",
          status: "必须可追溯",
          body:
            "每条结论都要能回到原始日志、文件名、URL、diff 或事件片段；LLM 只负责解释，不能替代证据。",
        },
        {
          title: "数据分类",
          status: "规则 + 用户标签",
          body:
            "先用路径、域名、文件类型、字段名和用户自定义标签分类敏感数据，避免纯模型判断造成不可解释误报。",
        },
        {
          title: "部署",
          status: "本地/私有优先",
          body:
            "涉及企业文件、代码和客户数据，MVP 应支持本地运行或私有工作区；云端版默认只存结构化事件和脱敏摘要。",
        },
      ],
      goToMarket: [
        "第一批用户是已经让 AI 工具进入真实工作流的团队：Microsoft 365 Copilot 管理员、使用 GitHub Copilot coding agent 的工程团队、Claude/Codex 重度用户和浏览器 Agent 试点团队。",
        "获客内容不讲泛 AI 治理，而是发布匿名样板报告：一次 Agent 任务读了哪些数据、哪些动作该审批、哪些权限可收回。",
        "销售话术围绕“给负责人一份能转发的证据”，而不是“替代你的安全系统”。",
      ],
      pricing: [
        { name: "免费样板", body: "单次导入一个任务，生成带水印的访问收据，用来获客和收集日志格式。" },
        { name: "团队版 $99-499/月", body: "项目空间、历史留存、成员权限、规则模板、报告导出和每周访问摘要。" },
        { name: "私有部署 $8k/年起", body: "SSO、本地处理、审计留存、自定义数据分类和客户安全问卷导出。" },
      ],
      validation: [
        { week: "第 1 周：手工报告", body: "让 10 个团队提供最近 3 次 AI 任务，手工生成访问收据，看负责人是否愿意转发给安全、IT 或 CTO。" },
        { week: "第 2 周：原型复跑", body: "把导入和规则自动化到 30 分钟内完成，观察用户是否愿意对第二批任务重复使用。" },
        { week: "成功标准", body: "至少 5 个团队认为报告能用于内部审批或客户问卷，2 个团队愿意为历史留存或私有处理付费。" },
      ],
      risks: [
        "平台会补单点日志，所以产品必须跨工具并按任务组织，而不是只做某个平台的日志 UI。",
        "安全结论不能说得过满，应坚持证据和人工复核，定位为访问收据和整改辅助。",
        "采集敏感日志会带来信任压力，默认本地处理、脱敏预览和最小事件存储是必要条件。",
        "如果团队还没有真实 AI 任务，需求会显得超前；首批用户必须来自已经部署或试点 Agent 的组织。",
      ],
    },
    {
      subtitle:
        "把 OpenRouter、Kimi、Qwen、Claude Code 和高 token 工作流，翻译成每类任务的成本、质量和 fallback 决策。",
      thesis:
        "Model Gateway Spend Board 的核心判断是：网关和模型选择会越来越多，但团队真正付费的是“我们的任务怎样路由、为什么这样路由、质量风险怎么验收”。MVP 应从账单体检和任务样本开始。",
      whyNow: [
        "OpenRouter 融资和多模型网关信号说明路由层正在成为基础设施，Merge Gateway 等工具又把它推向开发者日常。",
        "AI agent workload 的 token 消耗、企业难以计算 AI ROI、coding agent 长上下文，都让成本问题从模型单价升级为工作流结构问题。",
        "现有 dashboard 能显示调用量和账单，却很难回答 CTO 或财务最关心的问题：哪类任务能换模型、会省多少钱、质量怎么证明。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "拆真实调用样本",
          body:
            "收集 3-5 个团队的调用日志、任务标签和价格表，手工标出任务类别、质量要求、敏感程度、可替代模型和不可迁移原因。",
          features: [
            "成本分解：按任务、成员、模型、重试和上下文长度显示。",
            "迁移候选：低风险摘要、分类、内部工具调用和高重复 prompt。",
            "保留清单：高风险客户数据、法律/财务判断、质量不可回归任务。",
          ],
        },
        {
          stage: "第 2 周",
          title: "生成路由报告",
          body:
            "做一个上传 CSV/JSON 的 WebApp，自动输出任务级路由建议和小样本回归验收计划。",
          features: [
            "fallback 顺序：主模型、备用模型、本地模型和失败处理。",
            "质量验收：每类任务 20 条样本、人工评分字段和上线阻断条件。",
            "预算控制：月度上限、异常重试、缓存机会和团队摘要。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "接入持续监控",
          body:
            "报告卖通后再接 OpenRouter、provider dashboard 或自建网关，做趋势和告警。",
          features: [
            "每周节省和质量变化报告。",
            "模型价格变化后自动重算路由建议。",
            "CI 或 release 前检查是否出现成本异常任务。",
          ],
        },
      ],
      technical: [
        { title: "日志解析", status: "CSV 先行", body: "先支持 OpenAI/Anthropic/OpenRouter 常见导出和自定义 CSV，不先做复杂实时代理。" },
        { title: "评分方式", status: "规则优先", body: "迁移建议基于任务标签、敏感度、上下文长度、质量样本和价格表，LLM 负责报告表达。" },
        { title: "质量边界", status: "必须有回归集", body: "任何省钱建议都要附带小样本回归计划，否则只是账单优化建议。" },
        { title: "隐私", status: "摘要化处理", body: "默认只存 prompt 摘要、token、模型和任务标签；敏感 prompt 可本地处理。" },
      ],
      goToMarket: [
        "首批用户是 AI-heavy 产品团队、AI agency、用 coding agent 的创业公司和内部工具团队。",
        "冷启动用免费账单体检：上传 100-500 条调用，输出节省机会、不可迁移任务和 fallback 建议。",
        "付费升级卖持续监控、团队历史、价格变化重算和私有数据处理。",
      ],
      pricing: [
        { name: "一次性体检 $49-199", body: "单次调用日志分析、节省机会、风险任务和路由建议。" },
        { name: "团队版 $99-399/月", body: "持续导入、项目历史、预算告警、模型价格更新和报告导出。" },
        { name: "企业版 $10k/年起", body: "私有部署、SSO、合规留存、自定义模型和财务视图。" },
      ],
      validation: [
        { week: "第 1 周：手工分析", body: "用 5 个团队的真实日志手工找出节省机会或不可迁移清单，确认报告是否能给 CTO/财务看。" },
        { week: "第 2 周：原型上传", body: "让用户自己上传第二批日志，验证自动报告是否仍能指出可执行变化。" },
        { week: "成功标准", body: "至少 3 个团队找到 15% 以上可解释节省或明确质量风险，2 个愿意为持续监控付费。" },
      ],
      risks: [
        "网关平台会内置成本分析，独立产品必须跨供应商并绑定质量验收。",
        "模型价格快速变化会让静态报告过期，所以需要价格更新和重算机制。",
        "没有真实任务标签时建议会很空，MVP 要强制用户提供业务任务或人工标注。",
      ],
    },
    {
      subtitle:
        "把 AI 生成 WebApp 从“能跑 demo”推进到“可以上线”：安全、数据、依赖、部署和测试缺口一次说清。",
      thesis:
        "Vibe App Production Gate 的核心判断是：AI 让更多人能做 demo，但上线风险没有消失。最能收费的不是再生成代码，而是把上线阻断项变成非专业 builder 也能理解的修复清单。",
      whyNow: [
        "Kakuna、Vibecodex、MashuPack 和 Context for AI 都指向同一件事：AI 生成应用越来越快，但生产质量、上下文质量和部署证据跟不上。",
        "AI 假引用、AI slop 和上下文包问题说明风险不只在代码，也在来源、配置、隐私和产品文案。",
        "现有安全工具面向专业工程师，AI builder 需要的是“哪些问题必须先修、怎么修、修完如何证明”。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工审 20 个 AI demo",
          body:
            "选公开的 Lovable/Replit/Cursor/Claude Code demo，手工生成上线阻断报告，找作者验证是否愿意按报告修复。",
          features: [
            "Auth 与权限：公开后台、弱会话、缺少角色、敏感路由。",
            "数据与隐私：公开 env、日志泄露、客户数据、第三方 API key。",
            "部署与测试：错误处理、依赖、数据库规则、备份、回滚和冒烟测试。",
          ],
        },
        {
          stage: "第 2 周",
          title: "做 GitHub 首扫",
          body:
            "连接 repo 或上传 zip，生成 HTML 报告和修复优先级，不先做自动修复。",
          features: [
            "风险分级：上线阻断、上线前建议、后续优化。",
            "证据链接：每条问题指向文件、路由、配置或请求样例。",
            "修复 checklist：用普通 builder 能理解的话写下一步。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "接入 CI 与历史",
          body:
            "用户修复后需要复检和发布前 gate，这时再做 GitHub Action、历史报告和团队空间。",
          features: [
            "PR comment：新增阻断项和已修复项。",
            "发布 gate：阻断高危问题，低危生成待办。",
            "模板库：按 SaaS、目录站、AI wrapper、电商、内部工具分类。",
          ],
        },
      ],
      technical: [
        { title: "扫描范围", status: "WebApp 优先", body: "先支持 Next/Vite/React/Node/Supabase 常见栈，避免一开始覆盖所有语言。" },
        { title: "规则库", status: "AI demo 专用", body: "关注 env 暴露、公开管理页、宽权限数据库、缺少 rate limit、错误处理和测试缺口。" },
        { title: "LLM 用法", status: "解释而非判定", body: "风险判断由规则和静态分析产生，LLM 把证据翻译成修复步骤。" },
        { title: "交付", status: "报告先行", body: "先做可分享 HTML 报告和 badge，报告跑通后再做 CI gate。" },
      ],
      goToMarket: [
        "从 AI builder 社区和公开 demo 切入，免费首扫最容易传播。",
        "内容标题要具体：一个 AI demo 上线前的 12 个阻断项，而不是泛泛讲安全。",
        "团队版面向 agency 和做多个 client app 的 builder，卖历史报告、客户交付 PDF 和 CI gate。",
      ],
      pricing: [
        { name: "免费首扫", body: "公开 repo 或小项目单次报告，带水印和基础 checklist。" },
        { name: "Pro $29-99/月", body: "私有 repo、复检、历史报告、PDF 导出和项目模板。" },
        { name: "Agency $199-499/月", body: "多客户空间、白标报告、CI gate 和团队权限。" },
      ],
      validation: [
        { week: "第 1 周：公开样板", body: "对 20 个公开 AI demo 出报告，联系作者确认是否愿意修复或分享。" },
        { week: "第 2 周：自助首扫", body: "让 30 个 builder 自助连接 repo，观察他们是否完成修复并二次扫描。" },
        { week: "成功标准", body: "至少 10 个项目按报告修复一个阻断项，3 个用户愿意为私有 repo 或复检付费。" },
      ],
      risks: [
        "通用安全扫描和托管平台会覆盖一部分问题，产品必须专注 AI 生成 WebApp 的上线语境。",
        "非专业用户可能不理解高危项，需要把修复步骤写得非常具体。",
        "如果只做报告不接复检，留存会弱；复检和 CI gate 是后续订阅理由。",
      ],
    },
  ],
  "2026-05-25": [
    {
      subtitle:
        "把模型降价、缓存、fallback 和隐私边界，变成团队能执行的任务级路由报告。",
      thesis:
        "Model Price Switchboard 的核心判断是：AI 团队不会为“又一个模型价格表”付费，但会为“哪些真实任务能换到便宜或备用模型，哪些不能换，换了如何验收质量”付费。MVP 应该先做只读报告，不要一开始接管生产路由。",
      whyNow: [
        "DeepSeek V4 Pro 的价格变化把模型选择从讨论变成账单问题；Qwen 缓存、Reasonix 的重复前缀、Edgee 的 fallback 和 ModelHub 的本地模型管理，说明团队正在同时处理价格、供应商、缓存和连续性。",
        "BuilderPulse 2026-05-25 的判断也指向同一件事：负责人需要知道哪些 coding jobs 可以走更便宜路径，哪些涉及隐私或质量风险必须留下。",
        "现有替代方案分散在 provider dashboard、网关日志、评测表和工程师经验里，缺少一页能发给 CTO、财务和工程负责人的任务级结论。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工拆 50 条调用样本",
          body:
            "先让 3-5 个团队导出少量调用日志和任务样本，人工标注任务类型、敏感程度、质量要求、当前模型和成本。",
          features: [
            "CSV/JSON 上传模板：prompt 摘要、模型、token、成本、业务任务、隐私等级。",
            "任务分类：coding、客服、内容、检索、内部分析、自动化执行。",
            "输出一页报告：可迁移任务、不可迁移任务、需要回归测试的灰区任务。",
          ],
        },
        {
          stage: "第 2 周",
          title: "加入路由和缓存规则",
          body:
            "把价格、缓存、隐私和质量要求固化为规则，避免让 LLM 自由决定路由。",
          features: [
            "供应商价格表与缓存价格：DeepSeek、Qwen、本地模型、现有主供应商。",
            "fallback 顺序建议：首选、低价、备用、本地、人工确认。",
            "质量回归清单：抽样复跑、人工评分、失败例保留、上线前门槛。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "从报告变成持续复查",
          body:
            "当报告能让团队改一次路由后，再加入月度复查和变化提醒。",
          features: [
            "价格变化监控：供应商价格、模型名弃用、限额变化。",
            "任务毛利视图：每类任务成本、收入、人工复核和失败重试。",
            "团队导出：PDF/HTML 报告、决策记录、审批备注。",
          ],
        },
      ],
      technical: [
        {
          title: "输入边界",
          status: "日志优先",
          body:
            "只接收脱敏日志、任务标签和人工评分样本；不要求接入生产网关，降低试用阻力。",
        },
        {
          title: "判断方式",
          status: "规则 + 抽样",
          body:
            "路由建议由规则、价格表和人工标签决定；LLM 只负责解释报告，不负责做最终路由决策。",
        },
        {
          title: "质量验收",
          status: "必须可复查",
          body:
            "每个迁移建议都带最小回归样本、失败条件和人工确认点，否则不允许进入推荐。",
        },
      ],
      goToMarket: [
        "第一批用户从每月 AI 成本超过 $500 的小团队、AI coding workflow 重度用户、agency 和内部工具团队里找；他们已经有账单压力，也有足够样本可分析。",
        "内容获客直接打具体问题：DeepSeek 降价后哪些 prompt 能换、Claude Code 限额用完后怎么 fallback、缓存命中率到底能省多少钱。",
        "销售路径是免费 20 条样本体检、一次性完整报告、再到持续月度复查。不要先卖平台，先卖能转发的成本与风险报告。",
      ],
      pricing: [
        {
          name: "免费样本体检",
          body:
            "20 条调用样本、一个供应商对比、输出 Top 3 可优化任务。目标是拿到真实日志和验证报告格式。",
        },
        {
          name: "单次报告 $49-199",
          body:
            "最多 500 条样本、任务级路由建议、fallback 顺序、质量回归清单和每周账单影响。",
        },
        {
          name: "团队复查 $99-499/月",
          body:
            "价格变化提醒、月度日志复查、团队规则库、历史报告和审批记录。",
        },
      ],
      validation: [
        {
          week: "第 1 周：手工报告",
          body:
            "找 10 个团队手工拆日志，确认他们是否愿意把报告发给 CTO、财务或工程负责人。",
        },
        {
          week: "第 2 周：验证改路由",
          body:
            "追踪报告是否真的让团队改变模型、缓存或 fallback 设置，而不只是看完觉得有趣。",
        },
        {
          week: "成功标准",
          body:
            "5 个团队采取至少一项路由调整，2 个团队愿意为月度复查付费，且报告能明确估算节省或风险降低。",
        },
      ],
      risks: [
        "模型网关会把成本 dashboard 做得越来越好；产品必须绑定任务、隐私和质量回归，而不是只显示 token。",
        "价格变化很快，静态报告容易过期。必须保留价格来源和复查日期。",
        "团队可能不愿上传真实 prompt。MVP 必须支持脱敏摘要、局部样本和本地处理。",
        "低价模型节省可能被人工复核和失败重试吃掉，所以报告必须把质量成本算进去。",
      ],
    },
    {
      subtitle:
        "把本地模型、桌面自动化和文件输出，整理成团队能看见的控制面板。",
      thesis:
        "Local Workflow Control Panel 的核心判断是：本地运行正在从个人偏好变成团队控制需求。ModelHub、Freu AI、Textsnap 和本地文件工具说明用户想省 token、留住数据、复现流程，但团队缺少跨工具台账。",
      whyNow: [
        "BuilderPulse 记录 ModelHub、Freu AI、Edgee、Textsnap 和 Audiomass 都在把隐藏能力变成可见菜单、报告或本地路径。",
        "Freu AI 的确定性本地 DSL 和 ModelHub 的菜单栏模型管理，说明本地控制的卖点已经能被普通开发者理解。",
        "现有替代方案是每个工具各管一段，负责人看不到整个流程在哪里跑、输出留在哪里、失败如何复现。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "整理本地流程台账",
          body:
            "让用户手动登记本地模型、自动化流程、输入文件、输出目录和成本节省主张。",
          features: [
            "流程卡片：工具、输入、输出、是否联网、是否消耗 token。",
            "数据流视图：文件从哪里来、经过什么工具、保存到哪里。",
            "交接报告：团队成员如何复现、关闭或接管该流程。",
          ],
        },
        {
          stage: "第 2 周",
          title: "加入证据与复现",
          body:
            "把本地控制从描述变成可检查证据。",
          features: [
            "运行样本：截图、日志、输出文件、失败案例。",
            "成本估算：本地运行与 API 运行的差异。",
            "风险标注：外发数据、缺少备份、手动步骤、不可复现部分。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "团队视图",
          body:
            "当个人流程可见后，再做团队审批、历史变更和模板复用。",
          features: [
            "团队模板：内容生成、OCR、桌面自动化、本地模型推理。",
            "负责人视图：哪些流程重要、谁维护、失败影响多大。",
            "导出：审计报告、交接文档、SOP。",
          ],
        },
      ],
      technical: [
        {
          title: "输入方式",
          status: "手动登记起步",
          body:
            "第一版不接管系统权限，只让用户手动登记和上传证据，降低安全阻力。",
        },
        {
          title: "可见化",
          status: "流程图 + 报告",
          body:
            "用固定字段构建流程图，避免自由文本变成难维护的知识库。",
        },
        {
          title: "隐私",
          status: "本地优先",
          body:
            "允许完全本地保存台账，团队版再提供私有部署或加密同步。",
        },
      ],
      goToMarket: [
        "从本地 LLM、Mac 自动化、隐私敏感创作者和小型 agency 社群获客。",
        "用公开模板吸引用户：我的本地 AI 工作流台账、Mac 自动化交接清单、本地模型成本比较。",
        "和 ModelHub、Freu AI、Textsnap 这类工具互补，不做替代品。",
      ],
      pricing: [
        {
          name: "个人免费",
          body:
            "最多 5 个流程，本地保存，输出基础交接报告。",
        },
        {
          name: "团队 $19-79/月",
          body:
            "成员、模板、历史变更、报告导出和共享视图。",
        },
        {
          name: "私有部署 $499+/年",
          body:
            "适合不希望流程台账离开本机或内网的团队。",
        },
      ],
      validation: [
        {
          week: "第 1 周：人工台账",
          body:
            "为 10 个用户整理现有本地 AI 工作流，观察他们是否愿意持续维护。",
        },
        {
          week: "第 2 周：团队转发",
          body:
            "验证报告是否会被转发给同事或老板，而不是只留给个人收藏。",
        },
        {
          week: "成功标准",
          body:
            "5 个用户每周更新台账，2 个团队邀请第二个成员查看或补充。",
        },
      ],
      risks: [
        "用户可能觉得手动登记麻烦。MVP 必须让第一份报告足够有用，之后再逐步自动化。",
        "单个工具会内置自己的控制面板，所以产品要跨工具和团队交接。",
        "过度追求自动扫描会带来权限风险；早期保持只读和手动证据更稳。",
      ],
    },
    {
      subtitle:
        "把 AI 写出的 issue、PR 和架构建议，压回可复现、可审查、可维护的格式。",
      thesis:
        "AI Issue Quality Gate 的核心判断是：AI 让提交内容更长，但不一定更可维护。开源维护者和内部平台团队需要一个提交前门槛，把猜测、缺失日志和未满足约束拦下来。",
      whyNow: [
        "Simon Willison 收录的维护者抱怨说明 AI 重写 issue 已经制造真实维护成本：文字完整但证据不足、根因猜测过强、最小复现失真。",
        "AI HOT 同日记录后端 Agent 约束衰减和 Claude 架构决策争议，说明问题不只在 issue，也在 PR、ADR 和代码约束。",
        "现有 issue 模板只能要求字段，不能判断文本是否在猜测、是否缺命令和日志、是否把不相关错误塞进报告。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "做粘贴式检查器",
          body:
            "先不做 GitHub App，用户粘贴 issue 或 PR 描述，系统给出退回理由和可提交版本。",
          features: [
            "四要素检查：命令、预期、实际、日志。",
            "AI 痕迹检查：猜测根因、无证据类比、泛泛建议、虚构复现。",
            "约束检查：用户声明的硬约束是否被后文违反。",
          ],
        },
        {
          stage: "第 2 周",
          title: "接入仓库模板",
          body:
            "允许维护者配置项目专用规则。",
          features: [
            "项目字段：环境、版本、复现链接、日志格式。",
            "退回理由模板：缺少命令、缺少实际输出、无法复现。",
            "通过分数和建议修改。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "变成 GitHub App",
          body:
            "当规则有效后，再接入 issue/PR 评论或状态检查。",
          features: [
            "自动评论低质量报告。",
            "维护者可一键要求补充信息。",
            "团队指标：节省追问次数、退回原因、常见缺失字段。",
          ],
        },
      ],
      technical: [
        {
          title: "规则优先",
          status: "少用自由判断",
          body:
            "命令、预期、实际、日志、版本、复现步骤都用结构化规则检查；LLM 只负责改写和解释。",
        },
        {
          title: "私有代码",
          status: "默认不上传",
          body:
            "允许只检查文本描述，不要求上传仓库内容；团队版可私有部署。",
        },
        {
          title: "集成顺序",
          status: "粘贴页先行",
          body:
            "先用粘贴页验证规则，再做 GitHub App，避免一开始处理权限和安装阻力。",
        },
      ],
      goToMarket: [
        "从维护者社区、DevRel、内部平台团队和高 issue 量开源项目获客。",
        "公开内容围绕具体例子：一个 AI issue 为什么让维护者多花 20 分钟，如何改成可复现报告。",
        "开源项目免费，团队付费买私有规则、仓库集成和指标。",
      ],
      pricing: [
        {
          name: "开源免费",
          body:
            "公开仓库基础检查、badge 和粘贴页。",
        },
        {
          name: "团队 $29-149/月",
          body:
            "私有仓库、规则模板、GitHub App、团队指标和自定义退回理由。",
        },
        {
          name: "企业私有部署",
          body:
            "适合内部平台、客服工程和合规要求高的团队。",
        },
      ],
      validation: [
        {
          week: "第 1 周：收集坏报告",
          body:
            "找 20 个维护者收集最近收到的低质量 issue 或 PR 描述，手工标注退回原因。",
        },
        {
          week: "第 2 周：安装意愿",
          body:
            "把检查器跑在真实 issue 上，验证维护者是否愿意把链接放进模板或安装 App。",
        },
        {
          week: "成功标准",
          body:
            "10 个维护者愿意使用粘贴页，5 个愿意放入 issue 模板，2 个团队愿意为私有规则付费。",
        },
      ],
      risks: [
        "维护者可能反感自动化门禁。产品语气必须是帮助提交者补全证据，而不是惩罚用户。",
        "LLM 自己也可能误判质量，所以必须把规则和证据字段放在前面。",
        "GitHub 可能内置更强模板检查；独立产品要靠项目规则、指标和跨平台支持取胜。",
      ],
    },
  ],
  "2026-05-24": [
    {
      subtitle:
        "把本地记忆、代码图谱、连接器、自动测试和成本变化，压成团队能批准采用的一页证据。",
      thesis:
        "AI Agent 采用控制权收据的核心判断是：团队不会因为又一个 Agent demo 付费，但会为“这个 Agent 工具能否进入我们的仓库、记忆、连接器和 CI 流程”付费。最窄产品不是执行任务，而是只读盘点、证据报告、回滚建议和试点边界。",
      whyNow: [
        "5.24 的 AI HOT 全量信号里，本地记忆、自动测试闭环、Claude Code 自动模式、TrapDoor 攻击、DeepSeek 价格变化和 PDF/Markdown 输入效率同时出现，说明 Agent 正在进入真实文件、测试、成本和安全边界。",
        "BuilderPulse 同日把 Memdex、note.md、Vibedock、codegraph、openhuman、agentmemory、12-factor-agents 和 SemanticGuard 放在同一张图里：用户要的不是泛助手，而是本地控制、可见开关、采用证明和成本解释。",
        "现有替代方案分散在 README、Stars、工具日志、CI 结果、安全问卷和工程师解释里。负责人需要的是一份能转发给 CTO、安全、客户或 reviewer 的采用报告。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工采用报告",
          body:
            "先不要接管任何工具，只为真实团队手工整理 20 份采用报告。",
          features: [
            "收集团队正在试用的 Agent 工具、仓库范围、连接器、记忆库、CI 结果和成本样本。",
            "标注文件索引范围、记忆留存方式、连接器权限、测试闭环、危险配置和回滚路径。",
            "输出一页 HTML/PDF：可批准、需限制、需补证据、暂不采用四类结论。",
          ],
        },
        {
          stage: "第 2 周",
          title: "只读扫描原型",
          body:
            "把重复检查点做成本地 WebApp 或 GitHub Action，默认只读，不保存敏感内容。",
          features: [
            "解析 README、配置文件、MCP/连接器配置、CI artifact、Agent 日志和 package/script 入口。",
            "识别 CLAUDE.md、.cursorrules、工作流脚本、外部服务、记忆路径和危险自动模式。",
            "给每条判断附证据片段和建议动作，避免只有模型总结。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "团队试点台账",
          body:
            "当报告被负责人使用后，再加入团队空间和周期复查。",
          features: [
            "按仓库、工具、负责人和试点阶段保存采用状态。",
            "记录每次工具升级、许可变化、模型降价、成本异常和回滚演练。",
            "生成客户安全问卷、内部审批和 reviewer 可读的导出报告。",
          ],
        },
      ],
      technical: [
        {
          title: "采集边界",
          status: "只读优先",
          body:
            "第一版只读文件名、配置片段、工具清单、CI 元数据和用户上传的日志样本。默认本地运行，避免把源码、密钥或完整聊天记录上传到云端。",
        },
        {
          title: "事件模型",
          status: "结构化",
          body:
            "把不同工具归一成 adoption evidence：tool、workspace、files_indexed、memory_retention、connector_scope、test_evidence、cost_signal、rollback。",
        },
        {
          title: "风险判断",
          status: "规则为主",
          body:
            "高风险动作用规则识别：自动模式、外部连接器、密钥路径、生产部署命令、可执行指令文件、未知脚本和无限留存记忆。LLM 只做解释和报告文案。",
        },
        {
          title: "交付形态",
          status: "报告先行",
          body:
            "早期最容易进入团队的不是大仪表盘，而是 PR comment、PDF、Markdown 报告和安全问卷附件。",
        },
      ],
      goToMarket: [
        "第一批用户找已经在试用 Claude Code、Codex、Cursor、Replit Agent、codegraph、agentmemory、MCP 连接器或成本优化工具的团队。他们已经有风险和评估任务，不需要被教育为什么 Agent 重要。",
        "免费入口可以是单仓库 Agent 采用检查，标题直接打痛点：这个工具会读哪些文件？记忆能不能删？自动模式适不适合开？",
        "销售路径是免费报告到团队试点台账，再到私有部署。团队预算来自安全审查、客户问卷、工程效率试点和 AI 成本控制。",
      ],
      pricing: [
        {
          name: "免费单工具检查",
          body:
            "检查一个仓库或一个 Agent 工具，输出基础风险和试点建议，用来获客。",
        },
        {
          name: "团队版 $99-399/月",
          body:
            "多仓库、多工具、历史报告、策略模板、Slack/GitHub 通知和导出。",
        },
        {
          name: "私有部署 $10k/年起",
          body:
            "给安全要求高的工程团队，卖源码不出域、SSO、审计留存、自定义规则和客户问卷导出。",
        },
      ],
      validation: [
        {
          week: "第 1 周：手工报告验证",
          body:
            "找 10 个正在试点 Agent 工具的团队，手工生成 20 份报告。成功标准是 5 个团队愿意把报告发给负责人或安全同事。",
        },
        {
          week: "第 2 周：只读扫描验证",
          body:
            "做本地原型，接入 3 个真实仓库，验证它能找出至少 3 类团队原本没写进试点文档的采用风险。",
        },
        {
          week: "成功标准",
          body:
            "至少 2 个团队愿意为月度试点复查或客户问卷导出付费，且能明确说出报告替代了哪段人工评估。",
        },
      ],
      risks: [
        "平台会补自己的审计功能，所以产品必须跨 Claude、Codex、Cursor、Replit、MCP、GitHub 和成本工具。",
        "采集源码和日志容易触发信任问题，MVP 必须默认本地、只读、脱敏。",
        "如果结论过度泛化，会变成普通安全扫描器；必须围绕“能否采用这个 Agent 工具”组织报告。",
        "个人开发者付费弱，目标客户要有团队审批、客户安全问卷或试点复盘压力。",
      ],
    },
    {
      subtitle:
        "把政策恐慌整理成员工、创始人和律师能共用的一页事实材料。",
      thesis:
        "Visa Change Triage 的价值不是替律师下判断，而是在规则变化和团队恐慌之间插入一个事实收集层。它能把员工身份路径、旅行计划、文件缺口、岗位日期和公开来源整理成律师问题清单，减少第一次沟通的浪费。",
      whyNow: [
        "BuilderPulse 记录绿卡处理变化引发 1,253 条讨论，讨论里反复出现家庭、领事等待、旅行限制和雇主不确定性。这是创业公司运营风险，不只是政治争论。",
        "买方和触发点都明确：创始人和 HR 要知道团队里谁可能受影响，员工要知道需要准备哪些事实，律师要减少来回追问基础信息。",
        "它虽然不是模型热点，但符合当天更大的模式：普通生活里的行政事务正在进入科技工作流，用户愿意为可转发的决策材料付费。",
      ],
      mvp: [
        {
          stage: "2 小时",
          title: "表单和样例报告",
          body:
            "先用无代码表单和静态样例验证，不碰账户系统。",
          features: [
            "收集身份路径、当前状态、国家、家属、旅行计划、雇主截止日期和已有律师信息。",
            "生成缺失事实清单、公开来源链接和律师问题列表。",
            "在报告顶部明确边界：信息整理，不提供法律建议。",
          ],
        },
        {
          stage: "第 1 周",
          title: "团队管理员视图",
          body:
            "给创始人或 HR 看聚合风险，而不是逐个翻表单。",
          features: [
            "按紧急程度、旅行计划、岗位关键性和资料完整度排序。",
            "支持员工自行更新事实，管理员只看必要摘要。",
            "导出给律师的 PDF/CSV，不包含不必要隐私。",
          ],
        },
        {
          stage: "第 2-4 周",
          title: "律师协作和模板库",
          body:
            "当一次性报告被使用后，加入律师审核过的措辞和状态更新。",
          features: [
            "保存律师批准的问题模板和地区说明。",
            "跟踪政策更新、员工回复和下一次复查日期。",
            "给团队生成沟通模板，减少 Slack 恐慌传播。",
          ],
        },
      ],
      technical: [
        {
          title: "隐私边界",
          status: "最小收集",
          body:
            "移民信息敏感，默认只收集生成报告所需事实；敏感字段加密保存，支持一键删除。",
        },
        {
          title: "结论边界",
          status: "不做法律判断",
          body:
            "系统只能整理事实、来源和问题。任何风险判断都应标为待律师确认。",
        },
        {
          title: "报告模板",
          status: "结构化",
          body:
            "报告固定为受影响摘要、缺失事实、时间线、公开来源、律师问题和下一步负责人。",
        },
        {
          title: "团队协作",
          status: "权限清楚",
          body:
            "员工、HR、创始人、律师看到的信息范围不同，不能把个人细节默认公开给全团队。",
        },
      ],
      goToMarket: [
        "第一批用户是有移民员工的初创公司创始人、HR 负责人和创始人社区。分发话术应是“第一次律师电话前先把事实准备好”。",
        "落地页不卖法律结论，卖准备材料：受影响人员、文件缺口、旅行限制、要问律师的问题。",
        "可以用 $19 样例报告获客，再对团队管理员视图、律师协作和批量导出收费。",
      ],
      pricing: [
        {
          name: "$19-49/份员工报告",
          body:
            "适合员工或小团队先整理一次事实。",
        },
        {
          name: "$99-299/团队事件",
          body:
            "按员工数、管理员视图、批量导出和律师协作收费。",
        },
        {
          name: "HR 订阅 $49-199/月",
          body:
            "当团队希望持续跟踪政策变化、员工资料和复查日期时再转订阅。",
        },
      ],
      validation: [
        {
          week: "当天：表单试跑",
          body:
            "用 Google Form 和 PDF 模板找 5 位有移民员工的创始人试跑，观察他们是否愿意转给 HR 或律师。",
        },
        {
          week: "第 1 周：付费验证",
          body:
            "收取 $19-49 做 3 份真实报告，确认报告是否减少第一次律师电话准备时间。",
        },
        {
          week: "成功标准",
          body:
            "至少 3 位创始人认可报告可转发，1 个团队愿意为多员工管理员视图付费。",
        },
      ],
      risks: [
        "法律相邻产品容易越界，所有结论必须交给律师确认。",
        "政策可能快速变化，报告必须保留来源时间和更新提示。",
        "敏感个人信息处理不当会毁掉信任，必须最小化收集和清楚删除。",
        "如果只靠单次新闻，需求可能衰减；可扩展到更广的员工政策变化分诊。",
      ],
    },
    {
      subtitle:
        "把模型降价、缓存路线和 API 节省承诺，翻译成任务级毛利和换模决策。",
      thesis:
        "AI 模型成本与毛利路线收据的核心不是显示 token 数，而是回答业务问题：这条任务该不该换到低价模型，节省承诺是否真实，质量回归会不会吞掉毛利，什么地方应该设预算硬上限。",
      whyNow: [
        "AI HOT 记录 DeepSeek 将 V4-Pro 75% 折扣永久化，并出现低成本缓存、硬件适配和输出 token 价格压力讨论。模型价格战正在改变封装产品的单位经济。",
        "BuilderPulse 同日记录 SemanticGuard 的成本节省主张，以及创始人社区对 token、订阅和定价单位的讨论。用户不只想知道便宜模型存在，而是想知道自己的任务能不能安全换。",
        "现有 provider dashboard 能看总额，benchmark 能看单点质量，但很少把任务、模型、重试、人工复核、收入和毛利放到同一张报告里。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工任务毛利审计",
          body:
            "找 10 个 AI 产品或内部工具团队，手工拆 50 个高频任务。",
          features: [
            "记录每类任务的模型、token、缓存、重试、人工复核、收入或内部价值。",
            "挑 3 个低价模型替代方案做小样本回归测试。",
            "输出换模建议、预算上限、质量风险和下一周实验。",
          ],
        },
        {
          stage: "第 2 周",
          title: "上传账单和样本",
          body:
            "做 WebApp 支持 usage CSV、账单导出和少量任务样本上传。",
          features: [
            "自动按任务、用户、模型、失败重试和缓存命中分组。",
            "生成异常成本、可替代任务、需要人工复核的质量风险。",
            "把 DeepSeek/SemanticGuard 这类外部节省主张转成用户自己的验证计划。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "持续毛利监控",
          body:
            "当一次性审计产生行动后，再做订阅监控。",
          features: [
            "每周检测模型价格、任务量、质量评分和毛利变化。",
            "告警预算硬上限、异常重试、模型质量下滑和低价替代机会。",
            "提供给 founder、财务和工程的不同视图。",
          ],
        },
      ],
      technical: [
        {
          title: "数据输入",
          status: "导出优先",
          body:
            "先支持 provider usage CSV、账单导出、手工任务标签和小样本人工评分，不急着深接所有网关。",
        },
        {
          title: "质量评估",
          status: "小样本回归",
          body:
            "每个换模建议必须绑定样本、人工评分或业务指标，不能只根据价格表推断。",
        },
        {
          title: "成本模型",
          status: "任务级",
          body:
            "成本按任务而不是按模型汇总，包含输入、输出、缓存、重试、工具调用、人工复核和失败成本。",
        },
        {
          title: "安全边界",
          status: "脱敏",
          body:
            "账单和任务样本可能含客户数据，默认脱敏上传，企业版支持本地或私有部署。",
        },
      ],
      goToMarket: [
        "第一批用户找每月 AI 成本超过 $500 的 AI 产品、agency、客服自动化和内部工具团队。他们已经能感到成本，但缺少任务级解释。",
        "免费入口是“DeepSeek 降价后你的任务该换模型吗？”和“API 成本节省是真是假？”，用少量任务样本换报告。",
        "内容渠道是 Indie Hackers、AI founder 社群、模型网关用户、OpenRouter/DeepSeek 讨论和成本优化工具评论区。",
      ],
      pricing: [
        {
          name: "一次性体检 $49-199",
          body:
            "拆一周账单和 5-10 类任务，输出换模和预算建议。",
        },
        {
          name: "团队监控 $99-499/月",
          body:
            "按 provider、任务量、成员、告警和历史留存收费。",
        },
        {
          name: "企业版 $10k/年起",
          body:
            "私有部署、财务视图、模型回归套件和采购报告。",
        },
      ],
      validation: [
        {
          week: "第 1 周：手工审计",
          body:
            "找 10 个团队拆 50 个任务，确认至少 5 个团队能据此调整模型、缓存或预算上限。",
        },
        {
          week: "第 2 周：原型上传",
          body:
            "支持账单导出上传和任务标注，验证用户是否愿意每周重复导入。",
        },
        {
          week: "成功标准",
          body:
            "至少 2 个团队愿意为持续监控付费，并能量化一个任务的毛利改善或风险降低。",
        },
      ],
      risks: [
        "Provider 和模型网关会增加成本分析功能，产品必须绑定业务任务和毛利，而不是停留在 token dashboard。",
        "低价模型质量波动可能导致用户损失，换模建议必须保留人工确认和回滚。",
        "用户未必有干净的任务标签，早期需要手工辅助分类。",
        "如果只追逐某个模型降价新闻，需求会过期；长期价值在持续路线和毛利监控。",
      ],
    },
  ],
  "2026-05-23": [
    {
      subtitle:
        "把 AI 抄袭、爬虫压力和 llms.txt 困惑，变成出版者能行动的一页证据报告。",
      thesis:
        "来源署名与机器访问收据的核心不是替出版者打版权官司，而是在流量、署名和托管成本出问题之前，把证据和下一步动作整理出来。买方要知道哪些内容被复用、引用是否清楚、机器访问路径是否合理、爬虫是否制造成本，以及自己该外联、授权、屏蔽还是提供更好的批量访问。",
      whyNow: [
        "5.23 的强信号不是单个模型，而是内容所有权从理念争论进入运营问题：原创内容被复用、搜索流量被拿走、站点仍承担托管和带宽成本。",
        "Anna's Archive 的机器访问说明把问题从“只封锁爬虫”推进到“给机器一条可追责、低成本、可授权的访问路径”。这让 llms.txt、API、批量下载和捐赠/授权成为产品化入口。",
        "现有方案分散在 SEO 工具、日志分析、robots.txt、法律咨询和手工搜索里，没有一份出版者能直接转发的收据。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工来源署名审计",
          body:
            "先为 10 个原创内容站手工做报告，不急着自动化所有检测。",
          features: [
            "用户提交 3-5 个核心 URL、sitemap 或样例文章。",
            "手工搜索重复短语、AI 生成页面、答案摘要和明显缺失署名的引用。",
            "输出一页报告：证据链接、截图、复用片段、是否有署名、下一步建议。",
          ],
        },
        {
          stage: "第 2 周",
          title: "自助 URL 检查器",
          body:
            "把最稳定的步骤做成 WebApp，先卖一次性审计。",
          features: [
            "读取页面标题、正文指纹、关键短语和结构化数据。",
            "生成 llms.txt 准备度、授权文案、引用说明和外联草稿。",
            "支持上传访问日志，标记高频机器流量、热门被抓页面和带宽压力。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "月度监控和授权台账",
          body:
            "当一次性报告证明价值后，再转成订阅。",
          features: [
            "每月保存搜索结果快照、重复片段、新爬虫和引用变化。",
            "记录外联对象、授权状态、屏蔽动作和站点机器访问策略。",
            "为文档团队和媒体提供白标报告，给客户或编辑负责人复盘。",
          ],
        },
      ],
      technical: [
        {
          title: "检测边界",
          status: "证据优先",
          body:
            "第一版不承诺自动判定侵权，只展示重复片段、引用缺失、搜索快照和日志证据。结论必须能回到 URL、截图或日志行。",
        },
        {
          title: "日志处理",
          status: "本地脱敏",
          body:
            "访问日志可能包含 IP、路径和用户信息。默认本地解析或上传前脱敏，只保存 bot 家族、路径、频率和成本估算。",
        },
        {
          title: "llms.txt 生成",
          status: "策略模板",
          body:
            "按站点类型生成机器访问说明：允许机器读取哪些内容、推荐 API/下载路径、署名要求、限流和联系邮箱。",
        },
        {
          title: "报告形态",
          status: "可转发",
          body:
            "早期最值钱的是一页 PDF/HTML 收据，能给作者、编辑、客户、合作方或平台支持团队看。",
        },
      ],
      goToMarket: [
        "第一批用户找独立教程站、文档团队、垂直媒体、开源知识库和高 SEO 价值内容业务。他们有原创资产，也能感知流量变化。",
        "免费入口是“AI 是否复用了你的页面？”和“llms.txt 准备度检查”，用少量 URL 换取样板报告。",
        "内容分发重点放在 HN、Lobsters、Indie Hackers、SEO 社区、文档工程和独立出版者圈层。",
      ],
      pricing: [
        {
          name: "首次审计 $29-99",
          body:
            "检查一个站点或一组核心文章，输出证据、llms.txt 建议和外联/屏蔽动作。",
        },
        {
          name: "月度监控 $19-99/月",
          body:
            "按页面数、日志量、搜索快照次数和外联台账收费。",
        },
        {
          name: "团队版 $299+/月",
          body:
            "多站点、多作者、白标报告、授权模板、日志保留和团队协作。",
        },
      ],
      validation: [
        {
          week: "第 1 周：20 份手工样板",
          body:
            "找 20 个内容站，各做 1 份手工报告。成功标准是至少 10 个站点发现可外联、可屏蔽或可改机器访问说明的证据。",
        },
        {
          week: "第 2 周：付费审计",
          body:
            "把完整报告定价 $29-99，验证是否有 3 个站点愿意为下一轮监控留下付款信息。",
        },
        {
          week: "第 3 周：监控复购",
          body:
            "连续监控两周，验证用户是否因为新增复用页面、爬虫压力或署名变化而继续打开报告。",
        },
      ],
      risks: [
        "法律归因复杂，产品不能承诺维权成功，只能卖证据和下一步动作。",
        "搜索结果和 AI 答案波动大，报告必须保留时间、地区、查询词和截图。",
        "大平台可能改善引用机制，但独立站仍需要自己的机器访问策略和日志证据。",
        "如果只做情绪化“反 AI”工具，市场会变窄；要同时提供开放访问、授权和引用路径。",
      ],
    },
    {
      subtitle:
        "把 Agent 测试、权限和多步骤开发工作流，压成 reviewer 能验收的证据包。",
      thesis:
        "Agent 测试与权限验收台的价值在于，团队不缺又一个能跑任务的 Agent，而缺少能证明任务被正确测试、权限被合理使用、失败被记录、人工接管清楚的一页收据。它先服务 PR、CI 和开发者工具工作流，比做完整 Agent 平台更窄、更容易付费。",
      whyNow: [
        "TestSprite、DCP、buildpipe、Kanbots 和 Rmux 说明开发者工具正在转向多 Agent、并行测试、权限加密和可编排任务。",
        "买方真正的问题不是“能不能自动化”，而是“我怎么知道自动化工作真的安全、完整、可合并”。这让测试策略和权限验收进入预算语言。",
        "现有 CI、测试平台和 Agent 日志各自有信息，但缺少跨工具、面向 reviewer 的验收报告。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "30 个任务手工验收",
          body:
            "找 5 个正在用 Agent 跑测试或开发流程的团队，手工整理 30 个任务。",
          features: [
            "记录任务目标、测试命令、通过/失败、重试、截图、权限触达和人工确认。",
            "标记未覆盖路径、敏感权限、密钥接触和需要 reviewer 决策的点。",
            "输出 PR 可读的 merge 前 checklist。",
          ],
        },
        {
          stage: "第 2 周",
          title: "GitHub/CI 旁路原型",
          body:
            "以 PR comment 和 CI artifact 进入现有工作流。",
          features: [
            "读取测试结果、CI 日志、Agent step log、权限配置和 PR diff。",
            "生成测试覆盖、未验证路径、权限触达、失败重试和人工接管摘要。",
            "给每条结论附证据链接，避免只给模型总结。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "团队规则和历史趋势",
          body:
            "当 reviewer 开始使用报告后，再做团队规则库。",
          features: [
            "按任务类型保存验收模板：测试、修复、部署、数据迁移、通知。",
            "统计 Agent 成功率、返工率、权限触达和常见失败原因。",
            "支持团队自定义阻断规则和审批记录。",
          ],
        },
      ],
      technical: [
        {
          title: "输入范围",
          status: "CI 优先",
          body:
            "优先接 GitHub Actions、JUnit/Playwright/Appium 输出、PR diff 和用户上传的 Agent 轨迹。",
        },
        {
          title: "权限模型",
          status: "最小集合",
          body:
            "先记录工具、密钥、环境变量和外部服务类型，不读取 secret 值。",
        },
        {
          title: "验收判断",
          status: "证据驱动",
          body:
            "通过/失败来自测试和人工确认，LLM 只做摘要和解释，不独立决定是否可合并。",
        },
        {
          title: "交付形态",
          status: "嵌入 PR",
          body:
            "早期不要做大仪表盘。PR comment、CI artifact、Slack 摘要最容易进入团队习惯。",
        },
      ],
      goToMarket: [
        "第一批用户找已经使用 TestSprite、Cursor、Claude Code、Codex、自建 Agent 或多步骤 CI 自动化的团队。",
        "开源一个 PR comment bot 获客，免费生成基础验收，团队版卖历史、规则、私有部署和审计导出。",
        "内容标题用“Agent 写的 PR 怎么验收”“并行智能体测试证明了什么”“AI workflow 权限 checklist”。",
      ],
      pricing: [
        {
          name: "开源基础版",
          body:
            "单仓库基础 PR 验收免费。",
        },
        {
          name: "团队版 $49-299/月",
          body:
            "多仓库、任务历史、规则模板、Slack 告警和报告导出。",
        },
        {
          name: "企业版 $5k-25k/年",
          body:
            "私有部署、SSO、审计留存、自定义阻断和安全团队报告。",
        },
      ],
      validation: [
        {
          week: "第 1 周：手工报告",
          body:
            "为 30 个真实 Agent 任务生成报告，验证 reviewer 是否减少复盘时间，并发现原先遗漏的测试或权限问题。",
        },
        {
          week: "第 2 周：PR bot",
          body:
            "接入 2 个真实仓库，观察 reviewer 是否引用报告决定合并或要求补测。",
        },
        {
          week: "第 3 周：团队付费",
          body:
            "让团队配置 3 条验收规则，验证他们是否愿意为历史和阻断付费。",
        },
      ],
      risks: [
        "如果只是 trace viewer，会被测试平台内置功能替代；必须围绕权限和验收结论组织信息。",
        "Agent 日志格式分散，初期必须限定输入。",
        "团队可能不愿上传源码和日志，默认只保存元数据和证据链接。",
        "个人开发者付费弱，要找有 reviewer/QA 协作压力的团队。",
      ],
    },
    {
      subtitle:
        "把固定订阅、token、模型降价和 Agent 重试，翻译成任务级成本异常报告。",
      thesis:
        "AI 用量成本异常收据不是 provider dashboard，而是帮 founder 和团队负责人回答：哪类任务最贵、固定订阅背后的真实边际成本是多少、降价模型是否适合替换、哪些重试或并发正在吞预算、什么情况下人工更便宜。",
      whyNow: [
        "$200/month 计划下声称 $30,983 token 用量的故事，把固定订阅和真实成本之间的裂缝摆到台面上。",
        "DeepSeek 永久降价、并发扩容和 Microsoft AI 成本讨论说明模型价格在变，但 Agent 任务长度、重试和人工复核会让真实成本继续复杂化。",
        "现有账单页只能告诉用户总额，不告诉用户哪条业务 workflow 应该改模型、设上限或转人工。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工账单体检",
          body:
            "找 10 个 AI 产品或内部工具团队，手工拆一周账单和 5-10 个高频任务。",
          features: [
            "按任务归类 token、模型、重试、人工复核和最终产物。",
            "标记异常任务、浪费重试、低价模型替代和人工更便宜的场景。",
            "输出预算硬上限和下周行动清单。",
          ],
        },
        {
          stage: "第 2 周",
          title: "账单导入 WebApp",
          body:
            "支持 usage CSV、provider export 和手工任务样本。",
          features: [
            "自动生成任务级成本、模型路线建议、补贴消耗和异常趋势。",
            "模拟 DeepSeek/Google/OpenAI/Anthropic 不同模型组合下的月成本。",
            "设置项目、用户、任务和每日 hard ceiling。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "告警和路线建议",
          body:
            "当团队持续上传后，再进入监控。",
          features: [
            "Slack 告警：预算接近上限、重试异常、某成员用量激增。",
            "质量记录：成本下降是否带来返工或失败。",
            "财务视图：按客户、项目和功能计算毛利。"
          ],
        },
      ],
      technical: [
        {
          title: "数据边界",
          status: "导入优先",
          body:
            "先支持 CSV/JSON 导入和用户手工标签，不急着接所有 provider OAuth。",
        },
        {
          title: "任务归因",
          status: "半自动",
          body:
            "用路径、API key、metadata、用户标签和时间窗口归因，允许用户手工修正。",
        },
        {
          title: "隐私处理",
          status: "不存 prompt",
          body:
            "默认只存任务类型、token、模型、成本和状态，不保存完整 prompt 与输出。",
        },
        {
          title: "建议逻辑",
          status: "成本+质量",
          body:
            "不能只推荐最便宜模型，必须结合失败率、人工修复和客户影响。",
        },
      ],
      goToMarket: [
        "第一批用户找 AI wrapper、内部工具团队、agency 和每月 AI 成本超过 $200 的 solo founder。",
        "免费入口是“你的 $200 订阅背后实际跑了多少钱”和“DeepSeek 降价后任务成本模拟”。",
        "销售话术直接连到毛利、预算上限和账单异常，而不是抽象 FinOps。",
      ],
      pricing: [
        {
          name: "一次性体检 $19-99",
          body:
            "上传一周 usage，得到异常任务和模型路线报告。",
        },
        {
          name: "团队监控 $49-299/月",
          body:
            "多项目、多 provider、预算告警、历史趋势和 Slack 通知。",
        },
        {
          name: "企业版 $5k/年起",
          body:
            "私有部署、SSO、财务视图、自定义成本中心和审计留存。",
        },
      ],
      validation: [
        {
          week: "第 1 周：10 份账单报告",
          body:
            "找 10 个真实团队拆 50 个任务，验证是否能发现一个要换模型、设上限或转人工的结论。",
        },
        {
          week: "第 2 周：导入原型",
          body:
            "上线 usage 导入，让用户自己看到异常任务和模拟节省。",
        },
        {
          week: "第 3 周：告警验证",
          body:
            "让 3 个团队设置 hard ceiling，观察是否阻止重试循环或预算超支。",
        },
      ],
      risks: [
        "Provider 会补 dashboard，独立产品必须做任务级和业务可读。",
        "用量归因可能不准，要允许用户手工修正并记录置信度。",
        "单纯省钱会伤质量，必须记录失败率和人工修复成本。",
        "早期数据接入敏感，默认不存 prompt 是采用门槛。",
      ],
    },
  ],
  "2026-05-22": [
    {
      subtitle:
        "把 Claude、Cursor、MCP、编辑器扩展和安全工具，翻译成企业能采购、能审计、能复查的一页证据。",
      thesis:
        "AI 工具链合规证据台的核心价值，不是替代 SIEM、DLP 或安全平台，而是把分散在 AI 工具、代码仓库、编辑器扩展、MCP 连接器和企业安全系统里的事实串起来。买方真正要的不是又一个仪表盘，而是能回答客户安全问卷、内部审计和事故复盘的证据包：谁用了什么 AI 工具，碰了什么数据，哪些活动有日志，哪些权限仍然不可见。",
      whyNow: [
        "Claude Compliance API 和安全工具集成说明大模型平台正在进入企业治理层；同一天 BuilderPulse 仍在追踪编辑器扩展与仓库泄露带来的信任问题，风险已经从单一聊天工具扩展到完整开发环境。",
        "团队采用 AI 的速度快于安全流程更新速度。工程师会先安装扩展、接 MCP、把 Agent 连到仓库和文档，安全团队往往在客户问卷或事故之后才开始补清单。",
        "现有替代方案只能覆盖各自系统：Claude 管理台看 Claude，GitHub audit log 看仓库，SIEM 看已接入事件。缺口是跨工具解释和负责人可读交付物。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工 AI 工具链盘点",
          body:
            "先找 5-8 个已经使用 Claude、Cursor、MCP 或 AI 编码助手的团队，人工收集他们的工具清单、扩展清单、审计日志样本和客户安全问卷。",
          features: [
            "工具地图：Claude、ChatGPT、Cursor、VS Code 扩展、MCP server、AI 网关、安全工具和仓库权限。",
            "证据表：哪些活动有日志，哪些能导出，哪些进入 SIEM/DLP，哪些只能靠人工截图。",
            "风险排序：高权限连接器、可读私有文件的扩展、未记录的聊天/文件内容、无 owner 的 API key。",
          ],
        },
        {
          stage: "第 2 周",
          title: "只读证据台 WebApp",
          body:
            "把手工盘点产品化成导入式报告，不急着做实时监控。支持上传 Claude 合规导出、GitHub audit log、扩展清单和 MCP 配置。",
          features: [
            "自动生成客户安全问卷可复用答案，包括日志范围、数据保留、撤销路径和人工复核点。",
            "按工具、成员、仓库和数据类型展示 coverage gap。",
            "导出 PDF/HTML 报告，供安全负责人、采购和客户成功转发。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "月度复查与审批流",
          body:
            "当团队愿意重复使用报告后，再加入月度 diff、审批记录和连接器变更提醒。",
          features: [
            "新增扩展、MCP server 或高权限 key 时提醒 owner 复核。",
            "保存每次复查证据，形成审计历史。",
            "把建议拆成禁用、补日志、补审批、接受风险四类动作。",
          ],
        },
      ],
      technical: [
        {
          title: "集成边界",
          status: "先导入",
          body:
            "第一版只支持 CSV、JSON、截图转录和配置文件上传。Claude Compliance API、GitHub audit log 和扩展清单足够验证报告价值，避免早期陷入复杂 OAuth 和企业部署。",
        },
        {
          title: "判断逻辑",
          status: "规则优先",
          body:
            "把权限、日志覆盖、数据类型、owner、撤销路径和复查频率做成明确规则。LLM 只负责把证据翻译成问卷答案和负责人摘要。",
        },
        {
          title: "安全设计",
          status: "默认脱敏",
          body:
            "客户上传的日志默认本地脱敏，报告只保留工具名、权限类型、时间范围和风险等级。原始聊天内容、文件内容和 secrets 不应默认进入云端。",
        },
        {
          title: "输出形态",
          status: "报告先行",
          body:
            "早期最值钱的是可转发报告和问卷答案，不是实时控制台。等用户把报告纳入采购或内审流程后，再卖持续监控。",
        },
      ],
      goToMarket: [
        "先从正在用 Claude Enterprise、Cursor、MCP、GitHub Copilot 或 AI 网关的 20-200 人团队切入，目标角色是安全负责人、工程负责人和要填客户安全问卷的 founder。",
        "免费入口做“AI 工具链审计样板报告”，用户上传清单后看到 5 个高风险缺口，再引导预约手工复查。",
        "内容获客围绕 Claude Compliance API、MCP 安全、Cursor/VS Code 扩展信任、客户安全问卷 AI 章节，而不是泛泛讲 AI 治理。",
      ],
      pricing: [
        {
          name: "样板报告 $0",
          body:
            "免费扫描 5 个工具或 1 个仓库，输出公开风险和缺口样例，用来验证用户是否愿意提供真实配置。",
        },
        {
          name: "团队版 $99-499/月",
          body:
            "按成员数、工具数、连接器数、报告次数和月度 diff 收费，适合小团队持续复查。",
        },
        {
          name: "审计包 $2k-10k/次",
          body:
            "面向客户安全问卷、SOC2 准备或企业采购审查，提供人工校验、白标报告和风险接受记录。",
        },
      ],
      validation: [
        {
          week: "第 1 周：人工交付",
          body:
            "找 8 个真实团队，手工盘点 20 个 AI 活动与连接器，判断安全负责人是否愿意把报告发给客户或采购。",
        },
        {
          week: "第 2 周：导入式原型",
          body:
            "支持上传 3 类证据：Claude 合规导出、GitHub audit log、扩展/MCP 清单。观察用户是否愿意复跑第二次。",
        },
        {
          week: "成功标准",
          body:
            "至少 3 个团队愿意付费获得完整报告，2 个团队把输出用于客户问卷或内部审查，并提出下一次复查日期。",
        },
      ],
      risks: [
        "大安全厂商和 AI 平台会继续补集成；独立产品不能只做单平台日志展示，必须跨工具并交付问卷/审计场景。",
        "如果只面向个人开发者，付费会弱；必须尽快绑定企业采购、客户安全问卷、审计或事故复盘。",
        "处理日志和配置本身有敏感性，产品必须默认脱敏、本地优先，并给用户清楚的数据删除路径。",
      ],
    },
    {
      subtitle:
        "让每一次云端 Agent 改代码，都留下环境、权限、测试、截图、成本和人工接管点。",
      thesis:
        "云端 Agent 运行验收收据卖的不是更聪明的编码模型，而是工程团队愿意信任无人值守任务的证据。Agent 可以在独立环境里改代码、跑测试、发 PR、录屏和持续重试，但 reviewer 仍然需要知道它到底做了什么、验证了什么、没有验证什么。",
      whyNow: [
        "Cursor 云端 Agent、远程桌面、移动/Slack/GitHub 触发和自测试能力正在把编码 Agent 从本地协作推向后台执行。",
        "后台执行越多，工程负责人越难只靠 PR diff 判断风险。环境差异、凭证访问、失败重试、测试跳过和模型成本都会变成复核成本。",
        "现有 CI 和代码审查工具关注代码结果，缺少一份把任务目标、Agent 轨迹、环境和验证证据合并的收据。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "PR 手工验收报告",
          body:
            "挑 30 个由 Agent 生成或修改的 PR，人工整理任务目标、改动范围、测试结果、截图/录屏、失败记录和 reviewer 疑问。",
          features: [
            "PR 摘要：Agent 收到的任务、涉及文件、关键决策和未解决问题。",
            "验证证据：CI、单测、手动测试、截图、录屏、日志和缺失测试。",
            "风险提示：高权限文件、配置变更、依赖升级、数据迁移和无法复现的环境。",
          ],
        },
        {
          stage: "第 2 周",
          title: "GitHub App 原型",
          body:
            "把报告嵌入 PR comment。先支持 GitHub、CI 日志和用户粘贴的 Agent 轨迹，不需要接所有 Agent 平台。",
          features: [
            "自动采集 diff、CI 状态、提交历史和测试命令。",
            "让 reviewer 勾选验收项：可运行、可回滚、覆盖关键路径、无敏感文件泄露。",
            "生成 merge 前剩余风险和建议下一步。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "跨 Agent 任务历史",
          body:
            "当用户愿意在 PR 里使用后，再沉淀团队级任务历史和 Agent 质量分。",
          features: [
            "按 Agent、模型、任务类型统计成功率、返工率和平均复核时间。",
            "标记哪些任务适合后台运行，哪些必须同步人工陪跑。",
            "按仓库或服务生成月度 Agent 可靠性报告。",
          ],
        },
      ],
      technical: [
        {
          title: "输入来源",
          status: "PR 优先",
          body:
            "第一版只需要 GitHub PR、CI、截图/录屏 URL 和可选 Agent log。不要一开始适配所有 IDE。",
        },
        {
          title: "验收模型",
          status: "Checklist + evidence",
          body:
            "每条结论必须指向证据：测试命令、日志、截图、文件 diff 或人工确认。避免让 LLM 自信地判断可合并。",
        },
        {
          title: "权限边界",
          status: "只读",
          body:
            "早期 GitHub App 只读仓库和 PR 状态，PR 评论也应明确可关闭。等用户信任后再考虑阻断合并。",
        },
        {
          title: "数据保留",
          status: "短留存",
          body:
            "默认不保存完整源码，只保存报告、证据链接和结构化元数据。企业版再支持私有部署或自托管存储。",
        },
      ],
      goToMarket: [
        "从每周运行大量 Cursor、Claude Code、Codex 或自建 Agent 任务的工程团队切入，目标人群是 reviewer、engineering manager 和 platform engineer。",
        "开源一个 PR comment bot，免费生成基础验收 checklist；团队版卖历史、规则、报告模板和私有部署。",
        "内容角度用“Agent 写的 PR 怎么验收”“云端 Agent 失败复盘模板”“merge-ready 证据清单”。",
      ],
      pricing: [
        {
          name: "开源基础版",
          body:
            "免费生成单 PR 验收评论，适合获客和收集 Agent 任务样本。",
        },
        {
          name: "团队版 $49-299/月",
          body:
            "按仓库、PR 数、规则模板、历史留存和团队仪表盘收费。",
        },
        {
          name: "企业版 $5k/年起",
          body:
            "私有部署、SSO、审计留存、自定义阻断规则和安全团队报告。",
        },
      ],
      validation: [
        {
          week: "第 1 周：手工 PR 复盘",
          body:
            "拿 30 个 Agent PR 手工生成验收收据，比较 reviewer 原本复核时间和报告后复核时间。",
        },
        {
          week: "第 2 周：PR bot",
          body:
            "做一个只读 GitHub App，给 3 个团队的真实 PR 留下报告评论，观察是否被保留或要求调整格式。",
        },
        {
          week: "成功标准",
          body:
            "至少 2 个团队愿意持续安装，报告能发现 5 个以上原本 reviewer 没立即看到的未验证点或权限风险。",
        },
      ],
      risks: [
        "Cursor、GitHub 和 CI 平台可能内置类似能力；独立产品要跨 Agent、跨 CI，并做出工程负责人可比较的历史。",
        "如果报告太长会增加 reviewer 负担；必须输出清晰的 merge blocker 和可忽略项。",
        "Agent log 标准不统一，第一版要接受粘贴和上传，避免被平台适配拖慢。",
      ],
    },
    {
      subtitle:
        "移动端、家庭设备、财务账户和 AI 内容发布，都需要一份上线前权限与责任说明。",
      thesis:
        "端侧 Agent 权限与发布验收包的切口，是把 AI 功能从 demo 推到真实用户前的那一刻。Android ADK、Gemini for Home、个人财务连接和 AI 视频广告都让产品经理面对同一个问题：这个 Agent 会碰什么数据、谁确认、如何撤销、失败后谁负责。",
      whyNow: [
        "Google ADK for Android 让开发者更容易把 Agent 放进移动应用；Gemini for Home、ChatGPT 个人财务和内容生成工具说明 Agent 正进入更敏感的家庭、账户和品牌场景。",
        "端侧 AI 的难点不是能否调用模型，而是权限、隐私、离线/在线边界、用户确认和平台审核。",
        "普通隐私政策太长，工程 checklist 太散，法务审阅太慢。团队需要的是每次 release 都能复用的发布验收包。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工发布前验收包",
          body:
            "找 6 个正在做移动端 AI、家庭设备 AI、金融连接或 AI 内容发布的团队，手工把他们的功能拆成数据流和权限清单。",
          features: [
            "数据流：本地处理、云端处理、第三方模型、存储位置、删除路径。",
            "用户控制：首次授权、敏感动作确认、撤销入口、导出和客服解释。",
            "发布风险：平台政策、儿童/家庭/财务/健康等敏感场景、品牌安全和误触发。",
          ],
        },
        {
          stage: "第 2 周",
          title: "场景化问卷生成器",
          body:
            "把手工方法变成 WebApp。用户选择 Android Agent、家庭摄像头、财务连接、AI 广告或内容编辑场景，填写少量问题后生成验收包。",
          features: [
            "生成产品文案、隐私说明、审核 checklist、内部风险记录和客服 FAQ。",
            "按版本保存差异，方便 release manager 复查。",
            "给高风险项标注必须人工确认或法务复核。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "团队发布流程",
          body:
            "让报告进入 release checklist，而不是停留在一次性文档。",
          features: [
            "审批：产品、工程、法务、安全分别确认。",
            "证据：截图、配置、权限弹窗和模型位置留档。",
            "复用模板：同类功能下次发布自动带出历史风险。",
          ],
        },
      ],
      technical: [
        {
          title: "规则库",
          status: "场景模板",
          body:
            "先维护 5 类模板：移动 Agent、家庭设备、财务连接、AI 内容发布、企业应用。每类模板包含数据、权限、用户控制和发布渠道问题。",
        },
        {
          title: "生成方式",
          status: "结构化优先",
          body:
            "用户答案先进入结构化 schema，再由 LLM 生成文案。这样每次 release 的差异可比较、可审计。",
        },
        {
          title: "证据附件",
          status: "轻量",
          body:
            "支持上传截图、权限弹窗、配置片段和测试说明。不要要求用户上传完整代码。",
        },
        {
          title: "合规边界",
          status: "不做法律意见",
          body:
            "产品输出发布准备和风险说明，不声称替代律师或平台审核。高风险项明确提示人工复核。",
        },
      ],
      goToMarket: [
        "从 Android AI 开发者、DTC 内容团队、智能硬件服务商和需要客户交付说明的 AI app 团队切入。",
        "SEO 页面围绕“Android ADK privacy checklist”“AI financial account connection disclosure”“AI video ad review checklist”。",
        "与模板库、发布管理工具、隐私政策生成器形成互补，卖的是每次 release 的版本化证据。",
      ],
      pricing: [
        {
          name: "单次报告 $19-49",
          body:
            "适合 solo founder 或小团队在发布前生成一份验收包。",
        },
        {
          name: "团队版 $99-299/月",
          body:
            "按项目、版本、审批成员、模板和白标导出收费。",
        },
        {
          name: "代理商版 $499+/月",
          body:
            "给为客户交付 AI 内容或 AI 功能的代理商，支持多客户空间和白标报告。",
        },
      ],
      validation: [
        {
          week: "第 1 周：手工报告",
          body:
            "为 6 个真实功能手工生成发布验收包，观察团队是否把它纳入 release checklist。",
        },
        {
          week: "第 2 周：问卷原型",
          body:
            "上线 5 个场景模板，记录用户在哪些问题上停住，以及是否愿意导出报告。",
        },
        {
          week: "成功标准",
          body:
            "至少 10 个团队生成完整报告，3 个团队愿意付费保存版本历史或白标交付。",
        },
      ],
      risks: [
        "平台政策变化快，规则库需要持续维护；早期应聚焦少数高频场景。",
        "个人开发者付费可能低，必须绑定发布审核、客户交付或品牌安全场景。",
        "如果输出过于泛泛，会被隐私政策生成器替代；必须保留版本差异、证据附件和审批记录。",
      ],
    },
  ],
  "2026-05-21": [
    {
      subtitle:
        "把模型升级、API 补贴和长任务执行，翻译成 founder 能读懂的预算、质量和人工边界收据。",
      thesis:
        "Agent 成本与模型选择收据的核心价值，不是再做一个模型排行榜，而是把真实任务放进同一个决策框架：哪个模型够用、会花多少钱、失败重试会怎样放大成本、补贴结束后还能不能盈利、哪些步骤必须人工接管。它卖的是团队的成本纪律和交付责任。",
      whyNow: [
        "Qwen3.7-Max、Gemini 3.5 Flash 和 OpenAI YC API credits 同时出现，让创业团队更容易大规模试 Agent，也更容易在没有预算上限时把试验成本滚大。",
        "模型能力提升正在把更多工作从单次 prompt 变成长任务：代码修改、安卓开发、数据处理、营销发布和内部自动化。长任务的成本不是一次调用，而是规划、工具调用、失败重试和人工复核的总账。",
        "现有 provider dashboard 主要告诉用户花了多少钱，但不解释“为什么花、该换谁、下次怎么设上限”。这正是小团队愿意为一页负责人报告付费的空白。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工模型路线报告",
          body:
            "先不要接所有 API。找 10 个团队，各收集 5-10 个高频 Agent workflow，用手工表格和小样本复跑生成一份路线报告。",
          features: [
            "任务模板：代码修改、文档处理、测试生成、数据分析、营销生成和客服流转。",
            "对每个任务给出推荐模型、备选模型、本地可行性、预计成本、失败重试成本和人工接管点。",
            "输出 founder 可读摘要：本月预算上限、最容易爆账单的任务、补贴结束后的真实单元经济。",
          ],
        },
        {
          stage: "第 2 周",
          title: "成本收据 WebApp",
          body:
            "把手工报告产品化成上传日志或粘贴任务样本的 WebApp，先支持 2-3 个 provider 和 CSV/JSON 导入。",
          features: [
            "导入 OpenAI、Anthropic、Google 或网关账单导出，按任务归类费用。",
            "设置 hard ceiling：单任务、单用户、单项目和每日预算阈值。",
            "生成 burn-down 图：API credits 还够跑多久，补贴结束后月账单会是多少。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "运行中告警与路由建议",
          body:
            "当报告被团队反复使用后，再加入实时告警和建议，不急着做全自动模型路由。",
          features: [
            "预算快到线时发 Slack/邮件，并建议暂停、降级模型或转人工。",
            "保存任务质量评分，避免只按便宜模型路由导致交付失败。",
            "团队策略：哪些任务允许高价模型，哪些必须先跑低价或本地模型。",
          ],
        },
      ],
      technical: [
        {
          title: "数据边界",
          status: "先导入后集成",
          body:
            "第一版支持账单 CSV、API usage export 和用户粘贴任务样本，比直接接所有 provider OAuth 更快验证。敏感 prompt 默认本地脱敏，只上传任务类型和成本指标。",
        },
        {
          title: "成本模型",
          status: "任务级",
          body:
            "不要只按 token 汇总。每条任务应包含模型、输入、输出、工具调用、重试、失败、人工接管和最终产物，才能解释为什么同一个 workflow 成本不同。",
        },
        {
          title: "质量判断",
          status: "人工评分优先",
          body:
            "早期不需要自动评测所有输出。让用户给任务结果打 1-5 分，并记录是否需要人工修复，足以生成模型路线建议。",
        },
        {
          title: "告警策略",
          status: "硬上限清楚",
          body:
            "预算阈值必须能解释：为什么触发、影响哪些项目、暂停哪个 key 或 workflow、谁需要批准继续跑。",
        },
      ],
      goToMarket: [
        "免费入口是“Gemini 3.5 Flash 成本上移后你的 Agent 任务贵了多少”和“OpenAI credits burn-down calculator”。这些页面用用户自己的任务样本换取报告。",
        "第一批用户找 YC/独立创业团队、AI wrapper、内部工具团队和 agency。他们最容易同时拥有多模型使用、补贴、客户交付和账单压力。",
        "销售话术不要讲模型路由平台，而讲“下周开始跑 Agent 前，先知道哪个任务会把预算烧穿”。",
      ],
      pricing: [
        {
          name: "免费一次性报告",
          body:
            "上传一周 usage 或 5 个任务样本，返回成本热点、模型建议和补贴消耗估算。",
        },
        {
          name: "团队版 $49-299/月",
          body:
            "多项目、多 provider、预算告警、历史报告、Slack 通知、任务模板和模型路线建议。",
        },
        {
          name: "企业版 $5k/年起",
          body:
            "私有部署、SSO、内部模型网关对接、审计留存、自定义策略和财务/工程双视图。",
        },
      ],
      validation: [
        {
          week: "第 1 周：10 份手工报告",
          body:
            "找 10 个真实团队，每队拿一周 usage 或 5 个 workflow。成功标准是至少 6 队发现一个会调整模型、预算或人工接管规则的结论。",
        },
        {
          week: "第 2 周：付费试点",
          body:
            "把持续监控定价 $49/月，验证 3 个团队是否愿意连接 usage export 或每周上传账单。",
        },
        {
          week: "第 3 周：告警验证",
          body:
            "让 2 个团队设置预算阈值，观察告警是否阻止一次不必要的高价模型运行或重试循环。",
        },
      ],
      risks: [
        "Provider 和模型网关会补 token dashboard；差异化必须是任务级、buyer-readable、能指导模型选择和预算动作。",
        "如果只追求省钱，用户可能牺牲质量；报告必须同时记录交付质量和人工修复成本。",
        "API credits 会让早期团队低估真实账单，所以必须把补贴结束后的单元经济作为核心视图。",
        "账单与 prompt 数据敏感，默认脱敏和本地导入会直接影响采用率。",
      ],
    },
    {
      subtitle:
        "把仓库、凭证、代码索引和 Agent 日志串成安全事件后的影响范围收据。",
      thesis:
        "AI Agent 安全事件响应收据的机会在于，AI 编码和自动化工具让安全事件的影响面从仓库扩展到索引、工具调用、MCP、CI、桌面配置和云凭证。买方需要的不是新闻判断，而是事件后 24 小时内能交给负责人和客户的范围说明。",
      whyNow: [
        "GitHub 未授权访问调查、AI 辅助攻击讨论、智能体沙盒和伦理安全指南都在强化同一件事：Agent 进入生产路径后，安全响应必须覆盖传统日志之外的新证据。",
        "AI 编码助手会读取代码、生成补丁、调用工具和保存上下文。事件发生后，团队需要知道哪些信息被索引、哪些凭证被触达、哪些自动化仍在运行。",
        "传统 secret scanner 和 SIEM 有用，但很少把 AI 工具链的上下文、权限和执行证据整理成 owner-readable receipt。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "只读安全复盘清单",
          body:
            "先从 GitHub 和本地 Agent 配置入手，生成一次事件复盘报告，不自动修改任何权限。",
          features: [
            "仓库侧：audit log、recent access、workflow、secret scanner 输出、高风险文件和外部 collaborator。",
            "Agent 侧：代码索引范围、MCP/connector 配置、工具调用日志、IDE task 和本地缓存路径。",
            "输出影响范围：可能暴露什么、要轮换哪些 token、哪些日志缺失、哪些项目需人工确认。",
          ],
        },
        {
          stage: "第 2 周",
          title: "客户可读事件收据",
          body:
            "把复盘清单压成 CTO/客户能读的一页摘要，支持 evidence link 和状态追踪。",
          features: [
            "分级：已确认受影响、需要复核、无证据显示影响、无法确认。",
            "整改 tracker：凭证轮换、权限收缩、索引清理、workflow 复检和复跑扫描。",
            "导出 PDF/HTML，给客户、投资人或内部负责人留档。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "持续高风险动作监控",
          body:
            "事件响应跑通后，再加入持续监控，形成订阅。",
          features: [
            "新增 connector、workflow、secret、外部访问和 Agent tool permission 时告警。",
            "按项目维护允许的 Agent 权限与敏感目录规则。",
            "月度安全收据：哪些工具读过什么、谁批准过、哪些规则被改过。",
          ],
        },
      ],
      technical: [
        {
          title: "输入范围",
          status: "GitHub 起步",
          body:
            "优先支持 GitHub audit log、Actions、secret scanning、仓库配置和常见 AI 编码助手配置。比横向接所有云平台更快落地。",
        },
        {
          title: "证据模型",
          status: "分级可信",
          body:
            "报告必须区分已确认、推测风险和无法确认，不把缺少证据写成已泄露，也不把低信号事件夸大。",
        },
        {
          title: "隐私处理",
          status: "只读脱敏",
          body:
            "安全事件里最敏感的是代码和凭证。MVP 默认只读，报告中隐藏 secret 值，只展示路径、时间、主体和建议动作。",
        },
        {
          title: "自动化边界",
          status: "先建议后执行",
          body:
            "不要第一版自动撤销权限或删配置。先给负责人明确命令和顺序，后续再做审批后执行。",
        },
      ],
      goToMarket: [
        "免费入口是 AI coding security incident checklist 和 GitHub/Agent access receipt 模板，面向使用 Codex、Claude Code、Cursor、MCP 的团队。",
        "第一批客户找小型 SaaS、agency、开源维护者和有客户安全问卷压力的团队。他们缺安全专人，但需要像样的事故说明。",
        "付费应包装为事件包和月度复检，而不是泛安全平台。",
      ],
      pricing: [
        {
          name: "免费清单",
          body:
            "公开 checklist、示例报告和单仓库基础扫描，用来建立信任。",
        },
        {
          name: "事件包 $1k-8k",
          body:
            "按仓库/成员做一次复盘，交付影响范围、整改清单和客户可读摘要。",
        },
        {
          name: "团队版 $99-499/月",
          body:
            "持续监控、月度收据、策略模板、Slack 告警、历史留存和多仓库视图。",
        },
      ],
      validation: [
        {
          week: "第 1 周：5 次手工复盘",
          body:
            "找 5 个有 AI 编码工具的小团队，手工复盘最近 30 天高风险访问。成功标准是至少 3 队发现一个要收缩权限、轮换凭证或补日志的点。",
        },
        {
          week: "第 2 周：事件报告样板",
          body:
            "把报告给 CTO/客户成功/安全负责人看，验证是否能直接转发给内部或客户。",
        },
        {
          week: "第 3 周：复检订阅",
          body:
            "让 2 个团队设置月度复检，验证他们是否愿意为持续收据而不是一次性恐慌付费。",
        },
      ],
      risks: [
        "安全事件信息经常变化，产品文案必须聚焦响应流程和证据，不依赖单一新闻细节。",
        "误报会造成恐慌，报告要明确置信度和证据级别。",
        "安全平台会覆盖部分日志，但 AI 工具链配置和 owner-readable 收据仍是窄切口。",
        "如果只卖给安全团队，销售会变慢；早期应卖给缺安全专人的 founder 和工程负责人。",
      ],
    },
    {
      subtitle:
        "把桌面、浏览器和安卓任务的 Agent 执行轨迹，变成 reviewer 能验收的完成证据。",
      thesis:
        "计算机使用 Agent 验证台不是又一个自动化执行器，而是把 Agent 操作真实软件后的状态、轨迹、截图、断言和人工接管整理成验收物。它先服务 QA、工程 reviewer 和内部工具团队，帮助他们判断任务是否真的完成。",
      whyNow: [
        "OpenComputer、AI Studio 安卓开发和智能体沙盒都说明 Agent 正在进入真实软件环境。任务不再只是生成文本，而是点击、修改、提交、安装和测试。",
        "真实软件任务常常不是全对或全错。部分成功、状态偏移、隐藏失败和需要人工确认的地方，必须被记录下来，否则 reviewer 只能重新跑一遍。",
        "Playwright、Appium 和 CI 日志提供底层证据，但缺少一个面向任务目标的解释层。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "20 条轨迹手工报告",
          body:
            "从 Web/安卓/桌面 Agent 任务中收集轨迹、截图和测试结果，手工生成验证报告。",
          features: [
            "任务目标、关键状态、成功断言、失败步骤和人工接管点。",
            "截图时间线和可复现步骤，而不是只给最终 pass/fail。",
            "部分成功评分：完成了什么、没完成什么、下一步该怎么修。",
          ],
        },
        {
          stage: "第 2 周",
          title: "测试框架插件",
          body:
            "做 Playwright/Appium/GitHub Action 插件，把报告挂到 PR 或 CI artifact。",
          features: [
            "读取测试输出、截图、trace、console、network 和 Agent step log。",
            "自动标记不稳定步骤、重复失败、状态缺失和需要人工确认的断言。",
            "导出 HTML 报告，支持 reviewer 在 PR 里查看。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "团队验收库",
          body:
            "积累任务模板和状态断言，形成团队可复用的 Agent 验收规则。",
          features: [
            "常见任务模板：登录、表单、导入、结账、移动安装、设置页修改。",
            "历史趋势：哪类任务最常失败、哪个 Agent 最常需要人工接管。",
            "规则变更审计：新增或放宽验收规则时留下批准记录。",
          ],
        },
      ],
      technical: [
        {
          title: "数据采集",
          status: "测试框架优先",
          body:
            "先接 Playwright trace、Appium log、CI artifact 和截图。它们结构化程度高，也更容易在团队现有流程里落地。",
        },
        {
          title: "验证模型",
          status: "状态断言",
          body:
            "不要让 LLM 单独判断任务完成。核心判断来自 DOM、截图、测试断言、文件状态和人工确认，LLM 只负责解释和摘要。",
        },
        {
          title: "报告形态",
          status: "嵌入 PR",
          body:
            "早期交付应是 PR comment、CI artifact 和可分享 HTML，而不是新建一个需要团队每天打开的仪表盘。",
        },
        {
          title: "隐私安全",
          status: "截图脱敏",
          body:
            "桌面和移动任务可能包含客户数据，报告需要支持截图遮罩、字段脱敏和私有存储。",
        },
      ],
      goToMarket: [
        "第一批用户找已经用 Agent 做前端修复、移动测试、RPA 或内部后台操作的团队。",
        "免费获客工具是 GitHub Action 或 Playwright reporter：每次 Agent PR 生成一页验收报告。",
        "面向 QA 和 reviewer 的话术应聚焦“少重跑一次任务”和“知道失败在哪一步”，而不是宣传自动化率。",
      ],
      pricing: [
        {
          name: "开源 reporter",
          body:
            "单项目基础报告免费，用于进入开发流程和收集样本。",
        },
        {
          name: "团队版 $49-299/月",
          body:
            "多项目历史、任务模板、失败趋势、Slack 告警、PR 集成和验收规则库。",
        },
        {
          name: "企业版 $5k-20k/年",
          body:
            "私有部署、SSO、截图脱敏、审计留存、自定义断言和合规报告。",
        },
      ],
      validation: [
        {
          week: "第 1 周：20 条任务轨迹",
          body:
            "找 5 个团队，各拿 4 条 Agent 操作轨迹。成功标准是 reviewer 认为报告减少复跑时间，并指出至少一个原本没发现的失败或不确定状态。",
        },
        {
          week: "第 2 周：PR 原型",
          body:
            "接入一个真实仓库，把报告挂到 PR comment，观察 reviewer 是否引用报告决定是否合并。",
        },
        {
          week: "第 3 周：模板复用",
          body:
            "让团队定义 3 个重复任务模板，验证报告是否能跨任务稳定复用。",
        },
      ],
      risks: [
        "如果报告只是 trace viewer，会被测试框架内置功能替代；必须围绕任务目标和验收结论组织信息。",
        "不同 Agent 与测试工具日志格式分散，初期要限定输入，不要追求全覆盖。",
        "截图和轨迹含敏感数据，脱敏能力会影响企业采用。",
        "个人开发者可能只愿意用免费版，付费要找有 reviewer/QA 协作压力的团队。",
      ],
    },
  ],
  "2026-05-20": [
    {
      subtitle:
        "把 npm 投毒后的混乱排查，压成一份开发机、仓库、CI 和凭证都覆盖的清理收据。",
      thesis:
        "AI 编码助手 Hook 感染与凭证清理报告的核心价值，不是替代 SCA 或 secret scanner，而是在供应链事件发生后回答负责人最急的问题：哪里可能被改过、哪些入口会继续运行、哪些 token 要先撤销、哪些证据能证明已经清理。它卖的是事件后的行动顺序和责任证据。",
      whyNow: [
        "Mini Shai-Hulud 类攻击把风险从依赖包本身扩展到开发者机器、编辑器任务、CI workflow 和 AI 编码助手启动路径。团队以前的清理手册很少覆盖这些新入口。",
        "Claude Code、Codex、VS Code tasks 和 GitHub Actions 都是开发者默认信任的执行路径。一旦被污染，问题不是一次 build 失败，而是后续每次打开项目、运行任务或提交代码都可能继续触发。",
        "传统工具能发现部分漏洞和 secrets，但清理阶段仍靠人拼 grep、日志、workflow diff 和群消息。买方需要的是一页可执行报告，不是一堆分散告警。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "只读本地扫描器",
          body:
            "先不做云端平台。做一个本地 CLI，扫描当前仓库和用户授权的配置目录，生成 HTML 报告。",
          features: [
            "仓库检查：package scripts、lockfile 可疑版本、postinstall、GitHub Actions、npmrc 和常见 secret 文件。",
            "开发机检查：Claude Code/Codex hooks、VS Code tasks、shell profile、alias、PATH 注入和可疑自动启动项。",
            "清理顺序：先停自动执行，再轮换 token，再清本地配置，最后复跑检查。"
          ],
        },
        {
          stage: "第 2 周",
          title: "团队收据与复检",
          body:
            "把单机报告变成团队负责人能汇总的事件收据，支持多人上传结果和复检状态。",
          features: [
            "按成员、仓库、机器和凭证类型汇总风险。",
            "给每条结论附文件路径、命令、原始片段和复检命令。",
            "生成 CTO/客户可读摘要：影响范围、已清理项、待处理项、无法确认项。"
          ],
        },
        {
          stage: "第 3-4 周",
          title: "持续监控入口",
          body:
            "事件清理验证付费后，再加持续监控和团队策略，形成订阅理由。",
          features: [
            "GitHub Action 每次 PR 检查新增 hooks、tasks、workflow 和 package scripts。",
            "Slack/邮件提醒高风险改动，要求负责人确认。",
            "组织策略：禁止某些 hooks、限制 token 权限、要求关键 workflow 双人审查。"
          ],
        },
      ],
      technical: [
        {
          title: "扫描边界",
          status: "只读、可解释",
          body:
            "第一版只读文件和配置，不自动删除。每个风险项都必须给出路径、匹配规则和建议命令，避免安全工具变成黑盒。",
        },
        {
          title: "风险模型",
          status: "规则优先",
          body:
            "高风险来自自动执行、凭证触达、外联命令、混淆脚本和持久化入口。LLM 可以帮用户读报告，但风险判断应由可复查规则驱动。",
        },
        {
          title: "隐私处理",
          status: "默认本地",
          body:
            "仓库和本机配置可能含客户代码与 secrets，MVP 应默认本地生成报告，只上传脱敏摘要或由用户手动导出。",
        },
        {
          title: "集成路线",
          status: "先 JS/TS",
          body:
            "从 npm、pnpm、yarn、GitHub Actions、VS Code 和主流 AI 编码助手切入，先覆盖最容易受本次事件影响的团队。",
        },
      ],
      goToMarket: [
        "免费入口是 `npx ai-hook-infection-check` 和一篇“Claude Code/Codex 用户的 npm 投毒清理清单”。事件驱动下，搜索和转发会比冷启动广告更自然。",
        "第一批用户找使用 Claude Code/Codex 的 JS/TS SaaS、小型 agency、开源维护者和安全意识强的工程团队。他们有真实仓库、真实 token 和真实负责人。",
        "付费转化不要讲泛供应链平台，而讲“今天能不能给 CTO 一份清理完成证明”。"
      ],
      pricing: [
        {
          name: "免费 CLI",
          body:
            "单仓库和单机扫描，输出基础 HTML 报告，用来获客和建立信任。",
        },
        {
          name: "团队版 $49-299/月",
          body:
            "多成员报告汇总、历史留存、Slack 告警、策略模板、GitHub Action 和团队复检状态。",
        },
        {
          name: "事件包 $2k-10k",
          body:
            "供应链事件发生后，按团队/仓库提供加急清理、报告复核和客户可读摘要。",
        },
      ],
      validation: [
        {
          week: "第 1 周：手工报告",
          body:
            "找 10 个使用 Claude Code/Codex 的 JS/TS 团队，用脚本加人工复核生成报告。成功标准是至少 6 个团队发现需要删除、修改或加入监控的入口。",
        },
        {
          week: "第 2 周：公开 CLI",
          body:
            "发布免费 CLI 和清理清单，看 GitHub stars、运行次数、issue、真实样本反馈和团队版等待名单。",
        },
        {
          week: "第 3 周：团队复检",
          body:
            "让 3 个团队跑多成员复检，验证负责人是否愿意为汇总报告、历史留存和告警付费。",
        },
      ],
      risks: [
        "安全赛道竞争强，不能泛化成又一个漏洞扫描器，必须牢牢钉住 AI 编码助手执行入口和事件后清理。",
        "误报会伤害信任，所以每条风险都要有证据、原因和人工确认建议。",
        "平台可能补 hooks 安全检查，但跨本机、仓库、CI 和多助手的清理报告仍有独立价值。",
        "处理 secrets 很敏感，默认本地和脱敏摘要必须从第一版就做对。"
      ],
    },
    {
      subtitle:
        "当 Google 搜索变成答案和行动入口，帮品牌看见自己在 AI 搜索里的真实位置。",
      thesis:
        "AI 搜索入口可见性监控不是传统 SEO 报表换皮，而是持续记录 AI 答案如何引用、解释、遗漏或替代一个品牌。它的交付物应该是错误清单和页面修复建议，而不是只告诉用户排名变了。",
      whyNow: [
        "Google 搜索继续把 AI Mode、生成式答案、任务型入口和多轮追问推到前台。用户看到的第一屏越来越可能不是十个蓝色链接。",
        "依赖搜索获客的团队会遇到新问题：AI 答案引用了竞品、错写自己的价格、漏掉核心功能，或者把旧文档当成最新信息。",
        "传统 SEO 工具仍有价值，但不能完整说明 AI 答案文本、引用源、竞品替代和上下文变化。"
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "人工快照服务",
          body:
            "先不接复杂自动化。为 5-10 个站点手工跑高意图查询，输出一份 AI 搜索可见性报告。",
          features: [
            "查询集：品牌词、竞品词、替代方案词、问题词和购买意图词。",
            "记录项：答案摘要、引用 URL、竞品出现、错误陈述、缺失页面和推荐动作。",
            "报告格式：按严重程度排序，给出页面改写和结构化数据建议。"
          ],
        },
        {
          stage: "第 2 周",
          title: "每日监控 WebApp",
          body:
            "把人工流程做成可配置监控：关键词、地区、竞品、目标页面和报告频率。",
          features: [
            "历史快照和 diff：今天 AI 答案和昨天相比变了什么。",
            "错误告警：价格、功能、地区、政策、文档版本被错误解释。",
            "竞品占位：哪些查询里竞品出现而自己缺席。"
          ],
        },
        {
          stage: "第 3-4 周",
          title: "修复建议闭环",
          body:
            "让报告进入内容和增长团队的工作流，形成持续订阅。",
          features: [
            "页面片段建议：应该补什么 FAQ、对比表、schema 和文档更新时间。",
            "任务分配：把错误和缺口派给内容、产品营销或文档负责人。",
            "代理商视图：多客户报告、白标导出和月度变化汇总。"
          ],
        },
      ],
      technical: [
        {
          title: "数据采集",
          status: "合规优先",
          body:
            "先用允许的接口、人工采样或用户提供截图验证价值，不把产品押在脆弱采集方式上。长期可结合 Search Console、站内日志和第三方 SERP 数据。",
        },
        {
          title: "判断维度",
          status: "面向行动",
          body:
            "不要只给可见性分数。必须拆成错误陈述、缺失引用、竞品替代、过期来源和可修复页面。",
        },
        {
          title: "客户配置",
          status: "垂直模板",
          body:
            "SaaS、文档站、本地服务和电商的查询集不同，MVP 应先选一类买方，把报告语言做贴合。",
        },
        {
          title: "证据留存",
          status: "截图与文本",
          body:
            "每次快照保留答案文本、引用、时间、地区、设备和截图，方便团队内部复盘。"
        },
      ],
      goToMarket: [
        "第一批用户找 SEO 获客占比较高的 B2B SaaS、开发者工具、文档站、本地服务和小型代理商。",
        "免费入口可以是“你的品牌在 AI 搜索里被怎么说？”一次性报告，用真实错误和竞品替代触发付费。",
        "内容营销应展示具体案例：AI 答案错写价格、引用旧文档、推荐竞品，而不是泛谈 AI SEO。"
      ],
      pricing: [
        {
          name: "个人/小站 $19-49/月",
          body:
            "少量查询、每周报告、基础错误提示和历史快照。",
        },
        {
          name: "团队版 $99-299/月",
          body:
            "多品牌、多地区、竞品跟踪、每日告警、修复建议和任务分配。",
        },
        {
          name: "代理商版 $499+/月",
          body:
            "多客户空间、白标报告、批量查询、月度汇总和客户可读导出。",
        },
      ],
      validation: [
        {
          week: "第 1 周：10 份人工报告",
          body:
            "找 10 个依赖搜索线索的网站，手工跑 20 个查询。成功标准是至少 5 个客户看到自己不知道的错误、缺失或竞品替代。",
        },
        {
          week: "第 2 周：付费报告",
          body:
            "把完整报告设为 $29-99，验证用户是否愿意为持续监控留下付款信息。",
        },
        {
          week: "第 3 周：重复价值",
          body:
            "连续监控两周，验证用户是否根据建议改页面，并期待下一次变化报告。"
        },
      ],
      risks: [
        "Google 和 SEO 平台会补部分能力，独立产品必须先垂直、快响应、强行动建议。",
        "采集方式可能受限制，MVP 不应依赖不稳定接口作为唯一来源。",
        "如果报告只有分数没有修复动作，用户会很快流失。",
        "不同地区、账号状态和个性化会让结果波动，需要明确置信度和采样边界。"
      ],
    },
    {
      subtitle:
        "把 Agent 自动测试、修复和分析的过程，变成 reviewer 和负责人能验收的一页行动收据。",
      thesis:
        "Agent 行动护栏与测试证据台的机会在于，团队并不缺又一个 Agent，而是缺一份能解释 Agent 做了什么、为什么失败、哪些护栏拦住了危险动作、哪些结果已经人工确认的证据。它先从工程测试和 PR 复盘切入，比泛 Agent 观测平台更容易落地。",
      whyNow: [
        "Forge、Drizz、Voker 等信号都在说明 Agent 正从生成文本进入执行任务、跑测试、修问题和分析行为。",
        "执行越自动，负责人越需要可复查证据。否则 QA 和 reviewer 只能重新看 CI、聊天记录、测试平台和日志，Agent 省下的时间又被复盘吃掉。",
        "模型和工具平台会继续强调完成率，但团队购买的是失败可控、责任清楚和可验收。"
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "PR/测试行动收据",
          body:
            "先接 GitHub Actions 和测试输出，手工或半自动整理 20 个 Agent 任务的行动收据。",
          features: [
            "任务时间线：生成、运行、失败、重试、修复、人工确认。",
            "护栏记录：哪些命令被禁止、哪些文件需要审批、哪些失败触发回退。",
            "验收摘要：给 reviewer/QA 看最终是否通过、还缺什么、风险在哪里。"
          ],
        },
        {
          stage: "第 2 周",
          title: "GitHub Action 原型",
          body:
            "把报告自动挂到 PR comment 或构建产物里，让团队在现有流程里使用。",
          features: [
            "读取 CI 日志、测试结果、Agent 运行日志和 PR diff。",
            "自动标记重复失败、未覆盖路径、人工接管和高风险文件。",
            "导出 HTML/PDF 证据，方便周会或客户交付。"
          ],
        },
        {
          stage: "第 3-4 周",
          title: "团队护栏模板",
          body:
            "当报告被 reviewer 使用后，加入团队策略和历史趋势，变成订阅产品。",
          features: [
            "不同任务模板：移动测试、PR 修复、数据分析、客服流程各自的护栏。",
            "团队指标：任务成功率、复盘时间、人工接管率、常见失败原因。",
            "策略变更审计：哪些护栏被改、为什么改、谁批准。"
          ],
        },
      ],
      technical: [
        {
          title: "输入选择",
          status: "CI 与测试先行",
          body:
            "先接 GitHub Actions、JUnit/Playwright/Appium 等结构化测试输出，再扩展到更多 Agent 日志。测试场景证据最清楚，买方也最容易理解。",
        },
        {
          title: "事件模型",
          status: "统一时间线",
          body:
            "把 tool call、CI step、test failure、retry、manual approval 和 final artifact 统一成事件，报告才能跨工具复盘。",
        },
        {
          title: "护栏表达",
          status: "策略可读",
          body:
            "护栏不要只写在代码里，要能给负责人看：禁止什么、允许什么、何时需要人工确认、违反时怎么处理。",
        },
        {
          title: "交付形态",
          status: "嵌入现有流程",
          body:
            "早期不要做独立大仪表盘。PR comment、CI artifact 和 Slack 摘要比新工作台更容易被团队采用。"
        },
      ],
      goToMarket: [
        "第一批用户找已经让 AI 生成测试、修 PR、跑移动端回归或自动分析产品行为的团队。",
        "免费获客工具是 GitHub Action：给每个 Agent PR 生成行动收据。团队版再卖历史、策略和跨仓库汇总。",
        "销售话术聚焦 reviewer/QA 省下的复盘时间，以及负责人能看到的失败原因和人工接管边界。"
      ],
      pricing: [
        {
          name: "开源 GitHub Action",
          body:
            "单仓库生成基础行动收据，进入开发者流程。",
        },
        {
          name: "团队版 $49-299/月",
          body:
            "多仓库历史、策略模板、Slack 告警、报告导出、失败趋势和成员权限。",
        },
        {
          name: "企业版 $5k-25k/年",
          body:
            "SSO、私有部署、审计留存、自定义规则、合规报告和安全团队视图。",
        },
      ],
      validation: [
        {
          week: "第 1 周：20 个任务样本",
          body:
            "找 5 个团队，各拿 4 个 AI 生成测试或修 PR 的任务，手工生成行动收据。成功标准是 reviewer 认为它减少复盘时间，并愿意在下个 PR 继续看。",
        },
        {
          week: "第 2 周：PR comment 原型",
          body:
            "把报告接到 GitHub Action，观察团队是否会在 code review 里引用报告内容。",
        },
        {
          week: "第 3 周：策略验证",
          body:
            "让团队配置 3-5 条护栏，验证它是否能阻止高风险动作或减少重复失败。"
        },
      ],
      risks: [
        "如果只做日志聚合，会被 CI、IDE 和 Agent 平台内置功能替代。",
        "不同 Agent 日志格式很散，必须从 CI/测试这种结构化场景切入。",
        "报告太长会没人看，默认视图要只给 reviewer 需要的结论和证据链接。",
        "买方如果没有团队协作压力，付费会弱；要优先找 reviewer、QA 和工程负责人。"
      ],
    },
  ],
  "2026-05-19": [
    {
      subtitle:
        "把 AI 项目、笔记、设计稿和聊天历史从“看似在我账号里”变成可带走、可交接、可恢复的一页收据。",
      thesis:
        "项目导出与取消订阅收据的核心不是替代 Notion、Obsidian、Claude 或 Grok，而是在用户退订、迁移、交接客户项目之前，证明哪些资产能带走、哪些会坏、哪些必须先处理。它卖的是控制权和返工风险，而不是又一个生产力工具。",
      whyNow: [
        "BuilderPulse 2026-05-19 的主线是 project custody：Files.md、Obsidian self-hosted、Claude Design 访问投诉和 AI chat history 都指向同一个问题，工作成果只有能离开产品时才真正可控。",
        "xAI Grok 文档能力开始生成 Word、PPT、Excel 和 PDF，Google Search 也在生成 mini apps 和 dashboard。AI 产出正在从聊天答案变成可交付文件，资产出口会变得更重要。",
        "现有替代方案靠用户手工导出、截图和下载 account data。它们能救急，但无法系统说明附件、权限、模板、外链、格式和取消订阅后的恢复风险。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工资产体检报告",
          body:
            "先不做迁移执行。找 5-10 个真实项目，手工检查导出包和账号数据，输出一页风险收据。",
          features: [
            "资产清单：项目、文档、聊天、附件、表格、PPT、设计稿和外链。",
            "可恢复性评分：能否导出、导出格式、是否保留评论/版本/权限、是否能离线打开。",
            "退订前 checklist：必须先下载、截图、转存或改权限的项目。",
          ],
        },
        {
          stage: "第 2 周",
          title: "上传导出包的 WebApp",
          body:
            "支持 Notion/Obsidian/Google Takeout/Claude 导出包等常见输入，自动生成 HTML/PDF 收据。",
          features: [
            "解析 Markdown、HTML、JSON、CSV、PDF、docx、pptx 和附件目录。",
            "标记断链、空附件、私有链接、权限缺失和格式不可读风险。",
            "生成迁移优先级：今天必须处理、可延后处理、可忽略。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "团队交接与定期复检",
          body:
            "把一次性体检变成客户项目交接和团队资产治理流程。",
          features: [
            "客户空间：按客户/项目保存导出收据和负责人。",
            "定期复检：每月提醒哪些项目出现新资产、权限或外链风险。",
            "白标报告：agency 可把收据作为项目交付附件。"
          ],
        },
      ],
      technical: [
        {
          title: "输入边界",
          status: "导出包优先",
          body:
            "第一版先支持上传导出包，不要求用户授权所有账号。这样能避开最敏感的权限问题，也能快速验证报告价值。",
        },
        {
          title: "格式检查",
          status: "结构化解析",
          body:
            "用成熟解析器读取 Markdown、HTML、JSON、CSV、Office 文件和附件目录。LLM 只负责总结风险，不负责判断文件是否存在。",
        },
        {
          title: "风险模型",
          status: "规则先行",
          body:
            "风险来自缺附件、外链、私有权限、不可读格式、版本丢失、评论丢失和模板依赖。规则可复查，比纯文本总结更可信。",
        },
        {
          title: "数据安全",
          status: "本地或私有优先",
          body:
            "导出包可能含客户资料和聊天历史，MVP 应支持浏览器本地解析或明确的临时处理策略，团队版再提供私有部署。",
        },
      ],
      goToMarket: [
        "第一批用户找 agency owner、solo founder、产品顾问和内容团队。他们手里最容易出现跨工具资产，也最常遇到客户交接、退订和迁移。",
        "免费获客工具可以是“退订前导出检查器”：上传一个导出包，立即给一页风险报告。",
        "内容标题直接用买方语言，例如“取消 Claude/Notion/Grok 前，你的项目还能不能完整带走？”比讲数据主权更容易转化。",
      ],
      pricing: [
        {
          name: "单次体检 $9-29",
          body:
            "检查一个项目或一个导出包，输出可下载收据和迁移 checklist。",
        },
        {
          name: "Agency 版 $49-199/月",
          body:
            "多客户空间、白标报告、定期复检、团队成员和历史留存。",
        },
        {
          name: "团队版 $3k-12k/年",
          body:
            "SSO、私有部署、敏感文件策略、自定义报告模板和审计留存。",
        },
      ],
      validation: [
        {
          week: "第 1 周：手工验证",
          body:
            "找 10 个真实项目导出包，手工生成报告。成功标准是至少 7 个用户发现自己不知道的断链、缺附件、权限或格式问题。",
        },
        {
          week: "第 2 周：自助上传",
          body:
            "上线最窄 WebApp，让用户上传一个导出包并立即获得报告，观察是否愿意为了完整报告付费。",
        },
        {
          week: "第 3 周：重复使用",
          body:
            "让 3 个 agency 用它做客户交接，验证报告是否真的进入交付流程，而不是只被看一次。",
        },
      ],
      risks: [
        "如果只在迁移时使用，留存会弱。需要把产品延伸到客户交接、月度复检和资产台账。",
        "平台可能改善导出功能，但单个平台不会覆盖跨工具资产、客户交付和团队责任。",
        "解析格式太多会拖慢开发，第一版必须只覆盖最常见导出包和文件类型。",
        "隐私风险很高，上传体验必须清楚说明处理边界，并优先本地解析。"
      ],
    },
    {
      subtitle:
        "把 Agent 能访问的工具、私有服务、网页和凭据整理成安全负责人能批准的边界报告。",
      thesis:
        "Claude Managed Agents、自托管沙箱、MCP 隧道和 agentic web tools 说明 Agent 正在进入企业边界。机会不是再造执行平台，而是跨平台证明 Agent 的权限边界、实际调用和整改动作。",
      whyNow: [
        "Anthropic 和 Cloudflare 同时强调自托管沙箱、私有服务连接和可观测性，说明企业采用 Agent 的阻塞点已经从“能不能执行”转向“是否能被控制”。",
        "OpenRouter 把 Web Search/Fetch 做成模型可自主调用的工具，Membrane 把大量 API 连接压成 Agent 能力。连接能力越方便，边界审计越重要。",
        "现在的权限和日志分散在 MCP 配置、平台控制台、云日志和开发者说明里，负责人很难据此批准试点。"
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "Agent 配置体检",
          body:
            "先支持上传 MCP 配置、工具列表和样例日志，生成权限矩阵。",
          features: [
            "列出每个 Agent 可调用的工具、域名、MCP server、文件路径和凭据范围。",
            "标记高风险动作：写文件、执行命令、访问内网、调用支付/邮件/CRM。",
            "生成批准清单：哪些允许、哪些需要人工确认、哪些应禁用。",
          ],
        },
        {
          stage: "第 2 周",
          title: "调用日志与证据链",
          body:
            "把静态配置推进到真实行为复盘，回答 Agent 实际做过什么。",
          features: [
            "导入 OpenRouter、Claude、Cloudflare 或自研 Agent 调用日志。",
            "按任务输出工具调用时间线、成本、外部域名和失败点。",
            "给每条风险附原始日志、配置位置和整改建议。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "团队审批流",
          body:
            "让报告进入试点批准和变更管理流程，形成付费理由。",
          features: [
            "权限变更前后 diff，支持负责人批准。",
            "策略模板：研发 Agent、客服 Agent、数据分析 Agent 各自默认边界。",
            "审计导出：给安全评审和客户问卷使用。"
          ],
        },
      ],
      technical: [
        {
          title: "配置解析",
          status: "先支持常见格式",
          body:
            "解析 MCP JSON、环境变量清单、工具 schema、域名 allowlist 和平台导出的调用日志。第一版允许用户手工上传。",
        },
        {
          title: "风险分级",
          status: "可解释规则",
          body:
            "按数据敏感度、写权限、外部网络、凭据触达和不可回滚动作分级。LLM 负责说明，不做最终安全裁决。",
        },
        {
          title: "证据留存",
          status: "审计友好",
          body:
            "每个结论必须能回到配置片段或日志事件，避免变成一份无法复查的安全建议。",
        },
        {
          title: "部署形态",
          status: "私有优先",
          body:
            "企业 Agent 配置包含内网和凭据线索，MVP 可本地运行，团队版提供单租户或私有部署。",
        },
      ],
      goToMarket: [
        "第一批用户是已经试点 Claude Managed Agents、MCP、OpenRouter Agent 或内部自动化 Agent 的工程/平台团队。",
        "开源一个 `agent-permission-audit` CLI 获客，免费生成基础矩阵，团队版再做历史、审批和私有部署。",
        "销售话术聚焦“让安全负责人能批准 Agent 试点”，而不是泛泛讲 Agent 治理。",
      ],
      pricing: [
        {
          name: "免费 CLI",
          body:
            "单项目配置检查和静态风险矩阵，用于进入开发者工作流。",
        },
        {
          name: "团队版 $99-399/月",
          body:
            "多项目、日志导入、审批流、历史 diff、策略模板和报告导出。",
        },
        {
          name: "企业版 $10k-50k/年",
          body:
            "私有部署、SSO、审计留存、自定义规则、内网服务目录和安全团队报表。",
        },
      ],
      validation: [
        {
          week: "第 1 周：手工边界报告",
          body:
            "找 5 个 Agent/MCP 试点团队，用他们的配置和样例日志生成报告。成功标准是至少 3 个团队据此修改权限或补审批。",
        },
        {
          week: "第 2 周：CLI 原型",
          body:
            "做配置上传和基础矩阵，验证开发者是否愿意在新增工具前跑一次。",
        },
        {
          week: "第 3 周：审批试点",
          body:
            "接一个团队的变更流程，观察报告是否能成为批准 Agent 权限的材料。",
        },
      ],
      risks: [
        "平台会补可观测性，所以独立产品必须跨 Claude、Cloudflare、OpenRouter、自研 MCP 和内部工具。",
        "安全结论如果过度承诺会失去信任，应定位为审计辅助和审批材料。",
        "企业销售周期可能较长，先用开源 CLI 和小团队版验证需求。",
        "日志格式碎片化，需要从少数高频生态切入，不要一开始全覆盖。"
      ],
    },
    {
      subtitle:
        "当 Google Search 开始生成答案、Agent 和 mini app，帮站点持续看见自己在新入口里的真实位置。",
      thesis:
        "AI 搜索入口迁移监控不是传统 SEO 套壳，而是记录 AI 答案如何引用、解释、替代或误读一个品牌。它卖给依赖搜索流量的团队，输出可行动的内容和结构化数据修复建议。",
      whyNow: [
        "Google 表示 AI Mode 已超过 10 亿月活，Search agents、生成式 UI、AI Overview 连续追问和 Personal Intelligence 都在改变搜索入口。",
        "用户不再只输入关键词，而是提出完整任务。站点需要知道自己是否进入答案、是否被竞品替代、是否被错误概括。",
        "传统排名还重要，但不能完整解释 AI 答案中的引用、行动入口和多轮上下文。"
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "手工 AI 搜索快照",
          body:
            "为 5 个客户手工跑 30 个高意图问题，整理 AI 答案、引用和竞品。",
          features: [
            "记录答案文本、引用源、竞品出现、错误描述和行动入口。",
            "按问题类型分组：购买、比较、教程、本地服务、故障排查。",
            "输出一页内容缺口和页面修改建议。",
          ],
        },
        {
          stage: "第 2 周",
          title: "定期监控 WebApp",
          body:
            "让用户配置关键词、地区、竞品和目标页面，自动保存快照和变化。",
          features: [
            "每日/每周快照：答案、引用、竞品、情绪、错误点。",
            "变化提醒：被移除、被竞品替代、出现错误描述。",
            "导出报告给内容、SEO 和销售团队。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "行动建议与代理商版",
          body:
            "从监控推进到可执行建议，形成代理商和多站点收费。",
          features: [
            "内容缺口建议：需要新增 FAQ、对比页、价格页或结构化数据。",
            "竞品差距：哪些问题竞品被引用而自己没有。",
            "多客户工作区和白标周报。"
          ],
        },
      ],
      technical: [
        {
          title: "采样设计",
          status: "场景优先",
          body:
            "关键词不应只来自传统 SEO，而要覆盖用户会问 AI 的完整任务句，例如比较、推荐、诊断和本地服务请求。",
        },
        {
          title: "快照留存",
          status: "可追溯",
          body:
            "保存答案、引用、时间、地区、设备和上下文，便于对比变化。不要只存一个分数。",
        },
        {
          title: "建议生成",
          status: "证据驱动",
          body:
            "建议必须来自答案缺口和引用差异，例如缺少价格表、FAQ、作者信息、结构化数据或案例页。",
        },
        {
          title: "合规边界",
          status: "避免承诺技巧",
          body:
            "不承诺操纵 AI 答案，只做监控、诊断和内容质量建议，降低平台规则变化风险。",
        },
      ],
      goToMarket: [
        "先找依赖搜索获客的 B2B SaaS、小工具站、本地服务和 SEO agency。他们最容易理解“可见性变化”的价值。",
        "免费获客报告可以是“30 个 AI Search 问题里，你被引用了几次”。这比泛泛讲 AI SEO 更具体。",
        "代理商渠道很重要：一个 agency 可以带来多个客户站点，白标周报能直接进入现有服务包。",
      ],
      pricing: [
        {
          name: "站长版 $19-49/月",
          body:
            "单站点、少量关键词、每周快照和基础建议。",
        },
        {
          name: "增长团队版 $99-299/月",
          body:
            "多地区、多竞品、每日快照、变化提醒和报告导出。",
        },
        {
          name: "代理商版 $499/月起",
          body:
            "多客户工作区、白标报告、批量关键词和团队协作。",
        },
      ],
      validation: [
        {
          week: "第 1 周：手工报告",
          body:
            "为 10 个站点各跑 30 个问题，验证报告是否能指出至少一个页面修改机会或竞品差距。",
        },
        {
          week: "第 2 周：自助配置",
          body:
            "让用户自己输入站点、竞品和关键词，生成首次快照并测试付费转化。",
        },
        {
          week: "第 3 周：变化提醒",
          body:
            "连续监控一周，看用户是否会因为引用变化、错误答案或竞品替代而回到产品。",
        },
      ],
      risks: [
        "AI 搜索结果变化快，产品不能卖一次性最佳实践，必须卖持续监控。",
        "平台可能限制自动化访问，所以早期可用手工服务和少量快照验证价值。",
        "传统 SEO 工具会进入这个市场，独立产品要聚焦 AI 答案证据和小团队可行动建议。",
        "部分客户只关心流量结果，报告必须连接到页面修改、线索和竞品差距。"
      ],
    },
  ],
  "2026-05-18": [
    {
      subtitle:
        "把 Agent 的代码搜索过程变成可复查、可复跑、可交给负责人的证据收据。",
      thesis:
        "代码 Agent 越能独立改 PR，团队越需要知道它到底搜过什么、读过什么、漏掉什么。这个机会不卖“更快搜索”，而是卖搜索可信度、复核效率和审计证据。",
      whyNow: [
        "Semble 把 Agent 代码搜索的 token 成本和准确性推到台前，BuilderPulse 又把它总结成 coding-agent search receipt。这个词本身就说明买方语言正在从“搜索工具”转向“可交付证据”。",
        "Linus 批评 AI 重复提交 bug 报告、团队开始大量用 Codex/Claude Code 改 PR，这两个信号合在一起说明：AI 不是不会产出，而是产出的证据链不够可信。负责人需要低成本判断一次 Agent 修改有没有漏看关键上下文。",
        "现有替代方案散在终端日志、聊天记录、grep 输出、PR diff 和 reviewer 记忆里。越是大型仓库，越难回答“它有没有搜到真正相关的地方”。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "本地搜索收据生成器",
          body:
            "先不接管 Agent，只包装搜索命令和文件读取记录，生成一份可打开的 HTML 收据。",
          features: [
            "记录查询词、命中路径、读取文件、未覆盖目录、敏感路径触达和复跑命令。",
            "支持 rg、grep、Semble 输出和常见 Agent 会话日志导入。",
            "每次 PR 生成一个 search-receipt.html，作为 reviewer 的辅助材料。",
          ],
        },
        {
          stage: "第 2 周",
          title: "遗漏与浪费提示",
          body:
            "把收据从记录层推进到判断层，但保持可解释，不做黑箱安全结论。",
          features: [
            "标记同名函数、未读取测试目录、未覆盖 legacy 目录和大段 token 绕路。",
            "按文件类型和目录策略提示可能遗漏的上下文。",
            "输出 reviewer checklist：必须人工确认的 3-5 个点。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "GitHub Action 与团队报告",
          body:
            "把一次性本地报告接进团队工作流，开始形成付费理由。",
          features: [
            "PR comment 自动附收据摘要：覆盖范围、风险点、复跑命令。",
            "团队策略：哪些目录必须搜、哪些路径不能读、哪些漏项阻断合并。",
            "月度报告：Agent 搜索质量、token 浪费、常见漏搜路径。",
          ],
        },
      ],
      technical: [
        {
          title: "采集层",
          status: "可从旁路做起",
          body:
            "第一版只包装命令输出和读取日志，不要求用户换 Agent。这样接入阻力低，也能快速验证报告价值。",
        },
        {
          title: "覆盖判断",
          status: "规则优先",
          body:
            "用仓库目录、语言索引、测试路径、最近 diff 和调用图做覆盖提示。LLM 只负责解释，不负责决定是否安全。",
        },
        {
          title: "证据留存",
          status: "必须可复跑",
          body:
            "每条结论都要能回到原始命令、输出片段和文件路径。不能只生成摘要，否则 reviewer 不会信。",
        },
        {
          title: "数据边界",
          status: "默认本地",
          body:
            "代码和搜索日志很敏感，MVP 应本地生成报告；团队版再支持私有部署和脱敏上传。",
        },
      ],
      goToMarket: [
        "第一批用户找每周用代码 Agent 改 PR 的 5-50 人工程团队，尤其是 reviewer 已经抱怨“AI 改的东西还得我重查一遍”的团队。",
        "获客内容可以做“Agent PR 搜索收据模板”“Claude Code/Codex 搜索复核清单”“grep vs Semble 成本对比报告”，让工程经理直接试一次。",
        "销售话术不要说提升搜索速度，要说减少 reviewer 复核时间、减少漏搜事故、给安全和管理层留证据。",
      ],
      pricing: [
        {
          name: "免费 CLI",
          body:
            "单仓库、本地 HTML 收据、基础覆盖提示，用来进入开发者工作流。",
        },
        {
          name: "团队版 $49-199/月",
          body:
            "多仓库策略、GitHub Action、PR 评论、报告历史、敏感路径规则和月度质量报告。",
        },
        {
          name: "企业版 $8k/年起",
          body:
            "私有部署、SSO、审计留存、自定义仓库策略、合规导出和安全团队报表。",
        },
      ],
      validation: [
        {
          week: "第 1 周：手工收据",
          body:
            "找 10 个真实 Agent PR，让团队提供搜索日志或会话记录，手工生成收据。成功标准是至少 5 次发现 reviewer 认为有价值的漏项或复核点。",
        },
        {
          week: "第 2 周：CLI 原型",
          body:
            "做 rg/grep/日志导入的本地原型，验证开发者是否愿意在真实 PR 上运行并把报告发给 reviewer。",
        },
        {
          week: "第 3 周：团队试点",
          body:
            "接 GitHub Action，对 2-3 个团队连续跑一周，看是否进入 PR review 流程并产生阻断或整改动作。",
        },
      ],
      risks: [
        "Semble、IDE 和 Agent 平台会继续增强搜索，所以产品必须占据跨工具证据和团队策略，而不是单纯更快搜索。",
        "如果收据太长，reviewer 反而不看。默认摘要必须压到一屏，并把详细证据折叠。",
        "误报会降低信任。早期只提示“建议复核”，不要自动判定 PR 不可信。",
        "本地数据安全是进入门槛，任何云端模式都要支持脱敏和私有部署。",
      ],
    },
    {
      subtitle:
        "把 AI 生成的设计稿、组件代码和交付 PR 变成可验收的质量报告。",
      thesis:
        "AI 设计到代码的瓶颈不是“能不能生成”，而是生成结果能不能进入团队组件库、品牌规范和工程交付流程。质检台卖的是少返工、可验收和跨角色对齐。",
      whyNow: [
        "Ardot、Kimi 网站设计教程和图片转设计稿信号说明 AI 正在压缩产设研链路，但真实团队不会因为页面看起来像样就直接上线。",
        "设计师关心品牌和设计 token，前端关心组件复用和响应式，产品/增长关心上线速度。现有工具各管一段，缺少面向交付负责人的统一验收报告。",
        "AI 生成页面越多，人工验收越容易成为瓶颈。谁能把“看起来不错”翻译成“可以进 PR/不能进 PR”的证据，谁就有团队付费空间。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "设计稿与 PR 对照报告",
          body:
            "先支持上传 Figma/Ardot 导出和 GitHub PR diff，输出一份交付质量报告。",
          features: [
            "检查组件匹配率、设计 token 偏差、颜色/字体/间距异常。",
            "标记硬编码样式、重复 CSS、未复用组件和响应式断点缺失。",
            "输出设计师和前端分别要看的 checklist。",
          ],
        },
        {
          stage: "第 2 周",
          title: "组件库规则接入",
          body:
            "让报告绑定团队自己的设计系统，而不是用通用审美打分。",
          features: [
            "导入组件清单、token JSON、Tailwind/shadcn 配置和品牌色板。",
            "把偏差分成必须修、建议修、可接受三类。",
            "为每个问题生成可复制的修复建议或 PR comment。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "交付验收工作流",
          body:
            "把一次审查变成团队持续交付流程，形成 SaaS 收费点。",
          features: [
            "GitHub Action 在 UI PR 上自动跑质检。",
            "报告导出给设计、前端、PM 三种视图。",
            "统计 AI 页面返工率、组件复用率和常见生成问题。",
          ],
        },
      ],
      technical: [
        {
          title: "输入格式",
          status: "先窄后宽",
          body:
            "第一版只支持 Figma/Ardot 导出、截图和 GitHub diff。不要一开始适配所有设计工具。",
        },
        {
          title: "视觉差异",
          status: "规则 + 截图",
          body:
            "用 Playwright 截图、DOM/CSS 分析和 token 对比做基础判断，避免纯 LLM 看图导致不可复现。",
        },
        {
          title: "组件匹配",
          status: "可半自动",
          body:
            "通过组件名称、class、import 路径和结构相似度判断是否复用团队组件，早期允许人工确认。",
        },
        {
          title: "报告可信度",
          status: "证据优先",
          body:
            "每个问题都要附截图、代码位置或 token 差异，不要只给模糊建议。",
        },
      ],
      goToMarket: [
        "先找已经用 AI 生成 landing page、活动页或后台模块的产设研团队，他们最容易感到“生成快，但验收慢”。",
        "获客工具可以是免费“AI UI 交付质检报告”：上传截图和 PR，立刻给组件复用率和 Top 10 返工点。",
        "渠道优先 Figma 社群、前端工程师社群、shadcn/Tailwind 用户和增长团队，而不是泛 AI 设计工具用户。",
      ],
      pricing: [
        {
          name: "免费单页检查",
          body:
            "每次检查一个页面，输出基础报告和截图差异，用来建立信任。",
        },
        {
          name: "团队版 $79-249/月",
          body:
            "项目规则、组件库接入、GitHub Action、批注导出、历史趋势和多角色视图。",
        },
        {
          name: "设计系统版 $10k/年起",
          body:
            "私有组件库适配、自定义验收规则、SSO、审计留存和专属报告模板。",
        },
      ],
      validation: [
        {
          week: "第 1 周：人工审 20 个页面",
          body:
            "找 5 个团队提供 AI 生成页面，人工按组件/响应式/token/可维护性出报告，看是否命中他们真实返工点。",
        },
        {
          week: "第 2 周：半自动报告",
          body:
            "实现截图、CSS、token 和 PR diff 的半自动检查，让用户自己上传并验证报告准确率。",
        },
        {
          week: "第 3 周：接入 PR",
          body:
            "给 2 个团队接 GitHub Action，观察是否减少设计验收和 code review 往返。",
        },
      ],
      risks: [
        "设计工具会内置更多检查，所以独立产品必须跨工具并绑定团队组件库。",
        "视觉判断容易主观，必须把报告重点放在可验证的 token、组件、响应式和代码证据。",
        "如果只做设计师工具，付费可能弱；买方应定位为产设研交付负责人。",
        "适配不同前端栈会变复杂，MVP 先选 React + Tailwind/shadcn 或一个明确生态。",
      ],
    },
    {
      subtitle:
        "在 AI 图像和视频发布前，给创作者、品牌和平台运营一份可留档的风险收据。",
      thesis:
        "生成媒体的流量正在爆，但商业团队真正害怕的是下架、误导、侵权、客户投诉和监管风险。机会不在再做生成器，而在发布前的证据、标注和责任管理。",
      whyNow: [
        "Grok Imagine 向 X Premium+ 开放和网页端访问量信号说明 AI 生成媒体正在进入大规模消费场景，发布量会快速上升。",
        "AI 伪造景区/灾害类视频被执法处理，说明风险不是抽象政策，而是会落到具体账号、品牌和客户项目上。",
        "小团队和 MCN 没有专门法务/信任安全团队，发布前只能靠经验判断。可留档的风险收据能把“我觉得可以发”变成“我按流程检查过”。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "素材上传与风险分类",
          body:
            "先做图片/短视频上传，不做内容分发，只输出发布前风险收据。",
          features: [
            "识别人物、灾害、公共事件、品牌商标、医疗金融等敏感场景。",
            "提示是否需要 AI 标注、免责声明或客户确认。",
            "输出可下载的一页 HTML/PDF 审查记录。",
          ],
        },
        {
          stage: "第 2 周",
          title: "平台规则与客户交付",
          body:
            "把风险判断绑定具体发布平台和客户场景，避免泛泛合规建议。",
          features: [
            "按 X、抖音、小红书、YouTube、广告客户交付等场景给不同建议。",
            "生成发布文案里的 AI 标注句、素材备注和客户确认清单。",
            "批量处理一组 campaign 素材，输出项目级风险摘要。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "团队留档与 API",
          body:
            "从单次检查走向团队流程，围绕留档、审批和批量处理收费。",
          features: [
            "团队素材库：保留审查记录、版本、审批人和发布时间。",
            "白标报告：给客户或平台申诉时使用。",
            "API/批处理：接入内容生产流水线和 DAM 工具。",
          ],
        },
      ],
      technical: [
        {
          title: "检测边界",
          status: "不承诺鉴伪",
          body:
            "产品应明确是风险与流程工具，不承诺 100% 判断真假。重点是场景分类、标注建议和证据留存。",
        },
        {
          title: "模型组合",
          status: "多信号",
          body:
            "结合视觉模型、元数据、OCR、相似图搜索线索和平台规则库，给出可解释风险点。",
        },
        {
          title: "规则库",
          status: "要可维护",
          body:
            "平台政策会变，规则库需要按平台、地区、行业和客户模板维护，不能写死在提示词里。",
        },
        {
          title: "隐私与版权",
          status: "默认短期留存",
          body:
            "素材可能是未发布广告和客户资产。默认短期留存、可本地处理、可删除审查记录，是销售前提。",
        },
      ],
      goToMarket: [
        "第一批用户是短视频运营团队、MCN、广告素材工作室和品牌社媒团队，他们每天发布大量 AI 辅助素材且承担客户责任。",
        "获客可以围绕“AI 视频发布前检查清单”“Grok Imagine 素材能不能发”“品牌 AI 素材风险收据”这类搜索和社群内容。",
        "不要卖给普通玩图用户，先卖给有客户交付、账号风险和批量素材流程的小团队。",
      ],
      pricing: [
        {
          name: "按次检查",
          body:
            "$9-19 买一组 campaign 的发布前风险收据，适合创作者和小工作室试用。",
        },
        {
          name: "团队版 $99-399/月",
          body:
            "批量处理、团队审批、素材留档、平台规则、白标报告和客户确认流程。",
        },
        {
          name: "API/企业版",
          body:
            "按调用量或年费收费，面向内容平台、MCN 和品牌代理商的生产流水线。",
        },
      ],
      validation: [
        {
          week: "第 1 周：人工风险报告",
          body:
            "收集 50 条 AI 生成广告图/短视频，人工做风险收据，观察创作者是否会改标注、换素材或要求客户确认。",
        },
        {
          week: "第 2 周：上传原型",
          body:
            "做素材上传和平台规则建议，测试用户是否愿意在发布前多花 2 分钟跑检查。",
        },
        {
          week: "第 3 周：团队留档",
          body:
            "找 2 个内容团队连续一周使用，验证它是否进入发布流程，而不是只作为一次性好奇工具。",
        },
      ],
      risks: [
        "平台会内置水印和检测，所以产品必须站在团队流程、客户交付和证据留档上。",
        "误判会导致用户不信任，必须解释每个风险原因并允许人工覆盖。",
        "不同地区政策差异大，早期应限定平台和市场，不要承诺全球合规。",
        "消费级用户付费弱，必须绑定批量发布、客户责任和团队审批。",
      ],
    },
  ],
  "2026-05-16": [
    {
    subtitle:
      "把每个 Agent 连接器的成本、权限和高风险动作做成负责人能读懂的一页收据。",
    thesis:
      "Agent 正在接入 IDE、浏览器、代码库、个人订阅和财务账户。最值得做的 WebApp 不是再造 Agent，而是做跨工具的连接器成本与权限报告台。",
    whyNow: [
      "Codex 常驻提交、OpenClaw 安全护栏、Claude Code 插件成本、Zed/ChatGPT 订阅和 Grok/Hermes 集成同时出现。这不是孤立新闻，而是 Agent 接入面扩张。",
      "BuilderPulse 最新中文日报把买方痛点说得更直接：agent connectors 会带来 55,000 token 的隐藏上下文开销，也可能出现 $2,000 级别的编辑器账单。工程经理需要在财务追问前先拿到解释。",
      "当 Agent 能访问 GitHub、Notion、浏览器会话、API 文档和订阅账户时，团队的核心问题会变成：谁批准的、能碰什么、花多少钱、出了问题能不能复盘。",
    ],
    mvp: [
      {
        stage: "第 1 周",
        title: "只读连接器清单",
        body:
          "先不拦截动作，只读取团队已经配置的插件、MCP server、IDE agent 和 CLI 配置，生成统一资产清单。",
        features: [
          "导入 Claude Code 插件列表、MCP JSON、Codex/CLI 配置和 Zed/Hermes 说明。",
          "识别连接器类型：代码库、浏览器、文档、支付、财务、内部 API 和模型路由。",
          "输出每个连接器的账号范围、可触达数据、上下文开销线索和负责人。"
        ],
      },
      {
        stage: "第 2 周",
        title: "风险与成本评分",
        body:
          "把技术配置翻译成负责人语言，突出最该关闭、限额或审批的连接器。",
        features: [
          "按敏感数据、外部写入、生产部署、长期记忆和高上下文消耗评分。",
          "标记重复连接器、未知订阅来源、缺少 owner 的工具和高风险默认权限。",
          "生成一页 HTML/PDF 报告，包含建议关闭项和预计节省/风险降低。"
        ],
      },
      {
        stage: "第 3-4 周",
        title: "整改工作流",
        body:
          "从报告走向持续治理，但仍保持窄范围：只处理连接器、成本和权限。",
        features: [
          "提供关闭、限额、转为审批、转为只读四类建议动作。",
          "每月重扫配置漂移，提醒新增连接器和成本异常。",
          "支持 Slack/邮件发送负责人报告，留下整改历史。"
        ],
      },
    ],
    technical: [
      {
        title: "采集方式",
        status: "本地只读",
        body:
          "MVP 不需要接管执行链路。优先读取配置文件、插件 manifest、账单导出和会话摘要，降低安全阻力。",
      },
      {
        title: "成本估算",
        status: "规则加样本",
        body:
          "不同 Agent 的 token 统计口径不一致，早期应按连接器说明、上下文大小、调用频次和账单样本估算，而不是承诺精确记账。",
      },
      {
        title: "权限模型",
        status: "负责人语言",
        body:
          "把 OAuth scope、MCP tool、文件路径和命令权限映射成“能读什么、能写什么、能触发什么账单”。",
      },
      {
        title: "隐私边界",
        status: "默认不上传",
        body:
          "连接器配置可能暴露内部系统名和路径。默认本地生成报告，云端协作作为团队版可选项。",
      },
    ],
    goToMarket: [
      "第一批用户应是每周大量使用 Claude Code、Codex、Cursor、OpenClaw、Hermes 或 MCP 的 5-50 人工程团队。他们足够早遇到成本和权限问题，也没有完整平台团队。",
      "内容入口可以做成“Agent 连接器体检清单”“MCP 成本计算器”“Claude Code 插件风险报告”这类工具，直接承接搜索和社群传播。",
      "早期销售不要卖大平台，卖一次报告：扫描 30 分钟，交付一页负责人能转发给 CTO/财务/安全的收据。",
    ],
    pricing: [
      {
        name: "免费本地报告",
        body:
          "单人/单仓库扫描，最多 10 个连接器，输出 HTML 报告，用来制造采用和信任。",
      },
      {
        name: "团队版 $49-149/月",
        body:
          "多仓库、多成员、月度重扫、报告历史、Slack 提醒和基础整改任务。",
      },
      {
        name: "安全版 $5k/年起",
        body:
          "私有部署、SSO、审计留存、自定义策略、脱敏模板和管理层 PDF 导出。",
      },
    ],
    validation: [
      {
        week: "第 1 周：手工报告",
        body:
          "找 10 个 AI 重度工程团队，手工读取他们愿意分享的连接器配置和账单截图，交付一页报告。成功标准是 5 个团队发现至少一个要关闭或限额的连接器。",
      },
      {
        week: "第 2 周：本地扫描器",
        body:
          "把最常见的 3 类配置做成 CLI 扫描器，验证用户是否愿意在真实仓库运行，并是否会把报告转发给负责人。",
      },
      {
        week: "第 3 周：付费试点",
        body:
          "对愿意持续使用的团队收取小额月费，提供月度重扫和整改追踪，验证它是否从一次性好奇变成管理习惯。",
      },
    ],
    risks: [
      "平台可能快速补内置成本和权限面板，所以产品必须跨工具，并且输出负责人报告而不是单工具指标。",
      "成本估算如果过度承诺会失去信任，早期应明确区分估算、账单导入和已验证节省。",
      "读取配置本身有安全顾虑，必须默认本地运行、可脱敏预览，并支持完全离线导出。",
      "如果只面向开发者个人，付费意愿会弱；必须把报告设计成工程经理、安全和财务都能使用的交付物。",
    ],
    },
    {
      subtitle:
        "在用户把银行账户交给 AI 前，先给他一张能看懂、能撤销、能留存的隐私与订阅风险收据。",
      thesis:
        "个人财务 AI 的最大摩擦不是功能，而是信任。用户愿意让 AI 看交易数据之前，需要知道暴露了什么、能撤销什么、会不会进入记忆和订阅分析。最窄产品不是理财助手，而是授权前后的隐私与订阅审计器。",
      whyNow: [
        "ChatGPT Pro 通过 Plaid 连接金融账户，说明 AI 正在进入高敏感个人数据场景。只要入口打开，用户就会搜索“安全吗、能看到什么、怎么撤销”。",
        "真实买方不是要另一个预算 App，而是在点击连接前想降低不确定性：哪些账户会暴露，历史交易范围多长，AI 记忆会不会保留，第三方连接能不能停。",
        "现有解释分散在 OpenAI、Plaid、银行授权页和隐私政策里。普通用户不读长政策，需要一页白话风险收据和撤销提醒。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "授权前风险问卷",
          body:
            "不接银行凭证，先让用户选择准备连接的账户类型和使用场景，生成一页授权前风险说明。",
          features: [
            "账户类型：信用卡、Checking、Savings、投资账户、贷款账户。",
            "风险提示：可见交易类别、历史范围、商户信息、订阅模式、收入支出画像。",
            "连接前 checklist：关闭哪些记忆、确认哪些范围、保存撤销入口。",
          ],
        },
        {
          stage: "第 2 周",
          title: "本地账单导入与订阅审计",
          body:
            "用 CSV/账单截图导入替代真实银行连接，先验证用户是否愿意为隐私和订阅洞察付费。",
          features: [
            "识别重复订阅、涨价订阅、长期未用服务和可取消项目。",
            "把每个洞察标注为本地计算，不上传银行凭据。",
            "生成撤销授权、关闭记忆、删除导入数据的操作清单。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "授权追踪与撤销提醒",
          body:
            "当用户愿意持续使用，再做授权台账和提醒，而不是直接做完整个人理财平台。",
          features: [
            "记录哪些 AI 工具/金融工具获得过账户访问。",
            "定期提醒复查授权、撤销不用的连接、导出隐私收据。",
            "按家庭/个人分开管理，不做投资建议。",
          ],
        },
      ],
      technical: [
        {
          title: "合规边界",
          status: "必须窄",
          body:
            "定位为隐私、授权和订阅管理，不做投资建议、信贷建议或银行凭证代理，降低监管压力。",
        },
        {
          title: "数据输入",
          status: "先本地",
          body:
            "MVP 用用户上传 CSV/截图或手动输入，不直接接 Plaid。验证价值后再考虑只读连接。",
        },
        {
          title: "风险解释",
          status: "模板优先",
          body:
            "隐私风险应基于固定模板和授权范围映射，LLM 只负责改写成白话，避免生成错误政策解释。",
        },
        {
          title: "删除与撤销",
          status: "核心能力",
          body:
            "每份报告都要带数据删除、授权撤销和记忆关闭步骤。用户买的是控制感，不只是分析图表。",
        },
      ],
      goToMarket: [
        "第一批用户来自愿意试 AI 财务功能但担心隐私的美国 ChatGPT Pro/Plus 用户，以及经常订阅 SaaS、外卖、流媒体的高消费用户。",
        "获客内容可以围绕“连接银行账户给 AI 前要检查什么”“Plaid 授权能看到哪些数据”“如何撤销 AI 财务连接”。",
        "不要一开始跟 Mint、YNAB 或 Rocket Money 正面竞争；先占“AI 财务授权前隐私收据”这个新入口。",
      ],
      pricing: [
        {
          name: "免费授权前收据",
          body:
            "用户选择账户类型和使用场景，免费生成风险说明，用来获取搜索流量和信任。",
        },
        {
          name: "个人版 $5-12/月",
          body:
            "订阅审计、本地导入、撤销提醒、授权台账和月度隐私检查。",
        },
        {
          name: "家庭版 $29-49/年",
          body:
            "多成员授权清单、共享订阅提醒、家庭账单导入和隐私报告导出。",
        },
      ],
      validation: [
        {
          week: "第 1 周：访谈和假门",
          body:
            "访谈 30 个愿意试 AI 财务功能的用户，展示授权前收据样稿，看他们最在意交易范围、记忆、撤销还是第三方共享。",
        },
        {
          week: "第 2 周：本地订阅报告",
          body:
            "让 20 个用户上传账单 CSV 或截图，生成订阅和隐私报告，验证他们是否愿意为持续提醒付费。",
        },
        {
          week: "第 3 周：撤销提醒",
          body:
            "做一个手动授权台账，观察用户是否愿意记录 AI/金融连接并按提醒撤销不用的授权。",
        },
      ],
      risks: [
        "金融合规边界敏感，产品必须避免理财建议和投资推荐。",
        "平台可能把说明做清楚，所以独立产品要跨 AI 工具和金融连接，而不是只解释 ChatGPT。",
        "个人用户付费低，早期要控制产品范围，先验证订阅审计和撤销提醒是否有留存。",
        "任何真实银行连接都会提高信任门槛，MVP 应先本地导入和手动台账。",
      ],
    },
    {
      subtitle:
        "把 AI 修复无障碍问题后的结果，变成产品、工程、QA 和合规都能验收的证据包。",
      thesis:
        "AI 可以发现和修复 accessibility 问题，但企业真正购买的是可证明、可回归、可交付的修复证据。这个机会应从前端仓库的证据包切入，而不是泛泛做无障碍扫描器。",
      whyNow: [
        "GitHub 试点通用无障碍 Agent，说明平台级玩家已经认为 AI 能参与 accessibility 修复；这会带来更多 AI 生成 PR，也会带来更多验收问题。",
        "企业并不缺 Lighthouse 或 axe 的单次问题列表，缺的是从问题、修复、截图、键盘导航到人工确认的完整链路。",
        "无障碍需求长期存在，且有合规、客户采购和品牌责任驱动。AI 介入后，证据链比建议本身更可卖。",
      ],
      mvp: [
        {
          stage: "第 1 周",
          title: "关键页面证据包",
          body:
            "先支持 3-5 个关键页面，不做全站平台。输出 issue、修复建议、截图和人工验收清单。",
          features: [
            "运行 axe/Lighthouse，归类 WCAG 问题和影响用户场景。",
            "生成修复 PR 草案或代码建议，但默认要求人工确认。",
            "保存修复前后截图、DOM 片段和键盘导航记录。",
          ],
        },
        {
          stage: "第 2 周",
          title: "回归测试与 PR 集成",
          body:
            "把证据包接到前端 PR 流程，让团队在合并前看到无障碍风险。",
          features: [
            "GitHub Action 自动检查改动页面。",
            "PR comment 展示新增/已修复/仍需人工验收的问题。",
            "支持设计系统规则：按钮、表单、弹窗、焦点态、颜色对比。",
          ],
        },
        {
          stage: "第 3-4 周",
          title: "合规交付与审计留存",
          body:
            "当单个 PR 跑通后，做团队报告和客户交付物。",
          features: [
            "按页面、组件和 WCAG 条款导出 HTML/PDF 报告。",
            "记录人工验收人、验收时间、失败原因和复测结果。",
            "提供发布前无障碍 gate，阻断高风险页面上线。",
          ],
        },
      ],
      technical: [
        {
          title: "检测引擎",
          status: "用成熟工具",
          body:
            "底层检测应依赖 axe、Lighthouse、Playwright 和规则库，不要从零写无障碍判断。",
        },
        {
          title: "AI 修复",
          status: "辅助而非自动合并",
          body:
            "AI 可以生成修复建议和 PR，但必须保留人工确认，因为视觉、语义和业务意图需要人判断。",
        },
        {
          title: "证据采集",
          status: "浏览器自动化",
          body:
            "用 Playwright 记录截图、焦点顺序、键盘路径和 ARIA 树，形成比文字建议更可信的证据。",
        },
        {
          title: "范围控制",
          status: "前端仓库优先",
          body:
            "先支持 React/Next.js 常见页面和组件库，不要一开始覆盖所有技术栈和移动端。",
        },
      ],
      goToMarket: [
        "第一批客户是有 WCAG、Section 508 或企业采购压力的 SaaS 团队，尤其是前端团队小但客户要求多的公司。",
        "获客入口可以是免费 GitHub Action：每个 PR 给一份无障碍证据包摘要，再引导团队版报告和审计留存。",
        "内容上不要讲“AI 自动修无障碍”，而是讲“给客户/采购/QA 的无障碍修复证据”。",
      ],
      pricing: [
        {
          name: "免费 PR 检查",
          body:
            "单仓库、有限页面、基础报告，推动开发者采用。",
        },
        {
          name: "团队版 $99-299/月",
          body:
            "多页面、设计系统规则、报告历史、CI gate、人工验收和导出。",
        },
        {
          name: "合规版 $8k/年起",
          body:
            "私有部署、自定义 WCAG 模板、审计留存、客户报告和采购支持材料。",
        },
      ],
      validation: [
        {
          week: "第 1 周：人工证据包",
          body:
            "找 5 个 SaaS 团队，各选 3 个关键页面，手工生成修复证据包，验证 QA/PM 是否愿意用它替代零散截图和评论。",
        },
        {
          week: "第 2 周：GitHub Action",
          body:
            "接入 2 个真实前端仓库，在 PR 上输出新增无障碍风险和截图证据，看是否影响合并决策。",
        },
        {
          week: "第 3 周：付费报告",
          body:
            "给有客户采购或合规压力的团队导出 PDF 报告，验证是否愿意为留档和持续监控付费。",
        },
      ],
      risks: [
        "GitHub/Copilot 可能内置修复建议，所以独立产品必须聚焦证据包、合规交付和跨工具留存。",
        "自动修复可能破坏 UI 或业务语义，必须保留人工验收和回滚路径。",
        "无障碍判断有灰区，报告要区分机器可判定和需要人工确认的问题。",
        "如果只卖给开发者个人，付费弱；买方应是团队、合规负责人或客户交付负责人。",
      ],
    },
  ],
  "2026-05-15": {
    subtitle:
      "把 Agent 的高风险动作变成可审批、可追溯、可复盘的工作流，而不是等事故发生后再翻聊天记录。",
    thesis:
      "Codex Hooks、程序化令牌、Genkit 中间件和移动端审批说明 Agent 正在进入生产权限层。最靠谱的 WebApp 机会，是在工具调用前后加一层跨平台策略网关。",
    whyNow: [
      "Codex 同时出现了 Hooks、程序化访问令牌、移动端远程审批和 Windows 沙箱；Google Genkit 也推出可拦截模型和工具调用的中间件。这些信号都指向同一个变化：Agent 不再只是聊天输出，而是在真实开发环境里读写、执行、部署、调用外部系统。",
      "一旦 Agent 进入 CI/CD、代码库、浏览器和企业工具，购买阻力就从“模型够不够强”变成“权限怎么给”。工程负责人希望低风险动作自动跑，高风险动作必须有人批准；安全团队希望每个策略都能解释；管理层希望看见成本、事故和改进趋势。",
      "现有方案碎片化：Codex 有自己的 hook，Genkit 有自己的中间件，Claude Code 有自己的配置，浏览器扩展另算一套。横向机会在于把这些工具调用统一成组织级策略、审批和证据链。",
    ],
    mvp: [
      {
        stage: "第 1 周",
        title: "Hook 模板与事件归一化",
        body:
          "先不做全量平台，只做一个轻量网关和 3 个 hook 模板，把不同 Agent 的工具调用转成统一事件。",
        features: [
          "事件 schema：actor、tool、action、target、repo、risk、evidence、costEstimate、decision。",
          "Codex Hook 模板：命令执行前、文件写入后、任务完成后，把事件发送到本地网关。",
          "Genkit 中间件模板：拦截工具调用，支持 allow、deny、needsApproval 三种返回。",
        ],
      },
      {
        stage: "第 2 周",
        title: "高风险策略和人工批准",
        body:
          "把价值集中在最容易触发团队担忧的动作上，先覆盖密钥、生产配置、部署和外部数据发送。",
        features: [
          "规则库：敏感路径、危险命令、外部域名、生产环境变量、部署工具、客户数据表。",
          "审批页：展示动作摘要、风险原因、原始证据、推荐决策和一次性批准按钮。",
          "移动友好：负责人离开电脑后仍能批准或拒绝长任务中的关键步骤。",
        ],
      },
      {
        stage: "第 3-4 周",
        title: "团队策略与报告",
        body:
          "当单次审批跑通后，再做团队层的策略模板、审计日志、成本统计和管理层报告。",
        features: [
          "策略模板：研发、生产发布、客户数据、开源贡献四类默认策略。",
          "审计导出：按任务、成员、仓库、风险级别导出 HTML/PDF。",
          "成本和阻塞分析：哪些策略拦截最多、哪些任务等待审批最久、哪些 Agent 最花钱。",
        ],
      },
    ],
    technical: [
      {
        title: "集成方式",
        status: "从旁路开始",
        body:
          "第一版用 CLI wrapper、Codex hooks 和 Genkit middleware 接入，不要求用户替换 Agent。旁路采集降低迁移成本，也更容易在团队里试点。",
      },
      {
        title: "策略引擎",
        status: "规则优先",
        body:
          "高风险判断必须可解释：路径、命令、域名、环境、数据类型和部署目标由规则层判定。LLM 只负责把原因翻译成审批人能看懂的摘要。",
      },
      {
        title: "数据安全",
        status: "本地优先",
        body:
          "事件可能包含仓库名、命令、路径和内部域名。MVP 应默认本地 SQLite 或客户私有环境运行，上传前支持脱敏预览。",
      },
      {
        title: "跨工具抽象",
        status: "保持窄接口",
        body:
          "不要一开始做完整 Agent 平台。只抽象工具调用事件和审批结果，让不同 Agent 继续负责执行，网关只负责策略和留痕。",
      },
    ],
    goToMarket: [
      "第一批用户应找已经把 Codex、Claude Code、Cursor、Genkit 或浏览器 Agent 用在真实仓库的人，而不是泛 AI 爱好者。他们已经遇到权限弹窗、长任务审批、日志难查和成本难解释的问题。",
      "获客内容可以做成开源策略包：例如“Codex 生产仓库 10 条默认禁令”“Genkit 工具调用审批模板”“Agent 访问密钥前该拦什么”。这些内容天然会被工程负责人和安全团队收藏。",
      "销售路径从免费 hook 模板开始：用户先在本地跑一次风险报告，再升级到团队策略、私有日志、SSO 和审批历史。能不能把一次 hook 报告转发给老板，是早期传播性的关键指标。",
    ],
    pricing: [
      {
        name: "免费版",
        body:
          "本地单仓库、3 条内置策略、最近 20 次任务日志。目标是让团队看到真实风险和审批价值。",
      },
      {
        name: "团队版 $29-99/席/月",
        body:
          "多仓库策略、审批历史、成本统计、Slack/邮件通知、报告导出和成员权限。",
      },
      {
        name: "私有部署 $5k-25k/年起",
        body:
          "给安全要求高的工程团队，卖日志不出域、SSO、审计留存、自定义策略和合规报告模板。",
      },
    ],
    validation: [
      {
        week: "第 1 周：验证是否愿意接 hook",
        body:
          "找 10 个真实使用代码 Agent 的团队，给他们一个只读 hook 模板，生成最近任务的风险报告。成功标准是至少 5 个团队愿意继续接入下一类高风险动作。",
      },
      {
        week: "第 2 周：验证审批是否有价值",
        body:
          "选择 3 类动作做人工批准：生产配置、密钥路径、部署命令。观察审批人是否觉得摘要足够可信，以及是否愿意把策略留在日常流程中。",
      },
      {
        week: "成功标准",
        body:
          "至少 2 个团队愿意为审批历史或私有日志付费，且负责人能明确说出“这让我们敢把 Agent 放进更高权限场景”。",
      },
    ],
    risks: [
      "平台会做自己的审批和日志，所以产品不能只绑定一个工具；跨工具统一和组织级策略才是护城河。",
      "审批太重会拖慢 Agent 价值，必须支持低风险自动放行、高风险才拦截，并持续报告误拦率。",
      "如果采集日志太敏感，安全团队会拒绝试点。默认本地运行、脱敏和最小事件 schema 是必要条件。",
      "规则过于泛化会误报，早期应从代码仓库和部署流程切入，不要同时覆盖所有企业工具。",
    ],
  },
  "2026-05-13": {
    subtitle:
      "把浏览器 Agent、代码 Agent 和法律/安全 Agent 的每一次动作变成可搜索、可审计、可汇报的证据链，而不是再做一个新的 Agent。",
    thesis:
      "最值得做的不是替团队自动完成更多动作，而是让团队能放心批准 Agent 做动作：看得见、追得回、算得清、能问责。",
    whyNow: [
      "今天的热点不是单个模型能力，而是 Agent 正在进入真实动作层。Computer Use 让 Codex 更接近桌面执行，Google ADK 强调可暂停恢复的长流程 Agent，Anthropic 法律行业插件和安全团队实践说明 Agent 已经开始触碰高风险业务语境。",
      "一旦 Agent 能登录网站、改代码、读文件、调用工具、处理法律文档，团队购买阻力就从“能不能做”变成“出了问题怎么证明”。这类证明需求天然属于负责人：工程负责人要看 PR 和终端动作，安全负责人要看敏感域名和文件访问，财务负责人要看 token/API 成本，法务负责人要看证据来源和人工批准点。",
      "现有日志是碎片化的：聊天记录在模型工具里，浏览器历史在本机，终端日志在 shell，代码 diff 在 GitHub，token 账单在 API 平台。真正可卖的产品，是把这些碎片统一成一份任务级报告，让负责人能在十分钟内判断一次 Agent 任务是否可接受。",
    ],
    mvp: [
      {
        stage: "第 1 周",
        title: "会话导入和任务时间线",
        body:
          "先不做实时拦截，只做导入和报告。用户上传 Claude Code/Codex 终端日志、浏览器导出的 HAR/历史记录、Git diff 或任务截图，系统生成一条按时间排序的 Agent 行动线。",
        features: [
          "任务摘要：目标、开始结束时间、使用工具、最终产出。",
          "动作时间线：访问过的域名、执行过的命令、改动过的文件、调用过的 API。",
          "证据链接：每个风险判断都能回到原始日志片段或 diff。",
        ],
      },
      {
        stage: "第 2 周",
        title: "风险和成本评分",
        body:
          "在时间线之上加可解释评分，不做黑箱安全结论，而是把高风险动作归类，方便负责人复核。",
        features: [
          "敏感动作识别：删除、写入生产配置、访问密钥文件、外发数据、提交代码、调用支付或部署接口。",
          "成本估算：按模型、token、工具调用、运行时长和失败重试估算任务成本。",
          "审批建议：哪些动作下次应自动允许、哪些应要求人工确认、哪些应禁止。",
        ],
      },
      {
        stage: "第 3-4 周",
        title: "团队报告和轻量网关",
        body:
          "等导入报告被验证后，再做团队工作流：私有项目、成员、任务归档、审批规则和导出。",
        features: [
          "团队仪表盘：按项目查看 Agent 任务、失败率、成本、风险动作趋势。",
          "审计报告导出：给老板、客户或安全评审看的 HTML/PDF。",
          "MCP/HTTP 轻量网关：高风险工具调用先进入人工批准队列。",
        ],
      },
    ],
    technical: [
      {
        title: "日志采集",
        status: "可从导入做起",
        body:
          "第一版不要碰浏览器插件和系统权限，先支持文件导入、CLI wrapper、GitHub diff 和 HAR。这样能绕开最难的权限问题，也能快速验证报告价值。",
      },
      {
        title: "动作归一化",
        status: "技术难度中等",
        body:
          "把不同来源统一成 event schema：actor、tool、action、target、timestamp、evidence、risk。难点不是解析，而是保留证据链，不能只输出模型总结。",
      },
      {
        title: "风险判断",
        status: "需要规则优先",
        body:
          "早期用规则和白名单比纯 LLM 更可靠：命令类型、域名类别、文件路径、环境变量、diff 范围、外发目标。LLM 只负责解释和生成报告文案。",
      },
      {
        title: "部署形态",
        status: "本地优先更容易卖给安全团队",
        body:
          "MVP 可以是本地 WebApp + SQLite，团队版再做私有云或单租户。涉及代码、日志、密钥和法律文档，纯 SaaS 会遇到信任阻力。",
      },
    ],
    goToMarket: [
      "第一批用户不应该找泛 AI 爱好者，而是找已经在团队里重度使用 Codex、Claude Code、Cursor、Browser Use、n8n/MCP 的人。他们最容易遇到“这个 Agent 刚才到底干了什么”的管理问题。",
      "冷启动内容可以围绕公开案例做：抓 10 个开源 AI PR 或 Agent demo，生成审计报告样例，标题直接打痛点，例如“一个浏览器 Agent 任务里有多少不可见风险动作”。这类内容比泛泛讲 Agent 治理更容易传播。",
      "运营上先做免费工具，而不是直接卖平台：免费生成一次任务报告，报告底部带团队版 CTA。用户愿意分享报告，才说明这个产品有传播性和组织购买可能。",
    ],
    pricing: [
      {
        name: "免费版",
        body:
          "单次导入、最多 3 个任务、报告公开水印。目标是获客和收集真实日志格式。",
      },
      {
        name: "团队版 $19-49/席/月",
        body:
          "私有项目、历史归档、成员权限、成本统计、审批建议、GitHub/CLI 集成。",
      },
      {
        name: "私有部署 $3k-15k/年起",
        body:
          "给安全、法律、金融、企业研发团队，卖日志不出域、SSO、审计留存和自定义规则。",
      },
    ],
    validation: [
      {
        week: "第 1 周：验证报告是否有用",
        body:
          "找 10 个真实使用 Agent 的团队，让他们提供最近 3-5 次任务日志。手工加半自动生成报告，观察他们是否愿意拿给同事或老板看。",
      },
      {
        week: "第 2 周：验证付费触发点",
        body:
          "把报告拆成三种版本：工程复盘、安全审计、成本账单。看哪一种最能触发“我们需要持续用”的反应，并尝试收取首批试点费。",
      },
      {
        week: "成功标准",
        body:
          "至少 5 个团队愿意继续导入下一批任务，2 个团队愿意为私有项目或报告留存付费，且用户能明确说出报告帮他们减少了哪类管理风险。",
      },
    ],
    risks: [
      "平台自带日志功能会出现，所以产品不能只做单个平台的漂亮日志页，必须跨 Codex、Claude、浏览器、GitHub 和内部工具。",
      "安全结论如果说得太满会失去信任，应坚持证据链和人工复核，把产品定位为审计辅助而不是自动合规判定。",
      "采集敏感日志会带来隐私压力，MVP 要支持本地运行、脱敏预览和只上传结构化事件。",
      "如果团队还没有大量 Agent 任务，需求会显得超前。因此首批用户必须来自已经把 Agent 放进真实工程或运营流程的团队。",
    ],
  },
  "2026-05-14": {
    subtitle:
      "不卖迁移本身，而是卖一张让老板能在 30 分钟内看懂的资产地图：谁拥有什么、离开要花多少、按什么顺序搬。",
    thesis:
      "今天最能触发付费的不是“AI 好不好用”，而是“工具到底归谁、退订后数据怎么交接、账单如何被解释”。最窄切口是把“想迁移/想自托管”变成一份可交付的体检报告与迁移路线图。",
    whyNow: [
      "BuilderPulse 今天的信号集中在数字主权与信任断裂：I moved my digital stack to Europe 详细记录了从 GitHub/Gmail/AWS 迁移到欧洲栈（Hetzner、Forgejo、Infomaniak）的完整过程；Leaving GitHub for Forgejo 直接演示了代码托管迁移的动机与阻力；Bambu Lab 远程锁定争议则说明硬件层也在发生“谁控制你的设备”的信任危机。迁移意愿已经存在，缺的是可执行计划。",
      "AIHOT 池子同时放大了成本与可控性焦虑：Claude Code 每周限额增加 50% 但用户仍在抱怨额度不够；Anthropic 为付费计划新增程序化调用专用额度，说明团队开始把 AI 工具当基础设施管理而非个人消费；Codex 在 Windows 上的安全沙箱讨论则指向“用了 Agent 之后边界在哪里”的组织级担忧。这些信号的交集不是模型能力，而是团队需要一张地图来回答“我们的数字资产在哪里、谁能控制、离开要多久”。",
      "现有解决方案是碎片化的：顾问按天收费且不可复现，运维同事靠经验拍板但缺少全景视图，博客文章只有个案没有模板。真正的产品机会是把采集、评分、报告和迁移计划模板化——一份可以发给 CTO 或安全评审的标准化交付物，而不是一次性的咨询项目。",
    ],
    mvp: [
      {
        stage: "第 1 周",
        title: "只读体检与资产清单",
        body:
          "先不做迁移执行，只做现状扫描。用户通过 OAuth 或上传配置导出，系统生成一张组织级资产地图。",
        features: [
          "资产发现：扫描 GitHub 组织仓库数、协作者、Webhook、CI/CD 绑定；扫描 IdP（Google Workspace/Entra ID）中的 SaaS 授权与 SAML 应用。",
          "退出难度评分：每个资产按数据导出能力、替代品成熟度、锁定期限、合规依赖打分（1-5），标红“离开成本最高”的项。",
          "依赖关系图：哪些资产互相绑定（例：GitHub Actions → AWS、Google IdP → 20+ SaaS），迁移顺序建议。",
        ],
      },
      {
        stage: "第 2 周",
        title: "替代选型与迁移 Runbook",
        body:
          "在资产清单之上生成可执行迁移计划，不是泛泛建议，而是针对每个高风险资产的具体替代方案与步骤。",
        features: [
          "替代选型矩阵：每个高风险资产列出 2-3 个替代品，按成本、数据主权、功能覆盖、迁移难度对比。",
          "30 天迁移 Runbook：按优先级排序的周计划，每周 3-5 个可验证里程碑，附带回滚条件。",
          "预算估算：迁移人力成本、新平台月费、过渡期双跑成本，输出一个可以发给财务的数字。",
        ],
      },
      {
        stage: "第 3-4 周",
        title: "团队协作与持续监控",
        body:
          "把一次性报告变成持续服务：团队成员可以标注进展、更新状态，系统监控迁移进度与新风险。",
        features: [
          "团队仪表盘：按系统/负责人查看迁移进度、阻塞项、到期日；支持导出 HTML/PDF 给管理层。",
          "变更监控：当被依赖的平台变更定价、条款或 API 时自动告警，更新退出难度评分。",
          "迁移日志：每一步执行记录、验证结果、回滚触发点，形成可审计的迁移证据链。",
        ],
      },
    ],
    technical: [
      {
        title: "资产采集",
        status: "OAuth + API 优先",
        body:
          "第一版通过 GitHub OAuth、Google Workspace API、云账单 API（AWS/Azure/GCP）采集结构化数据。不碰文件系统和网络扫描，只读取组织级元数据：仓库列表、协作者、Webhook、SaaS 授权、IAM 角色。这样能绕开最敏感的权限问题，也能在 30 分钟内完成首次扫描。",
      },
      {
        title: "退出难度评分模型",
        status: "规则 + LLM 解释",
        body:
          "评分引擎用规则层做核心判断：数据导出格式是否标准、是否有 API 可批量迁移、替代品是否已验证、合同是否有退出条款、合规是否有数据驻留要求。LLM 只负责生成人类可读的解释文案和迁移建议，不参与评分决策。这保证了可解释性和一致性。",
      },
      {
        title: "迁移 Runbook 生成",
        status: "模板 + 条件分支",
        body:
          "Runbook 不是 LLM 自由发挥，而是基于预定义模板生成：每个资产类型（代码托管、IdP、文档、CI/CD、数据库）有标准迁移步骤模板，系统根据资产属性填充具体参数。条件分支处理特殊情况（如私有仓库数量 > 100 需要分批迁移）。这避免了“AI 生成的计划不可执行”的问题。",
      },
      {
        title: "部署与数据安全",
        status: "本地优先，云端可选",
        body:
          "体检涉及组织最敏感的元数据（仓库列表、人员、权限、账单），MVP 必须支持本地运行。技术栈：Node.js/Python CLI + 本地 SQLite + 本地 Web 界面。团队版可选私有云部署，但扫描和评分逻辑必须能在断网环境下跑完。永远不把用户的 GitHub token 或 IdP 凭据上传到第三方服务器。",
      },
    ],
    goToMarket: [
      "第一批用户应该来自正在讨论数字主权的社群：Hacker News 上 Leaving GitHub 帖子的评论者、欧洲 SaaS/自托管社群（r/selfhosted、IndieHackers 欧洲标签）、以及刚遭遇平台涨价或条款变更的团队。他们已经有迁移意愿，缺的是一份能发给老板的正式计划。",
      "冷启动内容策略是做“主权体检公开案例”：抓 3-5 个公开迁移案例（如 monokai.com 的欧洲栈迁移、Forgejo 迁移帖），生成体检报告样例，标题直接打痛点——“你的 GitHub 组织离开需要 47 天还是 470 天？”。这类可量化的焦虑比泛泛讲主权理念更容易传播。",
      "转化路径是免费评分 → 付费报告 → 付费迁移支持。免费版输出一个主权评分和 Top 3 风险项；付费版输出完整资产清单、替代选型、30 天 Runbook 和预算估算。迁移支持按系统包月，卖的是“有人帮你盯着进度和处理意外”的安心感。",
    ],
    pricing: [
      {
        name: "免费体检",
        body:
          "单次扫描、最多 10 个资产、输出主权评分和 Top 3 风险项。目标是获客和验证“团队是否愿意看这份报告”。",
      },
      {
        name: "迁移规划 $49-149/次",
        body:
          "完整资产清单、退出难度评分、替代选型矩阵、30 天迁移 Runbook、预算估算。按组织规模定价，支持导出 PDF/HTML 给管理层。",
      },
      {
        name: "持续监控 $29-79/月",
        body:
          "资产变更监控、迁移进度追踪、团队协作、定期复检。适合正在执行迁移或需要持续管理数字主权的团队。",
      },
    ],
    validation: [
      {
        week: "第 1 周：验证报告是否有用",
        body:
          "找 10 个正在讨论自托管/离开 GitHub/迁移到欧洲栈的团队，手工做 1 版体检报告。观察他们是否愿意拿给同事或老板看，以及报告中的哪些信息最能触发“我们需要行动”的反应。",
      },
      {
        week: "第 2 周：验证付费触发点",
        body:
          "把报告拆成两个版本：免费评分（主权分数 + Top 3 风险）和付费规划（完整 Runbook + 预算）。看用户是否愿意为“可执行的迁移计划”付费，而不是只看免费评分就满足。",
      },
      {
        week: "成功标准",
        body:
          "至少 5 个团队愿意继续导入更多资产做完整扫描，2 个团队愿意为迁移规划付费，且用户能明确说出“这份报告帮我节省了多少评估时间”或“我拿这份报告说服了老板批准迁移”。",
      },
    ],
    risks: [
      "平台会推出自己的导出工具和迁移助手（GitHub 已有 Actions 迁移指南），所以产品不能只做单平台迁移，必须做跨平台全景——这是平台自己不会做的事。",
      "容易沦为咨询项目。如果每个客户都需要定制化分析，就无法规模化。必须把采集-评分-报告-Runbook 全链路模板化，用规则引擎替代人工判断。",
      "体检涉及组织最敏感的元数据，一次数据泄露就能毁掉信任。MVP 必须支持本地运行、token 不出域、扫描结果只存本地，永远不在安全上走捷径。",
      "迁移意愿存在但行动力不足——很多团队会说“想迁移”但一直拖。因此首批用户必须来自已经采取行动（如已经在跑 Forgejo 测试实例、已经在做欧洲栈 POC）的团队，而不是只是嘴上说想迁移的人。",
    ],
  },
};

window.AI_OPPORTUNITY_ARTICLES.forEach((article) => {
  const refs = opportunitySourceRefs[article.date] || [];
  article.opportunities.forEach((item, index) => {
    item.sourceRefs = refs[index] || [];
    item.framework = opportunityFrameworks[article.date]?.[index] || buildOpportunityFramework(item);
  });
  const deepDives = opportunityDeepDives[article.date];
  if (Array.isArray(deepDives)) {
    article.opportunities.forEach((item, index) => {
      if (deepDives[index]) item.deepDive = deepDives[index];
    });
  } else if (deepDives) {
    article.opportunities[0].deepDive = deepDives;
  }
  article.opportunities.forEach((item, index) => {
    if (!item.deepDive) item.deepDive = buildOpportunityDeepDive(article, item, index);
  });
});
