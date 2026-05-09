# Skill Pull Request Standard

Skill submissions must be small, reviewable, and compatible with the long-lived registry format.

## PR Scope

A skill submission PR must:

- Append exactly one skill entry to `community-skills.json`.
- Avoid unrelated documentation, workflow, plugin, theme, or release changes.
- Link to a public skill repository.
- Use a stable skill `id` that matches the `name` field in the skill repository's `SKILL.md`.

For removal or deprecation, use:

```text
community-skills-removed.json
community-skill-deprecation.json
```

## Required Fields

Each skill entry must include exactly:

- `id`
- `name`
- `author`
- `description`
- `repo`

Do not add marketplace-specific fields such as category, tags, package URL, checksum, tool access, or runtime policy to `community-skills.json`. Those belong in the skill repository's `SKILL.md` and release metadata.

## Skill Review

Tool and runtime access are reviewed from `SKILL.md`, not from the registry entry.

High-risk declarations require clear disclosure in the skill README:

- `allowedTools` or `allowed-tools` entries that write files.
- Shell, bash, command, or CLI runtime usage.
- Network access.
- External package dependencies.
- Scripts under `scripts/`.
- Any workflow that can publish, export, delete, or modify user content.

## Automated Checks

CI checks:

- Registry JSON is valid.
- Skill IDs, names, and repos are unique.
- PR adds one skill entry and appends it to the end of the list.
- Skill repo exists and belongs to the PR author or their public organization.
- Skill repository contains `SKILL.md`.
- `SKILL.md` frontmatter is valid.
- Skill `name` matches the registry `id`.
- Skill repository contains `README.md`.
- GitHub release for a declared version exists when applicable.
- Skill template remains valid.

## Maintainer Review

Maintainers should use `review/skill-review.md`.
