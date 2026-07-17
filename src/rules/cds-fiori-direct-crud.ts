import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFioriDirectCrud";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.fiori.direct_crud configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-fiori-direct-crud.md",
    },
    messages: {
      deprecatedCdsFioriDirectCrud:
        '"cds.fiori.direct_crud" is deprecated. Use "cds.fiori.bypass_draft" and "cds.fiori.draft_new_action" instead.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "direct_crud",
            parentKey: "fiori",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFioriDirectCrud",
          });
        }
      },
    };
  },
};

export default rule;
