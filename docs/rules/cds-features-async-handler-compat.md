# cds-features-async-handler-compat

Disallow deprecated `cds.features.async_handler_compat` configuration.

## Rule Details

This rule flags the deprecated key `cds.features.async_handler_compat` in JSON files. The rule helps developers avoid using deprecated configurations and keep their code compliant with current SAP CAP standards. This compat flag was introduced in CAP 9.5.0 as a temporary opt-out for the new behavior where `before` and `after` handlers run in parallel. It will be removed in `@sap/cds@10`.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "async_handler_compat": true
    }
  }
}
```

```json
{
  "cds": {
    "features": {
      "async_handler_compat": false
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "async_handler_compat": true
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

If you need to maintain legacy configurations that specifically require `cds.features.async_handler_compat`, you can disable this rule. However, this is not recommended as the configuration is deprecated.

## Implementation

The rule detects:

- `cds.features.async_handler_compat` patterns in regular JSON files
- `features.async_handler_compat` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Triggers for any value of the key

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.
