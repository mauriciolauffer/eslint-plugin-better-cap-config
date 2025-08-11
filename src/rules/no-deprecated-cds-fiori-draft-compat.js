const rule = {
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

  create(context) {
    return {
      Member(node) {
        const key =
          node.name.type === "String" ? node.name.value : node.name.name;

        if (key === "draft_compat") {
          // Get the full source text of the file
          const sourceCode = context.getSourceCode();
          const fullText = sourceCode.getText();
          const filename = context.filename || "";

          // Find the position of this draft_compat in the source
          const nodeStart = node.name.range[0];
          const nodeEnd = node.name.range[1];

          let shouldFlag = false;

          // Case 1: Regular pattern with explicit cds key
          const cdsPattern =
            /"cds"\s*:\s*\{.*?"fiori"\s*:\s*\{.*?"draft_compat"/s;
          let matches = fullText.match(cdsPattern);

          if (matches) {
            // Make sure our draft_compat is the one that matches the pattern
            const matchStart = fullText.indexOf(matches[0]);
            const matchEnd = matchStart + matches[0].length;

            if (nodeStart >= matchStart && nodeEnd <= matchEnd) {
              shouldFlag = true;
            }
          }

          // Case 2: .cdsrc.json or similar files where the cds wrapper is implicit
          // In this case, just look for fiori.draft_compat at root level
          if (
            !shouldFlag &&
            (filename.includes(".cdsrc") || filename.includes("cds"))
          ) {
            const fioriPattern = /"fiori"\s*:\s*\{.*?"draft_compat"/s;
            const fioriMatches = fullText.match(fioriPattern);

            if (fioriMatches) {
              const matchStart = fullText.indexOf(fioriMatches[0]);
              const matchEnd = matchStart + fioriMatches[0].length;

              if (nodeStart >= matchStart && nodeEnd <= matchEnd) {
                shouldFlag = true;
              }
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
