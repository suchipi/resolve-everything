import { expect, test } from "vitest";
import { walk } from "./index";
import { rootDir, inspectAndClean } from "./test-helpers";

test("sample walk", () => {
  const entrypoint = rootDir("src/index.ts");

  const result = walk(entrypoint);

  expect(inspectAndClean(result)).toMatchInlineSnapshot(`
    "{
      errors: [],
      modules: Map(8) {
        '<rootDir>/src/index.ts' => Module {
          requests: Map(6) {
            './walk' => '<rootDir>/src/walk.ts',
            './types' => '<rootDir>/src/types.ts',
            './default-resolver' => '<rootDir>/src/default-resolver.ts',
            './walker' => '<rootDir>/src/walker.ts',
            './module' => '<rootDir>/src/module.ts',
            './serialize' => '<rootDir>/src/serialize.ts'
          },
          id: '<rootDir>/src/index.ts'
        },
        '<rootDir>/src/walk.ts' => Module {
          requests: Map(6) {
            'node:path' => 'external:node:path',
            './walker' => '<rootDir>/src/walker.ts',
            './module' => '<rootDir>/src/module.ts',
            './debug-logger' => '<rootDir>/src/debug-logger.ts',
            './types' => '<rootDir>/src/types.ts',
            './default-resolver' => '<rootDir>/src/default-resolver.ts'
          },
          id: '<rootDir>/src/walk.ts'
        },
        '<rootDir>/src/types.ts' => Module {
          requests: Map(0) {},
          id: '<rootDir>/src/types.ts'
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
        '<rootDir>/src/walker.ts' => Module {
          requests: Map(6) {
            'node:path' => 'external:node:path',
            'node:events' => 'external:node:events',
            'parallel-park' => '<rootDir>/node_modules/parallel-park/dist/index.js',
            './module' => '<rootDir>/src/module.ts',
            './debug-logger' => '<rootDir>/src/debug-logger.ts',
            './types' => '<rootDir>/src/types.ts'
          },
          id: '<rootDir>/src/walker.ts'
        },
        '<rootDir>/src/module.ts' => Module {
          requests: Map(5) {
            'node:fs' => 'external:node:fs',
            'equivalent-exchange' => '<rootDir>/node_modules/equivalent-exchange/dist/index.js',
            './debug-logger' => '<rootDir>/src/debug-logger.ts',
            './types' => '<rootDir>/src/types.ts',
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
        '<rootDir>/src/debug-logger.ts' => Module {
          requests: Map(1) {
            'debug' => '<rootDir>/node_modules/debug/src/index.js'
          },
          id: '<rootDir>/src/debug-logger.ts'
        }
      }
    }"
  `);
});

test("sorted", () => {
  const entrypoint = rootDir("src/index.ts");

  const result = walk(entrypoint, { sort: true });

  expect(inspectAndClean(result)).toMatchInlineSnapshot(`
    "{
      errors: [],
      modules: Map(8) {
        '<rootDir>/src/index.ts' => Module {
          requests: Map(6) {
            './walk' => '<rootDir>/src/walk.ts',
            './types' => '<rootDir>/src/types.ts',
            './default-resolver' => '<rootDir>/src/default-resolver.ts',
            './walker' => '<rootDir>/src/walker.ts',
            './module' => '<rootDir>/src/module.ts',
            './serialize' => '<rootDir>/src/serialize.ts'
          },
          id: '<rootDir>/src/index.ts'
        },
        '<rootDir>/src/walk.ts' => Module {
          requests: Map(6) {
            'node:path' => 'external:node:path',
            './walker' => '<rootDir>/src/walker.ts',
            './module' => '<rootDir>/src/module.ts',
            './debug-logger' => '<rootDir>/src/debug-logger.ts',
            './types' => '<rootDir>/src/types.ts',
            './default-resolver' => '<rootDir>/src/default-resolver.ts'
          },
          id: '<rootDir>/src/walk.ts'
        },
        '<rootDir>/src/types.ts' => Module {
          requests: Map(0) {},
          id: '<rootDir>/src/types.ts'
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
        '<rootDir>/src/walker.ts' => Module {
          requests: Map(6) {
            'node:path' => 'external:node:path',
            'node:events' => 'external:node:events',
            'parallel-park' => '<rootDir>/node_modules/parallel-park/dist/index.js',
            './module' => '<rootDir>/src/module.ts',
            './debug-logger' => '<rootDir>/src/debug-logger.ts',
            './types' => '<rootDir>/src/types.ts'
          },
          id: '<rootDir>/src/walker.ts'
        },
        '<rootDir>/src/module.ts' => Module {
          requests: Map(5) {
            'node:fs' => 'external:node:fs',
            'equivalent-exchange' => '<rootDir>/node_modules/equivalent-exchange/dist/index.js',
            './debug-logger' => '<rootDir>/src/debug-logger.ts',
            './types' => '<rootDir>/src/types.ts',
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
        '<rootDir>/src/debug-logger.ts' => Module {
          requests: Map(1) {
            'debug' => '<rootDir>/node_modules/debug/src/index.js'
          },
          id: '<rootDir>/src/debug-logger.ts'
        }
      }
    }"
  `);
});

