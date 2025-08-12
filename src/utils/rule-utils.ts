import type { MemberNode } from "@humanwhocodes/momoa";

/**
 * Constants for common configuration patterns
 */
const CONFIG_PATTERNS = {
  CDS_RC_FILENAME_PATTERNS: [".cdsrc", "cds"],
  JSON_LANGUAGE_TYPES: {
    STRING: "String" as const,
    BOOLEAN: "Boolean" as const,
  },
} as const;

/**
 * Configuration for deprecated CDS configuration detection
 */
export interface DeprecatedConfigPattern {
  /** The key to look for (e.g., "draft_compat", "odata_new_adapter") */
  key: string;
  /** The nested path in cds configuration (e.g., "fiori", "features") */
  parentPath: string;
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
  if (deprecatedValue === undefined) {
    return true; // Any value is deprecated
  }

  const value = node.value;

  if (typeof deprecatedValue === "boolean") {
    return (
      (value.type === CONFIG_PATTERNS.JSON_LANGUAGE_TYPES.BOOLEAN &&
        value.value === deprecatedValue) ||
      (value.type === CONFIG_PATTERNS.JSON_LANGUAGE_TYPES.STRING &&
        value.value === deprecatedValue.toString())
    );
  }

  if (typeof deprecatedValue === "string") {
    return (
      value.type === CONFIG_PATTERNS.JSON_LANGUAGE_TYPES.STRING &&
      value.value === deprecatedValue
    );
  }

  return false;
}

/**
 * Creates and caches compiled regex patterns for better performance
 */
function createPatterns(parentPath: string, key: string) {
  return {
    cdsPattern: new RegExp(
      `"cds"\\s*:\\s*\\{.*?"${parentPath}"\\s*:\\s*\\{.*?"${key}"`,
      "s",
    ),
    implicitPattern: new RegExp(`"${parentPath}"\\s*:\\s*\\{.*?"${key}"`, "s"),
  };
}

/**
 * Checks if a deprecated CDS configuration pattern is present in the file
 */
export function checkDeprecatedCdsPattern(
  context: { filename?: string; sourceCode: { getText(): string } },
  node: MemberNode,
  pattern: DeprecatedConfigPattern,
): boolean {
  // Input validation
  if (
    !context?.sourceCode ||
    !node?.name ||
    !pattern?.key ||
    !pattern?.parentPath
  ) {
    return false;
  }

  const filename = context.filename || "";
  const key =
    node.name.type === CONFIG_PATTERNS.JSON_LANGUAGE_TYPES.STRING
      ? node.name.value
      : node.name.name;

  if (key !== pattern.key) {
    return false;
  }

  // Check if the value matches the deprecated value (if specified)
  if (pattern.checkValue && !isDeprecatedValue(node, pattern.deprecatedValue)) {
    return false;
  }

  const sourceCode = context.sourceCode;
  const fullText = sourceCode.getText();

  // Create patterns for this specific configuration
  const patterns = createPatterns(pattern.parentPath, pattern.key);

  // Case 1: Check for cds.{parentPath}.{key} pattern in package.json
  if (patterns.cdsPattern.test(fullText)) {
    return true;
  }

  // Case 2: Check for {parentPath}.{key} in .cdsrc files
  // In .cdsrc files, the cds wrapper is implicit
  const isCdsConfigFile = CONFIG_PATTERNS.CDS_RC_FILENAME_PATTERNS.some(
    (pattern) => filename.includes(pattern),
  );

  if (isCdsConfigFile) {
    if (patterns.implicitPattern.test(fullText)) {
      return true;
    }
  }

  return false;
}
