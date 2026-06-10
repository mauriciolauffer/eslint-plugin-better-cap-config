# cds-cdsc-newparser

Disallow the use of the deprecated `cds.cdsc.newparser: false` configuration in JSON files.

## Rule Details

This rule flags `cds.cdsc.newparser` set to `false`, which forces the old CDS parser. The new parser became the default as of May 2025 and the old parser will be removed in CDS 9. Teams should stop pinning the old parser.

## Examples

❌ Examples of **incorrect** code for this rule:

```json
// package.json
{
  "cds": {
    "cdsc": {
      "newparser": false
    }
  }
}
```

```json
// .cdsrc.json
{
  "cdsc": {
    "newparser": false
  }
}
```

✅ Examples of **correct** code for this rule:

```json
// package.json — new parser enabled explicitly
{
  "cds": {
    "cdsc": {
      "newparser": true
    }
  }
}
```

```json
// package.json — flag removed entirely (new parser is the default)
{
  "name": "my-app",
  "version": "1.0.0"
}
```

## When Not To Use It

If you are still in the process of migrating to the new CDS parser and need to maintain the old parser temporarily, you may disable this rule. However, migration should be completed before the CDS 9 release.

## Further Reading

- [CAP Release Notes January 2025](https://cap.cloud.sap/docs/releases/2025/jan25)
- [CAP Changelog 2025](https://cap.cloud.sap/docs/releases/2025/changelog)
