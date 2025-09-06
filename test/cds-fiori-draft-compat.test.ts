import { describe, it } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-fiori-draft-compat rule", () => {
  const ruleTester = new RuleTester({
    plugins: {
      "cap-config": plugin,
      json,
    },
    language: "json/json",
  });

  it("should pass for valid cases", () => {
    ruleTester.run(
      "cds-fiori-draft-compat",
      plugin.rules!["cds-fiori-draft-compat"],
      {
        valid: [
          // Case 1: No cds key at all
          {
            code: '{"name": "test", "version": "1.0.0"}',
            filename: "test.json",
          },
          // Case 2: Empty object
          {
            code: "{}",
            filename: "test.json",
          },
          // Case 3: cds object without fiori key
          {
            code: '{"cds": {"requires": {"db": "sqlite"}}}',
            filename: "package.json",
          },
          // Case 4: cds.fiori object without draft_compat key
          {
            code: '{"cds": {"fiori": {"preview": true}}}',
            filename: "package.json",
          },
          // Case 5: Complex valid configuration
          {
            code: '{"name": "my-app", "cds": {"requires": {"db": "sqlite"}, "fiori": {"preview": true}}}',
            filename: "package.json",
          },
          // Case 6: Different nested structure that doesn't match
          {
            code: '{"fiori": {"draft_compat": true}, "other": {"cds": {"something": "else"}}}',
            filename: "test.json",
          },
          // Case 7: .cdsrc.json without deprecated key
          {
            code: '{"requires": {"db": "sqlite"}, "fiori": {"preview": true}}',
            filename: ".cdsrc.json",
          },
        ],
        invalid: [],
      },
    );
  });

  it("should fail when cds.fiori.draft_compat is present", () => {
    ruleTester.run(
      "cds-fiori-draft-compat",
      plugin.rules!["cds-fiori-draft-compat"],
      {
        valid: [],
        invalid: [
          // Case 1: Simple case with draft_compat set to true
          {
            code: '{"cds": {"fiori": {"draft_compat": true}}}',
            filename: "package.json",
            errors: [
              {
                messageId: "deprecatedCdsFioriDraftCompat",
                line: 1,
                column: 20,
              },
            ],
          },
          // Case 2: draft_compat set to false
          {
            code: '{"cds": {"fiori": {"draft_compat": false}}}',
            filename: "package.json",
            errors: [
              {
                messageId: "deprecatedCdsFioriDraftCompat",
                line: 1,
                column: 20,
              },
            ],
          },
          // Case 3: draft_compat with string value
          {
            code: '{"cds": {"fiori": {"draft_compat": "false"}}}',
            filename: "package.json",
            errors: [
              {
                messageId: "deprecatedCdsFioriDraftCompat",
                line: 1,
                column: 20,
              },
            ],
          },
          // Case 4: Complex configuration with draft_compat
          {
            code: `{
  "name": "my-app",
  "cds": {
    "requires": {
      "db": "sqlite"
    },
    "fiori": {
      "draft_compat": true,
      "preview": true
    }
  }
}`,
            filename: "package.json",
            errors: [
              {
                messageId: "deprecatedCdsFioriDraftCompat",
                line: 8,
                column: 7,
              },
            ],
          },
          // Case 5: .cdsrc.json with draft_compat (cds wrapper implicit)
          {
            code: '{"fiori": {"draft_compat": true}}',
            filename: ".cdsrc.json",
            errors: [
              {
                messageId: "deprecatedCdsFioriDraftCompat",
                line: 1,
                column: 12,
              },
            ],
          },
          // Case 6: .cdsrc with draft_compat
          {
            code: '{"requires": {"db": "sqlite"}, "fiori": {"draft_compat": false, "preview": true}}',
            filename: ".cdsrc",
            errors: [
              {
                messageId: "deprecatedCdsFioriDraftCompat",
                line: 1,
                column: 42,
              },
            ],
          },
        ],
      },
    );
  });
});
