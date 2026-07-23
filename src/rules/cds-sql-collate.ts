import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsSqlCollate";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.sql.collate configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-sql-collate.md",
    },
    messages: {
      deprecatedCdsSqlCollate:
        '"cds.sql.collate" is deprecated and was removed in cds@10. Collation now always applies to all string elements. Please remove this configuration.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "collate",
            parentKey: "sql",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsSqlCollate",
          });
        }
      },
    };
  },
};

export default rule;
