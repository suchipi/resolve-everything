#!/usr/bin/env node
import fs from "node:fs";
import util from "node:util";
import { run, optionalPath, optionalBoolean, optionalString } from "clefairy";
import { walkAsync, WalkOptions, ReportedError, serialize } from ".";

run(
  {
    entrypoint: optionalPath,
    resolver: optionalPath,
    fullErrors: optionalBoolean,
    skip: optionalString,
    json: optionalBoolean,
    onlyEntrypoint: optionalBoolean,
    sort: optionalBoolean,
    help: optionalBoolean,
    h: optionalBoolean,
  },
  async ({
    entrypoint,
    resolver,
    fullErrors,
    skip,
    json,
    onlyEntrypoint,
    sort,
    help,
    h,
  }) => {
    if (help || h) {
      const helpText = require("./help-text").default;
      console.log(helpText);
      return;
    }

    if (entrypoint == null) {
      throw new Error(
        `You must specify an --entrypoint. Run with --help for more info.`,
      );
    }

    if (!fs.existsSync(entrypoint.toString())) {
      throw new Error("No such file: " + entrypoint);
    }

    const walkOptions: WalkOptions = {
      sort,
      onError: (err: ReportedError) => {
        if (!fullErrors && /node_modules/.test(err.filename || "")) {
          // Don't report resolution errors under node_modules dirs because
          // they're usually not actionable.
          return;
        }

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

    if (skip) {
      if (skip === "none") {
        walkOptions.skip = null;
      } else {
        const mightBeRegExpLiteral = /^\/.*\/[gimsuy]?$/.test(skip);
        if (mightBeRegExpLiteral) {
          try {
            walkOptions.skip = eval(skip);
          } catch (err) {
            walkOptions.skip = new RegExp(skip, "gu");
          }
        } else {
          walkOptions.skip = new RegExp(skip, "gu");
        }
      }
    }

    if (resolver) {
      const exps = require(resolver.toString());
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

    const result = await walkAsync(entrypoint.toString(), walkOptions);
    let toPrint: any = serialize(result.modules);

    if (onlyEntrypoint) {
      toPrint = toPrint[entrypoint.toString()];
    }

    if (json === undefined && !process.stdout.isTTY) {
      json = true;
    }

    if (json) {
      console.log(JSON.stringify(toPrint, null, 2));
    } else {
      console.log(util.inspect(toPrint, { depth: 4, colors: true }));
    }
  },
);
