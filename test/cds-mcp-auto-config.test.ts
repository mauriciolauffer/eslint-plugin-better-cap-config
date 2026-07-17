import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-mcp-auto-config rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-mcp-auto-config", plugin.rules!["cds-mcp-auto-config"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"mcp": {"autoWired": true}}}', filename: "package.json" },
      { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
    ],
    invalid: [
      {
        code: '{"cds": {"mcp": {"autoConfig": true}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsMcpAutoConfig", line: 1, column: 18 }],
      },
      {
        code: '{"cds": {"mcp": {"autoConfig": false}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsMcpAutoConfig", line: 1, column: 18 }],
      },
      {
        code: `{
  "name": "my-app",
  "cds": {
    "mcp": {
      "autoConfig": true
    }
  }
}`,
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsMcpAutoConfig", line: 5, column: 7 }],
      },
      {
        code: '{"mcp": {"autoConfig": true}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsMcpAutoConfig", line: 1, column: 10 }],
      },
      {
        code: '{"mcp": {"autoConfig": true}}',
        filename: ".cdsrc",
        errors: [{ messageId: "deprecatedCdsMcpAutoConfig", line: 1, column: 10 }],
      },
    ],
  });
});
