# cds-fiori-lean-draft

Disallow the use of the deprecated `cds.fiori.lean_draft: false` configuration in JSON files.

## Rule Details

This rule flags `cds.fiori.lean_draft` set to `false`, which activates the old draft implementation. Lean draft is now the sole draft implementation and the old implementation was removed in CDS 8. This configuration key has no effect and should be removed.

## Examples

❌ Examples of **incorrect** code for this rule:

```json
// package.json
{
  "cds": {
    "fiori": {
      "lean_draft": false
    }
  }
}
```

```json
// .cdsrc.json
{
  "fiori": {
    "lean_draft": false
  }
}
```

✅ Examples of **correct** code for this rule:

```json
// package.json — key removed
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
// package.json — lean_draft is true (or simply absent)
{
  "cds": {
    "fiori": {
      "lean_draft": true
    }
  }
}
```

## When Not To Use It

This configuration has no effect in CDS 8 and later. There is no valid reason to keep `cds.fiori.lean_draft: false`. It is recommended to always enable this rule.

## Further Reading

- [CAP Release Notes June 2024](https://cap.cloud.sap/docs/releases/2024/jun24)
