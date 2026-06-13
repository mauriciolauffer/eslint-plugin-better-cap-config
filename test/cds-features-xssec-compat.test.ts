import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-xssec-compat rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-features-xssec-compat", plugin.rules!["cds-features-xssec-compat"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
      { code: '{"features": {"other_key": true}}', filename: ".cdsrc.json" },
    ],
    invalid: [
      {
        code: '{"cds": {"features": {"xssec_compat": true}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFeaturesXssecCompat", line: 1, column: 23 }],
      },
      {
        code: '{"cds": {"features": {"xssec_compat": false}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFeaturesXssecCompat", line: 1, column: 23 }],
      },
      {
        code: '{"features": {"xssec_compat": true}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsFeaturesXssecCompat", line: 1, column: 15 }],
      },
      {
        code: '{"features": {"xssec_compat": true}}',
        filename: ".cdsrc",
        errors: [{ messageId: "deprecatedCdsFeaturesXssecCompat", line: 1, column: 15 }],
      },
    ],
  });
});
