# ESLint Plugin CDS Deprecated Config

An ESLint plugin for validating JSON files with custom rules.

## Rules

### `no-empty-keys`

Disallows empty keys in JSON objects.

## Configuration

Add the plugin to your ESLint configuration:

```javascript
import cdsDeprecatedConfig from "eslint-plugin-cds-deprecated-config";

export default [
  {
    files: ["**/*.json"],
    plugins: { cdsDeprecatedConfig },
    language: "json/json",
    rules: {
      "cdsDeprecatedConfig/no-deprecated-cds-fiori-draft-compat": "warn",
      "cdsDeprecatedConfig/no-deprecated-cds-features-odata-new-adapter":
        "warn",
      "cdsDeprecatedConfig/no-deprecated-cds-features-cds-validate": "warn",
    },
  },
];
```

## Installation

```bash
npm install eslint-plugin-cds-deprecated-config
```

## Usage

The plugin works with ESLint's JSON language support. Make sure you have `@eslint/json` installed:

```bash
npm install @eslint/json
```
