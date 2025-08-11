const rule = {
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

  create(context) {
    return {
      Member(node) {
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

          // Get the full source text of the file
          const sourceCode = context.getSourceCode();
          const fullText = sourceCode.getText();
          const filename = context.filename || "";

          // Find the position of this cds_validate in the source
          const nodeStart = node.name.range[0];
          const nodeEnd = node.name.range[1];

          let shouldFlag = false;

          // Case 1: Regular pattern with explicit cds key
          // Look for "cds": { ... "features": { ... "cds_validate": ...
          const cdsPattern =
            /"cds"\s*:\s*\{.*?"features"\s*:\s*\{.*?"cds_validate"/s;
          let matches = fullText.match(cdsPattern);

          if (matches) {
            // Make sure our cds_validate is the one that matches the pattern
            const matchStart = fullText.indexOf(matches[0]);
            const matchEnd = matchStart + matches[0].length;

            if (nodeStart >= matchStart && nodeEnd <= matchEnd) {
              shouldFlag = true;
            }
          }

          // Case 2: .cdsrc.json or similar files where the cds wrapper is implicit
          // In this case, just look for features.cds_validate at root level
          if (
            !shouldFlag &&
            (filename.includes(".cdsrc") || filename.includes("cds"))
          ) {
            const featuresPattern = /"features"\s*:\s*\{.*?"cds_validate"/s;
            const featuresMatches = fullText.match(featuresPattern);

            if (featuresMatches) {
              const matchStart = fullText.indexOf(featuresMatches[0]);
              const matchEnd = matchStart + featuresMatches[0].length;

              if (nodeStart >= matchStart && nodeEnd <= matchEnd) {
                shouldFlag = true;
              }
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
