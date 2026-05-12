import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-serve-on-root rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-features-serve-on-root", plugin.rules!["cds-features-serve-on-root"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"features": {"serve_on_root": false}}}', filename: "package.json" },
      { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
      { code: '{"features": {"serve_on_root": false}}', filename: ".cdsrc.json" },
    ],
    invalid: [],
  });

  ruleTester.run("cds-features-serve-on-root", plugin.rules!["cds-features-serve-on-root"], {
    valid: [],
    invalid: [
      {
        code: '{"cds": {"features": {"serve_on_root": true}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFeaturesServeOnRoot", line: 1, column: 23 }],
      },
      {
        code: '{"features": {"serve_on_root": true}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsFeaturesServeOnRoot", line: 1, column: 15 }],
      },
      {
        code: '{"features": {"serve_on_root": true}}',
        filename: ".cdsrc",
        errors: [{ messageId: "deprecatedCdsFeaturesServeOnRoot", line: 1, column: 15 }],
      },
    ],
  });
});
