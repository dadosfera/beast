#!/usr/bin/env bash
#
# Claude Code ADAPTER: PreToolUse on Bash → Heavy Compute Guard check.
# No logic here. The guard itself is the shell-level, tool-agnostic
# ~/.local/bin/heavy_compute_guard.sh (scripts-fera security/heavy_compute_guard/), which
# already vetoes the command in the shell for every actor. This shim only gives Claude the
# verdict EARLIER (before the tool runs) and works in sessions whose shell predates the
# guard's installation. If the guard is not installed, the shim does nothing.
#
# Canonical source: scripts-fera@ hooks/source/claude/heavy_compute_guard_shim.sh
# Installed to:     {repo}/.claude/hooks/heavy_compute_guard_shim.sh
# Standard:         docs-fera@ standards/hooks/agent_hooks_standard.md
set -uo pipefail
GUARD="${HEAVY_COMPUTE_GUARD_PATH:-$HOME/.local/bin/heavy_compute_guard.sh}"
[ -f "$GUARD" ] || exit 0
# shellcheck source=_hook_input.sh
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)/_hook_input.sh"
read_hook_input
COMMAND="$(json_field '.tool_input.command')"
[ -n "$COMMAND" ] || exit 0
HEAVY_COMPUTE_GUARD_NO_TRAP=1 . "$GUARD"
__hcg_check "$COMMAND" || exit 2
exit 0
