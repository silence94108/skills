## 一、基础设计系统

### 1.1 圆角系统

| Token | 值 | 适用场景 |
|-------|-----|---------|
| `none` | `0px` | 表格单元格、分割线 |
| `sm` | `2px` | 小型元素（Badge、Tag） |
| `md` | `6px` | 按钮、输入框、卡片（默认） |
| `lg` | `8-12px` | 大卡片、弹窗、面板 |
| `xl` | `16px` | 浮层、Popover、大圆角卡片 |
| `full` | `9999px` | 药丸按钮、头像、全圆角 |

```css
:root {
  --radius-none: 0px;
  --radius-sm: 2px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

### 1.2 阴影系统

| Token | box-shadow | 适用场景 |
|-------|-----------|---------|
| `sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | 按钮、输入框 |
| `md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | 卡片、下拉菜单 |
| `lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | 弹窗、Popover |
| `xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Modal、全屏面板 |

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
```

### 1.3 组件间距系统

```
组件内部间距（Padding）
├── 紧凑型：  8px (py-2 px-3)
├── 默认型：  12px (py-3 px-4)
└── 宽松型：  16px (py-4 px-6)

组件间间距（Gap）
├── 紧密关联：  8px  (gap-2)   — 同组表单元素
├── 一般关联：  16px (gap-4)   — 不同字段间
├── 区块间隔：  24px (gap-6)   — 表单分组间
└── 大区块间隔：32px (gap-8)   — 页面 Section 间

表单元素间距
├── Label → Input：   4-8px
├── Input → Help text：4px
├── Input → Error：    4px
├── Field → Field：    16-24px
└── Group → Group：    24-32px
```

---

