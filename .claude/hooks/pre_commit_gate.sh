#!/usr/bin/env bash
#
# Claude Code ADAPTER: PreToolUse on Bash, if "Bash(git commit:*)" → staged_quality_gate.sh.
# No logic here. Exit 2 makes Claude Code refuse to run the commit and show stderr to Claude.
#
# Canonical source: scripts-fera@ hooks/source/claude/pre_commit_gate.sh
# Installed to:     {repo}/.claude/hooks/pre_commit_gate.sh  (never hand-edit the copy)
# Core:             hooks/source/quality/staged_quality_gate.sh  ({repo}/scripts/hooks/)
# Standard:         docs-fera@ standards/hooks/agent_hooks_standard.md
set -euo pipefail
exec 1>&2
# shellcheck source=_hook_input.sh
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)/_hook_input.sh"
read_hook_input

# Defensive filter: only act on git commit even if wired on a bare "Bash" matcher.
COMMAND="$(json_field '.tool_input.command')"
if [ -n "$COMMAND" ] && ! printf '%s' "$COMMAND" | grep -qE '(^|[;&|(]|[[:space:]])git[[:space:]]+commit([[:space:]]|$)'; then
  exit 0
fi
ARGS=()
printf '%s' "$COMMAND" | grep -qE -- '--amend|--allow-empty' && ARGS+=(--allow-empty)

CORE="$(core_path staged_quality_gate.sh)" || { echo "[pre_commit_gate] core staged_quality_gate.sh not found; run scripts-fera install_agent_hooks.sh"; exit 0; }
exec bash "$CORE" "${ARGS[@]}"
