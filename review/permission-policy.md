# Thrive Marketplace Permission Policy

Marketplace entries must declare permissions that match their behavior.

## Low Risk

- `ai.skill`
- `ui.home`
- `ui.settingsPanel`
- `pluginData.read`
- `pluginData.write`

## Data Read

- `knowledge.read`
- `manuscripts.read`
- `media.read`
- `subjects.read`
- `assets.read`

These permissions allow controlled summary/list reads through Thrive host APIs. They do not allow arbitrary filesystem access.

## High Risk

- `network.request.scoped`
- `mcp.server`
- `media.import`
- `media.process`
- `manuscripts.write.current`
- `editor.write.current`
- `export.create`

High-risk permissions require clear user-facing disclosure and may require manual review.
