# cds-features-compat-clone-appends

Disallow deprecated `cds.features.compat_clone_appends` configuration.

## Rule Details

This rule flags the deprecated key `cds.features.compat_clone_appends` in JSON files. This flag reverts query clause appending behaviour to a previous style and is deprecated. It will be removed in a future version of `@sap/cds`.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "compat_clone_appends": true
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "compat_clone_appends": false
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

If you still rely on the legacy query clause appending behaviour, you may disable this rule temporarily. Remove the flag once your application is updated to work with the current default.

## Implementation

The rule detects:

- `"cds.features.compat_clone_appends"` patterns in regular JSON files
- `"features.compat_clone_appends"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Release Notes June 2026](https://cap.cloud.sap/docs/releases/2026/jun26)
- [CAP Changelog 2026](https://cap.cloud.sap/docs/releases/2026/changelog)
