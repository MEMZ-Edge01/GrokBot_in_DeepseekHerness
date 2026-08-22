# GrokBot in DeepseekHarness 🐾

> 把 [LaoA-GrokBot](https://github.com/zhulin025/LaoA-GrokBot) 的 GrokBot 宠物带进 DeepSeek Harness Web GUI：可换装、可甩飞、带物理反弹的桌面宠物插件（动态 Cordis 插件）。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Platform](https://img.shields.io/badge/Platform-DeepSeek%20Harness%20Web-5b7fe5)

---

## ✨ 功能特性

### 原版 GrokBot 渲染（严格移植自 LaoA-GrokBot，MIT）
- **真实表情系统**：官方 25 套表情数据中的 6 组（待机 / 思考 / 工作 / 开心 / 倾听 / 惊讶），眼睛为官方点环多边形，**逐行移植** `app.js` 的帧循环：
  - 3D 眼球透视数学（质心 → 经度 → 深度 → translate/scale）
  - 👀 视线跟随鼠标（原版 `gazeX/gazeY` 公式）
  - 😉 点击立即眨眼 + 每 4.6 秒随机眨眼（`BLINK` 表）
  - 🧠 表情弹簧变形（`velocity += (-14v − 49(morph−1))·dt` 弹簧物理）
  - 状态表情池轮换（`POOLS` + `EXPR_CADENCE`）
- **原版状态动画**：bounce 果冻跳 / tilt 歪头 / scan 眼球扫动 / turn / pulse / glitch 毛刺（keyframes 逐值复制）
- **严格换装系统**（与原版 `customizer.js` / `enhancements.js` 一致）：
  - 🎨 10 种颜色（官方 hex + `fill .22s` 过渡 + `--swatch` 圆形色板 UI）
  - 🔷 8 种形状（官方 path 数据，缩略图带白色眼睛）
  - 🖐 4 件身体部件：双手 ⌁ / 双脚 ⌄ / 尾巴 〜 / 天线 ⌃（**多选**）
  - 🎩 4 件趣味配饰：草帽 ◒ / 眼镜 ◎ / 蝴蝶结 ⋈ / 披风 ◢（**多选叠穿**，三段式草帽、带镜腿眼镜等细节与原版逐字一致）

### 桌面宠物能力
- 🖱 **拖拽移动**（位置持久化）+ 右键换装面板 + 设置页入口（设置 → 桌宠外观，带 150px 实时预览）
- 🏀 **惯性物理**：慢速拖放原地落下；快速甩出按释放速度惯性滑行
  - 动态模糊（随速度 0~4px）+ 双残影拖尾
  - 撞屏幕边缘 / 对话输入框 AABB 反弹（恢复系数 0.7 + 弹跳音效 + 挤压动画）
  - 飞行中可空中接住
- 💬 **进度气泡**：当前工具、请求次数、步数、子代理数、用时、滚动进度条
- 🔊 **合成音效**：每次模型请求轻响、工具滴答、回合开始/结束和弦、甩出/弹跳音（WebAudio 合成，无外部资源）
- 🔔 **Windows 通知**：通过 Chrome Notifications API，请求开始/完成时发送原生桌面通知（需点 🔕 授权）
- 🐾 隐藏为右下角爪印按钮；点击互动爱心特效；所有偏好持久化在 `localStorage`

---

## 📦 快速安装

> 本插件是 **DeepSeek Harness 的动态 Cordis 插件**：通过 Web GUI 对话即可安装，无需构建或修改 harness 源码。

### 方式一：一条龙安装（推荐）

1. 下载 Release 中的 `dsh-grokbot-pet-vX.Y.Z.zip` 并解压
2. 在解压目录运行 `install.ps1`（把表情数据复制到 DSH 工作目录，并生成安装指令文件）：
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\install.ps1
   ```
3. 打开工作目录下的 `install-prompt.md`，把里面的内容发给 DeepSeek Harness 的对话
4. 在对话中的 **cordis_run 卡片**上点击批准（建议双击 ✓✓ 覆盖后续版本）
5. 桌宠出现在右下角 🎉

### 方式二：手动安装

1. 把 `plugin/data/grokbot-exprs.json` 复制为 DSH 进程工作目录下的 `.dsh-pet-data.json`（或 `plugin/data/grokbot-exprs.json` 相对路径可访问的位置，见 [数据查找顺序](#数据查找顺序)）
2. 在 DSH 对话中让助手执行：
   - `cordis_define`：`idPrefix` 用 `petui`，`code.host` = `plugin/host.js` 的内容，`code.client` = `plugin/client.js` 的内容
   - `cordis_run`（mode `run`）
3. 批准运行卡片，完成

---

## 🕹 使用说明

| 操作 | 效果 |
| --- | --- |
| 左键拖动 | 移动宠物（慢放原地落下） |
| 快速甩出 | 惯性飞出 + 动态模糊 + 残影；撞屏幕边缘 / 输入框反弹 |
| 飞行中按住 | 空中接住 |
| 左键单击 | 爱心 + 互动音 + 开关进度气泡 |
| 右键 | 换装面板（颜色 / 形状 / 身体部件 / 趣味配饰，多选叠穿，实时生效） |
| 悬停宠物 | 显示控制条：🔊 音效开关 · 🔔 通知授权 · 👋 隐藏 |
| 隐藏后 | 右下角 🐾 恢复 |
| 设置 → 桌宠外观 | 完整设置页 + 150px 实时预览 |
| 鼠标在宠物周围移动 | 眼球跟随视线 |

### 物理手感参数（在 `plugin/client.js` 的 `onPointerUp` / `startFlight` 中调整）

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| 甩出阈值 | 120 px/s | 低于此速度原地放下 |
| 初速度增益 | ×1.35 | 甩出力度 |
| 速度上限 | 3800 px/s | 初始速度封顶 |
| 阻尼 | 0.9/s | 指数阻尼系数（越小滑得越远） |
| 反弹系数 | 0.7 | 撞边/输入框后的速度保留 |
| 静止判定 | 100ms | 松手前停止移动超过此时长视为原地放下 |
| 采样窗口 | 120ms | 释放速度估计窗口 |

---

## 📁 文件结构

```
GrokBot_in_DeepseekHerness/
├── README.md                      # 本文件
├── LICENSE                        # MIT
├── THIRD_PARTY_NOTICES.md         # 第三方数据来源与署名
├── install.ps1                    # 安装脚本（复制数据 + 生成安装指令）
└── plugin/
    ├── host.js                    # Host 半部分：请求/工具/状态事件监听 + 数据服务 RPC
    ├── client.js                  # Client 半部分：GrokBot 渲染器 + 物理 + 换装 UI
    └── data/
        └── grokbot-exprs.json     # 表情环数据（由 LaoA-GrokBot original-data.js 提取）
```

### 数据查找顺序

Host 半部分按以下顺序查找表情数据文件（`plugin/host.js` 的 `candidates` 列表，可自行追加）：

1. `.dsh-pet-data.json`（DSH 进程工作目录）
2. `plugin/data/grokbot-exprs.json`（进程工作目录相对路径）
3. 开发者工作区绝对路径（仅开发环境）

---

## 📜 数据来源与许可

- 本项目代码：**MIT License**（见 [LICENSE](LICENSE)）
- 宠物造型、表情数据、形状/颜色/部件/配饰 SVG 均来自 [zhulin025/LaoA-GrokBot](https://github.com/zhulin025/LaoA-GrokBot)（作者：老A玩AI，MIT License），严格移植其原版渲染代码。完整署名见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
- 表情数据文件由官方 `original-data.js` 提取生成，未做修改（数值保留两位小数）。

---

## ❓ 常见问题

**Q：宠物不显示眼睛？**
A：表情数据文件未被 Host 找到。运行 `install.ps1` 或在 `plugin/host.js` 的 `candidates` 中追加你环境下的正确路径。

**Q：音效不响？**
A：浏览器自动播放策略要求先有一次用户交互。点击页面任意位置（或宠物本身）后，音效即会解锁；也可用控制条 🔊 开关。

**Q：通知不出现？**
A：点击宠物控制条上的 🔕，在 Chrome 弹窗中允许通知。若之前拒绝过，需在地址栏站点设置中重新允许。

**Q：插件会持久化吗？**
A：动态 Cordis 插件是会话级、进程内的：harness 重启后需按安装步骤重新运行（外观与位置偏好保存在 `localStorage`，不会丢失）。

**Q：想改宠物尺寸？**
A：调整 `plugin/client.js` 顶部 STYLE 中的 `.dsh-pet-body` / `.dsh-pet-box` 尺寸与位置偏移（残影 `.dsh-pet-ghost` 需同步）。

---

## 🚧 版本历史

- **v1.0.0**：GrokBot 严格移植渲染 + 换装系统（10 色 / 8 形状 / 4 部件 / 4 配饰多选）+ 进度气泡 + 音效 + Chrome→Windows 通知 + 惯性物理（动态模糊 / 残影 / 双碰撞反弹）+ 右键与设置页双入口。

## 🤝 贡献

欢迎 Issue / PR。注意 main 分支已开启保护：请通过分支 + Pull Request 提交变更。

---

*GrokBot 造型 © 2026 老A玩AI（LaoA-GrokBot，MIT）· 插件实现 © 2026 MEMZ-Edge01（MIT）*
