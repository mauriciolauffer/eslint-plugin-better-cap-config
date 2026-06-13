# cds-multitenant-client-cert-header

Disallow deprecated `cds.multiTenancy.subscriptionManager.clientCertificateHeader` configuration.

## Rule Details

This rule flags the deprecated key `cds.multiTenancy.subscriptionManager.clientCertificateHeader` in JSON files. This property was renamed in SAP CAP Java v4.0.0 to `cds.security.authentication.clientCertificateHeader`.

## Options

This rule has no options.

## Examples

### ❌ Incorrect

```json
{
  "cds": {
    "multiTenancy": {
      "subscriptionManager": {
        "clientCertificateHeader": "x-certificate"
      }
    }
  }
}
```

In `.cdsrc.json` files:

```json
{
  "multiTenancy": {
    "subscriptionManager": {
      "clientCertificateHeader": "x-certificate"
    }
  }
}
```

### ✅ Correct

```json
{
  "cds": {
    "security": {
      "authentication": {
        "clientCertificateHeader": "x-certificate"
      }
    }
  }
}
```

## When Not To Use It

If you are on a version of SAP CAP Java before v4.0.0 that does not yet support the new property path, you can disable this rule.

## Implementation

The rule detects:

- `"cds.multiTenancy.subscriptionManager.clientCertificateHeader"` patterns in regular JSON files
- `"multiTenancy.subscriptionManager.clientCertificateHeader"` patterns in `.cdsrc.json` and other CDS-specific configuration files
- Flags the key regardless of value

The rule applies to `.json` files including `package.json`, `.cdsrc.json`, and other JSON configuration files.

## Further Reading

- [CAP Changelog 2025](https://cap.cloud.sap/docs/releases/2025/changelog)
