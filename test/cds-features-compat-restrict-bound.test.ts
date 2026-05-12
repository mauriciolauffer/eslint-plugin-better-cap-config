import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-compat-restrict-bound rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-compat-restrict-bound",
    plugin.rules!["cds-features-compat-restrict-bound"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
      ],
      invalid: [],
    },
  );

  ruleTester.run(
    "cds-features-compat-restrict-bound",
    plugin.rules!["cds-features-compat-restrict-bound"],
    {
      valid: [],
      invalid: [
        {
          code: '{"cds": {"features": {"compat_restrict_bound": true}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatRestrictBound", line: 1, column: 23 }],
        },
        {
          code: '{"cds": {"features": {"compat_restrict_bound": false}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatRestrictBound", line: 1, column: 23 }],
        },
        {
          code: '{"features": {"compat_restrict_bound": true}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatRestrictBound", line: 1, column: 15 }],
        },
      ],
    },
  );
});
