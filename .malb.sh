#!/usr/bin/env bash
set -euo pipefail
trap 'echo "[MAL] Cancelled by user"; exit 1' INT TERM

# Cleanup step
echo "[MAL] Removing root node_modules and lock file..."
rm -rf node_modules package-lock.json || true

echo "[MAL] Cleaning frontend"
rm -rf node_modules package-lock.json || true
cd server/
rm -rf node_modules package-lock.json || true
cd ../

echo "[MAL] cleaning up complete"

# Prompt for next action
while true; do
  echo "[MAL] Choose an action: (r)ebuild / (t)ransfer / (s)top"
  read -r -p "[MAL] Enter choice [r/t/s]: " CHOICE
  CHOICE=${CHOICE,,} # tolower

  case "$CHOICE" in
    r|rebuild)
      echo "[MAL] You chose: rebuild"
      echo "[MAL] Running: npm install (root)"
      npm install || { echo "[MAL] npm install failed"; exit 1; }

      echo "[MAL] Running: npm run build"
      npm run build || { echo "[MAL] npm run build failed"; exit 1; }

      echo "[MAL] Rebuild completed"
      break
      ;;

    t|transfer)
      echo "[MAL] You chose: transfer to deploy server"
      read -r -p "[MAL] Enter target folder name on remote (e.g. mysite-2025-12-16): " FOLDER
      if [ -z "$FOLDER" ]; then
        echo "[MAL] No folder name provided - aborting transfer"
        exit 1
      fi

      read -r -p "[MAL] Confirm transfer all files to mal@192.168.178.9:/home/mal/www/react/$FOLDER ? [y/N]: " CONFIRM
      CONFIRM=${CONFIRM,,}
      if [[ "$CONFIRM" == "y" || "$CONFIRM" == "yes" ]]; then
        echo "[MAL] Starting scp transfer..."
        scp -r * "mal@192.168.178.9:/home/mal/www/react/$FOLDER" && echo "[MAL] Transfer completed" || echo "[MAL] Transfer failed"
      else
        echo "[MAL] Transfer cancelled"
      fi
      break
      ;;

    s|stop)
      echo "[MAL] Stopping script as requested. Goodbye."
      exit 0
      ;;

    *)
      echo "[MAL] Unknown choice: $CHOICE"
      ;;
  esac
done

echo "[MAL] Script finished"
