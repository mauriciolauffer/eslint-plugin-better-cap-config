# cds-fiori-direct-crud

Disallow deprecated `cds.fiori.direct_crud` configuration.

## Rule Details

This rule flags the deprecated key `cds.fiori.direct_crud` in JSON files. In `@sap/cds@10` this single flag was split into two separate, more granular flags: `cds.fiori.bypass_draft` (replaces `direct_crud: true` for bypassing draft) and `cds.fiori.draft_new_action` (controls the new draft action). Replace `direct_crud` with the appropriate combination of the two new flags.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "fiori": {
      "direct_crud": true
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "fiori": {
    "direct_crud": false
  }
}
```

### ✅ Correct

Use the replacement flags:

```json
{
  "cds": {
    "fiori": {
      "bypass_draft": true,
      "draft_new_action": false
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

There is no valid reason to keep `direct_crud` — it is ignored at runtime in `@sap/cds@10` and above. Disable this rule only to suppress the warning during a short-lived migration.

## Implementation

The rule detects:

- `"cds.fiori.direct_crud"` patterns in regular JSON files
- `"fiori.direct_crud"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Release Notes June 2026](https://cap.cloud.sap/docs/releases/2026/jun26)
- [CAP Changelog 2026](https://cap.cloud.sap/docs/releases/2026/changelog)
