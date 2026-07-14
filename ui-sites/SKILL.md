---
name: ui-sites
description: "UI/UX 离线设计知识库。基于 55 个顶级设计资源网站预提取的设计知识，涵盖配色方案、字体排版、布局模式、组件设计、动效动画、设计系统、Landing Page、移动端 UI、Logo 设计共 9 大主题。无需联网即可直接输出专业的 UI/UX 设计方案和代码。当用户说 '/ui-sites'、'设计方案'、'配色方案'、'字体搭配'、'布局建议'、'组件规范'、'动画效果'、'Landing Page'、'移动端设计'、'设计系统'、'logo 设计'、'品牌符号' 时使用。"
argument-hint: "[主题] 如: 配色、字体、布局、组件、动效、设计系统、landing-page、移动端、logo"
user-invocable: true
---

# UI/UX 离线设计知识库

基于 **55 个顶级设计资源网站** 预提取的离线设计知识库，无需联网搜索。

## 两层加载策略（节省 Token）

**核心原则：先读索引，按需加载详细文件。禁止一次性读取整个主题文件。**

### 第一步：读取索引文件

根据用户需求，读取 `knowledge/_index/` 下对应的索引文件（每个仅 ~20 行）：

| 用户需求关键词 | 索引文件 |
|-------------|---------|
| 配色、颜色、色彩 | `knowledge/_index/color-palettes.md` |
| 字体、排版、Type Scale | `knowledge/_index/typography.md` |
| 布局、页面结构、网格 | `knowledge/_index/layout-patterns.md` |
| 按钮、输入框、组件 | `knowledge/_index/component-design.md` |
| 动画、动效、过渡 | `knowledge/_index/animation.md` |
| 设计系统、Token、主题 | `knowledge/_index/design-systems.md` |
| Landing Page、着陆页 | `knowledge/_index/landing-pages.md` |
| 移动端、App、iOS/Android | `knowledge/_index/mobile-ui.md` |
| Logo、标志、品牌符号、Brand | `knowledge/_index/logo-design.md` |

### 第二步：按索引指引读取子文件

索引文件内有「快速匹配」表，根据用户具体需求精准读取 1-2 个子文件即可。

**示例**：用户说"帮我选配色"
1. 读 `_index/color-palettes.md`（20行）→ 看到匹配指引
2. 读 `color-palettes/color-schemes.md`（390行）→ 获取 25+ 套配色方案
3. 按需读 `color-palettes/color-implementation.md` → 获取 CSS/Tailwind 配置

**示例**：用户说"按钮怎么设计"
1. 读 `_index/component-design.md`（21行）→ 看到 Button 在 component-library.md
2. 读 `component-design/component-library.md`（833行）→ 获取 15 种组件规范

## 行为规范

1. **禁止直接读取根目录的大文件**（如 `knowledge/animation.md`），必须走索引→子文件路径
2. **按需组合**：设计方案通常需要 2-3 个子文件（如配色+字体+组件）
3. **输出可用代码**：子文件内包含完整的 CSS/Tailwind 代码
4. **标注来源**：输出方案时标注参考了哪些子文件

## 网站索引（溯源参考）

```bash
python scripts/search.py --list          # 列出所有分类
python scripts/search.py "关键词"         # 搜索网站
python scripts/search.py --category color # 按类别过滤
```
