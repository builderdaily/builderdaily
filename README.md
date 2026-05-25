# AI 机会日报网站

纯静态博客站点，直接打开 `index.html` 即可浏览。

## 本地查看

```powershell
Start-Process .\website\index.html
```

## 每日新增文章

把新的日期文章追加到 `website/data/articles.js` 的
`window.AI_OPPORTUNITY_ARTICLES` 数组开头或末尾即可。页面会自动按日期倒序显示。

每篇文章至少包含：

- `date`
- `title`
- `summary`
- `scores`
- `winner`
- `sourceTags`
- `conclusion`
- `opportunities`
- `rejected`
- `sources`

`sources[].type` is shown as the visible source tag, for example `AI HOT`,
`BuilderPulse`, `官方`, or `原始信号`.
