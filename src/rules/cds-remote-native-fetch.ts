import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";
import { checkDeprecatedCdsPattern } from "../utils/rule-utils.js";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsRemoteNativeFetch";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.remote.native_fetch configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/docs/rules/cds-remote-native-fetch.md",
    },
    messages: {
      deprecatedCdsRemoteNativeFetch:
        '"cds.remote.native_fetch" is deprecated. Please remove or update this configuration.',
    },
    schema: [],
  },

  create(context): JSONRuleVisitor {
    return {
      Member(node: MemberNode) {
        if (
          checkDeprecatedCdsPattern(context, node, {
            key: "native_fetch",
            parentKey: "remote",
          })
        ) {
          context.report({
            node: node.name,
            messageId: "deprecatedCdsRemoteNativeFetch",
          });
        }
      },
    };
  },
};

export default rule;
