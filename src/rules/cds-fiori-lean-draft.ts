import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFioriLeanDraft";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.fiori.lean_draft: false configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-fiori-lean-draft.md",
    },
    messages: {
      deprecatedCdsFioriLeanDraft:
        '"cds.fiori.lean_draft: false" is deprecated. The old draft implementation was removed in CDS 8. Remove this configuration.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "lean_draft",
            parentKey: "fiori",
            checkValue: true,
            deprecatedValue: false,
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFioriLeanDraft",
          });
        }
      },
    };
  },
};

export default rule;
