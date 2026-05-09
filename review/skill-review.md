# Skill Review Checklist

Use this checklist before approving a skill registry entry.

## Registry Metadata

- [ ] Entry is appended to `community-skills.json`.
- [ ] Entry has exactly `id`, `name`, `author`, `description`, and `repo`.
- [ ] `id` is unique.
- [ ] `name` is unique.
- [ ] `repo` is unique and uses `owner/name`.
- [ ] Description is clear, short, and user-facing.

## Skill Repository

- [ ] Repository is public and accessible.
- [ ] Repository owner matches the PR author or an organization they publicly belong to.
- [ ] `README.md` exists.
- [ ] `SKILL.md` exists.
- [ ] `SKILL.md` frontmatter is valid.
- [ ] `SKILL.md` name matches the registry `id`.
- [ ] Description explains both what the skill does and when Thrive should use it.
- [ ] A GitHub release exists for the declared version, or the PR explains why not.
- [ ] Release package contains one top-level skill folder with `SKILL.md`.

## Runtime Safety

- [ ] Tool access is minimal.
- [ ] Runtime modes are narrow.
- [ ] Scripts are relevant to the declared skill behavior.
- [ ] External dependencies are disclosed.
- [ ] No hidden installer or unrelated daemon.
- [ ] No credential collection without disclosure.
- [ ] No local filesystem access outside declared tool access.
- [ ] No publish, export, delete, or write action without clear user intent.

## Decision

- [ ] Approved
- [ ] Changes requested
- [ ] Rejected
