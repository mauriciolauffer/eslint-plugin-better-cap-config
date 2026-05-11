import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFioriCalcElements";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.fiori.calc_elements configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-fiori-calc-elements.md",
    },
    messages: {
      deprecatedCdsFioriCalcElements:
        '"cds.fiori.calc_elements" is deprecated. Please remove or update this configuration.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "calc_elements",
            parentKey: "fiori",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFioriCalcElements",
          });
        }
      },
    };
  },
};

export default rule;
