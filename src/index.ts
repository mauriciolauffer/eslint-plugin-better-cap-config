import type { ESLint } from "eslint";
import { readFile } from "node:fs/promises";
import cdsFioriDraftCompat from "./rules/cds-fiori-draft-compat.js";
import cdsFeaturesOdataNewAdapter from "./rules/cds-features-odata-new-adapter.js";
import cdsFeaturesCdsValidate from "./rules/cds-features-cds-validate.js";
import cdsFeaturesCompatSaveDrafts from "./rules/cds-features-compat-save-drafts.js";
import cdsFeaturesCompatAssertNotNull from "./rules/cds-features-compat-assert-not-null.js";
import cdsFeaturesCompileForFlows from "./rules/cds-features-compile-for-flows.js";
import cdsFeaturesCompatRestrictWhere from "./rules/cds-features-compat-restrict-where.js";
import cdsFeaturesCompatStaticAuth from "./rules/cds-features-compat-static-auth.js";
import cdsFeaturesCompatRestrictBound from "./rules/cds-features-compat-restrict-bound.js";
import cdsFeaturesBase64Binaries from "./rules/cds-features-base64-binaries.js";
import cdsFeaturesKeysInDataCompat from "./rules/cds-features-keys-in-data-compat.js";
import cdsFeaturesKibanaFormatter from "./rules/cds-features-kibana-formatter.js";
import cdsFioriCalcElements from "./rules/cds-fiori-calc-elements.js";
import cdsRemoteNativeFetch from "./rules/cds-remote-native-fetch.js";
import cdsMultitenantClientCertHeader from "./rules/cds-multitenant-client-cert-header.js";
import cdsLogKibanaCustomFields from "./rules/cds-log-kibana-custom-fields.js";
import cdsSqlRuntimeViewMode from "./rules/cds-sql-runtime-view-mode.js";
import cdsFeaturesNewDraftViaAction from "./rules/cds-features-new-draft-via-action.js";
import cdsFeaturesCompatTextsEntities from "./rules/cds-features-compat-texts-entities.js";
import cdsFeaturesStreamCompat from "./rules/cds-features-stream-compat.js";
import cdsFeaturesAsyncHandlerCompat from "./rules/cds-features-async-handler-compat.js";
import cdsFeaturesServiceLevelRestrictions from "./rules/cds-features-service-level-restrictions.js";
import cdsFeaturesConsistentParams from "./rules/cds-features-consistent-params.js";
import cdsDraftsCancellationTimeout from "./rules/cds-drafts-cancellation-timeout.js";
import cdsRequiresDbDatabase from "./rules/cds-requires-db-database.js";

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
  "cds-features-compat-save-drafts": cdsFeaturesCompatSaveDrafts,
  "cds-features-compat-assert-not-null": cdsFeaturesCompatAssertNotNull,
  "cds-features-compile-for-flows": cdsFeaturesCompileForFlows,
  "cds-features-compat-restrict-where": cdsFeaturesCompatRestrictWhere,
  "cds-features-compat-static-auth": cdsFeaturesCompatStaticAuth,
  "cds-features-compat-restrict-bound": cdsFeaturesCompatRestrictBound,
  "cds-features-base64-binaries": cdsFeaturesBase64Binaries,
  "cds-features-keys-in-data-compat": cdsFeaturesKeysInDataCompat,
  "cds-features-kibana-formatter": cdsFeaturesKibanaFormatter,
  "cds-fiori-calc-elements": cdsFioriCalcElements,
  "cds-remote-native-fetch": cdsRemoteNativeFetch,
  "cds-multitenant-client-cert-header": cdsMultitenantClientCertHeader,
  "cds-log-kibana-custom-fields": cdsLogKibanaCustomFields,
  "cds-sql-runtime-view-mode": cdsSqlRuntimeViewMode,
  "cds-features-new-draft-via-action": cdsFeaturesNewDraftViaAction,
  "cds-features-compat-texts-entities": cdsFeaturesCompatTextsEntities,
  "cds-features-stream-compat": cdsFeaturesStreamCompat,
  "cds-features-async-handler-compat": cdsFeaturesAsyncHandlerCompat,
  "cds-features-service-level-restrictions": cdsFeaturesServiceLevelRestrictions,
  "cds-features-consistent-params": cdsFeaturesConsistentParams,
  "cds-drafts-cancellation-timeout": cdsDraftsCancellationTimeout,
  "cds-requires-db-database": cdsRequiresDbDatabase,
};

/**
 * ESLint plugin for detecting deprecated CDS configuration patterns
 */
const plugin: ESLint.Plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  rules: rules as unknown as ESLint.Plugin["rules"],
  configs: {
    recommended: {
      plugins: {
        "cap-config": null as unknown as ESLint.Plugin, // Placeholder, will be filled below
      },
      rules: {
        "cap-config/cds-fiori-draft-compat": "error",
        "cap-config/cds-features-odata-new-adapter": "error",
        "cap-config/cds-features-cds-validate": "error",
        "cap-config/cds-features-compat-save-drafts": "error",
        "cap-config/cds-features-compat-assert-not-null": "error",
        "cap-config/cds-features-compile-for-flows": "error",
        "cap-config/cds-features-compat-restrict-where": "error",
        "cap-config/cds-features-compat-static-auth": "error",
        "cap-config/cds-features-compat-restrict-bound": "error",
        "cap-config/cds-features-base64-binaries": "error",
        "cap-config/cds-features-keys-in-data-compat": "error",
        "cap-config/cds-features-kibana-formatter": "error",
        "cap-config/cds-fiori-calc-elements": "error",
        "cap-config/cds-remote-native-fetch": "error",
        "cap-config/cds-multitenant-client-cert-header": "error",
        "cap-config/cds-log-kibana-custom-fields": "error",
        "cap-config/cds-sql-runtime-view-mode": "error",
        "cap-config/cds-features-new-draft-via-action": "error",
        "cap-config/cds-features-compat-texts-entities": "error",
        "cap-config/cds-features-stream-compat": "error",
        "cap-config/cds-features-async-handler-compat": "error",
        "cap-config/cds-features-service-level-restrictions": "error",
        "cap-config/cds-features-consistent-params": "error",
        "cap-config/cds-drafts-cancellation-timeout": "error",
        "cap-config/cds-requires-db-database": "error",
      },
    },
  },
};

// Fix circular reference after plugin is defined
const recommendedConfig = plugin.configs?.recommended as Record<string, unknown>;
(recommendedConfig.plugins as Record<string, ESLint.Plugin>)["cap-config"] = plugin;

export default plugin;
