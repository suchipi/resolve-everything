#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { walk } from ".";

let entrypoint = process.argv.slice(2).join(" ");

if (!path.isAbsolute(entrypoint)) {
  entrypoint = path.resolve(process.cwd(), entrypoint);
}

if (!fs.existsSync(entrypoint)) {
  console.error("No such file: ", entrypoint);
  process.exit(1);
}

const result = walk(entrypoint, (err) => {
  console.warn(
    `Error during '${err.stage}' of ${JSON.stringify(err.filename)}:`,
  );
  console.warn(err.error);
});

console.log({ result });
