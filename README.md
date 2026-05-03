# Thrive Release Registry

This repository hosts public Thrive release metadata, community plugin registry entries, and community theme registry entries.

Thrive is not open source software, and this repository does not contain the Thrive application source code.

## What This Repository Contains

- Desktop release metadata for Thrive.
- Community plugin index entries.
- Community theme index entries.
- Submission policies and review checklists.
- JSON schemas and validation workflows.
- Generated marketplace indexes consumed by the Thrive app.

## Public Indexes

The Thrive app should read generated files from `dist/`:

```text
https://raw.githubusercontent.com/ThrivingOS/Thrive-release/main/dist/marketplace.v1.json
https://raw.githubusercontent.com/ThrivingOS/Thrive-release/main/dist/plugins.v1.json
https://raw.githubusercontent.com/ThrivingOS/Thrive-release/main/dist/themes.v1.json
https://raw.githubusercontent.com/ThrivingOS/Thrive-release/main/dist/desktop-releases.v1.json
```

Source registry files live in `registry/` and are reviewed through pull requests.

## Submit A Plugin

To submit a plugin, create a pull request that appends one entry to:

```text
registry/community-plugins.json
```

Read [SUBMIT_PLUGIN.md](SUBMIT_PLUGIN.md) and [DEVELOPER_POLICY.md](DEVELOPER_POLICY.md) before submitting.

The plugin source and packaged releases should live in the plugin author's own GitHub repository. This registry stores metadata, review state, and links. It does not host unreviewed plugin source code.

Start new plugins from:

```text
templates/plugin-template/
```

Plugin PR requirements are defined in [PLUGIN_PR_STANDARD.md](PLUGIN_PR_STANDARD.md).

## Submit A Theme

To submit a theme, create a pull request that appends one entry to:

```text
registry/community-themes.json
```

Read [SUBMIT_THEME.md](SUBMIT_THEME.md) and [DEVELOPER_POLICY.md](DEVELOPER_POLICY.md) before submitting.

## Repository Layout

```text
registry/  Source registry files reviewed through PRs.
dist/      Generated app-facing marketplace indexes.
schemas/   JSON schemas for registry and generated files.
review/    Human review checklists and permission policy.
scripts/   Local validation and dist generation scripts.
templates/ Plugin and theme starter templates.
.github/   PR templates, issue forms, and CI workflows.
```

## Local Validation

```bash
npm run validate
npm run build:dist
npm run validate:plugin-template
```

CI runs the same checks on pull requests.
