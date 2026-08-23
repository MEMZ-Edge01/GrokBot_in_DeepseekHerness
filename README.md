# GrokBot in DeepseekHarness 🐾

> 把 [LaoA-GrokBot](https://github.com/zhulin025/LaoA-GrokBot) 的 GrokBot 宠物带进 DeepSeek Harness Web GUI：可换装、可甩飞、带物理反弹的桌面宠物插件。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Platform](https://img.shields.io/badge/Platform-DeepSeek%20Harness%20Web-5b7fe5)

---

## 两种安装方式

| | **常驻插件**（推荐） | **动态插件** |
|---|---|---|
| 生效方式 | 随 `dsh web` 启动自动加载 | 需在对话中手动安装 |
| 重启后 | ✅ 自动存在 | ❌ 需重新安装 |
| 实现方式 | 纯 Client 包，读取会话快照 | 动态 Cordis 插件，Host 事件监听 |
| 安装难度 | 需改 harness 源码 + 重新构建 | 对话中一键安装 |

---

## 方式一：常驻插件（推荐）

### 快速安装

```bash
# 1. 克隆本仓库
git clone https://github.com/MEMZ-Edge01/GrokBot_in_DeepseekHerness.git
cd GrokBot_in_DeepseekHerness

# 2. 运行安装脚本（自动复制包 + 注册组合 + 构建）
powershell -ExecutionPolicy Bypass -File .\resident\install-resident.ps1 \
  -HarnessRoot <你的 DeepSeek Harness 源码根目录>

# 3. 重启 harness → 桌宠自动出现在右下角
```

### 手动安装

1. 把 `resident/` 复制为 `<harness-root>/packages/client/ui-pet/`
2. 在 `<harness-root>/packages/bundle/web-app/cordis.patch.yml` 的 `insert` 块末尾添加：
   ```yaml
       - id: ui-pet
         name: '@deepseek-ai/dsh-client-ui-pet'
   ```
3. 在 harness 源码根目录运行：
   ```bash
   corepack pnpm install
   corepack pnpm --filter @deepseek-ai/dsh-client-ui-pet run bundle
   corepack pnpm run build:web
   ```
4. 重启 `dsh web` → 桌宠自动加载

---

## 方式二：动态插件（临时使用）

1. 解压 Release 中的 `dsh-grokbot-pet-dynamic-v*.zip`
2. 运行 `install.ps1`
3. 把生成的 `install-prompt.md` 发给 DeepSeek Harness 对话
4. 点击 cordis_run 卡片上的批准（建议双击 ✓✓）
5. 每次 harness 重启需重复以上步骤

---

## ✨ 功能特性

### 原版 GrokBot 渲染（严格移植自 LaoA-GrokBot，MIT）
- 6 组官方表达环（待机/思考/工作/开心/倾听/惊讶），原版眼睛多边形 + 3D 注视 + 眨眼 + 弹簧变形
- 原版状态动画：bounce 果冻跳 / tilt 歪头 / scan 眼球扫动 / glitch 毛刺
- 10 种颜色（官方 hex + 0.22s 过渡）、8 种形状（官方 SVG path）
- 4 件身体部件（双手/双脚/尾巴/天线）+ 4 件趣味配饰（草帽/眼镜/领结/披风）**多选叠穿**

### 桌面宠物能力
- 🖱 拖拽 + **惯性物理**（甩出带滑行/动态模糊/残影/碰撞反弹）
- 💬 进度气泡（工具名/请求次数/步数/用时/进度条）
- 🔊 WebAudio 合成音效（请求/工具/回合/弹跳音）
- 🔔 Chrome → Windows 桌面通知（需点 🔕 授权）
- 右键换装面板 + 设置 → 桌宠外观（带实时预览）

---

## 物理参数

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| 甩出阈值 | 120 px/s | 低于此速度原地放下 |
| 初速度增益 | ×1.35 | 甩出力度 |
| 阻尼 | 0.9/s | 越小滑越远 |
| 反弹系数 | 0.7 | 撞边/输入框速度保留 |

---

## 📁 文件结构

```
├── install.ps1 / plugin/       # 动态版（对话中安装，需每次重启后重装）
├── resident/                   # 常驻版源码（复制到 harness 源码内使用）
│   ├── install-resident.ps1    # 自动安装脚本
│   └── src/client/
│       ├── pet.tsx             # 主组件 + GrokbotFigure
│       ├── store.ts            # 会话快照 → 宠物状态桥接
│       ├── data.ts             # 颜色/形状/部件/配饰
│       ├── pet.module.css      # 样式
│       └── expressions.json    # 原版表情环数据（内嵌）
```

---

## 📜 许可

MIT License — 宠物造型数据来自 [LaoA-GrokBot](https://github.com/zhulin025/LaoA-GrokBot)（作者：老A玩AI，MIT）。完整署名见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

---

*v1.0.0 动态插件版 · v2.0.0 常驻插件版*
