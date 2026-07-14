## 2. 五大设计系统对比分析

### 2.1 总览对比表

| 维度 | Material Design 3 | Ant Design | Atlassian Design | Carbon Design | Fluent UI |
|------|-------------------|-----------|-----------------|---------------|-----------|
| **所属公司** | Google | 蚂蚁集团 | Atlassian | IBM | Microsoft |
| **定位** | 通用消费级应用 | 企业级中后台 | B2B 协作产品 | 企业级+数据密集型 | 跨平台生态 |
| **Token 架构** | Reference → System → Component | Seed → Map → Alias | 主题化 Token | Global → Contextual → Component | Global → Alias → Component |
| **主题能力** | Dynamic Color (Material You) | ConfigProvider + CSS Variables | Theme Token 覆盖 | Carbon Themes (White/G10/G90/G100) | FluentProvider + Theme |
| **网格系统** | 12 列响应式 | 24 列 Flex Grid | 12 列 | 16 列 2x Grid | 12 列响应式 |
| **暗色模式** | 原生支持 | v5 原生支持 | 原生支持 | 4 个主题梯度 | 原生支持 |
| **设计工具** | Figma Material Theme Builder | Kitchen (Sketch) / AntD Figma | Figma UI Kit | Figma Carbon Kit | Figma Fluent UI Kit |
| **无障碍标准** | WCAG 2.1 AA | WCAG 2.1 AA | WCAG 2.1 AA | WCAG 2.1 AA+ | WCAG 2.1 AA |
| **前端框架** | Web Components / Compose / Flutter | React / Vue / Angular | React | React / Vue / Angular / Svelte | React / Web Components |
| **国际化** | 内建 RTL | 内建 62+ 语言 | 内建 i18n | 内建 i18n | 内建 i18n |
| **特色能力** | Dynamic Color 自适应取色 | ProComponents 开箱即用 | B2B 最佳实践 | 数据可视化规范 | 跨平台一致体验 |

### 2.2 Material Design 3（Google）

**这是什么：** Google 的第三代设计系统，核心理念是 Material You，通过 Dynamic Color 让界面色彩随用户壁纸动态调整。

**核心设计原则：**
1. **Material You** — 个性化优先，设备和用户特征影响视觉呈现
2. **Adaptive Design** — 不同设备和屏幕尺寸自适应布局
3. **Accessible by Default** — 无障碍不是附加项，而是基础

**Dynamic Color 系统：**
```
用户壁纸图片
    ↓ 算法提取 5 个关键色调（HCT 色彩空间）
    ↓
生成 5 组 Tonal Palette（每组 13 个色调）
    ↓
映射到 29 个 System Color Role
    ├── Primary / On Primary / Primary Container / On Primary Container
    ├── Secondary / On Secondary / Secondary Container / On Secondary Container
    ├── Tertiary / On Tertiary / Tertiary Container / On Tertiary Container
    ├── Error / On Error / Error Container / On Error Container
    ├── Surface / On Surface / Surface Variant / On Surface Variant
    ├── Outline / Outline Variant
    ├── Background / On Background
    └── Inverse Primary / Inverse Surface / Inverse On Surface
```

**HCT 色彩空间（Hue-Chroma-Tone）：** Material Design 3 独创的色彩空间，相比 HSL 更符合人眼感知，确保在不同 tone 下颜色感知一致。

**组件规范要点：**
- **形状系统（Shape）**：6 个形状类别（None → Extra Small → Small → Medium → Large → Extra Large → Full）
- **状态层（State Layer）**：Hover 8% 不透明度、Focused 10%、Pressed 10%、Dragged 16%
- **动效（Motion）**：标准 Duration 300ms，强调 Duration 500ms，缓动函数使用 Emphasized Easing

**适用场景：** 消费级应用、需要强品牌表达、跨 Google 生态、移动端优先的产品。

### 2.3 Ant Design（蚂蚁集团）

