# no-deprecated-cds-features-odata-new-adapter

Disallow deprecated `cds.features.odata_new_adapter` configuration.

## Rule Details

This rule flags the deprecated key-value pair `"cds.features.odata_new_adapter": false` in JSON files. The rule helps developers avoid using deprecated configurations and keep their code compliant with current SAP CAP standards.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "odata_new_adapter": false
    }
  }
}
```

```json
{
  "cds": {
    "features": {
      "odata_new_adapter": "false"
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "odata_new_adapter": false
  }
}
```

### ✅ Correct

```json
{
  "cds": {
    "features": {
      "odata_new_adapter": true
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

If you need to maintain legacy configurations that specifically require `cds.features.odata_new_adapter` to be set to `false`, you can disable this rule. However, this is not recommended as the configuration is deprecated.

## Implementation

The rule detects:

- `"cds.features.odata_new_adapter": false` patterns in regular JSON files
- `"features.odata_new_adapter": false` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Both boolean `false` and string `"false"` values
- Only triggers when the value is explicitly `false`

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.
