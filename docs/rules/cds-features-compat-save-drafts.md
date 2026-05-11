# cds-features-compat-save-drafts

Disallow deprecated `cds.features.compat_save_drafts` configuration.

## Rule Details

This rule flags the deprecated key `cds.features.compat_save_drafts` in JSON files. SAVE handlers for drafts are now triggered when a draft is activated, making this compatibility flag unnecessary.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "compat_save_drafts": true
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "compat_save_drafts": false
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

If you need to maintain legacy configurations that require `cds.features.compat_save_drafts`, you can disable this rule. However, this flag is deprecated and should be removed.

## Implementation

The rule detects:

- `"cds.features.compat_save_drafts"` patterns in regular JSON files
- `"features.compat_save_drafts"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.
