# cds-features-compat-texts-entities

Disallow deprecated `cds.features.compat_texts_entities` configuration.

## Rule Details

This rule flags the deprecated key `cds.features.compat_texts_entities` in JSON files. The rule helps developers avoid using deprecated configurations and keep their code compliant with current SAP CAP standards. This compat flag was introduced as a temporary opt-out and will be removed with `cds^10`. Developers should use the `.texts` property of the respective entity directly (e.g., `CatalogService.Books.texts` instead of `CatalogService['Books.texts']`).

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "compat_texts_entities": true
    }
  }
}
```

```json
{
  "cds": {
    "features": {
      "compat_texts_entities": false
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "compat_texts_entities": true
  }
}
```

### ✅ Correct

```json
{
  "cds": {
    "requires": {
      "db": "sqlite"
    }
  }
}
```

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

If you need to maintain legacy configurations that specifically require `cds.features.compat_texts_entities`, you can disable this rule. However, this is not recommended as the configuration is deprecated.

## Implementation

The rule detects:

- `cds.features.compat_texts_entities` patterns in regular JSON files
- `features.compat_texts_entities` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Triggers for any value of the key

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.
