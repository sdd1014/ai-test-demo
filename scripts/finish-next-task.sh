#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  scripts/finish-next-task.sh [--base main] [--branch BRANCH] [--no-pr] [--no-review-comment]

What it does (locally):
  1) Reads the first TODO task from task.md
  2) Creates a task branch (unless --branch is provided and already checked out)
  3) Runs Node tests under the task path
  4) Commits only files under the task path
  5) Pushes the branch to origin
  6) Creates a PR via gh (optional) and comments "/claude review" (optional)

Requirements:
  - Node.js
  - git
  - gh (optional, for PR creation)
EOF
}

BASE="main"
BRANCH=""
CREATE_PR="yes"
REVIEW_COMMENT="yes"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --base) BASE="${2:-}"; shift 2;;
    --branch) BRANCH="${2:-}"; shift 2;;
    --no-pr) CREATE_PR="no"; shift;;
    --no-review-comment) REVIEW_COMMENT="no"; shift;;
    -h|--help) usage; exit 0;;
    *) echo "Unknown arg: $1" >&2; usage >&2; exit 2;;
  esac
done

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not in a git repository" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree not clean; commit/stash first." >&2
  exit 1
fi

TASK_JSON="$(node scripts/next-task.mjs)"
TASK_ID="$(node -e 'const t=JSON.parse(process.argv[1]); process.stdout.write(t.id)' "$TASK_JSON")"
TASK_TITLE="$(node -e 'const t=JSON.parse(process.argv[1]); process.stdout.write(t.title)' "$TASK_JSON")"
TASK_PATH="$(node -e 'const t=JSON.parse(process.argv[1]); process.stdout.write(t.path)' "$TASK_JSON")"

if [[ ! -d "$TASK_PATH" ]]; then
  echo "Task path does not exist: $TASK_PATH" >&2
  exit 1
fi

if [[ -z "$BRANCH" ]]; then
  CURRENT_BRANCH="$(git branch --show-current)"
  if [[ "$CURRENT_BRANCH" == "$BASE" || -z "$CURRENT_BRANCH" ]]; then
    BRANCH="codex/${TASK_ID}-$(date +%Y%m%d-%H%M%S)"
    git switch -c "$BRANCH"
  else
    BRANCH="$CURRENT_BRANCH"
  fi
else
  git switch "$BRANCH" >/dev/null 2>&1 || git switch -c "$BRANCH"
fi

TEST_FILES="$(find "$TASK_PATH" -type f -name '*.test.mjs' -print)"
if [[ -z "$TEST_FILES" ]]; then
  echo "No test files found under $TASK_PATH" >&2
  exit 1
fi
node --test $TEST_FILES

git add "$TASK_PATH"

if git diff --cached --quiet; then
  echo "No staged changes under $TASK_PATH; nothing to commit." >&2
  exit 1
fi

git commit -m "${TASK_ID}: ${TASK_TITLE#"$TASK_ID "}"
git push -u origin "$BRANCH"

if [[ "$CREATE_PR" == "yes" ]]; then
  if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
    PR_URL="$(gh pr create --title "🤖 ${TASK_ID}: ${TASK_TITLE#"$TASK_ID "}" --body "Implements ${TASK_TITLE}.\n\nAwaiting Claude Code review." --base "$BASE" --head "$BRANCH")"
    echo "PR: $PR_URL"

    if [[ "$REVIEW_COMMENT" == "yes" ]]; then
      gh pr comment "$PR_URL" --body "/claude review" >/dev/null || true
    fi
  else
    echo "gh not installed or not authenticated; pushed branch '$BRANCH' only." >&2
  fi
fi

