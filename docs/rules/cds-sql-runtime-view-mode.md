# cds-sql-runtime-view-mode

Disallow deprecated `cds.sql.runtimeView.mode: "resolve"` configuration.

## Rule Details

This rule flags the deprecated value `"resolve"` for `cds.sql.runtimeView.mode` in JSON files. The `resolve` mode was deprecated in 2025 as the CTE mode is now the default.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "sql": {
      "runtimeView": {
        "mode": "resolve"
      }
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "sql": {
    "runtimeView": {
      "mode": "resolve"
    }
  }
}
```

### ✅ Correct

```json
{
  "cds": {
    "sql": {
      "runtimeView": {
        "mode": "cte"
      }
    }
  }
}
```

Configuration without `runtimeView.mode` (uses the default CTE mode):

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

If you need the `resolve` mode for compatibility with older SAP CAP versions, you can disable this rule.

## Implementation

The rule detects:

- `"cds.sql.runtimeView.mode": "resolve"` patterns in regular JSON files
- `"sql.runtimeView.mode": "resolve"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Only triggers when the value is exactly `"resolve"`

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Changelog 2025](https://cap.cloud.sap/docs/releases/2025/changelog)
