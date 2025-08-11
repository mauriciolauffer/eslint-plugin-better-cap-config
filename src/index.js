import { JSONLanguage } from "@eslint/json";
import pkg from "../package.json" with { type: "json" };
import noDeprecatedCdsFioriDraftCompat from "./rules/no-deprecated-cds-fiori-draft-compat.js";
import noDeprecatedCdsFeaturesOdataNewAdapter from "./rules/no-deprecated-cds-features-odata-new-adapter.js";
import noDeprecatedCdsFeaturesCdsValidate from "./rules/no-deprecated-cds-features-cds-validate.js";

const rules = {
  "no-deprecated-cds-fiori-draft-compat": noDeprecatedCdsFioriDraftCompat,
  "no-deprecated-cds-features-odata-new-adapter":
    noDeprecatedCdsFeaturesOdataNewAdapter,
  "no-deprecated-cds-features-cds-validate": noDeprecatedCdsFeaturesCdsValidate,
};

const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  languages: {
    json: new JSONLanguage({ mode: "json" }),
  },
  rules,
  configs: {
    recommended: {
      plugins: {},
      rules: {
        "cdsDeprecatedConfig/no-deprecated-cds-fiori-draft-compat": "warn",
        "cdsDeprecatedConfig/no-deprecated-cds-features-odata-new-adapter":
          "warn",
        "cdsDeprecatedConfig/no-deprecated-cds-features-cds-validate": "warn",
      },
    },
  },
};

// Fix circular reference after plugin is defined
plugin.configs.recommended.plugins.cdsDeprecatedConfig = plugin;

export default plugin;
