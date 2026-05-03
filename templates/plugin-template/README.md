# Thrive Plugin Template

This template is the recommended starting point for a Thrive plugin.

It includes:

- `.thrive-plugin/plugin.json` manifest.
- One example Skill.
- One optional MCP server example.
- One homepage widget and one quick action.
- Local validation and package scripts.

## Requirements

- Node.js `>=22 <23`
- `zip` command for packaging

## Start

Copy this folder to a new repository and update:

- `.thrive-plugin/plugin.json`
- `package.json`
- `README.md`
- `skills/example-writer/SKILL.md`

Then run:

```bash
npm run validate
npm run pack
```

The package will be created in `dist/`.

## Manifest

The app reads `.thrive-plugin/plugin.json`. Keep requested permissions minimal.

This template requests:

- `ai.skill`: contributes a Skill.
- `ui.home`: contributes homepage widgets and quick actions.
- `pluginData.read`: reserved for plugin-owned data reads.

If you enable the MCP example, add `mcp.server` and keep the MCP tools schema-first and narrow.

## Marketplace Submission

After publishing a GitHub Release with the `.thriveplugin` package, submit a PR to `ThrivingOS/Thrive-release` and append one entry to:

```text
registry/community-plugins.json
```

Read the root repository `SUBMIT_PLUGIN.md` before submitting.
