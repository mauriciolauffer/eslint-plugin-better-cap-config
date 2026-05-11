import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsSqlNativeHanaAssociations";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.sql.native_hana_associations: true configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-sql-native-hana-associations.md",
    },
    messages: {
      deprecatedCdsSqlNativeHanaAssociations:
        '"cds.sql.native_hana_associations: true" is deprecated. Set to false or remove to reduce deployment times. Will be removed in CDS 9.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "native_hana_associations",
            parentKey: "sql",
            checkValue: true,
            deprecatedValue: true,
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsSqlNativeHanaAssociations",
          });
        }
      },
    };
  },
};

export default rule;
