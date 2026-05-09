---
name: example-skill
description: Example Thrive skill that turns a rough content idea into a short, actionable outline.
allowedRuntimeModes: ["redclaw", "wander"]
allowedTools: []
blockedTools: ["bash", "network.request"]
hookMode: inline
autoActivate: true
activationScope: turn
---

# Example Skill

Use this skill when the user asks for a compact content outline from a rough idea.

Rules:

- Ask for the target audience if it is missing.
- Return a title, three bullet points, and one next action.
- Keep the output short enough to fit into an editor or task card.
- Do not modify files unless the host provides an explicit write capability.

## Additional Resources

- For a sample output shape, see [references/example-output.md](references/example-output.md).
