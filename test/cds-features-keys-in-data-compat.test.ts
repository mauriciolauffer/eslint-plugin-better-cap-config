import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-keys-in-data-compat rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-keys-in-data-compat",
    plugin.rules!["cds-features-keys-in-data-compat"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
      ],
      invalid: [
        {
          code: '{"cds": {"features": {"keys_in_data_compat": true}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesKeysInDataCompat", line: 1, column: 23 }],
        },
        {
          code: '{"cds": {"features": {"keys_in_data_compat": false}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesKeysInDataCompat", line: 1, column: 23 }],
        },
        {
          code: '{"features": {"keys_in_data_compat": true}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsFeaturesKeysInDataCompat", line: 1, column: 15 }],
        },
      ],
    },
  );
});
