import Module from "node:module";
import path from "node:path";
import util from "node:util";
import resolve from "resolve";

if (!Array.isArray(Module.builtinModules)) {
  throw new Error("your node version seriously way too old bruh");
}

const allBuiltins = new Set(Module.builtinModules);

const resolveAsync: (id: string, opts: resolve.AsyncOpts) => Promise<string> =
  util.promisify(resolve as any);

// This is (more or less) a direct copy-paste of kame's default resolver, with
// async added.
//
// Part of why we copy-paste it instead of depending on it directly is because
// kame has a LOT of deps and we just need this piece
//
// https://github.com/suchipi/kame/blob/ae317caf325d5cbe4925fe30273159b6c04651a6/src/default-resolver.ts#L10
export const defaultResolver = Object.assign(
  function defaultResolver(id: string, fromFilePath: string): string {
    if (id.includes(":") && !id.startsWith("file:")) {
      return "external:" + id;
    }

    if (allBuiltins.has(id.split("/")[0])) {
      return "external:" + id;
    }

    const result = resolve.sync(id, {
      basedir: path.dirname(fromFilePath),
      preserveSymlinks: false,
      extensions: [
        ".js",
        ".json",
        ".mjs",
        ".jsx",
        ".ts",
        ".tsx",
        ".node",
        ".wasm",
      ],
    });

    if (result.endsWith(".node") || result.endsWith(".wasm")) {
      return "external:" + result;
    }

    return result;
  },
  {
    async: async function defaultResolverAsync(
      id: string,
      fromFilePath: string,
    ) {
      if (id.includes(":") && !id.startsWith("file:")) {
        return "external:" + id;
      }

      if (allBuiltins.has(id.split("/")[0])) {
        return "external:" + id;
      }

      const result = await resolveAsync(id, {
        basedir: path.dirname(fromFilePath),
        preserveSymlinks: false,
        extensions: [
          ".js",
          ".json",
          ".mjs",
          ".jsx",
          ".ts",
          ".tsx",
          ".node",
          ".wasm",
        ],
      });

      if (result.endsWith(".node") || result.endsWith(".wasm")) {
        return "external:" + result;
      }

      return result;
    },
  },
);
