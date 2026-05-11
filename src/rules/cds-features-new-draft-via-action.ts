import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFeaturesNewDraftViaAction";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.features.new_draft_via_action configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-features-new-draft-via-action.md",
    },
    messages: {
      deprecatedCdsFeaturesNewDraftViaAction:
        '"cds.features.new_draft_via_action" is deprecated. Use "cds.fiori.direct_crud" instead.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "new_draft_via_action",
            parentKey: "features",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFeaturesNewDraftViaAction",
          });
        }
      },
    };
  },
};

export default rule;