**这是什么：** 蚂蚁集团出品的企业级设计系统，是中文社区最广泛使用的 React/Vue 组件库，以效率和规范著称。

**四大设计价值观：**
1. **自然（Natural）** — 减少认知负担，符合直觉
2. **确定性（Certain）** — 减少不确定性，用设计引导用户
3. **意义感（Meaningful）** — 设计为用户创造真实价值
4. **成长性（Growing）** — 系统可持续演进

**Token 架构（v5）：**
```
Seed Token（种子 Token，4 个核心变量）
    ├── colorPrimary: '#1677ff'
    ├── borderRadius: 6
    ├── colorSuccess: '#52c41a'
    └── ...（约 30+ Seed Tokens）
        ↓ 梯度算法自动派生
Map Token（梯度 Token，约 300+）
    ├── colorPrimaryBg: '#e6f4ff'
    ├── colorPrimaryBgHover: '#bae0ff'
    ├── ...（含 hover、active、border 等状态色）
        ↓
Alias Token（别名 Token，约 500+）
    ├── colorBgContainer: '#ffffff'
    ├── colorText: 'rgba(0, 0, 0, 0.88)'
    └── ...
        ↓
Component Token（组件 Token，各组件独立）
    ├── Button.primaryColor: '#fff'
    ├── Input.activeBorderColor: '#1677ff'
    └── ...
```

**ProComponents（开箱即用的高级组件）：**
- **ProTable** — 高级表格，内置搜索、分页、列配置
- **ProForm** — 高级表单，支持分步、弹窗、侧栏等模式
- **ProLayout** — 后台布局，侧栏 + 顶栏 + 面包屑开箱即用
- **ProCard** — 高级卡片，支持折叠、分组、内嵌操作
- **ProDescriptions** — 详情展示，数据与编辑无缝切换

**国际化能力：**
- 内建 62+ 种语言包
- ConfigProvider 统一注入
- 日期组件支持 dayjs / date-fns / moment
- RTL（从右到左）布局支持

**适用场景：** 企业级中后台、管理系统、数据密集型操作界面、中文技术团队。

### 2.4 Atlassian Design System

**这是什么：** Atlassian 为旗下产品（Jira, Confluence, Trello, Bitbucket 等）打造的统一设计系统，专注 B2B 协作场景。

**核心设计原则：**
1. **Bold（大胆）** — 清晰的视觉层次，大胆的设计决策
2. **Optimistic（乐观）** — 积极正面的用户体验
3. **Practical（务实）** — 功能优先，不过度装饰
4. **Team-first（团队优先）** — 为协作场景设计

**B2B 设计最佳实践（从 Atlassian 提炼）：**

| 实践 | 说明 |
|------|------|
| 信息密度可调 | 提供 Compact / Comfortable / Spacious 三种密度 |
| 权限感知 UI | 根据用户权限动态显示/隐藏操作 |
| 批量操作优先 | 列表场景必须支持多选+批量操作 |
| 上下文保持 | 侧栏/浮层编辑，避免页面跳转 |
| 渐进式披露 | 高级功能收纳在"更多"中，不干扰常规流程 |
| 实时协作提示 | 多人同时编辑时的冲突提示和在线状态 |
| 快捷键体系 | 高频操作配备键盘快捷键 |
| 空状态引导 | 空数据时提供创建引导，而非空白 |

**Token 特色：**
- 所有 Token 严格语义化，禁止直接使用色值
- 提供 `color.text.brand`、`color.background.warning.bold` 等语义命名
- 间距使用 `space.050`（4px）到 `space.600`（48px）的标准化体系

**适用场景：** B2B SaaS 产品、项目管理工具、协作型工作平台、需要处理复杂数据关系的应用。

### 2.5 Carbon Design System（IBM）

**这是什么：** IBM 开源的企业级设计系统，以严谨的网格系统和业界领先的数据可视化规范著称。

