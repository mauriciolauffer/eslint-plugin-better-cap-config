import type { ESLint } from "eslint";
import { readFile } from "node:fs/promises";
import noDeprecatedCdsFioriDraftCompat from "./rules/no-deprecated-cds-fiori-draft-compat.js";
import noDeprecatedCdsFeaturesOdataNewAdapter from "./rules/no-deprecated-cds-features-odata-new-adapter.js";
import noDeprecatedCdsFeaturesCdsValidate from "./rules/no-deprecated-cds-features-cds-validate.js";

const pkg = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

/**
 * Collection of all available rules in this plugin
 */
const rules = {
  "no-deprecated-cds-fiori-draft-compat": noDeprecatedCdsFioriDraftCompat,
  "no-deprecated-cds-features-odata-new-adapter":
    noDeprecatedCdsFeaturesOdataNewAdapter,
  "no-deprecated-cds-features-cds-validate": noDeprecatedCdsFeaturesCdsValidate,
};

/**
 * ESLint plugin for detecting deprecated CDS configuration patterns
 */
const plugin: ESLint.Plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  rules,
  configs: {
    recommended: {
      plugins: {
        "cds-deprecated-config": null as unknown as ESLint.Plugin, // Placeholder, will be filled below
      },
      rules: {
        "cds-deprecated-config/no-deprecated-cds-fiori-draft-compat": "error",
        "cds-deprecated-config/no-deprecated-cds-features-odata-new-adapter":
          "error",
        "cds-deprecated-config/no-deprecated-cds-features-cds-validate":
          "error",
      },
    },
  },
};

// Fix circular reference after plugin is defined
const recommendedConfig = plugin.configs?.recommended as Record<
  string,
  unknown
>;
(recommendedConfig.plugins as Record<string, ESLint.Plugin>)[
  "cds-deprecated-config"
] = plugin;

export default plugin;
