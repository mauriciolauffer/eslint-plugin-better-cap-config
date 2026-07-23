# cds-i18n-fatjson

Disallow deprecated `cds.i18n.fatjson` configuration.

## Rule Details

This rule flags the deprecated key `cds.i18n.fatjson` in JSON files. The default for this option was changed to `false` in `@sap/cds@10` and the option will be removed in a future version. Remove this key to rely on the new default.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "i18n": {
      "fatjson": true
    }
  }
}
```

```json
{
  "cds": {
    "i18n": {
      "fatjson": false
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "i18n": {
    "fatjson": true
  }
}
```

### ✅ Correct

Remove the flag and rely on the default (`false`):

```json
{
  "cds": {
    "i18n": {
      "languages": "de,en"
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

If your application explicitly depends on the `fatjson` i18n format, you may disable this rule temporarily. Plan the migration before the option is removed in a future `@sap/cds` release.

## Implementation

The rule detects:

- `"cds.i18n.fatjson"` patterns in regular JSON files
- `"i18n.fatjson"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Release Notes June 2026](https://cap.cloud.sap/docs/releases/2026/jun26)
- [CAP Changelog 2026](https://cap.cloud.sap/docs/releases/2026/changelog)