test("including node_modules via skip: null", () => {
  const entrypoint = rootDir("src/index.ts");

  const result = walk(entrypoint, { skip: null });

  expect(inspectAndClean(result)).toMatchInlineSnapshot(`
    "{
      errors: [],
      modules: Map(263) {
        '<rootDir>/src/index.ts' => Module {
          requests: Map(6) {
            './walk' => '<rootDir>/src/walk.ts',
            './types' => '<rootDir>/src/types.ts',
            './default-resolver' => '<rootDir>/src/default-resolver.ts',
            './walker' => '<rootDir>/src/walker.ts',
            './module' => '<rootDir>/src/module.ts',
            './serialize' => '<rootDir>/src/serialize.ts'
          },
          id: '<rootDir>/src/index.ts'
        },
        '<rootDir>/src/walk.ts' => Module {
          requests: Map(6) {
            'node:path' => 'external:node:path',
            './walker' => '<rootDir>/src/walker.ts',
            './module' => '<rootDir>/src/module.ts',
            './debug-logger' => '<rootDir>/src/debug-logger.ts',
            './types' => '<rootDir>/src/types.ts',
            './default-resolver' => '<rootDir>/src/default-resolver.ts'
          },
          id: '<rootDir>/src/walk.ts'
        },
        '<rootDir>/src/types.ts' => Module {
          requests: Map(0) {},
          id: '<rootDir>/src/types.ts'
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
        '<rootDir>/src/walker.ts' => Module {
          requests: Map(6) {
            'node:path' => 'external:node:path',
            'node:events' => 'external:node:events',
            'parallel-park' => '<rootDir>/node_modules/parallel-park/dist/index.js',
            './module' => '<rootDir>/src/module.ts',
            './debug-logger' => '<rootDir>/src/debug-logger.ts',
            './types' => '<rootDir>/src/types.ts'
          },
          id: '<rootDir>/src/walker.ts'
        },
        '<rootDir>/src/module.ts' => Module {
          requests: Map(5) {
            'node:fs' => 'external:node:fs',
            'equivalent-exchange' => '<rootDir>/node_modules/equivalent-exchange/dist/index.js',
            './debug-logger' => '<rootDir>/src/debug-logger.ts',
            './types' => '<rootDir>/src/types.ts',
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
        '<rootDir>/src/debug-logger.ts' => Module {
          requests: Map(1) {
            'debug' => '<rootDir>/node_modules/debug/src/index.js'
          },
          id: '<rootDir>/src/debug-logger.ts'
        },
        '<rootDir>/node_modules/resolve/index.js' => Module {
          requests: Map(4) {
            './lib/async' => '<rootDir>/node_modules/resolve/lib/async.js',
            './lib/core' => '<rootDir>/node_modules/resolve/lib/core.js',
            './lib/is-core' => '<rootDir>/node_modules/resolve/lib/is-core.js',
            './lib/sync' => '<rootDir>/node_modules/resolve/lib/sync.js'
          },
          id: '<rootDir>/node_modules/resolve/index.js'
        },
        '<rootDir>/node_modules/parallel-park/dist/index.js' => Module {
          requests: Map(2) {
            './run-jobs' => '<rootDir>/node_modules/parallel-park/dist/run-jobs.js',
            './in-child-process' => '<rootDir>/node_modules/parallel-park/dist/in-child-process.js'
          },
          id: '<rootDir>/node_modules/parallel-park/dist/index.js'
        },
        '<rootDir>/node_modules/equivalent-exchange/dist/index.js' => Module {
          requests: Map(6) {
            '@babel/traverse' => '<rootDir>/node_modules/@babel/traverse/lib/index.js',
            '@babel/template' => '<rootDir>/node_modules/@babel/template/lib/index.js',
            './types-ns' => '<rootDir>/node_modules/equivalent-exchange/dist/types-ns.js',
            'recast' => '<rootDir>/node_modules/recast/main.js',
            './parser' => '<rootDir>/node_modules/equivalent-exchange/dist/parser.js',
            './printer' => '<rootDir>/node_modules/equivalent-exchange/dist/printer.js'
          },
          id: '<rootDir>/node_modules/equivalent-exchange/dist/index.js'
        },
        '<rootDir>/node_modules/pretty-print-ast/dist/index.js' => Module {
          requests: Map(1) {
            '@suchipi/traverse' => '<rootDir>/node_modules/@suchipi/traverse/index.js'
          },
          id: '<rootDir>/node_modules/pretty-print-ast/dist/index.js'
        },
        '<rootDir>/node_modules/debug/src/index.js' => Module {
          requests: Map(2) {
            './browser.js' => '<rootDir>/node_modules/debug/src/browser.js',
            './node.js' => '<rootDir>/node_modules/debug/src/node.js'
          },
          id: '<rootDir>/node_modules/debug/src/index.js'
        },
        '<rootDir>/node_modules/resolve/lib/async.js' => Module {
          requests: Map(7) {
            'fs' => 'external:fs',
            './homedir' => '<rootDir>/node_modules/resolve/lib/homedir.js',
            'path' => 'external:path',
            './caller' => '<rootDir>/node_modules/resolve/lib/caller.js',
            './node-modules-paths' => '<rootDir>/node_modules/resolve/lib/node-modules-paths.js',
            './normalize-options' => '<rootDir>/node_modules/resolve/lib/normalize-options.js',
            'is-core-module' => '<rootDir>/node_modules/is-core-module/index.js'
          },
          id: '<rootDir>/node_modules/resolve/lib/async.js'
        },
        '<rootDir>/node_modules/resolve/lib/core.js' => Module {
          requests: Map(2) {
            'is-core-module' => '<rootDir>/node_modules/is-core-module/index.js',
            './core.json' => '<rootDir>/node_modules/resolve/lib/core.json'
          },
          id: '<rootDir>/node_modules/resolve/lib/core.js'
        },
        '<rootDir>/node_modules/resolve/lib/is-core.js' => Module {
          requests: Map(1) {
            'is-core-module' => '<rootDir>/node_modules/is-core-module/index.js'
          },
          id: '<rootDir>/node_modules/resolve/lib/is-core.js'
        },
        '<rootDir>/node_modules/resolve/lib/sync.js' => Module {
          requests: Map(7) {
            'is-core-module' => '<rootDir>/node_modules/is-core-module/index.js',
            'fs' => 'external:fs',
            'path' => 'external:path',
            './homedir' => '<rootDir>/node_modules/resolve/lib/homedir.js',
            './caller' => '<rootDir>/node_modules/resolve/lib/caller.js',
            './node-modules-paths' => '<rootDir>/node_modules/resolve/lib/node-modules-paths.js',
            './normalize-options' => '<rootDir>/node_modules/resolve/lib/normalize-options.js'
          },
          id: '<rootDir>/node_modules/resolve/lib/sync.js'
        },
        '<rootDir>/node_modules/parallel-park/dist/run-jobs.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/parallel-park/dist/run-jobs.js'
        },
        '<rootDir>/node_modules/parallel-park/dist/in-child-process.js' => Module {
          requests: Map(1) { 'child_process' => 'external:child_process' },
          id: '<rootDir>/node_modules/parallel-park/dist/in-child-process.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/index.js' => Module {
          requests: Map(7) {
            './visitors.js' => '<rootDir>/node_modules/@babel/traverse/lib/visitors.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            './cache.js' => '<rootDir>/node_modules/@babel/traverse/lib/cache.js',
            './traverse-node.js' => '<rootDir>/node_modules/@babel/traverse/lib/traverse-node.js',
            './path/index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/index.js',
            './scope/index.js' => '<rootDir>/node_modules/@babel/traverse/lib/scope/index.js',
            './hub.js' => '<rootDir>/node_modules/@babel/traverse/lib/hub.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/index.js' => Module {
          requests: Map(2) {
            './formatters.js' => '<rootDir>/node_modules/@babel/template/lib/formatters.js',
            './builder.js' => '<rootDir>/node_modules/@babel/template/lib/builder.js'
          },
          id: '<rootDir>/node_modules/@babel/template/lib/index.js'
        },
        '<rootDir>/node_modules/equivalent-exchange/dist/types-ns.js' => Module {
          requests: Map(2) {
            '@babel/traverse' => '<rootDir>/node_modules/@babel/traverse/lib/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/equivalent-exchange/dist/types-ns.js'
        },
        '<rootDir>/node_modules/recast/main.js' => Module {
          requests: Map(5) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            'fs' => 'external:fs',
            'ast-types' => '<rootDir>/node_modules/ast-types/lib/main.js',
            './lib/parser' => '<rootDir>/node_modules/recast/lib/parser.js',
            './lib/printer' => '<rootDir>/node_modules/recast/lib/printer.js'
          },
          id: '<rootDir>/node_modules/recast/main.js'
        },
        '<rootDir>/node_modules/equivalent-exchange/dist/parser.js' => Module {
          requests: Map(1) {
            '@babel/parser' => '<rootDir>/node_modules/@babel/parser/lib/index.js'
          },
          id: '<rootDir>/node_modules/equivalent-exchange/dist/parser.js'
        },
        '<rootDir>/node_modules/equivalent-exchange/dist/printer.js' => Module {
          requests: Map(2) {
            '@babel/generator' => '<rootDir>/node_modules/@babel/generator/lib/index.js',
            'recast' => '<rootDir>/node_modules/recast/main.js'
          },
          id: '<rootDir>/node_modules/equivalent-exchange/dist/printer.js'
        },
        '<rootDir>/node_modules/@suchipi/traverse/index.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@suchipi/traverse/index.js'
        },
        '<rootDir>/node_modules/debug/src/browser.js' => Module {
          requests: Map(1) {
            './common' => '<rootDir>/node_modules/debug/src/common.js'
          },
          id: '<rootDir>/node_modules/debug/src/browser.js'
        },
        '<rootDir>/node_modules/debug/src/node.js' => Module {
          requests: Map(4) {
            'tty' => 'external:tty',
            'util' => 'external:util',
            'supports-color' => '<rootDir>/node_modules/supports-color/index.js',
            './common' => '<rootDir>/node_modules/debug/src/common.js'
          },
          id: '<rootDir>/node_modules/debug/src/node.js'
        },
        '<rootDir>/node_modules/resolve/lib/homedir.js' => Module {
          requests: Map(1) { 'os' => 'external:os' },
          id: '<rootDir>/node_modules/resolve/lib/homedir.js'
        },
        '<rootDir>/node_modules/resolve/lib/caller.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/resolve/lib/caller.js'
        },
        '<rootDir>/node_modules/resolve/lib/node-modules-paths.js' => Module {
          requests: Map(2) {
            'path' => 'external:path',
            'path-parse' => '<rootDir>/node_modules/path-parse/index.js'
          },
          id: '<rootDir>/node_modules/resolve/lib/node-modules-paths.js'
        },
        '<rootDir>/node_modules/resolve/lib/normalize-options.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/resolve/lib/normalize-options.js'
        },
        '<rootDir>/node_modules/is-core-module/index.js' => Module {
          requests: Map(2) {
            'hasown' => '<rootDir>/node_modules/hasown/index.js',
            './core.json' => '<rootDir>/node_modules/is-core-module/core.json'
          },
          id: '<rootDir>/node_modules/is-core-module/index.js'
        },
        '<rootDir>/node_modules/resolve/lib/core.json' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/resolve/lib/core.json'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/visitors.js' => Module {
          requests: Map(3) {
            './path/lib/virtual-types.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types.js',
            './path/lib/virtual-types-validator.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types-validator.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/visitors.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/index.js' => Module {
          requests: Map(67) {
            './validators/react/isReactComponent.js' => '<rootDir>/node_modules/@babel/types/lib/validators/react/isReactComponent.js',
            './validators/react/isCompatTag.js' => '<rootDir>/node_modules/@babel/types/lib/validators/react/isCompatTag.js',
            './builders/react/buildChildren.js' => '<rootDir>/node_modules/@babel/types/lib/builders/react/buildChildren.js',
            './asserts/assertNode.js' => '<rootDir>/node_modules/@babel/types/lib/asserts/assertNode.js',
            './asserts/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/asserts/generated/index.js',
            './builders/flow/createTypeAnnotationBasedOnTypeof.js' => '<rootDir>/node_modules/@babel/types/lib/builders/flow/createTypeAnnotationBasedOnTypeof.js',
            './builders/flow/createFlowUnionType.js' => '<rootDir>/node_modules/@babel/types/lib/builders/flow/createFlowUnionType.js',
            './builders/typescript/createTSUnionType.js' => '<rootDir>/node_modules/@babel/types/lib/builders/typescript/createTSUnionType.js',
            './builders/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js',
            './builders/generated/uppercase.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/uppercase.js',
            './builders/productions.js' => '<rootDir>/node_modules/@babel/types/lib/builders/productions.js',
            './clone/cloneNode.js' => '<rootDir>/node_modules/@babel/types/lib/clone/cloneNode.js',
            './clone/clone.js' => '<rootDir>/node_modules/@babel/types/lib/clone/clone.js',
            './clone/cloneDeep.js' => '<rootDir>/node_modules/@babel/types/lib/clone/cloneDeep.js',
            './clone/cloneDeepWithoutLoc.js' => '<rootDir>/node_modules/@babel/types/lib/clone/cloneDeepWithoutLoc.js',
            './clone/cloneWithoutLoc.js' => '<rootDir>/node_modules/@babel/types/lib/clone/cloneWithoutLoc.js',
            './comments/addComment.js' => '<rootDir>/node_modules/@babel/types/lib/comments/addComment.js',
            './comments/addComments.js' => '<rootDir>/node_modules/@babel/types/lib/comments/addComments.js',
            './comments/inheritInnerComments.js' => '<rootDir>/node_modules/@babel/types/lib/comments/inheritInnerComments.js',
            './comments/inheritLeadingComments.js' => '<rootDir>/node_modules/@babel/types/lib/comments/inheritLeadingComments.js',
            './comments/inheritsComments.js' => '<rootDir>/node_modules/@babel/types/lib/comments/inheritsComments.js',
            './comments/inheritTrailingComments.js' => '<rootDir>/node_modules/@babel/types/lib/comments/inheritTrailingComments.js',
            './comments/removeComments.js' => '<rootDir>/node_modules/@babel/types/lib/comments/removeComments.js',
            './constants/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/constants/generated/index.js',
            './constants/index.js' => '<rootDir>/node_modules/@babel/types/lib/constants/index.js',
            './converters/ensureBlock.js' => '<rootDir>/node_modules/@babel/types/lib/converters/ensureBlock.js',
            './converters/toBindingIdentifierName.js' => '<rootDir>/node_modules/@babel/types/lib/converters/toBindingIdentifierName.js',
            './converters/toBlock.js' => '<rootDir>/node_modules/@babel/types/lib/converters/toBlock.js',
            './converters/toComputedKey.js' => '<rootDir>/node_modules/@babel/types/lib/converters/toComputedKey.js',
            './converters/toExpression.js' => '<rootDir>/node_modules/@babel/types/lib/converters/toExpression.js',
            './converters/toIdentifier.js' => '<rootDir>/node_modules/@babel/types/lib/converters/toIdentifier.js',
            './converters/toKeyAlias.js' => '<rootDir>/node_modules/@babel/types/lib/converters/toKeyAlias.js',
            './converters/toStatement.js' => '<rootDir>/node_modules/@babel/types/lib/converters/toStatement.js',
            './converters/valueToNode.js' => '<rootDir>/node_modules/@babel/types/lib/converters/valueToNode.js',
            './definitions/index.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/index.js',
            './modifications/appendToMemberExpression.js' => '<rootDir>/node_modules/@babel/types/lib/modifications/appendToMemberExpression.js',
            './modifications/inherits.js' => '<rootDir>/node_modules/@babel/types/lib/modifications/inherits.js',
            './modifications/prependToMemberExpression.js' => '<rootDir>/node_modules/@babel/types/lib/modifications/prependToMemberExpression.js',
            './modifications/removeProperties.js' => '<rootDir>/node_modules/@babel/types/lib/modifications/removeProperties.js',
            './modifications/removePropertiesDeep.js' => '<rootDir>/node_modules/@babel/types/lib/modifications/removePropertiesDeep.js',
            './modifications/flow/removeTypeDuplicates.js' => '<rootDir>/node_modules/@babel/types/lib/modifications/flow/removeTypeDuplicates.js',
            './retrievers/getBindingIdentifiers.js' => '<rootDir>/node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js',
            './retrievers/getOuterBindingIdentifiers.js' => '<rootDir>/node_modules/@babel/types/lib/retrievers/getOuterBindingIdentifiers.js',
            './traverse/traverse.js' => '<rootDir>/node_modules/@babel/types/lib/traverse/traverse.js',
            './traverse/traverseFast.js' => '<rootDir>/node_modules/@babel/types/lib/traverse/traverseFast.js',
            './utils/shallowEqual.js' => '<rootDir>/node_modules/@babel/types/lib/utils/shallowEqual.js',
            './validators/is.js' => '<rootDir>/node_modules/@babel/types/lib/validators/is.js',
            './validators/isBinding.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isBinding.js',
            './validators/isBlockScoped.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isBlockScoped.js',
            './validators/isImmutable.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isImmutable.js',
            './validators/isLet.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isLet.js',
            './validators/isNode.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isNode.js',
            './validators/isNodesEquivalent.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isNodesEquivalent.js',
            './validators/isPlaceholderType.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isPlaceholderType.js',
            './validators/isReferenced.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isReferenced.js',
            './validators/isScope.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isScope.js',
            './validators/isSpecifierDefault.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isSpecifierDefault.js',
            './validators/isType.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isType.js',
            './validators/isValidES3Identifier.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isValidES3Identifier.js',
            './validators/isValidIdentifier.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isValidIdentifier.js',
            './validators/isVar.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isVar.js',
            './validators/matchesPattern.js' => '<rootDir>/node_modules/@babel/types/lib/validators/matchesPattern.js',
            './validators/validate.js' => '<rootDir>/node_modules/@babel/types/lib/validators/validate.js',
            './validators/buildMatchMemberExpression.js' => '<rootDir>/node_modules/@babel/types/lib/validators/buildMatchMemberExpression.js',
            './validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js',
            './utils/deprecationWarning.js' => '<rootDir>/node_modules/@babel/types/lib/utils/deprecationWarning.js',
            './converters/toSequenceExpression.js' => '<rootDir>/node_modules/@babel/types/lib/converters/toSequenceExpression.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/cache.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/traverse/lib/cache.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/traverse-node.js' => Module {
          requests: Map(2) {
            './context.js' => '<rootDir>/node_modules/@babel/traverse/lib/context.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/traverse-node.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/index.js' => Module {
          requests: Map(19) {
            './lib/virtual-types.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types.js',
            'debug' => '<rootDir>/node_modules/debug/src/index.js',
            '../index.js' => '<rootDir>/node_modules/@babel/traverse/lib/index.js',
            '../scope/index.js' => '<rootDir>/node_modules/@babel/traverse/lib/scope/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            '../cache.js' => '<rootDir>/node_modules/@babel/traverse/lib/cache.js',
            '@babel/generator' => '<rootDir>/node_modules/@babel/generator/lib/index.js',
            './ancestry.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/ancestry.js',
            './inference/index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/inference/index.js',
            './replacement.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/replacement.js',
            './evaluation.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/evaluation.js',
            './conversion.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/conversion.js',
            './introspection.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/introspection.js',
            './context.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/context.js',
            './removal.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/removal.js',
            './modification.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/modification.js',
            './family.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/family.js',
            './comments.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/comments.js',
            './lib/virtual-types-validator.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types-validator.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/index.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/scope/index.js' => Module {
          requests: Map(7) {
            './lib/renamer.js' => '<rootDir>/node_modules/@babel/traverse/lib/scope/lib/renamer.js',
            '../index.js' => '<rootDir>/node_modules/@babel/traverse/lib/index.js',
            './binding.js' => '<rootDir>/node_modules/@babel/traverse/lib/scope/binding.js',
            'globals' => '<rootDir>/node_modules/globals/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            '../cache.js' => '<rootDir>/node_modules/@babel/traverse/lib/cache.js',
            '../visitors.js' => '<rootDir>/node_modules/@babel/traverse/lib/visitors.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/scope/index.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/hub.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/traverse/lib/hub.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/formatters.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/template/lib/formatters.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/builder.js' => Module {
          requests: Map(3) {
            './options.js' => '<rootDir>/node_modules/@babel/template/lib/options.js',
            './string.js' => '<rootDir>/node_modules/@babel/template/lib/string.js',
            './literal.js' => '<rootDir>/node_modules/@babel/template/lib/literal.js'
          },
          id: '<rootDir>/node_modules/@babel/template/lib/builder.js'
        },
        '<rootDir>/node_modules/tslib/tslib.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/tslib/tslib.js'
        },
        '<rootDir>/node_modules/ast-types/lib/main.js' => Module {
          requests: Map(9) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './fork' => '<rootDir>/node_modules/ast-types/lib/fork.js',
            './def/es-proposals' => '<rootDir>/node_modules/ast-types/lib/def/es-proposals.js',
            './def/jsx' => '<rootDir>/node_modules/ast-types/lib/def/jsx.js',
            './def/flow' => '<rootDir>/node_modules/ast-types/lib/def/flow.js',
            './def/esprima' => '<rootDir>/node_modules/ast-types/lib/def/esprima.js',
            './def/babel' => '<rootDir>/node_modules/ast-types/lib/def/babel.js',
            './def/typescript' => '<rootDir>/node_modules/ast-types/lib/def/typescript.js',
            './gen/namedTypes' => '<rootDir>/node_modules/ast-types/lib/gen/namedTypes.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/main.js'
        },
        '<rootDir>/node_modules/recast/lib/parser.js' => Module {
          requests: Map(8) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            'tiny-invariant' => '<rootDir>/node_modules/tiny-invariant/dist/tiny-invariant.cjs.js',
            'ast-types' => '<rootDir>/node_modules/ast-types/lib/main.js',
            './options' => '<rootDir>/node_modules/recast/lib/options.js',
            './lines' => '<rootDir>/node_modules/recast/lib/lines.js',
            './comments' => '<rootDir>/node_modules/recast/lib/comments.js',
            './util' => '<rootDir>/node_modules/recast/lib/util.js',
            'esprima' => '<rootDir>/node_modules/esprima/dist/esprima.js'
          },
          id: '<rootDir>/node_modules/recast/lib/parser.js'
        },
        '<rootDir>/node_modules/recast/lib/printer.js' => Module {
          requests: Map(9) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            'tiny-invariant' => '<rootDir>/node_modules/tiny-invariant/dist/tiny-invariant.cjs.js',
            'ast-types' => '<rootDir>/node_modules/ast-types/lib/main.js',
            './comments' => '<rootDir>/node_modules/recast/lib/comments.js',
            './fast-path' => '<rootDir>/node_modules/recast/lib/fast-path.js',
            './lines' => '<rootDir>/node_modules/recast/lib/lines.js',
            './options' => '<rootDir>/node_modules/recast/lib/options.js',
            './patcher' => '<rootDir>/node_modules/recast/lib/patcher.js',
            './util' => '<rootDir>/node_modules/recast/lib/util.js'
          },
          id: '<rootDir>/node_modules/recast/lib/printer.js'
        },
        '<rootDir>/node_modules/@babel/parser/lib/index.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/parser/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/index.js' => Module {
          requests: Map(2) {
            './source-map.js' => '<rootDir>/node_modules/@babel/generator/lib/source-map.js',
            './printer.js' => '<rootDir>/node_modules/@babel/generator/lib/printer.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/index.js'
        },
        '<rootDir>/node_modules/debug/src/common.js' => Module {
          requests: Map(1) {
            'ms' => '<rootDir>/node_modules/ms/index.js'
          },
          id: '<rootDir>/node_modules/debug/src/common.js'
        },
        '<rootDir>/node_modules/supports-color/index.js' => Module {
          requests: Map(2) {
            'os' => 'external:os',
            'has-flag' => '<rootDir>/node_modules/has-flag/index.js'
          },
          id: '<rootDir>/node_modules/supports-color/index.js'
        },
        '<rootDir>/node_modules/path-parse/index.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/path-parse/index.js'
        },
        '<rootDir>/node_modules/hasown/index.js' => Module {
          requests: Map(1) {
            'function-bind' => '<rootDir>/node_modules/function-bind/index.js'
          },
          id: '<rootDir>/node_modules/hasown/index.js'
        },
        '<rootDir>/node_modules/is-core-module/core.json' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/is-core-module/core.json'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types-validator.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types-validator.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/react/isReactComponent.js' => Module {
          requests: Map(1) {
            '../buildMatchMemberExpression.js' => '<rootDir>/node_modules/@babel/types/lib/validators/buildMatchMemberExpression.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/react/isReactComponent.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/react/isCompatTag.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/types/lib/validators/react/isCompatTag.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/builders/react/buildChildren.js' => Module {
          requests: Map(2) {
            '../../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js',
            '../../utils/react/cleanJSXElementLiteralChild.js' => '<rootDir>/node_modules/@babel/types/lib/utils/react/cleanJSXElementLiteralChild.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/builders/react/buildChildren.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/asserts/assertNode.js' => Module {
          requests: Map(1) {
            '../validators/isNode.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isNode.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/asserts/assertNode.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/asserts/generated/index.js' => Module {
          requests: Map(2) {
            '../../validators/is.js' => '<rootDir>/node_modules/@babel/types/lib/validators/is.js',
            '../../utils/deprecationWarning.js' => '<rootDir>/node_modules/@babel/types/lib/utils/deprecationWarning.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/asserts/generated/index.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/builders/flow/createTypeAnnotationBasedOnTypeof.js' => Module {
          requests: Map(1) {
            '../generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/builders/flow/createTypeAnnotationBasedOnTypeof.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/builders/flow/createFlowUnionType.js' => Module {
          requests: Map(2) {
            '../generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js',
            '../../modifications/flow/removeTypeDuplicates.js' => '<rootDir>/node_modules/@babel/types/lib/modifications/flow/removeTypeDuplicates.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/builders/flow/createFlowUnionType.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/builders/typescript/createTSUnionType.js' => Module {
          requests: Map(3) {
            '../generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js',
            '../../modifications/typescript/removeTypeDuplicates.js' => '<rootDir>/node_modules/@babel/types/lib/modifications/typescript/removeTypeDuplicates.js',
            '../../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/builders/typescript/createTSUnionType.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js' => Module {
          requests: Map(2) {
            '../validateNode.js' => '<rootDir>/node_modules/@babel/types/lib/builders/validateNode.js',
            '../../utils/deprecationWarning.js' => '<rootDir>/node_modules/@babel/types/lib/utils/deprecationWarning.js'
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
        '<rootDir>/node_modules/@babel/types/lib/clone/cloneNode.js' => Module {
          requests: Map(2) {
            '../definitions/index.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/index.js',
            '../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/clone/cloneNode.js'
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
        '<rootDir>/node_modules/@babel/types/lib/comments/inheritsComments.js' => Module {
          requests: Map(3) {
            './inheritTrailingComments.js' => '<rootDir>/node_modules/@babel/types/lib/comments/inheritTrailingComments.js',
            './inheritLeadingComments.js' => '<rootDir>/node_modules/@babel/types/lib/comments/inheritLeadingComments.js',
            './inheritInnerComments.js' => '<rootDir>/node_modules/@babel/types/lib/comments/inheritInnerComments.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/comments/inheritsComments.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/comments/inheritTrailingComments.js' => Module {
          requests: Map(1) {
            '../utils/inherit.js' => '<rootDir>/node_modules/@babel/types/lib/utils/inherit.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/comments/inheritTrailingComments.js'
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
        '<rootDir>/node_modules/@babel/types/lib/converters/toBindingIdentifierName.js' => Module {
          requests: Map(1) {
            './toIdentifier.js' => '<rootDir>/node_modules/@babel/types/lib/converters/toIdentifier.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/toBindingIdentifierName.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/toBlock.js' => Module {
          requests: Map(2) {
            '../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js',
            '../builders/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/toBlock.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/toComputedKey.js' => Module {
          requests: Map(2) {
            '../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js',
            '../builders/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js'
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
            '../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js',
            '../clone/cloneNode.js' => '<rootDir>/node_modules/@babel/types/lib/clone/cloneNode.js',
            '../modifications/removePropertiesDeep.js' => '<rootDir>/node_modules/@babel/types/lib/modifications/removePropertiesDeep.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/toKeyAlias.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/toStatement.js' => Module {
          requests: Map(2) {
            '../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js',
            '../builders/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/toStatement.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/valueToNode.js' => Module {
          requests: Map(2) {
            '../validators/isValidIdentifier.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isValidIdentifier.js',
            '../builders/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/valueToNode.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/definitions/index.js' => Module {
          requests: Map(10) {
            'to-fast-properties' => '<rootDir>/node_modules/to-fast-properties/index.js',
            './core.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/core.js',
            './flow.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/flow.js',
            './jsx.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/jsx.js',
            './misc.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/misc.js',
            './experimental.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/experimental.js',
            './typescript.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/typescript.js',
            './utils.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/utils.js',
            './placeholders.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/placeholders.js',
            './deprecated-aliases.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/deprecated-aliases.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/definitions/index.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/modifications/appendToMemberExpression.js' => Module {
          requests: Map(1) {
            '../builders/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/modifications/appendToMemberExpression.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/modifications/inherits.js' => Module {
          requests: Map(2) {
            '../constants/index.js' => '<rootDir>/node_modules/@babel/types/lib/constants/index.js',
            '../comments/inheritsComments.js' => '<rootDir>/node_modules/@babel/types/lib/comments/inheritsComments.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/modifications/inherits.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/modifications/prependToMemberExpression.js' => Module {
          requests: Map(2) {
            '../builders/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js',
            '../index.js' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/modifications/prependToMemberExpression.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/modifications/removeProperties.js' => Module {
          requests: Map(1) {
            '../constants/index.js' => '<rootDir>/node_modules/@babel/types/lib/constants/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/modifications/removeProperties.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/modifications/removePropertiesDeep.js' => Module {
          requests: Map(2) {
            '../traverse/traverseFast.js' => '<rootDir>/node_modules/@babel/types/lib/traverse/traverseFast.js',
            './removeProperties.js' => '<rootDir>/node_modules/@babel/types/lib/modifications/removeProperties.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/modifications/removePropertiesDeep.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/modifications/flow/removeTypeDuplicates.js' => Module {
          requests: Map(1) {
            '../../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/modifications/flow/removeTypeDuplicates.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js' => Module {
          requests: Map(1) {
            '../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/retrievers/getOuterBindingIdentifiers.js' => Module {
          requests: Map(1) {
            './getBindingIdentifiers.js' => '<rootDir>/node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/retrievers/getOuterBindingIdentifiers.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/traverse/traverse.js' => Module {
          requests: Map(1) {
            '../definitions/index.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/traverse/traverse.js'
        },
        ... 163 more items
      }
    }"
  `);
});

