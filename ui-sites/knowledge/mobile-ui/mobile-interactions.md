## 三、触控交互规范

### 3.1 最小点击区域

**铁律：** 所有可交互元素必须满足最小尺寸要求，即使视觉上看起来更小，也要通过 padding 或 min-width/min-height 扩大点击区域。

| 平台 | 最小尺寸 | 推荐尺寸 | 间距 |
|------|---------|---------|------|
| iOS (HIG) | 44 x 44 pt | 44 x 44 pt | 8pt 以上 |
| Android (Material) | 48 x 48 dp | 48 x 48 dp | 8dp 以上 |
| Web (WCAG 2.5.5) | 44 x 44 CSS px | 48 x 48 CSS px | - |

```css
/* 确保最小点击区域 */
.touchable {
  position: relative;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 用伪元素扩大点击区域（不影响视觉） */
.touch-expand::after {
  content: '';
  position: absolute;
  inset: -8px; /* 向外扩展 8px */
}

/* Android 版本 */
.touchable--android {
  min-width: 48px;
  min-height: 48px;
}
```

### 3.2 手势规范

| 手势 | 触发条件 | 用途 | 反馈 |
|------|---------|------|------|
| 点击（Tap） | 单指快速触碰 | 主要操作 | 点击高亮/Ripple |
| 长按（Long Press） | 单指按住 500ms+ | 上下文菜单 | 触觉反馈 + 弹出菜单 |
| 双击（Double Tap） | 快速连续两次点击 | 点赞/缩放 | 动画反馈 |
| 左右滑动（Swipe） | 单指水平滑动 | 切换/删除/操作 | 跟手滑动 |
| 上下滑动（Scroll） | 单指垂直滑动 | 滚动列表 | 惯性滚动 |
| 缩放（Pinch） | 双指开合 | 缩放图片/地图 | 跟手缩放 |
| 旋转（Rotate） | 双指旋转 | 旋转图片 | 跟手旋转 |
| 拖拽（Drag） | 单指按住后移动 | 排序/移动 | 元素跟随 + 阴影 |

```css
/* 点击反馈 - iOS */
.tap-feedback-ios {
  transition: opacity 100ms ease;
}

.tap-feedback-ios:active {
  opacity: 0.6;
}

/* 点击反馈 - Android Material Ripple */
.tap-feedback-android {
  position: relative;
  overflow: hidden;
}

.tap-feedback-android::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(0,0,0,0.12) 10%, transparent 10%);
  background-size: 1000% 1000%;
  background-position: center;
  opacity: 0;
  transition: opacity 300ms ease, background-size 300ms ease;
}

.tap-feedback-android:active::after {
  background-size: 100% 100%;
  opacity: 1;
  transition: opacity 0ms;
}
```

### 3.3 安全区域（Safe Area）和刘海适配

**说明：** 现代全面屏手机（刘海屏、挖孔屏、灵动岛）需要使用 `env(safe-area-inset-*)` 确保内容不被遮挡。

```css
/* 安全区域适配 */

/* viewport-fit=cover 是前提 */
/* <meta name="viewport" content="..., viewport-fit=cover"> */

/* 顶部安全区域（状态栏 + 刘海/灵动岛） */
.safe-top {
  padding-top: env(safe-area-inset-top);
}

/* 底部安全区域（Home Indicator） */
.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

/* 完整安全区域 */
.safe-area {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}

/* 固定底部栏的安全区域适配 */
.fixed-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 16px;
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  background: #fff;
}

/* 固定顶部栏的安全区域适配 */
.fixed-top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 8px 16px;
  padding-top: calc(8px + env(safe-area-inset-top));
  background: #fff;
}

/* iOS 各设备安全区域参考值 */
/*
 * iPhone SE (2/3):           top: 20pt, bottom: 0pt
 * iPhone 12/13/14:           top: 47pt, bottom: 34pt
 * iPhone 14 Pro (灵动岛):    top: 59pt, bottom: 34pt
 * iPhone 15 Pro:             top: 59pt, bottom: 34pt
 * iPhone 15 Pro Max:         top: 59pt, bottom: 34pt
 */
```

---

## 四、iOS vs Android 设计差异

### 4.1 导航模式差异

| 特性 | iOS | Android |
|------|-----|---------|
| 返回操作 | 左上角返回按钮 + 边缘右滑手势 | 系统返回键/手势 + 左上角按钮 |
| Tab Bar 位置 | 固定底部 | 底部（Material 3），之前也用顶部 Tab |
| 页面转场 | 左右推入/推出 | 多种：淡入淡出、共享元素、容器变换 |
| 大标题 | 原生支持（可折叠） | Material 3 Large Top App Bar |
| 模态页面 | 从底部上滑（Sheet） | 全屏或 Dialog |
| 下拉刷新 | 原生 UIRefreshControl | SwipeRefreshLayout（Material） |

### 4.2 按钮和交互风格差异

| 特性 | iOS | Android (Material 3) |
|------|-----|---------------------|
| 主按钮 | 圆角矩形（radius 10-12pt） | Filled Button（radius 20dp，胶囊形） |
| 点击反馈 | 透明度降低（opacity: 0.6） | Ripple 水波纹效果 |
| 开关 | 绿色/灰色滑块（51×31pt） | Material Switch（52×32dp） |
| 选择器 | Picker Wheel（滚轮） | Dropdown Menu / Date Picker |
| 确认弹窗 | UIAlertController（居中） | AlertDialog（居中，Material 样式） |
| 操作选项 | ActionSheet（底部弹出） | Bottom Sheet / Menu |
| 删除确认 | 左滑 + 红色删除按钮 | 左/右滑 + Snackbar 撤销 |

### 4.3 字体和排版差异

| 特性 | iOS | Android |
|------|-----|---------|
| 系统字体 | SF Pro（Text/Display） | Roboto |
| 中文字体 | PingFang SC | Noto Sans CJK SC |
| 字重 | Regular(400), Medium(500), Semibold(600), Bold(700) | Regular(400), Medium(500), Bold(700) |
| 大标题 | 34pt Bold | 28sp Regular (Headline Large) |
| 正文 | 17pt Regular | 16sp Regular (Body Large) |
| 副文 | 15pt Regular | 14sp Regular (Body Medium) |
| 辅助文字 | 13pt Regular | 12sp Regular (Body Small) |
| 行高 | 约 1.2 倍 | 约 1.5 倍 |

### 4.4 系统组件差异

| 功能 | iOS 组件 | Android 组件 |
|------|---------|-------------|
| 底部操作菜单 | UIActionSheet | BottomSheetDialog |
| 日期选择 | UIDatePicker（滚轮/紧凑/内联） | MaterialDatePicker |
| 时间选择 | UIDatePicker（滚轮） | MaterialTimePicker（表盘/输入） |
| 搜索 | UISearchBar + UISearchController | SearchView / SearchBar |
| 标签页 | UISegmentedControl / UIPageViewController | TabLayout + ViewPager2 |
| 刷新 | UIRefreshControl | SwipeRefreshLayout |
| Toast 提示 | 无原生支持（通常自定义） | Snackbar / Toast |
| 进度条 | UIProgressView | LinearProgressIndicator |
| 加载指示器 | UIActivityIndicatorView（菊花） | CircularProgressIndicator |

---

