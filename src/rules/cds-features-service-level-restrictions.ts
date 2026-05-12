import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFeaturesServiceLevelRestrictions";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description:
        "Disallow deprecated cds.features.service_level_restrictions: false configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-features-service-level-restrictions.md",
    },
    messages: {
      deprecatedCdsFeaturesServiceLevelRestrictions:
        '"cds.features.service_level_restrictions": false is deprecated. Please remove or update this configuration.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "service_level_restrictions",
            parentKey: "features",
            checkValue: true,
            deprecatedValue: false,
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFeaturesServiceLevelRestrictions",
          });
        }
      },
    };
  },
};

export default rule;
