# Submit A Thrive Theme

Themes are submitted by pull request. Theme files should live in the author's own GitHub repository.

## Required Theme Repository Files

```text
.thrive-theme/theme.json
README.md
screenshots/
```

Themes must be visual packages. They must not execute JavaScript or modify user data.

## Registry Entry

Append one entry to `registry/community-themes.json`:

```json
{
  "id": "clean-studio",
  "name": "Clean Studio",
  "author": "Your Name",
  "description": "A focused theme for content creation.",
  "repo": "owner/clean-studio",
  "modes": ["light", "dark"],
  "screenshots": ["screenshots/home-light.png"],
  "reviewTier": "community"
}
```

## Review

Maintainers will review:

- Theme metadata.
- Screenshot availability.
- Visual scope.
- Whether assets are licensed for distribution.
- Whether the theme avoids unsafe script execution.
