import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-remote-native-fetch rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run("cds-remote-native-fetch", plugin.rules!["cds-remote-native-fetch"], {
    valid: [
      { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
      { code: "{}", filename: "test.json" },
      { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
      { code: '{"cds": {"remote": {"timeout": 5000}}}', filename: "package.json" },
    ],
    invalid: [],
  });

  ruleTester.run("cds-remote-native-fetch", plugin.rules!["cds-remote-native-fetch"], {
    valid: [],
    invalid: [
      {
        code: '{"cds": {"remote": {"native_fetch": true}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsRemoteNativeFetch", line: 1, column: 21 }],
      },
      {
        code: '{"cds": {"remote": {"native_fetch": false}}}',
        filename: "package.json",
        errors: [{ messageId: "deprecatedCdsRemoteNativeFetch", line: 1, column: 21 }],
      },
      {
        code: '{"remote": {"native_fetch": true}}',
        filename: ".cdsrc.json",
        errors: [{ messageId: "deprecatedCdsRemoteNativeFetch", line: 1, column: 13 }],
      },
    ],
  });
});
