You are Codex running in GitHub Actions.

Goal: implement exactly ONE TODO task from `task.md` per run.

Hard rules:
- Do NOT modify `task.md` (only Claude is allowed to change it).
- Only implement the single task provided in `.ai/current-task.md` (ignore other TODOs).
- Only write code under the task `Path:` directory (and its subdirectories).
- Add runnable tests for the task.

Implementation requirements:
- Use JavaScript (Node.js) with no external dependencies.
- Prefer ESM (`.mjs`) and Node's built-in test runner (`node:test`).
- Keep solutions O(n) where applicable (hash map / stack, etc.).
- Export the main function from an `index.mjs` file under the task path.

After coding:
- Ensure `node --test <task path>` passes.
- Write clear, minimal code and tests.

Now read `.ai/current-task.md` and implement it.

