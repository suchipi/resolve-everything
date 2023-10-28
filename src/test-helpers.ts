import path from "node:path";
import util from "node:util";
import { pathMarker } from "path-less-traveled";
import type { RunContext } from "first-base";

export const rootDir = pathMarker(path.resolve(__dirname, ".."));
export const cliPath = rootDir("dist/cli.js");

export function cleanString(str: string): string {
  return str.replaceAll(rootDir(), "<rootDir>");
}

export function inspectAndClean(value: any): string {
  return cleanString(util.inspect(value, { depth: Infinity }));
}

export function cleanRunResult(
  result: RunContext["result"],
): RunContext["result"] {
  return {
    ...result,
    stdout: cleanString(result.stdout),
    stderr: cleanString(result.stderr),
  };
}
