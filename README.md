# resolve-everything

`resolve-everything` is a tool which walks through the module dependency tree of a JavaScript/TypeScript project and gives you data about all the relationships.

## Usage

### Command-Line Interface (CLI)

```sh
$ npx resolve-everything --entrypoint ./some-file.js
```

which outputs JSON shaped like:

```jsonc
{
  "<full-path-to-some-file.js>": {
    "id": "<full-path-to-some-file.js>",
    "requests": {
      // key is "require/import string that appeared in the source code"
      // value is "full path to the file that refers to"
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
```

#### Options:

- `--entrypoint` (path): The place to start walking the module graph. This is the only required option.

- `--skip` (RegExp|"none"): Which files not to parse and find requires/imports in. Defaults to `/node_modules/`. Specify "none" to parse everything.

- `--json` (boolean): whether to output json or human-readable data. default value varies depending on if stdout is a tty.

- `--only-entrypoint` (boolean): if true, only the imports/requires in the entrypoint file will be resolved, and no other files will be walked over.

- `--sort` (boolean): if true, results will be sorted lexicographically. If you want results to be stable, you should enable this, as the order is non-deterministic otherwise (because we crawl the filesystem concurrently).

- `--resolver` (path): module which exports a JS function that locates modules. Uses a resolver format compatible with [kame](https://github.com/suchipi/kame#config-hell), but with an added optional `async` property.

- `--full-errors` (boolean): If reading, parsing, traversal, or resolution errors occur, print as much error information as possible.

### Node API

```ts
import { walk, walkAsync } from "resolve-everything";

const entrypoint = "/home/someone/some-file.js";
const { errors, modules } = walk(entrypoint /* , options */);
// or you could do: await walkAsync(entrypoint, /* options */);

// modules is a Map<string, { id: string, requests: Map<string, string> }>
```

#### Options

```ts
export type WalkOptions = {
  /**
   * Which files not to parse and find requires/imports in.
   *
   * Defaults to `/node_modules/`.
   * Specify `null` to include node_modules.
   */
  skip?: RegExp | null;

  /**
   * If true, only the imports/requires in the entrypoint file will be
   * resolved, and no other files will be walked over.
   */
  onlyEntrypoint?: boolean;

  /**
   * If true, results will be sorted lexicographically. If you want results to
   * be stable when using `walkSync`, you should enable this, as the order is
   * non-deterministic otherwise (because we walk the filesystem concurrently).
   */
  sort?: boolean;

  /**
   * A function which translates the string-part of an import/require into the
   * absolute path to the file on disk, OR, if there is no file for that module
   * (ie. it's a node builtin), a string starting with "external:".
   *
   * The 'async' property is optional and will only be used by `walkAsync`.
   * If not present, the normal synchronous resolver will be used.
   */
  resolver?: ((id: string, fromFilePath: string) => string) & {
    async?: (id: string, fromFilePath: string) => Promise<string>;
  };
};
```

See the included TypeScript types for more information.

## License

MIT
