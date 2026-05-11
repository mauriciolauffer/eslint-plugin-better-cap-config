import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-compile-for-flows rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-compile-for-flows",
    plugin.rules!["cds-features-compile-for-flows"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"features": {"annotate_for_flows": true}}}', filename: "package.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      ],
      invalid: [],
    },
  );

  ruleTester.run(
    "cds-features-compile-for-flows",
    plugin.rules!["cds-features-compile-for-flows"],
    {
      valid: [],
      invalid: [
        {
          code: '{"cds": {"features": {"compile_for_flows": true}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompileForFlows", line: 1, column: 23 }],
        },
        {
          code: '{"cds": {"features": {"compile_for_flows": false}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompileForFlows", line: 1, column: 23 }],
        },
        {
          code: '{"features": {"compile_for_flows": true}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsFeaturesCompileForFlows", line: 1, column: 15 }],
        },
      ],
    },
  );
});
