# cds-mcp-auto-config

Disallow deprecated `cds.mcp.autoConfig` configuration.

## Rule Details

This rule flags the deprecated key `cds.mcp.autoConfig` in JSON files. This key was renamed to `cds.mcp.autoWired` in `@sap/cds@10`. Replace any usage of `autoConfig` with `autoWired`.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "mcp": {
      "autoConfig": true
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "mcp": {
    "autoConfig": false
  }
}
```

### ✅ Correct

Use the renamed key `autoWired`:

```json
{
  "cds": {
    "mcp": {
      "autoWired": true
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "mcp": {
    "autoWired": true
  }
}
```

## When Not To Use It

There is no valid reason to keep `autoConfig` — it is silently ignored at runtime in `@sap/cds@10` and above. Disable this rule only to suppress the warning during a short-lived migration.

## Implementation

The rule detects:

- `"cds.mcp.autoConfig"` patterns in regular JSON files
- `"mcp.autoConfig"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Release Notes June 2026](https://cap.cloud.sap/docs/releases/2026/jun26)
- [CAP Changelog 2026](https://cap.cloud.sap/docs/releases/2026/changelog)
