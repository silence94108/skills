## 五、移动端排版规范

### 5.1 iOS 字体系统

```css
/* iOS SF Pro 字体层级 */
:root {
  /* Large Title — 大标题（页面顶部折叠标题） */
  --ios-large-title: 700 34px/41px -apple-system, 'SF Pro Display', sans-serif;

  /* Title 1 — 一级标题 */
  --ios-title1: 700 28px/34px -apple-system, 'SF Pro Display', sans-serif;

  /* Title 2 — 二级标题 */
  --ios-title2: 700 22px/28px -apple-system, 'SF Pro Display', sans-serif;

  /* Title 3 — 三级标题 */
  --ios-title3: 600 20px/25px -apple-system, 'SF Pro Display', sans-serif;

  /* Headline — 标题（列表项标题） */
  --ios-headline: 600 17px/22px -apple-system, 'SF Pro Text', sans-serif;

  /* Body — 正文 */
  --ios-body: 400 17px/22px -apple-system, 'SF Pro Text', sans-serif;

  /* Callout */
  --ios-callout: 400 16px/21px -apple-system, 'SF Pro Text', sans-serif;

  /* Subheadline — 副标题 */
  --ios-subheadline: 400 15px/20px -apple-system, 'SF Pro Text', sans-serif;

  /* Footnote — 脚注 */
  --ios-footnote: 400 13px/18px -apple-system, 'SF Pro Text', sans-serif;

  /* Caption 1 */
  --ios-caption1: 400 12px/16px -apple-system, 'SF Pro Text', sans-serif;

  /* Caption 2 — 最小正文 */
  --ios-caption2: 400 11px/13px -apple-system, 'SF Pro Text', sans-serif;
}
```

### 5.2 Android Material Type Scale

```css
/* Material 3 Type Scale */
:root {
  /* Display */
  --m3-display-large: 400 57px/64px 'Roboto', sans-serif;
  --m3-display-medium: 400 45px/52px 'Roboto', sans-serif;
  --m3-display-small: 400 36px/44px 'Roboto', sans-serif;

  /* Headline */
  --m3-headline-large: 400 32px/40px 'Roboto', sans-serif;
  --m3-headline-medium: 400 28px/36px 'Roboto', sans-serif;
  --m3-headline-small: 400 24px/32px 'Roboto', sans-serif;

  /* Title */
  --m3-title-large: 400 22px/28px 'Roboto', sans-serif;
  --m3-title-medium: 500 16px/24px 'Roboto', sans-serif;
  --m3-title-small: 500 14px/20px 'Roboto', sans-serif;

  /* Body */
  --m3-body-large: 400 16px/24px 'Roboto', sans-serif;
  --m3-body-medium: 400 14px/20px 'Roboto', sans-serif;
  --m3-body-small: 400 12px/16px 'Roboto', sans-serif;

  /* Label */
  --m3-label-large: 500 14px/20px 'Roboto', sans-serif;
  --m3-label-medium: 500 12px/16px 'Roboto', sans-serif;
  --m3-label-small: 500 11px/16px 'Roboto', sans-serif;
}
```

### 5.3 通用排版规则

```css
/* 移动端排版通用规范 */

/* 最小可读字号 */
.text-minimum {
  font-size: 12px; /* 12sp / 12pt，绝对最小值 */
}

/* 标准内边距 */
.page-padding {
  padding-left: 16px;
  padding-right: 16px;
}

/* 内容最大宽度（平板适配） */
.content-container {
  width: 100%;
  max-width: 428px; /* iPhone 14 Pro Max 宽度 */
  margin: 0 auto;
}

/* 段落间距 */
.prose p {
  margin: 0 0 16px;
  line-height: 1.6;
}

/* 列表项间距 */
.list-item {
  min-height: 44px; /* iOS 最小行高 */
  padding: 12px 16px;
}

/* 分组标题 */
.section-header {
  font-size: 13px;
  font-weight: 600;
  color: #6D6D72;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 24px 16px 8px;
}

/* 间距系统（4px 基数） */
/*
 * 4px  — 极小间距（图标与文字、紧凑元素间）
 * 8px  — 小间距（同组元素间、列表项内部）
 * 12px — 中小间距
 * 16px — 标准间距（页面边距、卡片内边距）
 * 20px — 中间距
 * 24px — 中大间距（分组间隔）
 * 32px — 大间距（区块间隔）
 * 40px — 超大间距
 * 48px — 区域间距
 */
```

---

## 六、App Store 截图设计

> 知识来源：Scrnshts — App Store 截图设计灵感库

### 6.1 截图尺寸规范

**iOS App Store：**

| 设备 | 尺寸（像素） | 必需 |
|------|------------|------|
| iPhone 6.9" (15 Pro Max) | 1320 x 2868 | 推荐 |
| iPhone 6.7" (14 Pro Max) | 1290 x 2796 | 推荐 |
| iPhone 6.5" (11 Pro Max) | 1284 x 2778 或 1242 x 2688 | 是 |
| iPhone 5.5" (8 Plus) | 1242 x 2208 | 是 |
| iPad Pro 12.9" (6th) | 2048 x 2732 | iPad App 必需 |
| iPad Pro 11" | 1668 x 2388 | iPad App 推荐 |

