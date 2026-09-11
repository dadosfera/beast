#!/usr/bin/env bash
#
# Shared helpers for the Claude Code ADAPTERS in this directory. Sourced, not a hook.
# Adapters carry no checking logic: they read Claude's JSON payload and call the
# tool-agnostic core in hooks/source/quality/ (consumer copy: scripts/hooks/).
#
# Canonical source: scripts-fera@ hooks/source/claude/_hook_input.sh
# Standard:         docs-fera@ standards/hooks/agent_hooks_standard.md

# Claude Code passes the hook payload as JSON on stdin. When the script is run
# by hand with a terminal on stdin there is no payload; do not block on read.
read_hook_input() {
  if [ -t 0 ]; then
    HOOK_INPUT=""
  else
    HOOK_INPUT="$(cat 2>/dev/null || true)"
  fi
  export HOOK_INPUT
}

# json_field '.tool_input.command'  -> prints the string value, or "" when absent.
json_field() {
  local jq_path="$1"
  [ -n "${HOOK_INPUT:-}" ] || { printf ''; return 0; }
  if command -v jq >/dev/null 2>&1; then
    printf '%s' "$HOOK_INPUT" | jq -r "${jq_path} // empty" 2>/dev/null || true
    return 0
  fi
  if command -v python3 >/dev/null 2>&1; then
    JQ_PATH="$jq_path" printf '%s' "$HOOK_INPUT" | python3 -c '
import json, os, sys
try:
    d = json.load(sys.stdin)
    for k in os.environ["JQ_PATH"].strip(".").split("."):
        d = d.get(k, "") if isinstance(d, dict) else ""
    print(d if isinstance(d, str) else "")
except Exception:
    print("")' 2>/dev/null || true
  fi
}

# core_path <name>  -> absolute path of a quality core. Canonical layout first (the repo we
# run in IS scripts-fera), then the consumer copy (scripts/hooks/), then next to this
# adapter's canonical source, then a sibling scripts-fera checkout.
core_path() {
  local name="$1" here root cand
  here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
  root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
  for cand in "$root/hooks/source/quality/$name" "$root/scripts/hooks/$name" "$here/../quality/$name" \
              "$root/scripts-fera/hooks/source/quality/$name" "$root/../scripts-fera/hooks/source/quality/$name" \
              "$HOME/local_repos/scripts-fera/hooks/source/quality/$name"; do
    [ -f "$cand" ] && { printf '%s' "$cand"; return 0; }
  done
  return 1
}
