import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-stream-compat rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-features-stream-compat", plugin.rules!["cds-features-stream-compat"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
      { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
    ],
    invalid: [
      {
        code: '{"cds": {"features": {"stream_compat": true}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFeaturesStreamCompat", line: 1, column: 23 }],
      },
      {
        code: '{"cds": {"features": {"stream_compat": false}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFeaturesStreamCompat", line: 1, column: 23 }],
      },
      {
        code: `{
  "name": "my-app",
  "cds": {
    "features": {
      "stream_compat": true
    }
  }
}`,
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFeaturesStreamCompat", line: 5, column: 7 }],
      },
      {
        code: '{"features": {"stream_compat": true}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsFeaturesStreamCompat", line: 1, column: 15 }],
      },
      {
        code: '{"features": {"stream_compat": false}}',
        filename: ".cdsrc",
        errors: [{ messageId: "deprecatedCdsFeaturesStreamCompat", line: 1, column: 15 }],
      },
    ],
  });
});
