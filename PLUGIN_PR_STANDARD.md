# Plugin Pull Request Standard

Plugin submissions must be small, reviewable, and compatible with the long-lived registry format.

## PR Scope

A plugin submission PR must:

- Append exactly one plugin entry to `community-plugins.json`.
- Avoid unrelated documentation, workflow, theme, or release changes.
- Link to a public plugin repository.
- Use a stable plugin `id` that matches `.thrive-plugin/plugin.json` in the plugin repository.

For removal or deprecation, use:

```text
community-plugins-removed.json
community-plugin-deprecation.json
```

## Required Fields

Each plugin entry must include exactly:

- `id`
- `name`
- `author`
- `description`
- `repo`

Do not add marketplace-specific fields such as category, tags, package URL, checksum, or permissions to `community-plugins.json`. Those belong in the plugin repository manifest and release metadata.

## Permission Review

Permissions are reviewed from `.thrive-plugin/plugin.json` in the plugin repository, not from the registry entry.

High-risk permissions require clear disclosure in the plugin README:

- `network.request.scoped`
- `mcp.server`
- `media.import`
- `media.process`
- `manuscripts.write.current`
- `editor.write.current`
- `export.create`

## Automated Checks

CI checks:

- Registry JSON is valid.
- Plugin IDs, names, and repos are unique.
- PR adds one plugin entry and appends it to the end of the list.
- Plugin repo exists and belongs to the PR author or their public organization.
- Plugin repository contains `.thrive-plugin/plugin.json`.
- Plugin manifest matches the registry entry.
- Plugin repository contains `README.md`.
- GitHub release for the manifest version exists when applicable.
- Plugin template remains valid.

## Maintainer Review

Maintainers should use `review/plugin-review.md`.
