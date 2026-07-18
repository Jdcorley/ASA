<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Lumen — agent guide

Lumen is a Brilliant-style mobile learning app: short creative modules made of interactive steps and mini-games. Content is data-driven JSON so the product owner can steer learning design from the Cursor iPhone app without editing React for every new lesson.

## Stack

- Next.js App Router + TypeScript + Tailwind CSS v4
- Package manager: **pnpm**
- Tests: **Vitest**
- Progress: `localStorage` (no auth yet)
- Content: `content/modules/*.json`

## Commands

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # unit tests for engine + content
pnpm lint
pnpm build
```

## Product model (how to extend learning)

Modules live in `content/modules/<module-id>.json` and are registered in `src/lib/learning/modules.ts`.

### Step types (prefer these when the user describes an interaction)

| type | Use when the learner should… |
|---|---|
| `explain` | Read a short concept beat (no answer) |
| `choice` | Pick one correct option |
| `multiSelect` | Pick all options that apply |
| `order` | Arrange items (weak→strong, low→high, etc.) |
| `match` | Pair left items to right answers |
| `number` | Enter a numeric answer (`tolerance` optional) |

### Authoring rules

1. Keep copy short — mobile first, one idea per step.
2. Every interactive step needs a clear `prompt`, helpful `hint`, and encouraging `success`.
3. Prefer concrete scenes (recipes, maps, sounds) over abstract jargon.
4. After adding a JSON module, import + append it in `src/lib/learning/modules.ts`.
5. Add/adjust Vitest coverage if you change `src/lib/learning/engine.ts`.
6. Do not invent new step types unless the user asks; extend the engine + a step view together if you must.

### Example prompt → content mapping

User: “Make a lesson where they drag sound pitches from low to high, then type how many cycles happen in 2 seconds at 4 Hz.”

Agent should:

1. Add/edit a module JSON lesson with an `order` step (bass → talk → whistle style) and a `number` step (answer `8`).
2. Keep the lesson playable end-to-end.
3. Run `pnpm test` and smoke the lesson path in the browser if possible.

## App routes

- `/` — brand hero + live step preview
- `/learn` — module catalog
- `/learn/[moduleId]` — module overview + lesson list
- `/learn/[moduleId]/play/[lessonId]` — full-screen lesson player
- `/progress` — local completion dashboard

## Cursor Cloud specific instructions

1. Use **pnpm** (lockfile is `pnpm-lock.yaml`).
2. After dependency changes, run `pnpm install`.
3. Before finishing a feature: `pnpm test && pnpm lint && pnpm build`.
4. Start the app with `pnpm dev --hostname 0.0.0.0 --port 3000` (also configured in `.cursor/environment.json`).
5. When verifying UI, exercise a full lesson path (answer correctly and incorrectly) and capture a screenshot/video artifact of the mobile-width layout (~390px).
6. Prefer content/JSON changes for new learning material; touch React only for new interaction types or UX shell work.
7. Keep the experience installable on iPhone via the web app manifest (`src/app/manifest.ts`).

## Design constraints

- Mobile-first, app-like shell with bottom nav (hidden during lesson play).
- Brand **Lumen** must stay a strong visual signal on the home viewport.
- Avoid generic purple gradients, Inter/Roboto defaults, and dense dashboard chrome.
- Existing visual language: cool wash background, ink (`#0F1A2A`), coral accent (`#E85D4C`), teal success (`#1FA7A0`), Syne + Figtree.
