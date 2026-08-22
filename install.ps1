# 安装脚本：把表情数据复制到 DSH 工作目录，并生成安装指令文件 install-prompt.md
param(
  # DSH 会话工作目录（默认当前目录）。DSH Web 启动后的会话工作区即为对应项目目录。
  [string]$Workspace = (Get-Location).Path
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$src = Join-Path $repoRoot 'plugin\data\grokbot-exprs.json'

if (-not (Test-Path $src)) {
  Write-Error "未找到表情数据：$src（请保持解压目录结构完整）"
}

$dst = Join-Path $Workspace '.dsh-pet-data.json'
Copy-Item $src $dst -Force
Write-Host "✓ 表情数据已复制到：$dst" -ForegroundColor Green

$promptPath = Join-Path $Workspace 'install-prompt.md'
$hostPath = Join-Path $repoRoot 'plugin\host.js'
$clientPath = Join-Path $repoRoot 'plugin\client.js'

$prompt = @"
# 安装 GrokBot 桌宠插件

请用 cordis_define 安装桌宠插件（plugin.kind = new，idPrefix 用 petui）：

- code.host = 读取文件 `$hostPath` 的完整内容（原样使用）
- code.client = 读取文件 `$clientPath` 的完整内容（原样使用）

然后对返回的 pluginId/packageId 执行 cordis_run（mode = run）。
运行时会在对话里出现审批卡片：请点击批准（建议双击 ✓✓ 覆盖后续版本）。
安装成功后，桌宠会出现在页面右下角；右键宠物或进入 设置 → 桌宠外观 可以换装。
"@

[System.IO.File]::WriteAllText($promptPath, $prompt, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "✓ 安装指令已生成：$promptPath" -ForegroundColor Green
Write-Host ""
Write-Host "下一步：打开 DeepSeek Harness Web GUI，把 $promptPath 的内容发给对话即可完成安装。"
