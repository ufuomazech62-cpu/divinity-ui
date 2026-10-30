# Divinity Companion — UI/UX Showcase

A **frontend-only** showcase of the Divinity Companion world app: every dashboard page,
element and interaction — chats, world, discover, contacts, profile — built with Next.js 16,
TypeScript and Tailwind CSS 4.

- **No landing page, no sign-in, no backend** — opens straight into the dashboard.
- All data is static demo content (`src/components/showcase/data.ts`).
- Mobile-first (bottom tabs) with a desktop mode (left rail) — toggle top-right.
- Navigate by tapping; press `Esc` to go back. Interactions show demo toasts.

> Live: https://ufuomazech62-cpu.github.io/divinity-ui/

## Run locally

```bash
bun install
bun dev
```

## Build

```bash
bun run build   # static export to ./out
```

## Structure

```
src/components/showcase/
  data.ts          # all mock content (characters, chats, moments, wallet, shop…)
  kit.tsx          # design-system primitives (avatars, cells, sheets, toasts…)
  app.tsx          # shell: phone frame, nav stack, tab bar, desktop rail
  pages-*.tsx      # chat / world / discover / contacts / profile pages
```

Design tokens mirror the production app: brand violet `#7c5bd9 → #9b7deb`,
canvas `#f4f1fb`, ink `#1c1430`, soft violet borders, 28–32px radii.
