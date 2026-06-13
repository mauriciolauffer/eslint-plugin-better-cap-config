# cds-remote-native-fetch

Disallow deprecated `cds.remote.native_fetch` configuration.

## Rule Details

This rule flags the deprecated key `cds.remote.native_fetch` in JSON files. Native fetch is now the default behavior in SAP CAP 2026, making this configuration unnecessary.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "remote": {
      "native_fetch": true
    }
  }
}
```

```json
{
  "cds": {
    "remote": {
      "native_fetch": false
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "remote": {
    "native_fetch": true
  }
}
```

### ✅ Correct

```json
{
  "cds": {
    "remote": {
      "timeout": 5000
    }
  }
}
```

## When Not To Use It

If you need to explicitly control fetch behavior on an older version of `@sap/cds`, you can disable this rule.

## Implementation

The rule detects:

- `"cds.remote.native_fetch"` patterns in regular JSON files
- `"remote.native_fetch"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Changelog 2026](https://cap.cloud.sap/docs/releases/2026/changelog)
- [CAP Release Notes April 2026](https://cap.cloud.sap/docs/releases/2026/apr26)
