import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-requires-db-database rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-requires-db-database", plugin.rules!["cds-requires-db-database"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"requires": {"db": {"kind": "hana"}}}}', filename: "package.json" },
      { code: '{"requires": {"db": {"kind": "hana"}}}', filename: ".cdsrc.json" },
    ],
    invalid: [],
  });

  ruleTester.run("cds-requires-db-database", plugin.rules!["cds-requires-db-database"], {
    valid: [],
    invalid: [
      {
        code: '{"cds": {"requires": {"db": {"database": "mydb"}}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsRequiresDbDatabase", line: 1, column: 30 }],
      },
      {
        code: '{"cds": {"requires": {"db": {"kind": "hana", "database": "mydb"}}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsRequiresDbDatabase", line: 1, column: 46 }],
      },
      {
        code: `{
  "name": "my-app",
  "cds": {
    "requires": {
      "db": {
        "database": "mydb"
      }
    }
  }
}`,
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsRequiresDbDatabase", line: 6, column: 9 }],
      },
      {
        code: '{"requires": {"db": {"database": "mydb"}}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsRequiresDbDatabase", line: 1, column: 22 }],
      },
      {
        code: '{"requires": {"db": {"database": "mydb"}}}',
        filename: ".cdsrc",
        errors: [{ messageId: "deprecatedCdsRequiresDbDatabase", line: 1, column: 22 }],
      },
    ],
  });
});
