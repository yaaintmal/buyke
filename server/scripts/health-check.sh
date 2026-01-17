#!/usr/bin/env bash

# Simple health check script for Buyke backend
# Usage:
#   ./health-check.sh [HEALTH_URL]
# Examples:
#   ./health-check.sh                    -> checks $HEALTH_URL or http://localhost:5000/health
#   ./health-check.sh http://host:5000/health
# You can also set HEALTH_URL in the environment, e.g.:
#   HEALTH_URL=http://192.168.1.10:5000/health ./health-check.sh

set -euo pipefail

# Prefer positional arg, then HEALTH_URL env var, then a sensible default
URL=${1:-${HEALTH_URL:-http://localhost:5000/health}}

# Prefer curl, fallback to wget if missing
if command -v curl >/dev/null 2>&1; then
  curl -fsS "$URL" -o /dev/null && echo "OK: $URL" || { echo "FAIL: $URL"; exit 2; }
elif command -v wget >/dev/null 2>&1; then
  wget -qO - "$URL" >/dev/null && echo "OK: $URL" || { echo "FAIL: $URL"; exit 2; }
else
  echo "Neither curl nor wget is available in PATH. Please install one to use this health-check script." >&2
  exit 3
fi
