import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-cdsc-newparser rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-cdsc-newparser", plugin.rules!["cds-cdsc-newparser"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"cdsc": {"newparser": true}}}', filename: "package.json" },
      { code: '{"cdsc": {"newparser": true}}', filename: ".cdsrc.json" },
    ],
    invalid: [],
  });

  ruleTester.run("cds-cdsc-newparser", plugin.rules!["cds-cdsc-newparser"], {
    valid: [],
    invalid: [
      {
        code: '{"cds": {"cdsc": {"newparser": false}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsCdscNewparser", line: 1, column: 19 }],
      },
      {
        code: '{"cdsc": {"newparser": false}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsCdscNewparser", line: 1, column: 11 }],
      },
      {
        code: '{"cdsc": {"newparser": false}}',
        filename: ".cdsrc",
        errors: [{ messageId: "deprecatedCdsCdscNewparser", line: 1, column: 11 }],
      },
    ],
  });
});
