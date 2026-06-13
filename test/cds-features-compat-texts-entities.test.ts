import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-compat-texts-entities rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-compat-texts-entities",
    plugin.rules!["cds-features-compat-texts-entities"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
        { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
      ],
      invalid: [
        {
          code: '{"cds": {"features": {"compat_texts_entities": true}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatTextsEntities", line: 1, column: 23 }],
        },
        {
          code: '{"cds": {"features": {"compat_texts_entities": false}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatTextsEntities", line: 1, column: 23 }],
        },
        {
          code: `{
  "name": "my-app",
  "cds": {
    "features": {
      "compat_texts_entities": true
    }
  }
}`,
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatTextsEntities", line: 5, column: 7 }],
        },
        {
          code: '{"features": {"compat_texts_entities": true}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatTextsEntities", line: 1, column: 15 }],
        },
        {
          code: '{"features": {"compat_texts_entities": false}}',
          filename: ".cdsrc",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatTextsEntities", line: 1, column: 15 }],
        },
      ],
    },
  );
});
