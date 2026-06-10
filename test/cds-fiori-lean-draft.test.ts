import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-fiori-lean-draft rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-fiori-lean-draft", plugin.rules!["cds-fiori-lean-draft"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"fiori": {"lean_draft": true}}}', filename: "package.json" },
      { code: '{"cds": {"fiori": {"preview": true}}}', filename: "package.json" },
      { code: '{"fiori": {"lean_draft": true}}', filename: ".cdsrc.json" },
    ],
    invalid: [
      {
        code: '{"cds": {"fiori": {"lean_draft": false}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFioriLeanDraft", line: 1, column: 20 }],
      },
      {
        code: '{"fiori": {"lean_draft": false}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsFioriLeanDraft", line: 1, column: 12 }],
      },
      {
        code: '{"fiori": {"lean_draft": false}}',
        filename: ".cdsrc",
        errors: [{ messageId: "deprecatedCdsFioriLeanDraft", line: 1, column: 12 }],
      },
    ],
  });
});
