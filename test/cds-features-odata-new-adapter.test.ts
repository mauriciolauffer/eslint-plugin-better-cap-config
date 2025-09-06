import { describe, it } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-odata-new-adapter rule", () => {
  const ruleTester = new RuleTester({
    plugins: {
      "cap-config": plugin,
      json,
    },
    language: "json/json",
  });

  it("should pass for valid cases", () => {
    ruleTester.run(
      "cds-features-odata-new-adapter",
      plugin.rules!["cds-features-odata-new-adapter"],
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
          // Case 9: .cdsrc.json with valid configuration
          {
            code: '{"requires": {"db": "sqlite"}, "features": {"odata_new_adapter": true}}',
            filename: ".cdsrc.json",
          },
        ],
        invalid: [],
      },
    );
  });

  it("should fail when cds.features.odata_new_adapter is false", () => {
    ruleTester.run(
      "cds-features-odata-new-adapter",
      plugin.rules!["cds-features-odata-new-adapter"],
      {
        valid: [],
        invalid: [
          // Case 1: odata_new_adapter set to false
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
          // Case 2: odata_new_adapter with string "false" value
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
          // Case 3: Complex configuration with false odata_new_adapter
          {
            code: `{
  "name": "my-app",
  "cds": {
    "requires": {
      "db": "sqlite"
    },
    "features": {
      "odata_new_adapter": false
    }
  }
}`,
            filename: "package.json",
            errors: [
              {
                messageId: "deprecatedCdsFeaturesOdataNewAdapter",
                line: 8,
                column: 7,
              },
            ],
          },
          // Case 4: .cdsrc.json with false odata_new_adapter (cds wrapper implicit)
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
          // Case 5: .cdsrc with false odata_new_adapter
          {
            code: '{"requires": {"db": "sqlite"}, "features": {"odata_new_adapter": false}}',
            filename: ".cdsrc",
            errors: [
              {
                messageId: "deprecatedCdsFeaturesOdataNewAdapter",
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
