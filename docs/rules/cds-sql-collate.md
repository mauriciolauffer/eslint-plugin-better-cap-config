# cds-sql-collate

Disallow deprecated `cds.sql.collate` configuration.

## Rule Details

This rule flags the deprecated key `cds.sql.collate` in JSON files. This configuration option was removed in `@sap/cds@10`. Collation now always applies to all string elements automatically and can no longer be configured via this key. Remove it from your configuration.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "sql": {
      "collate": "NOCASE"
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "sql": {
    "collate": "NOCASE"
  }
}
```

### ✅ Correct

Remove the key entirely — collation is handled automatically:

```json
{
  "cds": {
    "sql": {
      "dialect": "sqlite"
    }
  }
}
```

Configuration without the deprecated key:

```json
{
  "cds": {
    "requires": {
      "db": "sqlite"
    }
  }
}
```

## When Not To Use It

This key was hard-removed in `@sap/cds@10` and is silently ignored at runtime. There is no valid reason to keep it. Disable this rule only to suppress the warning during a short-lived migration.

## Implementation

The rule detects:

- `"cds.sql.collate"` patterns in regular JSON files
- `"sql.collate"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Release Notes June 2026](https://cap.cloud.sap/docs/releases/2026/jun26)
- [CAP Changelog 2026](https://cap.cloud.sap/docs/releases/2026/changelog)
