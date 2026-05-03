# Plugin Pull Request Standard

Plugin submissions must be small, reviewable, and reproducible.

## PR Scope

A plugin submission PR must:

- Add or update exactly one plugin entry in `registry/community-plugins.json`.
- Rebuild generated indexes in `dist/`.
- Avoid unrelated documentation, workflow, or theme changes.
- Link to a public plugin repository.
- Use a stable plugin `id` that matches `.thrive-plugin/plugin.json` in the plugin repository.

For a new plugin, append one object to `registry/community-plugins.json`.

For an update, modify only the existing object for that plugin.

For removal or deprecation, use:

```text
registry/community-plugins-removed.json
registry/community-plugin-deprecation.json
```

## Required Fields

Each plugin entry must include:

- `id`
- `name`
- `author`
- `description`
- `repo`
- `category`
- `permissions`
- `reviewTier`

Recommended fields:

- `displayName`
- `tags`
- `minAppVersion`
- `homepage`
- `packageUrl`
- `sha256`

## Permission Review

Permissions must be minimal and match the plugin feature set.

High-risk permissions require a clear explanation in the PR body:

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
- Plugin IDs are unique.
- Permissions are known Thrive permissions.
- PR changes only one plugin or one theme registry entry.
- Generated `dist/*.json` files match `registry/*.json`.
- Plugin template remains valid.

## Maintainer Review

Maintainers should use `review/plugin-review.md`.
