# ESLint Plugin CDS Deprecated Config

[![npm version](https://badge.fury.io/js/eslint-plugin-better-cap-config.svg)](https://badge.fury.io/js/eslint-plugin-better-cap-config)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

An ESLint plugin for detecting deprecated SAP CAP CDS (Cloud Application Programming) configuration patterns in JSON files.

## Features

- Detects deprecated SAP CAP configuration patterns
- Works with `package.json`, `.cdsrc.json`, and other CDS configuration files
- Modern ESLint v9+ support with flat config

## Installation

```bash
npm install --save-dev eslint eslint-plugin-better-cap-config
```

## Rules

### `cds-fiori-draft-compat`

Disallows the deprecated `cds.fiori.draft_compat` configuration.

**❌ Incorrect:**

```json
{
  "cds": {
    "fiori": {
      "draft_compat": true
    }
  }
}
```

**✅ Correct:**

```json
{
  "cds": {
    "fiori": {
      "preview": true
    }
  }
}
```

### `cds-features-odata-new-adapter`

Disallows setting `cds.features.odata_new_adapter` to `false` (deprecated behavior).

**❌ Incorrect:**

```json
{
  "cds": {
    "features": {
      "odata_new_adapter": false
    }
  }
}
```

**✅ Correct:**

```json
{
  "cds": {
    "features": {
      "odata_new_adapter": true
    }
  }
}
```

### `cds-features-cds-validate`

Disallows setting `cds.features.cds_validate` to `false` (deprecated behavior).

**❌ Incorrect:**

```json
{
  "cds": {
    "features": {
      "cds_validate": false
    }
  }
}
```

**✅ Correct:**

```json
{
  "cds": {
    "features": {
      "cds_validate": true
    }
  }
}
```

## Configuration

Add the plugin to your ESLint configuration:

### ESLint v9+ (Flat Config)

```javascript
import cdsDeprecatedConfig from "eslint-plugin-better-cap-config";

export default [
  {
    files: ["**/*.json"],
    plugins: {
      "cds-deprecated-config": cdsDeprecatedConfig,
    },
    language: "cds-deprecated-config/json",
    rules: {
      "cds-deprecated-config/cds-fiori-draft-compat": "error",
      "cds-deprecated-config/cds-features-odata-new-adapter": "error",
      "cds-deprecated-config/cds-features-cds-validate": "error",
    },
  },
];
```

### Using the Recommended Configuration

```javascript
import cdsDeprecatedConfig from "eslint-plugin-better-cap-config";

export default [
  {
    files: ["**/*.json"],
    ...cdsDeprecatedConfig.configs.recommended,
  },
];
```

## Prerequisites

This plugin requires:

- ESLint v9.0.0 or higher
- Node.js v18.0.0 or higher
- `@eslint/json` for JSON language support

Install the required dependencies:

```bash
npm install --save-dev eslint @eslint/json
```

## Supported Files

The plugin works with:

- `package.json` files
- `.cdsrc.json` files
- Any JSON files containing CDS configuration
- JSON files in `cap-cds/` directories

## Development

### Building

```bash
pnpm build
```

### Testing

```bash
pnpm test
pnpm test:watch
pnpm test:coverage
```

### Linting

```bash
pnpm lint
pnpm lint:fix
```

## License

MIT License
