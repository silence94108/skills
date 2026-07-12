# skills

Claude Code 自定义 skills 集合。

## photoshop-design

通过 Photoshop MCP(`@alisaitteke/photoshop-mcp`)用 ExtendScript 脚本化生成/编辑 PSD 设计稿。含实战避坑经验:脚本超时拆批、图标字体空码位排查、原生渐变、精确居中、图层遮挡顺序,以及换电脑时的 MCP 配置迁移指南。

### 安装

复制到 `~/.claude/skills/` 即可:

```bash
cp -r photoshop-design ~/.claude/skills/
```

重开 Claude Code 后,PS 相关任务会自动加载,或用 `/photoshop-design` 手动唤起。
