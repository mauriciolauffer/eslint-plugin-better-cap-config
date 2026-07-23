import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-sql-collate rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-sql-collate", plugin.rules!["cds-sql-collate"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"sql": {"dialect": "sqlite"}}}', filename: "package.json" },
      { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
    ],
    invalid: [
      {
        code: '{"cds": {"sql": {"collate": "NOCASE"}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsSqlCollate", line: 1, column: 18 }],
      },
      {
        code: '{"cds": {"sql": {"collate": true}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsSqlCollate", line: 1, column: 18 }],
      },
      {
        code: `{
  "name": "my-app",
  "cds": {
    "sql": {
      "collate": "NOCASE"
    }
  }
}`,
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsSqlCollate", line: 5, column: 7 }],
      },
      {
        code: '{"sql": {"collate": "NOCASE"}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsSqlCollate", line: 1, column: 10 }],
      },
      {
        code: '{"sql": {"collate": "NOCASE"}}',
        filename: ".cdsrc",
        errors: [{ messageId: "deprecatedCdsSqlCollate", line: 1, column: 10 }],
      },
    ],
  });
});
