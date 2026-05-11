# cds-features-serve-on-root

Disallow the use of the deprecated `cds.features.serve_on_root: true` configuration in JSON files.

## Rule Details

This rule flags `cds.features.serve_on_root` set to `true`, which enables the old behaviour of serving services on the root path. This option has been deprecated in favour of using the new path scheme or applying an absolute `@path` annotation.

## Examples

❌ Examples of **incorrect** code for this rule:

```json
// package.json
{
  "cds": {
    "features": {
      "serve_on_root": true
    }
  }
}
```

```json
// .cdsrc.json
{
  "features": {
    "serve_on_root": true
  }
}
```

✅ Examples of **correct** code for this rule:

```json
// package.json — flag removed (use @path annotations instead)
{
  "name": "my-app",
  "cds": {
    "features": {}
  }
}
```

```json
// package.json — flag explicitly disabled
{
  "cds": {
    "features": {
      "serve_on_root": false
    }
  }
}
```

## When Not To Use It

If you need to temporarily maintain the old root-path serving behaviour during migration, you may disable this rule. Migrate to `@path` annotations as soon as possible.

## Further Reading

- [CAP Release Notes June 2024](https://cap.cloud.sap/docs/releases/2024/jun24)
