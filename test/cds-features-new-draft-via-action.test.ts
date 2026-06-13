import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-features-new-draft-via-action rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-features-new-draft-via-action",
    plugin.rules!["cds-features-new-draft-via-action"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        { code: '{"cds": {"features": {"preview": true}}}', filename: "package.json" },
        { code: '{"cds": {"fiori": {"direct_crud": true}}}', filename: "package.json" },
        { code: '{"requires": {"db": "sqlite"}}', filename: ".cdsrc.json" },
      ],
      invalid: [
        {
          code: '{"cds": {"features": {"new_draft_via_action": true}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesNewDraftViaAction", line: 1, column: 23 }],
        },
        {
          code: '{"cds": {"features": {"new_draft_via_action": false}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesNewDraftViaAction", line: 1, column: 23 }],
        },
        {
          code: `{
  "name": "my-app",
  "cds": {
    "features": {
      "new_draft_via_action": true
    }
  }
}`,
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsFeaturesNewDraftViaAction", line: 5, column: 7 }],
        },
        {
          code: '{"features": {"new_draft_via_action": true}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsFeaturesNewDraftViaAction", line: 1, column: 15 }],
        },
        {
          code: '{"features": {"new_draft_via_action": false}}',
          filename: ".cdsrc",
          errors: [{ messageId: "deprecatedCdsFeaturesNewDraftViaAction", line: 1, column: 15 }],
        },
      ],
    },
  );
});
