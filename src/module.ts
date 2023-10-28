import * as fs from "node:fs";
import * as path from "node:path";
import * as ee from "equivalent-exchange";
import resolve from "resolve";
import { debugLogger } from "./debug-logger";

let formatAst: typeof import("pretty-print-ast").formatAst;
if (debugLogger.ast.enabled) {
  formatAst = require("pretty-print-ast");
} else {
  formatAst = () => "";
}

export class Module {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  read(): string {
    debugLogger.summary("Module.read", this.id);
    const code = fs.readFileSync(this.id, "utf-8");
    debugLogger.fileContent(code);
    debugLogger.returns("Module.read ->", code);
    return code;
  }

  parse(code: string): ee.types.File {
    debugLogger.summary("Module.parse", this.id);
    debugLogger.args("Module.parse", code);
    const ast = ee.codeToAst(code, { fileName: this.id });
    debugLogger.ast(formatAst(ast, { color: true }));
    debugLogger.returns("Module.parse ->", ast);
    return ast;
  }

  getRequests(ast: ee.types.File): Array<string> {
    debugLogger.summary("Module.getRequests", this.id);
    debugLogger.args("Module.getRequests", ast);

    const requests: Array<string> = [];

    ee.traverse(ast, {
      ImportDeclaration(nodePath) {
        debugLogger.traverse("found ImportDeclaration", nodePath.node);
        requests.push(nodePath.node.source.value);
      },
      ExportAllDeclaration(nodePath) {
        debugLogger.traverse("found ExportAllDeclaration", nodePath.node);
        requests.push(nodePath.node.source.value);
      },
      ExportNamedDeclaration(nodePath) {
        debugLogger.traverse("found ExportNamedDeclaration", nodePath.node);
        const source = nodePath.node.source;
        if (source != null) {
          debugLogger.traverse(
            "previously-mentioned ExportNamedDeclaration had a source!",
          );
          requests.push(source.value);
        }
      },
      CallExpression(nodePath) {
        const node = nodePath.node;
        if (
          ee.hasShape(node, {
            callee: {
              type: "Identifier",
              name: "require",
            },
            arguments: {
              0: {
                type: "StringLiteral",
              },
            },
          })
        ) {
          debugLogger.traverse("found require", nodePath.node);
          requests.push((node.arguments[0] as any).value);
        }
      },
    });

    debugLogger.returns("Module.getRequests ->", requests);
    return requests;
  }

  resolve(request: string): string {
    debugLogger.summary("Module.resolve", this.id, request);
    debugLogger.args("Module.resolve", request);

    const resolved = resolve.sync(request, {
      basedir: path.dirname(this.id),
      extensions: [
        ".mtsx",
        ".mts",
        ".mjsx",
        ".mjs",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".ctsx",
        ".cts",
        ".cjsx",
        ".cjs",
        ".json",
        ".node",
      ],
    });

    debugLogger.returns("Module.resolve ->", resolved);
    return resolved;
  }
}
