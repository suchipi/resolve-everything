import { expect, test } from "vitest";
import { rootDir, cliPath, cleanRunResult } from "./test-helpers";
import { spawn } from "first-base";

// NOTE: we always pass option `--sort` in these tests so that the snapshots
// are stable.

test("sample cli run", async () => {
  const run = spawn("node", [
    cliPath,
    "--entrypoint",
    rootDir("src/walk.ts"),
    "--sort",
  ]);
  await run.completion;
  expect(cleanRunResult(run.result)).toMatchInlineSnapshot(`
    {
      "code": 0,
      "error": false,
      "stderr": "",
      "stdout": "{
      "<rootDir>/src/debug-logger.ts": {
        "id": "<rootDir>/src/debug-logger.ts",
        "requests": {
          "debug": "<rootDir>/node_modules/debug/src/index.js"
        },
        "dependencies": [
          "<rootDir>/node_modules/debug/src/index.js"
        ]
      },
      "<rootDir>/src/default-resolver.ts": {
        "id": "<rootDir>/src/default-resolver.ts",
        "requests": {
          "node:module": "external:node:module",
          "node:path": "external:node:path",
          "node:util": "external:node:util",
          "resolve": "<rootDir>/node_modules/resolve/index.js"
        },
        "dependencies": [
          "external:node:module",
          "external:node:path",
          "external:node:util",
          "<rootDir>/node_modules/resolve/index.js"
        ]
      },
      "<rootDir>/src/module.ts": {
        "id": "<rootDir>/src/module.ts",
        "requests": {
          "./debug-logger": "<rootDir>/src/debug-logger.ts",
          "./types": "<rootDir>/src/types.ts",
          "equivalent-exchange": "<rootDir>/node_modules/equivalent-exchange/dist/index.js",
          "node:fs": "external:node:fs",
          "pretty-print-ast": "<rootDir>/node_modules/pretty-print-ast/dist/index.js"
        },
        "dependencies": [
          "<rootDir>/src/debug-logger.ts",
          "<rootDir>/src/types.ts",
          "<rootDir>/node_modules/equivalent-exchange/dist/index.js",
          "external:node:fs",
          "<rootDir>/node_modules/pretty-print-ast/dist/index.js"
        ]
      },
      "<rootDir>/src/types.ts": {
        "id": "<rootDir>/src/types.ts",
        "requests": {},
        "dependencies": []
      },
      "<rootDir>/src/walk.ts": {
        "id": "<rootDir>/src/walk.ts",
        "requests": {
          "./debug-logger": "<rootDir>/src/debug-logger.ts",
          "./default-resolver": "<rootDir>/src/default-resolver.ts",
          "./module": "<rootDir>/src/module.ts",
          "./types": "<rootDir>/src/types.ts",
          "./walker": "<rootDir>/src/walker.ts",
          "node:path": "external:node:path"
        },
        "dependencies": [
          "<rootDir>/src/debug-logger.ts",
          "<rootDir>/src/default-resolver.ts",
          "<rootDir>/src/module.ts",
          "<rootDir>/src/types.ts",
          "<rootDir>/src/walker.ts",
          "external:node:path"
        ]
      },
      "<rootDir>/src/walker.ts": {
        "id": "<rootDir>/src/walker.ts",
        "requests": {
          "./debug-logger": "<rootDir>/src/debug-logger.ts",
          "./module": "<rootDir>/src/module.ts",
          "./types": "<rootDir>/src/types.ts",
          "node:events": "external:node:events",
          "node:path": "external:node:path",
          "parallel-park": "<rootDir>/node_modules/parallel-park/dist/index.js"
        },
        "dependencies": [
          "<rootDir>/src/debug-logger.ts",
          "<rootDir>/src/module.ts",
          "<rootDir>/src/types.ts",
          "external:node:events",
          "external:node:path",
          "<rootDir>/node_modules/parallel-park/dist/index.js"
        ]
      }
    }
    ",
    }
  `);
});

test("help", async () => {
  const run1 = spawn("node", [cliPath, "--help"]);
  await run1.completion;
  expect(cleanRunResult(run1.result)).toMatchInlineSnapshot(`
    {
      "code": 0,
      "error": false,
      "stderr": "",
      "stdout": "# resolve-everything

    resolve-everything is a tool which walks through the module dependency tree of
    a JavaScript/TypeScript project and gives you data about all the relationships.

    ## Usage

    $ resolve-everything --entrypoint ./some-file.js

    ## Options

    --entrypoint (path):
      The place to start walking the module graph.
      This is the only required option.

    --skip (RegExp|"none"):
      Which files not to parse and find requires/imports in.
      Defaults to /node_modules/. Specify "none" to parse everything.

    --json (boolean):
      Whether to output json or human-readable data.
      Default value varies depending on if stdout is a tty.

    --only-entrypoint (boolean):
      If true, only the imports/requires in the entrypoint file will be resolved,
      and no other files will be walked over.


    --sort (boolean):
      If true, results will be sorted lexicographically. If you want results to be
      stable, you should enable this, as the order is non-deterministic otherwise
      (because we crawl the filesystem concurrently).

    --resolver (path):
      Module which exports a JS function that locates modules. Uses a resolver
      format compatible with https://github.com/suchipi/kame, namely:

      export const resolve: {
        (id: string, fromFilePath: string): string;
        async?: (id: string, fromFilePath: string) => Promise<string>;
      }

      The 'async' property is optional; if not present, the normal synchronous
      resolver will be used.

    --full-errors (boolean):
      If reading, parsing, traversal, or resolution errors occur, print as much
      error information as possible.

    ## Output

    The program prints JSON shaped like:

    {
      "<full-path-to-some-file.js>": {
        "id": "<full-path-to-some-file.js>",
        "requests": {
          // key is require/import string that appeared in the source code
          // value is full path to the file that refers to
          "./something": "<full-path-to-something>",
          "react": "<full-path-to-react>",
          "../somewhere/yeah": "<full-path-to-yeah>",
        },
        "dependencies": [
          "<full-path-to-something>",
          "<full-path-to-react>",
          "<full-path-to-yeah>",
        ]
      },
      "<full-path-to-something>": { ... },
      "<full-path-to-yeah>": { ... },
      ...
    }

    resolve-everything was made with <3 by Lily Skye. Though it likely can't resolve
    *all* of your problems, maybe it can resolve one of them.
    ",
    }
  `);

  const run2 = spawn("node", [cliPath, "-h"]);
  await run2.completion;
  expect(run2.result).toEqual(run1.result);
});
