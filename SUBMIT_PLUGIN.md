# Submit A Thrive Plugin

Plugins are submitted by pull request. The plugin code and release assets should live in the author's own GitHub repository.

## Template

Start from the official template:

```text
templates/plugin-template/
```

Copy it into a new repository, update `.thrive-plugin/plugin.json`, then run:

```bash
npm run validate
npm run pack
```

The template includes a Skill example, optional MCP server example, homepage widget example, and packaging script.

## Required Plugin Repository Files

Your plugin repository must contain:

```text
.thrive-plugin/plugin.json
README.md
```

Recommended:

```text
versions.json
CHANGELOG.md
LICENSE
```

Publish a GitHub Release with a `.thriveplugin` package when the plugin is ready for installation.

## Registry Entry

Append one entry to the end of `community-plugins.json`:

```json
{
  "id": "example-plugin",
  "name": "Example Plugin",
  "author": "Your Name",
  "description": "A short description of what the plugin does.",
  "repo": "owner/example-plugin"
}
```

This intentionally matches the Obsidian-style registry shape: the registry stores only searchable metadata and the repository location. Thrive reads the plugin manifest and README from the plugin repository and downloads installable files from GitHub releases.

See [PLUGIN_PR_STANDARD.md](PLUGIN_PR_STANDARD.md) for the full pull request standard.

## Package Requirements

- Plugin IDs must be unique.
- `id` must match the plugin manifest ID/name in the plugin repository.
- Release assets should use `.thriveplugin`.
- The package must contain a valid `.thrive-plugin/plugin.json` or compatible manifest path.
- The package must not contain symlinks.
- The package must not contain unsafe archive paths.
- Permissions must match the plugin feature set in the plugin manifest.

## Review

Maintainers will review:

- Registry entry format.
- Plugin repository accessibility.
- Manifest validity.
- Capability scope.
- Network declarations.
- Release asset availability.
- User-facing README.
- Whether the plugin function matches the requested permissions.

High-risk plugins may require additional source review.
