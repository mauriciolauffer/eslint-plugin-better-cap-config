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

| Rule                                                                                               | Description                                                                                      |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`cds-cdsc-newparser`](docs/rules/cds-cdsc-newparser.md)                                           | Disallow deprecated `cds.cdsc.newparser: false` configuration                                    |
| [`cds-drafts-cancellation-timeout`](docs/rules/cds-drafts-cancellation-timeout.md)                 | Disallow deprecated `cds.drafts.cancellationTimeout` configuration                               |
| [`cds-features-async-handler-compat`](docs/rules/cds-features-async-handler-compat.md)             | Disallow deprecated `cds.features.async_handler_compat` configuration                            |
| [`cds-features-base64-binaries`](docs/rules/cds-features-base64-binaries.md)                       | Disallow deprecated `cds.features.base64_binaries` configuration                                 |
| [`cds-features-cds-validate`](docs/rules/cds-features-cds-validate.md)                             | Disallow deprecated `cds.features.cds_validate` configuration                                    |
| [`cds-features-compat-assert-not-null`](docs/rules/cds-features-compat-assert-not-null.md)         | Disallow deprecated `cds.features.compat_assert_not_null` configuration                          |
| [`cds-features-compat-restrict-bound`](docs/rules/cds-features-compat-restrict-bound.md)           | Disallow deprecated `cds.features.compat_restrict_bound` configuration                           |
| [`cds-features-compat-restrict-where`](docs/rules/cds-features-compat-restrict-where.md)           | Disallow deprecated `cds.features.compat_restrict_where` configuration                           |
| [`cds-features-compat-save-drafts`](docs/rules/cds-features-compat-save-drafts.md)                 | Disallow deprecated `cds.features.compat_save_drafts` configuration                              |
| [`cds-features-compat-static-auth`](docs/rules/cds-features-compat-static-auth.md)                 | Disallow deprecated `cds.features.compat_static_auth` configuration                              |
| [`cds-features-compat-texts-entities`](docs/rules/cds-features-compat-texts-entities.md)           | Disallow deprecated `cds.features.compat_texts_entities` configuration                           |
| [`cds-features-compile-for-flows`](docs/rules/cds-features-compile-for-flows.md)                   | Disallow deprecated `cds.features.compile_for_flows` configuration                               |
| [`cds-features-consistent-params`](docs/rules/cds-features-consistent-params.md)                   | Disallow deprecated `cds.features.consistent_params: false` configuration                        |
| [`cds-features-keys-in-data-compat`](docs/rules/cds-features-keys-in-data-compat.md)               | Disallow deprecated `cds.features.keys_in_data_compat` configuration                             |
| [`cds-features-kibana-formatter`](docs/rules/cds-features-kibana-formatter.md)                     | Disallow deprecated `cds.features.kibana_formatter` configuration                                |
| [`cds-features-new-draft-via-action`](docs/rules/cds-features-new-draft-via-action.md)             | Disallow deprecated `cds.features.new_draft_via_action` configuration                            |
| [`cds-features-odata-new-adapter`](docs/rules/cds-features-odata-new-adapter.md)                   | Disallow deprecated `cds.features.odata_new_adapter` configuration                               |
| [`cds-features-serve-on-root`](docs/rules/cds-features-serve-on-root.md)                           | Disallow deprecated `cds.features.serve_on_root: true` configuration                             |
| [`cds-features-service-level-restrictions`](docs/rules/cds-features-service-level-restrictions.md) | Disallow deprecated `cds.features.service_level_restrictions: false` configuration               |
| [`cds-features-stream-compat`](docs/rules/cds-features-stream-compat.md)                           | Disallow deprecated `cds.features.stream_compat` configuration                                   |
| [`cds-features-xssec-compat`](docs/rules/cds-features-xssec-compat.md)                             | Disallow deprecated `cds.features.xssec_compat` configuration                                    |
| [`cds-fiori-calc-elements`](docs/rules/cds-fiori-calc-elements.md)                                 | Disallow deprecated `cds.fiori.calc_elements` configuration                                      |
| [`cds-fiori-draft-compat`](docs/rules/cds-fiori-draft-compat.md)                                   | Disallow deprecated `cds.fiori.draft_compat` configuration                                       |
| [`cds-fiori-lean-draft`](docs/rules/cds-fiori-lean-draft.md)                                       | Disallow deprecated `cds.fiori.lean_draft: false` configuration                                  |
| [`cds-log-kibana-custom-fields`](docs/rules/cds-log-kibana-custom-fields.md)                       | Disallow deprecated `cds.log.kibana_custom_fields` configuration                                 |
| [`cds-multitenant-client-cert-header`](docs/rules/cds-multitenant-client-cert-header.md)           | Disallow deprecated `cds.multiTenancy.subscriptionManager.clientCertificateHeader` configuration |
| [`cds-remote-native-fetch`](docs/rules/cds-remote-native-fetch.md)                                 | Disallow deprecated `cds.remote.native_fetch` configuration                                      |
| [`cds-requires-db-database`](docs/rules/cds-requires-db-database.md)                               | Disallow deprecated `cds.requires.db.database` configuration                                     |
| [`cds-requires-middlewares`](docs/rules/cds-requires-middlewares.md)                               | Disallow deprecated `cds.requires.middlewares: false` configuration                              |
| [`cds-sql-native-hana-associations`](docs/rules/cds-sql-native-hana-associations.md)               | Disallow deprecated `cds.sql.native_hana_associations: true` configuration                       |
| [`cds-sql-runtime-view-mode`](docs/rules/cds-sql-runtime-view-mode.md)                             | Disallow deprecated `cds.sql.runtimeView.mode: "resolve"` configuration                          |
| [`cds-sql-transitive-localized-views`](docs/rules/cds-sql-transitive-localized-views.md)           | Disallow deprecated `cds.sql.transitive_localized_views: true` configuration                     |

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
