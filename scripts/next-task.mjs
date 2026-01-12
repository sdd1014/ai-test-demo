import fs from "node:fs";

function usage(exitCode = 0) {
  process.stderr.write(`Usage:
  node scripts/next-task.mjs [--file task.md]

Outputs JSON to stdout:
  {"id":"LC-001","title":"LC-001 Two Sum","path":"problems/001-two-sum"}
`);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const args = { file: "task.md" };
  for (let i = 2; i < argv.length; i++) {
    const value = argv[i];
    if (value === "--help" || value === "-h") usage(0);
    if (value === "--file") {
      args.file = argv[++i] ?? "";
      continue;
    }
    usage(2);
  }
  if (!args.file) usage(2);
  return args;
}

function findFirstTodoTask(markdown) {
  const pattern = /^###\s+(.+?)\n(.*?)(?:\n---\n|\n---\s*$|\Z)/gms;
  for (const match of markdown.matchAll(pattern)) {
    const title = match[1].trim();
    const body = match[2];
    const status = body.match(/^-+\s*Status:\s*(\S+)/m)?.[1];
    if (status !== "TODO") continue;
    const path = body.match(/^-+\s*Path:\s*(\S+)/m)?.[1];
    if (!path) continue;
    const id = title.split(/\s+/)[0];
    return { id, title, path };
  }
  return null;
}

const args = parseArgs(process.argv);
const text = fs.readFileSync(args.file, "utf8");
const task = findFirstTodoTask(text);

if (!task) {
  process.stderr.write("No TODO tasks found.\n");
  process.exit(1);
}

process.stdout.write(JSON.stringify(task));

