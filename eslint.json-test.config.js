import { defineConfig } from "eslint/config";
import json from "@eslint/json";
import capConfig from "./dist/index.js";

export default defineConfig([
  {
    ignores: ["dist/", "coverage/", "docs/", "test/"],
  },
  {
    ignores: ["package-lock.json"],
    files: ["**/*.json"],
    plugins: {
      json,
    },
    language: "json/json",
    extends: [capConfig.configs.recommended],
  },
]);
