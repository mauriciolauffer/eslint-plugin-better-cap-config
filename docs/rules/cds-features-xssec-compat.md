# cds-features-xssec-compat

Disallow the use of the deprecated `cds.features.xssec_compat` configuration in JSON files.

## Rule Details

This rule flags any use of `cds.features.xssec_compat`, which is a compatibility flag for `@sap/xssec` v3. Support for `@sap/xssec@3` and this compatibility flag will be dropped in the next major CDS version. Teams should upgrade to `@sap/xssec@4` and remove this flag.

## Examples

❌ Examples of **incorrect** code for this rule:

```json
// package.json
{
  "cds": {
    "features": {
      "xssec_compat": true
    }
  }
}
```

```json
// .cdsrc.json
{
  "features": {
    "xssec_compat": true
  }
}
```

✅ Examples of **correct** code for this rule:

```json
// package.json — flag removed after upgrading to @sap/xssec@4
{
  "name": "my-app",
  "cds": {
    "features": {}
  }
}
```

## When Not To Use It

If you have not yet upgraded `@sap/xssec` to version 4 and need the compatibility flag temporarily, you may disable this rule. Upgrade as soon as possible before the CDS 9 release.

## Further Reading

- [CAP Release Notes January 2025](https://cap.cloud.sap/docs/releases/2025/jan25)
- [CAP Release Notes April 2025](https://cap.cloud.sap/docs/releases/2025/apr25)
