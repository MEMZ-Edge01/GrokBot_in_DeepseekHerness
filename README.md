# GrokBot in DeepseekHarness 🐾

> 把 [LaoA-GrokBot](https://github.com/zhulin025/LaoA-GrokBot) 的 GrokBot 宠物带进 DeepSeek Harness Web GUI：可换装、可甩飞、带物理反弹的**常驻**桌面宠物插件（随 `dsh web` 启动自动加载，重启不丢失）。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Platform](https://img.shields.io/badge/Platform-DeepSeek%20Harness%20Web-5b7fe5)

---

## 安装

### 方式一：让 DeepSeek Harness 自动安装（推荐）

把下面整段提示语**直接粘贴给 DeepSeek Harness 的对话**，它会自动下载、复制、注册组合并完成构建：

```
请安装 GrokBot 桌宠常驻插件，完成后报告结果。用 pwsh 工具执行命令，用 edit 工具修改文件。

1. pwsh — 下载并解压：
   Invoke-WebRequest -Uri 'https://github.com/MEMZ-Edge01/GrokBot_in_DeepseekHerness/releases/download/v2.0.0/dsh-grokbot-pet-resident-v2.0.0.zip' -OutFile "$env:TEMP\pet-resident.zip"; Expand-Archive "$env:TEMP\pet-resident.zip" "$env:TEMP\pet-resident" -Force
2. pwsh — 复制包（<harness源码根> = 含 packages\bundle\web-app\cordis.patch.yml 的目录）：
   Remove-Item "<harness源码根>\packages\client\ui-pet" -Recurse -Force -ErrorAction SilentlyContinue; Copy-Item "$env:TEMP\pet-resident\resident" "<harness源码根>\packages\client\ui-pet" -Recurse -Force
3. edit — 修改 cordis.patch.yml（若已含 "id: ui-pet" 则跳过），把：
       - id: ui-trajectory
         name: '@deepseek-ai/dsh-client-ui-trajectory'
   替换为：
       - id: ui-trajectory
         name: '@deepseek-ai/dsh-client-ui-trajectory'
       - id: ui-pet
         name: '@deepseek-ai/dsh-client-ui-pet'
4. pwsh — 在 harness 源码根依次执行，每步必须成功：
   corepack pnpm install
   corepack pnpm exec tsc -b packages/client/ui-pet/tsconfig.json
   corepack pnpm --filter @deepseek-ai/dsh-client-ui-pet run bundle
   corepack pnpm run build:web
5. 报告：重启 dsh web 并刷新浏览器（Ctrl+Shift+R）后，桌宠出现在对话输入框右上方。
```

### 方式二：手动安装

```bash
# 1. 克隆本仓库
git clone https://github.com/MEMZ-Edge01/GrokBot_in_DeepseekHerness.git

# 2. 一键脚本（自动复制包 + 注册组合 + 构建）
powershell -ExecutionPolicy Bypass -File .\resident\install-resident.ps1 \
  -HarnessRoot <你的 DeepSeek Harness 源码根目录>

# 3. 重启 dsh web → 桌宠自动出现在对话输入框右上方
```

不用脚本的手抄版（等价三步）：

1. 把 `resident/` 复制为 `<harness根>/packages/client/ui-pet/`；
2. 在 `<harness根>/packages/bundle/web-app/cordis.patch.yml` 的 `insert` 块中、`- id: ui-trajectory` 后添加：

   ```yaml
       - id: ui-pet
         name: '@deepseek-ai/dsh-client-ui-pet'
   ```

3. 在 harness 源码根目录依次运行：

   ```bash
   corepack pnpm install
   corepack pnpm exec tsc -b packages/client/ui-pet/tsconfig.json
   corepack pnpm --filter @deepseek-ai/dsh-client-ui-pet run bundle
   corepack pnpm run build:web
   ```

重启 `dsh web` 即生效。

---

## ✨ 功能特性

### 原版 GrokBot 渲染（严格移植自 LaoA-GrokBot，MIT）
- 6 组官方表情环（待机/思考/工作/开心/倾听/惊讶），原版眼睛多边形 + 3D 注视 + 眨眼 + 弹簧变形
- 原版状态动画：bounce 果冻跳 / tilt 歪头 / scan 眼球扫动 / glitch 毛刺
- 10 种颜色（官方 hex + 0.22s 过渡）、8 种形状（官方 SVG path）
- 4 件身体部件（双手/双脚/尾巴/天线）+ 4 件趣味配饰（草帽/眼镜/领结/披风）**多选叠穿**

### 桌面宠物能力
- 🖱 拖拽 + **惯性物理**（甩出带滑行/动态模糊/残影/碰撞反弹）
- 🎯 **速度匹配**：甩出速度 = 松手瞬间的鼠标速度；拖拽不足 24px 视为移动、不甩出
- 🎲 **6 种快捷动作**（开心/惊讶/倾听/思考/工作/待机）：点击随机触发，设置页可手动触发（带预览）
- 👀 眼睛跟随鼠标：「始终注视」默认开启（可在设置中关闭），鼠标不悬停也看向鼠标
- ✏️ 可在设置里修改宠物名字（气泡标题、提示文字、通知同步替换）
- 💰 每轮对话结束后自动弹出气泡，显示本轮用量（tokens + 估算金额）
- 💬 进度气泡（工具名/请求次数/步数/用时/进度条）
- 🔊 WebAudio 合成音效（请求/工具/回合/弹跳音）
- 🔔 Chrome → Windows 桌面通知（需点 🔕 授权）
- 右键换装面板 + 设置 → 桌宠外观（带实时预览）

---

## 物理参数

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| 甩出阈值 | 120 px/s | 低于此速度原地放下 |
| 距离判定 | 24 px | 拖拽距离不足视为移动，不甩出 |
| 初速度 | ×1.0 | 甩出速度 = 松手瞬间鼠标速度（无增益） |
| 阻尼 | 0.9/s | 越小滑越远 |
| 反弹系数 | 0.7 | 撞边/输入框速度保留 |

---

## 用量金额

每轮对话结束后，宠物气泡显示该轮 provider 上报的 tokens 用量与估算金额。估算采用 DeepSeek 官方定价近似值（元/百万 tokens）：输入 ¥2、输出 ¥8、缓存读 ¥0.5、缓存写 ¥2 —— 仅供参考展示，非精确账单。

---

## 📁 文件结构

```
├── resident/                   # 常驻插件源码（复制到 harness 源码内使用）
│   ├── install-resident.ps1    # 自动安装脚本
│   └── src/client/
│       ├── pet.tsx             # 主组件 + GrokbotFigure
│       ├── store.ts            # 会话快照 → 宠物状态桥接
│       ├── data.ts             # 颜色/形状/部件/配饰/设置
│       ├── pet.module.css      # 样式
│       └── expressions.json    # 原版表情环数据（内嵌）
```

---

## 📜 许可

MIT License — 宠物造型数据来自 [LaoA-GrokBot](https://github.com/zhulin025/LaoA-GrokBot)（作者：老A玩AI，MIT）。完整署名见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

---

*v2.0.0 常驻插件版*
