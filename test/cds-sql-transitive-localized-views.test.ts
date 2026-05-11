import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-sql-transitive-localized-views rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-sql-transitive-localized-views",
    plugin.rules!["cds-sql-transitive-localized-views"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        {
          code: '{"cds": {"sql": {"transitive_localized_views": false}}}',
          filename: "package.json",
        },
        { code: '{"sql": {"transitive_localized_views": false}}', filename: ".cdsrc.json" },
      ],
      invalid: [],
    },
  );

  ruleTester.run(
    "cds-sql-transitive-localized-views",
    plugin.rules!["cds-sql-transitive-localized-views"],
    {
      valid: [],
      invalid: [
        {
          code: '{"cds": {"sql": {"transitive_localized_views": true}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsSqlTransitiveLocalizedViews", line: 1, column: 18 }],
        },
        {
          code: '{"sql": {"transitive_localized_views": true}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsSqlTransitiveLocalizedViews", line: 1, column: 10 }],
        },
        {
          code: '{"sql": {"transitive_localized_views": true}}',
          filename: ".cdsrc",
          errors: [{ messageId: "deprecatedCdsSqlTransitiveLocalizedViews", line: 1, column: 10 }],
        },
      ],
    },
  );
});
