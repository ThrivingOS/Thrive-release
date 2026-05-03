# Plugin Review Checklist

Use this checklist before approving a plugin registry entry.

## Registry Metadata

- [ ] `id` is unique.
- [ ] `id` matches the plugin manifest name.
- [ ] `repo` is a valid `owner/name` GitHub repository.
- [ ] Description is clear and user-facing.
- [ ] Category and tags are appropriate.

## Manifest And Package

- [ ] `.thrive-plugin/plugin.json` exists.
- [ ] Manifest version is valid.
- [ ] Required Thrive version is clear.
- [ ] Release asset exists if the entry declares one.
- [ ] Package checksum matches if provided.
- [ ] Package does not contain unsafe paths or symlinks.

## Permissions

- [ ] Permissions are minimal.
- [ ] Network domains are declared.
- [ ] High-risk capabilities have a clear reason.
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
