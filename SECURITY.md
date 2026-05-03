# Security Policy

Report security issues privately. Do not open a public issue for vulnerabilities.

## Report A Vulnerability

Send a report to the maintainer contact listed by ThrivingOS. Include:

- Affected plugin, theme, or release entry.
- Exact version.
- Reproduction steps.
- Impact.
- Any logs or proof of concept that help verification.

## Marketplace Security Model

The registry is metadata-only. Plugin packages are downloaded from release assets and must be validated by the Thrive app before installation.

Required checks:

- Registry schema validation.
- Plugin manifest validation.
- Version compatibility.
- SHA-256 checksum verification when available.
- Permission diff review on update.
- User confirmation for high-risk capabilities.

The app must not execute marketplace metadata as code.
