# skills

Claude Code 自定义 skills 集合。

## photoshop-design

通过 Photoshop MCP(`@alisaitteke/photoshop-mcp`)用 ExtendScript 脚本化生成/编辑 PSD 设计稿。含实战避坑经验:脚本超时拆批、图标字体空码位排查、原生渐变、精确居中、图层遮挡顺序,以及换电脑时的 MCP 配置迁移指南。

### 别人安装

复制到 `~/.claude/skills/` 即可:

```bash
cp -r photoshop-design ~/.claude/skills/
```

重开 Claude Code 后,PS 相关任务会自动加载,或用 `/photoshop-design` 手动唤起。

## ui-sites

UI/UX 离线设计知识库。基于 55 个顶级设计资源网站预提取的设计知识,覆盖配色、字体排版、布局、组件、动效、设计系统、Landing Page、移动端、Logo 设计 9 大主题,通过 `_index` 两层加载按需读取,无需联网即可输出专业设计方案和代码。

> 独立仓库: [silence94108/ui-sites](https://github.com/silence94108/ui-sites),此处为快照收录(不含 `.git`/`.history` 等仓库元数据)。

---

## 本机维护(重要,别忘)

本机不是"复制一份到 C 盘",而是 **junction 链接**——C 盘入口指向本仓库真身,改仓库 = 改生效的 skill。

### 架构

```
真身(改这里)         D:\repos\skills\
      ↑ junction 透明穿透
C 盘生效入口          C:\Users\<用户名>\.claude\skills\photoshop-design
      ↑ git push
远程备份              github.com/silence94108/skills (main)
```

### 改 skill 的标准流程

```bash
cd D:/repos/skills
# 直接编辑 photoshop-design/ 下的 md,C 盘会透明同步、Claude 立即生效
git add -A
git commit -m "更新说明"
git push
```

### ⚠️ 注意

- **别删/别挪 `D:\repos\skills`** —— 它是真身,删了 C 盘 junction 就断、skill 失效。
- 万一链接断了,用 PowerShell 重建(注意 **junction 不是快捷方式**,别用 .lnk):
  ```powershell
  New-Item -ItemType Junction `
    -Path "$env:USERPROFILE\.claude\skills\photoshop-design" `
    -Target "D:\repos\skills\photoshop-design"
  ```
- 提交人保持本人身份,commit message 不加任何 AI 署名。
