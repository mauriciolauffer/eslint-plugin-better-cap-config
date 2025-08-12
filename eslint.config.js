import { defineConfig } from "eslint/config";
import json from "@eslint/json";
import cdsDeprecatedConfig from "./dist/index.js";

export default defineConfig([
  {
    files: ["**/*.json"],
    ignores: ["node_modules/**", "package-lock.json", "pnpm-lock.yaml"],
    plugins: {
      json,
      "cds-deprecated-config": cdsDeprecatedConfig,
    },
    language: "json/json",
    extends: [cdsDeprecatedConfig.configs.recommended],
    rules: {
      "json/no-duplicate-keys": "error",
    },
  },
  {
    files: ["cap-cds/**/*.json"],
    ignores: ["package-lock.json"],
    plugins: {
      json,
      "cds-deprecated-config": cdsDeprecatedConfig,
    },
    language: "json/json",
    extends: [cdsDeprecatedConfig.configs.recommended],
    rules: {
      "json/no-duplicate-keys": "error",
    },
  },
]);
