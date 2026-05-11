import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFeaturesBase64Binaries";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.features.base64_binaries configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-features-base64-binaries.md",
    },
    messages: {
      deprecatedCdsFeaturesBase64Binaries:
        '"cds.features.base64_binaries" is deprecated. Please remove or update this configuration.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "base64_binaries",
            parentKey: "features",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFeaturesBase64Binaries",
          });
        }
      },
    };
  },
};

export default rule;
