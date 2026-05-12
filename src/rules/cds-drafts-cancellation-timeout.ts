import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsDraftsCancellationTimeout";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.drafts.cancellationTimeout configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-drafts-cancellation-timeout.md",
    },
    messages: {
      deprecatedCdsDraftsCancellationTimeout:
        '"cds.drafts.cancellationTimeout" is deprecated. Use "cds.fiori.draft_lock_timeout" instead.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "cancellationTimeout",
            parentKey: "drafts",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsDraftsCancellationTimeout",
          });
        }
      },
    };
  },
};

export default rule;
