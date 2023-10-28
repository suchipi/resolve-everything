#!/usr/bin/env node
import fs from "node:fs";
import { run, requiredPath, optionalPath, optionalBoolean } from "clefairy";
import { walk, WalkOptions, ReportedError } from ".";

run(
  {
    entrypoint: requiredPath,
    resolver: optionalPath,
    fullErrors: optionalBoolean,
  },
  async ({ entrypoint, resolver, fullErrors }) => {
    if (!fs.existsSync(entrypoint)) {
      throw new Error("No such file: " + entrypoint);
    }

    const walkOptions: WalkOptions = {
      onError: (err: ReportedError) => {
        let message = `Failed to ${err.stage} `;
        if (err.request) {
          message += JSON.stringify(err.request) + " ";
        }
        message += `for ${JSON.stringify(err.filename)}`;
        console.warn(message);

        if (fullErrors) {
          console.error(err.error);
        }
      },
    };

    if (resolver) {
      const exps = require(resolver);
      if (typeof exps === "function") {
        walkOptions.resolver = exps;
      } else if (typeof exps === "object" && exps != null) {
        if (typeof exps.resolve === "function") {
          walkOptions.resolver = exps.resolve;
        } else if (typeof exps.default === "function") {
          walkOptions.resolver = exps.default;
        } else {
          throw new Error(
            `Resolver at ${JSON.stringify(
              resolver,
            )} didn't export a 'resolve' function.`,
          );
        }
      } else {
        throw new Error(
          `Resolver at ${JSON.stringify(
            resolver,
          )} didn't export a 'resolve' function.`,
        );
      }
    }

    const result = walk(entrypoint, walkOptions);

    console.log({ result });
  },
);
