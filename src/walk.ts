import * as path from "node:path";
import { Walker } from "./walker";
import { debugLogger } from "./debug-logger";
import type { ReportedError, ResolverFunction } from "./types";
import { defaultResolver } from "./default-resolver";

export type WalkOptions = {
  onError?: (error: ReportedError) => void;
  resolver?: ResolverFunction;
};

export function walk(entrypoint: string, options?: WalkOptions) {
  debugLogger.summary("walk", entrypoint);
  debugLogger.args("walk", entrypoint, options);

  if (!path.isAbsolute(entrypoint)) {
    throw new Error(
      `entrypoint must be an absolute path. received: ${entrypoint}`,
    );
  }

  const resolver = options?.resolver ?? defaultResolver;

  const walker = new Walker(entrypoint, resolver);

  if (options?.onError) {
    walker.on("error", options!.onError);
  }

  const errors = walker.walk();
  const modules = walker.modules;

  const ret = {
    errors,
    modules,
  };
  debugLogger.returns("walk ->", ret);

  return ret;
}
