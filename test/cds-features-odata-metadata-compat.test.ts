import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-odata-metadata-compat rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-odata-metadata-compat",
    plugin.rules!["cds-features-odata-metadata-compat"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
        { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
      ],
      invalid: [
        {
          code: '{"cds": {"features": {"odata_metadata_compat": true}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesOdataMetadataCompat", line: 1, column: 23 }],
        },
        {
          code: '{"cds": {"features": {"odata_metadata_compat": false}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesOdataMetadataCompat", line: 1, column: 23 }],
        },
        {
          code: '{"features": {"odata_metadata_compat": true}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsFeaturesOdataMetadataCompat", line: 1, column: 15 }],
        },
        {
          code: '{"features": {"odata_metadata_compat": true}}',
          filename: ".cdsrc",
          errors: [{ messageId: "deprecatedCdsFeaturesOdataMetadataCompat", line: 1, column: 15 }],
        },
      ],
    },
  );
});
