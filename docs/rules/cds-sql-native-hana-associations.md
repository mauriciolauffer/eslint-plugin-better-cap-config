# cds-sql-native-hana-associations

Disallow the use of the deprecated `cds.sql.native_hana_associations: true` configuration in JSON files.

## Rule Details

This rule flags `cds.sql.native_hana_associations` set to `true`, which generates native HANA associations in DDL. This option is deprecated because native HANA associations are no longer required by CAP and setting this to `true` increases deployment times. It will be removed in CDS 9.

## Examples

❌ Examples of **incorrect** code for this rule:

```json
// package.json
{
  "cds": {
    "sql": {
      "native_hana_associations": true
    }
  }
}
```

```json
// .cdsrc.json
{
  "sql": {
    "native_hana_associations": true
  }
}
```

✅ Examples of **correct** code for this rule:

```json
// package.json — set to false to reduce deployment times
{
  "cds": {
    "sql": {
      "native_hana_associations": false
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

If your project specifically requires native HANA associations and you have not yet migrated away from them, you may disable this rule temporarily. Plan migration before the CDS 9 release.

## Further Reading

- [CAP Release Notes June 2024](https://cap.cloud.sap/docs/releases/2024/jun24)
- [CAP Release Notes August 2024](https://cap.cloud.sap/docs/releases/2024/aug24)
