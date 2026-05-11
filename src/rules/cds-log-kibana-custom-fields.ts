import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsLogKibanaCustomFields";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.log.kibana_custom_fields configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-log-kibana-custom-fields.md",
    },
    messages: {
      deprecatedCdsLogKibanaCustomFields:
        '"cds.log.kibana_custom_fields" is deprecated. Use "cds.log.als_custom_fields" instead.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "kibana_custom_fields",
            parentKey: "log",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsLogKibanaCustomFields",
          });
        }
      },
    };
  },
};

export default rule;
