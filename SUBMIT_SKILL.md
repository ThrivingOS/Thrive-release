# Submit A Thrive Skill

Skills are submitted by pull request. The skill source and release assets should live in the author's own GitHub repository.

## Template

Start from the official template:

```text
templates/skill-template/
```

Copy it into a new repository, update `SKILL.md`, then run:

```bash
npm run validate
npm run pack
```

The template includes a single `SKILL.md` plus optional `references/`, `scripts/`, and `assets/` directories.

## Required Skill Repository Files

Your skill repository must contain:

```text
SKILL.md
README.md
```

Recommended:

```text
versions.json
CHANGELOG.md
LICENSE
```

Publish a GitHub Release with a `.thriveskill` package when the skill is ready for installation.

## Registry Entry

Append one entry to the end of `community-skills.json`:

```json
{
  "id": "example-skill",
  "name": "Example Skill",
  "author": "Your Name",
  "description": "A short description of what the skill does and when Thrive should use it.",
  "repo": "owner/example-skill"
}
```

The registry stores only searchable metadata and the repository location. Thrive reads `SKILL.md` and README from the skill repository and downloads installable files from GitHub releases.

See [SKILL_PR_STANDARD.md](SKILL_PR_STANDARD.md) for the full pull request standard.

## Package Requirements

- Skill IDs must be unique.
- `id` must match the `name` field in `SKILL.md`.
- Release assets should use `.thriveskill`.
- The package must contain a single top-level folder whose name matches the skill ID.
- The top-level folder must contain `SKILL.md`.
- The package must not contain symlinks.
- The package must not contain unsafe archive paths.
- Tool and runtime declarations must match the skill's behavior.

## Review

Maintainers will review:

- Registry entry format.
- Skill repository accessibility.
- `SKILL.md` validity.
- Tool and runtime scope.
- Script and dependency declarations.
- Release asset availability.
- User-facing README.
- Whether the skill function matches the requested tool access.

Skills with scripts, network access, write tools, or external dependencies may require additional source review.
