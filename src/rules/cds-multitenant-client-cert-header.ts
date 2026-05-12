import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsMultitenantClientCertHeader";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description:
        "Disallow deprecated cds.multiTenancy.subscriptionManager.clientCertificateHeader configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-multitenant-client-cert-header.md",
    },
    messages: {
      deprecatedCdsMultitenantClientCertHeader:
        '"cds.multiTenancy.subscriptionManager.clientCertificateHeader" is deprecated. Use "cds.security.authentication.clientCertificateHeader" instead.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "clientCertificateHeader",
            parentKey: "subscriptionManager",
            ancestorKeys: ["multiTenancy"],
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsMultitenantClientCertHeader",
          });
        }
      },
    };
  },
};

export default rule;
