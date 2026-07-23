# cds-features-bulk-inserts-via-rest

Disallow deprecated `cds.features.bulk_inserts_via_rest: false` configuration.

## Rule Details

This rule flags `cds.features.bulk_inserts_via_rest` set to `false`. Since `@sap/cds@10`, bulk REST `POST` requests are dispatched as a single `INSERT` by default. Setting this flag to `false` opts out of that optimisation, which is deprecated and will be removed in `@sap/cds@11`.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "bulk_inserts_via_rest": false
    }
  }
}
```

```json
{
  "cds": {
    "features": {
      "bulk_inserts_via_rest": "false"
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "bulk_inserts_via_rest": false
  }
}
```

### ✅ Correct

Remove the flag to use the default single-INSERT dispatch:

```json
{
  "cds": {
    "features": {
      "preview": true
    }
  }
}
```

Setting the flag to `true` (the new default) is also acceptable, though the key can simply be removed:

```json
{
  "cds": {
    "features": {
      "bulk_inserts_via_rest": true
    }
  }
}
```

## When Not To Use It

If your application relies on bulk REST `POST` being dispatched as individual `INSERT` calls (e.g. for custom per-item event handlers), you may disable this rule temporarily while migrating. Plan the migration before `@sap/cds@11`.

## Implementation

The rule detects:

- `"cds.features.bulk_inserts_via_rest": false` patterns in regular JSON files
- `"features.bulk_inserts_via_rest": false` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Both boolean `false` and string `"false"` values
- Only triggers when the value is explicitly `false`

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Release Notes June 2026](https://cap.cloud.sap/docs/releases/2026/jun26)
- [CAP Changelog 2026](https://cap.cloud.sap/docs/releases/2026/changelog)
