# User Stories - Requirements

---

## User Story: Deprecated cds.fiori.draft_compat

As a developer,

I want an ESLint rule that flags the presense of the deprecated key `cds.fiori.draft_compat` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.fiori.draft_compat` and `fiori.draft_compat`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.fiori.draft_compat" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.odata_new_adapter

As a developer,

I want an ESLint rule that flags the deprecated key-value pair `"cds.features.odata_new_adapter": false` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `"cds.features.odata_new_adapter": false` and `"features.odata_new_adapter": false`.

- The rule should not trigger if the key is missing.

- The rule should only trigger if the value is false.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.odata_new_adapter: false" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.cds_validate

As a developer,

I want an ESLint rule that flags the deprecated key-value pair `"cds.features.cds_validate": false` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `"cds.features.cds_validate": false` and `"features.cds_validate": false`.

- The rule should not trigger if the key is missing.

- The rule should only trigger if the value is false.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.cds_validate: false" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.compat_save_drafts

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.features.compat_save_drafts` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.features.compat_save_drafts` and `features.compat_save_drafts`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.compat_save_drafts" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.compat_assert_not_null

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.features.compat_assert_not_null` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.features.compat_assert_not_null` and `features.compat_assert_not_null`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.compat_assert_not_null" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.compile_for_flows

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.features.compile_for_flows` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.features.compile_for_flows` and `features.compile_for_flows`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.compile_for_flows" is deprecated. Use "cds.features.annotate_for_flows" instead.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.compat_restrict_where

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.features.compat_restrict_where` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.features.compat_restrict_where` and `features.compat_restrict_where`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.compat_restrict_where" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.compat_static_auth

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.features.compat_static_auth` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.features.compat_static_auth` and `features.compat_static_auth`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.compat_static_auth" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.compat_restrict_bound

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.features.compat_restrict_bound` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.features.compat_restrict_bound` and `features.compat_restrict_bound`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.compat_restrict_bound" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.base64_binaries

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.features.base64_binaries` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.features.base64_binaries` and `features.base64_binaries`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.base64_binaries" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.keys_in_data_compat

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.features.keys_in_data_compat` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.features.keys_in_data_compat` and `features.keys_in_data_compat`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.keys_in_data_compat" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.kibana_formatter

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.features.kibana_formatter` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.features.kibana_formatter` and `features.kibana_formatter`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.kibana_formatter" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.fiori.calc_elements

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.fiori.calc_elements` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.fiori.calc_elements` and `fiori.calc_elements`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.fiori.calc_elements" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.remote.native_fetch

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.remote.native_fetch` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.remote.native_fetch` and `remote.native_fetch`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.remote.native_fetch" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.multiTenancy.subscriptionManager.clientCertificateHeader

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.multiTenancy.subscriptionManager.clientCertificateHeader` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.multiTenancy.subscriptionManager.clientCertificateHeader` and `multiTenancy.subscriptionManager.clientCertificateHeader`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.multiTenancy.subscriptionManager.clientCertificateHeader" is deprecated. Use "cds.security.authentication.clientCertificateHeader" instead.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.log.kibana_custom_fields

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.log.kibana_custom_fields` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.log.kibana_custom_fields` and `log.kibana_custom_fields`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.log.kibana_custom_fields" is deprecated. Use "cds.log.als_custom_fields" instead.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.sql.runtimeView.mode: "resolve"

As a developer,

I want an ESLint rule that flags the deprecated value `"resolve"` for the key `cds.sql.runtimeView.mode` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.sql.runtimeView.mode: "resolve"` and `sql.runtimeView.mode: "resolve"`.

- The rule should not trigger if the key is missing or has a different value.

- The rule should only trigger if the value is `"resolve"`.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.sql.runtimeView.mode": "resolve" is deprecated. Use "cte" mode or remove this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.new_draft_via_action

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.features.new_draft_via_action` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.features.new_draft_via_action` and `features.new_draft_via_action`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.new_draft_via_action" is deprecated. Use "cds.fiori.direct_crud" instead.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.compat_texts_entities

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.features.compat_texts_entities` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.features.compat_texts_entities` and `features.compat_texts_entities`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.compat_texts_entities" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.stream_compat

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.features.stream_compat` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.features.stream_compat` and `features.stream_compat`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.stream_compat" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.async_handler_compat

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.features.async_handler_compat` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.features.async_handler_compat` and `features.async_handler_compat`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.async_handler_compat" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.service_level_restrictions

As a developer,

I want an ESLint rule that flags the deprecated key-value pair `"cds.features.service_level_restrictions": false` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `"cds.features.service_level_restrictions": false` and `"features.service_level_restrictions": false`.

- The rule should not trigger if the key is missing.

- The rule should only trigger if the value is false.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.service_level_restrictions": false is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.features.consistent_params

As a developer,

I want an ESLint rule that flags the deprecated key-value pair `"cds.features.consistent_params": false` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `"cds.features.consistent_params": false` and `"features.consistent_params": false`.

- The rule should not trigger if the key is missing.

- The rule should only trigger if the value is false.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.features.consistent_params": false is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.drafts.cancellationTimeout

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.drafts.cancellationTimeout` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.drafts.cancellationTimeout` and `drafts.cancellationTimeout`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.drafts.cancellationTimeout" is deprecated. Use "cds.fiori.draft_lock_timeout" instead.

- Applies to .json files including .cdsrc.json, package.json, etc.

---

## User Story: Deprecated cds.requires.db.database

As a developer,

I want an ESLint rule that flags the presence of the deprecated key `cds.requires.db.database` in any JSON file within a project,

so that I avoid using deprecated configurations and keep my code compliant with current standards.

### Acceptance Criteria

- The rule must detect any occurrence of `cds.requires.db.database` and `requires.db.database`.

- The rule should not trigger if the key is missing.

- ESLint should throw a warning (or error if configured) with the message:
  - "cds.requires.db.database" is deprecated. Please remove or update this configuration.

- Applies to .json files including .cdsrc.json, package.json, etc.
