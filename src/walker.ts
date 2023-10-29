import * as path from "node:path";
import { EventEmitter } from "node:events";
import { runJobs } from "parallel-park";
import { Module } from "./module";
import { debugLogger } from "./debug-logger";
import type { ErrorReport, ResolverFunction } from "./types";

export type WalkerOptions = {
  resolver: ResolverFunction;
  skip: RegExp | null;
  onlyEntrypoint: boolean;
};

export class Walker extends EventEmitter {
  entrypoint: string;
  modules: Map<string, Module>;

  private _options: WalkerOptions;

  constructor(entrypoint: string, options: WalkerOptions) {
    super();

    this._options = options;

    if (!path.isAbsolute(entrypoint)) {
      throw Object.assign(
        new Error(
          `Entrypoint must be an absolute path. received: ${entrypoint}`,
        ),
        { entrypoint },
      );
    }

    this.entrypoint = entrypoint;
    this.modules = new Map();
  }

  walk(): {
    errors: Array<ErrorReport>;
  } {
    debugLogger.summary("Walker.walk");

    const filesToProcess = [this.entrypoint];

    let filename: string | undefined;
    const errors: Array<ErrorReport> = [];
    let errorStage: ErrorReport["stage"] = "read";

    const reportError = (error: Error, request?: string) => {
      const report = {
        filename,
        stage: errorStage,
        error,
      };
      debugLogger.summary("error reported:", report);
      this.emit("error", report);
      errors.push(report);
    };

    while ((filename = filesToProcess.shift())) {
      debugLogger.summary("Walker.walk -> processing", filename);
      this.emit("processing", filename);

      if (this.modules.has(filename)) {
        // already processed
        continue;
      }
      const mod = new Module(filename);
      this.modules.set(filename, mod);

      try {
        const code = mod.read();
        if (code == null) {
          // not a js/ts file
          continue;
        }
        errorStage = "parse";
        const ast = mod.parse(code);
        errorStage = "getRequests";
        const requests = mod.getRequests(ast);
        errorStage = "resolve";

        for (const request of requests) {
          try {
            const target = mod.resolve(request, this._options.resolver);
            if (target.startsWith("external:")) {
              continue;
            }
            if (this._options.skip != null && this._options.skip.test(target)) {
              continue;
            }
            if (!this.modules.has(target)) {
              debugLogger.summary("Walker.walk -> queueing", target);
              this.emit("queueing", target);
              filesToProcess.push(target);
            }
          } catch (error: any) {
            reportError(error, request);
          }
        }
      } catch (error: any) {
        reportError(error);
      }

      if (this._options.onlyEntrypoint) {
        break;
      }
    }

    const ret = { errors };
    debugLogger.returns("Walker.walk ->", ret);
    return ret;
  }

  async walkAsync(): Promise<{
    errors: Array<ErrorReport>;
  }> {
    debugLogger.summary("Walker.walkAsync");

    const filesToProcess = [this.entrypoint];

    let filename: string | undefined;
    const errors: Array<ErrorReport> = [];
    let errorStage: ErrorReport["stage"] = "read";

    const reportError = (error: Error, request?: string) => {
      const report = {
        filename,
        stage: errorStage,
        request,
        error,
      };
      debugLogger.summary("error reported:", report);
      this.emit("error", report);
      errors.push(report);
    };

    while ((filename = filesToProcess.shift())) {
      debugLogger.summary("Walker.walkAsync -> processing", filename);
      this.emit("processing", filename);

      if (this.modules.has(filename)) {
        // already processed
        continue;
      }
      const mod = new Module(filename);
      this.modules.set(filename, mod);

      try {
        const code = await mod.readAsync();
        if (code == null) {
          // not a js/ts file
          continue;
        }
        errorStage = "parse";
        const ast = mod.parse(code);
        errorStage = "getRequests";
        const requests = mod.getRequests(ast);
        errorStage = "resolve";

        await runJobs(requests, async (request) => {
          try {
            const target = await mod.resolveAsync(
              request,
              this._options.resolver,
            );
            if (target.startsWith("external:")) {
              return;
            }
            if (this._options.skip != null && this._options.skip.test(target)) {
              return;
            }
            if (!this.modules.has(target)) {
              debugLogger.summary("Walker.walkAsync -> queueing", target);
              this.emit("queueing", target);
              filesToProcess.push(target);
            }
          } catch (error: any) {
            reportError(error, request);
          }
        });
      } catch (error: any) {
        reportError(error);
      }

      if (this._options.onlyEntrypoint) {
        break;
      }
    }

    const ret = { errors };
    debugLogger.returns("Walker.walkAsync ->", ret);
    return ret;
  }

  sort(): void {
    const newModules = new Map();
    const keys = Array.from(this.modules.keys());
    keys.sort();
    for (const key of keys) {
      const mod = this.modules.get(key)!;
      const newRequests = new Map();
      const reqKeys = Array.from(mod.requests.keys());
      reqKeys.sort();
      for (const reqKey of reqKeys) {
        newRequests.set(reqKey, mod.requests.get(reqKey)!);
      }
      mod.requests = newRequests;
      newModules.set(key, mod);
    }
    this.modules = newModules;
  }
}
