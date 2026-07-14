# UI/UX 配色方案知识库

> 📦 来源：本文配色方案与设计知识精华整理自以下权威设计资源平台：
> - [Adobe Color](https://color.adobe.com/) — Adobe 官方色彩工具，色轮与配色规则引擎
> - [Coolors](https://coolors.co/) — 快速配色方案生成器，业界广泛使用
> - [Color Hunt](https://colorhunt.co/) — 社区驱动的配色灵感平台，每日精选
> - [Realtime Colors](https://www.realtimecolors.com/) — 实时预览配色在真实 UI 中的效果
> - [Happy Hues](https://www.happyhues.co/) — 提供配色在真实网站场景中的应用示例
> - [Muzli Colors](https://colors.muz.li/) — Muzli 出品的 AI 配色工具
> - [Colorable](https://colorable.jxnblk.com/) — 文字与背景对比度实时计算工具
> - [Contrast Ratio](https://contrast-ratio.com/) — Lea Verou 开发的 WCAG 对比度检测器

---

## 目录

1. [配色原则速查](#一配色原则速查)
2. [无障碍对比度指南](#二无障碍对比度指南-wcag-20)
3. [配色方案集合](#三配色方案集合-25-套)
   - [企业商务 Business](#1-企业商务-business)
   - [科技现代 Tech Modern](#2-科技现代-tech-modern)
   - [清新自然 Nature Fresh](#3-清新自然-nature-fresh)
   - [温暖柔和 Warm Soft](#4-温暖柔和-warm-soft)
   - [暗色高级 Dark Premium](#5-暗色高级-dark-premium)
   - [活力明亮 Vibrant Bright](#6-活力明亮-vibrant-bright)
   - [极简中性 Minimal Neutral](#7-极简中性-minimal-neutral)
   - [渐变趋势 Gradient Trend](#8-渐变趋势-gradient-trend)
4. [CSS 变量模板](#四css-变量模板)
5. [Tailwind CSS 配置示例](#五tailwind-css-配置示例)
6. [快速选色决策树](#六快速选色决策树)

---

## 一、配色原则速查

### 1. 60-30-10 法则（黄金配色比例）

整个界面的色彩分布遵循以下比例：

| 比例 | 角色 | 对应色 | 应用区域 |
|------|------|--------|----------|
| **60%** | 主导色 (Dominant) | Background / Neutral | 背景、大面积留白、卡片底色 |
| **30%** | 辅助色 (Secondary) | Secondary / Primary | 导航栏、侧边栏、次级区块 |
| **10%** | 强调色 (Accent) | Accent / CTA | 按钮、链接、图标、Badge |

> 核心思想：大面积低饱和 + 小面积高饱和 = 视觉平衡且重点突出。

### 2. 色彩关系（Color Harmony）

| 关系类型 | 英文 | 色轮位置 | 效果 | 适用场景 |
|---------|------|---------|------|---------|
| 互补色 | Complementary | 180° 对角 | 高对比、醒目 | CTA 按钮、警告提示 |
| 类比色 | Analogous | 相邻 30°–60° | 和谐、自然 | 整体配色、渐变 |
| 三角色 | Triadic | 120° 等距 | 平衡、丰富 | 仪表盘、数据可视化 |
| 分裂互补 | Split-Complementary | 互补色两侧 | 对比但不刺眼 | 平衡设计、品牌色 |
| 单色系 | Monochromatic | 同一色相不同明度 | 优雅、统一 | 极简设计、文本排版 |

### 3. 色彩心理学速查

| 色彩 | Hex 范围 | 心理联想 | 常见行业 |
|------|---------|---------|---------|
| 蓝色 | `#1E40AF` – `#60A5FA` | 信任、专业、稳定 | 金融、科技、医疗、企业 |
| 绿色 | `#166534` – `#86EFAC` | 成长、健康、自然 | 环保、健康、农业、教育 |
| 红色 | `#991B1B` – `#FCA5A5` | 激情、紧迫、能量 | 餐饮、促销、娱乐 |
| 橙色 | `#9A3412` – `#FDBA74` | 活力、友好、创意 | 食品、运动、社交 |
| 紫色 | `#581C87` – `#D8B4FE` | 高贵、神秘、创新 | 奢侈品、美妆、创意 |
| 黄色 | `#854D0E` – `#FDE68A` | 乐观、警告、注意 | 儿童、教育、提示 |
| 黑色 | `#000000` – `#374151` | 高端、力量、简约 | 奢侈品、时尚、摄影 |
| 白色 | `#F9FAFB` – `#FFFFFF` | 纯净、简洁、空间 | 医疗、极简、科技 |

### 4. 配色实用技巧

- **Brand Color 选定后**：通过调整 HSL 中的 Saturation（饱和度）和 Lightness（明度）生成完整色阶
- **深色模式转换**：不要简单反转颜色，而是降低饱和度 + 提升明度，避免刺眼
- **文字可读性**：正文用低饱和暗色（如 `#1F2937`），不要用纯黑 `#000000`
- **灰色不要纯灰**：给灰色加一点点色调倾向（偏蓝 = 冷静，偏暖 = 亲和）

---

## 二、无障碍对比度指南 (WCAG 2.0)

### 对比度标准

| 级别 | 正常文字 (< 18px / 14px bold) | 大号文字 (>= 18px / 14px bold) | 应用场景 |
|------|------------------------------|-------------------------------|---------|
| **AA** | >= **4.5 : 1** | >= **3 : 1** | 最低要求，必须达到 |
| **AAA** | >= **7 : 1** | >= **4.5 : 1** | 推荐标准，最佳可读性 |

### 常见配色对比度参考

| 前景色 | 背景色 | 对比度 | 级别 |
|--------|--------|--------|------|
| `#FFFFFF` 白 | `#000000` 黑 | 21 : 1 | AAA |
| `#1F2937` 深灰 | `#FFFFFF` 白 | 14.7 : 1 | AAA |
| `#374151` 灰 | `#FFFFFF` 白 | 10.3 : 1 | AAA |
| `#2563EB` 蓝 | `#FFFFFF` 白 | 4.6 : 1 | AA |
| `#DC2626` 红 | `#FFFFFF` 白 | 4.6 : 1 | AA |
| `#059669` 绿 | `#FFFFFF` 白 | 4.5 : 1 | AA |
| `#9333EA` 紫 | `#FFFFFF` 白 | 5.4 : 1 | AA |
| `#F59E0B` 黄 | `#FFFFFF` 白 | 1.9 : 1 | FAIL |
| `#E5E7EB` 浅灰 | `#FFFFFF` 白 | 1.4 : 1 | FAIL |

### 对比度检测公式

```
对比度 = (L1 + 0.05) / (L2 + 0.05)
其中 L1 为较亮颜色的相对亮度，L2 为较暗颜色的相对亮度
```

### 无障碍配色注意事项

1. **不要仅用颜色传达信息**：错误状态除红色外还需图标或文字
2. **链接需额外区分**：除颜色外加下划线或加粗
3. **按钮文字**：确保 Primary Button 上的文字对比度 >= 4.5:1
4. **Placeholder 文字**：对比度至少 3:1（常被忽略）
5. **Focus 状态**：聚焦边框与背景对比度 >= 3:1

---

## 三、配色方案集合 (25+ 套)

每套方案包含 5 个核心色：

| 角色 | 说明 | 60-30-10 中的位置 |
|------|------|------------------|
| **Primary** | 品牌主色，按钮、链接 | 30% 辅助 |
| **Secondary** | 次要强调，辅助元素 | 30% 辅助 |
| **Accent** | 点缀高亮，CTA、Badge | 10% 强调 |
| **Background** | 页面背景 | 60% 主导 |
| **Text** | 正文文字 | — |

---

### 1. 企业商务 (Business)

#### B01 — 稳重蓝调 (Corporate Blue)

| 角色 | Hex | 色块 | 说明 |
|------|-----|------|------|
| Primary | `#1E40AF` | ![#1E40AF](https://via.placeholder.com/16/1E40AF/1E40AF.png) | 深邃蓝，传递信任与专业 |
| Secondary | `#3B82F6` | ![#3B82F6](https://via.placeholder.com/16/3B82F6/3B82F6.png) | 明亮蓝，辅助导航与交互 |
| Accent | `#F59E0B` | ![#F59E0B](https://via.placeholder.com/16/F59E0B/F59E0B.png) | 琥珀金，CTA 与重要提示 |
| Background | `#F8FAFC` | ![#F8FAFC](https://via.placeholder.com/16/F8FAFC/F8FAFC.png) | 极浅蓝白，干净舒适 |
| Text | `#1E293B` | ![#1E293B](https://via.placeholder.com/16/1E293B/1E293B.png) | 深蓝灰，可读性极佳 |

- **适用场景**：企业官网、SaaS 管理后台、B2B 平台、CRM 系统
- **对比度**：Text/Background = 15.4:1 (AAA)，Primary/Background = 8.9:1 (AAA)

#### B02 — 金融沉稳 (Finance Trust)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#1B3A5C` | 藏蓝，金融级信任感 |
| Secondary | `#2E6DA4` | 海军蓝，层次丰富 |
| Accent | `#C9952B` | 暗金色，尊贵感点缀 |
| Background | `#FAFBFC` | 冷白，专业干净 |
| Text | `#212529` | 接近黑，极高可读性 |

- **适用场景**：银行官网、投资理财 App、保险平台、会计系统
- **对比度**：Text/Background = 16.1:1 (AAA)

#### B03 — 商务灰蓝 (Professional Slate)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#475569` | Slate 蓝灰，内敛专业 |
| Secondary | `#64748B` | 中性蓝灰，次要信息 |
| Accent | `#0EA5E9` | Sky 亮蓝，操作引导 |
| Background | `#FFFFFF` | 纯白底，经典商务 |
| Text | `#0F172A` | 极深蓝黑，强可读性 |

- **适用场景**：律所官网、咨询公司、ERP 系统、项目管理工具
- **对比度**：Text/Background = 18.4:1 (AAA)

---

### 2. 科技现代 (Tech Modern)

#### T01 — 极客蓝紫 (Tech Indigo)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#4F46E5` | Indigo，现代科技感 |
| Secondary | `#7C3AED` | 紫罗兰，创新与未来 |
| Accent | `#06B6D4` | Cyan 青色，数据与链接 |
| Background | `#F5F3FF` | 极浅紫白，柔和科技感 |
| Text | `#1E1B4B` | 深靛蓝，与主色系和谐 |

- **适用场景**：AI/ML 产品、开发者工具、API 文档站、SaaS Dashboard
- **对比度**：Text/Background = 15.2:1 (AAA)

#### T02 — 赛博霓虹 (Cyber Neon)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#8B5CF6` | 亮紫，科幻赛博 |
| Secondary | `#EC4899` | 粉紫，活力渐变搭配 |
| Accent | `#14B8A6` | Teal 青绿，数据点缀 |
| Background | `#0F0E17` | 近黑深底，沉浸感 |
| Text | `#FFFFFE` | 纯白字，暗底高对比 |

- **适用场景**：游戏平台、加密货币、Web3 DApp、创意 Agency
- **对比度**：Text/Background = 18.9:1 (AAA)

#### T03 — 清冷科技 (Cool Tech)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#0284C7` | 科技蓝，清澈明确 |
| Secondary | `#0369A1` | 深一级蓝，信息层次 |
| Accent | `#22D3EE` | 亮青，交互高亮 |
| Background | `#F0F9FF` | 极浅天蓝，科技氛围 |
| Text | `#082F49` | 深海蓝，稳定可读 |

- **适用场景**：云计算平台、监控 Dashboard、DevOps 工具、数据分析
- **对比度**：Text/Background = 14.1:1 (AAA)

---

### 3. 清新自然 (Nature Fresh)

#### N01 — 森林清晨 (Forest Morning)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#166534` | 深林绿，自然沉稳 |
| Secondary | `#15803D` | 翠绿，生命力 |
| Accent | `#F97316` | 暖橙，秋叶点缀 |
| Background | `#F0FDF4` | 极浅薄荷绿，清新 |
| Text | `#14532D` | 深绿灰，自然系文字 |

- **适用场景**：环保组织、有机食品电商、农业平台、户外品牌
- **对比度**：Text/Background = 12.8:1 (AAA)

#### N02 — 海风轻拂 (Ocean Breeze)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#0D9488` | Teal 青色，海洋感 |
| Secondary | `#0F766E` | 深青，层次感 |
| Accent | `#FB923C` | 珊瑚橙，夕阳点缀 |
| Background | `#F0FDFA` | 极浅青白 |
| Text | `#134E4A` | 深青灰 |

- **适用场景**：旅游网站、度假预订、水产电商、Spa/Wellness
- **对比度**：Text/Background = 11.3:1 (AAA)

#### N03 — 春日花园 (Spring Garden)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#65A30D` | 鲜草绿，充满活力 |
| Secondary | `#4D7C0F` | 深草绿，稳重搭配 |
| Accent | `#E11D48` | 玫红，花朵点缀 |
| Background | `#FEFCE8` | 极浅鹅黄，温暖柔和 |
| Text | `#365314` | 深橄榄绿 |

- **适用场景**：花店电商、园艺博客、母婴品牌、食谱网站
- **对比度**：Text/Background = 10.6:1 (AAA)

---

### 4. 温暖柔和 (Warm Soft)

#### W01 — 暖阳杏调 (Warm Apricot)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#EA580C` | 暖橙红，热情饱满 |
| Secondary | `#C2410C` | 深橙棕，沉稳搭配 |
| Accent | `#0891B2` | 对比青蓝，凉感平衡 |
| Background | `#FFF7ED` | 极浅杏色，温暖舒适 |
| Text | `#431407` | 深棕，浓郁可读 |

- **适用场景**：餐饮品牌、食品配送、咖啡馆、烘焙工作室
- **对比度**：Text/Background = 16.2:1 (AAA)

#### W02 — 玫瑰柔雾 (Rose Mist)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#BE185D` | 玫瑰红，优雅女性 |
| Secondary | `#9D174D` | 深玫红，质感层次 |
| Accent | `#7C3AED` | 紫罗兰，灵感点缀 |
| Background | `#FFF1F2` | 极浅粉白，柔和甜美 |
| Text | `#4C0519` | 深酒红 |

- **适用场景**：美妆品牌、女性社区、婚庆平台、时尚杂志
- **对比度**：Text/Background = 16.8:1 (AAA)

#### W03 — 大地暖棕 (Earth Tone)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#92400E` | 焦糖棕，大地色系 |
| Secondary | `#78350F` | 深棕，沉稳厚重 |
| Accent | `#059669` | 翡翠绿，自然点缀 |
| Background | `#FFFBEB` | 极浅米黄 |
| Text | `#451A03` | 深巧克力棕 |

- **适用场景**：咖啡品牌、手工艺品、家居装饰、皮具电商
- **对比度**：Text/Background = 16.5:1 (AAA)

---

### 5. 暗色高级 (Dark Premium)

#### D01 — 深空灰 (Space Gray)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#6366F1` | Indigo 亮紫蓝 |
| Secondary | `#818CF8` | 浅紫蓝，悬浮卡片 |
| Accent | `#34D399` | 翡翠绿，成功状态 |
| Background | `#111827` | 深空灰底 |
| Text | `#F9FAFB` | 近白，清晰可读 |

- **适用场景**：代码编辑器、开发者后台、音乐 App、视频平台
- **对比度**：Text/Background = 18.1:1 (AAA)

#### D02 — 暗夜金 (Midnight Gold)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#D97706` | 琥珀金，奢华焦点 |
| Secondary | `#B45309` | 深金棕，层次感 |
| Accent | `#FBBF24` | 亮金，高光点缀 |
| Background | `#18181B` | 近黑，极致沉稳 |
| Text | `#FAFAF9` | 暖白，柔和舒适 |

- **适用场景**：奢侈品展示、高端餐厅、VIP 会员页、手表品牌
- **对比度**：Text/Background = 18.3:1 (AAA)

#### D03 — 暗色翠调 (Dark Emerald)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#10B981` | 翡翠绿，清爽焦点 |
| Secondary | `#059669` | 深翡翠，辅助区域 |
| Accent | `#F472B6` | 粉色，差异化点缀 |
| Background | `#0C1222` | 深海蓝黑 |
| Text | `#E2E8F0` | 浅蓝灰白 |

- **适用场景**：FinTech Dashboard、股票交易界面、数据监控、加密钱包
- **对比度**：Text/Background = 13.8:1 (AAA)

#### D04 — 暗紫星空 (Cosmic Purple)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#A855F7` | 亮紫，宇宙感 |
| Secondary | `#7E22CE` | 深紫，神秘层次 |
| Accent | `#38BDF8` | 天空蓝，清凉对比 |
| Background | `#1A1025` | 深紫黑底 |
| Text | `#F3E8FF` | 浅紫白 |

- **适用场景**：音乐流媒体、游戏平台、NFT 市场、元宇宙入口
- **对比度**：Text/Background = 14.2:1 (AAA)

---

### 6. 活力明亮 (Vibrant Bright)

#### V01 — 彩虹糖果 (Candy Pop)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#7C3AED` | 明紫，年轻活泼 |
| Secondary | `#EC4899` | 亮粉，甜美辅助 |
| Accent | `#FBBF24` | 明黄，高能点缀 |
| Background | `#FFFFFF` | 纯白，让色彩跳跃 |
| Text | `#1F2937` | 深灰，平衡视觉 |

- **适用场景**：儿童教育、社交 App、创意工具、短视频平台
- **对比度**：Text/Background = 14.7:1 (AAA)

#### V02 — 日落橙红 (Sunset Glow)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#DC2626` | 正红，激情能量 |
| Secondary | `#EA580C` | 深橙，热力延伸 |
| Accent | `#FACC15` | 明黄，太阳高光 |
| Background | `#FFFBEB` | 极浅黄白 |
| Text | `#1C1917` | 近黑暖调 |

- **适用场景**：外卖平台、促销活动页、运动品牌、音乐节
- **对比度**：Text/Background = 18.2:1 (AAA)

#### V03 — 电光蓝绿 (Electric Teal)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#0891B2` | 锐利青蓝 |
| Secondary | `#0E7490` | 深青，力量感 |
| Accent | `#F43F5E` | 玫红，警示与 CTA |
| Background | `#ECFEFF` | 极浅青白 |
| Text | `#164E63` | 深青灰 |

- **适用场景**：运动健身 App、电竞平台、新闻聚合、活动报名
- **对比度**：Text/Background = 9.1:1 (AAA)

---

### 7. 极简中性 (Minimal Neutral)

#### M01 — 纯净灰白 (Pure Gray)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#111827` | 极深灰，近乎黑 |
| Secondary | `#4B5563` | 中灰，辅助信息 |
| Accent | `#2563EB` | 单点蓝色，唯一彩色 |
| Background | `#FFFFFF` | 纯白 |
| Text | `#1F2937` | 深灰正文 |

- **适用场景**：个人 Portfolio、摄影作品集、极简博客、文档站
- **对比度**：Text/Background = 14.7:1 (AAA)

#### M02 — 暖灰奶油 (Warm Cream)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#292524` | 暖黑棕 |
| Secondary | `#57534E` | 暖中灰 |
| Accent | `#D97706` | 琥珀金，温暖焦点 |
| Background | `#FAFAF9` | 暖白（偏米） |
| Text | `#1C1917` | 暖深灰 |

- **适用场景**：独立杂志、文学博客、手工艺展示、建筑事务所
- **对比度**：Text/Background = 17.8:1 (AAA)

#### M03 — 冷调灰蓝 (Cool Slate)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary | `#334155` | Slate 深灰蓝 |
| Secondary | `#64748B` | 中性蓝灰 |
| Accent | `#14B8A6` | Teal 点缀 |
| Background | `#F8FAFC` | 冷调灰白 |
| Text | `#0F172A` | 极深蓝黑 |

- **适用场景**：技术文档、开源项目官网、知识库、设计系统
- **对比度**：Text/Background = 18.1:1 (AAA)

---

### 8. 渐变趋势 (Gradient Trend)

> 渐变配色提供起止色，中间过渡由 CSS `linear-gradient` 自动生成。

#### G01 — 极光蓝紫 (Aurora)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary (渐变起) | `#6366F1` | Indigo 起点 |
| Secondary (渐变止) | `#A855F7` | Purple 终点 |
| Accent | `#22D3EE` | Cyan 点缀 |
| Background | `#FAFAFE` | 极浅灰白 |
| Text | `#1E1B4B` | 深靛蓝 |

- **渐变 CSS**：`linear-gradient(135deg, #6366F1 0%, #A855F7 100%)`
- **适用场景**：AI 产品 Landing Page、创意工作室、播客平台
- **对比度**：Text/Background = 15.1:1 (AAA)

#### G02 — 日出暖光 (Sunrise)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary (渐变起) | `#F97316` | 橙色起点 |
| Secondary (渐变止) | `#EC4899` | 粉色终点 |
| Accent | `#2563EB` | 蓝色对比点缀 |
| Background | `#FFFFFF` | 纯白 |
| Text | `#1F2937` | 深灰 |

- **渐变 CSS**：`linear-gradient(135deg, #F97316 0%, #EC4899 100%)`
- **适用场景**：社交媒体 App、活动推广页、音乐平台
- **对比度**：Text/Background = 14.7:1 (AAA)

#### G03 — 深海渐变 (Deep Sea)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary (渐变起) | `#0EA5E9` | Sky 蓝起点 |
| Secondary (渐变止) | `#2DD4BF` | Teal 绿终点 |
| Accent | `#F43F5E` | 玫红点缀 |
| Background | `#F0F9FF` | 极浅天蓝 |
| Text | `#0C4A6E` | 深海蓝 |

- **渐变 CSS**：`linear-gradient(135deg, #0EA5E9 0%, #2DD4BF 100%)`
- **适用场景**：健康科技、水务环保、海洋主题、冥想 App
- **对比度**：Text/Background = 9.6:1 (AAA)

#### G04 — 霓虹暗夜 (Neon Night)

| 角色 | Hex | 说明 |
|------|-----|------|
| Primary (渐变起) | `#EC4899` | 霓虹粉 |
| Secondary (渐变止) | `#8B5CF6` | 霓虹紫 |
| Accent | `#22D3EE` | 霓虹青 |
| Background | `#0A0A0A` | 纯黑底 |
| Text | `#FAFAFA` | 近白 |

- **渐变 CSS**：`linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)`
- **适用场景**：电竞战队、夜店活动、潮牌电商、DJ/音乐制作人
- **对比度**：Text/Background = 19.3:1 (AAA)

---

## 四、CSS 变量模板

以下为通用 CSS Custom Properties 模板，可直接复制使用。

### 亮色主题模板（以 B01 稳重蓝调为例）

```css
:root {
  /* === 品牌色 === */
  --color-primary: #1E40AF;
  --color-primary-light: #3B82F6;
  --color-primary-dark: #1E3A8A;
  --color-primary-50: #EFF6FF;   /* 极浅底色 */
  --color-primary-100: #DBEAFE;
  --color-primary-200: #BFDBFE;
  --color-primary-500: #3B82F6;  /* 标准 */
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;
  --color-primary-800: #1E40AF;
  --color-primary-900: #1E3A8A;

  /* === 辅助色 === */
  --color-secondary: #3B82F6;
  --color-accent: #F59E0B;
  --color-accent-light: #FCD34D;
  --color-accent-dark: #D97706;

  /* === 语义色 === */
  --color-success: #059669;
  --color-success-light: #D1FAE5;
  --color-warning: #D97706;
  --color-warning-light: #FEF3C7;
  --color-error: #DC2626;
  --color-error-light: #FEE2E2;
  --color-info: #2563EB;
  --color-info-light: #DBEAFE;

  /* === 中性色 === */
  --color-background: #F8FAFC;
  --color-surface: #FFFFFF;       /* 卡片、弹窗背景 */
  --color-surface-variant: #F1F5F9; /* 次级卡片 */
  --color-border: #E2E8F0;
  --color-border-light: #F1F5F9;
  --color-divider: #E2E8F0;

  /* === 文字色 === */
  --color-text: #1E293B;          /* 正文 */
  --color-text-secondary: #64748B; /* 辅助文字 */
  --color-text-tertiary: #94A3B8;  /* 占位符、禁用 */
  --color-text-inverse: #FFFFFF;   /* 深色背景上的白字 */
  --color-text-on-primary: #FFFFFF; /* Primary 按钮上的文字 */

  /* === 阴影 === */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

  /* === 圆角 === */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* === 过渡 === */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
}
```

### 暗色主题模板（以 D01 深空灰为例）

```css
[data-theme="dark"],
.dark {
  --color-primary: #818CF8;        /* 暗色模式下 Primary 提亮 */
  --color-primary-light: #A5B4FC;
  --color-primary-dark: #6366F1;
  --color-primary-50: #1E1B4B;
  --color-primary-100: #312E81;
  --color-primary-500: #6366F1;
  --color-primary-600: #818CF8;

  --color-secondary: #818CF8;
  --color-accent: #34D399;
  --color-accent-light: #065F46;

  --color-success: #34D399;
  --color-success-light: #064E3B;
  --color-warning: #FBBF24;
  --color-warning-light: #451A03;
  --color-error: #F87171;
  --color-error-light: #450A0A;
  --color-info: #60A5FA;
  --color-info-light: #172554;

  --color-background: #111827;
  --color-surface: #1F2937;
  --color-surface-variant: #374151;
  --color-border: #374151;
  --color-border-light: #4B5563;
  --color-divider: #374151;

  --color-text: #F9FAFB;
  --color-text-secondary: #9CA3AF;
  --color-text-tertiary: #6B7280;
  --color-text-inverse: #111827;
  --color-text-on-primary: #FFFFFF;

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4);
}
```

### 渐变专用变量

```css
:root {
  /* 渐变方案 G01 - 极光蓝紫 */
  --gradient-aurora: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);

  /* 渐变方案 G02 - 日出暖光 */
  --gradient-sunrise: linear-gradient(135deg, #F97316 0%, #EC4899 100%);

  /* 渐变方案 G03 - 深海渐变 */
  --gradient-deepsea: linear-gradient(135deg, #0EA5E9 0%, #2DD4BF 100%);

  /* 渐变方案 G04 - 霓虹暗夜 */
  --gradient-neon: linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%);

  /* 通用渐变应用 */
  --gradient-primary: var(--gradient-aurora);
  --gradient-hero: var(--gradient-aurora);      /* Hero Section 背景 */
  --gradient-card: var(--gradient-aurora);       /* 特色卡片 */
  --gradient-button: var(--gradient-aurora);     /* 渐变按钮 */
}
```

---

## 五、Tailwind CSS 配置示例

### tailwind.config.js — 完整配色扩展

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 或 'media'
  theme: {
    extend: {
      colors: {
        // === B01 稳重蓝调 ===
        brand: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',  // secondary
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',  // primary
          900: '#1E3A8A',
          950: '#172554',
        },
        accent: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',  // accent
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          variant: '#F1F5F9',
          dark: '#1F2937',
          'dark-variant': '#374151',
        },
        // 语义色
        success: {
          DEFAULT: '#059669',
          light: '#D1FAE5',
          dark: '#064E3B',
        },
        warning: {
          DEFAULT: '#D97706',
          light: '#FEF3C7',
          dark: '#451A03',
        },
        error: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
          dark: '#450A0A',
        },
      },
      // 渐变快捷
      backgroundImage: {
        'gradient-aurora':  'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
        'gradient-sunrise': 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)',
        'gradient-deepsea': 'linear-gradient(135deg, #0EA5E9 0%, #2DD4BF 100%)',
        'gradient-neon':    'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
      },
      // 阴影
      boxShadow: {
        'card':    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'card-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'card-dark':    '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
        'card-dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
```

### 使用示例

```html
<!-- Primary 按钮 -->
<button class="bg-brand-800 hover:bg-brand-700 text-white px-6 py-2 rounded-lg transition-colors">
  立即开始
</button>

<!-- Accent CTA -->
<button class="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg transition-colors">
  免费试用
</button>

<!-- 渐变 Hero -->
<section class="bg-gradient-aurora text-white py-20">
  <h1 class="text-4xl font-bold">欢迎使用</h1>
</section>

<!-- 卡片 -->
<div class="bg-surface shadow-card rounded-xl p-6 dark:bg-surface-dark dark:shadow-card-dark">
  <h3 class="text-brand-800 dark:text-brand-400 font-semibold">标题</h3>
  <p class="text-gray-600 dark:text-gray-400 mt-2">描述文字</p>
</div>

<!-- 语义状态 -->
<span class="bg-success-light text-success px-3 py-1 rounded-full text-sm">成功</span>
<span class="bg-error-light text-error px-3 py-1 rounded-full text-sm">错误</span>
<span class="bg-warning-light text-warning px-3 py-1 rounded-full text-sm">警告</span>
```

---

## 六、快速选色决策树

根据项目需求快速定位合适的配色方案：

```
项目是什么类型？
├─ 企业/B2B/金融
│   ├─ 需要极度稳重 → B02 (金融沉稳)
│   ├─ 标准企业蓝 → B01 (稳重蓝调)
│   └─ 灰色系专业 → B03 (商务灰蓝)
│
├─ 科技/开发者/AI
│   ├─ 暗色为主 → T02 (赛博霓虹)
│   ├─ 亮色为主 → T01 (极客蓝紫)
│   └─ 数据密集 → T03 (清冷科技)
│
├─ 电商/消费品
│   ├─ 食品/餐饮 → W01 (暖阳杏调)
│   ├─ 美妆/女性 → W02 (玫瑰柔雾)
│   ├─ 手工/家居 → W03 (大地暖棕)
│   ├─ 户外/环保 → N01 (森林清晨)
│   └─ 促销/活力 → V02 (日落橙红)
│
├─ 内容/博客/Portfolio
│   ├─ 极简黑白 → M01 (纯净灰白)
│   ├─ 文艺暖调 → M02 (暖灰奶油)
│   └─ 技术文档 → M03 (冷调灰蓝)
│
├─ 暗色主题需求
│   ├─ 代码/开发 → D01 (深空灰)
│   ├─ 奢侈/高端 → D02 (暗夜金)
│   ├─ 金融数据 → D03 (暗色翠调)
│   └─ 娱乐/游戏 → D04 (暗紫星空)
│
├─ 需要渐变效果
│   ├─ AI/创意 → G01 (极光蓝紫)
│   ├─ 社交/活力 → G02 (日出暖光)
│   ├─ 健康/自然 → G03 (深海渐变)
│   └─ 电竞/潮流 → G04 (霓虹暗夜)
│
└─ 儿童/教育/社交
    ├─ 活泼多彩 → V01 (彩虹糖果)
    ├─ 运动活力 → V03 (电光蓝绿)
    └─ 自然清新 → N03 (春日花园)
```

---

## 附录：配色方案速查索引

| 编号 | 名称 | 风格 | Primary | Background | 适用场景 |
|------|------|------|---------|------------|---------|
| B01 | 稳重蓝调 | 企业商务 | `#1E40AF` | `#F8FAFC` | 企业官网、SaaS 后台 |
| B02 | 金融沉稳 | 企业商务 | `#1B3A5C` | `#FAFBFC` | 银行、投资理财 |
| B03 | 商务灰蓝 | 企业商务 | `#475569` | `#FFFFFF` | 律所、咨询、ERP |
| T01 | 极客蓝紫 | 科技现代 | `#4F46E5` | `#F5F3FF` | AI 产品、开发者工具 |
| T02 | 赛博霓虹 | 科技现代 | `#8B5CF6` | `#0F0E17` | 游戏、Web3、加密 |
| T03 | 清冷科技 | 科技现代 | `#0284C7` | `#F0F9FF` | 云平台、监控 |
| N01 | 森林清晨 | 清新自然 | `#166534` | `#F0FDF4` | 环保、有机食品 |
| N02 | 海风轻拂 | 清新自然 | `#0D9488` | `#F0FDFA` | 旅游、度假 |
| N03 | 春日花园 | 清新自然 | `#65A30D` | `#FEFCE8` | 花店、母婴 |
| W01 | 暖阳杏调 | 温暖柔和 | `#EA580C` | `#FFF7ED` | 餐饮、咖啡馆 |
| W02 | 玫瑰柔雾 | 温暖柔和 | `#BE185D` | `#FFF1F2` | 美妆、婚庆 |
| W03 | 大地暖棕 | 温暖柔和 | `#92400E` | `#FFFBEB` | 咖啡、手工艺 |
| D01 | 深空灰 | 暗色高级 | `#6366F1` | `#111827` | 代码编辑器、音乐 |
| D02 | 暗夜金 | 暗色高级 | `#D97706` | `#18181B` | 奢侈品、高端餐厅 |
| D03 | 暗色翠调 | 暗色高级 | `#10B981` | `#0C1222` | FinTech、股票交易 |
| D04 | 暗紫星空 | 暗色高级 | `#A855F7` | `#1A1025` | 音乐流媒体、NFT |
| V01 | 彩虹糖果 | 活力明亮 | `#7C3AED` | `#FFFFFF` | 儿童教育、社交 |
| V02 | 日落橙红 | 活力明亮 | `#DC2626` | `#FFFBEB` | 外卖、促销 |
| V03 | 电光蓝绿 | 活力明亮 | `#0891B2` | `#ECFEFF` | 运动、电竞 |
| M01 | 纯净灰白 | 极简中性 | `#111827` | `#FFFFFF` | Portfolio、摄影 |
| M02 | 暖灰奶油 | 极简中性 | `#292524` | `#FAFAF9` | 杂志、文学博客 |
| M03 | 冷调灰蓝 | 极简中性 | `#334155` | `#F8FAFC` | 技术文档、设计系统 |
| G01 | 极光蓝紫 | 渐变趋势 | `#6366F1` | `#FAFAFE` | AI Landing Page |
| G02 | 日出暖光 | 渐变趋势 | `#F97316` | `#FFFFFF` | 社交媒体、活动页 |
| G03 | 深海渐变 | 渐变趋势 | `#0EA5E9` | `#F0F9FF` | 健康科技、冥想 |
| G04 | 霓虹暗夜 | 渐变趋势 | `#EC4899` | `#0A0A0A` | 电竞、潮牌 |

---

> 使用建议：选定方案后，复制对应的 CSS 变量模板，将 hex 值替换为目标方案的颜色即可快速启动项目。配合 Tailwind 配置可实现更高效的开发体验。
