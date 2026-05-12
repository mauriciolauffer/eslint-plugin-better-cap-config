import { describe } from "vitest";
import json from "@eslint/json";
import { RuleTester } from "eslint";
import plugin from "../src/index.js";

describe("cds-multitenant-client-cert-header rule", () => {
  const ruleTester = new RuleTester({
    plugins: { "cap-config": plugin, json },
    language: "json/json",
  });

  ruleTester.run(
    "cds-multitenant-client-cert-header",
    plugin.rules!["cds-multitenant-client-cert-header"],
    {
      valid: [
        { code: '{"name": "test", "version": "1.0.0"}', filename: "test.json" },
        { code: "{}", filename: "test.json" },
        { code: '{"cds": {"requires": {"db": "sqlite"}}}', filename: "package.json" },
        {
          code: '{"cds": {"security": {"authentication": {"clientCertificateHeader": "x-cert"}}}}',
          filename: "package.json",
        },
        {
          code: '{"cds": {"multiTenancy": {"otherKey": "value"}}}',
          filename: "package.json",
        },
      ],
      invalid: [],
    },
  );

  ruleTester.run(
    "cds-multitenant-client-cert-header",
    plugin.rules!["cds-multitenant-client-cert-header"],
    {
      valid: [],
      invalid: [
        {
          code: '{"cds": {"multiTenancy": {"subscriptionManager": {"clientCertificateHeader": "x-cert"}}}}',
          filename: "package.json",
          errors: [{ messageId: "deprecatedCdsMultitenantClientCertHeader", line: 1, column: 51 }],
        },
        {
          code: '{"multiTenancy": {"subscriptionManager": {"clientCertificateHeader": "value"}}}',
          filename: ".cdsrc.json",
          errors: [{ messageId: "deprecatedCdsMultitenantClientCertHeader", line: 1, column: 43 }],
        },
      ],
    },
  );
});
