import { describe, it, expect } from "vitest";
import json from "@eslint/json";
import { ESLint } from "eslint";
import plugin from "../src/index.js";

describe("integration tests", () => {
  it("should detect deprecated cds.features.odata_new_adapter in package.json", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: {
            "cap-config": plugin,
            json,
          },
          language: "json/json",
          rules: {
            "cap-config/cds-features-odata-new-adapter": "warn",
          },
        },
      ],
    });

    const deprecatedJson =
      '{"name": "test-app", "cds": {"features": {"odata_new_adapter": false}}}';
    const results = await eslint.lintText(deprecatedJson, {
      filePath: "package.json",
    });

    expect(results).toHaveLength(1);
    expect(results[0].errorCount).toBe(0);
    expect(results[0].warningCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-features-odata-new-adapter");
  });

  it("should detect deprecated cds.features.cds_validate in .cdsrc.json", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: {
            "cap-config": plugin,
            json,
          },
          language: "json/json",
          rules: {
            "cap-config/cds-features-cds-validate": "error",
          },
        },
      ],
    });

    const deprecatedJson = '{"features": {"cds_validate": false}}';
    const results = await eslint.lintText(deprecatedJson, {
      filePath: ".cdsrc.json",
    });

    expect(results).toHaveLength(1);
    expect(results[0].errorCount).toBe(1);
    expect(results[0].warningCount).toBe(0);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-features-cds-validate");
  });

  it("should detect deprecated cds.fiori.draft_compat in package.json", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: {
            "cap-config": plugin,
            json,
          },
          language: "json/json",
          rules: {
            "cap-config/cds-fiori-draft-compat": "error",
          },
        },
      ],
    });

    const deprecatedJson = '{"name": "test-app", "cds": {"fiori": {"draft_compat": true}}}';
    const results = await eslint.lintText(deprecatedJson, {
      filePath: "package.json",
    });

    expect(results).toHaveLength(1);
    expect(results[0].errorCount).toBe(1);
    expect(results[0].warningCount).toBe(0);
    expect(results[0].messages[0].ruleId).toStrictEqual("cap-config/cds-fiori-draft-compat");
  });

  it.skip("should work with recommended config", async () => {
    const recommendedConfig = {
      rules: {
        "cap-config/cds-fiori-draft-compat": "error",
        "cap-config/cds-features-odata-new-adapter": "error",
        "cap-config/cds-features-cds-validate": "error",
      },
    };

    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: {
            "cap-config": plugin,
          },
          ...recommendedConfig,
        } as any,
      ],
    });

    const deprecatedJson =
      '{"name": "test-app", "cds": {"features": {"odata_new_adapter": false, "cds_validate": false}, "fiori": {"draft_compat": true}}}';
    const results = await eslint.lintText(deprecatedJson, {
      filePath: "package.json",
    });

    expect(results).toHaveLength(1);
    expect(results[0].errorCount).toBe(3);
    expect(results[0].warningCount).toBe(0);

    const ruleIds = results[0].messages.map((m) => m.ruleId);
    expect(ruleIds.includes("cap-config/cds-features-odata-new-adapter")).toBe(true);
    expect(ruleIds.includes("cap-config/cds-features-cds-validate")).toBe(true);
    expect(ruleIds.includes("cap-config/cds-fiori-draft-compat")).toBe(true);
  });

  it("should not report errors for valid configurations", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: {
            "cap-config": plugin,
            json,
          },
          language: "json/json",
          rules: {
            "cap-config/cds-fiori-draft-compat": "error",
            "cap-config/cds-features-odata-new-adapter": "error",
            "cap-config/cds-features-cds-validate": "error",
          },
        } as any,
      ],
    });

    const validJson =
      '{"name": "test-app", "cds": {"features": {"odata_new_adapter": true, "cds_validate": true}, "fiori": {"preview": true}}}';
    const results = await eslint.lintText(validJson, {
      filePath: "package.json",
    });

    expect(results).toHaveLength(1);
    expect(results[0].errorCount).toBe(0);
    expect(results[0].warningCount).toBe(0);
  });

  it("should handle complex nested structures", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: {
            "cap-config": plugin,
            json,
          },
          language: "json/json",
          rules: {
            "cap-config/cds-fiori-draft-compat": "error",
            "cap-config/cds-features-odata-new-adapter": "error",
            "cap-config/cds-features-cds-validate": "error",
          },
        } as any,
      ],
    });

    const complexJson = `{
      "name": "complex-app",
      "version": "1.0.0",
      "cds": {
        "requires": {
          "db": "sqlite",
          "auth": "basic"
        },
        "features": {
          "some_other_feature": true,
          "odata_new_adapter": false
        },
        "fiori": {
          "preview": true,
          "draft_compat": false
        }
      }
    }`;
    const results = await eslint.lintText(complexJson, {
      filePath: "package.json",
    });

    expect(results).toHaveLength(1);
    expect(results[0].errorCount).toBe(2);
    expect(results[0].warningCount).toBe(0);

    const ruleIds = results[0].messages.map((m) => m.ruleId);
    expect(ruleIds.includes("cap-config/cds-features-odata-new-adapter")).toBe(true);
    expect(ruleIds.includes("cap-config/cds-fiori-draft-compat")).toBe(true);
  });

  it("should handle .cdsrc files correctly", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json", "**/.cdsrc*"],
          plugins: {
            "cap-config": plugin,
            json,
          },
          language: "json/json",
          rules: {
            "cap-config/cds-fiori-draft-compat": "error",
            "cap-config/cds-features-odata-new-adapter": "error",
            "cap-config/cds-features-cds-validate": "error",
          },
        } as any,
      ],
    });

    const cdsrcJson = `{
      "requires": {
        "db": "sqlite"
      },
      "features": {
        "cds_validate": false
      },
      "fiori": {
        "draft_compat": true
      }
    }`;
    const results = await eslint.lintText(cdsrcJson, {
      filePath: ".cdsrc.json",
    });

    expect(results).toHaveLength(1);
    expect(results[0].errorCount).toBe(2);
    expect(results[0].warningCount).toBe(0);

    const ruleIds = results[0].messages.map((m) => m.ruleId);
    expect(ruleIds.includes("cap-config/cds-features-cds-validate")).toBe(true);
    expect(ruleIds.includes("cap-config/cds-fiori-draft-compat")).toBe(true);
  });

  it("should detect deprecated cds.features.compat_save_drafts", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-features-compat-save-drafts": "error" },
        },
      ],
    });
    const results = await eslint.lintText('{"cds": {"features": {"compat_save_drafts": true}}}', {
      filePath: "package.json",
    });
    expect(results[0].errorCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-features-compat-save-drafts");
  });

  it("should detect deprecated cds.features.compat_assert_not_null", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-features-compat-assert-not-null": "error" },
        },
      ],
    });
    const results = await eslint.lintText(
      '{"cds": {"features": {"compat_assert_not_null": true}}}',
      { filePath: "package.json" },
    );
    expect(results[0].errorCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-features-compat-assert-not-null");
  });

  it("should detect deprecated cds.features.compile_for_flows", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-features-compile-for-flows": "error" },
        },
      ],
    });
    const results = await eslint.lintText('{"cds": {"features": {"compile_for_flows": true}}}', {
      filePath: "package.json",
    });
    expect(results[0].errorCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-features-compile-for-flows");
  });

  it("should detect deprecated cds.features.compat_restrict_where", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-features-compat-restrict-where": "error" },
        },
      ],
    });
    const results = await eslint.lintText(
      '{"cds": {"features": {"compat_restrict_where": false}}}',
      { filePath: "package.json" },
    );
    expect(results[0].errorCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-features-compat-restrict-where");
  });

  it("should detect deprecated cds.features.compat_static_auth", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-features-compat-static-auth": "error" },
        },
      ],
    });
    const results = await eslint.lintText('{"cds": {"features": {"compat_static_auth": false}}}', {
      filePath: "package.json",
    });
    expect(results[0].errorCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-features-compat-static-auth");
  });

  it("should detect deprecated cds.features.compat_restrict_bound", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-features-compat-restrict-bound": "error" },
        },
      ],
    });
    const results = await eslint.lintText(
      '{"cds": {"features": {"compat_restrict_bound": false}}}',
      { filePath: "package.json" },
    );
    expect(results[0].errorCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-features-compat-restrict-bound");
  });

  it("should detect deprecated cds.features.base64_binaries", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-features-base64-binaries": "error" },
        },
      ],
    });
    const results = await eslint.lintText('{"cds": {"features": {"base64_binaries": true}}}', {
      filePath: "package.json",
    });
    expect(results[0].errorCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-features-base64-binaries");
  });

  it("should detect deprecated cds.features.keys_in_data_compat", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-features-keys-in-data-compat": "error" },
        },
      ],
    });
    const results = await eslint.lintText('{"cds": {"features": {"keys_in_data_compat": true}}}', {
      filePath: "package.json",
    });
    expect(results[0].errorCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-features-keys-in-data-compat");
  });

  it("should detect deprecated cds.features.kibana_formatter", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-features-kibana-formatter": "error" },
        },
      ],
    });
    const results = await eslint.lintText('{"cds": {"features": {"kibana_formatter": true}}}', {
      filePath: "package.json",
    });
    expect(results[0].errorCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-features-kibana-formatter");
  });

  it("should detect deprecated cds.fiori.calc_elements", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-fiori-calc-elements": "error" },
        },
      ],
    });
    const results = await eslint.lintText('{"cds": {"fiori": {"calc_elements": false}}}', {
      filePath: "package.json",
    });
    expect(results[0].errorCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-fiori-calc-elements");
  });

  it("should detect deprecated cds.remote.native_fetch", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-remote-native-fetch": "error" },
        },
      ],
    });
    const results = await eslint.lintText('{"cds": {"remote": {"native_fetch": true}}}', {
      filePath: "package.json",
    });
    expect(results[0].errorCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-remote-native-fetch");
  });

  it("should detect deprecated cds.multiTenancy.subscriptionManager.clientCertificateHeader", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-multitenant-client-cert-header": "error" },
        },
      ],
    });
    const results = await eslint.lintText(
      '{"cds": {"multiTenancy": {"subscriptionManager": {"clientCertificateHeader": "x-cert"}}}}',
      { filePath: "package.json" },
    );
    expect(results[0].errorCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-multitenant-client-cert-header");
  });

  it("should detect deprecated cds.log.kibana_custom_fields", async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-log-kibana-custom-fields": "error" },
        },
      ],
    });
    const results = await eslint.lintText(
      '{"cds": {"log": {"kibana_custom_fields": ["field1"]}}}',
      { filePath: "package.json" },
    );
    expect(results[0].errorCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-log-kibana-custom-fields");
  });

  it('should detect deprecated cds.sql.runtimeView.mode: "resolve"', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-sql-runtime-view-mode": "error" },
        },
      ],
    });
    const results = await eslint.lintText(
      '{"cds": {"sql": {"runtimeView": {"mode": "resolve"}}}}',
      { filePath: "package.json" },
    );
    expect(results[0].errorCount).toBe(1);
    expect(results[0].messages[0].ruleId).toBe("cap-config/cds-sql-runtime-view-mode");
  });

  it('should NOT flag cds.sql.runtimeView.mode: "cte"', async () => {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: [
        {
          files: ["**/*.json"],
          plugins: { "cap-config": plugin, json },
          language: "json/json",
          rules: { "cap-config/cds-sql-runtime-view-mode": "error" },
        },
      ],
    });
    const results = await eslint.lintText('{"cds": {"sql": {"runtimeView": {"mode": "cte"}}}}', {
      filePath: "package.json",
    });
    expect(results[0].errorCount).toBe(0);
  });
});
