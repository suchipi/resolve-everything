import { expect, test } from "vitest";
import { walkAsync } from "./index";
import { rootDir, inspectAndClean } from "./test-helpers";

// NOTE: we always pass option `sort: true` in these tests so that
// the snapshots are stable. We don't have to do that in the sync tests
// because the walk order is deterministic when resolution isn't parallel.

test("sample walk", async () => {
  const entrypoint = rootDir("src/index.ts");

  const result = await walkAsync(entrypoint, { sort: true });

  expect(inspectAndClean(result)).toMatchInlineSnapshot(`
    "{
      errors: [],
      modules: Map(8) {
        '<rootDir>/src/debug-logger.ts' => Module {
          requests: Map(1) {
            'debug' => '<rootDir>/node_modules/debug/src/index.js'
          },
          id: '<rootDir>/src/debug-logger.ts'
        },
        '<rootDir>/src/default-resolver.ts' => Module {
          requests: Map(4) {
            'node:module' => 'external:node:module',
            'node:path' => 'external:node:path',
            'node:util' => 'external:node:util',
            'resolve' => '<rootDir>/node_modules/resolve/index.js'
          },
          id: '<rootDir>/src/default-resolver.ts'
        },
        '<rootDir>/src/index.ts' => Module {
          requests: Map(6) {
            './default-resolver' => '<rootDir>/src/default-resolver.ts',
            './module' => '<rootDir>/src/module.ts',
            './serialize' => '<rootDir>/src/serialize.ts',
            './types' => '<rootDir>/src/types.ts',
            './walk' => '<rootDir>/src/walk.ts',
            './walker' => '<rootDir>/src/walker.ts'
          },
          id: '<rootDir>/src/index.ts'
        },
        '<rootDir>/src/module.ts' => Module {
          requests: Map(5) {
            './debug-logger' => '<rootDir>/src/debug-logger.ts',
            './types' => '<rootDir>/src/types.ts',
            'equivalent-exchange' => '<rootDir>/node_modules/equivalent-exchange/dist/index.js',
            'node:fs' => 'external:node:fs',
            'pretty-print-ast' => '<rootDir>/node_modules/pretty-print-ast/dist/index.js'
          },
          id: '<rootDir>/src/module.ts'
        },
        '<rootDir>/src/serialize.ts' => Module {
          requests: Map(1) {
            './module' => '<rootDir>/src/module.ts'
          },
          id: '<rootDir>/src/serialize.ts'
        },
        '<rootDir>/src/types.ts' => Module {
          requests: Map(0) {},
          id: '<rootDir>/src/types.ts'
        },
        '<rootDir>/src/walk.ts' => Module {
          requests: Map(6) {
            './debug-logger' => '<rootDir>/src/debug-logger.ts',
            './default-resolver' => '<rootDir>/src/default-resolver.ts',
            './module' => '<rootDir>/src/module.ts',
            './types' => '<rootDir>/src/types.ts',
            './walker' => '<rootDir>/src/walker.ts',
            'node:path' => 'external:node:path'
          },
          id: '<rootDir>/src/walk.ts'
        },
        '<rootDir>/src/walker.ts' => Module {
          requests: Map(6) {
            './debug-logger' => '<rootDir>/src/debug-logger.ts',
            './module' => '<rootDir>/src/module.ts',
            './types' => '<rootDir>/src/types.ts',
            'node:events' => 'external:node:events',
            'node:path' => 'external:node:path',
            'parallel-park' => '<rootDir>/node_modules/parallel-park/dist/index.js'
          },
          id: '<rootDir>/src/walker.ts'
        }
      }
    }"
  `);
});

