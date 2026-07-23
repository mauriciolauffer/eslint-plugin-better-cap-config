import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-legacy-srv-results rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-legacy-srv-results",
    plugin.rules!["cds-features-legacy-srv-results"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
        { code: '{"cds": {"features": {"legacy_srv_results": false}}}', filename: "package.json" },
        {
          code: '{"cds": {"features": {"legacy_srv_results": "false"}}}',
          filename: "package.json",
        },
        { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
      ],
      invalid: [
        {
          code: '{"cds": {"features": {"legacy_srv_results": true}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesLegacySrvResults", line: 1, column: 23 }],
        },
        {
          code: '{"cds": {"features": {"legacy_srv_results": "true"}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesLegacySrvResults", line: 1, column: 23 }],
        },
        {
          code: `{
  "name": "my-app",
  "cds": {
    "features": {
      "legacy_srv_results": true
    }
  }
}`,
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesLegacySrvResults", line: 5, column: 7 }],
        },
        {
          code: '{"features": {"legacy_srv_results": true}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsFeaturesLegacySrvResults", line: 1, column: 15 }],
        },
        {
          code: '{"features": {"legacy_srv_results": true}}',
          filename: ".cdsrc",
          errors: [{ messageId: "deprecatedCdsFeaturesLegacySrvResults", line: 1, column: 15 }],
        },
      ],
    },
  );
});
