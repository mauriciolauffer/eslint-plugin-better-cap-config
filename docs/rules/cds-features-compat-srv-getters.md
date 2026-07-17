# cds-features-compat-srv-getters

Disallow deprecated `cds.features.compat_srv_getters` configuration.

## Rule Details

This rule flags the deprecated key `cds.features.compat_srv_getters` in JSON files. This flag re-enables the legacy function-call API for `srv.entities`, `srv.events`, `srv.types`, and `srv.actions`. The function-call style has been replaced by property access and will be removed in `@sap/cds@11`.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "compat_srv_getters": true
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "compat_srv_getters": false
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

If your code still calls `srv.entities()`, `srv.events()`, `srv.types()`, or `srv.actions()` as functions, you may disable this rule temporarily while migrating to property access. Complete the migration before `@sap/cds@11`.

## Implementation

The rule detects:

- `"cds.features.compat_srv_getters"` patterns in regular JSON files
- `"features.compat_srv_getters"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Release Notes June 2026](https://cap.cloud.sap/docs/releases/2026/jun26)
- [CAP Changelog 2026](https://cap.cloud.sap/docs/releases/2026/changelog)