test("including node_modules via skip: null", async () => {
  const entrypoint = rootDir("src/index.ts");

  const result = await walkAsync(entrypoint, { skip: null, sort: true });

  expect(inspectAndClean(result)).toMatchInlineSnapshot(`
    "{
      errors: [],
      modules: Map(263) {
        '<rootDir>/node_modules/@babel/code-frame/lib/index.js' => Module {
          requests: Map(2) {
            '@babel/highlight' => '<rootDir>/node_modules/@babel/highlight/lib/index.js',
            'picocolors' => '<rootDir>/node_modules/picocolors/picocolors.js'
          },
          id: '<rootDir>/node_modules/@babel/code-frame/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/buffer.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/generator/lib/buffer.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/base.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/base.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/classes.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/classes.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/expressions.js' => Module {
          requests: Map(2) {
            '../node/index.js' => '<rootDir>/node_modules/@babel/generator/lib/node/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/expressions.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/flow.js' => Module {
          requests: Map(3) {
            './modules.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/modules.js',
            './types.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/types.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/flow.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/index.js' => Module {
          requests: Map(11) {
            './base.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/base.js',
            './classes.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/classes.js',
            './expressions.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/expressions.js',
            './flow.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/flow.js',
            './jsx.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/jsx.js',
            './methods.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/methods.js',
            './modules.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/modules.js',
            './statements.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/statements.js',
            './template-literals.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/template-literals.js',
            './types.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/types.js',
            './typescript.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/typescript.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/index.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/jsx.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/jsx.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/methods.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/methods.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/modules.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/modules.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/statements.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/statements.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/template-literals.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/template-literals.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/types.js' => Module {
          requests: Map(2) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            'jsesc' => '<rootDir>/node_modules/jsesc/jsesc.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/types.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/typescript.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/typescript.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/index.js' => Module {
          requests: Map(2) {
            './printer.js' => '<rootDir>/node_modules/@babel/generator/lib/printer.js',
            './source-map.js' => '<rootDir>/node_modules/@babel/generator/lib/source-map.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/node/index.js' => Module {
          requests: Map(3) {
            './parentheses.js' => '<rootDir>/node_modules/@babel/generator/lib/node/parentheses.js',
            './whitespace.js' => '<rootDir>/node_modules/@babel/generator/lib/node/whitespace.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/node/index.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/node/parentheses.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/node/parentheses.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/node/whitespace.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/node/whitespace.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/printer.js' => Module {
          requests: Map(4) {
            './buffer.js' => '<rootDir>/node_modules/@babel/generator/lib/buffer.js',
            './generators/index.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/index.js',
            './node/index.js' => '<rootDir>/node_modules/@babel/generator/lib/node/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/printer.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/source-map.js' => Module {
          requests: Map(2) {
            '@jridgewell/gen-mapping' => '<rootDir>/node_modules/@jridgewell/gen-mapping/dist/gen-mapping.umd.js',
            '@jridgewell/trace-mapping' => '<rootDir>/node_modules/@jridgewell/trace-mapping/dist/trace-mapping.umd.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/source-map.js'
        },
        '<rootDir>/node_modules/@babel/helper-environment-visitor/lib/index.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/helper-environment-visitor/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/helper-function-name/lib/index.js' => Module {
          requests: Map(2) {
            '@babel/template' => '<rootDir>/node_modules/@babel/template/lib/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/helper-function-name/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/helper-hoist-variables/lib/index.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/helper-hoist-variables/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/helper-split-export-declaration/lib/index.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/helper-split-export-declaration/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/helper-string-parser/lib/index.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/helper-string-parser/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/identifier.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/identifier.js'
        },
        '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/index.js' => Module {
          requests: Map(2) {
            './identifier.js' => '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/identifier.js',
            './keyword.js' => '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/keyword.js'
          },
          id: '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/keyword.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/keyword.js'
        },
        '<rootDir>/node_modules/@babel/highlight/lib/index.js' => Module {
          requests: Map(4) {
            '@babel/helper-validator-identifier' => '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/index.js',
            'chalk' => '<rootDir>/node_modules/chalk/index.js',
            'js-tokens' => '<rootDir>/node_modules/js-tokens/index.js',
            'picocolors' => '<rootDir>/node_modules/picocolors/picocolors.js'
          },
          id: '<rootDir>/node_modules/@babel/highlight/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/parser/lib/index.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/parser/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/builder.js' => Module {
          requests: Map(3) {
            './literal.js' => '<rootDir>/node_modules/@babel/template/lib/literal.js',
            './options.js' => '<rootDir>/node_modules/@babel/template/lib/options.js',
            './string.js' => '<rootDir>/node_modules/@babel/template/lib/string.js'
          },
          id: '<rootDir>/node_modules/@babel/template/lib/builder.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/formatters.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/template/lib/formatters.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/index.js' => Module {
          requests: Map(2) {
            './builder.js' => '<rootDir>/node_modules/@babel/template/lib/builder.js',
            './formatters.js' => '<rootDir>/node_modules/@babel/template/lib/formatters.js'
          },
          id: '<rootDir>/node_modules/@babel/template/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/literal.js' => Module {
          requests: Map(3) {
            './options.js' => '<rootDir>/node_modules/@babel/template/lib/options.js',
            './parse.js' => '<rootDir>/node_modules/@babel/template/lib/parse.js',
            './populate.js' => '<rootDir>/node_modules/@babel/template/lib/populate.js'
          },
          id: '<rootDir>/node_modules/@babel/template/lib/literal.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/options.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/template/lib/options.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/parse.js' => Module {
          requests: Map(3) {
            '@babel/code-frame' => '<rootDir>/node_modules/@babel/code-frame/lib/index.js',
            '@babel/parser' => '<rootDir>/node_modules/@babel/parser/lib/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/template/lib/parse.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/populate.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/template/lib/populate.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/string.js' => Module {
          requests: Map(3) {
            './options.js' => '<rootDir>/node_modules/@babel/template/lib/options.js',
            './parse.js' => '<rootDir>/node_modules/@babel/template/lib/parse.js',
            './populate.js' => '<rootDir>/node_modules/@babel/template/lib/populate.js'
          },
          id: '<rootDir>/node_modules/@babel/template/lib/string.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/cache.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/traverse/lib/cache.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/context.js' => Module {
          requests: Map(2) {
            './path/index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/context.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/hub.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/traverse/lib/hub.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/index.js' => Module {
          requests: Map(7) {
            './cache.js' => '<rootDir>/node_modules/@babel/traverse/lib/cache.js',
            './hub.js' => '<rootDir>/node_modules/@babel/traverse/lib/hub.js',
            './path/index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/index.js',
            './scope/index.js' => '<rootDir>/node_modules/@babel/traverse/lib/scope/index.js',
            './traverse-node.js' => '<rootDir>/node_modules/@babel/traverse/lib/traverse-node.js',
            './visitors.js' => '<rootDir>/node_modules/@babel/traverse/lib/visitors.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/ancestry.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/ancestry.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/comments.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/comments.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/context.js' => Module {
          requests: Map(2) {
            '../traverse-node.js' => '<rootDir>/node_modules/@babel/traverse/lib/traverse-node.js',
            './index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/context.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/conversion.js' => Module {
          requests: Map(4) {
            '../visitors.js' => '<rootDir>/node_modules/@babel/traverse/lib/visitors.js',
            '@babel/helper-environment-visitor' => '<rootDir>/node_modules/@babel/helper-environment-visitor/lib/index.js',
            '@babel/helper-function-name' => '<rootDir>/node_modules/@babel/helper-function-name/lib/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/conversion.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/evaluation.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/evaluation.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/family.js' => Module {
          requests: Map(2) {
            './index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/family.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/index.js' => Module {
          requests: Map(19) {
            '../cache.js' => '<rootDir>/node_modules/@babel/traverse/lib/cache.js',
            '../index.js' => '<rootDir>/node_modules/@babel/traverse/lib/index.js',
            '../scope/index.js' => '<rootDir>/node_modules/@babel/traverse/lib/scope/index.js',
            './ancestry.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/ancestry.js',
            './comments.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/comments.js',
            './context.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/context.js',
            './conversion.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/conversion.js',
            './evaluation.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/evaluation.js',
            './family.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/family.js',
            './inference/index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/inference/index.js',
            './introspection.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/introspection.js',
            './lib/virtual-types-validator.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types-validator.js',
            './lib/virtual-types.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types.js',
            './modification.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/modification.js',
            './removal.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/removal.js',
            './replacement.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/replacement.js',
            '@babel/generator' => '<rootDir>/node_modules/@babel/generator/lib/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            'debug' => '<rootDir>/node_modules/debug/src/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/index.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/inference/index.js' => Module {
          requests: Map(2) {
            './inferers.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/inference/inferers.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/inference/index.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/inference/inferer-reference.js' => Module {
          requests: Map(2) {
            './util.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/inference/util.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/inference/inferer-reference.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/inference/inferers.js' => Module {
          requests: Map(3) {
            './inferer-reference.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/inference/inferer-reference.js',
            './util.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/inference/util.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/inference/inferers.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/inference/util.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/inference/util.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/introspection.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/introspection.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/lib/hoister.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/lib/hoister.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/lib/removal-hooks.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/lib/removal-hooks.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types-validator.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types-validator.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/modification.js' => Module {
          requests: Map(4) {
            '../cache.js' => '<rootDir>/node_modules/@babel/traverse/lib/cache.js',
            './index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/index.js',
            './lib/hoister.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/lib/hoister.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/modification.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/removal.js' => Module {
          requests: Map(4) {
            '../cache.js' => '<rootDir>/node_modules/@babel/traverse/lib/cache.js',
            './index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/index.js',
            './lib/removal-hooks.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/lib/removal-hooks.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/removal.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/replacement.js' => Module {
          requests: Map(7) {
            '../cache.js' => '<rootDir>/node_modules/@babel/traverse/lib/cache.js',
            '../index.js' => '<rootDir>/node_modules/@babel/traverse/lib/index.js',
            './index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/index.js',
            '@babel/code-frame' => '<rootDir>/node_modules/@babel/code-frame/lib/index.js',
            '@babel/helper-hoist-variables' => '<rootDir>/node_modules/@babel/helper-hoist-variables/lib/index.js',
            '@babel/parser' => '<rootDir>/node_modules/@babel/parser/lib/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/replacement.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/scope/binding.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/traverse/lib/scope/binding.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/scope/index.js' => Module {
          requests: Map(7) {
            '../cache.js' => '<rootDir>/node_modules/@babel/traverse/lib/cache.js',
            '../index.js' => '<rootDir>/node_modules/@babel/traverse/lib/index.js',
            '../visitors.js' => '<rootDir>/node_modules/@babel/traverse/lib/visitors.js',
            './binding.js' => '<rootDir>/node_modules/@babel/traverse/lib/scope/binding.js',
            './lib/renamer.js' => '<rootDir>/node_modules/@babel/traverse/lib/scope/lib/renamer.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            'globals' => '<rootDir>/node_modules/globals/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/scope/index.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/scope/lib/renamer.js' => Module {
          requests: Map(5) {
            '../../traverse-node.js' => '<rootDir>/node_modules/@babel/traverse/lib/traverse-node.js',
            '../../visitors.js' => '<rootDir>/node_modules/@babel/traverse/lib/visitors.js',
            '@babel/helper-environment-visitor' => '<rootDir>/node_modules/@babel/helper-environment-visitor/lib/index.js',
            '@babel/helper-split-export-declaration' => '<rootDir>/node_modules/@babel/helper-split-export-declaration/lib/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/scope/lib/renamer.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/traverse-node.js' => Module {
          requests: Map(2) {
            './context.js' => '<rootDir>/node_modules/@babel/traverse/lib/context.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/traverse-node.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/visitors.js' => Module {
          requests: Map(3) {
            './path/lib/virtual-types-validator.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types-validator.js',
            './path/lib/virtual-types.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/visitors.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/asserts/assertNode.js' => Module {
          requests: Map(1) {
            '../validators/isNode.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isNode.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/asserts/assertNode.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/asserts/generated/index.js' => Module {
          requests: Map(2) {
            '../../utils/deprecationWarning.js' => '<rootDir>/node_modules/@babel/types/lib/utils/deprecationWarning.js',
            '../../validators/is.js' => '<rootDir>/node_modules/@babel/types/lib/validators/is.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/asserts/generated/index.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/builders/flow/createFlowUnionType.js' => Module {
          requests: Map(2) {
            '../../modifications/flow/removeTypeDuplicates.js' => '<rootDir>/node_modules/@babel/types/lib/modifications/flow/removeTypeDuplicates.js',
            '../generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/builders/flow/createFlowUnionType.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/builders/flow/createTypeAnnotationBasedOnTypeof.js' => Module {
          requests: Map(1) {
            '../generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/builders/flow/createTypeAnnotationBasedOnTypeof.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js' => Module {
          requests: Map(2) {
            '../../utils/deprecationWarning.js' => '<rootDir>/node_modules/@babel/types/lib/utils/deprecationWarning.js',
            '../validateNode.js' => '<rootDir>/node_modules/@babel/types/lib/builders/validateNode.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/builders/generated/uppercase.js' => Module {
          requests: Map(1) {
            './index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/builders/generated/uppercase.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/builders/productions.js' => Module {
          requests: Map(1) {
            './generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/builders/productions.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/builders/react/buildChildren.js' => Module {
          requests: Map(2) {
            '../../utils/react/cleanJSXElementLiteralChild.js' => '<rootDir>/node_modules/@babel/types/lib/utils/react/cleanJSXElementLiteralChild.js',
            '../../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/builders/react/buildChildren.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/builders/typescript/createTSUnionType.js' => Module {
          requests: Map(3) {
            '../../modifications/typescript/removeTypeDuplicates.js' => '<rootDir>/node_modules/@babel/types/lib/modifications/typescript/removeTypeDuplicates.js',
            '../../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js',
            '../generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/builders/typescript/createTSUnionType.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/builders/validateNode.js' => Module {
          requests: Map(2) {
            '../index.js' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            '../validators/validate.js' => '<rootDir>/node_modules/@babel/types/lib/validators/validate.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/builders/validateNode.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/clone/clone.js' => Module {
          requests: Map(1) {
            './cloneNode.js' => '<rootDir>/node_modules/@babel/types/lib/clone/cloneNode.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/clone/clone.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/clone/cloneDeep.js' => Module {
          requests: Map(1) {
            './cloneNode.js' => '<rootDir>/node_modules/@babel/types/lib/clone/cloneNode.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/clone/cloneDeep.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/clone/cloneDeepWithoutLoc.js' => Module {
          requests: Map(1) {
            './cloneNode.js' => '<rootDir>/node_modules/@babel/types/lib/clone/cloneNode.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/clone/cloneDeepWithoutLoc.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/clone/cloneNode.js' => Module {
          requests: Map(2) {
            '../definitions/index.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/index.js',
            '../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/clone/cloneNode.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/clone/cloneWithoutLoc.js' => Module {
          requests: Map(1) {
            './cloneNode.js' => '<rootDir>/node_modules/@babel/types/lib/clone/cloneNode.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/clone/cloneWithoutLoc.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/comments/addComment.js' => Module {
          requests: Map(1) {
            './addComments.js' => '<rootDir>/node_modules/@babel/types/lib/comments/addComments.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/comments/addComment.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/comments/addComments.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/types/lib/comments/addComments.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/comments/inheritInnerComments.js' => Module {
          requests: Map(1) {
            '../utils/inherit.js' => '<rootDir>/node_modules/@babel/types/lib/utils/inherit.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/comments/inheritInnerComments.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/comments/inheritLeadingComments.js' => Module {
          requests: Map(1) {
            '../utils/inherit.js' => '<rootDir>/node_modules/@babel/types/lib/utils/inherit.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/comments/inheritLeadingComments.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/comments/inheritTrailingComments.js' => Module {
          requests: Map(1) {
            '../utils/inherit.js' => '<rootDir>/node_modules/@babel/types/lib/utils/inherit.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/comments/inheritTrailingComments.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/comments/inheritsComments.js' => Module {
          requests: Map(3) {
            './inheritInnerComments.js' => '<rootDir>/node_modules/@babel/types/lib/comments/inheritInnerComments.js',
            './inheritLeadingComments.js' => '<rootDir>/node_modules/@babel/types/lib/comments/inheritLeadingComments.js',
            './inheritTrailingComments.js' => '<rootDir>/node_modules/@babel/types/lib/comments/inheritTrailingComments.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/comments/inheritsComments.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/comments/removeComments.js' => Module {
          requests: Map(1) {
            '../constants/index.js' => '<rootDir>/node_modules/@babel/types/lib/constants/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/comments/removeComments.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/constants/generated/index.js' => Module {
          requests: Map(1) {
            '../../definitions/index.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/constants/generated/index.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/constants/index.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/types/lib/constants/index.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/ensureBlock.js' => Module {
          requests: Map(1) {
            './toBlock.js' => '<rootDir>/node_modules/@babel/types/lib/converters/toBlock.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/ensureBlock.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/gatherSequenceExpressions.js' => Module {
          requests: Map(4) {
            '../builders/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js',
            '../clone/cloneNode.js' => '<rootDir>/node_modules/@babel/types/lib/clone/cloneNode.js',
            '../retrievers/getBindingIdentifiers.js' => '<rootDir>/node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js',
            '../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/gatherSequenceExpressions.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/toBindingIdentifierName.js' => Module {
          requests: Map(1) {
            './toIdentifier.js' => '<rootDir>/node_modules/@babel/types/lib/converters/toIdentifier.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/toBindingIdentifierName.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/toBlock.js' => Module {
          requests: Map(2) {
            '../builders/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js',
            '../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/toBlock.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/toComputedKey.js' => Module {
          requests: Map(2) {
            '../builders/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js',
            '../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/toComputedKey.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/toExpression.js' => Module {
          requests: Map(1) {
            '../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/toExpression.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/toIdentifier.js' => Module {
          requests: Map(2) {
            '../validators/isValidIdentifier.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isValidIdentifier.js',
            '@babel/helper-validator-identifier' => '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/toIdentifier.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/toKeyAlias.js' => Module {
          requests: Map(3) {
            '../clone/cloneNode.js' => '<rootDir>/node_modules/@babel/types/lib/clone/cloneNode.js',
            '../modifications/removePropertiesDeep.js' => '<rootDir>/node_modules/@babel/types/lib/modifications/removePropertiesDeep.js',
            '../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/toKeyAlias.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/toSequenceExpression.js' => Module {
          requests: Map(1) {
            './gatherSequenceExpressions.js' => '<rootDir>/node_modules/@babel/types/lib/converters/gatherSequenceExpressions.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/toSequenceExpression.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/toStatement.js' => Module {
          requests: Map(2) {
            '../builders/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js',
            '../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/toStatement.js'
        },
        ... 163 more items
      }
    }"
  `);
}, 10000);

