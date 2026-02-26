# Deployment Guard — Example Skill

This is a reference implementation of a complete skill.

## Generated Structure

```
.agent/skills/guarding-deployments/
├── SKILL.md
└── scripts/
    └── pre-deploy-check.sh
```

## SKILL.md Content

```markdown
---
name: guarding-deployments
description: >
  Validates deployment readiness by checking build status, test results,
  and environment configuration before allowing deploys. Use when the user
  mentions "deploy", "release", "ship", or "go live".
---

# Deployment Guard

## When to use this skill
- User wants to deploy or release an application
- User asks to validate deployment readiness
- User mentions CI/CD checks or pre-deploy validation

## Workflow

- [ ] Run build verification
- [ ] Run test suite and confirm all tests pass
- [ ] Check environment variables are set
- [ ] Validate configuration files
- [ ] Confirm deployment target is reachable
- [ ] Execute deployment

## Instructions

### Step 1 — Validate Build

Run the project build command and confirm zero errors:

` ` `bash
npm run build 2>&1 | tail -20
` ` `

If the build fails, stop and report the errors. Do NOT proceed to deployment.

### Step 2 — Run Tests

` ` `bash
npm test -- --ci --passWithNoTests
` ` `

All tests must pass. If any fail, report failures and stop.

### Step 3 — Check Environment

Verify required environment variables exist:

- `DATABASE_URL`
- `API_KEY`
- `NODE_ENV` (must be `production`)

### Step 4 — Deploy

Only after all checks pass, run the deployment command appropriate
for the project (e.g., `npm run deploy`, `docker push`, etc.).

## Resources
- [scripts/pre-deploy-check.sh](../scripts/pre-deploy-check.sh)
```

## Notes

- The checklist gives the agent trackable state
- Each step has a clear pass/fail gate (Plan-Validate-Execute pattern)
- Scripts are treated as black boxes with `--help` support
