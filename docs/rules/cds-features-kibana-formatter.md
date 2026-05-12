# cds-features-kibana-formatter

Disallow deprecated `cds.features.kibana_formatter` configuration.

## Rule Details

This rule flags the deprecated key `cds.features.kibana_formatter` in JSON files. This key is no longer added by `cds add application-logging` and should be removed from configurations.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "kibana_formatter": true
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "kibana_formatter": false
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

If you need to support an older version of `@sap/cds` that still uses the Kibana formatter, you can disable this rule.

## Implementation

The rule detects:

- `"cds.features.kibana_formatter"` patterns in regular JSON files
- `"features.kibana_formatter"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.
