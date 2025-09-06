import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json/types";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFioriDraftCompat";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.fiori.draft_compat configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/no-deprecated-cds-fiori-draft-compat.md",
    },
    messages: {
      deprecatedCdsFioriDraftCompat:
        '"cds.fiori.draft_compat" is deprecated. Please remove or update this configuration.',
    },
    schema: [], // No options
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "draft_compat",
            parentKey: "fiori",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFioriDraftCompat",
          });
        }
      },
    };
  },
};

export default rule;
