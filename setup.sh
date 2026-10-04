#!/usr/bin/env bash
set -e

# ==============================================================================
# STELE — Interactive One-Click Local Setup & Launcher
# Federated Institutional Operating System & Student Commitment Ledger (v2.1)
# ==============================================================================

BOLD='\033[1m'
ORANGE='\033[38;2;232;122;61m'
AMBER='\033[38;2;224;168;58m'
GREEN='\033[38;2;52;199;89m'
MUTED='\033[38;2;146;146;154m'
RESET='\033[0m'

clear
echo -e "${ORANGE}${BOLD}"
echo "  ███████╗████████╗███████╗██╗     ███████╗"
echo "  ██╔════╝╚══██╔══╝██╔════╝██║     ██╔════╝"
echo "  ███████╗   ██║   █████╗  ██║     █████╗  "
echo "  ╚════██║   ██║   ██╔══╝  ██║     ██╔══╝  "
echo "  ███████║   ██║   ███████╗███████╗███████╗"
echo "  ╚══════╝   ╚═╝   ╚══════╝╚══════╝╚══════╝"
echo -e "${RESET}${AMBER}  Sovereign Institutional OS & Witnessed Commitment Ledger (v2.1)${RESET}"
echo -e "${MUTED}  Three-Material Recipe: Clay Navigation · Glass Overlays · Flat Data${RESET}"
echo "  ----------------------------------------------------------------------"
echo ""

# 1. Verify Node.js or Bun runtime
echo -e "${BOLD}[1/4] Auditing Local Runtime Environment...${RESET}"
if command -v bun >/dev/null 2>&1; then
  PKG_MANAGER="bun"
  echo -e "  ${GREEN}✓${RESET} Detected Bun ($(bun --version)) — Using ultra-fast Bun installer."
elif command -v npm >/dev/null 2>&1; then
  PKG_MANAGER="npm"
  NODE_VER=$(node -v)
  echo -e "  ${GREEN}✓${RESET} Detected Node.js (${NODE_VER}) & npm ($(npm -v))."
else
  echo -e "  ❌ Neither Node.js (npm) nor Bun was found on your PATH."
  echo -e "     Please install Node.js >= 18 (https://nodejs.org) or Bun (https://bun.sh)."
  exit 1
fi

# 2. Configure Local Environment Variables (.env)
echo ""
echo -e "${BOLD}[2/4] Calibrating Sovereign Node Environment...${RESET}"
if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    cp .env.example .env
    echo -e "  ${GREEN}✓${RESET} Initialized ${BOLD}.env${RESET} from .env.example (Offline-first local storage active)."
  else
    touch .env
    echo -e "  ${GREEN}✓${RESET} Created clean ${BOLD}.env${RESET} file."
  fi
else
  echo -e "  ${GREEN}✓${RESET} Existing ${BOLD}.env${RESET} configuration preserved."
fi

# 3. Install Dependencies
echo ""
echo -e "${BOLD}[3/4] Installing Dependencies via ${PKG_MANAGER}...${RESET}"
if [ "$PKG_MANAGER" = "bun" ]; then
  bun install
else
  npm install
fi
echo -e "  ${GREEN}✓${RESET} All packages verified and installed."

# 4. Interactive Launch Mode Selection
echo ""
echo -e "${BOLD}[4/4] Select Launch Mode:${RESET}"
echo -e "  ${ORANGE}1)${RESET} Start Interactive Dev Server on ${BOLD}http://localhost:3000${RESET} (Recommended)"
echo -e "  ${ORANGE}2)${RESET} Run TypeScript Verification & Production Build (${BOLD}dist/${RESET})"
echo -e "  ${ORANGE}3)${RESET} Build & Preview Production Bundle Locally"
echo ""

if [ -t 0 ]; then
  read -r -p "  Enter choice [1-3, default=1]: " LAUNCH_CHOICE
else
  LAUNCH_CHOICE="1"
fi
LAUNCH_CHOICE=${LAUNCH_CHOICE:-1}

echo ""
case "$LAUNCH_CHOICE" in
  2)
    echo -e "${AMBER}→ Running TypeScript check and building production bundle...${RESET}"
    if [ "$PKG_MANAGER" = "bun" ]; then
      bun run lint && bun run build
    else
      npm run lint && npm run build
    fi
    echo -e "${GREEN}✓ Production build complete in ./dist${RESET}"
    ;;
  3)
    echo -e "${AMBER}→ Building and launching production preview server...${RESET}"
    if [ "$PKG_MANAGER" = "bun" ]; then
      bun run build && bun run preview --port 3000 --host 0.0.0.0
    else
      npm run build && npm run preview -- --port 3000 --host 0.0.0.0
    fi
    ;;
  *)
    echo -e "${GREEN}✓ Launching Stele Sovereign Node at http://localhost:3000 ...${RESET}"
    if [ "$PKG_MANAGER" = "bun" ]; then
      bun run dev
    else
      npm run dev
    fi
    ;;
esac
