import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-fiori-direct-crud rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-fiori-direct-crud", plugin.rules!["cds-fiori-direct-crud"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"fiori": {"bypass_draft": true}}}', filename: "package.json" },
      { code: '{"cds": {"fiori": {"draft_new_action": false}}}', filename: "package.json" },
      { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
    ],
    invalid: [
      {
        code: '{"cds": {"fiori": {"direct_crud": true}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFioriDirectCrud", line: 1, column: 20 }],
      },
      {
        code: '{"cds": {"fiori": {"direct_crud": false}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFioriDirectCrud", line: 1, column: 20 }],
      },
      {
        code: `{
  "name": "my-app",
  "cds": {
    "fiori": {
      "direct_crud": true
    }
  }
}`,
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsFioriDirectCrud", line: 5, column: 7 }],
      },
      {
        code: '{"fiori": {"direct_crud": true}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsFioriDirectCrud", line: 1, column: 12 }],
      },
      {
        code: '{"fiori": {"direct_crud": true}}',
        filename: ".cdsrc",
        errors: [{ messageId: "deprecatedCdsFioriDirectCrud", line: 1, column: 12 }],
      },
    ],
  });
});
