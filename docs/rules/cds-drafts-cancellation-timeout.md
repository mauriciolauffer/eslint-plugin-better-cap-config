# cds-drafts-cancellation-timeout

Disallow deprecated `cds.drafts.cancellationTimeout` configuration.

## Rule Details

This rule flags the deprecated key `cds.drafts.cancellationTimeout` in JSON files. The rule helps developers avoid using deprecated configurations and keep their code compliant with current SAP CAP standards. This configuration has been replaced by `cds.fiori.draft_lock_timeout`.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "drafts": {
      "cancellationTimeout": 15
    }
  }
}
```

```json
{
  "cds": {
    "drafts": {
      "cancellationTimeout": 30000
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "drafts": {
    "cancellationTimeout": 15
  }
}
```

### ✅ Correct

```json
{
  "cds": {
    "fiori": {
      "draft_lock_timeout": 15
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

If you need to maintain legacy configurations that specifically require `cds.drafts.cancellationTimeout`, you can disable this rule. However, this is not recommended as the configuration is deprecated. Use `cds.fiori.draft_lock_timeout` instead.

## Implementation

The rule detects:

- `cds.drafts.cancellationTimeout` patterns in regular JSON files
- `drafts.cancellationTimeout` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Triggers for any value of the key

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.
