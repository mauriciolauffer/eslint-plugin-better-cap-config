# cds-features-compile-for-flows

Disallow deprecated `cds.features.compile_for_flows` configuration.

## Rule Details

This rule flags the deprecated key `cds.features.compile_for_flows` in JSON files. This key has been renamed to `cds.features.annotate_for_flows`.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "compile_for_flows": true
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "compile_for_flows": false
  }
}
```

### ✅ Correct

```json
{
  "cds": {
    "features": {
      "annotate_for_flows": true
    }
  }
}
```

## When Not To Use It

If you need to support an older version of `@sap/cds` that does not yet recognize `annotate_for_flows`, you can disable this rule.

## Implementation

The rule detects:

- `"cds.features.compile_for_flows"` patterns in regular JSON files
- `"features.compile_for_flows"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Changelog 2025](https://cap.cloud.sap/docs/releases/2025/changelog)
