import * as fs from "node:fs";
import * as ee from "equivalent-exchange";
import { debugLogger } from "./debug-logger";
import type { ResolverFunction } from "./types";

let formatAst: typeof import("pretty-print-ast").formatAst;
if (debugLogger.ast.enabled) {
  formatAst = require("pretty-print-ast");
} else {
  formatAst = () => "";
}

export class Module {
  id: string;
  requests = new Map<string, string>();

  constructor(id: string) {
    this.id = id;
  }

  read(): string | null {
    debugLogger.summary("Module.read", this.id);

    if (!/\.[cm]?[tj]sx?$/.test(this.id)) {
      debugLogger.summary("doesn't appear to be js/ts:", this.id);
      debugLogger.returns("Module.read -> null");
      return null;
    }

    const code = fs.readFileSync(this.id, "utf-8");
    debugLogger.fileContent(code);
    debugLogger.returns("Module.read ->", code);
    return code;
  }

  async readAsync(): Promise<string | null> {
    debugLogger.summary("Module.readAsync", this.id);

    if (!/\.[cm]?[tj]sx?$/.test(this.id)) {
      debugLogger.summary("doesn't appear to be js/ts:", this.id);
      debugLogger.returns("Module.readAsync -> null");
      return null;
    }

    const code = await fs.promises.readFile(this.id, "utf-8");
    debugLogger.fileContent(code);
    debugLogger.returns("Module.readAsync ->", code);
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
          debugLogger.traverse("found require", node);
          requests.push((node.arguments[0] as any).value);
        }

        if (
          ee.hasShape(node, {
            callee: {
              type: "Import",
            },
            arguments: {
              0: {
                type: "StringLiteral",
              },
            },
          })
        ) {
          debugLogger.traverse("found dynamic import", node);
          requests.push((node.arguments[0] as any).value);
        }
      },
    });

    debugLogger.returns("Module.getRequests ->", requests);
    return requests;
  }

  resolve(request: string, resolver: ResolverFunction): string {
    debugLogger.summary("Module.resolve", this.id, request);
    debugLogger.args("Module.resolve", request, resolver);

    const resolved = resolver(request, this.id);

    this.requests.set(request, resolved);

    debugLogger.returns("Module.resolve ->", resolved);
    return resolved;
  }

  async resolveAsync(
    request: string,
    resolver: ResolverFunction,
  ): Promise<string> {
    debugLogger.summary("Module.resolveAsync", this.id, request);
    debugLogger.args("Module.resolveAsync", request, resolver);

    let resolved: string;
    if (resolver.async == null) {
      debugLogger.summary(
        "Module.resolveAsync falling back to sync as user-provided resolver doesn't have an 'async' property",
      );

      resolved = resolver(request, this.id);
    } else {
      resolved = await resolver.async(request, this.id);
    }

    this.requests.set(request, resolved);

    debugLogger.returns("Module.resolveAsync ->", resolved);
    return resolved;
  }

  get dependencies() {
    return new Set(this.requests.values());
  }
}
