# cds-requires-middlewares

Disallow the use of the deprecated `cds.requires.middlewares: false` configuration in JSON files.

## Rule Details

This rule flags `cds.requires.middlewares` set to `false`, which opts out of the current middleware system. The old middleware system has been replaced and this configuration should be removed.

## Examples

❌ Examples of **incorrect** code for this rule:

```json
// package.json
{
  "cds": {
    "requires": {
      "middlewares": false
    }
  }
}
```

```json
// .cdsrc.json
{
  "requires": {
    "middlewares": false
  }
}
```

✅ Examples of **correct** code for this rule:

```json
// package.json — key removed
{
  "name": "my-app",
  "cds": {
    "requires": {
      "db": "sqlite"
    }
  }
}
```

```json
// package.json — middlewares enabled
{
  "cds": {
    "requires": {
      "middlewares": true
    }
  }
}
```

## When Not To Use It

If you need to temporarily disable the new middleware system during migration, you may disable this rule. Migrate to the new middleware patterns as soon as possible.

## Further Reading

- [CAP Release Notes June 2024](https://cap.cloud.sap/docs/releases/2024/jun24)
