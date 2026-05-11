import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsSqlRuntimeViewMode";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: 'Disallow deprecated cds.sql.runtimeView.mode: "resolve" configuration',
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-sql-runtime-view-mode.md",
    },
    messages: {
      deprecatedCdsSqlRuntimeViewMode:
        '"cds.sql.runtimeView.mode": "resolve" is deprecated. Use "cte" mode or remove this configuration.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "mode",
            parentKey: "runtimeView",
            ancestorKeys: ["sql"],
            checkValue: true,
            deprecatedValue: "resolve",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsSqlRuntimeViewMode",
          });
        }
      },
    };
  },
};

export default rule;
