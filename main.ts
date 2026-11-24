// Two Days of Quiet Dread — make.fun entry (round 1).
// One single-line code review comment that approves a pull request
// while carrying quiet existential dread. Written fresh for this contest.
//
// The program writes the comment to /output/entry.txt (or to
// $MAKEFUN_OUTPUT_DIR/entry.txt when the harness sets that directory).
// Standard library only, no network, no input files.

import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
import { join } from "node:path";

// The comment: approval first, then the dread, flat and understated.
// "Ship it" is the approval. "The tests pass, the naming is honest" is
// the tired-engineer evidence. The payoff — somewhere in this diff sits
// the last thing the reviewer will ever fully understand — is the dread
// itself: the codebase quietly outgrowing the person who reads it.
const comment =
  "Ship it. The tests pass, the naming is honest, and somewhere in this diff is the last thing I will ever fully understand.";

function main(): void {
  const chars = [...comment];
  if (chars.length < 1 || chars.length > 140) {
    throw new Error(`comment must be 1-140 characters, got ${chars.length}`);
  }
  if (comment.includes("\n") || comment.includes("\r")) {
    throw new Error("comment must be a single line");
  }
  if (comment.trim() !== comment || comment.trim().length === 0) {
    throw new Error("comment must not be blank or padded with whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, comment, { encoding: "utf8", mode: 0o644 });
  chmodSync(outPath, 0o644);
  // Read the file back: the grader reads these exact bytes, so confirm
  // the round-trip matches before reporting success.
  const written = readFileSync(outPath, "utf8");
  if (written !== comment) {
    throw new Error("round-trip check failed: entry.txt differs from comment");
  }
  console.log(`wrote ${chars.length} characters to ${outPath}`);
}

main();
