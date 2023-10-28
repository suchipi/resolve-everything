import * as path from "node:path";
import { EventEmitter } from "node:events";
import { Module } from "./module";
import { debugLogger } from "./debug-logger";
import type { ReportedError, ResolverFunction } from "./types";

export class Walker extends EventEmitter {
  entrypoint: string;
  modules: Map<string, Module>;

  private _resolver: ResolverFunction;

  constructor(entrypoint: string, resolver: ResolverFunction) {
    super();

    this._resolver = resolver;

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
    errors: Array<ReportedError>;
  } {
    debugLogger.summary("Walker.walk");

    const filesToProcess = [this.entrypoint];

    let filename: string | undefined;
    const errors: Array<ReportedError> = [];
    let errorStage: ReportedError["stage"] = "read";
    let errorRequest: string | undefined = undefined;

    const report = (error: Error) => {
      const errorReport = {
        stage: errorStage,
        filename,
        request: errorRequest,
        error,
      };
      debugLogger.summary("error reported:", errorReport);
      this.emit("error", errorReport);
      errors.push(errorReport);
    };

    while ((filename = filesToProcess.shift())) {
      debugLogger.summary("Walker.walk -> processing", filename);
      this.emit("processing", filename);

      if (this.modules.has(filename)) {
        // already processed
        continue;
      }
      const mod = new Module(filename, this._resolver);
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
            const target = mod.resolve(request);
            if (target.startsWith("external:")) {
              continue;
            }
            if (!this.modules.has(target)) {
              debugLogger.summary("Walker.walk -> queueing", target);
              this.emit("queueing", target);
              filesToProcess.push(target);
            }
          } catch (error: any) {
            report(error);
          }
        }
        errorRequest = undefined;
      } catch (error: any) {
        report(error);
      }
    }

    const ret = { errors };
    debugLogger.returns("Walker.walk ->", ret);
    return ret;
  }
}
