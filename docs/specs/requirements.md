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
