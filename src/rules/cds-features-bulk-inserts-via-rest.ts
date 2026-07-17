import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFeaturesBulkInsertsViaRest";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.features.bulk_inserts_via_rest: false configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-features-bulk-inserts-via-rest.md",
    },
    messages: {
      deprecatedCdsFeaturesBulkInsertsViaRest:
        '"cds.features.bulk_inserts_via_rest": false is deprecated. Bulk REST POST is now dispatched as a single INSERT by default. Remove this opt-out before cds@11.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "bulk_inserts_via_rest",
            parentKey: "features",
            checkValue: true,
            deprecatedValue: false,
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsFeaturesBulkInsertsViaRest",
          });
        }
      },
    };
  },
};

export default rule;
