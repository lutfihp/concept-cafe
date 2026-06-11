# Git Setup — Design Spec

**Date:** 2026-06-11  
**Status:** Approved

## Summary

Initialize the Concept Cafe project as a git repository, update `.gitignore` to exclude the design handoff folder, commit all tracked files, and push to the existing GitHub remote as branch `main`.

## Steps

### 1. Update `.gitignore`

The existing `.gitignore` already covers all standard Next.js artifacts (`node_modules`, `.next`, `/out`, `*.tsbuildinfo`, `next-env.d.ts`, `.superpowers`, `.DS_Store`, env files). The only addition needed is:

```
# design handoff (prototype files, not project source)
handoffs/
```

`docs/superpowers/` (specs and plans) will be committed — they document design decisions and are useful project history.

### 2. Initial commit

```bash
git init
git add .
git commit -m "init: initial project commit"
```

All files not matched by `.gitignore` are staged and committed in a single initial commit.

### 3. Link remote and push

```bash
git remote add origin https://github.com/lutfihp/concept-cafe.git
git branch -M main
git push -u origin main
```

Sets `origin` to the GitHub repo, renames the local branch to `main`, and pushes with upstream tracking so future `git push` works without arguments.

## Out of scope

- Any changes to project source files
- Branch protection rules or GitHub settings
- CI/CD configuration
