# cds-features-new-draft-via-action

Disallow deprecated `cds.features.new_draft_via_action` configuration.

## Rule Details

This rule flags the deprecated key `cds.features.new_draft_via_action` in JSON files. The rule helps developers avoid using deprecated configurations and keep their code compliant with current SAP CAP standards. This feature flag was replaced by `cds.fiori.direct_crud` in CAP version 9.6.0.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "features": {
      "new_draft_via_action": true
    }
  }
}
```

```json
{
  "cds": {
    "features": {
      "new_draft_via_action": false
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "features": {
    "new_draft_via_action": true
  }
}
```

### ✅ Correct

```json
{
  "cds": {
    "fiori": {
      "direct_crud": true
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

If you need to maintain legacy configurations that specifically require `cds.features.new_draft_via_action`, you can disable this rule. However, this is not recommended as the configuration is deprecated. Use `cds.fiori.direct_crud` instead.

## Implementation

The rule detects:

- `cds.features.new_draft_via_action` patterns in regular JSON files
- `features.new_draft_via_action` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Triggers for any value of the key

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.
