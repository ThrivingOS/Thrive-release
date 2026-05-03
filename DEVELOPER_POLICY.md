# Thrive Developer Policy

This policy applies to all plugins and themes listed in the Thrive marketplace.

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

## Theme Policy

Themes must be visual packages. They must not execute JavaScript, start local processes, fetch remote scripts, or modify user data.

The first version of Thrive themes should use controlled design tokens and packaged assets. Raw global CSS may be rejected if it can break core application surfaces.

## Review Outcome

Maintainers may approve, request changes, deprecate, remove, or block any marketplace entry if it violates this policy or creates risk for users.
