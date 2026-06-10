# cds-features-service-level-restrictions

Disallow deprecated `cds.features.service_level_restrictions: false` configuration.

## Rule Details

This rule flags the deprecated key-value pair `"cds.features.service_level_restrictions": false` in JSON files. The rule helps developers avoid using deprecated configurations and keep their code compliant with current SAP CAP standards. Service level restrictions for application service calls are enforced by default since `@sap/cds^9`. Setting this flag to `false` opts out of the new default behavior and is deprecated.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "service_level_restrictions": false
    }
  }
}
```

```json
{
  "cds": {
    "features": {
      "service_level_restrictions": "false"
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "service_level_restrictions": false
  }
}
```

### ✅ Correct

```json
{
  "cds": {
    "features": {
      "service_level_restrictions": true
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

If you need to maintain legacy configurations that specifically require `cds.features.service_level_restrictions` to be set to `false`, you can disable this rule. However, this is not recommended as the configuration is deprecated.

## Implementation

The rule detects:

- `"cds.features.service_level_restrictions": false` patterns in regular JSON files
- `"features.service_level_restrictions": false` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Both boolean `false` and string `"false"` values
- Only triggers when the value is explicitly `false`

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Release Notes April 2026](https://cap.cloud.sap/docs/releases/2026/apr26)
