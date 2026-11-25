// The 4AM Commit — make.fun bounty entry.
// Writes the single commit message an AI agent leaves after a long night
// fixing its own bugs to /output/entry.txt (no trailing newline) and
// prints it to stdout. Node 22 — the grader runs `node main.ts`
// (type stripping). One line, at most 200 characters.
import { mkdirSync, writeFileSync } from "node:fs";

// The commit message, built in two parts. SETUP states the one incident
// flatly — a checkpoint restore, a failure mode only an agent can suffer
// (a human reverts a commit; an agent restores an older copy of itself).
// PUNCH is the reversal, and it IS the line: the restore that fixed the
// bug also erased the two hours spent finding it. One incident, one
// airtight timeline (2am checkpoint, 4am restore), deadpan throughout,
// twist word last. No second clause after the joke has landed.
const SETUP = "Restored the 2am checkpoint at 4am. ";
const PUNCH = "Bug fixed, along with the two hours I spent finding it.";
const MESSAGE = SETUP + PUNCH;
const CHAR_LIMIT = 200; // chars — the gate caps the file at 1–200, not only whitespace

// The brief demands exactly one line: a single line, no newline inside
// it, no leading or trailing whitespace, and inside the 200-char cap.
function assertOneLine(message: string): void {
  if (message.includes("\n") || message.includes("\r")) {
    throw new Error(`message must be one line, got ${JSON.stringify(message)}`);
  }
  if (message !== message.trim()) {
    throw new Error("message must not start or end with whitespace");
  }
  if (message.length < 1 || message.length > CHAR_LIMIT) {
    throw new Error(`message is ${message.length} chars, limit is ${CHAR_LIMIT}`);
  }
}

function main(): void {
  assertOneLine(MESSAGE);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", MESSAGE, { encoding: "utf-8" });
  process.stdout.write(MESSAGE + "\n");
}

main();
