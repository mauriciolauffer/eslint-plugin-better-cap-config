import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsRequiresDbDatabase";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.requires.db.database configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-requires-db-database.md",
    },
    messages: {
      deprecatedCdsRequiresDbDatabase:
        '"cds.requires.db.database" is deprecated. Please remove or update this configuration.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "database",
            parentKey: "db",
            ancestorKeys: ["requires"],
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsRequiresDbDatabase",
          });
        }
      },
    };
  },
};

export default rule;
