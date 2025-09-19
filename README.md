# ESLint Plugin Better CAP Config

[![npm](https://img.shields.io/npm/v/eslint-plugin-better-cap-config)](https://www.npmjs.com/package/eslint-plugin-better-cap-config)
[![test](https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/eslint-plugin-better-cap-config/actions/workflows/test.yml)

An ESLint plugin for improving SAP CAP (Cloud Application Programming Model) configuration patterns in JSON files.

## Features

- Detects deprecated SAP CAP configuration patterns
- Works with `package.json`, `.cdsrc.json`, and other CDS configuration files
- Modern ESLint v9+ support with flat config

## Installation

```bash
npm install --save-dev eslint  @eslint/json  eslint-plugin-better-cap-config
```

## Rules

### `cds-fiori-draft-compat`

Disallows the deprecated `cds.fiori.draft_compat` configuration.

**❌ Incorrect:**

```json
{
  "cds": {
    "fiori": {
      "draft_compat": true,
      "preview": true
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
import json from "@eslint/json";
import capConfig from "eslint-plugin-better-cap-config";

export default [
  {
    files: ["**/*.json"],
    plugins: {
      json,
      "cap-config": capConfig,
    },
    language: "json/json",
    rules: {
      "cap-config/cds-fiori-draft-compat": "error",
      "cap-config/cds-features-odata-new-adapter": "error",
      "cap-config/cds-features-cds-validate": "error",
    },
  },
];
```

### Using the Recommended Configuration

```javascript
import { defineConfig } from "eslint/config";
import json from "@eslint/json";
import capConfig from "eslint-plugin-better-cap-config";

export default defineConfig([
  {
    files: ["**/*.json"],
    plugins: {
      json,
    },
    language: "json/json",
    extends: [capConfig.configs.recommended],
  },
]);
```

## Prerequisites

This plugin requires:

- ESLint v9.0.0 or higher
- Node.js v18.0.0 or higher
- `@eslint/json` for JSON language support

## Supported Files

The plugin works with:

- `package.json` files
- `.cdsrc.json` files
- Any JSON files containing CDS configuration

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
