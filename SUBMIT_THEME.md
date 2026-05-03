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

Append one entry to the end of `community-css-themes.json`:

```json
{
  "name": "Example Theme",
  "author": "Your Name",
  "repo": "owner/example-theme",
  "screenshot": "screenshot.png",
  "modes": ["dark", "light"]
}
```

This follows the Obsidian-style theme registry shape.

## Review

Maintainers will review:

- Theme metadata.
- Screenshot availability.
- Visual scope.
- Whether assets are licensed for distribution.
- Whether the theme avoids unsafe script execution.
