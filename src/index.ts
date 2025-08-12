import type { ESLint } from "eslint";
import { JSONLanguage } from "@eslint/json";
// import pkg from "../package.json" with { type: "json" };
import noDeprecatedCdsFioriDraftCompat from "./rules/no-deprecated-cds-fiori-draft-compat.js";
import noDeprecatedCdsFeaturesOdataNewAdapter from "./rules/no-deprecated-cds-features-odata-new-adapter.js";
import noDeprecatedCdsFeaturesCdsValidate from "./rules/no-deprecated-cds-features-cds-validate.js";

const rules = {
  "no-deprecated-cds-fiori-draft-compat": noDeprecatedCdsFioriDraftCompat,
  "no-deprecated-cds-features-odata-new-adapter":
    noDeprecatedCdsFeaturesOdataNewAdapter,
  "no-deprecated-cds-features-cds-validate": noDeprecatedCdsFeaturesCdsValidate,
};

const plugin: ESLint.Plugin = {
  /* meta: {
    name: pkg.name,
    version: pkg.version,
  }, */
  meta: {
    name: "eslint-plugin-cds-deprecated-config",
    version: "0.0.1",
  },
  languages: {
    json: new JSONLanguage({ mode: "json" }),
  },
  rules,
  configs: {
    recommended: {
      plugins: {
        "cds-deprecated-config": null as any, // Placeholder, will be filled below
      },
      language: "cds-deprecated-config/json",
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
(plugin.configs as any).recommended.plugins["cds-deprecated-config"] = plugin;

export default plugin;
