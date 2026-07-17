import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-i18n-fatjson rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-i18n-fatjson", plugin.rules!["cds-i18n-fatjson"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"i18n": {"languages": "de,en"}}}', filename: "package.json" },
      { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
    ],
    invalid: [
      {
        code: '{"cds": {"i18n": {"fatjson": true}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsI18nFatjson", line: 1, column: 19 }],
      },
      {
        code: '{"cds": {"i18n": {"fatjson": false}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsI18nFatjson", line: 1, column: 19 }],
      },
      {
        code: `{
  "name": "my-app",
  "cds": {
    "i18n": {
      "fatjson": true
    }
  }
}`,
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsI18nFatjson", line: 5, column: 7 }],
      },
      {
        code: '{"i18n": {"fatjson": true}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsI18nFatjson", line: 1, column: 11 }],
      },
      {
        code: '{"i18n": {"fatjson": true}}',
        filename: ".cdsrc",
        errors: [{ messageId: "deprecatedCdsI18nFatjson", line: 1, column: 11 }],
      },
    ],
  });
});
