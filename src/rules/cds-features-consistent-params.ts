import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFeaturesConsistentParams";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.features.consistent_params: false configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-features-consistent-params.md",
    },
    messages: {
      deprecatedCdsFeaturesConsistentParams:
        '"cds.features.consistent_params": false is deprecated. Please remove or update this configuration.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "consistent_params",
            parentKey: "features",
            checkValue: true,
            deprecatedValue: false,
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFeaturesConsistentParams",
          });
        }
      },
    };
  },
};

export default rule;
