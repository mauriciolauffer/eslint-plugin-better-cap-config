# cds-fiori-calc-elements

Disallow deprecated `cds.fiori.calc_elements` configuration.

## Rule Details

This rule flags the deprecated key `cds.fiori.calc_elements` in JSON files. Calculated elements are now properly computed in draft state by default as of 2026, making this opt-out flag unnecessary.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "fiori": {
      "calc_elements": false
    }
  }
}
```

```json
{
  "cds": {
    "fiori": {
      "calc_elements": true
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "fiori": {
    "calc_elements": false
  }
}
```

### ✅ Correct

```json
{
  "cds": {
    "fiori": {
      "preview": true
    }
  }
}
```

## When Not To Use It

If you need to maintain compatibility with older SAP CAP versions that still require this key (before cds^10), you can disable this rule.

## Implementation

The rule detects:

- `"cds.fiori.calc_elements"` patterns in regular JSON files
- `"fiori.calc_elements"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Changelog 2026](https://cap.cloud.sap/docs/releases/2026/changelog)
- [CAP Release Notes April 2026](https://cap.cloud.sap/docs/releases/2026/apr26)
