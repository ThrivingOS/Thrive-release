# Thrive Developer Policy

This policy applies to all plugins, skills, and themes listed in the Thrive marketplace.

## Core Rules

- Do not collect, upload, sell, or share user data without clear disclosure and a matching permission declaration.
- Do not read local files outside approved Thrive capability APIs.
- Do not execute hidden installers, postinstall scripts, background daemons, or shell commands that are unrelated to the declared plugin function.
- Do not bypass Thrive approval prompts for destructive, network, filesystem, media import, or export actions.
- Do not impersonate Thrive, ThrivingOS, other developers, or other marketplace entries.
- Do not hide network destinations. All required domains must be declared.
- Do not ship obfuscated code unless the reviewer can inspect an equivalent source build.
- Do not silently expand permissions in an update.

## Plugin Capability Policy

Plugins must declare capabilities in `.thrive-plugin/plugin.json`.

High-risk capabilities require a clear use case and may require manual approval:

- `network.request.scoped`
- `media.import`
- `media.process`
- `manuscripts.write.current`
- `editor.write.current`
- `export.create`
- `mcp.server`

Plugins should request the smallest capability set needed for the feature.

## Skill Policy

Skills must be focused instruction packages built around a required `SKILL.md` file.

Skill submissions must:

- Solve one repeatable workflow.
- Keep `SKILL.md` concise and move detailed material into support files.
- Declare tool and runtime access in `SKILL.md`.
- Avoid hidden installers, unrelated daemons, and undisclosed network calls.
- Avoid broad write, shell, or network access unless it is essential and disclosed in README.

Skills should start as instructions and references. Scripts are allowed only when they directly support the declared workflow and can be reviewed.

## Theme Policy

Themes must be visual packages. They must not execute JavaScript, start local processes, fetch remote scripts, or modify user data.

The first version of Thrive themes should use controlled design tokens and packaged assets. Raw global CSS may be rejected if it can break core application surfaces.

## Review Outcome

Maintainers may approve, request changes, deprecate, remove, or block any marketplace entry if it violates this policy or creates risk for users.
