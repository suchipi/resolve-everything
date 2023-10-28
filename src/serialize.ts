import type { Module } from "./module";

export type SerializedModules = {
  [filename: string]: {
    id: string;
    requests: {
      [request: string]: string;
    };
    dependencies: Array<string>;
  };
};

export function serialize(modules: Map<string, Module>): SerializedModules {
  const result: SerializedModules = {};

  for (const [id, mod] of modules) {
    result[id] = {
      id,
      requests: {},
      dependencies: [],
    };
    for (const [request, resolved] of mod.requests) {
      result[id].requests[request] = resolved;
      result[id].dependencies.push(resolved);
    }
  }

  return result;
}
