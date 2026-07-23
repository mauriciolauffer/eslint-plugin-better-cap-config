# cds-features-legacy-srv-results

Disallow deprecated `cds.features.legacy_srv_results: true` configuration.

## Rule Details

This rule flags `cds.features.legacy_srv_results` set to `true`. Starting with `@sap/cds@10`, `CREATE`, `UPDATE`, `UPSERT`, and `DELETE` handlers return arrays with an `.affected` property instead of returning `req.data`. Setting this flag to `true` opts back into the old return shape, which is deprecated and will be removed in `@sap/cds@11`.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "legacy_srv_results": true
    }
  }
}
```

```json
{
  "cds": {
    "features": {
      "legacy_srv_results": "true"
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "legacy_srv_results": true
  }
}
```

### ✅ Correct

Remove the flag entirely to use the new default behavior:

```json
{
  "cds": {
    "features": {
      "preview": true
    }
  }
}
```

Setting the flag to `false` (the new default) is also acceptable, though the key can simply be removed:

```json
{
  "cds": {
    "features": {
      "legacy_srv_results": false
    }
  }
}
```

## When Not To Use It

If your service handlers still depend on `CREATE`/`UPDATE`/`UPSERT`/`DELETE` returning `req.data` rather than an array with `.affected`, you may disable this rule temporarily while migrating. Plan the migration before `@sap/cds@11`.

## Implementation

The rule detects:

- `"cds.features.legacy_srv_results": true` patterns in regular JSON files
- `"features.legacy_srv_results": true` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Both boolean `true` and string `"true"` values
- Only triggers when the value is explicitly `true`

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Release Notes June 2026](https://cap.cloud.sap/docs/releases/2026/jun26)
- [CAP Changelog 2026](https://cap.cloud.sap/docs/releases/2026/changelog)
