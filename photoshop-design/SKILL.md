---
name: photoshop-design
description: 通过 Photoshop MCP(@alisaitteke/photoshop-mcp)用 ExtendScript 脚本化生成/编辑 PSD 设计稿。当用户要求"用 PS 做设计稿""生成网页/海报/Banner 的 PSD""操作 Photoshop 图层/文字/图标/渐变"或需要把设计稿导出 JPG/PNG 时使用。内含验证过的避坑经验:脚本超时拆批、图标字体空码位排查、原生渐变、精确居中、图层遮挡顺序,以及换电脑时的 MCP 配置迁移指南。
---

# Photoshop MCP 设计稿工作流

通过 `@alisaitteke/photoshop-mcp` 遥控本机已打开的 Photoshop,用 ExtendScript(JSX)脚本化搭建设计稿。本 skill 沉淀了实战验证过的可靠做法和避坑经验。

## 开工前检查(每次必做)

1. **确认连接**:先 `photoshop_ping`,再 `photoshop_get_state` 看有没有活动文档。
2. **PS 必须已打开**——MCP 是遥控运行中的 PS,不会帮你启动它。没连上先让用户手动打开 Photoshop。
3. **字体探测**:用到中文字体先 `photoshop_list_fonts` 确认 PostScript 名(如微软雅黑是 `MicrosoftYaHei` / `MicrosoftYaHei-Bold`)。

## 设计稿 vs 参考图(先分清再动手)

- 用户说"按设计图还原/1:1/按稿做" → **严格还原**,颜色间距字号照图来,不自作主张优化。
- 用户说"参考/类似风格/差不多" → 可提取意图后自由发挥。
- 给了图没说性质 → **先问**是严格还原还是参考风格。

## 五大避坑经验(核心价值)

### 1. 脚本超时 → 拆批执行
`photoshop_execute_script` 单次操作过多(经验值 >20 个图层操作)会 `Script execution timeout`。
- **关键认知**:报超时 ≠ 没执行完!PS 常常是**执行成功但响应慢**,数据其实是全的。先 `photoshop_get_layers` 核实,别急着重跑导致重复。
- **做法**:复杂页面按区块拆,每次画 2 个卡片 / 一个区块。宁可多几次调用,不要一次塞满。

### 2. 渐变 → 用原生渐变工具,别手写渐变形状图层
- ❌ 手写 `contentLayer` 内嵌渐变描述符 → 频繁报"命令不可用/非法参数"。
- ❌ 图层样式渐变叠加(`Lefx`/`GrFl`)→ 同样易报错。
- ❌ 用几十条纯色竖条模拟渐变 → 又慢又超时,还有色带。
- ✅ **正解**:像素层 + 对选区执行原生渐变工具(`executeAction(charIDToTypeID("Grdn"), ...)`),零色带、不超时。见 `scripts-reference.md` 的 `nativeGradient`。

### 3. 图标字体 → 画布探针法验证码位,别靠记忆
- **坑**:Segoe MDL2 Assets 图标码位**因字体版本而异**,同名图标(如"时钟")码位可能不同,有些码位在某台机器上就是**空的**(如 `0xE917` 在 PS CC 2019 渲染成空方框)。
- **正解:画布探针法**——把一批候选码位画到画布上,`photoshop_execute_script` + 裁切导出 JPG,用 Read 工具**肉眼确认**哪些有效。眼见为实,比查文档快且准。
- **小字号会触发 fallback**:同一码位 40px 正常、22px 变空框。**图标字号建议 ≥24px**。
- 已验证可用的码位见 `icon-codes.md`。

### 4. 图标/元素居中 → 读 bounds 再 translate
- **坑**:文字图层 `textItem.position` 定的是**左上基线**,不是中心,直接放会偏左上。
- **正解**:画完读 `layer.bounds` 算实际宽高,再 `layer.translate()` 到目标中心。见 `scripts-reference.md` 的 `iconCentered`。

### 5. 图层顺序 = 视觉遮挡
- **坑**:背景色块后建会盖住先建的内容(典型:导航栏文字被后建的 Hero 渐变盖住看不见)。
- **正解**:背景/底层色块建完立刻 `layer.move(refLayer, ElementPlacement.PLACEAFTER)` 沉到目标层下方。文字永远在最上层。
- **额外坑**:整块背景的覆盖范围要算准,别让顶部/边缘露出下面的白底(导航区被白底吞就是这么来的)。

## 可靠的原子能力(优先用 MCP 封装工具)

手写 JSX 建蒙版(`Mk Chnl Msk`)易报错,**优先用封装好的 MCP 工具**:
- 圆角图片:`photoshop_select_rectangle` → `photoshop_execute_script` 里 `doc.selection.smooth(半径)` → `photoshop_create_layer_mask`。
- 置入图片:`photoshop_place_image`(智能对象)→ `photoshop_scale_layer` → `photoshop_move_layer`。
- 形状色块:见 `scripts-reference.md` 的 `solidShape`(矢量圆角矩形,`contentLayer`/`SOLIDFILL`,可无损缩放)。

## 标准交付流程

1. 分区块搭建(背景→内容→文字→图标),每块完成后 `photoshop_get_preview` 或裁切导出局部验证。
2. 全页 `photoshop_get_preview` 通检,肉眼找问题(遮挡、错位、空图标)。
3. 清理临时探针/裁切图层和临时 JPG。
4. 存双份:`photoshop_save_document` PSD(源文件)+ JPEG(预览)。

## 关联文件(按需读取)

- `scripts-reference.md` — 复用函数库:`solidShape`(矢量形状)、`nativeGradient`(原生渐变)、`iconCentered`(居中图标)、`txt`(文字)。搭建前先读。
- `icon-codes.md` — 验证过的 Segoe MDL2 图标码位表。用图标前查。
- `setup-migration.md` — 换电脑时 PS MCP 的配置迁移指南。用户问"换电脑怎么配"时读。
