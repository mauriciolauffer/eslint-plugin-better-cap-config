# cds-requires-db-database

Disallow deprecated `cds.requires.db.database` configuration.

## Rule Details

This rule flags the deprecated key `cds.requires.db.database` in JSON files. The rule helps developers avoid using deprecated configurations and keep their code compliant with current SAP CAP standards. This configuration key was deprecated in the CDS JSON schema.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "requires": {
      "db": {
        "database": "mydb"
      }
    }
  }
}
```

```json
{
  "cds": {
    "requires": {
      "db": {
        "kind": "hana",
        "database": "mydb"
      }
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "requires": {
    "db": {
      "database": "mydb"
    }
  }
}
```

### ✅ Correct

```json
{
  "cds": {
    "requires": {
      "db": {
        "kind": "hana"
      }
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

If you need to maintain legacy configurations that specifically require `cds.requires.db.database`, you can disable this rule. However, this is not recommended as the configuration is deprecated.

## Implementation

The rule detects:

- `cds.requires.db.database` patterns in regular JSON files
- `requires.db.database` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Triggers for any value of the key

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.
