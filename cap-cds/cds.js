const rule = {
  meta: {
    type: "problem",

    docs: {
      recommended: true,
      description: "Disallow empty keys in JSON objects",
      url: "https://github.com/eslint/json/tree/main/docs/rules/no-empty-keys.md",
    },

    messages: {
      emptyKey: "Empty key found.",
    },
  },

  create(context) {
    return {
      Member(node) {
        const key =
          node.name.type === "String" ? node.name.value : node.name.name;

        if (key.trim() === "") {
          context.report({
            loc: node.name.loc,
            messageId: "emptyKey",
          });
        }
      },
    };
  },
};

export default rule;
