import globals from "globals";

/* deprecated

https://cap.cloud.sap/docs/releases/changelog/2022
[cds@6.4.0] Global configuration of CSRF-token handling for remote services cds.env.features.fetch_csrf is deprecated. Instead, please use csrf: true/false and csrfInBatch: true/false in the configuration of your remote services. These options will allow to configure CSRF-token handling for each remote service separately.
[cds.java@1.27.0] Authentication-related settings have been moved to a new cds.security.authentication configuration section. Within section cds.security property authenticateUnknownEndpoints has been replaced by authentication.authenticateUnknownEndpoints and openMetadataEndpoints has been replaced by authentication.authenticateMetadataEndpoints. The settings openUnrestrictedEndpoints and defaultRestrictionLevel have been subsumed under the new property authentication.mode. All previous properties are deprecated and can still be used for compatibility.
[cds-odata-v2-adapter-proxy@1.9.1] Check on cds.requires.multitenancy instead of deprecated cds.requires.db.multiTenant (compatible)
[cds-compiler@3.0.0] All v2 deprecated flags.
[cds@6.0.0] Deprecated feature flag cds.env.features.implicit_sorting
[cds@6.0.0] Deprecated feature flag cds.env.features.update_managed_properties
[cds@6.0.0] Deprecated feature flag cds.env.features.resolve_views
[cds@6.0.0] Deprecated feature flag cds.env.features.spaced_columns
[cds@6.0.0] Deprecated feature flag cds.env.features.throw_diff_error
[cds@6.0.0] Deprecated feature flag cds.env.features.delay_assert_deep_assoc
[cds@6.0.0] Deprecated feature flag cds.env.features.auto_fetch_expand_keys
[cds@6.0.0] Deprecated feature flag cds.env.features.extract_vals

https://cap.cloud.sap/docs/releases/changelog/2023
[cds-dk@7.5.0] cds add application-logging can now be used in place of cds add kibana. cds add kibana is deprecated.
[cds@7.5.0] Deprecated global configuration feature flag cds.env.features.fetch_csrf. Instead, please use csrf and csrfInBatch to configure your remote services. These options will allow to configure CSRF-token handling.
[cds@7.5.0] Compat for deprecated cds.env.auth.passport. Use cds.env.requires.auth instead.
[cds@7.0.0] Deprecated compat mode cds.env.features.cds_tx_protection = false

https://cap.cloud.sap/docs/releases/changelog/2024
[cds.java@3.5.0] Property cds.multiTenancy.subscriptionManager.clientCertificateHeader has been deprecated. Use 'cds.security.authentication.clientCertificateHeader' instead.
[cds.java@3.5.0] Property cds.multiTenancy.security.internalUserAccess.enabled has been deprecated. Use cds.security.internalUserAccess.enabled instead.
[cds@8.3.0] Deprecated configuration flag cds.env.features.keys_in_data_compat because of incompatibility with data validation in new OData adapter.
[cds.java@3.0.0] The deprecated MtSubscriptionService API and the corresponding compatibility mode cds.multitenancy.compatibility.enabled have been removed in favor of the DeploymentService.
[cds@8.0.0] Deprecated built-in cds.compile.to.gql and cds.compile.to.graphql compile targets. These are provided by @cap-js/graphql plugin versions >= 0.9.0.
[cds@7.7.0] Deprecation warnings for configuration options cds.drafts.cancellationTimeout, cds.features.serve_on_root, cds.features.stream_compat, cds.fiori.lean_draft and cds.requires.middlewares, as well as for the properties req.user.locale and req.user.tenant. The deprecation warnings can be turned off by setting cds.features.deprecated to off.
[cds.java@2.7.0] Properties section cds.outbox.persistent has been deprecated in favor of cds.outbox.services.
[cds.java@2.7.0] Properties cds.auditlog.outbox.persistent.enabled and cds.messaging.services.<key>.outbox.persistent.enabled have been deprecated in favor of the existing ...outbox.enabled and new ...outbox.name property.
[cds-compiler@4.6.2] compiler: Fix incorrect error about type properties if deprecated flag ignoreSpecifiedQueryElements is set.

https://cap.cloud.sap/docs/releases/archive/2022/jun22#db-constraints
DB-level constraints are the recommended way to ensure referential integrity.
Yet they are not enabled by default → do that explicitly by setting cds.env.features.assert_integrity = 'db'.

https://cap.cloud.sap/docs/releases/archive/2023/jun23
Removed Service-Level Checks for Referential Integrity
This effects cds.features.assert_integrity = app . This feature had been deprecated since cds6, and announced to be removed with cds 7 → please use database constraints and/or @assert.target instead.

New Protocol-Specific Service Endpoints
In these cases you can turn on the compat flag cds.features.serve_on_root = true , or specify absolute paths with the @path annotation, for example, @path:'/admin'.

Deprecated OData Flavor x4
This affects usages of config settings cds.odata.flavor and cds.odata.structs. Don't use these anymore, and we'll likely remove them with the next major release. Reason: This feature is used very rarely, if at all, while creating lots of efforts and runtime overhead.

https://cap.cloud.sap/docs/releases/archive/2024/jun24
Former adapter implementations are deprecated...
While they are still supported with cds8. And you can keep using them instead of the new ones by setting config option cds.features.odata_new_adapter = false

Deprecated cds.fiori.draft_compat
Compatibility for old-style handler registrations through the cds.fiori.draft_compat flag is still available in cds8, but will be removed in upcoming releases.

Automatic Draft Garbage Collection
Outdated drafts are automatically deleted now after a no-touch period of 30 days, which can be overridden thru the cds.fiori.draft_deletion_timeout config option like that:

*/

export default {};
