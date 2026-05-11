# cds-features-base64-binaries

Disallow deprecated `cds.features.base64_binaries` configuration.

## Rule Details

This rule flags the deprecated key `cds.features.base64_binaries` in JSON files. Binary data is now returned as `Buffer`/`Readable` by default in `@sap/cds` v8.5.0+, making this configuration unnecessary.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "base64_binaries": true
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "base64_binaries": false
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

If you require the legacy Base64 binary behavior on an older version of `@sap/cds`, you can disable this rule.

## Implementation

The rule detects:

- `"cds.features.base64_binaries"` patterns in regular JSON files
- `"features.base64_binaries"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.
