#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="/home/trt-wzj/tongrentang-ai-report"
PORT="3000"
URL="http://127.0.0.1:${PORT}/ai-mopai-huibao"
LOG_FILE="${PROJECT_DIR}/.ai-report-dev.log"

cd "${PROJECT_DIR}"

# If this project's dev server is not running, start it.
if ! ss -ltnp 2>/dev/null | awk -v p=":${PORT}" '$0 ~ p && $0 ~ /next-server/ {found=1} END {exit found?0:1}'; then
  nohup npm run dev > "${LOG_FILE}" 2>&1 &
fi

# Wait for server ready (max ~15s).
for _ in $(seq 1 30); do
  if curl -sSf "${URL}" >/dev/null 2>&1; then
    break
  fi
  sleep 0.5
done

xdg-open "${URL}" >/dev/null 2>&1 || true
