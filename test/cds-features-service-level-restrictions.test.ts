import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-service-level-restrictions rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-service-level-restrictions",
    plugin.rules!["cds-features-service-level-restrictions"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
        {
          code: '{"cds": {"features": {"service_level_restrictions": true}}}',
          filename: "package.json",
        },
        {
          code: '{"cds": {"features": {"service_level_restrictions": "true"}}}',
          filename: "package.json",
        },
        { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
      ],
      invalid: [],
    },
  );

  ruleTester.run(
    "cds-features-service-level-restrictions",
    plugin.rules!["cds-features-service-level-restrictions"],
    {
      valid: [],
      invalid: [
        {
          code: '{"cds": {"features": {"service_level_restrictions": false}}}',
          filename: "package.json",
          errors: [
            { messageId: "deprecatedCdsFeaturesServiceLevelRestrictions", line: 1, column: 23 },
          ],
        },
        {
          code: '{"cds": {"features": {"service_level_restrictions": "false"}}}',
          filename: "package.json",
          errors: [
            { messageId: "deprecatedCdsFeaturesServiceLevelRestrictions", line: 1, column: 23 },
          ],
        },
        {
          code: `{
  "name": "my-app",
  "cds": {
    "features": {
      "service_level_restrictions": false
    }
  }
}`,
          filename: "package.json",
          errors: [
            { messageId: "deprecatedCdsFeaturesServiceLevelRestrictions", line: 5, column: 7 },
          ],
        },
        {
          code: '{"features": {"service_level_restrictions": false}}',
          filename: ".cdsrc.json",
          errors: [
            { messageId: "deprecatedCdsFeaturesServiceLevelRestrictions", line: 1, column: 15 },
          ],
        },
        {
          code: '{"features": {"service_level_restrictions": false}}',
          filename: ".cdsrc",
          errors: [
            { messageId: "deprecatedCdsFeaturesServiceLevelRestrictions", line: 1, column: 15 },
          ],
        },
      ],
    },
  );
});
