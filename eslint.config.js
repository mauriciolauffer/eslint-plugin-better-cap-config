import { defineConfig } from "eslint/config";
import json from "@eslint/json";

export default defineConfig([
  // JSON files (basic validation)
  {
    files: ["**/*.json"],
    ignores: [
      "node_modules/**",
      "package-lock.json",
      "pnpm-lock.yaml",
      "dist/**",
      "coverage/**",
    ],
    plugins: {
      json,
    },
    language: "json/json",
    rules: {
      "json/no-duplicate-keys": "error",
    },
  },
]);
