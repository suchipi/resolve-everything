import kleur from "kleur";

const h1 = kleur.bgBlue;
const h2 = kleur.blue().bold;

const opt = kleur.green;

const jsonSample = `{
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
}`
  .replaceAll(/\[\]\{\}/g, (str) => kleur.bold(str))
  .replaceAll(/<[^>]+>/g, (str) => kleur.magenta(str))
  .replaceAll(/"([^"]+)"/g, (str, contents) =>
    kleur.green(`"` + kleur.bold(contents) + `"`),
  )
  .replaceAll(/\/\/.*\n/g, (str) => kleur.dim(str))
  .replaceAll("...", kleur.dim("..."));

export default `
${h1("# resolve-everything")}

resolve-everything is a tool which walks through the module dependency tree of
a JavaScript/TypeScript project and gives you data about all the relationships.

${h2("## Usage")}

$ resolve-everything --entrypoint ./some-file.js

${h2("## Options")}

${opt("--entrypoint")} (path):
  The place to start walking the module graph.
  This is the only required option.

${opt("--skip")} (RegExp|"none"):
  Which files not to parse and find requires/imports in.
  Defaults to /node_modules/. Specify "none" to parse everything.

${opt("--json")} (boolean):
  Whether to output json or human-readable data.
  Default value varies depending on if stdout is a tty.

${opt("--only-entrypoint")} (boolean):
  If true, only the imports/requires in the entrypoint file will be resolved,
  and no other files will be walked over.


${opt("--sort")} (boolean):
  If true, results will be sorted lexicographically. If you want results to be
  stable, you should enable this, as the order is non-deterministic otherwise
  (because we crawl the filesystem concurrently).

${opt("--resolver")} (path):
  Module which exports a JS function that locates modules. Uses a resolver
  format compatible with https://github.com/suchipi/kame, namely:

  export const resolve: {
    (id: string, fromFilePath: string): string;
    async?: (id: string, fromFilePath: string) => Promise<string>;
  }

  The 'async' property is optional; if not present, the normal synchronous
  resolver will be used.

${opt("--full-errors")} (boolean):
  If reading, parsing, traversal, or resolution errors occur, print as much
  error information as possible.

${h2("## Output")}

The program prints JSON shaped like:

${jsonSample}

${kleur.bold("resolve-everything")} was made with ${kleur.red(
  "<3",
)} by Lily Skye. Though it likely can't resolve
*${kleur.italic("all")}* of your problems, maybe it can resolve one of them.
`.trim();
