# Plugin Review Checklist

Use this checklist before approving a plugin registry entry.

## Registry Metadata

- [ ] Entry is appended to `community-plugins.json`.
- [ ] Entry has exactly `id`, `name`, `author`, `description`, and `repo`.
- [ ] `id` is unique.
- [ ] `name` is unique.
- [ ] `repo` is unique and uses `owner/name`.
- [ ] Description is clear, short, and user-facing.

## Plugin Repository

- [ ] Repository is public and accessible.
- [ ] Repository owner matches the PR author or an organization they publicly belong to.
- [ ] `README.md` exists.
- [ ] `.thrive-plugin/plugin.json` exists.
- [ ] Manifest ID/name matches the registry `id`.
- [ ] Manifest version is valid.
- [ ] Required Thrive version is clear.
- [ ] A GitHub release exists for the manifest version, or the PR explains why not.
- [ ] Release package contains the required files.

## Permissions

- [ ] Permissions are declared in the plugin manifest, not in the registry file.
- [ ] Permissions are minimal.
- [ ] Network domains are declared.
- [ ] High-risk capabilities have a clear reason in the README.
- [ ] Permission changes are visible in updates.

## Runtime Safety

- [ ] MCP tools have clear schemas.
- [ ] No hidden installer or unrelated daemon.
- [ ] No credential collection without disclosure.
- [ ] No local filesystem access outside declared capability APIs.

## Decision

- [ ] Approved
- [ ] Changes requested
- [ ] Rejected
