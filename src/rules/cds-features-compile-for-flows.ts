import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFeaturesCompileForFlows";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.features.compile_for_flows configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-features-compile-for-flows.md",
    },
    messages: {
      deprecatedCdsFeaturesCompileForFlows:
        '"cds.features.compile_for_flows" is deprecated. Use "cds.features.annotate_for_flows" instead.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "compile_for_flows",
            parentKey: "features",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFeaturesCompileForFlows",
          });
        }
      },
    };
  },
};

export default rule;