**Google Play Store：**

| 类型 | 尺寸（像素） | 要求 |
|------|------------|------|
| 手机截图 | 16:9 或 9:16，最小 1080px | 2-8 张 |
| 7 英寸平板 | 16:9 或 9:16 | 可选 |
| 10 英寸平板 | 16:9 或 9:16 | 可选 |

**通用规则：**
- 最多 10 张截图（iOS），8 张（Google Play）
- 前 3 张最重要（搜索结果中直接可见）
- 格式：PNG 或 JPG
- 不要有状态栏内容（时间、信号等）

### 6.2 常见布局模式

#### A. 设备 + 文字（Device Frame + Text）
最经典的截图格式，上方标题文案 + 下方设备截屏。

**布局结构：**
```
┌─────────────────────┐
│                     │
│   大标题文案（1行）    │
│   副标题（可选）       │
│                     │
│    ┌───────────┐    │
│    │           │    │
│    │  设备截屏   │    │
│    │           │    │
│    │           │    │
│    └───────────┘    │
│                     │
└─────────────────────┘
```

**设计要点：**
- 背景使用品牌色或渐变色
- 设备框使用真实设备 Mockup
- 标题文案不超过 6 个中文字
- 字体大 + 粗，确保缩略图中也能看清

#### B. 全屏截图（Full Screen）
直接展示 App 界面截图，无设备框和文案修饰。

**适用场景：**
- UI 设计本身就是卖点
- 游戏类 App
- 功能一目了然的工具类

#### C. 场景化（Lifestyle / Context）
将 App 截屏放在真实使用场景中（如手持手机的照片）。

**适用场景：**
- 生活方式类 App
- 社交类 App
- 强调使用场景的产品

#### D. 功能 Spotlight
每张截图聚焦一个核心功能，配以功能说明。

**布局结构：**
```
┌─────────────────────┐
│   Feature Title      │
│   简要功能描述        │
│                      │
│  ┌──────┐  ● 要点1   │
│  │ 截屏  │  ● 要点2   │
│  │ 局部  │  ● 要点3   │
│  └──────┘            │
└─────────────────────┘
```

### 6.3 文案撰写原则

**核心规则：**
1. **说价值，不说功能** — "3 分钟做出专业级视频" 优于 "内置视频编辑器"
2. **用数字增加可信度** — "超过 1000 万用户信赖"
3. **制造紧迫感/好奇心** — "你想不到的隐藏功能"
4. **简短有力** — 每张截图标题不超过 8 个中文字
5. **前 3 张定胜负** — 把最吸引人的功能放在前 3 张

**文案公式：**
- **利益导向：** [动作] + [具体结果]，如 "轻松记录每一笔开支"
- **场景导向：** [场景] + [解决方案]，如 "出行必备，离线也能导航"
- **社会证明：** [数字/荣誉] + [结论]，如 "App Store 编辑推荐"

**每张截图的推荐焦点顺序：**
1. 核心价值主张（Hero Shot）
2. 最受欢迎的功能
3. 差异化功能（竞品没有的）
4. 社交证明 / 评价
5. 其他重要功能

---

## 七、移动端设计 Checklist

在输出任何移动端 UI 设计方案前，用以下清单自检：

### 布局与导航
- [ ] 导航模式是否符合 App 类型（Tab Bar / Drawer / 其他）
- [ ] 页面层级是否清晰（不超过 3 层深度为佳）
- [ ] 返回路径是否明确
- [ ] Tab Bar / Navigation Bar 是否适配安全区域

### 触控与交互
- [ ] 所有可点击元素 >= 44x44pt (iOS) / 48x48dp (Android)
- [ ] 点击反馈是否明确（iOS: opacity / Android: ripple）
- [ ] 手势操作是否有视觉引导
- [ ] 输入框是否指定正确的键盘类型

### 内容与状态
- [ ] 是否处理了空状态、加载状态、错误状态
- [ ] 文字截断是否使用省略号
- [ ] 图片是否有加载占位和失败兜底
- [ ] 列表是否支持下拉刷新和上拉加载

### 排版与间距
- [ ] 最小字号不低于 12px
- [ ] 页面水平内边距 16px
- [ ] 间距系统是否基于 4px/8px 倍数
- [ ] 行高是否合理（正文 1.4-1.6）

### 适配与兼容
- [ ] 是否适配安全区域（Safe Area）
- [ ] 是否考虑横屏场景（如果需要）
- [ ] 是否考虑 Dynamic Type / 系统字号缩放
- [ ] 暗色模式下颜色是否合理
- [ ] 是否考虑无障碍（对比度、语义化标签）

### 性能
- [ ] 图片是否懒加载
- [ ] 长列表是否使用虚拟滚动
- [ ] 动画是否使用 GPU 加速属性（transform、opacity）
- [ ] 是否避免大面积 backdrop-filter（性能开销大）