**设计原则：**
1. **人本主义（Human-centered）** — 以用户需求而非技术限制驱动
2. **多样包容（Inclusive）** — 无障碍和多元化深植系统
3. **统一生态（Unified ecosystem）** — IBM 全产品线一致体验

**2x Grid 系统（16 列）：**
```
Carbon 的网格基于 mini-unit（8px），采用 16 列系统：

┌─────────────────────────────────────────────┐
│  margin  │  16 列内容区（含 gutter）  │  margin  │
│          │  每列含 16px gutter          │          │
│          │  断点自适应列数               │          │
└─────────────────────────────────────────────┘

断点定义：
- sm:  320px  — 4 列,   margin 0
- md:  672px  — 8 列,   margin 16px
- lg:  1056px — 16 列,  margin 16px
- xl:  1312px — 16 列,  margin 16px
- max: 1584px — 16 列,  margin 24px

子网格（Subgrid）：
- Wide Grid:   16 列, gutter 32px（默认）
- Narrow Grid: 16 列, gutter 16px（紧凑布局）
- Condensed:   16 列, gutter 1px（数据密集型）
```

**数据可视化规范（Carbon Charts）：**

| 规范 | 说明 |
|------|------|
| 调色板 | 14 组分类色，每组 5 个色阶，确保色盲可辨识 |
| 比例 | 图表推荐宽高比 16:9 或 4:3 |
| 标注 | 数据标签优先级：直接标注 > 工具提示 > 图例 |
| 网格线 | 使用浅色虚线，不抢夺数据视觉权重 |
| 空状态 | 无数据时使用骨架屏占位，不留空白 |
| 加载 | 数据加载使用渐进式骨架屏 |
| 响应式 | 图表必须响应式，小屏幕降级为简化视图 |
| 无障碍 | 颜色+形状双编码，不仅靠颜色传达信息 |

**四层主题梯度：**
```
White  → 最亮（默认背景 #ffffff）
Gray 10 (G10) → 浅灰（背景 #f4f4f4）
Gray 90 (G90) → 深灰（背景 #262626）
Gray 100 (G100) → 最暗（背景 #161616）
```

**适用场景：** 企业级仪表盘、数据可视化平台、AI/ML 产品界面、需要严格网格规范的复杂应用。

### 2.6 Fluent UI（Microsoft）

**这是什么：** Microsoft 的跨平台设计系统（Fluent 2），覆盖 Windows、Web、iOS、Android、macOS，追求"无缝融入平台又保持品牌一致"。

**Fluent 2 设计语言核心：**
1. **依存性（Familiar）** — 用户在不同平台间无缝切换
2. **流动性（Fluid）** — 界面元素自然流动，响应设备特性
3. **聚焦性（Focused）** — 突出关键信息，减少视觉噪音

**跨平台一致性策略：**

```
                      ┌─ Windows (WinUI 3)
                      ├─ Web (React)
Fluent Design Token ──├─ iOS (SwiftUI)
     (统一 Token 层)   ├─ Android (Jetpack Compose)
                      ├─ macOS (AppKit / SwiftUI)
                      └─ Cross-platform (React Native)

策略：
- Token 层完全统一（色彩、间距、字体比例）
- 组件行为一致（交互逻辑、状态流转相同）
- 视觉细节适配平台（圆角、阴影、动效遵循原生平台规范）
```

**核心 Token 特色：**
- **Brand Ramp** — 品牌色 10 级渐变（Brand 10 ~ Brand 160），自动生成
- **Neutral Ramp** — 中性色精细渐变，含前景/背景/描边多用途
- **Compound Components** — 组件套娃组合模式（如 Menu = MenuTrigger + MenuList + MenuItem）

**适用场景：** 跨平台应用、Microsoft 生态集成、企业级办公协作工具、需要在 Windows/Web/Mobile 保持一致体验的产品。

---

