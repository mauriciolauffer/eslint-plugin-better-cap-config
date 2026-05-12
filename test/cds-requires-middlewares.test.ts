import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-requires-middlewares rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-requires-middlewares", plugin.rules!["cds-requires-middlewares"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"requires": {"middlewares": true}}}', filename: "package.json" },
      { code: '{"requires": {"middlewares": true}}', filename: ".cdsrc.json" },
    ],
    invalid: [],
  });

  ruleTester.run("cds-requires-middlewares", plugin.rules!["cds-requires-middlewares"], {
    valid: [],
    invalid: [
      {
        code: '{"cds": {"requires": {"middlewares": false}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsRequiresMiddlewares", line: 1, column: 23 }],
      },
      {
        code: '{"requires": {"middlewares": false}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsRequiresMiddlewares", line: 1, column: 15 }],
      },
      {
        code: '{"requires": {"middlewares": false}}',
        filename: ".cdsrc",
        errors: [{ messageId: "deprecatedCdsRequiresMiddlewares", line: 1, column: 15 }],
      },
    ],
  });
});
