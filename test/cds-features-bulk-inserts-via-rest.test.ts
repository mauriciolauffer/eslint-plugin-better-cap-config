import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-bulk-inserts-via-rest rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-bulk-inserts-via-rest",
    plugin.rules!["cds-features-bulk-inserts-via-rest"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
        {
          code: '{"cds": {"features": {"bulk_inserts_via_rest": true}}}',
          filename: "package.json",
        },
        {
          code: '{"cds": {"features": {"bulk_inserts_via_rest": "true"}}}',
          filename: "package.json",
        },
        { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
      ],
      invalid: [
        {
          code: '{"cds": {"features": {"bulk_inserts_via_rest": false}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesBulkInsertsViaRest", line: 1, column: 23 }],
        },
        {
          code: '{"cds": {"features": {"bulk_inserts_via_rest": "false"}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesBulkInsertsViaRest", line: 1, column: 23 }],
        },
        {
          code: `{
  "name": "my-app",
  "cds": {
    "features": {
      "bulk_inserts_via_rest": false
    }
  }
}`,
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesBulkInsertsViaRest", line: 5, column: 7 }],
        },
        {
          code: '{"features": {"bulk_inserts_via_rest": false}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsFeaturesBulkInsertsViaRest", line: 1, column: 15 }],
        },
        {
          code: '{"features": {"bulk_inserts_via_rest": false}}',
          filename: ".cdsrc",
          errors: [{ messageId: "deprecatedCdsFeaturesBulkInsertsViaRest", line: 1, column: 15 }],
        },
      ],
    },
  );
});
