import type { ESLint } from "eslint";
import { readFile } from "node:fs/promises";
import cdsFioriDraftCompat from "./rules/cds-fiori-draft-compat.js";
import cdsFeaturesOdataNewAdapter from "./rules/cds-features-odata-new-adapter.js";
import cdsFeaturesCdsValidate from "./rules/cds-features-cds-validate.js";

const pkg = JSON.parse(
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

/**
 * Collection of all available rules in this plugin
 */
const rules = {
  "cds-fiori-draft-compat": cdsFioriDraftCompat,
  "cds-features-odata-new-adapter": cdsFeaturesOdataNewAdapter,
  "cds-features-cds-validate": cdsFeaturesCdsValidate,
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
        "cap-config": null as unknown as ESLint.Plugin, // Placeholder, will be filled below
      },
      rules: {
        "cap-config/cds-fiori-draft-compat": "error",
        "cap-config/cds-features-odata-new-adapter": "error",
        "cap-config/cds-features-cds-validate": "error",
      },
    },
  },
};

// Fix circular reference after plugin is defined
const recommendedConfig = plugin.configs?.recommended as Record<
  string,
  unknown
>;
(recommendedConfig.plugins as Record<string, ESLint.Plugin>)["cap-config"] =
  plugin;

export default plugin;
