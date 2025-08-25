import tseslint from "typescript-eslint";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import node from "eslint-config-mlauffer-nodejs";

export default tseslint.config([
  {
    ignores: ["dist/", "coverage/", "docs/", "test/"],
  },
  {
    extends: [node, eslintPlugin.configs.recommended, tseslint.configs.strict],
    rules: {
      "jsdoc/require-param": "off",
      "jsdoc/require-returns": "off",
      "sonarjs/todo-tag": "warn",
      "sonarjs/no-skipped-tests": "warn",
    },
  },
]);
