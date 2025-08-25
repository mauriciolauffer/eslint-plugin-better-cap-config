import type { JSONSourceCode } from "@eslint/json";
import type { MemberNode } from "@humanwhocodes/momoa";

/**
 * Configuration for deprecated CDS configuration detection
 */
export interface DeprecatedConfigPattern {
  /** The key to look for (e.g., "draft_compat", "odata_new_adapter") */
  key: string;
  /** The nested path in cds configuration (e.g., "fiori", "features") */
  parentKey: string;
  /** Whether to check for specific value (e.g., false for some deprecated features) */
  checkValue?: boolean;
  /** The deprecated value to check for (e.g., false) */
  deprecatedValue?: boolean | string;
}

/**
 * Checks if a node value matches the deprecated value
 */
function isDeprecatedValue(
  node: MemberNode,
  deprecatedValue?: boolean | string,
): boolean {
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
  if (
    !context?.sourceCode ||
    !node?.name ||
    !pattern?.key ||
    !pattern?.parentKey
  ) {
    return false;
  }

  const key = node.name.type === "String" ? node.name.value : node.name.name;
  if (key !== pattern.key) {
    return false;
  }

  const parentMember = context.sourceCode
    .getAncestors(node)
    .filter((parentNode) => parentNode.type === "Member")
    .at(-1);
  const parentKey =
    parentMember?.name.type === "String" && parentMember.name?.value
      ? parentMember.name?.value
      : null;
  if (parentKey !== pattern.parentKey) {
    return false;
  }

  // eslint-disable-next-line sonarjs/prefer-single-boolean-return
  if (pattern.checkValue && !isDeprecatedValue(node, pattern.deprecatedValue)) {
    return false;
  }

  return true;
}
