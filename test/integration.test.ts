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
    expect(results[0].messages[0].ruleId).toBe(
      "cap-config/cds-features-odata-new-adapter",
    );
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
    expect(results[0].messages[0].ruleId).toBe(
      "cap-config/cds-features-cds-validate",
    );
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

    const deprecatedJson =
      '{"name": "test-app", "cds": {"fiori": {"draft_compat": true}}}';
    const results = await eslint.lintText(deprecatedJson, {
      filePath: "package.json",
    });

    expect(results).toHaveLength(1);
    expect(results[0].errorCount).toBe(1);
    expect(results[0].warningCount).toBe(0);
    expect(results[0].messages[0].ruleId).toStrictEqual(
      "cap-config/cds-fiori-draft-compat",
    );
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
    expect(
      ruleIds.includes("cap-config/cds-features-odata-new-adapter"),
    ).toBe(true);
    expect(
      ruleIds.includes("cap-config/cds-features-cds-validate"),
    ).toBe(true);
    expect(
      ruleIds.includes("cap-config/cds-fiori-draft-compat"),
    ).toBe(true);
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
    expect(
      ruleIds.includes("cap-config/cds-features-odata-new-adapter"),
    ).toBe(true);
    expect(
      ruleIds.includes("cap-config/cds-fiori-draft-compat"),
    ).toBe(true);
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
    expect(
      ruleIds.includes("cap-config/cds-features-cds-validate"),
    ).toBe(true);
    expect(
      ruleIds.includes("cap-config/cds-fiori-draft-compat"),
    ).toBe(true);
  });
});
