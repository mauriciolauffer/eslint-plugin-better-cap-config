import type { JSONSourceCode } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";

/**
 * Configuration for deprecated CDS configuration detection
 */
export interface DeprecatedConfigPattern {
  /** The key to look for (e.g., "draft_compat", "odata_new_adapter") */
  key: string;
  /** The nearest ancestor key in cds configuration (e.g., "fiori", "features") */
  parentKey: string;
  /** Additional ancestor keys above parentKey, ordered from nearest to farthest (e.g., ["subscriptionManager"] for cds.multiTenancy.subscriptionManager.key) */
  ancestorKeys?: string[];
  /** Whether to check for specific value (e.g., false for some deprecated features) */
  checkValue?: boolean;
  /** The deprecated value to check for (e.g., false) */
  deprecatedValue?: boolean | string;
}

/**
 * Checks if a node value matches the deprecated value
 */
function isDeprecatedValue(node: MemberNode, deprecatedValue?: boolean | string): boolean {
  const value = node.value;
  if (deprecatedValue === undefined) {
    return true; // Any value is deprecated
  }
  if (typeof deprecatedValue === "boolean") {
    return (
      (value.type === "Boolean" && value.value === deprecatedValue) ||
      (value.type === "String" && value.value === deprecatedValue.toString())
    );
  }
  if (typeof deprecatedValue === "string") {
    return value.type === "String" && value.value === deprecatedValue;
  }

  return false;
}

/**
 * Checks if a deprecated CDS configuration pattern is present in the file
 */
export function checkDeprecatedCdsPattern(
  context: { filename?: string; sourceCode: JSONSourceCode },
  node: MemberNode,
  pattern: DeprecatedConfigPattern,
): boolean {
  // Input validation
  if (!context?.sourceCode || !node?.name || !pattern?.key || !pattern?.parentKey) {
    return false;
  }

  const key = node.name.type === "String" ? node.name.value : node.name.name;
  if (key !== pattern.key) {
    return false;
  }

  const memberAncestors = context.sourceCode
    .getAncestors(node)
    .filter((parentNode) => parentNode.type === "Member");

  const getMemberKey = (member: (typeof memberAncestors)[number] | undefined): string | null =>
    member?.name.type === "String" && member.name?.value ? member.name.value : null;

  const parentMember = memberAncestors.at(-1);
  const parentKey = getMemberKey(parentMember);
  if (parentKey !== pattern.parentKey) {
    return false;
  }

  if (pattern.ancestorKeys?.length) {
    for (let i = 0; i < pattern.ancestorKeys.length; i++) {
      const ancestor = memberAncestors.at(-(2 + i));
      const expectedKey = pattern.ancestorKeys[i];
      if (getMemberKey(ancestor) != expectedKey) {
        return false;
      }
    }
  }

  if (pattern.checkValue && !isDeprecatedValue(node, pattern.deprecatedValue)) {
    return false;
  }

  return true;
}
