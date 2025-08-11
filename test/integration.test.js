import { test, describe } from "node:test";
import assert from "node:assert";
import { ESLint } from "eslint";
import plugin from "../src/index.js";

describe("integration tests", () => {
  test("should detect deprecated cds.features.odata_new_adapter in package.json", async () => {
    const eslint = new ESLint({
      overrideConfig: [
        {
          plugins: {
            cdsDeprecatedConfig: plugin,
          },
          language: "json/json",
          rules: {
            "cdsDeprecatedConfig/no-deprecated-cds-features-odata-new-adapter":
              "warn",
          },
        },
      ],
    });

    const deprecatedJson =
      '{"name": "test-app", "cds": {"features": {"odata_new_adapter": false}}}';
    const results = await eslint.lintText(deprecatedJson, {
      filePath: "package.json",
    });

    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].errorCount, 0);
    assert.strictEqual(results[0].warningCount, 1);
    assert.strictEqual(
      results[0].messages[0].messageId,
      "deprecatedCdsFeaturesOdataNewAdapter",
    );
    assert.match(
      results[0].messages[0].message,
      /"cds\.features\.odata_new_adapter": false is deprecated/,
    );
  });

  test("should detect deprecated features.odata_new_adapter in .cdsrc.json", async () => {
    const eslint = new ESLint({
      overrideConfig: [
        {
          plugins: {
            cdsDeprecatedConfig: plugin,
          },
          language: "json/json",
          rules: {
            "cdsDeprecatedConfig/no-deprecated-cds-features-odata-new-adapter":
              "warn",
          },
        },
      ],
    });

    const deprecatedJson = '{"features": {"odata_new_adapter": false}}';
    const results = await eslint.lintText(deprecatedJson, {
      filePath: ".cdsrc.json",
    });

    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].errorCount, 0);
    assert.strictEqual(results[0].warningCount, 1);
    assert.strictEqual(
      results[0].messages[0].messageId,
      "deprecatedCdsFeaturesOdataNewAdapter",
    );
    assert.match(
      results[0].messages[0].message,
      /"cds\.features\.odata_new_adapter": false is deprecated/,
    );
  });

  test("should not flag cds.features.odata_new_adapter when set to true", async () => {
    const eslint = new ESLint({
      overrideConfig: [
        {
          plugins: {
            cdsDeprecatedConfig: plugin,
          },
          language: "json/json",
          rules: {
            "cdsDeprecatedConfig/no-deprecated-cds-features-odata-new-adapter":
              "warn",
          },
        },
      ],
    });

    const validJson =
      '{"name": "test-app", "cds": {"features": {"odata_new_adapter": true}}}';
    const results = await eslint.lintText(validJson, {
      filePath: "package.json",
    });

    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].errorCount, 0);
    assert.strictEqual(results[0].warningCount, 0);
  });

  test("should detect deprecated cds.features.cds_validate in package.json", async () => {
    const eslint = new ESLint({
      overrideConfig: [
        {
          plugins: {
            cdsDeprecatedConfig: plugin,
          },
          language: "json/json",
          rules: {
            "cdsDeprecatedConfig/no-deprecated-cds-features-cds-validate":
              "warn",
          },
        },
      ],
    });

    const deprecatedJson =
      '{"name": "test-app", "cds": {"features": {"cds_validate": false}}}';
    const results = await eslint.lintText(deprecatedJson, {
      filePath: "package.json",
    });

    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].errorCount, 0);
    assert.strictEqual(results[0].warningCount, 1);
    assert.strictEqual(
      results[0].messages[0].messageId,
      "deprecatedCdsFeaturesCdsValidate",
    );
    assert.match(
      results[0].messages[0].message,
      /"cds\.features\.cds_validate": false is deprecated/,
    );
  });

  test("should detect deprecated features.cds_validate in .cdsrc.json", async () => {
    const eslint = new ESLint({
      overrideConfig: [
        {
          plugins: {
            cdsDeprecatedConfig: plugin,
          },
          language: "json/json",
          rules: {
            "cdsDeprecatedConfig/no-deprecated-cds-features-cds-validate":
              "warn",
          },
        },
      ],
    });

    const deprecatedJson = '{"features": {"cds_validate": false}}';
    const results = await eslint.lintText(deprecatedJson, {
      filePath: ".cdsrc.json",
    });

    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].errorCount, 0);
    assert.strictEqual(results[0].warningCount, 1);
    assert.strictEqual(
      results[0].messages[0].messageId,
      "deprecatedCdsFeaturesCdsValidate",
    );
    assert.match(
      results[0].messages[0].message,
      /"cds\.features\.cds_validate": false is deprecated/,
    );
  });

  test("should not flag cds.features.cds_validate when set to true", async () => {
    const eslint = new ESLint({
      overrideConfig: [
        {
          plugins: {
            cdsDeprecatedConfig: plugin,
          },
          language: "json/json",
          rules: {
            "cdsDeprecatedConfig/no-deprecated-cds-features-cds-validate":
              "warn",
          },
        },
      ],
    });

    const validJson =
      '{"name": "test-app", "cds": {"features": {"cds_validate": true}}}';
    const results = await eslint.lintText(validJson, {
      filePath: "package.json",
    });

    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].errorCount, 0);
    assert.strictEqual(results[0].warningCount, 0);
  });
});
