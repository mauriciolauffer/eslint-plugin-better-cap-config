# cds-features-consistent-params

Disallow deprecated `cds.features.consistent_params: false` configuration.

## Rule Details

This rule flags the deprecated key-value pair `"cds.features.consistent_params": false` in JSON files. The rule helps developers avoid using deprecated configurations and keep their code compliant with current SAP CAP standards. `req.params` is now always an array of objects (instead of plain values for single-keyed entities with key `ID`) since `@sap/cds^9`. Setting this flag to `false` opts out of the new default behavior and is deprecated.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "consistent_params": false
    }
  }
}
```

```json
{
  "cds": {
    "features": {
      "consistent_params": "false"
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "consistent_params": false
  }
}
```

### ✅ Correct

```json
{
  "cds": {
    "features": {
      "consistent_params": true
    }
  }
}
```

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

If you need to maintain legacy configurations that specifically require `cds.features.consistent_params` to be set to `false`, you can disable this rule. However, this is not recommended as the configuration is deprecated.

## Implementation

The rule detects:

- `"cds.features.consistent_params": false` patterns in regular JSON files
- `"features.consistent_params": false` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Both boolean `false` and string `"false"` values
- Only triggers when the value is explicitly `false`

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Release Notes April 2026](https://cap.cloud.sap/docs/releases/2026/apr26)
