import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-log-kibana-custom-fields rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-log-kibana-custom-fields", plugin.rules!["cds-log-kibana-custom-fields"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      {
        code: '{"cds": {"log": {"als_custom_fields": ["field1"]}}}',
        filename: "package.json",
      },
    ],
    invalid: [],
  });

  ruleTester.run("cds-log-kibana-custom-fields", plugin.rules!["cds-log-kibana-custom-fields"], {
    valid: [],
    invalid: [
      {
        code: '{"cds": {"log": {"kibana_custom_fields": ["field1"]}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsLogKibanaCustomFields", line: 1, column: 18 }],
      },
      {
        code: '{"log": {"kibana_custom_fields": ["field1"]}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsLogKibanaCustomFields", line: 1, column: 10 }],
      },
    ],
  });
});
