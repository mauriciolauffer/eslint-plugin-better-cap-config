import { defineConfig } from "eslint/config";
import json from "@eslint/json";
import cdsDeprecatedConfig from "./src/index.js";

export default defineConfig([
  {
    files: ["**/*.json"],
    ignores: ["node_modules/**", "package-lock.json", "pnpm-lock.yaml"],
    plugins: {
      json,
      cdsDeprecatedConfig,
    },
    language: "json/json",
    rules: {
      "json/no-duplicate-keys": "error",
      "cdsDeprecatedConfig/no-deprecated-cds-fiori-draft-compat": "warn",
      "cdsDeprecatedConfig/no-deprecated-cds-features-odata-new-adapter":
        "warn",
      "cdsDeprecatedConfig/no-deprecated-cds-features-cds-validate": "warn",
    },
  },
  {
    files: ["cap-cds/**/*.json"],
    ignores: ["package-lock.json"],
    plugins: {
      json,
      cdsDeprecatedConfig,
    },
    language: "json/json",
    rules: {
      "json/no-duplicate-keys": "error",
      "cdsDeprecatedConfig/no-deprecated-cds-fiori-draft-compat": "warn",
      "cdsDeprecatedConfig/no-deprecated-cds-features-odata-new-adapter":
        "warn",
      "cdsDeprecatedConfig/no-deprecated-cds-features-cds-validate": "warn",
    },
  },
]);
