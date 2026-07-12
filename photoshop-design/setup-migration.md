# PS MCP 换电脑配置迁移指南

## 这个 MCP 是什么

包名:`@alisaitteke/photoshop-mcp`(通过 npx 运行),遥控本机已打开的 Photoshop 做脚本化操作。

## 参考配置(Windows,来自可用机器)

位置:`C:\Users\<用户名>\.claude.json` 的 `mcpServers` 段。

```json
"photoshop": {
  "type": "stdio",
  "command": "cmd",
  "args": ["/c", "npx", "-y", "@alisaitteke/photoshop-mcp"],
  "env": {
    "PHOTOSHOP_PATH": "D:\\Program Files\\Adobe Photoshop CC 2019\\Photoshop.exe",
    "ANALYTICS_DISABLED": "1",
    "TEMP": "D:\\ps-mcp-tmp",
    "TMP": "D:\\ps-mcp-tmp"
  }
}
```

## 换电脑三步

### 1. 装前置
- **Node.js** LTS(nodejs.org)——`npx` 依赖它。
- **Adobe Photoshop** 桌面版(CC 2019+),需支持 ExtendScript。绿色版可能不行。

### 2. 改路径(只改这两处,其余照抄)
| 字段 | 怎么取值 |
|------|---------|
| `PHOTOSHOP_PATH` | 右键 PS 快捷方式→属性→"目标"里的 exe 路径。JSON 里反斜杠写成 `\\` |
| `TEMP`/`TMP` | 换成新机存在的临时目录(如 `C:\\ps-mcp-tmp`),**先手动建好这个文件夹** |

### 3. 写入配置(二选一)

**命令行法(推荐,不易写坏 JSON):**
```bash
claude mcp add photoshop --scope user \
  --env PHOTOSHOP_PATH="C:\Program Files\Adobe\Adobe Photoshop 2024\Photoshop.exe" \
  --env ANALYTICS_DISABLED=1 \
  --env TEMP="C:\ps-mcp-tmp" \
  --env TMP="C:\ps-mcp-tmp" \
  -- cmd /c npx -y @alisaitteke/photoshop-mcp
```

**手动法:** 编辑 `~/.claude.json`,把上面 JSON 段塞进 `mcpServers`。

## macOS 差异(不能照抄 Windows)

- 去掉 `cmd /c`:`command` 直接用 `npx`,`args` 为 `["-y","@alisaitteke/photoshop-mcp"]`。
- `PHOTOSHOP_PATH` 改成 `/Applications/Adobe Photoshop 2024/Adobe Photoshop 2024.app/...` 形式。
- `TEMP`/`TMP` 用 `/tmp/ps-mcp-tmp` 之类。

## 三个易踩坑

1. **首次 npx 会联网下包**,第一次启动慢几十秒正常,别以为坏了。
2. **PS 必须先手动打开**——MCP 只遥控运行中的 PS,不会启动它。
3. **验证**:`claude` 启动后跑 `photoshop_ping`,返回 "Successfully connected" 即成功。

## 排查

- ping 失败 → 查 PS 是否已开、`PHOTOSHOP_PATH` 是否对、Node 是否装好。
- 脚本报错乱码 → 多为编码问题,不影响功能,看 `photoshop_get_state` 确认实际状态。
