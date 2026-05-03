# Thrive Release Registry

This repository hosts public releases of Thrive and the community plugin and theme directories.

Thrive is not open source software, and this repository does not contain the source code of Thrive.

## Registry Files

The Thrive app reads these long-lived registry files directly:

```text
https://raw.githubusercontent.com/ThrivingOS/Thrive-release/main/community-plugins.json
https://raw.githubusercontent.com/ThrivingOS/Thrive-release/main/community-css-themes.json
https://raw.githubusercontent.com/ThrivingOS/Thrive-release/main/desktop-releases.json
```

Additional administrative files:

```text
community-plugins-removed.json
community-plugin-deprecation.json
community-css-themes-removed.json
```

## Submit Your Plugin Or Theme

Open a pull request and append your entry to the end of the matching JSON file.

- Plugins: `community-plugins.json`
- Themes: `community-css-themes.json`

Read [SUBMIT_PLUGIN.md](SUBMIT_PLUGIN.md), [SUBMIT_THEME.md](SUBMIT_THEME.md), and [DEVELOPER_POLICY.md](DEVELOPER_POLICY.md) before submitting.

Start new plugins from:

```text
templates/plugin-template/
```

Plugin PR requirements are defined in [PLUGIN_PR_STANDARD.md](PLUGIN_PR_STANDARD.md).

## Community Plugin Format

To add your plugin, append one entry to `community-plugins.json`:

```json
{
  "id": "example-plugin",
  "name": "Example Plugin",
  "author": "Your Name",
  "description": "A short description of what the plugin does.",
  "repo": "owner/example-plugin"
}
```

Fields:

- `id`: unique plugin ID. It must match the plugin manifest ID/name in your plugin repository.
- `name`: user-facing plugin name.
- `author`: author name for display.
- `description`: short searchable description.
- `repo`: GitHub repository identifier in `owner/repo` format.

When a user opens your plugin detail page, Thrive pulls the plugin manifest and README from your GitHub repository. Installable files are fetched from your GitHub releases.

## Community Theme Format

To add your theme, append one entry to `community-css-themes.json`:

```json
{
  "name": "Example Theme",
  "author": "Your Name",
  "repo": "owner/example-theme",
  "screenshot": "screenshot.png",
  "modes": ["dark", "light"]
}
```

Fields:

- `name`: unique theme name.
- `author`: author name for display.
- `repo`: GitHub repository identifier in `owner/repo` format.
- `screenshot`: path to the screenshot in the theme repository.
- `modes`: `dark`, `light`, or both.
- `publish`: optional boolean if the theme supports Thrive Publish-style output.

## Repository Layout

```text
community-plugins.json              Community plugin directory.
community-css-themes.json           Community theme directory.
desktop-releases.json               Desktop release metadata.
templates/plugin-template/          Starter plugin template.
review/                             Human review checklists and permission policy.
schemas/                            JSON schemas for documentation and tooling.
scripts/                            Local validation scripts.
.github/                            PR templates, issue forms, and CI workflows.
```

## Local Validation

```bash
npm run validate
npm run validate:plugin-template
npm run validate:pr
```

CI runs the same checks on pull requests.
