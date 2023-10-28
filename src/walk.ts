import * as path from "node:path";
import { Walker } from "./walker";
import type { Module } from "./module";
import { debugLogger } from "./debug-logger";
import type { ErrorReport, ResolverFunction } from "./types";
import { defaultResolver } from "./default-resolver";

export type WalkOptions = {
  onError?: (error: ErrorReport) => void;
  resolver?: ResolverFunction;
  skip?: RegExp | null;
  flat?: boolean;
};

export function walk(
  entrypoint: string,
  options?: WalkOptions,
): {
  errors: ErrorReport[];
  modules: Map<string, Module>;
} {
  debugLogger.summary("walk", entrypoint);
  debugLogger.args("walk", entrypoint, options);

  if (!path.isAbsolute(entrypoint)) {
    throw new Error(
      `entrypoint must be an absolute path. received: ${entrypoint}`,
    );
  }

  const resolver = options?.resolver ?? defaultResolver;
  const ignore =
    typeof options?.skip === "undefined" ? /node_modules/ : options?.skip;
  const flat = options?.flat ?? false;

  const walker = new Walker(entrypoint, {
    resolver,
    ignore,
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
