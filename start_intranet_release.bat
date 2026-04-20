@echo off
setlocal
chcp 65001 >nul
title 同仁堂AI汇报 - 内网发布启动器

cd /d "%~dp0"

echo.
echo [1/4] 检查 Node 依赖...
if not exist "node_modules" (
  echo 未检测到 node_modules，正在安装依赖...
  call npm install
  if errorlevel 1 (
    echo 依赖安装失败，请检查网络后重试。
    pause
    exit /b 1
  )
)

echo.
echo [2/4] 生产构建中...
call npm run build
if errorlevel 1 (
  echo 构建失败，请先修复后再发布。
  pause
  exit /b 1
)

echo.
echo [3/4] 获取本机内网地址...
set "LOCAL_IP="
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /C:"IPv4" ^| findstr /V "127.0.0.1"') do (
  set "LOCAL_IP=%%A"
  goto :trim_ip
)

:trim_ip
if defined LOCAL_IP set "LOCAL_IP=%LOCAL_IP: =%"
if not defined LOCAL_IP set "LOCAL_IP=localhost"

echo.
echo [4/4] 启动生产服务...
echo 本机访问: http://localhost:3000
echo 内网访问: http://%LOCAL_IP%:3000
start "" "http://localhost:3000"

call npm run start -- --hostname 0.0.0.0 --port 3000

endlocal
