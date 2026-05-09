## Submission Type

- [ ] Plugin registry entry (`community-plugins.json`)
- [ ] Skill registry entry (`community-skills.json`)
- [ ] Theme registry entry (`community-css-themes.json`)
- [ ] Desktop release metadata (`desktop-releases.json`)
- [ ] Policy or documentation change

## Checklist

- [ ] I read `DEVELOPER_POLICY.md`.
- [ ] I added only one plugin, skill, theme, or release entry unless maintainers requested otherwise.
- [ ] I appended the entry to the end of the matching JSON file.
- [ ] The target repository is public and accessible.
- [ ] For plugin submissions, the registry `id` matches `.thrive-plugin/plugin.json`.
- [ ] For plugin submissions, high-risk permissions are explained in the plugin README.
- [ ] For skill submissions, the registry `id` matches `SKILL.md`.
- [ ] For skill submissions, tool/runtime access and scripts are explained in the skill README.
- [ ] I ran `npm run validate`.
- [ ] For plugin submissions, I read `PLUGIN_PR_STANDARD.md`.
- [ ] For skill submissions, I read `SKILL_PR_STANDARD.md`.

## Notes For Reviewers

Describe what changed and include any package or release links maintainers should inspect.
