import { defineConfig } from "eslint/config";
import eslintPlugin from "eslint-plugin-eslint-plugin";

export default defineConfig([
  {
    ignores: ["dist/", "coverage/", "docs/", "test/"],
  },
  {
    extends: [eslintPlugin.configs.recommended],
  },
  {
    files: ["**/*.js"],
  },
]);
