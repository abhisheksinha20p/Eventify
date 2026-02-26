---
name: creating-skills
description: >
  Generates complete Antigravity skill directories with SKILL.md, scripts, examples,
  and resources. Use when the user asks to "create a skill", "build a skill",
  "make a new agent skill", or references the .agent/skills/ directory.
---

# Antigravity Skill Creator

## When to use this skill

- User asks to **create**, **build**, or **scaffold** a new agent skill
- User mentions `.agent/skills/` or skill directories
- User wants to automate a repeatable agent workflow as a packaged skill

## Folder Structure

Every generated skill must follow this hierarchy:

```
.agent/skills/<skill-name>/
├── SKILL.md          # Required — main logic and instructions
├── scripts/          # Optional — helper scripts
├── examples/         # Optional — reference implementations
└── resources/        # Optional — templates or assets
```

## SKILL.md Frontmatter Rules

```yaml
---
name: <gerund-name> # e.g. testing-code, managing-databases
description: <3rd-person> # e.g. "Runs unit tests. Use when user mentions testing."
---
```

- **name**: Gerund form, lowercase + hyphens only, max 64 chars. No "claude" or "anthropic".
- **description**: Third person, includes trigger keywords, max 1024 chars.

## Workflow

Follow this checklist when creating a skill:

```markdown
- [ ] Gather requirements (what the skill does, triggers, complexity)
- [ ] Determine which optional dirs are needed (scripts/, examples/, resources/)
- [ ] Write SKILL.md with valid frontmatter
- [ ] Create supporting files if needed
- [ ] Validate: ensure SKILL.md < 500 lines, paths use `/`, frontmatter is correct
```

## Writing Principles

- **Be concise.** The agent is smart — skip obvious explanations.
- **Progressive disclosure.** Keep `SKILL.md` under 500 lines. Link to secondary files (`[See ADVANCED.md](ADVANCED.md)`) only one level deep.
- **Forward slashes only.** Always use `/` for paths.
- **Match freedom to format:**
  - **Bullet points** → high-freedom heuristics
  - **Code blocks** → medium-freedom templates
  - **Exact commands** → low-freedom fragile operations

## Feedback Loops

For complex skills, include these patterns in the generated `SKILL.md`:

1. **Checklists** — a markdown checklist the agent copies and updates to track state.
2. **Plan-Validate-Execute** — run a validation script/check BEFORE applying changes.
3. **Error handling** — treat scripts as black boxes; tell the agent to run `--help` if unsure.

## Output Template

When generating a skill, produce files in this order:

### 1. SKILL.md

```markdown
---
name: <gerund-name>
description: <3rd-person description with triggers>
---

# <Skill Title>

## When to use this skill

- <Trigger 1>
- <Trigger 2>

## Workflow

<Checklist or step-by-step guide>

## Instructions

<Specific logic, code snippets, or rules>

## Resources

- <Links to scripts/ or resources/ if applicable>
```

### 2. Supporting Files (if applicable)

Create scripts in `scripts/`, examples in `examples/`, or templates in `resources/`
as the skill requires. Each script should support a `--help` flag.

## Example

See [examples/deployment-guard.md](examples/deployment-guard.md) for a complete
reference skill.
