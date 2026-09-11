#!/usr/bin/env bash
#
# Tool-agnostic quality core: syntax-check ONE file. Exit 2 on a syntax error.
#
#   syntax_check_file.sh <file>
#
# This is the whole logic. Agent adapters only translate their payload into this call:
#   Claude Code  PostToolUse Write|Edit   -> hooks/source/claude/syntax_gate.sh
#   Cursor       afterFileEdit            -> hooks/source/cursor/after_file_edit.sh
# and any git hook, CI job or human can call it directly.
#
# Canonical source: scripts-fera@ hooks/source/quality/syntax_check_file.sh
# Consumer copy:    {repo}/scripts/hooks/syntax_check_file.sh  (never hand-edit the copy)
# Standard:         docs-fera@ standards/hooks/agent_hooks_standard.md
# Rule:             2_06_syntax_validation_loop — "Fix → Syntax Gate → Lint → Tests → Commit"
#
# Dispatch by extension:
#   py            py_compile (block), Ruff E9,F63,F7,F82 when installed (block)
#   js mjs cjs    node --check (block)
#   jsx ts tsx    local node_modules/.bin/tsc --noEmit (warn only: tsc needs project context;
#                 npx is never used so the check can't trigger a download)
#   sh bash       bash -n (block), then shellcheck when installed (warn only)
#   bats          bats --count (block). Never bash -n: @test is not bash.
#   json          python3 json.load (block)
#   yaml yml      python3 yaml.safe_load when PyYAML is importable (block), else skip
#   anything else skipped
#
# Everything to stderr so adapters that forward stderr (Claude Code on exit 2) show it.
set -euo pipefail
exec 1>&2
TAG="[syntax_check]"

find_python() {
  if [ -x ".venv/bin/python" ]; then echo ".venv/bin/python"
  elif [ -x "venv/bin/python" ]; then echo "venv/bin/python"
  else echo "python3"
  fi
}

FILE_PATH="${1:-}"
if [ -z "$FILE_PATH" ]; then
  echo "$TAG usage: syntax_check_file.sh <file>"
  exit 0
fi
if [ ! -f "$FILE_PATH" ]; then
  echo "$TAG File not found (deleted or moved?): $FILE_PATH"
  exit 0
fi

EXT="${FILE_PATH##*.}"
[ "$EXT" != "$FILE_PATH" ] || EXT=""   # no extension
echo "$TAG Validating: $FILE_PATH"

case "$EXT" in
  py)
    PY="$(find_python)"
    if ! "$PY" -m py_compile "$FILE_PATH"; then
      echo "$TAG ❌ Python syntax error in $FILE_PATH"
      exit 2
    fi
    echo "$TAG ✅ Python syntax valid"
    if command -v ruff >/dev/null 2>&1; then
      if ! ruff check --select E9,F63,F7,F82 "$FILE_PATH"; then
        echo "$TAG ❌ Ruff fast checks (E9,F63,F7,F82) failed for $FILE_PATH"
        exit 2
      fi
      echo "$TAG ✅ Ruff fast checks passed"
    fi
    ;;

  js|mjs|cjs)
    if command -v node >/dev/null 2>&1; then
      if ! node --check "$FILE_PATH"; then
        echo "$TAG ❌ JavaScript syntax error in $FILE_PATH"
        exit 2
      fi
      echo "$TAG ✅ JavaScript syntax valid"
    fi
    ;;

  jsx|ts|tsx)
    # Only a locally installed tsc; never npx (it may try to download). Non-blocking:
    # single-file tsc lacks the project's tsconfig/paths and produces false errors.
    TSC=""
    ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
    for cand in "$ROOT/node_modules/.bin/tsc" "./node_modules/.bin/tsc"; do
      [ -x "$cand" ] && { TSC="$cand"; break; }
    done
    if [ -n "$TSC" ]; then
      if ! "$TSC" --noEmit --jsx preserve --skipLibCheck "$FILE_PATH"; then
        echo "$TAG ⚠️  tsc reported errors for $FILE_PATH (not blocking: single-file check lacks project context)"
        exit 0
      fi
      echo "$TAG ✅ TypeScript syntax valid"
    else
      echo "$TAG ℹ️  No local tsc; skipping TypeScript check"
    fi
    ;;

  sh|bash)
    if ! bash -n "$FILE_PATH"; then
      echo "$TAG ❌ Shell syntax error in $FILE_PATH"
      exit 2
    fi
    echo "$TAG ✅ Shell syntax valid"
    if command -v shellcheck >/dev/null 2>&1; then
      if ! shellcheck "$FILE_PATH"; then
        echo "$TAG ⚠️  ShellCheck warnings (not blocking)"
        exit 0
      fi
      echo "$TAG ✅ ShellCheck passed"
    fi
    ;;

  bats)
    # Never bash -n on .bats: @test blocks are not valid bash.
    if command -v bats >/dev/null 2>&1; then
      if ! bats --count "$FILE_PATH" >/dev/null; then
        echo "$TAG ❌ BATS syntax error in $FILE_PATH"
        exit 2
      fi
      echo "$TAG ✅ BATS syntax valid"
    fi
    ;;

  json)
    if command -v python3 >/dev/null 2>&1; then
      if ! python3 -c 'import json,sys; json.load(open(sys.argv[1], encoding="utf-8"))' "$FILE_PATH"; then
        echo "$TAG ❌ JSON syntax error in $FILE_PATH"
        exit 2
      fi
      echo "$TAG ✅ JSON valid"
    fi
    ;;

  yaml|yml)
    if command -v python3 >/dev/null 2>&1 && python3 -c 'import yaml' 2>/dev/null; then
      if ! python3 -c 'import yaml,sys; list(yaml.safe_load_all(open(sys.argv[1], encoding="utf-8")))' "$FILE_PATH"; then
        echo "$TAG ❌ YAML syntax error in $FILE_PATH"
        exit 2
      fi
      echo "$TAG ✅ YAML valid"
    else
      echo "$TAG ℹ️  PyYAML not importable; skipping YAML check"
    fi
    ;;

  *)
    echo "$TAG ℹ️  No syntax check for .${EXT:-<none>} files"
    exit 0
    ;;
esac

echo "$TAG ✅ All syntax checks passed for $FILE_PATH"
exit 0
