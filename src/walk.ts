import * as path from "node:path";
import { Walker } from "./walker";
import { debugLogger } from "./debug-logger";
import type { ErrorReport, ResolverFunction } from "./types";
import { defaultResolver } from "./default-resolver";

export type WalkOptions = {
  onError?: (error: ErrorReport) => void;
  resolver?: ResolverFunction;
  includeNodeModules?: boolean;
  flat?: boolean;
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
  const includeNodeModules = options?.includeNodeModules ?? false;
  const flat = options?.flat ?? false;

  const walker = new Walker(entrypoint, {
    resolver,
    includeNodeModules,
    flat,
  });

  if (options?.onError) {
    walker.on("error", options!.onError);
  }

  const { errors } = walker.walk();
  const modules = walker.modules;

  const ret = {
    errors,
    modules,
  };
  debugLogger.returns("walk ->", ret);

  return ret;
}
