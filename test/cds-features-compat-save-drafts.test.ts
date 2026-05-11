import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-compat-save-drafts rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-compat-save-drafts",
    plugin.rules!["cds-features-compat-save-drafts"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
        { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
      ],
      invalid: [],
    },
  );

  ruleTester.run(
    "cds-features-compat-save-drafts",
    plugin.rules!["cds-features-compat-save-drafts"],
    {
      valid: [],
      invalid: [
        {
          code: '{"cds": {"features": {"compat_save_drafts": true}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatSaveDrafts", line: 1, column: 23 }],
        },
        {
          code: '{"cds": {"features": {"compat_save_drafts": false}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatSaveDrafts", line: 1, column: 23 }],
        },
        {
          code: '{"features": {"compat_save_drafts": true}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatSaveDrafts", line: 1, column: 15 }],
        },
      ],
    },
  );
});
