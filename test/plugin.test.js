import { test, describe } from "node:test";
import assert from "node:assert";
import plugin from "../src/index.js";

describe("eslint-plugin-cds-deprecated-config", () => {
  test("should export plugin with correct structure", () => {
    assert.ok(plugin, "Plugin should be defined");
    assert.ok(plugin.meta, "Plugin should have meta property");
    assert.ok(plugin.rules, "Plugin should have rules property");
    assert.ok(plugin.languages, "Plugin should have languages property");
    assert.ok(plugin.configs, "Plugin should have configs property");
  });

  test("should have correct meta information", () => {
    assert.strictEqual(plugin.meta.name, "eslint-plugin-cds-deprecated-config");
    assert.strictEqual(plugin.meta.version, "0.0.1");
  });

  test("should have JSON language support", () => {
    assert.ok(plugin.languages.json, "Should have JSON language support");
  });

  test("should have circular reference resolved in configs", () => {
    assert.ok(
      plugin.configs.recommended.plugins,
      "Should have plugins in recommended config",
    );
    assert.strictEqual(
      plugin.configs.recommended.plugins.cdsDeprecatedConfig,
      plugin,
      "Should reference itself in plugins",
    );
  });
});
