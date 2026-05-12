# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Commands

```bash
pnpm build              # compile TypeScript to dist/
pnpm test               # build + run all tests
pnpm test:watch         # run tests in watch mode (no build step)
pnpm test:coverage      # run tests with coverage report
pnpm lint               # eslint + oxfmt --check
pnpm lint:fix           # eslint --fix + oxfmt (auto-format)
pnpm test:lint:json     # run the plugin against cap-cds/ using the built dist/
```

To run a single test file:

```bash
pnpm exec vitest run test/cds-fiori-draft-compat.test.ts
```

`pnpm test` always rebuilds before running — use `pnpm exec vitest run` directly to skip the build when iterating on tests.

## Architecture

This is an ESLint plugin that operates on **JSON files** (not JS/TS source) via `@eslint/json`, detecting deprecated [SAP CAP Node.js](https://cap.cloud.sap/docs/get-started/) configuration keys.

### How rules work

Rules use `JSONRuleDefinition` from `@eslint/json` rather than the standard ESLint `RuleDefinition`. The JSON language plugin exposes a `Member` visitor node (from the `@humanwhocodes/momoa` JSON AST), which is what all rules hook into. Because `JSONRuleDefinition` is structurally incompatible with `ESLint.Plugin["rules"]`, the `rules` object in `src/index.ts` is cast via `as unknown as ESLint.Plugin["rules"]`.

### Shared detection logic

All rules delegate to `checkDeprecatedCdsPattern()` in `src/utils/rule-utils.ts`. It checks:

1. The `Member` node's key matches `pattern.key` (e.g. `"draft_compat"`)
2. The immediate `Member` ancestor's key matches `pattern.parentKey` (e.g. `"fiori"`)
3. Optionally, the node's value matches `pattern.deprecatedValue`

This means rules match by **relative position** (`parentKey → key`), not by checking the full path from root. A key `fiori.draft_compat` is flagged whether it appears under `cds.fiori` in `package.json` or directly at root in `.cdsrc.json` — both are valid CAP config patterns.

### Adding a new rule

1. Create `src/rules/<rule-name>.ts` — copy an existing rule as a template, define `JSONRuleDefinition` with a unique `MessageIds` type, call `checkDeprecatedCdsPattern()` from the `Member` visitor.
2. Register it in `src/index.ts` in the `rules` object and in `configs.recommended.rules`.
3. Add a test file at `test/<rule-name>.test.ts` using `RuleTester` (see existing tests for structure — `ruleTester.run()` must be called at the top level or directly inside `describe()`, not nested inside `it()`).
4. Add a docs file at `docs/rules/<rule-name>.md`.

### Testing approach

- Test Runner is [Vitest](https://vitest.dev/guide/)
- **Unit tests** (`test/<rule-name>.test.ts`): Use ESLint's `RuleTester` with `language: "json/json"`. Tests import from `src/index.ts` directly (no build needed when using `vitest run` directly).
- **Integration tests** (`test/integration.test.ts`): Instantiate `ESLint` programmatically and call `lintText()` to verify end-to-end behaviour.
- **Real-world lint test** (`pnpm test:lint:json`): Runs the built plugin against `cap-cds/package.json`, which contains actual deprecated CAP configs used as a fixture.

### Key dependency constraints

- `vitest` is pinned to match `@vitest/coverage-v8` and `@vitest/ui` — do not upgrade independently.
- `@eslint/json` is a **peer dependency** (not bundled); consumers must install it alongside ESLint.