test("only going one module deep via onlyEntrypoint: true", () => {
  const entrypoint = rootDir("src/index.ts");

  const result = walk(entrypoint, { onlyEntrypoint: true });

  expect(inspectAndClean(result)).toMatchInlineSnapshot(`
    "{
      errors: [],
      modules: Map(1) {
        '<rootDir>/src/index.ts' => Module {
          requests: Map(6) {
            './walk' => '<rootDir>/src/walk.ts',
            './types' => '<rootDir>/src/types.ts',
            './default-resolver' => '<rootDir>/src/default-resolver.ts',
            './walker' => '<rootDir>/src/walker.ts',
            './module' => '<rootDir>/src/module.ts',
            './serialize' => '<rootDir>/src/serialize.ts'
          },
          id: '<rootDir>/src/index.ts'
        }
      }
    }"
  `);
});

test("custom resolver function", () => {
  const entrypoint = rootDir("src/index.ts");

  const result = walk(entrypoint, {
    resolver(id, fromFilePath) {
      if (id === "./types") {
        return rootDir("src/walker.ts");
      }

      return `external:__${id}__${fromFilePath}`;
    },
  });

  expect(inspectAndClean(result)).toMatchInlineSnapshot(`
    "{
      errors: [],
      modules: Map(2) {
        '<rootDir>/src/index.ts' => Module {
          requests: Map(6) {
            './walk' => 'external:__./walk__<rootDir>/src/index.ts',
            './types' => '<rootDir>/src/walker.ts',
            './default-resolver' => 'external:__./default-resolver__<rootDir>/src/index.ts',
            './walker' => 'external:__./walker__<rootDir>/src/index.ts',
            './module' => 'external:__./module__<rootDir>/src/index.ts',
            './serialize' => 'external:__./serialize__<rootDir>/src/index.ts'
          },
          id: '<rootDir>/src/index.ts'
        },
        '<rootDir>/src/walker.ts' => Module {
          requests: Map(6) {
            'node:path' => 'external:__node:path__<rootDir>/src/walker.ts',
            'node:events' => 'external:__node:events__<rootDir>/src/walker.ts',
            'parallel-park' => 'external:__parallel-park__<rootDir>/src/walker.ts',
            './module' => 'external:__./module__<rootDir>/src/walker.ts',
            './debug-logger' => 'external:__./debug-logger__<rootDir>/src/walker.ts',
            './types' => '<rootDir>/src/walker.ts'
          },
          id: '<rootDir>/src/walker.ts'
        }
      }
    }"
  `);
});

test("'dependencies' getter", () => {
  const entrypoint = rootDir("src/index.ts");

  const result = walk(entrypoint, { onlyEntrypoint: true });

  const mod = result.modules.get(entrypoint);

  expect(inspectAndClean(mod!.dependencies)).toMatchInlineSnapshot(`
    "Set(6) {
      '<rootDir>/src/walk.ts',
      '<rootDir>/src/types.ts',
      '<rootDir>/src/default-resolver.ts',
      '<rootDir>/src/walker.ts',
      '<rootDir>/src/module.ts',
      '<rootDir>/src/serialize.ts'
    }"
  `);
});
