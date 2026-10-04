# Accessible Components Playground (FlyRank FE-05)

Three interactive components built from scratch in React + TypeScript, with no
component libraries, following the W3C ARIA Authoring Practices patterns:

- **Disclosure**: `src/components/Disclosure.tsx`
- **Tabs**: `src/components/Tabs.tsx`
- **Modal**: `src/components/Modal.tsx`

shadcn/ui `dialog` and `tabs` are installed under `src/components/ui/` only
for comparison.

**Findings:** see [NOTES.md](./NOTES.md) for what shadcn handled that my
versions missed.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173 and try everything with the keyboard only
(Tab, Shift+Tab, Enter, Space, Escape, arrows, Home/End).

## Stack

React, TypeScript (strict), Vite, Tailwind CSS, shadcn/ui (comparison only)