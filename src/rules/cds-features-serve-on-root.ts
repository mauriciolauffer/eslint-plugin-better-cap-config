import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFeaturesServeOnRoot";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.features.serve_on_root: true configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-features-serve-on-root.md",
    },
    messages: {
      deprecatedCdsFeaturesServeOnRoot:
        '"cds.features.serve_on_root: true" is deprecated. Use the new path scheme or apply an absolute @path annotation instead.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "serve_on_root",
            parentKey: "features",
            checkValue: true,
            deprecatedValue: true,
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFeaturesServeOnRoot",
          });
        }
      },
    };
  },
};

export default rule;
