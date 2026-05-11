import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsSqlTransitiveLocalizedViews";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.sql.transitive_localized_views: true configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-sql-transitive-localized-views.md",
    },
    messages: {
      deprecatedCdsSqlTransitiveLocalizedViews:
        '"cds.sql.transitive_localized_views: true" is deprecated. Use the default (false) to eliminate ~50% of views. Will be removed in CDS 9.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "transitive_localized_views",
            parentKey: "sql",
            checkValue: true,
            deprecatedValue: true,
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsSqlTransitiveLocalizedViews",
          });
        }
      },
    };
  },
};

export default rule;
