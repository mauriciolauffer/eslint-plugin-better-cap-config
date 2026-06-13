import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-kibana-formatter rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-features-kibana-formatter", plugin.rules!["cds-features-kibana-formatter"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
    ],
    invalid: [
      {
        code: '{"cds": {"features": {"kibana_formatter": true}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFeaturesKibanaFormatter", line: 1, column: 23 }],
      },
      {
        code: '{"cds": {"features": {"kibana_formatter": false}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFeaturesKibanaFormatter", line: 1, column: 23 }],
      },
      {
        code: '{"features": {"kibana_formatter": true}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsFeaturesKibanaFormatter", line: 1, column: 15 }],
      },
    ],
  });
});
