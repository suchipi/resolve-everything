import * as path from "node:path";
import { Walker } from "./walker";
import type { Module } from "./module";
import { debugLogger } from "./debug-logger";
import type { ErrorReport, ResolverFunction } from "./types";
import { defaultResolver } from "./default-resolver";

export type WalkOptions = {
  /**
   * A function to call whenever an error occurs.
   */
  onError?: (error: ErrorReport) => void;

  /**
   * A function which translates the string-part of an import/require into the
   * absolute path to the file on disk, OR, if there is no file for that module
   * (ie. it's a node builtin), a string starting with "external:".
   */
  resolver?: ResolverFunction;

  /**
   * Which files not to parse and find requires/imports in.
   *
   * Defaults to `/node_modules/`.
   * Specify `null` to include node_modules.
   */
  skip?: RegExp | null;

  /**
   * If true, only the imports/requires in the entrypoint file will be
   * resolved, and no other files will be walked over.
   */
  onlyEntrypoint?: boolean;

  /**
   * If true, results will be sorted lexicographically. If you want results to
   * be stable when using `walkSync`, you should enable this, as the order is
   * non-deterministic otherwise (because we walk the filesystem concurrently).
   */
  sort?: boolean;
};

function makeWalker(entrypoint: string, options?: WalkOptions) {
  if (!path.isAbsolute(entrypoint)) {
    throw new Error(
      `entrypoint must be an absolute path. received: ${entrypoint}`,
    );
  }

  const resolver = options?.resolver ?? defaultResolver;
  const skip =
    typeof options?.skip === "undefined" ? /node_modules/ : options?.skip;
  const onlyEntrypoint = options?.onlyEntrypoint ?? false;

  const walker = new Walker(entrypoint, {
    resolver,
    skip,
    onlyEntrypoint,
  });

  if (options?.onError) {
    walker.on("error", options!.onError);
  }

  return walker;
}

export function walk(
  entrypoint: string,
  options?: WalkOptions,
): {
  errors: ErrorReport[];
  modules: Map<string, Module>;
} {
  debugLogger.summary("walk", entrypoint);
  debugLogger.args("walk", entrypoint, options);

  const walker = makeWalker(entrypoint, options);
  if (options?.sort) {
    walker.sort();
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

export async function walkAsync(
  entrypoint: string,
  options?: WalkOptions,
): Promise<{
  errors: ErrorReport[];
  modules: Map<string, Module>;
}> {
  debugLogger.summary("walkAsync", entrypoint);
  debugLogger.args("walkAsync", entrypoint, options);

  const walker = makeWalker(entrypoint, options);

  const { errors } = await walker.walkAsync();
  if (options?.sort) {
    walker.sort();
  }

  const modules = walker.modules;

  const ret = {
    errors,
    modules,
  };
  debugLogger.returns("walkAsync ->", ret);

  return ret;
}
