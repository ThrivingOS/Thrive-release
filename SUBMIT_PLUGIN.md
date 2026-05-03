# Submit A Thrive Plugin

Plugins are submitted by pull request. The plugin code and release assets should live in the author's own GitHub repository.

## Required Plugin Repository Files

Your plugin repository must contain:

```text
.thrive-plugin/plugin.json
README.md
```

For versioned installation, publish a GitHub Release with a `.thriveplugin` package.

Recommended:

```text
versions.json
CHANGELOG.md
LICENSE
```

## Registry Entry

Append one entry to `registry/community-plugins.json`:

```json
{
  "id": "example-plugin",
  "name": "Example Plugin",
  "displayName": "Example Plugin",
  "author": "Your Name",
  "description": "Short user-facing description.",
  "repo": "owner/example-plugin",
  "category": "writing",
  "tags": ["writing", "ai"],
  "permissions": ["ai.skill"],
  "reviewTier": "community"
}
```

## Package Requirements

- Plugin IDs must be unique.
- `id` must match the plugin manifest name.
- Release assets should use `.thriveplugin`.
- The package must contain a valid `.thrive-plugin/plugin.json` or compatible manifest path.
- The package must not contain symlinks.
- The package must not contain unsafe archive paths.
- Permissions must match the plugin feature set.

## Review

Maintainers will review:

- Manifest validity.
- Capability scope.
- Network declarations.
- Release asset availability.
- User-facing README.
- Whether the plugin function matches the requested permissions.

High-risk plugins may require additional source review.
