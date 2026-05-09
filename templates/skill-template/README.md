# Thrive Skill Template

This template is the recommended starting point for a Thrive skill.

It includes:

- `SKILL.md` entrypoint.
- Optional `references/`, `scripts/`, and `assets/` directories.
- Local validation and package scripts.

## Requirements

- Node.js `>=22 <23`
- `zip` command for packaging

## Start

Copy this folder to a new repository and update:

- `SKILL.md`
- `package.json`
- `README.md`
- Optional support files under `references/`, `scripts/`, and `assets/`

Then run:

```bash
npm run validate
npm run pack
```

The package will be created in `dist/`.

## Skill Format

The app reads `SKILL.md`. Keep the skill focused on one repeatable workflow. Put detailed reference material in support files and link to those files from `SKILL.md` only when needed.

The `name` field must match the repository's `community-skills.json` `id`.

## Marketplace Submission

After publishing a GitHub Release with the `.thriveskill` package, submit a PR to `ThrivingOS/Thrive-release` and append one entry to:

```text
community-skills.json
```

Read the root repository `SUBMIT_SKILL.md` before submitting.
