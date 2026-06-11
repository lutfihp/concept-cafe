# Favicon Integration — Design Spec

**Date:** 2026-06-11  
**Status:** Approved

## Summary

Add the brand favicon assets from the design handoff (`handoffs/design_handoff/`) to the Next.js 14 App Router project. The App Router uses file-based metadata conventions — placing files with the correct names in `/app` automatically emits the right `<link>` tags in every page's `<head>`.

## Assets

The favicon mark is a tomato-colored rounded square (`#E8552D`, `rx=16`) with a cream ◓ glyph (ring + filled semicircle) rotated -6°, matching the brand header logo.

Three files are provided:

| Handoff file | Purpose |
|---|---|
| `favicon.svg` | SVG brand mark — scales to any size |
| `favicon-32.png` | 32×32 PNG fallback for older browsers |
| `apple-touch-icon.png` | 180×180 PNG for iOS/Android home-screen shortcuts |

## Implementation

Copy each asset into `/app` with the name the App Router expects:

| Source | Destination | Auto-generated tag |
|---|---|---|
| `handoffs/design_handoff/favicon.svg` | `app/icon.svg` | `<link rel="icon" type="image/svg+xml">` |
| `handoffs/design_handoff/favicon-32.png` | `app/icon.png` | `<link rel="icon" type="image/png" sizes="32x32">` |
| `handoffs/design_handoff/apple-touch-icon.png` | `app/apple-icon.png` | `<link rel="apple-touch-icon">` |

No changes to `layout.tsx` or `metadata` are required — the App Router discovers these files automatically.

## Out of scope

- `favicon.ico` (not provided; browsers fall back to `icon.svg`/`icon.png`)
- Any changes to layout, metadata, or other files
