import { test, describe } from "node:test";
import assert from "node:assert";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("no-deprecated-cds-features-odata-new-adapter rule", () => {
  const ruleTester = new RuleTester({
    plugins: {
      cdsDeprecatedConfig: plugin,
    },
    language: "cdsDeprecatedConfig/json",
  });

  test("should pass for valid cases", () => {
    assert.doesNotThrow(() => {
      ruleTester.run(
        "no-deprecated-cds-features-odata-new-adapter",
        plugin.rules["no-deprecated-cds-features-odata-new-adapter"],
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
            // Case 4: cds.features object without odata_new_adapter key
            {
              code: '{"cds": {"features": {"preview": true}}}',
              filename: "package.json",
            },
            // Case 5: cds.features.odata_new_adapter with true value
            {
              code: '{"cds": {"features": {"odata_new_adapter": true}}}',
              filename: "package.json",
            },
            // Case 6: cds.features.odata_new_adapter with string "true" value
            {
              code: '{"cds": {"features": {"odata_new_adapter": "true"}}}',
              filename: "package.json",
            },
            // Case 7: Complex valid configuration
            {
              code: '{"name": "my-app", "cds": {"requires": {"db": "sqlite"}, "features": {"odata_new_adapter": true}}}',
              filename: "package.json",
            },
            // Case 8: Different nested structure that doesn't match
            {
              code: '{"features": {"odata_new_adapter": false}, "other": {"cds": {"something": "else"}}}',
              filename: "test.json",
            },
            // Case 9: .cdsrc.json without deprecated key
            {
              code: '{"requires": {"db": "sqlite"}, "features": {"preview": true}}',
              filename: ".cdsrc.json",
            },
            // Case 10: .cdsrc.json with odata_new_adapter set to true
            {
              code: '{"features": {"odata_new_adapter": true}}',
              filename: ".cdsrc.json",
            },
            // Case 11: Other values for odata_new_adapter
            {
              code: '{"cds": {"features": {"odata_new_adapter": "deprecated"}}}',
              filename: "package.json",
            },
            // Case 12: odata_new_adapter key in different context (not under cds.features or features in cdsrc)
            {
              code: '{"some_config": {"odata_new_adapter": false}}',
              filename: "config.json",
            },
          ],
          invalid: [
            // Case 1: Direct cds.features.odata_new_adapter: false
            {
              code: '{"cds": {"features": {"odata_new_adapter": false}}}',
              filename: "package.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesOdataNewAdapter",
                  line: 1,
                  column: 23,
                },
              ],
            },
            // Case 2: cds.features.odata_new_adapter: "false" (string)
            {
              code: '{"cds": {"features": {"odata_new_adapter": "false"}}}',
              filename: "package.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesOdataNewAdapter",
                  line: 1,
                  column: 23,
                },
              ],
            },
            // Case 3: Complex package.json with deprecated config
            {
              code: '{"name": "my-app", "version": "1.0.0", "cds": {"requires": {"db": "sqlite"}, "features": {"odata_new_adapter": false}}}',
              filename: "package.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesOdataNewAdapter",
                  line: 1,
                  column: 91,
                },
              ],
            },
            // Case 4: .cdsrc.json with features.odata_new_adapter: false
            {
              code: '{"features": {"odata_new_adapter": false}}',
              filename: ".cdsrc.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesOdataNewAdapter",
                  line: 1,
                  column: 15,
                },
              ],
            },
            // Case 5: .cdsrc.json with features.odata_new_adapter: "false"
            {
              code: '{"features": {"odata_new_adapter": "false"}}',
              filename: ".cdsrc.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesOdataNewAdapter",
                  line: 1,
                  column: 15,
                },
              ],
            },
            // Case 6: Complex .cdsrc.json
            {
              code: '{"requires": {"db": "sqlite"}, "features": {"preview": true, "odata_new_adapter": false}}',
              filename: ".cdsrc.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesOdataNewAdapter",
                  line: 1,
                  column: 62,
                },
              ],
            },
            // Case 7: Nested with other properties
            {
              code: '{\n  "name": "test-app",\n  "cds": {\n    "requires": {\n      "db": "sqlite"\n    },\n    "features": {\n      "preview": true,\n      "odata_new_adapter": false\n    }\n  }\n}',
              filename: "package.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesOdataNewAdapter",
                  line: 9,
                  column: 7,
                },
              ],
            },
            // Case 8: File with cds in name
            {
              code: '{"features": {"odata_new_adapter": false}}',
              filename: "my-cds-config.json",
              errors: [
                {
                  messageId: "deprecatedCdsFeaturesOdataNewAdapter",
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
