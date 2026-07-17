import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-compat-clone-appends rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-compat-clone-appends",
    plugin.rules!["cds-features-compat-clone-appends"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
        { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
      ],
      invalid: [
        {
          code: '{"cds": {"features": {"compat_clone_appends": true}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatCloneAppends", line: 1, column: 23 }],
        },
        {
          code: '{"cds": {"features": {"compat_clone_appends": false}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatCloneAppends", line: 1, column: 23 }],
        },
        {
          code: '{"features": {"compat_clone_appends": true}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatCloneAppends", line: 1, column: 15 }],
        },
        {
          code: '{"features": {"compat_clone_appends": true}}',
          filename: ".cdsrc",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatCloneAppends", line: 1, column: 15 }],
        },
      ],
    },
  );
});
