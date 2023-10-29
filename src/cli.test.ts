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
      \\"<rootDir>/src/debug-logger.ts\\": {
        \\"id\\": \\"<rootDir>/src/debug-logger.ts\\",
        \\"requests\\": {
          \\"debug\\": \\"<rootDir>/node_modules/debug/src/index.js\\"
        },
        \\"dependencies\\": [
          \\"<rootDir>/node_modules/debug/src/index.js\\"
        ]
      },
      \\"<rootDir>/src/default-resolver.ts\\": {
        \\"id\\": \\"<rootDir>/src/default-resolver.ts\\",
        \\"requests\\": {
          \\"node:module\\": \\"external:node:module\\",
          \\"node:path\\": \\"external:node:path\\",
          \\"node:util\\": \\"external:node:util\\",
          \\"resolve\\": \\"<rootDir>/node_modules/resolve/index.js\\"
        },
        \\"dependencies\\": [
          \\"external:node:module\\",
          \\"external:node:path\\",
          \\"external:node:util\\",
          \\"<rootDir>/node_modules/resolve/index.js\\"
        ]
      },
      \\"<rootDir>/src/module.ts\\": {
        \\"id\\": \\"<rootDir>/src/module.ts\\",
        \\"requests\\": {
          \\"./debug-logger\\": \\"<rootDir>/src/debug-logger.ts\\",
          \\"./types\\": \\"<rootDir>/src/types.ts\\",
          \\"equivalent-exchange\\": \\"<rootDir>/node_modules/equivalent-exchange/dist/index.js\\",
          \\"node:fs\\": \\"external:node:fs\\",
          \\"pretty-print-ast\\": \\"<rootDir>/node_modules/pretty-print-ast/dist/index.js\\"
        },
        \\"dependencies\\": [
          \\"<rootDir>/src/debug-logger.ts\\",
          \\"<rootDir>/src/types.ts\\",
          \\"<rootDir>/node_modules/equivalent-exchange/dist/index.js\\",
          \\"external:node:fs\\",
          \\"<rootDir>/node_modules/pretty-print-ast/dist/index.js\\"
        ]
      },
      \\"<rootDir>/src/types.ts\\": {
        \\"id\\": \\"<rootDir>/src/types.ts\\",
        \\"requests\\": {},
        \\"dependencies\\": []
      },
      \\"<rootDir>/src/walk.ts\\": {
        \\"id\\": \\"<rootDir>/src/walk.ts\\",
        \\"requests\\": {
          \\"./debug-logger\\": \\"<rootDir>/src/debug-logger.ts\\",
          \\"./default-resolver\\": \\"<rootDir>/src/default-resolver.ts\\",
          \\"./module\\": \\"<rootDir>/src/module.ts\\",
          \\"./types\\": \\"<rootDir>/src/types.ts\\",
          \\"./walker\\": \\"<rootDir>/src/walker.ts\\",
          \\"node:path\\": \\"external:node:path\\"
        },
        \\"dependencies\\": [
          \\"<rootDir>/src/debug-logger.ts\\",
          \\"<rootDir>/src/default-resolver.ts\\",
          \\"<rootDir>/src/module.ts\\",
          \\"<rootDir>/src/types.ts\\",
          \\"<rootDir>/src/walker.ts\\",
          \\"external:node:path\\"
        ]
      },
      \\"<rootDir>/src/walker.ts\\": {
        \\"id\\": \\"<rootDir>/src/walker.ts\\",
        \\"requests\\": {
          \\"./debug-logger\\": \\"<rootDir>/src/debug-logger.ts\\",
          \\"./module\\": \\"<rootDir>/src/module.ts\\",
          \\"./types\\": \\"<rootDir>/src/types.ts\\",
          \\"node:events\\": \\"external:node:events\\",
          \\"node:path\\": \\"external:node:path\\",
          \\"parallel-park\\": \\"<rootDir>/node_modules/parallel-park/dist/index.js\\"
        },
        \\"dependencies\\": [
          \\"<rootDir>/src/debug-logger.ts\\",
          \\"<rootDir>/src/module.ts\\",
          \\"<rootDir>/src/types.ts\\",
          \\"external:node:events\\",
          \\"external:node:path\\",
          \\"<rootDir>/node_modules/parallel-park/dist/index.js\\"
        ]
      }
    }
    ",
    }
  `);
});
