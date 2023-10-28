import * as path from "node:path";
import { Walker } from "./walker";
import { debugLogger } from "./debug-logger";

export function walk(entrypoint: string) {
  debugLogger.summary("walk", entrypoint);
  debugLogger.args("walk", entrypoint);

  if (!path.isAbsolute(entrypoint)) {
    throw new Error(
      `entrypoint must be an absolute path. received: ${entrypoint}`,
    );
  }

  const walker = new Walker(entrypoint);
  const errors = walker.walk();
  const modules = walker.modules;

  const ret = {
    errors,
    modules,
  };
  debugLogger.returns("walk ->", ret);

  return ret;
}