test("only going one module deep via onlyEntrypoint: true", async () => {
  const entrypoint = rootDir("src/index.ts");

  const result = await walkAsync(entrypoint, {
    onlyEntrypoint: true,
    sort: true,
  });

  expect(inspectAndClean(result)).toMatchInlineSnapshot(`
    "{
      errors: [],
      modules: Map(1) {
        '<rootDir>/src/index.ts' => Module {
          requests: Map(6) {
            './default-resolver' => '<rootDir>/src/default-resolver.ts',
            './module' => '<rootDir>/src/module.ts',
            './serialize' => '<rootDir>/src/serialize.ts',
            './types' => '<rootDir>/src/types.ts',
            './walk' => '<rootDir>/src/walk.ts',
            './walker' => '<rootDir>/src/walker.ts'
          },
          id: '<rootDir>/src/index.ts'
        }
      }
    }"
  `);
});

test("custom resolver function", async () => {
  const entrypoint = rootDir("src/index.ts");

  const result = await walkAsync(entrypoint, {
    resolver(id, fromFilePath) {
      if (id === "./types") {
        return rootDir("src/walker.ts");
      }

      return `external:__${id}__${fromFilePath}`;
    },
    sort: true,
  });

  expect(inspectAndClean(result)).toMatchInlineSnapshot(`
    "{
      errors: [],
      modules: Map(2) {
        '<rootDir>/src/index.ts' => Module {
          requests: Map(6) {
            './default-resolver' => 'external:__./default-resolver__<rootDir>/src/index.ts',
            './module' => 'external:__./module__<rootDir>/src/index.ts',
            './serialize' => 'external:__./serialize__<rootDir>/src/index.ts',
            './types' => '<rootDir>/src/walker.ts',
            './walk' => 'external:__./walk__<rootDir>/src/index.ts',
            './walker' => 'external:__./walker__<rootDir>/src/index.ts'
          },
          id: '<rootDir>/src/index.ts'
        },
        '<rootDir>/src/walker.ts' => Module {
          requests: Map(6) {
            './debug-logger' => 'external:__./debug-logger__<rootDir>/src/walker.ts',
            './module' => 'external:__./module__<rootDir>/src/walker.ts',
            './types' => '<rootDir>/src/walker.ts',
            'node:events' => 'external:__node:events__<rootDir>/src/walker.ts',
            'node:path' => 'external:__node:path__<rootDir>/src/walker.ts',
            'parallel-park' => 'external:__parallel-park__<rootDir>/src/walker.ts'
          },
          id: '<rootDir>/src/walker.ts'
        }
      }
    }"
  `);
});

test("'dependencies' getter", async () => {
  const entrypoint = rootDir("src/index.ts");

  const result = await walkAsync(entrypoint, {
    onlyEntrypoint: true,
    sort: true,
  });

  const mod = result.modules.get(entrypoint);

  expect(inspectAndClean(mod!.dependencies)).toMatchInlineSnapshot(`
    "Set(6) {
      '<rootDir>/src/default-resolver.ts',
      '<rootDir>/src/module.ts',
      '<rootDir>/src/serialize.ts',
      '<rootDir>/src/types.ts',
      '<rootDir>/src/walk.ts',
      '<rootDir>/src/walker.ts'
    }"
  `);
});
