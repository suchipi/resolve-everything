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
          requests: Map(3) {
            'node:module' => 'external:node:module',
            'node:path' => 'external:node:path',
            'resolve' => '<rootDir>/node_modules/resolve/index.js'
          },
          id: '<rootDir>/src/default-resolver.ts'
        },
        '<rootDir>/src/walker.ts' => Module {
          requests: Map(5) {
            'node:path' => 'external:node:path',
            'node:events' => 'external:node:events',
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
      modules: Map(258) {
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
          requests: Map(3) {
            'node:module' => 'external:node:module',
            'node:path' => 'external:node:path',
            'resolve' => '<rootDir>/node_modules/resolve/index.js'
          },
          id: '<rootDir>/src/default-resolver.ts'
        },
        '<rootDir>/src/walker.ts' => Module {
          requests: Map(5) {
            'node:path' => 'external:node:path',
            'node:events' => 'external:node:events',
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
          requests: Map(2) {
            './path/lib/virtual-types.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types.js',
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
            './converters/toSequenceExpression.js' => '<rootDir>/node_modules/@babel/types/lib/converters/toSequenceExpression.js',
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
            './utils/deprecationWarning.js' => '<rootDir>/node_modules/@babel/types/lib/utils/deprecationWarning.js'
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
            'assert' => 'external:assert',
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
            'assert' => 'external:assert',
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
        '<rootDir>/node_modules/@babel/types/lib/converters/toSequenceExpression.js' => Module {
          requests: Map(1) {
            './gatherSequenceExpressions.js' => '<rootDir>/node_modules/@babel/types/lib/converters/gatherSequenceExpressions.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/toSequenceExpression.js'
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
        '<rootDir>/node_modules/@babel/types/lib/traverse/traverseFast.js' => Module {
          requests: Map(1) {
            '../definitions/index.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/traverse/traverseFast.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/utils/shallowEqual.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/types/lib/utils/shallowEqual.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/is.js' => Module {
          requests: Map(4) {
            '../utils/shallowEqual.js' => '<rootDir>/node_modules/@babel/types/lib/utils/shallowEqual.js',
            './isType.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isType.js',
            './isPlaceholderType.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isPlaceholderType.js',
            '../definitions/index.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/is.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/isBinding.js' => Module {
          requests: Map(1) {
            '../retrievers/getBindingIdentifiers.js' => '<rootDir>/node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/isBinding.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/isBlockScoped.js' => Module {
          requests: Map(2) {
            './generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js',
            './isLet.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isLet.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/isBlockScoped.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/isImmutable.js' => Module {
          requests: Map(2) {
            './isType.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isType.js',
            './generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/isImmutable.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/isLet.js' => Module {
          requests: Map(2) {
            './generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js',
            '../constants/index.js' => '<rootDir>/node_modules/@babel/types/lib/constants/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/isLet.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/isNode.js' => Module {
          requests: Map(1) {
            '../definitions/index.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/isNode.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/isNodesEquivalent.js' => Module {
          requests: Map(1) {
            '../definitions/index.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/isNodesEquivalent.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/isPlaceholderType.js' => Module {
          requests: Map(1) {
            '../definitions/index.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/isPlaceholderType.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/isReferenced.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/types/lib/validators/isReferenced.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/isScope.js' => Module {
          requests: Map(1) {
            './generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/isScope.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/isSpecifierDefault.js' => Module {
          requests: Map(1) {
            './generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/isSpecifierDefault.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/isType.js' => Module {
          requests: Map(1) {
            '../definitions/index.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/isType.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/isValidES3Identifier.js' => Module {
          requests: Map(1) {
            './isValidIdentifier.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isValidIdentifier.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/isValidES3Identifier.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/isValidIdentifier.js' => Module {
          requests: Map(1) {
            '@babel/helper-validator-identifier' => '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/isValidIdentifier.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/isVar.js' => Module {
          requests: Map(2) {
            './generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js',
            '../constants/index.js' => '<rootDir>/node_modules/@babel/types/lib/constants/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/isVar.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/matchesPattern.js' => Module {
          requests: Map(1) {
            './generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/matchesPattern.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/validate.js' => Module {
          requests: Map(1) {
            '../definitions/index.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/validate.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/buildMatchMemberExpression.js' => Module {
          requests: Map(1) {
            './matchesPattern.js' => '<rootDir>/node_modules/@babel/types/lib/validators/matchesPattern.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/buildMatchMemberExpression.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js' => Module {
          requests: Map(2) {
            '../../utils/shallowEqual.js' => '<rootDir>/node_modules/@babel/types/lib/utils/shallowEqual.js',
            '../../utils/deprecationWarning.js' => '<rootDir>/node_modules/@babel/types/lib/utils/deprecationWarning.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/utils/deprecationWarning.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/types/lib/utils/deprecationWarning.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/context.js' => Module {
          requests: Map(2) {
            './path/index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/context.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/ancestry.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/ancestry.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/inference/index.js' => Module {
          requests: Map(2) {
            './inferers.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/inference/inferers.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/inference/index.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/replacement.js' => Module {
          requests: Map(7) {
            '@babel/code-frame' => '<rootDir>/node_modules/@babel/code-frame/lib/index.js',
            '../index.js' => '<rootDir>/node_modules/@babel/traverse/lib/index.js',
            './index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/index.js',
            '../cache.js' => '<rootDir>/node_modules/@babel/traverse/lib/cache.js',
            '@babel/parser' => '<rootDir>/node_modules/@babel/parser/lib/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            '@babel/helper-hoist-variables' => '<rootDir>/node_modules/@babel/helper-hoist-variables/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/replacement.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/evaluation.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/evaluation.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/conversion.js' => Module {
          requests: Map(4) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            '@babel/helper-environment-visitor' => '<rootDir>/node_modules/@babel/helper-environment-visitor/lib/index.js',
            '@babel/helper-function-name' => '<rootDir>/node_modules/@babel/helper-function-name/lib/index.js',
            '../visitors.js' => '<rootDir>/node_modules/@babel/traverse/lib/visitors.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/conversion.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/introspection.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/introspection.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/context.js' => Module {
          requests: Map(2) {
            '../traverse-node.js' => '<rootDir>/node_modules/@babel/traverse/lib/traverse-node.js',
            './index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/context.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/removal.js' => Module {
          requests: Map(3) {
            './lib/removal-hooks.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/lib/removal-hooks.js',
            '../cache.js' => '<rootDir>/node_modules/@babel/traverse/lib/cache.js',
            './index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/removal.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/modification.js' => Module {
          requests: Map(4) {
            '../cache.js' => '<rootDir>/node_modules/@babel/traverse/lib/cache.js',
            './lib/hoister.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/lib/hoister.js',
            './index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/modification.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/family.js' => Module {
          requests: Map(2) {
            './index.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/family.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/comments.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/comments.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types-validator.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/lib/virtual-types-validator.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/scope/lib/renamer.js' => Module {
          requests: Map(5) {
            '@babel/helper-split-export-declaration' => '<rootDir>/node_modules/@babel/helper-split-export-declaration/lib/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            '@babel/helper-environment-visitor' => '<rootDir>/node_modules/@babel/helper-environment-visitor/lib/index.js',
            '../../traverse-node.js' => '<rootDir>/node_modules/@babel/traverse/lib/traverse-node.js',
            '../../visitors.js' => '<rootDir>/node_modules/@babel/traverse/lib/visitors.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/scope/lib/renamer.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/scope/binding.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/traverse/lib/scope/binding.js'
        },
        '<rootDir>/node_modules/globals/index.js' => Module {
          requests: Map(1) {
            './globals.json' => '<rootDir>/node_modules/globals/globals.json'
          },
          id: '<rootDir>/node_modules/globals/index.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/options.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/template/lib/options.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/string.js' => Module {
          requests: Map(3) {
            './options.js' => '<rootDir>/node_modules/@babel/template/lib/options.js',
            './parse.js' => '<rootDir>/node_modules/@babel/template/lib/parse.js',
            './populate.js' => '<rootDir>/node_modules/@babel/template/lib/populate.js'
          },
          id: '<rootDir>/node_modules/@babel/template/lib/string.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/literal.js' => Module {
          requests: Map(3) {
            './options.js' => '<rootDir>/node_modules/@babel/template/lib/options.js',
            './parse.js' => '<rootDir>/node_modules/@babel/template/lib/parse.js',
            './populate.js' => '<rootDir>/node_modules/@babel/template/lib/populate.js'
          },
          id: '<rootDir>/node_modules/@babel/template/lib/literal.js'
        },
        '<rootDir>/node_modules/ast-types/lib/fork.js' => Module {
          requests: Map(7) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            './path-visitor' => '<rootDir>/node_modules/ast-types/lib/path-visitor.js',
            './equiv' => '<rootDir>/node_modules/ast-types/lib/equiv.js',
            './path' => '<rootDir>/node_modules/ast-types/lib/path.js',
            './node-path' => '<rootDir>/node_modules/ast-types/lib/node-path.js',
            './shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/fork.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/es-proposals.js' => Module {
          requests: Map(4) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js',
            './es2022' => '<rootDir>/node_modules/ast-types/lib/def/es2022.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/es-proposals.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/jsx.js' => Module {
          requests: Map(4) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './es-proposals' => '<rootDir>/node_modules/ast-types/lib/def/es-proposals.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/jsx.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/flow.js' => Module {
          requests: Map(5) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './es-proposals' => '<rootDir>/node_modules/ast-types/lib/def/es-proposals.js',
            './type-annotations' => '<rootDir>/node_modules/ast-types/lib/def/type-annotations.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/flow.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/esprima.js' => Module {
          requests: Map(4) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './es-proposals' => '<rootDir>/node_modules/ast-types/lib/def/es-proposals.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/esprima.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/babel.js' => Module {
          requests: Map(5) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            './babel-core' => '<rootDir>/node_modules/ast-types/lib/def/babel-core.js',
            './flow' => '<rootDir>/node_modules/ast-types/lib/def/flow.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/babel.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/typescript.js' => Module {
          requests: Map(5) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './babel-core' => '<rootDir>/node_modules/ast-types/lib/def/babel-core.js',
            './type-annotations' => '<rootDir>/node_modules/ast-types/lib/def/type-annotations.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/typescript.js'
        },
        '<rootDir>/node_modules/ast-types/lib/gen/namedTypes.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/ast-types/lib/gen/namedTypes.js'
        },
        '<rootDir>/node_modules/recast/lib/options.js' => Module {
          requests: Map(2) {
            './util' => '<rootDir>/node_modules/recast/lib/util.js',
            '../parsers/esprima' => '<rootDir>/node_modules/recast/parsers/esprima.js'
          },
          id: '<rootDir>/node_modules/recast/lib/options.js'
        },
        '<rootDir>/node_modules/recast/lib/lines.js' => Module {
          requests: Map(6) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            'assert' => 'external:assert',
            'source-map' => '<rootDir>/node_modules/source-map/source-map.js',
            './options' => '<rootDir>/node_modules/recast/lib/options.js',
            './util' => '<rootDir>/node_modules/recast/lib/util.js',
            './mapping' => '<rootDir>/node_modules/recast/lib/mapping.js'
          },
          id: '<rootDir>/node_modules/recast/lib/lines.js'
        },
        '<rootDir>/node_modules/recast/lib/comments.js' => Module {
          requests: Map(5) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            'assert' => 'external:assert',
            'ast-types' => '<rootDir>/node_modules/ast-types/lib/main.js',
            './lines' => '<rootDir>/node_modules/recast/lib/lines.js',
            './util' => '<rootDir>/node_modules/recast/lib/util.js'
          },
          id: '<rootDir>/node_modules/recast/lib/comments.js'
        },
        '<rootDir>/node_modules/recast/lib/util.js' => Module {
          requests: Map(5) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            'assert' => 'external:assert',
            'ast-types' => '<rootDir>/node_modules/ast-types/lib/main.js',
            'source-map' => '<rootDir>/node_modules/source-map/source-map.js',
            'os' => 'external:os'
          },
          id: '<rootDir>/node_modules/recast/lib/util.js'
        },
        '<rootDir>/node_modules/esprima/dist/esprima.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/esprima/dist/esprima.js'
        },
        '<rootDir>/node_modules/recast/lib/fast-path.js' => Module {
          requests: Map(4) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            'assert' => 'external:assert',
            'ast-types' => '<rootDir>/node_modules/ast-types/lib/main.js',
            './util' => '<rootDir>/node_modules/recast/lib/util.js'
          },
          id: '<rootDir>/node_modules/recast/lib/fast-path.js'
        },
        '<rootDir>/node_modules/recast/lib/patcher.js' => Module {
          requests: Map(6) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            'assert' => 'external:assert',
            './lines' => '<rootDir>/node_modules/recast/lib/lines.js',
            'ast-types' => '<rootDir>/node_modules/ast-types/lib/main.js',
            './util' => '<rootDir>/node_modules/recast/lib/util.js',
            './fast-path' => '<rootDir>/node_modules/recast/lib/fast-path.js'
          },
          id: '<rootDir>/node_modules/recast/lib/patcher.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/source-map.js' => Module {
          requests: Map(2) {
            '@jridgewell/gen-mapping' => '<rootDir>/node_modules/@jridgewell/gen-mapping/dist/gen-mapping.umd.js',
            '@jridgewell/trace-mapping' => '<rootDir>/node_modules/@jridgewell/trace-mapping/dist/trace-mapping.umd.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/source-map.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/printer.js' => Module {
          requests: Map(4) {
            './buffer.js' => '<rootDir>/node_modules/@babel/generator/lib/buffer.js',
            './node/index.js' => '<rootDir>/node_modules/@babel/generator/lib/node/index.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            './generators/index.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/printer.js'
        },
        '<rootDir>/node_modules/ms/index.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/ms/index.js'
        },
        '<rootDir>/node_modules/has-flag/index.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/has-flag/index.js'
        },
        '<rootDir>/node_modules/function-bind/index.js' => Module {
          requests: Map(1) {
            './implementation' => '<rootDir>/node_modules/function-bind/implementation.js'
          },
          id: '<rootDir>/node_modules/function-bind/index.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/utils/react/cleanJSXElementLiteralChild.js' => Module {
          requests: Map(2) {
            '../../builders/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js',
            '../../index.js' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/utils/react/cleanJSXElementLiteralChild.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/modifications/typescript/removeTypeDuplicates.js' => Module {
          requests: Map(1) {
            '../../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/modifications/typescript/removeTypeDuplicates.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/builders/validateNode.js' => Module {
          requests: Map(2) {
            '../validators/validate.js' => '<rootDir>/node_modules/@babel/types/lib/validators/validate.js',
            '../index.js' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/builders/validateNode.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/utils/inherit.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/types/lib/utils/inherit.js'
        },
        '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/index.js' => Module {
          requests: Map(2) {
            './identifier.js' => '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/identifier.js',
            './keyword.js' => '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/keyword.js'
          },
          id: '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/converters/gatherSequenceExpressions.js' => Module {
          requests: Map(4) {
            '../retrievers/getBindingIdentifiers.js' => '<rootDir>/node_modules/@babel/types/lib/retrievers/getBindingIdentifiers.js',
            '../validators/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/validators/generated/index.js',
            '../builders/generated/index.js' => '<rootDir>/node_modules/@babel/types/lib/builders/generated/index.js',
            '../clone/cloneNode.js' => '<rootDir>/node_modules/@babel/types/lib/clone/cloneNode.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/converters/gatherSequenceExpressions.js'
        },
        '<rootDir>/node_modules/to-fast-properties/index.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/to-fast-properties/index.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/definitions/core.js' => Module {
          requests: Map(6) {
            '../validators/is.js' => '<rootDir>/node_modules/@babel/types/lib/validators/is.js',
            '../validators/isValidIdentifier.js' => '<rootDir>/node_modules/@babel/types/lib/validators/isValidIdentifier.js',
            '@babel/helper-validator-identifier' => '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/index.js',
            '@babel/helper-string-parser' => '<rootDir>/node_modules/@babel/helper-string-parser/lib/index.js',
            '../constants/index.js' => '<rootDir>/node_modules/@babel/types/lib/constants/index.js',
            './utils.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/utils.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/definitions/core.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/definitions/flow.js' => Module {
          requests: Map(1) {
            './utils.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/utils.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/definitions/flow.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/definitions/jsx.js' => Module {
          requests: Map(1) {
            './utils.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/utils.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/definitions/jsx.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/definitions/misc.js' => Module {
          requests: Map(2) {
            './utils.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/utils.js',
            './placeholders.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/placeholders.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/definitions/misc.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/definitions/experimental.js' => Module {
          requests: Map(1) {
            './utils.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/utils.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/definitions/experimental.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/definitions/typescript.js' => Module {
          requests: Map(3) {
            './utils.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/utils.js',
            './core.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/core.js',
            '../validators/is.js' => '<rootDir>/node_modules/@babel/types/lib/validators/is.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/definitions/typescript.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/definitions/utils.js' => Module {
          requests: Map(2) {
            '../validators/is.js' => '<rootDir>/node_modules/@babel/types/lib/validators/is.js',
            '../validators/validate.js' => '<rootDir>/node_modules/@babel/types/lib/validators/validate.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/definitions/utils.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/definitions/placeholders.js' => Module {
          requests: Map(1) {
            './utils.js' => '<rootDir>/node_modules/@babel/types/lib/definitions/utils.js'
          },
          id: '<rootDir>/node_modules/@babel/types/lib/definitions/placeholders.js'
        },
        '<rootDir>/node_modules/@babel/types/lib/definitions/deprecated-aliases.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/types/lib/definitions/deprecated-aliases.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/inference/inferers.js' => Module {
          requests: Map(3) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            './inferer-reference.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/inference/inferer-reference.js',
            './util.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/inference/util.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/inference/inferers.js'
        },
        '<rootDir>/node_modules/@babel/code-frame/lib/index.js' => Module {
          requests: Map(2) {
            '@babel/highlight' => '<rootDir>/node_modules/@babel/highlight/lib/index.js',
            'chalk' => '<rootDir>/node_modules/chalk/index.js'
          },
          id: '<rootDir>/node_modules/@babel/code-frame/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/helper-hoist-variables/lib/index.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/helper-hoist-variables/lib/index.js'
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
        '<rootDir>/node_modules/@babel/traverse/lib/path/lib/removal-hooks.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/lib/removal-hooks.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/lib/hoister.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/lib/hoister.js'
        },
        '<rootDir>/node_modules/@babel/helper-split-export-declaration/lib/index.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/helper-split-export-declaration/lib/index.js'
        },
        '<rootDir>/node_modules/globals/globals.json' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/globals/globals.json'
        },
        '<rootDir>/node_modules/@babel/template/lib/parse.js' => Module {
          requests: Map(3) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            '@babel/parser' => '<rootDir>/node_modules/@babel/parser/lib/index.js',
            '@babel/code-frame' => '<rootDir>/node_modules/@babel/code-frame/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/template/lib/parse.js'
        },
        '<rootDir>/node_modules/@babel/template/lib/populate.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/template/lib/populate.js'
        },
        '<rootDir>/node_modules/ast-types/lib/types.js' => Module {
          requests: Map(2) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/types.js'
        },
        '<rootDir>/node_modules/ast-types/lib/path-visitor.js' => Module {
          requests: Map(4) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            './node-path' => '<rootDir>/node_modules/ast-types/lib/node-path.js',
            './shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/path-visitor.js'
        },
        '<rootDir>/node_modules/ast-types/lib/equiv.js' => Module {
          requests: Map(3) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './shared' => '<rootDir>/node_modules/ast-types/lib/shared.js',
            './types' => '<rootDir>/node_modules/ast-types/lib/types.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/equiv.js'
        },
        '<rootDir>/node_modules/ast-types/lib/path.js' => Module {
          requests: Map(3) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './shared' => '<rootDir>/node_modules/ast-types/lib/shared.js',
            './types' => '<rootDir>/node_modules/ast-types/lib/types.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/path.js'
        },
        '<rootDir>/node_modules/ast-types/lib/node-path.js' => Module {
          requests: Map(5) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            './path' => '<rootDir>/node_modules/ast-types/lib/path.js',
            './scope' => '<rootDir>/node_modules/ast-types/lib/scope.js',
            './shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/node-path.js'
        },
        '<rootDir>/node_modules/ast-types/lib/shared.js' => Module {
          requests: Map(2) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './types' => '<rootDir>/node_modules/ast-types/lib/types.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/shared.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/es2022.js' => Module {
          requests: Map(4) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './es2021' => '<rootDir>/node_modules/ast-types/lib/def/es2021.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/es2022.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/type-annotations.js' => Module {
          requests: Map(3) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/type-annotations.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/babel-core.js' => Module {
          requests: Map(4) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './es-proposals' => '<rootDir>/node_modules/ast-types/lib/def/es-proposals.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/babel-core.js'
        },
        '<rootDir>/node_modules/recast/parsers/esprima.js' => Module {
          requests: Map(2) {
            '../lib/util' => '<rootDir>/node_modules/recast/lib/util.js',
            'esprima' => '<rootDir>/node_modules/esprima/dist/esprima.js'
          },
          id: '<rootDir>/node_modules/recast/parsers/esprima.js'
        },
        '<rootDir>/node_modules/source-map/source-map.js' => Module {
          requests: Map(3) {
            './lib/source-map-generator' => '<rootDir>/node_modules/source-map/lib/source-map-generator.js',
            './lib/source-map-consumer' => '<rootDir>/node_modules/source-map/lib/source-map-consumer.js',
            './lib/source-node' => '<rootDir>/node_modules/source-map/lib/source-node.js'
          },
          id: '<rootDir>/node_modules/source-map/source-map.js'
        },
        '<rootDir>/node_modules/recast/lib/mapping.js' => Module {
          requests: Map(3) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            'assert' => 'external:assert',
            './util' => '<rootDir>/node_modules/recast/lib/util.js'
          },
          id: '<rootDir>/node_modules/recast/lib/mapping.js'
        },
        '<rootDir>/node_modules/@jridgewell/gen-mapping/dist/gen-mapping.umd.js' => Module {
          requests: Map(3) {
            '@jridgewell/set-array' => '<rootDir>/node_modules/@jridgewell/set-array/dist/set-array.umd.js',
            '@jridgewell/sourcemap-codec' => '<rootDir>/node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.umd.js',
            '@jridgewell/trace-mapping' => '<rootDir>/node_modules/@jridgewell/trace-mapping/dist/trace-mapping.umd.js'
          },
          id: '<rootDir>/node_modules/@jridgewell/gen-mapping/dist/gen-mapping.umd.js'
        },
        '<rootDir>/node_modules/@jridgewell/trace-mapping/dist/trace-mapping.umd.js' => Module {
          requests: Map(2) {
            '@jridgewell/sourcemap-codec' => '<rootDir>/node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.umd.js',
            '@jridgewell/resolve-uri' => '<rootDir>/node_modules/@jridgewell/resolve-uri/dist/resolve-uri.umd.js'
          },
          id: '<rootDir>/node_modules/@jridgewell/trace-mapping/dist/trace-mapping.umd.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/buffer.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/generator/lib/buffer.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/node/index.js' => Module {
          requests: Map(3) {
            './whitespace.js' => '<rootDir>/node_modules/@babel/generator/lib/node/whitespace.js',
            './parentheses.js' => '<rootDir>/node_modules/@babel/generator/lib/node/parentheses.js',
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/node/index.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/index.js' => Module {
          requests: Map(11) {
            './template-literals.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/template-literals.js',
            './expressions.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/expressions.js',
            './statements.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/statements.js',
            './classes.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/classes.js',
            './methods.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/methods.js',
            './modules.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/modules.js',
            './types.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/types.js',
            './flow.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/flow.js',
            './base.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/base.js',
            './jsx.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/jsx.js',
            './typescript.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/typescript.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/index.js'
        },
        '<rootDir>/node_modules/function-bind/implementation.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/function-bind/implementation.js'
        },
        '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/identifier.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/identifier.js'
        },
        '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/keyword.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/keyword.js'
        },
        '<rootDir>/node_modules/@babel/helper-string-parser/lib/index.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/helper-string-parser/lib/index.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/inference/inferer-reference.js' => Module {
          requests: Map(2) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            './util.js' => '<rootDir>/node_modules/@babel/traverse/lib/path/inference/util.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/inference/inferer-reference.js'
        },
        '<rootDir>/node_modules/@babel/traverse/lib/path/inference/util.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/traverse/lib/path/inference/util.js'
        },
        '<rootDir>/node_modules/@babel/highlight/lib/index.js' => Module {
          requests: Map(3) {
            'js-tokens' => '<rootDir>/node_modules/js-tokens/index.js',
            '@babel/helper-validator-identifier' => '<rootDir>/node_modules/@babel/helper-validator-identifier/lib/index.js',
            'chalk' => '<rootDir>/node_modules/chalk/index.js'
          },
          id: '<rootDir>/node_modules/@babel/highlight/lib/index.js'
        },
        '<rootDir>/node_modules/chalk/index.js' => Module {
          requests: Map(4) {
            'escape-string-regexp' => '<rootDir>/node_modules/escape-string-regexp/index.js',
            'ansi-styles' => '<rootDir>/node_modules/ansi-styles/index.js',
            'supports-color' => '<rootDir>/node_modules/supports-color/index.js',
            './templates.js' => '<rootDir>/node_modules/chalk/templates.js'
          },
          id: '<rootDir>/node_modules/chalk/index.js'
        },
        '<rootDir>/node_modules/ast-types/lib/scope.js' => Module {
          requests: Map(3) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './shared' => '<rootDir>/node_modules/ast-types/lib/shared.js',
            './types' => '<rootDir>/node_modules/ast-types/lib/types.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/scope.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/es2021.js' => Module {
          requests: Map(4) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './operators/es2021' => '<rootDir>/node_modules/ast-types/lib/def/operators/es2021.js',
            './es2020' => '<rootDir>/node_modules/ast-types/lib/def/es2020.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/es2021.js'
        },
        '<rootDir>/node_modules/source-map/lib/source-map-generator.js' => Module {
          requests: Map(4) {
            './base64-vlq' => '<rootDir>/node_modules/source-map/lib/base64-vlq.js',
            './util' => '<rootDir>/node_modules/source-map/lib/util.js',
            './array-set' => '<rootDir>/node_modules/source-map/lib/array-set.js',
            './mapping-list' => '<rootDir>/node_modules/source-map/lib/mapping-list.js'
          },
          id: '<rootDir>/node_modules/source-map/lib/source-map-generator.js'
        },
        '<rootDir>/node_modules/source-map/lib/source-map-consumer.js' => Module {
          requests: Map(5) {
            './util' => '<rootDir>/node_modules/source-map/lib/util.js',
            './binary-search' => '<rootDir>/node_modules/source-map/lib/binary-search.js',
            './array-set' => '<rootDir>/node_modules/source-map/lib/array-set.js',
            './base64-vlq' => '<rootDir>/node_modules/source-map/lib/base64-vlq.js',
            './quick-sort' => '<rootDir>/node_modules/source-map/lib/quick-sort.js'
          },
          id: '<rootDir>/node_modules/source-map/lib/source-map-consumer.js'
        },
        '<rootDir>/node_modules/source-map/lib/source-node.js' => Module {
          requests: Map(2) {
            './source-map-generator' => '<rootDir>/node_modules/source-map/lib/source-map-generator.js',
            './util' => '<rootDir>/node_modules/source-map/lib/util.js'
          },
          id: '<rootDir>/node_modules/source-map/lib/source-node.js'
        },
        '<rootDir>/node_modules/@jridgewell/set-array/dist/set-array.umd.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@jridgewell/set-array/dist/set-array.umd.js'
        },
        '<rootDir>/node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.umd.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.umd.js'
        },
        '<rootDir>/node_modules/@jridgewell/resolve-uri/dist/resolve-uri.umd.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@jridgewell/resolve-uri/dist/resolve-uri.umd.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/node/whitespace.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/node/whitespace.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/node/parentheses.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/node/parentheses.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/template-literals.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/template-literals.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/expressions.js' => Module {
          requests: Map(2) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            '../node/index.js' => '<rootDir>/node_modules/@babel/generator/lib/node/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/expressions.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/statements.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/statements.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/classes.js' => Module {
          requests: Map(1) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/classes.js'
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
        '<rootDir>/node_modules/@babel/generator/lib/generators/types.js' => Module {
          requests: Map(2) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            'jsesc' => '<rootDir>/node_modules/jsesc/jsesc.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/types.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/flow.js' => Module {
          requests: Map(3) {
            '@babel/types' => '<rootDir>/node_modules/@babel/types/lib/index.js',
            './modules.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/modules.js',
            './types.js' => '<rootDir>/node_modules/@babel/generator/lib/generators/types.js'
          },
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/flow.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/base.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/base.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/jsx.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/jsx.js'
        },
        '<rootDir>/node_modules/@babel/generator/lib/generators/typescript.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/@babel/generator/lib/generators/typescript.js'
        },
        '<rootDir>/node_modules/js-tokens/index.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/js-tokens/index.js'
        },
        '<rootDir>/node_modules/escape-string-regexp/index.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/escape-string-regexp/index.js'
        },
        '<rootDir>/node_modules/ansi-styles/index.js' => Module {
          requests: Map(1) {
            'color-convert' => '<rootDir>/node_modules/color-convert/index.js'
          },
          id: '<rootDir>/node_modules/ansi-styles/index.js'
        },
        '<rootDir>/node_modules/chalk/templates.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/chalk/templates.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/operators/es2021.js' => Module {
          requests: Map(3) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            '../../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js',
            './es2020' => '<rootDir>/node_modules/ast-types/lib/def/operators/es2020.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/operators/es2021.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/es2020.js' => Module {
          requests: Map(5) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './operators/es2020' => '<rootDir>/node_modules/ast-types/lib/def/operators/es2020.js',
            './es2019' => '<rootDir>/node_modules/ast-types/lib/def/es2019.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/es2020.js'
        },
        '<rootDir>/node_modules/source-map/lib/base64-vlq.js' => Module {
          requests: Map(1) {
            './base64' => '<rootDir>/node_modules/source-map/lib/base64.js'
          },
          id: '<rootDir>/node_modules/source-map/lib/base64-vlq.js'
        },
        '<rootDir>/node_modules/source-map/lib/util.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/source-map/lib/util.js'
        },
        '<rootDir>/node_modules/source-map/lib/array-set.js' => Module {
          requests: Map(1) {
            './util' => '<rootDir>/node_modules/source-map/lib/util.js'
          },
          id: '<rootDir>/node_modules/source-map/lib/array-set.js'
        },
        '<rootDir>/node_modules/source-map/lib/mapping-list.js' => Module {
          requests: Map(1) {
            './util' => '<rootDir>/node_modules/source-map/lib/util.js'
          },
          id: '<rootDir>/node_modules/source-map/lib/mapping-list.js'
        },
        '<rootDir>/node_modules/source-map/lib/binary-search.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/source-map/lib/binary-search.js'
        },
        '<rootDir>/node_modules/source-map/lib/quick-sort.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/source-map/lib/quick-sort.js'
        },
        '<rootDir>/node_modules/jsesc/jsesc.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/jsesc/jsesc.js'
        },
        '<rootDir>/node_modules/color-convert/index.js' => Module {
          requests: Map(2) {
            './conversions' => '<rootDir>/node_modules/color-convert/conversions.js',
            './route' => '<rootDir>/node_modules/color-convert/route.js'
          },
          id: '<rootDir>/node_modules/color-convert/index.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/operators/es2020.js' => Module {
          requests: Map(3) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            '../../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js',
            './es2016' => '<rootDir>/node_modules/ast-types/lib/def/operators/es2016.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/operators/es2020.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/es2019.js' => Module {
          requests: Map(4) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './es2018' => '<rootDir>/node_modules/ast-types/lib/def/es2018.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/es2019.js'
        },
        '<rootDir>/node_modules/source-map/lib/base64.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/source-map/lib/base64.js'
        },
        '<rootDir>/node_modules/color-convert/conversions.js' => Module {
          requests: Map(1) {
            'color-name' => '<rootDir>/node_modules/color-name/index.js'
          },
          id: '<rootDir>/node_modules/color-convert/conversions.js'
        },
        '<rootDir>/node_modules/color-convert/route.js' => Module {
          requests: Map(1) {
            './conversions' => '<rootDir>/node_modules/color-convert/conversions.js'
          },
          id: '<rootDir>/node_modules/color-convert/route.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/operators/es2016.js' => Module {
          requests: Map(3) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            '../../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js',
            './core' => '<rootDir>/node_modules/ast-types/lib/def/operators/core.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/operators/es2016.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/es2018.js' => Module {
          requests: Map(4) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './es2017' => '<rootDir>/node_modules/ast-types/lib/def/es2017.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/es2018.js'
        },
        '<rootDir>/node_modules/color-name/index.js' => Module {
          requests: Map(0) {},
          id: '<rootDir>/node_modules/color-name/index.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/operators/core.js' => Module {
          requests: Map(1) {
            '../../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/operators/core.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/es2017.js' => Module {
          requests: Map(4) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './es2016' => '<rootDir>/node_modules/ast-types/lib/def/es2016.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/es2017.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/es2016.js' => Module {
          requests: Map(4) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './operators/es2016' => '<rootDir>/node_modules/ast-types/lib/def/operators/es2016.js',
            './es6' => '<rootDir>/node_modules/ast-types/lib/def/es6.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/es2016.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/es6.js' => Module {
          requests: Map(4) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './core' => '<rootDir>/node_modules/ast-types/lib/def/core.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/es6.js'
        },
        '<rootDir>/node_modules/ast-types/lib/def/core.js' => Module {
          requests: Map(4) {
            'tslib' => '<rootDir>/node_modules/tslib/tslib.js',
            './operators/core' => '<rootDir>/node_modules/ast-types/lib/def/operators/core.js',
            '../types' => '<rootDir>/node_modules/ast-types/lib/types.js',
            '../shared' => '<rootDir>/node_modules/ast-types/lib/shared.js'
          },
          id: '<rootDir>/node_modules/ast-types/lib/def/core.js'
        }
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
          requests: Map(5) {
            'node:path' => 'external:__node:path__<rootDir>/src/walker.ts',
            'node:events' => 'external:__node:events__<rootDir>/src/walker.ts',
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
