import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-fiori-calc-elements rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-fiori-calc-elements", plugin.rules!["cds-fiori-calc-elements"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"fiori": {"preview": true}}}', filename: "package.json" },
    ],
    invalid: [],
  });

  ruleTester.run("cds-fiori-calc-elements", plugin.rules!["cds-fiori-calc-elements"], {
    valid: [],
    invalid: [
      {
        code: '{"cds": {"fiori": {"calc_elements": true}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFioriCalcElements", line: 1, column: 20 }],
      },
      {
        code: '{"cds": {"fiori": {"calc_elements": false}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFioriCalcElements", line: 1, column: 20 }],
      },
      {
        code: '{"fiori": {"calc_elements": true}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsFioriCalcElements", line: 1, column: 12 }],
      },
    ],
  });
});
