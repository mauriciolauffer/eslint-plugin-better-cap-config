import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-sql-runtime-view-mode rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-sql-runtime-view-mode", plugin.rules!["cds-sql-runtime-view-mode"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      {
        code: '{"cds": {"sql": {"runtimeView": {"mode": "cte"}}}}',
        filename: "package.json",
      },
      {
        code: '{"cds": {"sql": {"runtimeView": {"mode": "inline"}}}}',
        filename: "package.json",
      },
    ],
    invalid: [],
  });

  ruleTester.run("cds-sql-runtime-view-mode", plugin.rules!["cds-sql-runtime-view-mode"], {
    valid: [],
    invalid: [
      {
        code: '{"cds": {"sql": {"runtimeView": {"mode": "resolve"}}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsSqlRuntimeViewMode", line: 1, column: 34 }],
      },
      {
        code: '{"sql": {"runtimeView": {"mode": "resolve"}}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsSqlRuntimeViewMode", line: 1, column: 26 }],
      },
    ],
  });
});
