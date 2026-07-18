# Lumen

Interactive learning modules and mini-games — a Brilliant-style app you can grow from your iPhone with Cursor Cloud Agents.

## Why this setup

- **Mobile web app** (Next.js) so agents can build, run, and test in Linux VMs
- **JSON content modules** so you can describe learning interactions in chat and agents translate them into lessons
- **Phone-first Cursor config** (`.cursor/environment.json` + `AGENTS.md`) for development from the Cursor iOS app

## Quick start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm test
pnpm lint
pnpm build
```

## Create learning content from your phone

In the Cursor iOS app, say things like:

> Add a new Math module about percentages with an explain step, a multiple-choice tip calculation, and an order step ranking discounts from smallest to largest savings.

The agent should edit `content/modules/*.json` and register the module in `src/lib/learning/modules.ts`.

## Seed modules

| Module | Subject |
|---|---|
| Ratio Instinct | Math |
| Binary Thinking | Computer Science |
| Wave Patterns | Science |

## Dedicated GitHub repo (recommended)

This project may start life on a branch of another repository because the Cursor GitHub App is currently scoped to one repo. For the clean phone-first workflow:

1. Create a new empty GitHub repo (e.g. `Jdcorley/lumen`) from Safari/GitHub mobile
2. Grant the Cursor GitHub App access to that repo
3. Push this codebase as `main`
4. Create a Cloud Agent environment snapshot from the Cursor dashboard
5. Launch future agents against **lumen**, not the old study-guide repo
