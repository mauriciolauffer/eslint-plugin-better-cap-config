import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-sql-native-hana-associations rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-sql-native-hana-associations",
    plugin.rules!["cds-sql-native-hana-associations"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        {
          code: '{"cds": {"sql": {"native_hana_associations": false}}}',
          filename: "package.json",
        },
        { code: '{"sql": {"native_hana_associations": false}}', filename: ".cdsrc.json" },
      ],
      invalid: [],
    },
  );

  ruleTester.run(
    "cds-sql-native-hana-associations",
    plugin.rules!["cds-sql-native-hana-associations"],
    {
      valid: [],
      invalid: [
        {
          code: '{"cds": {"sql": {"native_hana_associations": true}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsSqlNativeHanaAssociations", line: 1, column: 18 }],
        },
        {
          code: '{"sql": {"native_hana_associations": true}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsSqlNativeHanaAssociations", line: 1, column: 10 }],
        },
        {
          code: '{"sql": {"native_hana_associations": true}}',
          filename: ".cdsrc",
          errors: [{ messageId: "deprecatedCdsSqlNativeHanaAssociations", line: 1, column: 10 }],
        },
      ],
    },
  );
});
