import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json/types";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFeaturesCdsValidate";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description:
        "Disallow deprecated cds.features.cds_validate configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-cds-deprecated-config/docs/rules/no-deprecated-cds-features-cds-validate.md",
    },
    messages: {
      deprecatedCdsFeaturesCdsValidate:
        '"cds.features.cds_validate": false is deprecated. Please remove or update this configuration.',
    },
    schema: [], // No options
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "cds_validate",
            parentPath: "features",
            checkValue: true,
            deprecatedValue: false,
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFeaturesCdsValidate",
          });
        }
      },
    };
  },
};

export default rule;
