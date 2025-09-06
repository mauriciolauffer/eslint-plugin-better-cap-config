# cds-fiori-draft-compat

Disallow the use of the deprecated `cds.fiori.draft_compat` configuration key in JSON files.

## Rule Details

This rule flags the presence of the deprecated `cds.fiori.draft_compat` key in JSON files. This configuration option has been deprecated and should be removed or updated according to current standards.

## Examples

❌ Examples of **incorrect** code for this rule:

```json
// package.json
{
  "name": "my-app",
  "cds": {
    "fiori": {
      "draft_compat": true
    }
  }
}
```

```json
// .cdsrc.json
{
  "fiori": {
    "draft_compat": false
  }
}
```

```json
// Any JSON file with the deprecated key
{
  "cds": {
    "fiori": {
      "draft_compat": "false",
      "preview": true
    }
  }
}
```

✅ Examples of **correct** code for this rule:

```json
// package.json without deprecated key
{
  "name": "my-app",
  "cds": {
    "fiori": {
      "preview": true
    }
  }
}
```

```json
// .cdsrc.json without deprecated key
{
  "fiori": {
    "preview": false
  }
}
```

```json
// JSON without cds configuration
{
  "name": "my-app",
  "version": "1.0.0"
}
```

## When Not To Use It

If you need to temporarily maintain compatibility with older systems that still require the `cds.fiori.draft_compat` configuration, you may want to disable this rule. However, it's recommended to migrate away from deprecated configurations as soon as possible.

## Version

This rule was introduced in version 1.0.0.

## Further Reading

- [SAP CAP Documentation](https://cap.cloud.sap/)
- [Migration Guide](https://cap.cloud.sap/docs/releases/)
