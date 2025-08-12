import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json/types";
import type { MemberNode } from "@humanwhocodes/momoa";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFeaturesCdsValidate";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description:
        "Disallow deprecated cds.features.cds_validate configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-cds-deprecated-config/docs/rules/no-deprecated-cds-features-cds-validate.md",
    },
    messages: {
      deprecatedCdsFeaturesCdsValidate:
        '"cds.features.cds_validate": false is deprecated. Please remove or update this configuration.',
    },
    schema: [], // No options
  },

  create(context): JSONRuleVisitor {
    const filename = context.filename || "";

    return {
      Member(node: MemberNode) {
        const key =
          node.name.type === "String" ? node.name.value : node.name.name;

        if (key === "cds_validate") {
          // Check if the value is false
          const value = node.value;
          const isFalse =
            (value.type === "Boolean" && value.value === false) ||
            (value.type === "String" && value.value === "false");

          if (!isFalse) {
            return; // Only flag when value is false
          }

          // More precise approach: check the actual JSON structure patterns
          const sourceCode = context.sourceCode;
          const fullText = sourceCode.getText();

          let shouldFlag = false;

          // Case 1: Check for cds.features.cds_validate pattern
          // Look for the specific nested structure (handle nested objects)
          const cdsPattern =
            /"cds"\s*:\s*\{.*?"features"\s*:\s*\{.*?"cds_validate"\s*:\s*(false|"false")/s;
          if (cdsPattern.test(fullText)) {
            shouldFlag = true;
          }

          // Case 2: Check for features.cds_validate in .cdsrc files
          // In .cdsrc files, the cds wrapper is implicit
          if (
            !shouldFlag &&
            (filename.includes(".cdsrc") || filename.includes("cds"))
          ) {
            const featuresPattern =
              /"features"\s*:\s*\{.*?"cds_validate"\s*:\s*(false|"false")/s;
            if (featuresPattern.test(fullText)) {
              shouldFlag = true;
            }
          }

          if (shouldFlag) {
            context.report({
              node: node.name,
              messageId: "deprecatedCdsFeaturesCdsValidate",
            });
          }
        }
      },
    };
  },
};

export default rule;
