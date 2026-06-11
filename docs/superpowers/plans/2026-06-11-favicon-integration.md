# Favicon Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Copy the three favicon assets from the design handoff into the Next.js App Router `/app` directory so the browser tab, bookmark icon, and iOS home-screen shortcut all show the Concept Cafe brand mark.

**Architecture:** Next.js 14 App Router discovers favicon assets by filename convention — no `metadata.icons` config or `<link>` tags in `layout.tsx` needed. Placing `icon.svg`, `icon.png`, and `apple-icon.png` in `/app` is sufficient; the framework emits the correct `<link>` tags automatically on every page.

**Tech Stack:** Next.js 14 App Router file-based metadata, PowerShell file copy

---

### Task 1: Copy favicon assets into `/app`

**Files:**
- Create: `app/icon.svg` (copied from `handoffs/design_handoff/favicon.svg`)
- Create: `app/icon.png` (copied from `handoffs/design_handoff/favicon-32.png`)
- Create: `app/apple-icon.png` (copied from `handoffs/design_handoff/apple-touch-icon.png`)

- [ ] **Step 1: Copy the SVG icon**

Run:
```powershell
Copy-Item "handoffs\design_handoff\favicon.svg" -Destination "app\icon.svg"
```

Expected: no output, file appears at `app/icon.svg`.

- [ ] **Step 2: Copy the PNG icon**

Run:
```powershell
Copy-Item "handoffs\design_handoff\favicon-32.png" -Destination "app\icon.png"
```

Expected: no output, file appears at `app/icon.png`.

- [ ] **Step 3: Copy the Apple touch icon**

Run:
```powershell
Copy-Item "handoffs\design_handoff\apple-touch-icon.png" -Destination "app\apple-icon.png"
```

Expected: no output, file appears at `app/apple-icon.png`.

- [ ] **Step 4: Verify all three files exist**

Run:
```powershell
Get-ChildItem app\icon.svg, app\icon.png, app\apple-icon.png | Select-Object Name, Length
```

Expected output (sizes will vary):
```
Name            Length
----            ------
icon.svg           ...
icon.png           ...
apple-icon.png     ...
```

- [ ] **Step 5: Run a production build to confirm no errors**

Run:
```powershell
npm run build
```

Expected: build completes with `Export successful`. The static export in `out/` will include the favicon assets. No type errors or build failures.

- [ ] **Step 6: Verify the build output contains the favicon files**

Run:
```powershell
Get-ChildItem out\ -Filter "*.svg","*.png" -Recurse | Select-Object FullName
```

Expected: `icon.svg`, `icon.png`, and `apple-icon.png` (or their hashed equivalents) appear in `out/`.

