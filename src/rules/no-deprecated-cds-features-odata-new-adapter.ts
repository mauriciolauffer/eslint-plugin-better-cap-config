import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json/types";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFeaturesOdataNewAdapter";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description:
        "Disallow deprecated cds.features.odata_new_adapter configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-cds-deprecated-config/docs/rules/no-deprecated-cds-features-odata-new-adapter.md",
    },
    messages: {
      deprecatedCdsFeaturesOdataNewAdapter:
        '"cds.features.odata_new_adapter": false is deprecated. Please remove or update this configuration.',
    },
    schema: [], // No options
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "odata_new_adapter",
            parentKey: "features",
            checkValue: true,
            deprecatedValue: false,
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFeaturesOdataNewAdapter",
          });
        }
      },
    };
  },
};

export default rule;
