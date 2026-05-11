import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-async-handler-compat rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-async-handler-compat",
    plugin.rules!["cds-features-async-handler-compat"],
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
    "cds-features-async-handler-compat",
    plugin.rules!["cds-features-async-handler-compat"],
    {
      valid: [],
      invalid: [
        {
          code: '{"cds": {"features": {"async_handler_compat": true}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesAsyncHandlerCompat", line: 1, column: 23 }],
        },
        {
          code: '{"cds": {"features": {"async_handler_compat": false}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesAsyncHandlerCompat", line: 1, column: 23 }],
        },
        {
          code: `{
  "name": "my-app",
  "cds": {
    "features": {
      "async_handler_compat": true
    }
  }
}`,
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesAsyncHandlerCompat", line: 5, column: 7 }],
        },
        {
          code: '{"features": {"async_handler_compat": true}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsFeaturesAsyncHandlerCompat", line: 1, column: 15 }],
        },
        {
          code: '{"features": {"async_handler_compat": false}}',
          filename: ".cdsrc",
          errors: [{ messageId: "deprecatedCdsFeaturesAsyncHandlerCompat", line: 1, column: 15 }],
        },
      ],
    },
  );
});
