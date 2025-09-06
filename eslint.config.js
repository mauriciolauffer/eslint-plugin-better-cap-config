import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import node from "eslint-config-mlauffer-nodejs";

export default defineConfig([
  {
    ignores: ["dist/", "coverage/", "docs/", "test/"],
  },
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [node, eslintPlugin.configs.recommended, tseslint.configs.strict],
    rules: {
      "jsdoc/require-param": "off",
      "jsdoc/require-returns": "off",
      "sonarjs/todo-tag": "warn",
      "sonarjs/no-skipped-tests": "warn",
    },
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  }
]);
