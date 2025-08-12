import { describe, it } from "vitest";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("no-deprecated-cds-features-cds-validate rule", () => {
  const ruleTester = new RuleTester({
    plugins: {
      "cds-deprecated-config": plugin,
    },
    language: "cds-deprecated-config/json",
  });

  it("should pass for valid cases", () => {
    ruleTester.run(
      "no-deprecated-cds-features-cds-validate",
      plugin.rules!["no-deprecated-cds-features-cds-validate"],
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
          // Case 9: .cdsrc.json with valid configuration
          {
            code: '{"requires": {"db": "sqlite"}, "features": {"cds_validate": true}}',
            filename: ".cdsrc.json",
          },
        ],
        invalid: [],
      },
    );
  });

  it("should fail when cds.features.cds_validate is false", () => {
    ruleTester.run(
      "no-deprecated-cds-features-cds-validate",
      plugin.rules!["no-deprecated-cds-features-cds-validate"],
      {
        valid: [],
        invalid: [
          // Case 1: cds_validate set to false
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
          // Case 2: cds_validate with string "false" value
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
          // Case 3: Complex configuration with false cds_validate
          {
            code: `{
  "name": "my-app",
  "cds": {
    "requires": {
      "db": "sqlite"
    },
    "features": {
      "cds_validate": false
    }
  }
}`,
            filename: "package.json",
            errors: [
              {
                messageId: "deprecatedCdsFeaturesCdsValidate",
                line: 8,
                column: 7,
              },
            ],
          },
          // Case 4: .cdsrc.json with false cds_validate (cds wrapper implicit)
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
          // Case 5: .cdsrc with false cds_validate
          {
            code: '{"requires": {"db": "sqlite"}, "features": {"cds_validate": false}}',
            filename: ".cdsrc",
            errors: [
              {
                messageId: "deprecatedCdsFeaturesCdsValidate",
                line: 1,
                column: 45,
              },
            ],
          },
        ],
      },
    );
  });
});
