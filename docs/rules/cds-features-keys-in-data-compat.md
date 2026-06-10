# cds-features-keys-in-data-compat

Disallow deprecated `cds.features.keys_in_data_compat` configuration.

## Rule Details

This rule flags the deprecated key `cds.features.keys_in_data_compat` in JSON files. This key is incompatible with the new OData adapter introduced in `@sap/cds` v8.3.0 and should be removed.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "keys_in_data_compat": true
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "keys_in_data_compat": false
  }
}
```

### ✅ Correct

```json
{
  "cds": {
    "features": {
      "preview": true
    }
  }
}
```

## When Not To Use It

If you need to support legacy behavior with an older OData adapter, you can disable this rule. Note that using this configuration with the new OData adapter is not supported.

## Implementation

The rule detects:

- `"cds.features.keys_in_data_compat"` patterns in regular JSON files
- `"features.keys_in_data_compat"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Changelog 2024](https://cap.cloud.sap/docs/releases/2024/changelog)
