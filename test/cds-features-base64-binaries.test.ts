import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-base64-binaries rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-features-base64-binaries", plugin.rules!["cds-features-base64-binaries"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
    ],
    invalid: [],
  });

  ruleTester.run("cds-features-base64-binaries", plugin.rules!["cds-features-base64-binaries"], {
    valid: [],
    invalid: [
      {
        code: '{"cds": {"features": {"base64_binaries": true}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFeaturesBase64Binaries", line: 1, column: 23 }],
      },
      {
        code: '{"cds": {"features": {"base64_binaries": false}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFeaturesBase64Binaries", line: 1, column: 23 }],
      },
      {
        code: '{"features": {"base64_binaries": true}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsFeaturesBase64Binaries", line: 1, column: 15 }],
      },
    ],
  });
});
