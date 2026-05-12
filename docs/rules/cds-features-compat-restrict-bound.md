# cds-features-compat-restrict-bound

Disallow deprecated `cds.features.compat_restrict_bound` configuration.

## Rule Details

This rule flags the deprecated key `cds.features.compat_restrict_bound` in JSON files. This compatibility opt-out flag was removed in `@sap/cds` v8.6.0 as the new default behavior supersedes it.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "compat_restrict_bound": true
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "compat_restrict_bound": false
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

If you are still on a version of `@sap/cds` older than v8.6.0 and need this flag, you can disable this rule.

## Implementation

The rule detects:

- `"cds.features.compat_restrict_bound"` patterns in regular JSON files
- `"features.compat_restrict_bound"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.
