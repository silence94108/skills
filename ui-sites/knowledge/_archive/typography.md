# Typography 字体排版设计知识库

> **来源** | [Google Fonts](https://fonts.google.com/) | [Fontshare](https://www.fontshare.com/) | [Fonts In Use](https://fontsinuse.com/) | [Typewolf](https://www.typewolf.com/) | [Fontjoy](https://fontjoy.com/) | [Archetype](https://archetypeapp.com/) | [Type Scale](https://typescale.com/)

---

## 目录

1. [字体搭配方案（25+ 组）](#一字体搭配方案)
2. [Type Scale 比例参考](#二type-scale-比例参考)
3. [行高规范（line-height）](#三行高规范)
4. [字间距规范（letter-spacing）](#四字间距规范)
5. [CSS 字体栈模板](#五css-字体栈模板)
6. [Tailwind CSS 配置示例](#六tailwind-css-配置示例)
7. [中文字体推荐与搭配](#七中文字体推荐与搭配)
8. [垂直韵律与排版网格](#八垂直韵律与排版网格)
9. [实用速查表](#九实用速查表)

---

## 一、字体搭配方案

### A. 现代简约风格（Modern Minimal）

适用场景：SaaS 产品、科技公司官网、Dashboard、管理后台、极简作品集

#### 搭配 1：Inter + Inter

- **标题字体**：[Inter](https://fonts.google.com/specimen/Inter)（SemiBold 600 / Bold 700）
- **正文字体**：[Inter](https://fonts.google.com/specimen/Inter)（Regular 400）
- **适用场景**：通用 UI 界面、管理后台、数据产品
- **说明**：单一字体族通过字重变化建立层级，是 2025-2026 最流行的 UI 字体。Variable Font 支持无级字重调节，极致简洁。

#### 搭配 2：Manrope + Inter

- **标题字体**：[Manrope](https://fonts.google.com/specimen/Manrope)（Bold 700 / ExtraBold 800）
- **正文字体**：[Inter](https://fonts.google.com/specimen/Inter)（Regular 400）
- **适用场景**：Fintech 产品、效率工具、B2B SaaS 着陆页
- **说明**：Manrope 带有几何感的标题配合 Inter 中性的正文，低摩擦阅读体验。两者 x-height 接近，视觉协调。

#### 搭配 3：Albert Sans + Barlow

- **标题字体**：[Albert Sans](https://fonts.google.com/specimen/Albert+Sans)（Bold 700）
- **正文字体**：[Barlow](https://fonts.google.com/specimen/Barlow)（Regular 400）
- **适用场景**：个人品牌网站、创意工作室、轻量级 Web App
- **说明**：圆润而非正式，Albert Sans 的现代几何感搭配 Barlow 的工业简洁，亲和力强。

#### 搭配 4：Montserrat + Source Sans 3

- **标题字体**：[Montserrat](https://fonts.google.com/specimen/Montserrat)（SemiBold 600 / Bold 700）
- **正文字体**：[Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3)（Regular 400）
- **适用场景**：企业官网、产品落地页、市场营销页面
- **说明**：经典的现代搭配。Montserrat 几何 Grotesque 标题具有辨识度，Source Sans 3 正文可读性极佳。

#### 搭配 5：IBM Plex Sans + IBM Plex Serif

- **标题字体**：[IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans)（Medium 500 / SemiBold 600）
- **正文字体**：[IBM Plex Serif](https://fonts.google.com/specimen/IBM+Plex+Serif)（Regular 400）
- **适用场景**：企业级工具、技术文档站、开发者平台
- **说明**：Super Family 同族搭配，Sans 标题 + Serif 正文，统一而有层次。IBM 设计系统出品，质量极高。

---

### B. 经典优雅风格（Classic Elegant）

适用场景：奢侈品牌、杂志出版物、文学博客、婚礼网站、高端房地产

#### 搭配 6：Playfair Display + Lato

- **标题字体**：[Playfair Display](https://fonts.google.com/specimen/Playfair+Display)（Bold 700）
- **正文字体**：[Lato](https://fonts.google.com/specimen/Lato)（Regular 400）
- **适用场景**：时尚杂志、奢侈品牌官网、高端博客
- **说明**：Playfair Display 的高对比度衬线字形如同传统排版，配合 Lato 人文主义 Sans 正文，优雅而不沉闷。

#### 搭配 7：DM Serif Display + DM Sans

- **标题字体**：[DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display)（Regular 400）
- **正文字体**：[DM Sans](https://fonts.google.com/specimen/DM+Sans)（Regular 400）
- **适用场景**：金融品牌、高端专业服务、企业年报
- **说明**：同族设计语言，DM Serif Display 标题精致典雅，DM Sans 正文干净利落。高对比度笔画比例赋予专业权威感。

#### 搭配 8：Lora + Nunito

- **标题字体**：[Lora](https://fonts.google.com/specimen/Lora)（SemiBold 600 / Bold 700）
- **正文字体**：[Nunito](https://fonts.google.com/specimen/Nunito)（Regular 400）
- **适用场景**：文学杂志、书评博客、教育平台
- **说明**：Lora 具备经典 Serif 的文学气质，Nunito 圆润友好。适合长文阅读，标题有张力而正文柔和。

#### 搭配 9：Playfair Display + Raleway

- **标题字体**：[Playfair Display](https://fonts.google.com/specimen/Playfair+Display)（Bold 700 / Black 900）
- **正文字体**：[Raleway](https://fonts.google.com/specimen/Raleway)（Regular 400）
- **适用场景**：艺术画廊、设计工作室、高端电商
- **说明**：Old-world Serif 的戏剧感搭配现代极简 Sans 的平衡感。标题抓眼球，正文不抢戏。

#### 搭配 10：Bitter + Source Sans 3

- **标题字体**：[Bitter](https://fonts.google.com/specimen/Bitter)（Bold 700）
- **正文字体**：[Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3)（Regular 400）
- **适用场景**：出版社、教育机构、非营利组织官网
- **说明**：Bitter 是专为屏幕优化的 Slab Serif，搭配高可读性的 Source Sans 3 正文，编辑调性强烈。

---

### C. 科技感风格（Tech / Futuristic）

适用场景：科技公司、AI 产品、开发者工具、区块链、数据可视化

#### 搭配 11：Space Grotesk + JetBrains Mono

- **标题字体**：[Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)（Bold 700）
- **正文字体**：[JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)（Regular 400）
- **适用场景**：开发者工具文档、技术博客代码展示、CLI 产品着陆页
- **说明**：Space Grotesk 的几何科技感标题搭配 JetBrains Mono 等宽字体正文，极具极客氛围。适合代码密集的技术场景。

#### 搭配 12：Inter + Roboto Condensed

- **标题字体**：[Roboto Condensed](https://fonts.google.com/specimen/Roboto+Condensed)（Bold 700）
- **正文字体**：[Inter](https://fonts.google.com/specimen/Inter)（Regular 400）
- **适用场景**：数据 Dashboard、分析平台、产品控制台
- **说明**：Condensed 标题节省水平空间，适合信息密度高的界面。Inter 正文保证长文阅读舒适度。

#### 搭配 13：Space Grotesk + Space Mono

- **标题字体**：[Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)（Medium 500 / Bold 700）
- **正文字体**：[Space Mono](https://fonts.google.com/specimen/Space+Mono)（Regular 400）
- **适用场景**：区块链产品、Web3 项目官网、科幻主题设计
- **说明**：同一设计师 Florian Karsten 的作品，几何形态统一，科技未来感极强。

#### 搭配 14：Sora + Inter

- **标题字体**：[Sora](https://fonts.google.com/specimen/Sora)（SemiBold 600 / Bold 700）
- **正文字体**：[Inter](https://fonts.google.com/specimen/Inter)（Regular 400）
- **适用场景**：AI 产品、自动化工具、创新科技品牌
- **说明**：Sora 是由 Jonathan Barnbrook 设计的几何字体，字母开口大，现代感强。搭配 Inter 正文，既前卫又实用。

---

### D. 手写温暖风格（Handwritten / Warm）

适用场景：生活方式品牌、食品饮品、个人博客、婚礼策划、儿童教育

#### 搭配 15：Caveat + Karla

- **标题字体**：[Caveat](https://fonts.google.com/specimen/Caveat)（Bold 700）
- **正文字体**：[Karla](https://fonts.google.com/specimen/Karla)（Regular 400）
- **适用场景**：个人博客、手作品牌、烘焙店官网
- **说明**：Caveat 手写风格注入温暖个性，Karla 人文 Grotesque 正文保持结构和可读性。感性而不失秩序。

#### 搭配 16：Courgette + Libre Baskerville

- **标题字体**：[Courgette](https://fonts.google.com/specimen/Courgette)（Regular 400）
- **正文字体**：[Libre Baskerville](https://fonts.google.com/specimen/Libre+Baskerville)（Regular 400）
- **适用场景**：餐厅菜单、生活杂志、旅行博客
- **说明**：Courgette 亲切的手写斜体搭配 Libre Baskerville 沉稳的经典衬线，温度感满分。

#### 搭配 17：Dancing Script + Open Sans

- **标题字体**：[Dancing Script](https://fonts.google.com/specimen/Dancing+Script)（Bold 700）
- **正文字体**：[Open Sans](https://fonts.google.com/specimen/Open+Sans)（Regular 400）
- **适用场景**：婚礼邀请函网站、花店、珠宝品牌
- **说明**：Dancing Script 优雅的连笔书法风格用于标题装饰，Open Sans 中性可靠的正文稳住整体。

#### 搭配 18：Sacramento + Montserrat

- **标题字体**：[Sacramento](https://fonts.google.com/specimen/Sacramento)（Regular 400）
- **正文字体**：[Montserrat](https://fonts.google.com/specimen/Montserrat)（Regular 400）
- **适用场景**：美容品牌、SPA 会所、婚纱摄影
- **说明**：Sacramento 流畅的手写 Script 搭配 Montserrat 的几何理性。优雅装饰性标题搭配清晰正文，对比鲜明。

---

### E. 粗犷有力风格（Bold / Powerful）

适用场景：体育品牌、音乐节、游戏、街头文化、运动健身

#### 搭配 19：Bebas Neue + Source Sans 3

- **标题字体**：[Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue)（Regular 400）
- **正文字体**：[Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3)（Regular 400）
- **适用场景**：体育赛事、健身品牌、活动海报着陆页
- **说明**：Bebas Neue 全大写 Condensed Display 字体，标题冲击力极强。Source Sans 3 稳健正文保持可读性。

#### 搭配 20：Montserrat Black + Raleway

- **标题字体**：[Montserrat](https://fonts.google.com/specimen/Montserrat)（Black 900 / ExtraBold 800）
- **正文字体**：[Raleway](https://fonts.google.com/specimen/Raleway)（Regular 400）
- **适用场景**：品牌 Hero Section、创意机构、音乐节官网
- **说明**：Montserrat 极粗字重的视觉冲击搭配 Raleway 优雅的字形节奏。Hero Section 震撼力十足。

#### 搭配 21：Arvo + Roboto

- **标题字体**：[Arvo](https://fonts.google.com/specimen/Arvo)（Bold 700）
- **正文字体**：[Roboto](https://fonts.google.com/specimen/Roboto)（Regular 400）
- **适用场景**：新闻媒体、科技评测、产品发布页
- **说明**：Arvo 方正的 Slab Serif 结构感强，搭配 Roboto 的均衡效率。标题有力度而正文流畅。

#### 搭配 22：Oswald + Merriweather

- **标题字体**：[Oswald](https://fonts.google.com/specimen/Oswald)（Bold 700）
- **正文字体**：[Merriweather](https://fonts.google.com/specimen/Merriweather)（Regular 400）
- **适用场景**：新闻出版、长文专栏、深度报道
- **说明**：Oswald Condensed Sans 标题占空间少却视觉醒目，Merriweather 是为屏幕阅读优化的 Serif。信息密度与阅读舒适度兼顾。

---

### F. 东亚排版风格（East Asian Typography）

适用场景：中文网站、日本风格设计、文化类项目、在线阅读

#### 搭配 23：Noto Sans SC + Inter

- **标题字体**：[Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC)（Bold 700）/ 思源黑体
- **正文字体**：[Inter](https://fonts.google.com/specimen/Inter)（Regular 400）+ Noto Sans SC（Regular 400）
- **适用场景**：中文科技产品 UI、双语企业官网、SaaS 后台
- **说明**：思源黑体与 Inter 的 x-height 和笔画粗细比例接近，中英混排时视觉高度一致。思源黑体是最广泛使用的中文 Sans Serif Web Font。

#### 搭配 24：Noto Serif SC + Playfair Display

- **标题字体**：[Playfair Display](https://fonts.google.com/specimen/Playfair+Display)（Bold 700）+ [Noto Serif SC](https://fonts.google.com/noto/specimen/Noto+Serif+SC)（Bold 700）/ 思源宋体
- **正文字体**：Noto Serif SC（Regular 400）
- **适用场景**：文学杂志、文化传播、出版社官网、在线读书
- **说明**：思源宋体与 Playfair Display 都具有高对比度的衬线特征，风格统一。适合文学性强的长文排版。

#### 搭配 25：LXGW WenKai + Lora

- **标题字体**：[LXGW WenKai](https://github.com/lxgw/LxgwWenKai) / 霞鹜文楷（Bold）
- **正文字体**：[Lora](https://fonts.google.com/specimen/Lora)（Regular 400）+ LXGW WenKai（Regular）
- **适用场景**：文化博客、诗词展示、古风设计、教育类平台
- **说明**：霞鹜文楷基于日本 Fontworks Klee One，楷体风格兼具传统书法美感与现代屏幕可读性。搭配 Lora 的文学衬线气质，东西方文字和谐共处。

#### 搭配 26：Noto Sans SC + Montserrat

- **标题字体**：[Montserrat](https://fonts.google.com/specimen/Montserrat)（Bold 700）+ Noto Sans SC（Bold 700）
- **正文字体**：Noto Sans SC（Regular 400）
- **适用场景**：中文品牌官网、产品营销页、双语着陆页
- **说明**：Montserrat 几何特征与思源黑体的理性结构互补。标题英文用 Montserrat 增加设计感，中文 fallback 到思源黑体无缝衔接。

#### 搭配 27：LXGW WenKai + EB Garamond

- **标题字体**：LXGW WenKai（Bold）+ [EB Garamond](https://fonts.google.com/specimen/EB+Garamond)（Bold 700）
- **正文字体**：LXGW WenKai（Regular）+ EB Garamond（Regular 400）
- **适用场景**：学术出版物、传统文化数字化、博物馆网站
- **说明**：EB Garamond 是 Claude Garamond 作品的复刻，古典学术气质浓厚。搭配霞鹜文楷的楷书韵味，中西经典并列，文化底蕴深厚。

---

## 二、Type Scale 比例参考

Type Scale（字体大小比例）是排版系统的数学基础。选择一个基准字号（base size）和一个比率（ratio），通过乘法递推得出全套字号。

### 比例总览

| 比例名称 | 比率值 | 对比强度 | 推荐场景 |
|---------|--------|---------|---------|
| Minor Second | 1.067 | 极低 | 信息密集的数据表格、仪表盘 |
| **Major Second** | **1.125** | 低 | 后台管理 UI、工具型应用 |
| **Minor Third** | **1.200** | 中低 | 通用 Web 应用、博客（推荐起步） |
| **Major Third** | **1.250** | 中 | 企业官网、落地页（最常用） |
| **Perfect Fourth** | **1.333** | 中高 | 杂志式排版、品牌网站 |
| Augmented Fourth | 1.414 | 高 | 创意展示、作品集 |
| Perfect Fifth | 1.500 | 高 | 海报风格、展览页面 |
| **Golden Ratio** | **1.618** | 极高 | 奢侈品牌、艺术项目 |

### 完整字号表（基准 16px）

以下列出每个比例从 `xs` 到 `6xl` 的完整字号计算结果：

#### Major Second（1.125）— 适合信息密集 UI

| Token | 比例层级 | 计算值 | 取整值 |
|-------|---------|--------|--------|
| `xs` | base / 1.125^2 | 12.64px | **12.64px** |
| `sm` | base / 1.125 | 14.22px | **14.22px** |
| `base` | 16px | 16px | **16px** |
| `lg` | base * 1.125 | 18px | **18px** |
| `xl` | base * 1.125^2 | 20.25px | **20.25px** |
| `2xl` | base * 1.125^3 | 22.78px | **22.78px** |
| `3xl` | base * 1.125^4 | 25.63px | **25.63px** |
| `4xl` | base * 1.125^5 | 28.83px | **28.83px** |
| `5xl` | base * 1.125^6 | 32.44px | **32.44px** |
| `6xl` | base * 1.125^7 | 36.49px | **36.49px** |

#### Minor Third（1.200）— 通用推荐

| Token | 比例层级 | 计算值 | 取整值 |
|-------|---------|--------|--------|
| `xs` | base / 1.2^2 | 11.11px | **11.11px** |
| `sm` | base / 1.2 | 13.33px | **13.33px** |
| `base` | 16px | 16px | **16px** |
| `lg` | base * 1.2 | 19.2px | **19.20px** |
| `xl` | base * 1.2^2 | 23.04px | **23.04px** |
| `2xl` | base * 1.2^3 | 27.65px | **27.65px** |
| `3xl` | base * 1.2^4 | 33.18px | **33.18px** |
| `4xl` | base * 1.2^5 | 39.81px | **39.81px** |
| `5xl` | base * 1.2^6 | 47.78px | **47.78px** |
| `6xl` | base * 1.2^7 | 57.33px | **57.33px** |

#### Major Third（1.250）— 最常用

| Token | 比例层级 | 计算值 | 取整值 |
|-------|---------|--------|--------|
| `xs` | base / 1.25^2 | 10.24px | **10.24px** |
| `sm` | base / 1.25 | 12.8px | **12.80px** |
| `base` | 16px | 16px | **16px** |
| `lg` | base * 1.25 | 20px | **20px** |
| `xl` | base * 1.25^2 | 25px | **25px** |
| `2xl` | base * 1.25^3 | 31.25px | **31.25px** |
| `3xl` | base * 1.25^4 | 39.06px | **39.06px** |
| `4xl` | base * 1.25^5 | 48.83px | **48.83px** |
| `5xl` | base * 1.25^6 | 61.04px | **61.04px** |
| `6xl` | base * 1.25^7 | 76.29px | **76.29px** |

#### Perfect Fourth（1.333）— 杂志式排版

| Token | 比例层级 | 计算值 | 取整值 |
|-------|---------|--------|--------|
| `xs` | base / 1.333^2 | 9.00px | **9.00px** |
| `sm` | base / 1.333 | 12.00px | **12.00px** |
| `base` | 16px | 16px | **16px** |
| `lg` | base * 1.333 | 21.33px | **21.33px** |
| `xl` | base * 1.333^2 | 28.43px | **28.43px** |
| `2xl` | base * 1.333^3 | 37.90px | **37.90px** |
| `3xl` | base * 1.333^4 | 50.52px | **50.52px** |
| `4xl` | base * 1.333^5 | 67.34px | **67.34px** |
| `5xl` | base * 1.333^6 | 89.76px | **89.76px** |
| `6xl` | base * 1.333^7 | 119.66px | **119.66px** |

#### Augmented Fourth（1.414）— 创意展示

| Token | 比例层级 | 计算值 | 取整值 |
|-------|---------|--------|--------|
| `xs` | base / 1.414^2 | 8.00px | **8.00px** |
| `sm` | base / 1.414 | 11.31px | **11.31px** |
| `base` | 16px | 16px | **16px** |
| `lg` | base * 1.414 | 22.63px | **22.63px** |
| `xl` | base * 1.414^2 | 32.00px | **32.00px** |
| `2xl` | base * 1.414^3 | 45.25px | **45.25px** |
| `3xl` | base * 1.414^4 | 64.00px | **64.00px** |
| `4xl` | base * 1.414^5 | 90.51px | **90.51px** |
| `5xl` | base * 1.414^6 | 128.00px | **128.00px** |
| `6xl` | base * 1.414^7 | 181.02px | **181.02px** |

#### Perfect Fifth（1.500）— 海报风格

| Token | 比例层级 | 计算值 | 取整值 |
|-------|---------|--------|--------|
| `xs` | base / 1.5^2 | 7.11px | **7.11px** |
| `sm` | base / 1.5 | 10.67px | **10.67px** |
| `base` | 16px | 16px | **16px** |
| `lg` | base * 1.5 | 24px | **24px** |
| `xl` | base * 1.5^2 | 36px | **36px** |
| `2xl` | base * 1.5^3 | 54px | **54px** |
| `3xl` | base * 1.5^4 | 81px | **81px** |
| `4xl` | base * 1.5^5 | 121.5px | **121.50px** |
| `5xl` | base * 1.5^6 | 182.25px | **182.25px** |
| `6xl` | base * 1.5^7 | 273.38px | **273.38px** |

#### Golden Ratio（1.618）— 奢华与艺术

| Token | 比例层级 | 计算值 | 取整值 |
|-------|---------|--------|--------|
| `xs` | base / 1.618^2 | 6.11px | **6.11px** |
| `sm` | base / 1.618 | 9.89px | **9.89px** |
| `base` | 16px | 16px | **16px** |
| `lg` | base * 1.618 | 25.89px | **25.89px** |
| `xl` | base * 1.618^2 | 41.89px | **41.89px** |
| `2xl` | base * 1.618^3 | 67.77px | **67.77px** |
| `3xl` | base * 1.618^4 | 109.66px | **109.66px** |
| `4xl` | base * 1.618^5 | 177.42px | **177.42px** |
| `5xl` | base * 1.618^6 | 287.07px | **287.07px** |
| `6xl` | base * 1.618^7 | 464.47px | **464.47px** |

### Type Scale 选择指南

```
信息密集（Dashboard、表格）  →  Major Second (1.125)
通用 Web 应用                →  Minor Third (1.200)
企业官网 / 着陆页            →  Major Third (1.250) ★ 推荐
杂志 / 编辑排版              →  Perfect Fourth (1.333)
创意作品集                   →  Augmented Fourth (1.414)
海报 / 展示页                →  Perfect Fifth (1.500)
奢侈品 / 艺术项目            →  Golden Ratio (1.618)
```

### CSS Custom Property 实现

```css
:root {
  --type-ratio: 1.25; /* Major Third */
  --type-base: 1rem;  /* 16px */

  --type-xs:  calc(var(--type-base) / var(--type-ratio) / var(--type-ratio));
  --type-sm:  calc(var(--type-base) / var(--type-ratio));
  --type-base-size: var(--type-base);
  --type-lg:  calc(var(--type-base) * var(--type-ratio));
  --type-xl:  calc(var(--type-base) * var(--type-ratio) * var(--type-ratio));
  --type-2xl: calc(var(--type-base) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio));
  --type-3xl: calc(var(--type-base) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio));
  --type-4xl: calc(var(--type-base) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio));
  --type-5xl: calc(var(--type-base) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio));
  --type-6xl: calc(var(--type-base) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio));
}
```

---

## 三、行高规范

行高（line-height）直接影响文本的可读性和视觉韵律。使用无单位值（unitless），使行高随字号自动缩放。

### 行高参考表

| 用途 | line-height 范围 | 推荐值 | 说明 |
|------|-----------------|--------|------|
| 大标题（Display / H1） | 1.0 - 1.15 | **1.1** | 大字号时字间已有足够空间，紧凑行高增强视觉冲击力 |
| 中标题（H2 / H3） | 1.15 - 1.3 | **1.2** | 保持标题紧凑但多行时不拥挤 |
| 小标题（H4 / H5 / H6） | 1.2 - 1.4 | **1.3** | 小标题可能会换行，需要稍多行间距 |
| **正文 / 长文阅读** | **1.5 - 1.75** | **1.6** | 正文核心区间，1.5 是底线，1.75 适合宽行 |
| 小字 / 辅助文本 | 1.3 - 1.5 | **1.4** | caption、footnote、label 等小字体 |
| UI 元素（按钮、标签） | 1.0 - 1.2 | **1** | 按钮、badge 等紧凑 UI 控件 |
| 代码块 | 1.4 - 1.6 | **1.5** | 等宽字体代码展示 |

### 行高与字号的关系

```
字号越大 → 行高比例越小（紧凑）
字号越小 → 行高比例越大（疏松）
```

### 行高 CSS 最佳实践

```css
/* 全局基础 */
body {
  line-height: 1.6;  /* 无单位值，自动继承并按比例缩放 */
}

/* 标题层级 */
h1 { line-height: 1.1; }
h2 { line-height: 1.2; }
h3 { line-height: 1.25; }
h4, h5, h6 { line-height: 1.3; }

/* 正文 */
p, li, dd { line-height: 1.6; }

/* 长文阅读优化（如博客正文） */
article p { line-height: 1.75; }

/* 小字 */
small, .caption, .footnote { line-height: 1.4; }

/* UI 控件 */
button, .badge, .tag { line-height: 1; }

/* 代码 */
code, pre { line-height: 1.5; }
```

### 中文排版行高特别说明

中文字符没有 ascender 和 descender（上升部/下降部），字面框（em box）占比更大，因此中文正文通常需要比英文更大的行高：

| 类型 | 英文推荐 | 中文推荐 |
|------|---------|---------|
| 正文 | 1.5 - 1.6 | **1.7 - 2.0** |
| 标题 | 1.1 - 1.3 | **1.3 - 1.5** |
| 小字 | 1.4 | **1.5** |

---

## 四、字间距规范

字间距（letter-spacing / tracking）微调字符间距，直接影响文本的呼吸感和辨识度。

### 字间距参考表

| 用途 | letter-spacing | 说明 |
|------|---------------|------|
| 大标题（Display） | `-0.025em` ~ `-0.015em` | 大字号时字距过宽需收紧 |
| H1 标题 | `-0.02em` | 标题适度收紧 |
| H2 标题 | `-0.015em` | 略微收紧 |
| H3 / H4 标题 | `-0.01em` ~ `0` | 接近默认 |
| **正文** | **`0`（默认）** | 正文不要手动调整 letter-spacing |
| 小字 / Caption | `0.01em` ~ `0.02em` | 小字号适当加宽以提升辨识度 |
| 全大写文本 | `0.05em` ~ `0.1em` | 大写字母间距必须加宽 |
| 按钮文本 | `0.02em` ~ `0.05em` | 略微加宽提升可点击感 |
| 导航链接 | `0.01em` ~ `0.03em` | 适度加宽增加清晰度 |

### 核心原则

```
字号越大 → letter-spacing 越负（收紧）
字号越小 → letter-spacing 越正（加宽）
全大写时 → 必须加宽 letter-spacing
正文不动 → 保持默认值 0
```

### 字间距 CSS 实现

```css
/* 标题收紧 */
h1 { letter-spacing: -0.02em; }
h2 { letter-spacing: -0.015em; }
h3 { letter-spacing: -0.01em; }

/* 正文默认 */
p { letter-spacing: 0; }

/* 小字加宽 */
.caption { letter-spacing: 0.015em; }
.overline { letter-spacing: 0.02em; }

/* 全大写必须加宽 */
.uppercase-label {
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* 按钮 */
button {
  letter-spacing: 0.03em;
}
```

### 关键提醒

- 始终使用 `em` 单位而非 `px`，确保字间距随字号等比缩放
- 负值 letter-spacing 在小字号上会导致文字粘连，仅用于大标题
- 中文正文一般不调整 letter-spacing，使用默认值即可
- 中文标题如需调整，范围在 `0.05em` ~ `0.15em` 之间加宽（与英文相反）

---

## 五、CSS 字体栈模板

### 模板 1：现代 Sans Serif 系统字体栈

```css
/* 当不加载自定义字体时使用，零 HTTP 请求，极致性能 */
body {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    'Noto Sans',
    'Noto Sans SC',    /* 中文 fallback */
    'PingFang SC',     /* macOS 中文 */
    'Microsoft YaHei', /* Windows 中文 */
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji';
}
```

### 模板 2：Inter + 中文 fallback

```css
/* 最流行的 UI 字体方案 */
body {
  font-family:
    'Inter',
    'Noto Sans SC',    /* 思源黑体 */
    'PingFang SC',     /* 苹方 */
    'Microsoft YaHei', /* 微软雅黑 */
    system-ui,
    -apple-system,
    sans-serif;
}
```

### 模板 3：衬线字体栈（编辑 / 阅读）

```css
body {
  font-family:
    'Lora',
    'Noto Serif SC',     /* 思源宋体 */
    'Songti SC',         /* macOS 宋体 */
    'SimSun',            /* Windows 宋体 */
    Georgia,
    'Times New Roman',
    serif;
}
```

### 模板 4：等宽字体栈（代码）

```css
code, pre {
  font-family:
    'JetBrains Mono',
    'Fira Code',
    'Source Code Pro',
    'Cascadia Code',
    'SF Mono',
    'Menlo',
    'Consolas',
    'DejaVu Sans Mono',
    monospace;
}
```

### 模板 5：霞鹜文楷 + 经典 Serif

```css
body {
  font-family:
    'LXGW WenKai',        /* 霞鹜文楷 */
    'EB Garamond',
    'Noto Serif SC',
    'Songti SC',
    'SimSun',
    serif;
}
```

### 模板 6：品牌标题 + 正文组合

```css
/* 标题 */
h1, h2, h3, h4, h5, h6 {
  font-family:
    'Montserrat',
    'Noto Sans SC',
    'PingFang SC',
    'Microsoft YaHei',
    sans-serif;
  font-weight: 700;
}

/* 正文 */
body {
  font-family:
    'Source Sans 3',
    'Noto Sans SC',
    'PingFang SC',
    'Microsoft YaHei',
    sans-serif;
  font-weight: 400;
}
```

### Google Fonts 加载最佳实践

```html
<!-- Preconnect 加速连接 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 只加载需要的字重，Variable Font 优先 -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- 中文字体建议使用 subset 减少体积 -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
```

```css
/* font-display: swap 确保字体加载前使用 fallback */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```

---

## 六、Tailwind CSS 配置示例

### Tailwind v4（CSS 优先配置）

```css
/* 在主 CSS 文件中 */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap");
@import "tailwindcss";

@theme {
  /* 字体族 */
  --font-sans: "Inter", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  --font-serif: "Lora", "Noto Serif SC", "Songti SC", "SimSun", Georgia, serif;
  --font-mono: "JetBrains Mono", "Fira Code", "Cascadia Code", "Consolas", monospace;
  --font-display: "Montserrat", "Noto Sans SC", sans-serif;
  --font-handwriting: "LXGW WenKai", "Caveat", cursive;

  /* Type Scale - Major Third (1.25) */
  --text-xs: 0.64rem;    /* 10.24px */
  --text-sm: 0.8rem;     /* 12.8px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.25rem;    /* 20px */
  --text-xl: 1.563rem;   /* 25px */
  --text-2xl: 1.953rem;  /* 31.25px */
  --text-3xl: 2.441rem;  /* 39.06px */
  --text-4xl: 3.052rem;  /* 48.83px */
  --text-5xl: 3.815rem;  /* 61.04px */
  --text-6xl: 4.768rem;  /* 76.29px */

  /* 行高 */
  --leading-none: 1;
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.6;
  --leading-relaxed: 1.75;
  --leading-loose: 2;

  /* 字间距 */
  --tracking-tighter: -0.025em;
  --tracking-tight: -0.015em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

### Tailwind v3（tailwind.config.js）

```js
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'Noto Sans SC',
          'PingFang SC',
          'Microsoft YaHei',
          ...defaultTheme.fontFamily.sans,
        ],
        serif: [
          'Lora',
          'Noto Serif SC',
          'Songti SC',
          'SimSun',
          ...defaultTheme.fontFamily.serif,
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Cascadia Code',
          ...defaultTheme.fontFamily.mono,
        ],
        display: ['Montserrat', 'Noto Sans SC', 'sans-serif'],
        handwriting: ['LXGW WenKai', 'Caveat', 'cursive'],
      },

      /* Type Scale - Major Third (1.25), base 16px */
      fontSize: {
        'xs':   ['0.64rem',  { lineHeight: '1.4' }],    /* 10.24px */
        'sm':   ['0.8rem',   { lineHeight: '1.4' }],    /* 12.8px */
        'base': ['1rem',     { lineHeight: '1.6' }],    /* 16px */
        'lg':   ['1.25rem',  { lineHeight: '1.6' }],    /* 20px */
        'xl':   ['1.563rem', { lineHeight: '1.5' }],    /* 25px */
        '2xl':  ['1.953rem', { lineHeight: '1.4' }],    /* 31.25px */
        '3xl':  ['2.441rem', { lineHeight: '1.3' }],    /* 39.06px */
        '4xl':  ['3.052rem', { lineHeight: '1.2' }],    /* 48.83px */
        '5xl':  ['3.815rem', { lineHeight: '1.1' }],    /* 61.04px */
        '6xl':  ['4.768rem', { lineHeight: '1.1' }],    /* 76.29px */
      },

      letterSpacing: {
        tighter: '-0.025em',
        tight:   '-0.015em',
        normal:  '0em',
        wide:    '0.025em',
        wider:   '0.05em',
        widest:  '0.1em',
      },

      lineHeight: {
        none:    '1',
        tight:   '1.1',
        snug:    '1.3',
        normal:  '1.6',
        relaxed: '1.75',
        loose:   '2',
      },
    },
  },
};
```

### Tailwind 排版工具类速查

```html
<!-- 标题 -->
<h1 class="font-display text-5xl font-bold leading-tight tracking-tight">
  Hero Title
</h1>

<!-- 副标题 -->
<h2 class="font-sans text-3xl font-semibold leading-snug tracking-tight">
  Section Heading
</h2>

<!-- 正文 -->
<p class="font-sans text-base leading-normal tracking-normal">
  Body text content here...
</p>

<!-- 小字 -->
<small class="font-sans text-sm leading-snug tracking-wide text-gray-500">
  Caption or helper text
</small>

<!-- 大写标签 -->
<span class="font-sans text-xs font-semibold uppercase tracking-widest">
  Category Label
</span>

<!-- 代码 -->
<code class="font-mono text-sm leading-normal">
  const x = 42;
</code>

<!-- 中文长文阅读 -->
<article class="font-serif text-lg leading-loose tracking-normal">
  这里是中文长文内容...
</article>

<!-- 手写风格装饰 -->
<span class="font-handwriting text-2xl leading-snug">
  温暖的手写文字
</span>
```

---

## 七、中文字体推荐与搭配

### 核心中文 Web 字体

| 字体名称 | 英文名 | 分类 | 来源 | 特点 |
|---------|--------|------|------|------|
| 思源黑体 | Noto Sans SC | 黑体 / Sans | [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+SC) | Google + Adobe 联合开发，覆盖全部 CJK 字符，7 字重，Web Font 首选 |
| 思源宋体 | Noto Serif SC | 宋体 / Serif | [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Serif+SC) | 同族衬线版本，7 字重，适合文学、出版类正文 |
| 霞鹜文楷 | LXGW WenKai | 楷体 | [GitHub](https://github.com/lxgw/LxgwWenKai) | 基于日本 Fontworks Klee One，楷体风格，文化感强 |
| 霞鹜文楷屏幕阅读版 | LXGW WenKai Screen | 楷体 | [GitHub](https://github.com/lxgw/LxgwWenKai) | 针对屏幕阅读优化的变体，笔画更清晰 |
| 霞鹜新晰黑 | LXGW Neo XiHei | 黑体 | [GitHub](https://github.com/lxgw/LxgwNeoXiHei) | 开源黑体，适合 UI |
| 得意黑 | Smiley Sans | 黑体 | [GitHub](https://github.com/atelier-anchor/smiley-sans) | 斜体黑体，个性鲜明，适合标题和品牌 |
| 未来荧黑 | Warp Gothic | 黑体 | [GitHub](https://github.com/welai/glow-sans) | 基于思源黑体改造，更现代的视觉风格 |

### 系统预装中文字体

| 系统 | 黑体 | 宋体 |
|------|------|------|
| macOS | PingFang SC（苹方）| Songti SC（宋体-简） |
| Windows | Microsoft YaHei（微软雅黑）| SimSun（中易宋体） |
| Linux | Noto Sans CJK SC | Noto Serif CJK SC |
| Android | Noto Sans SC | — |
| iOS | PingFang SC | — |

### 中英文搭配推荐

| 场景 | 英文标题 | 中文标题 | 英文正文 | 中文正文 |
|------|---------|---------|---------|---------|
| **科技产品 UI** | Inter Bold | Noto Sans SC Bold | Inter Regular | Noto Sans SC Regular |
| **企业官网** | Montserrat Bold | Noto Sans SC Bold | Source Sans 3 Regular | Noto Sans SC Regular |
| **文化 / 文学** | Playfair Display Bold | Noto Serif SC Bold | Lora Regular | Noto Serif SC Regular |
| **创意品牌** | Space Grotesk Bold | 得意黑 | Inter Regular | Noto Sans SC Regular |
| **教育平台** | Merriweather Bold | LXGW WenKai Bold | Open Sans Regular | LXGW WenKai Regular |
| **古风 / 传统** | EB Garamond Bold | LXGW WenKai Bold | EB Garamond Regular | LXGW WenKai Regular |
| **新闻媒体** | Roboto Condensed Bold | Noto Sans SC Bold | Roboto Regular | Noto Sans SC Regular |

### 中文 Web Font 加载优化

```html
<!-- 思源黑体 via Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">

<!-- 思源宋体 via Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap" rel="stylesheet">

<!-- 霞鹜文楷 via CDN (分包加载，大幅减少首屏体积) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-web@latest/style.css">

<!-- 或通过 npm 安装 -->
<!-- npm install lxgw-wenkai-web -->
```

```css
/* 使用 font-display: swap 确保中文字体加载前有 fallback */
@font-face {
  font-family: 'Noto Sans SC';
  src: url('/fonts/NotoSansSC-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
  unicode-range: U+4E00-9FFF, U+3400-4DBF, U+F900-FAFF; /* CJK 范围 */
}
```

### 中文排版特殊注意事项

1. **字重映射**：中文字体的 "Regular" 通常对应英文 400，"Bold" 对应 700。但中文字体因笔画复杂度，细字重（100-300）的可读性远低于英文，正文至少使用 Regular (400)。
2. **字号下限**：中文字符结构复杂，最小字号建议 12px（0.75rem），低于此值笔画会模糊不清。
3. **中英混排间距**：中英文之间建议添加 1/4 em 空隙（可通过 CSS `word-spacing` 或 JavaScript 自动插入）。
4. **行宽控制**：中文正文每行字数推荐 25-35 个字符（约 `max-width: 42em`），超过 40 字阅读疲劳显著增加。
5. **标点挤压**：连续标点（如 `。"` `，"`）应启用标点挤压（CSS `font-feature-settings: "halt"`）或使用支持 OpenType 的字体。

---

## 八、垂直韵律与排版网格

### 基线网格（Baseline Grid）

建立一致的垂直韵律，让所有文本元素在同一网格上对齐：

```css
:root {
  --grid-unit: 4px;  /* 基础网格单位 */
  --baseline: 8px;   /* 基线间距 = 2 * grid-unit */
}

/* 正文行高对齐到基线网格 */
/* 16px * 1.5 = 24px = 3 * 8px baseline */
body {
  font-size: 1rem;
  line-height: 1.5; /* 24px, 3 baseline units */
}

/* 间距使用基线倍数 */
p {
  margin-bottom: 24px; /* 3 baseline units */
}

h1 {
  font-size: 3.052rem; /* 48.83px */
  line-height: 1.23;   /* ~60px ≈ 7.5 baseline units */
  margin-bottom: 16px; /* 2 baseline units */
}

h2 {
  font-size: 1.953rem; /* 31.25px */
  line-height: 1.28;   /* ~40px = 5 baseline units */
  margin-bottom: 16px;
}
```

### 行宽（Measure）参考

| 内容类型 | 推荐字符数/行 | CSS 参考宽度 |
|---------|-------------|-------------|
| 英文正文 | 50-75 字符 | `max-width: 65ch` |
| 中文正文 | 25-35 字符 | `max-width: 42em` |
| 侧边栏短文 | 20-40 字符 | `max-width: 30ch` |
| 超宽标题 | 不限 | `max-width: 20ch`（自然换行） |

---

## 九、实用速查表

### 字重命名对照

| 数值 | 名称 | 典型用途 |
|------|------|---------|
| 100 | Thin | 装饰性大标题 |
| 200 | ExtraLight | 装饰性标题 |
| 300 | Light | 副标题、引用 |
| 400 | **Regular** | **正文、默认** |
| 500 | Medium | 强调文本、小标题 |
| 600 | **SemiBold** | **小标题、导航** |
| 700 | **Bold** | **标题** |
| 800 | ExtraBold | Hero 标题 |
| 900 | Black | Display / 品牌标题 |

### 排版元素对照表

| 元素 | 字号 Token | 字重 | 行高 | 字间距 | Tailwind 类 |
|------|-----------|------|------|--------|------------|
| Display Title | `5xl` - `6xl` | 700-900 | 1.1 | -0.025em | `text-5xl font-bold leading-tight tracking-tighter` |
| H1 | `4xl` | 700 | 1.1 | -0.02em | `text-4xl font-bold leading-tight tracking-tight` |
| H2 | `3xl` | 600-700 | 1.2 | -0.015em | `text-3xl font-semibold leading-snug tracking-tight` |
| H3 | `2xl` | 600 | 1.25 | -0.01em | `text-2xl font-semibold leading-snug` |
| H4 | `xl` | 500-600 | 1.3 | 0 | `text-xl font-medium leading-snug` |
| H5 | `lg` | 500 | 1.3 | 0 | `text-lg font-medium leading-snug` |
| Body | `base` | 400 | 1.6 | 0 | `text-base leading-normal` |
| Body Large | `lg` | 400 | 1.6 | 0 | `text-lg leading-normal` |
| Small / Caption | `sm` | 400 | 1.4 | 0.015em | `text-sm leading-snug tracking-wide` |
| Overline | `xs` | 600 | 1.4 | 0.08em | `text-xs font-semibold uppercase tracking-widest` |
| Button | `sm` - `base` | 500-600 | 1 | 0.03em | `text-sm font-medium leading-none tracking-wide` |
| Code | `sm` | 400 | 1.5 | 0 | `font-mono text-sm leading-normal` |

### 常用字体对分类索引

**Geometric Sans（几何无衬线）**
Inter, Montserrat, Poppins, Albert Sans, DM Sans, Sora, Manrope

**Humanist Sans（人文无衬线）**
Source Sans 3, Open Sans, Lato, Nunito, Karla, Barlow, Roboto

**Transitional Serif（过渡衬线）**
Lora, Merriweather, Libre Baskerville, Bitter

**Old-Style Serif（旧式衬线）**
EB Garamond, Playfair Display

**Modern Serif（现代衬线）**
DM Serif Display

**Slab Serif（粗衬线）**
Arvo, Roboto Slab, IBM Plex Serif

**Condensed（窄体）**
Roboto Condensed, Oswald, Bebas Neue, Barlow Condensed

**Monospaced（等宽）**
JetBrains Mono, Fira Code, Space Mono, IBM Plex Mono, Source Code Pro

**Script / Handwritten（手写体）**
Caveat, Dancing Script, Courgette, Sacramento

**Display（展示体）**
Fraunces, Playfair Display (large sizes), DM Serif Display

---

## 附录：字体加载性能检查清单

- [ ] 使用 WOFF2 格式（压缩率最高）
- [ ] 添加 `font-display: swap`（避免 FOIT）
- [ ] Preconnect Google Fonts CDN
- [ ] 仅加载需要的字重（通常 Regular + Medium + Bold 三个即可）
- [ ] 中文字体使用分包加载（subset）或 CDN
- [ ] 设置合理的 font-family fallback stack
- [ ] Variable Font 优先（单文件覆盖多字重）
- [ ] 测试 CLS（Cumulative Layout Shift）确保字体切换不跳动
- [ ] 关键字体使用 `<link rel="preload">` 预加载
