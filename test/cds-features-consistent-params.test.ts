import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-consistent-params rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-consistent-params",
    plugin.rules!["cds-features-consistent-params"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
        { code: '{"cds": {"features": {"consistent_params": true}}}', filename: "package.json" },
        {
          code: '{"cds": {"features": {"consistent_params": "true"}}}',
          filename: "package.json",
        },
        { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
      ],
      invalid: [
        {
          code: '{"cds": {"features": {"consistent_params": false}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesConsistentParams", line: 1, column: 23 }],
        },
        {
          code: '{"cds": {"features": {"consistent_params": "false"}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesConsistentParams", line: 1, column: 23 }],
        },
        {
          code: `{
  "name": "my-app",
  "cds": {
    "features": {
      "consistent_params": false
    }
  }
}`,
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesConsistentParams", line: 5, column: 7 }],
        },
        {
          code: '{"features": {"consistent_params": false}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsFeaturesConsistentParams", line: 1, column: 15 }],
        },
        {
          code: '{"features": {"consistent_params": false}}',
          filename: ".cdsrc",
          errors: [{ messageId: "deprecatedCdsFeaturesConsistentParams", line: 1, column: 15 }],
        },
      ],
    },
  );
});
