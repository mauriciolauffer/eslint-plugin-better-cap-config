import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsMcpAutoConfig";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.mcp.autoConfig configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-mcp-auto-config.md",
    },
    messages: {
      deprecatedCdsMcpAutoConfig:
        '"cds.mcp.autoConfig" is deprecated. Use "cds.mcp.autoWired" instead.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "autoConfig",
            parentKey: "mcp",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsMcpAutoConfig",
          });
        }
      },
    };
  },
};

export default rule;
