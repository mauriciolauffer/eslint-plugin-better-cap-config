import { test, describe } from "node:test";
import assert from "node:assert";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("no-deprecated-cds-fiori-draft-compat rule", () => {
  const ruleTester = new RuleTester({
    plugins: {
      cdsDeprecatedConfig: plugin,
    },
    language: "cdsDeprecatedConfig/json",
  });

  test("should pass for valid cases", () => {
    assert.doesNotThrow(() => {
      ruleTester.run(
        "no-deprecated-cds-fiori-draft-compat",
        plugin.rules["no-deprecated-cds-fiori-draft-compat"],
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
  });

  test("should fail when cds.fiori.draft_compat is present", () => {
    assert.doesNotThrow(() => {
      ruleTester.run(
        "no-deprecated-cds-fiori-draft-compat",
        plugin.rules["no-deprecated-cds-fiori-draft-compat"],
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
            // Case 4: Complex package.json with deprecated key
            {
              code: '{"name": "my-app", "version": "1.0.0", "cds": {"requires": {"db": "sqlite"}, "fiori": {"draft_compat": true, "preview": false}}}',
              filename: "package.json",
              errors: [
                {
                  messageId: "deprecatedCdsFioriDraftCompat",
                  line: 1,
                  column: 88,
                },
              ],
            },
            // Case 5: .cdsrc.json with deprecated key
            {
              code: '{"requires": {"db": "sqlite"}, "fiori": {"draft_compat": false}}',
              filename: ".cdsrc.json",
              errors: [
                {
                  messageId: "deprecatedCdsFioriDraftCompat",
                  line: 1,
                  column: 42,
                },
              ],
            },
            // Case 6: Multiple nested levels with deprecated key
            {
              code: '{"config": {"nested": {"cds": {"fiori": {"draft_compat": null}}}}}',
              filename: "test.json",
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

  test("should handle edge cases", () => {
    assert.doesNotThrow(() => {
      ruleTester.run(
        "no-deprecated-cds-fiori-draft-compat",
        plugin.rules["no-deprecated-cds-fiori-draft-compat"],
        {
          valid: [
            // Case 1: Array values
            {
              code: '{"cds": {"fiori": {"other": [1, 2, 3]}}}',
              filename: "test.json",
            },
            // Case 2: Null values in other keys
            {
              code: '{"cds": {"fiori": {"other": null}}}',
              filename: "test.json",
            },
          ],
          invalid: [
            // Case 1: draft_compat with object value (still deprecated)
            {
              code: '{"cds": {"fiori": {"draft_compat": {"enabled": false}}}}',
              filename: "package.json",
              errors: [
                {
                  messageId: "deprecatedCdsFioriDraftCompat",
                  line: 1,
                  column: 20,
                },
              ],
            },
            // Case 2: draft_compat with array value (still deprecated)
            {
              code: '{"cds": {"fiori": {"draft_compat": [1, 2, 3]}}}',
              filename: "package.json",
              errors: [
                {
                  messageId: "deprecatedCdsFioriDraftCompat",
                  line: 1,
                  column: 20,
                },
              ],
            },
          ],
        },
      );
    });
  });
});
