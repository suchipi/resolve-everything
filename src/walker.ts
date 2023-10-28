import * as path from "node:path";
import { EventEmitter } from "node:events";
import { Module } from "./module";
import { debugLogger } from "./debug-logger";

export type WalkerError = {
  filename: string;
  stage: "read" | "parse" | "getRequests" | "resolve";
  error: Error;
};

export class Walker extends EventEmitter {
  entrypoint: string;
  modules: Map<string, Module>;

  constructor(entrypoint: string) {
    super();

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
    errors: Array<WalkerError>;
  } {
    debugLogger.summary("Walker.walk");

    const filesToProcess = [this.entrypoint];
    const errors: Array<WalkerError> = [];

    let filename: string | undefined;
    while ((filename = filesToProcess.shift())) {
      debugLogger.summary("Walker.walk -> processing", filename);
      this.emit("processing", filename);

      if (this.modules.has(filename)) {
        // already processed
        continue;
      }
      const mod = new Module(filename);
      this.modules.set(filename, mod);

      let errorStage: WalkerError["stage"] = "read";
      try {
        const code = mod.read();
        errorStage = "parse";
        const ast = mod.parse(code);
        errorStage = "getRequests";
        const requests = mod.getRequests(ast);
        errorStage = "resolve";

        for (const request of requests) {
          const target = mod.resolve(request);
          if (!this.modules.has(target)) {
            debugLogger.summary("Walker.walk -> queueing", target);
            this.emit("queueing", target);
            filesToProcess.push(target);
          }
        }
      } catch (error: any) {
        const errorReport = {
          stage: errorStage,
          filename,
          error,
        };
        debugLogger.summary(
          "error while processing",
          filename,
          "in stage",
          errorStage,
        );
        this.emit("error", errorReport);

        errors.push(errorReport);
      }
    }

    const ret = { errors };
    debugLogger.returns("Walker.walk ->", ret);
    return ret;
  }
}
