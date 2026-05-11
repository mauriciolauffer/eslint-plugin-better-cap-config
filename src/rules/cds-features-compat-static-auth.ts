import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFeaturesCompatStaticAuth";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.features.compat_static_auth configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-features-compat-static-auth.md",
    },
    messages: {
      deprecatedCdsFeaturesCompatStaticAuth:
        '"cds.features.compat_static_auth" is deprecated. Please remove or update this configuration.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "compat_static_auth",
            parentKey: "features",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFeaturesCompatStaticAuth",
          });
        }
      },
    };
  },
};

export default rule;
