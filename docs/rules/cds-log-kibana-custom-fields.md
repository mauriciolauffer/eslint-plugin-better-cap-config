# cds-log-kibana-custom-fields

Disallow deprecated `cds.log.kibana_custom_fields` configuration.

## Rule Details

This rule flags the deprecated key `cds.log.kibana_custom_fields` in JSON files. This key was renamed to `cds.log.als_custom_fields` (Application Logging Service) in 2023.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "log": {
      "kibana_custom_fields": ["correlationId", "tenantId"]
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "log": {
    "kibana_custom_fields": ["correlationId"]
  }
}
```

### ✅ Correct

```json
{
  "cds": {
    "log": {
      "als_custom_fields": ["correlationId", "tenantId"]
    }
  }
}
```

## When Not To Use It

If you are on a version of `@sap/cds` that still uses the Kibana formatter and does not support `als_custom_fields`, you can disable this rule.

## Implementation

The rule detects:

- `"cds.log.kibana_custom_fields"` patterns in regular JSON files
- `"log.kibana_custom_fields"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.
