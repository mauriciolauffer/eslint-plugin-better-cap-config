import type { JSONRuleDefinition, JSONRuleVisitor } from "@eslint/json/types";
import type { MemberNode } from "@humanwhocodes/momoa";

const rule: JSONRuleDefinition<{
  MessageIds: "deprecatedCdsFioriDraftCompat";
}> = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description: "Disallow deprecated cds.fiori.draft_compat configuration",
      url: "https://github.com/mauriciolauffer/eslint-plugin-cds-deprecated-config/docs/rules/no-deprecated-cds-fiori-draft-compat.md",
    },
    messages: {
      deprecatedCdsFioriDraftCompat:
        '"cds.fiori.draft_compat" is deprecated. Please remove or update this configuration.',
    },
    schema: [], // No options
  },

  create(context): JSONRuleVisitor {
    const filename = context.filename || "";

    return {
      Member(node: MemberNode) {
        const key =
          node.name.type === "String" ? node.name.value : node.name.name;

        if (key === "draft_compat") {
          // More precise approach: check the actual JSON structure patterns
          const sourceCode = context.sourceCode;
          const fullText = sourceCode.getText();

          let shouldFlag = false;

          // Case 1: Check for cds.fiori.draft_compat pattern
          // Look for the specific nested structure (handle nested objects)
          const cdsPattern =
            /"cds"\s*:\s*\{.*?"fiori"\s*:\s*\{.*?"draft_compat"/s;
          if (cdsPattern.test(fullText)) {
            shouldFlag = true;
          }

          // Case 2: Check for fiori.draft_compat in .cdsrc files
          // In .cdsrc files, the cds wrapper is implicit
          if (
            !shouldFlag &&
            (filename.includes(".cdsrc") || filename.includes("cds"))
          ) {
            const fioriPattern = /"fiori"\s*:\s*\{.*?"draft_compat"/s;
            if (fioriPattern.test(fullText)) {
              shouldFlag = true;
            }
          }

          if (shouldFlag) {
            context.report({
              node: node.name,
              messageId: "deprecatedCdsFioriDraftCompat",
            });
          }
        }
      },
    };
  },
};

export default rule;
