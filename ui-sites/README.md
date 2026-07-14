# ui-sites — UI/UX 离线设计知识库 (Claude Code Skill)

基于 **55 个顶级 UI/UX 设计资源网站** 预提取的离线设计知识库，作为 [Claude Code](https://claude.ai/claude-code) Skill 使用。

无需联网即可直接输出专业的 UI/UX 设计方案和代码。

## 知识库内容

| 文件 | 行数 | 主题 |
|------|------|------|
| `knowledge/color-palettes.md` | 846 | 25+ 配色方案、CSS 变量、Tailwind 配置、无障碍对比度 |
| `knowledge/typography.md` | 1036 | 27 组字体搭配、7 种 Type Scale、中文字体推荐 |
| `knowledge/layout-patterns.md` | 2180 | 18 种 Web 布局模式、网格系统、响应式断点 |
| `knowledge/component-design.md` | 1377 | 15 种核心组件规范、状态变体、暗色模式适配 |
| `knowledge/animation.md` | 3006 | 缓动函数、入场退场动画、Framer Motion/GSAP 代码 |
| `knowledge/design-systems.md` | 2289 | Token 架构、五大 DS 对比、主题化、无障碍标准 |
| `knowledge/landing-pages.md` | 1204 | 8 大区块模式、6 种行业模板、CRO 原则 |
| `knowledge/mobile-ui.md` | 3253 | 导航模式、10 种页面模式、iOS/Android 差异 |
| **合计** | **15,191** | |

## 安装

将此仓库克隆到 Claude Code 的 skills 目录：

```bash
git clone https://github.com/YOUR_USERNAME/ui-sites.git ~/.claude/skills/ui-sites
```

## 使用

在 Claude Code 中输入 `/ui-sites` 或说"设计方案"、"配色方案"、"字体搭配"等关键词即可触发。

## 数据来源

知识内容提取自以下 55 个设计资源网站，完整索引见 `data/sites.csv`：

**灵感类**：Dribbble · Behance · Awwwards · Mobbin · Page Flows 等
**配色类**：Adobe Color · Coolors · Color Hunt · Realtime Colors 等
**字体类**：Google Fonts · Fontshare · Typewolf · Fontjoy 等
**动效类**：Framer Motion · GSAP · Lottie Files · Animate.css 等
**设计系统**：Material Design · Ant Design · Carbon Design · Fluent UI 等
**组件库**：Shadcn/ui · Element Plus · Naive UI · Mantine 等

## License

MIT
