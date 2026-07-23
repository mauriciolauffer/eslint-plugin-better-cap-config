import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-compat-srv-getters rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-compat-srv-getters",
    plugin.rules!["cds-features-compat-srv-getters"],
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
          code: '{"cds": {"features": {"compat_srv_getters": true}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatSrvGetters", line: 1, column: 23 }],
        },
        {
          code: '{"cds": {"features": {"compat_srv_getters": false}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatSrvGetters", line: 1, column: 23 }],
        },
        {
          code: '{"features": {"compat_srv_getters": true}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatSrvGetters", line: 1, column: 15 }],
        },
        {
          code: '{"features": {"compat_srv_getters": true}}',
          filename: ".cdsrc",
          errors: [{ messageId: "deprecatedCdsFeaturesCompatSrvGetters", line: 1, column: 15 }],
        },
      ],
    },
  );
});
