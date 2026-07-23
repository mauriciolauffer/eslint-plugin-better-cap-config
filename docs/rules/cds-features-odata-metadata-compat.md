# cds-features-odata-metadata-compat

Disallow deprecated `cds.features.odata_metadata_compat` configuration.

## Rule Details

This rule flags the deprecated key `cds.features.odata_metadata_compat` in JSON files. This compatibility flag was removed in `@sap/cds@10` and has no replacement — the metadata format is now always the current standard. Any presence of this key should be removed.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "odata_metadata_compat": true
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "odata_metadata_compat": false
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

This key was hard-removed in `@sap/cds@10`. There is no scenario where keeping it is useful — it will be silently ignored at runtime. Disable this rule only if you need to temporarily suppress the warning during a migration.

## Implementation

The rule detects:

- `"cds.features.odata_metadata_compat"` patterns in regular JSON files
- `"features.odata_metadata_compat"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Release Notes June 2026](https://cap.cloud.sap/docs/releases/2026/jun26)
- [CAP Changelog 2026](https://cap.cloud.sap/docs/releases/2026/changelog)
