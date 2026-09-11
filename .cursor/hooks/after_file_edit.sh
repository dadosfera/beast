#!/usr/bin/env bash
#
# Cursor ADAPTER: afterFileEdit → syntax_check_file.sh <file>. No logic here.
# Cursor passes JSON on stdin ({"file_path": ..., "edits": [...]}). afterFileEdit is
# observational: the check's stderr is what the agent sees in the hook output.
#
# Canonical source: scripts-fera@ hooks/source/cursor/after_file_edit.sh
# Installed to:     {repo}/.cursor/hooks/after_file_edit.sh  (wired by {repo}/.cursor/hooks.json)
# Core:             hooks/source/quality/syntax_check_file.sh  ({repo}/scripts/hooks/)
set -uo pipefail
INPUT="$(cat 2>/dev/null || true)"
FILE_PATH="$(printf '%s' "$INPUT" | python3 -c 'import json,sys
try: print(json.load(sys.stdin).get("file_path",""))
except Exception: print("")' 2>/dev/null)"
[ -n "$FILE_PATH" ] || exit 0
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
for CORE in "$ROOT/hooks/source/quality/syntax_check_file.sh" "$ROOT/scripts/hooks/syntax_check_file.sh"; do
  [ -f "$CORE" ] && { bash "$CORE" "$FILE_PATH"; exit 0; }
done
exit 0
