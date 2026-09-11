#!/usr/bin/env bash
#
# Claude Code ADAPTER: PostToolUse on Write|Edit → syntax_check_file.sh <file>.
# No logic here. Exit 2 makes Claude Code show stderr to Claude so it fixes the file.
#
# Canonical source: scripts-fera@ hooks/source/claude/syntax_gate.sh
# Installed to:     {repo}/.claude/hooks/syntax_gate.sh  (never hand-edit the copy)
# Core:             hooks/source/quality/syntax_check_file.sh  ({repo}/scripts/hooks/)
# Standard:         docs-fera@ standards/hooks/agent_hooks_standard.md
set -euo pipefail
exec 1>&2
# shellcheck source=_hook_input.sh
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)/_hook_input.sh"

FILE_PATH="${1:-}"
if [ -z "$FILE_PATH" ]; then
  read_hook_input
  FILE_PATH="$(json_field '.tool_input.file_path')"
fi
[ -n "$FILE_PATH" ] || exit 0

CORE="$(core_path syntax_check_file.sh)" || { echo "[syntax_gate] core syntax_check_file.sh not found; run scripts-fera install_agent_hooks.sh"; exit 0; }
exec bash "$CORE" "$FILE_PATH"
