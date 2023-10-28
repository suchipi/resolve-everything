import * as path from "node:path";
import { EventEmitter } from "node:events";
import { Module } from "./module";
import { debugLogger } from "./debug-logger";
import type { ErrorReport, ResolverFunction } from "./types";

export type WalkerOptions = {
  resolver: ResolverFunction;
  ignore: RegExp | null;
  flat: boolean;
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
    let errorRequest: string | undefined = undefined;

    const reportError = (error: Error) => {
      const report = {
        filename,
        stage: errorStage,
        request: errorRequest,
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

        errorRequest = undefined;
        for (const request of requests) {
          errorRequest = request;
          try {
            const target = mod.resolve(request, this._options.resolver);
            if (target.startsWith("external:")) {
              continue;
            }
            if (
              this._options.ignore != null &&
              this._options.ignore.test(target)
            ) {
              continue;
            }
            if (!this.modules.has(target)) {
              debugLogger.summary("Walker.walk -> queueing", target);
              this.emit("queueing", target);
              filesToProcess.push(target);
            }
          } catch (error: any) {
            reportError(error);
          }
        }
        errorRequest = undefined;
      } catch (error: any) {
        reportError(error);
      }

      if (this._options.flat) {
        break;
      }
    }

    const ret = { errors };
    debugLogger.returns("Walker.walk ->", ret);
    return ret;
  }
}
