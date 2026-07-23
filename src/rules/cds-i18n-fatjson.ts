import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsI18nFatjson";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.i18n.fatjson configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-i18n-fatjson.md",
    },
    messages: {
      deprecatedCdsI18nFatjson:
        '"cds.i18n.fatjson" is deprecated. The default is now false and this option will be removed in a future version. Please remove this configuration.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "fatjson",
            parentKey: "i18n",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsI18nFatjson",
          });
        }
      },
    };
  },
};

export default rule;
