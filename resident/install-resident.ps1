# 常驻版安装脚本
# 用法：在 DeepSeek Harness 源码根目录运行
#   powershell -ExecutionPolicy Bypass -File .\resident\install-resident.ps1
#
# 前置条件：
#   1. 本仓库 clone 到本地
#   2. DeepSeek Harness 源码已 clone（任意路径）
#   3. Node.js >=22.19 + corepack 已安装
param(
  # DeepSeek Harness 源码根目录（默认从环境变量 DSH_HOME 推断，或提示输入）
  [string]$HarnessRoot
)

$ErrorActionPreference = 'Stop'

# ── 定位 harness 源码 ────────────────────────────────────────────────────
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$residentSrc = Join-Path $repoRoot 'resident'
if (-not (Test-Path "$residentSrc/src/client/pet.tsx")) {
  Write-Error "未找到 resident 源码目录：$residentSrc"
}

if ([string]::IsNullOrWhiteSpace($HarnessRoot)) {
  # 从数据文件推断
  $dataFile = Join-Path $repoRoot '.dsh-pet-data.json'
  if (Test-Path $dataFile) {
    # 假设 harness 在同级或上级目录
    $candidates = @(
      'E:\DeepSeek-Harness',
      'D:\Files\Codes\Projects\Deepseek Harness',
      (Split-Path $repoRoot -Parent)
    )
    foreach ($c in $candidates) {
      if (Test-Path "$c/packages/bundle/web-app/cordis.patch.yml") {
        $HarnessRoot = $c; break
      }
    }
  }
  if ([string]::IsNullOrWhiteSpace($HarnessRoot)) {
    $HarnessRoot = Read-Host "请输入 DeepSeek Harness 源码根目录路径"
  }
}

if (-not (Test-Path "$HarnessRoot/packages/bundle/web-app/cordis.patch.yml")) {
  Write-Error "无效的 harness 源码目录：$HarnessRoot（未找到 cordis.patch.yml）"
}

Write-Host "Harness 源码：$HarnessRoot" -ForegroundColor Cyan

# ── 1. 复制包目录 ────────────────────────────────────────────────────────
$destPkg = Join-Path $HarnessRoot 'packages/client/ui-pet'
if (Test-Path $destPkg) {
  Write-Host "⚠ $destPkg 已存在，跳过复制（如需重装请先删除该目录）" -ForegroundColor Yellow
} else {
  Copy-Item $residentSrc $destPkg -Recurse -Force
  Write-Host "✓ 已复制 resident → $destPkg" -ForegroundColor Green
}

# ── 2. 注册组合行（幂等） ──────────────────────────────────────────────────
$patchFile = Join-Path $HarnessRoot 'packages/bundle/web-app/cordis.patch.yml'
$patchContent = Get-Content $patchFile -Raw
if ($patchContent -match 'id: ui-pet') {
  Write-Host "✓ 组合行已存在（cordis.patch.yml 含 ui-pet）" -ForegroundColor Green
} else {
  $needle = "- id: ui-trajectory"
  if ($patchContent -notmatch [regex]::Escape($needle)) {
    Write-Error "未找到插入点（ui-trajectory 行），请手动在 cordis.patch.yml 的 insert 块末尾添加 ui-pet 行"
  }
  $uiPetRow = @"

    - id: ui-pet
      name: '@deepseek-ai/dsh-client-ui-pet'
      # GrokBot 桌宠：纯客户端，从会话快照驱动状态，无 Host 依赖
"@
  $patchContent = $patchContent -replace [regex]::Escape($needle), "$needle$uiPetRow"
  [System.IO.File]::WriteAllText($patchFile, $patchContent, (New-Object System.Text.UTF8Encoding($false)))
  Write-Host "✓ 已在 cordis.patch.yml 注册 ui-pet" -ForegroundColor Green
}

# ── 3. 注册依赖（web-app package.json，loader 从 profile 解析必需） ────────
$webAppPkg = Join-Path $HarnessRoot 'packages/bundle/web-app/package.json'
if (-not (Test-Path $webAppPkg)) {
  Write-Error "未找到 packages/bundle/web-app/package.json，无法注册依赖"
}
$webAppContent = Get-Content $webAppPkg -Raw
if ($webAppContent -match 'dsh-client-ui-pet') {
  Write-Host "✓ 依赖行已存在（web-app/package.json 含 ui-pet）" -ForegroundColor Green
} else {
  $depAnchor = '    "@deepseek-ai/dsh-client-ui-permission-presets": "workspace:^",'
  if ($webAppContent -notmatch [regex]::Escape($depAnchor)) {
    Write-Error "未找到依赖插入锚点（permission-presets 行），请手动在 web-app/package.json 的 dependencies 中添加 @deepseek-ai/dsh-client-ui-pet"
  }
  $depInsert = $depAnchor + "`n" + '    "@deepseek-ai/dsh-client-ui-pet": "workspace:^",'
  $webAppContent = $webAppContent -replace [regex]::Escape($depAnchor), $depInsert
  [System.IO.File]::WriteAllText($webAppPkg, $webAppContent, (New-Object System.Text.UTF8Encoding($false)))
  Write-Host "✓ 已在 web-app/package.json 注册依赖（loader 解析必需）" -ForegroundColor Green
}

# ── 4. 安装依赖 + 构建 ──────────────────────────────────────────────────
Write-Host "`n─ 安装依赖 ─" -ForegroundColor Cyan
Push-Location $HarnessRoot
& corepack pnpm install 2>&1 | Select-Object -Last 5

Write-Host "`n─ 构建 ui-pet 包 ─" -ForegroundColor Cyan
& corepack pnpm exec tsc -b packages/client/ui-pet/tsconfig.json 2>&1 | Select-Object -Last 5
& corepack pnpm --filter @deepseek-ai/dsh-client-ui-pet run bundle 2>&1 | Select-Object -Last 8

Write-Host "`n─ 构建前端产物 ─" -ForegroundColor Cyan
& corepack pnpm run build:web 2>&1 | Select-Object -Last 5
Pop-Location

Write-Host "`n✅ 常驻桌宠插件安装完成！" -ForegroundColor Green
Write-Host "下一步：重启 dsh web 即可生效。桌宠会随 harness 启动自动加载，重启不丢失。" -ForegroundColor Yellow
Write-Host "外观/位置等偏好保存在浏览器 localStorage 中，重启不影响。" -ForegroundColor Yellow
