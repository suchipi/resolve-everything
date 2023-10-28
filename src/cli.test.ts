import { expect, test } from "vitest";
import { rootDir, cliPath, cleanRunResult } from "./test-helpers";
import { spawn } from "first-base";

test("cli run", async () => {
  const run = spawn("node", [cliPath, "--entrypoint", rootDir("src/walk.ts")]);
  await run.completion;
  expect(cleanRunResult(run.result)).toMatchInlineSnapshot(`
    {
      "code": 0,
      "error": false,
      "stderr": "",
      "stdout": "{
      \\"<rootDir>/src/walk.ts\\": {
        \\"id\\": \\"<rootDir>/src/walk.ts\\",
        \\"requests\\": {
          \\"node:path\\": \\"external:node:path\\",
          \\"./walker\\": \\"<rootDir>/src/walker.ts\\",
          \\"./module\\": \\"<rootDir>/src/module.ts\\",
          \\"./debug-logger\\": \\"<rootDir>/src/debug-logger.ts\\",
          \\"./types\\": \\"<rootDir>/src/types.ts\\",
          \\"./default-resolver\\": \\"<rootDir>/src/default-resolver.ts\\"
        },
        \\"dependencies\\": [
          \\"external:node:path\\",
          \\"<rootDir>/src/walker.ts\\",
          \\"<rootDir>/src/module.ts\\",
          \\"<rootDir>/src/debug-logger.ts\\",
          \\"<rootDir>/src/types.ts\\",
          \\"<rootDir>/src/default-resolver.ts\\"
        ]
      },
      \\"<rootDir>/src/walker.ts\\": {
        \\"id\\": \\"<rootDir>/src/walker.ts\\",
        \\"requests\\": {
          \\"node:path\\": \\"external:node:path\\",
          \\"node:events\\": \\"external:node:events\\",
          \\"./module\\": \\"<rootDir>/src/module.ts\\",
          \\"./debug-logger\\": \\"<rootDir>/src/debug-logger.ts\\",
          \\"./types\\": \\"<rootDir>/src/types.ts\\"
        },
        \\"dependencies\\": [
          \\"external:node:path\\",
          \\"external:node:events\\",
          \\"<rootDir>/src/module.ts\\",
          \\"<rootDir>/src/debug-logger.ts\\",
          \\"<rootDir>/src/types.ts\\"
        ]
      },
      \\"<rootDir>/src/module.ts\\": {
        \\"id\\": \\"<rootDir>/src/module.ts\\",
        \\"requests\\": {
          \\"node:fs\\": \\"external:node:fs\\",
          \\"equivalent-exchange\\": \\"<rootDir>/node_modules/equivalent-exchange/dist/index.js\\",
          \\"./debug-logger\\": \\"<rootDir>/src/debug-logger.ts\\",
          \\"./types\\": \\"<rootDir>/src/types.ts\\",
          \\"pretty-print-ast\\": \\"<rootDir>/node_modules/pretty-print-ast/dist/index.js\\"
        },
        \\"dependencies\\": [
          \\"external:node:fs\\",
          \\"<rootDir>/node_modules/equivalent-exchange/dist/index.js\\",
          \\"<rootDir>/src/debug-logger.ts\\",
          \\"<rootDir>/src/types.ts\\",
          \\"<rootDir>/node_modules/pretty-print-ast/dist/index.js\\"
        ]
      },
      \\"<rootDir>/src/debug-logger.ts\\": {
        \\"id\\": \\"<rootDir>/src/debug-logger.ts\\",
        \\"requests\\": {
          \\"debug\\": \\"<rootDir>/node_modules/debug/src/index.js\\"
        },
        \\"dependencies\\": [
          \\"<rootDir>/node_modules/debug/src/index.js\\"
        ]
      },
      \\"<rootDir>/src/types.ts\\": {
        \\"id\\": \\"<rootDir>/src/types.ts\\",
        \\"requests\\": {},
        \\"dependencies\\": []
      },
      \\"<rootDir>/src/default-resolver.ts\\": {
        \\"id\\": \\"<rootDir>/src/default-resolver.ts\\",
        \\"requests\\": {
          \\"node:module\\": \\"external:node:module\\",
          \\"node:path\\": \\"external:node:path\\",
          \\"resolve\\": \\"<rootDir>/node_modules/resolve/index.js\\"
        },
        \\"dependencies\\": [
          \\"external:node:module\\",
          \\"external:node:path\\",
          \\"<rootDir>/node_modules/resolve/index.js\\"
        ]
      }
    }
    ",
    }
  `);
});
