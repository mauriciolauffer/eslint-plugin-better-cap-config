import { test, describe } from "node:test";
import assert from "node:assert";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("no-deprecated-cds-features-cds-validate rule", () => {
  const ruleTester = new RuleTester({
    plugins: {
      cdsDeprecatedConfig: plugin,
    },
    language: "cdsDeprecatedConfig/json",
  });

  test("should pass for valid cases", () => {
    assert.doesNotThrow(() => {
      ruleTester.run(
        "no-deprecated-cds-features-cds-validate",
        plugin.rules["no-deprecated-cds-features-cds-validate"],
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
            // Case 3: cds object without features key
            {
              code: '{"cds": {"requires": {"db": "sqlite"}}}',
              filename: "package.json",
            },
            // Case 4: cds.features object without cds_validate key
            {
              code: '{"cds": {"features": {"preview": true}}}',
              filename: "package.json",
            },
            // Case 5: cds.features.cds_validate with true value
            {
              code: '{"cds": {"features": {"cds_validate": true}}}',
              filename: "package.json",
            },
            // Case 6: cds.features.cds_validate with string "true" value
            {
              code: '{"cds": {"features": {"cds_validate": "true"}}}',
              filename: "package.json",
            },
            // Case 7: Complex valid configuration
            {
              code: '{"name": "my-app", "cds": {"requires": {"db": "sqlite"}, "features": {"cds_validate": true}}}',
              filename: "package.json",
            },
            // Case 8: Different nested structure that doesn't match
            {
              code: '{"features": {"cds_validate": false}, "other": {"cds": {"something": "else"}}}',
              filename: "test.json",
            },
            // Case 9: .cdsrc.json without deprecated key
            {
              code: '{"requires": {"db": "sqlite"}, "features": {"preview": true}}',
              filename: ".cdsrc.json",
            },
            // Case 10: .cdsrc.json with cds_validate set to true
            {
              code: '{"features": {"cds_validate": true}}',
              filename: ".cdsrc.json",
            },
            // Case 11: Other values for cds_validate
            {
              code: '{"cds": {"features": {"cds_validate": "deprecated"}}}',
              filename: "package.json",
            },
            // Case 12: cds_validate key in different context (not under cds.features or features in cdsrc)
            {
              code: '{"some_config": {"cds_validate": false}}',
              filename: "config.json",
            },
          ],
          invalid: [
            // Case 1: Direct cds.features.cds_validate: false
            {
              code: '{"cds": {"features": {"cds_validate": false}}}',
              filename: "package.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesCdsValidate",
                  line: 1,
                  column: 23,
                },
              ],
            },
            // Case 2: cds.features.cds_validate: "false" (string)
            {
              code: '{"cds": {"features": {"cds_validate": "false"}}}',
              filename: "package.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesCdsValidate",
                  line: 1,
                  column: 23,
                },
              ],
            },
            // Case 3: Complex package.json with deprecated config
            {
              code: '{"name": "my-app", "version": "1.0.0", "cds": {"requires": {"db": "sqlite"}, "features": {"cds_validate": false}}}',
              filename: "package.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesCdsValidate",
                  line: 1,
                  column: 91,
                },
              ],
            },
            // Case 4: .cdsrc.json with features.cds_validate: false
            {
              code: '{"features": {"cds_validate": false}}',
              filename: ".cdsrc.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesCdsValidate",
                  line: 1,
                  column: 15,
                },
              ],
            },
            // Case 5: .cdsrc.json with features.cds_validate: "false"
            {
              code: '{"features": {"cds_validate": "false"}}',
              filename: ".cdsrc.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesCdsValidate",
                  line: 1,
                  column: 15,
                },
              ],
            },
            // Case 6: Complex .cdsrc.json
            {
              code: '{"requires": {"db": "sqlite"}, "features": {"preview": true, "cds_validate": false}}',
              filename: ".cdsrc.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesCdsValidate",
                  line: 1,
                  column: 62,
                },
              ],
            },
            // Case 7: Nested with other properties
            {
              code: '{\n  "name": "test-app",\n  "cds": {\n    "requires": {\n      "db": "sqlite"\n    },\n    "features": {\n      "preview": true,\n      "cds_validate": false\n    }\n  }\n}',
              filename: "package.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesCdsValidate",
                  line: 9,
                  column: 7,
                },
              ],
            },
            // Case 8: File with cds in name
            {
              code: '{"features": {"cds_validate": false}}',
              filename: "my-cds-config.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesCdsValidate",
                  line: 1,
                  column: 15,
                },
              ],
            },
          ],
        },
      );
    });
  });
});
