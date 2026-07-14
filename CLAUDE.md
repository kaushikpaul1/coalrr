# nextjs_tailwind_shadcn_ts — Claude Memory
> Last analyzed: 2026-07-13
> Re-analysis needed: NO — read .claude/rules/ files instead of source files

## What this project is
# 🏛️ COALRR Platform - Enterprise Architecture  **Version:** 0.2.0  

## Quick reference
- **Stack**: TypeScript + JavaScript + Next.js + React + Tailwind CSS + TanStack Query + Prisma + Vitest + ESLint
- **Dev**: `next dev -p 3000`
- **Test**: `vitest`
- **Build**: `next build && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/`

## Memory files (read these, not source files)
- @.claude/rules/architecture.md — folder map, entry points, data flow
- @.claude/rules/stack.md — tech stack, versions, all commands
- @.claude/rules/modules.md — every module and what it does
- @.claude/rules/models.md — DB schemas and data types
- @.claude/rules/api.md — all routes and endpoints
- @.claude/rules/conventions.md — naming, patterns, testing approach
- @.claude/rules/gotchas.md — quirks, workarounds, do-not-touch
- @.claude/rules/changelog.md — what changed and when

## Instruction
You have full codebase knowledge from the files above.
Do NOT re-read source files to understand structure — use memory files.
If something seems outdated, flag it rather than re-analyzing.
