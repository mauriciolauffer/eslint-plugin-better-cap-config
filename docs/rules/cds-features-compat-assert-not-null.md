# cds-features-compat-assert-not-null

Disallow deprecated `cds.features.compat_assert_not_null` configuration.

## Rule Details

This rule flags the deprecated key `cds.features.compat_assert_not_null` in JSON files. The validation error key has been renamed to `ASSERT_MANDATORY`, making this compatibility flag unnecessary.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "compat_assert_not_null": true
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "compat_assert_not_null": false
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

If you need to maintain legacy behavior during migration to the new `ASSERT_MANDATORY` error key, you can disable this rule temporarily.

## Implementation

The rule detects:

- `"cds.features.compat_assert_not_null"` patterns in regular JSON files
- `"features.compat_assert_not_null"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.
