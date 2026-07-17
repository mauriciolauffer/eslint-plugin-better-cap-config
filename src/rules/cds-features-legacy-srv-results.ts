import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFeaturesLegacySrvResults";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.features.legacy_srv_results: true configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-features-legacy-srv-results.md",
    },
    messages: {
      deprecatedCdsFeaturesLegacySrvResults:
        '"cds.features.legacy_srv_results": true is deprecated. CREATE/UPDATE/UPSERT/DELETE now return arrays with .affected by default. Remove this flag before cds@11.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "legacy_srv_results",
            parentKey: "features",
            checkValue: true,
            deprecatedValue: true,
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFeaturesLegacySrvResults",
          });
        }
      },
    };
  },
};

export default rule;
