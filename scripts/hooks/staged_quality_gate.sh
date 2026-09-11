#!/usr/bin/env bash
#
# Tool-agnostic quality core: check the STAGED files before a commit. Exit 2 to block.
#
#   staged_quality_gate.sh [--allow-empty] [--in-git-hook]
#
#   --allow-empty   the commit carries --amend/--allow-empty, so no staged files is fine
#   --in-git-hook   we are already inside git's pre-commit: do not run the pre-commit
#                   framework again (it is the thing calling us) — same as PRE_COMMIT=1
#
# This is the whole logic. Agent adapters only translate their payload into this call:
#   Claude Code  PreToolUse Bash, filtered to the commit command -> hooks/source/claude/pre_commit_gate.sh
#   Cursor       beforeShellExecution, on the commit command      -> hooks/source/cursor/before_shell_execution.sh
#   git          .git/hooks/pre-commit (master hook)       -> scripts/hooks/staged_quality_gate.sh --in-git-hook
# so a commit made by a human, by any agent, or by a script meets the same gate.
#
# Checks, in order (blocking unless noted):
#   1. nothing staged            → block (unless --allow-empty)
#   2. staged *.py               → py_compile, then Ruff E9,F63,F7,F82 when installed
#   3. staged *.sh / *.bash      → bash -n
#   4. pre-commit run --files …  → when .pre-commit-config.yaml exists and pre-commit is installed
#   5. conflict markers on lines this commit ADDS
#   6. import pdb / breakpoint() → warning only
#
# Canonical source: scripts-fera@ hooks/source/quality/staged_quality_gate.sh
# Consumer copy:    {repo}/scripts/hooks/staged_quality_gate.sh  (never hand-edit the copy)
# Standard:         docs-fera@ standards/hooks/agent_hooks_standard.md
# Rule:             2_06_syntax_validation_loop
set -euo pipefail
exec 1>&2
TAG="[staged_quality_gate]"

find_python() {
  if [ -x ".venv/bin/python" ]; then echo ".venv/bin/python"
  elif [ -x "venv/bin/python" ]; then echo "venv/bin/python"
  else echo "python3"
  fi
}

ALLOW_EMPTY=0
RUN_PRE_COMMIT_FRAMEWORK=1
[ -n "${PRE_COMMIT:-}" ] && RUN_PRE_COMMIT_FRAMEWORK=0
for arg in "$@"; do
  case "$arg" in
    --allow-empty) ALLOW_EMPTY=1 ;;
    --in-git-hook) RUN_PRE_COMMIT_FRAMEWORK=0 ;;
    *) echo "$TAG unknown option: $arg"; exit 2 ;;
  esac
done

echo "$TAG Running staged quality checks..."

GIT_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || echo ".")"
cd "$GIT_ROOT"

# 1. Staged files (added / copied / modified / renamed; deletions have nothing to check)
STAGED=()
while IFS= read -r -d '' f; do STAGED+=("$f"); done \
  < <(git diff --cached --name-only --diff-filter=ACMR -z 2>/dev/null || true)

if [ "${#STAGED[@]}" -eq 0 ]; then
  if [ "$ALLOW_EMPTY" = 1 ]; then
    echo "$TAG No staged files, but --amend/--allow-empty was given; nothing to check"
    exit 0
  fi
  echo "$TAG ❌ No staged files: the commit would be empty. Stage your changes first (git add)."
  exit 2
fi
echo "$TAG Found ${#STAGED[@]} staged file(s)"

# 2. Python: syntax then fast Ruff
STAGED_PY=()
for f in "${STAGED[@]}"; do case "$f" in *.py) [ -f "$f" ] && STAGED_PY+=("$f") ;; esac; done
if [ "${#STAGED_PY[@]}" -gt 0 ]; then
  PY="$(find_python)"
  echo "$TAG Step 1: Python syntax (${#STAGED_PY[@]} file(s), $PY)"
  for f in "${STAGED_PY[@]}"; do
    if ! "$PY" -m py_compile "$f"; then
      echo "$TAG ❌ Python syntax error in $f"
      exit 2
    fi
  done
  echo "$TAG   ✅ Python syntax valid"
  if command -v ruff >/dev/null 2>&1; then
    if ! ruff check --select E9,F63,F7,F82 "${STAGED_PY[@]}"; then
      echo "$TAG ❌ Ruff fast checks (E9,F63,F7,F82) failed"
      exit 2
    fi
    echo "$TAG   ✅ Ruff fast checks passed"
  fi
fi

# 3. Shell: bash -n
STAGED_SH=()
for f in "${STAGED[@]}"; do case "$f" in *.sh|*.bash) [ -f "$f" ] && STAGED_SH+=("$f") ;; esac; done
if [ "${#STAGED_SH[@]}" -gt 0 ]; then
  echo "$TAG Step 1: Shell syntax (${#STAGED_SH[@]} file(s))"
  for f in "${STAGED_SH[@]}"; do
    if ! bash -n "$f"; then
      echo "$TAG ❌ Shell syntax error in $f"
      exit 2
    fi
  done
  echo "$TAG   ✅ Shell syntax valid"
fi

# 4. pre-commit framework, if the repo uses it — skipped when we ARE running inside
#    pre-commit (PRE_COMMIT=1) or inside a git hook (--in-git-hook), to avoid recursion.
if [ "$RUN_PRE_COMMIT_FRAMEWORK" = 1 ] && [ -f ".pre-commit-config.yaml" ] && command -v pre-commit >/dev/null 2>&1; then
  echo "$TAG Step 2: pre-commit run --files (staged)"
  if ! pre-commit run --files "${STAGED[@]}"; then
    echo "$TAG ❌ pre-commit hooks failed"
    exit 2
  fi
  echo "$TAG   ✅ pre-commit hooks passed"
fi

# 5. Conflict markers on lines this commit adds
echo "$TAG Step 3: Additional checks"
MARKERS="$(git diff --cached -U0 --no-color 2>/dev/null | grep -nE '^\+(<<<<<<< |>>>>>>> |\|\|\|\|\|\|\| )' || true)"
if [ -n "$MARKERS" ]; then
  echo "$TAG ❌ Merge conflict markers in the staged diff:"
  printf '%s\n' "$MARKERS" | head -10
  exit 2
fi

# 6. Debug statements (warning only)
if [ "${#STAGED_PY[@]}" -gt 0 ]; then
  DEBUG_FOUND="$(grep -nE 'import pdb|breakpoint\(\)' -- "${STAGED_PY[@]}" 2>/dev/null || true)"
  if [ -n "$DEBUG_FOUND" ]; then
    echo "$TAG ⚠️  Debug statements found (not blocking):"
    printf '%s\n' "$DEBUG_FOUND" | head -5
  fi
fi

echo "$TAG ✅ All quality checks passed"
exit 0
