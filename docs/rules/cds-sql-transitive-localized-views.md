# cds-sql-transitive-localized-views

Disallow the use of the deprecated `cds.sql.transitive_localized_views: true` configuration in JSON files.

## Rule Details

This rule flags `cds.sql.transitive_localized_views` set to `true`, which re-enables transitive localized view generation. The default is `false`, which eliminates approximately 50% of generated views. Setting this to `true` is deprecated and will be removed in CDS 9.

## Examples

❌ Examples of **incorrect** code for this rule:

```json
// package.json
{
  "cds": {
    "sql": {
      "transitive_localized_views": true
    }
  }
}
```

```json
// .cdsrc.json
{
  "sql": {
    "transitive_localized_views": true
  }
}
```

✅ Examples of **correct** code for this rule:

```json
// package.json — set to false (or remove to use the default)
{
  "cds": {
    "sql": {
      "transitive_localized_views": false
    }
  }
}
```

```json
// package.json — key removed (defaults to false)
{
  "name": "my-app",
  "version": "1.0.0"
}
```

## When Not To Use It

If your project depends on transitive localized view generation and you have not yet migrated, you may disable this rule temporarily. Plan migration before the CDS 9 release.

## Further Reading

- [CAP Release Notes June 2024](https://cap.cloud.sap/docs/releases/2024/jun24)
