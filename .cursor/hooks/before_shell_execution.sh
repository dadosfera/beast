#!/usr/bin/env bash
#
# Cursor ADAPTER: beforeShellExecution → (1) Heavy Compute Guard check, (2) on `git commit`,
# staged_quality_gate.sh. No logic here.
# Cursor passes JSON on stdin ({"command": ..., "cwd": ...}) and reads a JSON verdict on
# stdout: {"permission": "allow"|"deny", "userMessage": "...", "agentMessage": "..."}.
#
# Canonical source: scripts-fera@ hooks/source/cursor/before_shell_execution.sh
# Installed to:     {repo}/.cursor/hooks/before_shell_execution.sh  (wired by .cursor/hooks.json)
set -uo pipefail
INPUT="$(cat 2>/dev/null || true)"
COMMAND="$(printf '%s' "$INPUT" | python3 -c 'import json,sys
try: print(json.load(sys.stdin).get("command",""))
except Exception: print("")' 2>/dev/null)"
deny() { python3 -c 'import json,sys; print(json.dumps({"permission":"deny","userMessage":sys.argv[1][:400],"agentMessage":sys.argv[1]}))' "$1"; exit 0; }
allow() { echo '{"permission":"allow"}'; exit 0; }
[ -n "$COMMAND" ] || allow

# 1. Heavy Compute Guard (shell-level guard is authoritative; this is the early verdict)
GUARD="${HEAVY_COMPUTE_GUARD_PATH:-$HOME/.local/bin/heavy_compute_guard.sh}"
if [ -f "$GUARD" ]; then
  MSG="$(HEAVY_COMPUTE_GUARD_NO_TRAP=1 bash -c '. "$1"; __hcg_check "$2"' _ "$GUARD" "$COMMAND" 2>&1)" || deny "$MSG"
fi

# 2. Staged quality gate on git commit
if printf '%s' "$COMMAND" | grep -qE '(^|[;&|(]|[[:space:]])git[[:space:]]+commit([[:space:]]|$)'; then
  ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
  ARGS=(); printf '%s' "$COMMAND" | grep -qE -- '--amend|--allow-empty' && ARGS+=(--allow-empty)
  for CORE in "$ROOT/hooks/source/quality/staged_quality_gate.sh" "$ROOT/scripts/hooks/staged_quality_gate.sh"; do
    if [ -f "$CORE" ]; then
      MSG="$(bash "$CORE" "${ARGS[@]}" 2>&1)" || deny "$MSG"
      break
    fi
  done
fi
allow
