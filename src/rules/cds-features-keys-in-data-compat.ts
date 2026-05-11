import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFeaturesKeysInDataCompat";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.features.keys_in_data_compat configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-features-keys-in-data-compat.md",
    },
    messages: {
      deprecatedCdsFeaturesKeysInDataCompat:
        '"cds.features.keys_in_data_compat" is deprecated. Please remove or update this configuration.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "keys_in_data_compat",
            parentKey: "features",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFeaturesKeysInDataCompat",
          });
        }
      },
    };
  },
};

export default rule;
