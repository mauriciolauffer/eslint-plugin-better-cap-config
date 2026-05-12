import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-drafts-cancellation-timeout rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-drafts-cancellation-timeout",
    plugin.rules!["cds-drafts-cancellation-timeout"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        { code: '{"cds": {"fiori": {"draft_lock_timeout": 15}}}', filename: "package.json" },
        { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
      ],
      invalid: [],
    },
  );

  ruleTester.run(
    "cds-drafts-cancellation-timeout",
    plugin.rules!["cds-drafts-cancellation-timeout"],
    {
      valid: [],
      invalid: [
        {
          code: '{"cds": {"drafts": {"cancellationTimeout": 15}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsDraftsCancellationTimeout", line: 1, column: 21 }],
        },
        {
          code: '{"cds": {"drafts": {"cancellationTimeout": 30000}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsDraftsCancellationTimeout", line: 1, column: 21 }],
        },
        {
          code: `{
  "name": "my-app",
  "cds": {
    "drafts": {
      "cancellationTimeout": 15
    }
  }
}`,
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsDraftsCancellationTimeout", line: 5, column: 7 }],
        },
        {
          code: '{"drafts": {"cancellationTimeout": 15}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsDraftsCancellationTimeout", line: 1, column: 13 }],
        },
        {
          code: '{"drafts": {"cancellationTimeout": 30000}}',
          filename: ".cdsrc",
          errors: [{ messageId: "deprecatedCdsDraftsCancellationTimeout", line: 1, column: 13 }],
        },
      ],
    },
  );
});
