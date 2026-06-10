import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-compat-assert-not-null rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-compat-assert-not-null",
    plugin.rules!["cds-features-compat-assert-not-null"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
      ],
      invalid: [
        {
          code: '{"cds": {"features": {"compat_assert_not_null": true}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatAssertNotNull", line: 1, column: 23 }],
        },
        {
          code: '{"cds": {"features": {"compat_assert_not_null": false}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatAssertNotNull", line: 1, column: 23 }],
        },
        {
          code: '{"features": {"compat_assert_not_null": true}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatAssertNotNull", line: 1, column: 15 }],
        },
      ],
    },
  );
});
