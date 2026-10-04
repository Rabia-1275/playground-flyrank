# NOTES: Accessible component fundamentals (FE-05)

## What I built

Three interactive components in `playground/`, written from scratch in
React + TypeScript with no component libraries:

- `Disclosure`: a button that shows and hides a panel
- `Tabs`: a tab list with tab panels
- `Modal`: a dialog rendered in a portal on `document.body`

Each one follows the matching W3C ARIA Authoring Practices pattern. I tested
all three using only the keyboard. TypeScript runs in strict mode and no
component props use `any`.

## Keyboard behavior

**Disclosure**
- A native `<button>`, so Enter and Space work without extra code.
- `aria-expanded` shows the state. `aria-controls` points to the panel id.

**Tabs**
- Roles: `tablist`, `tab`, `tabpanel`.
- `aria-selected`, `aria-controls` (tab to panel), `aria-labelledby` (panel to tab).
- Roving tabindex: the active tab has `tabIndex=0`, the others have `-1`.
- Left and Right arrows move between tabs and wrap around. Home and End jump
  to the first and last tab.
- Automatic activation: a tab is selected as soon as it receives focus.
- Tab moves focus from the active tab straight into the panel.

**Modal**
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the title.
- On open, focus moves to the first focusable element inside.
- Tab and Shift+Tab are trapped inside. The focusable elements are queried on
  every keypress, so adding more buttons needs no extra code.
- Escape closes the modal. Clicking the overlay also closes it.
- On close, focus returns to the element that opened it.
- Background scroll is locked while open.

## What shadcn handled that I missed

I installed the shadcn `dialog` and `tabs`, read the source, and compared them
with my versions in the browser. `dialog.tsx` imports its primitive from
`@base-ui/react`, so the dialog behavior comes from Base UI, and the shadcn
file is mostly a styled wrapper around it. Every item below is something I
saw in DevTools or the console, not something I assumed.

1. **The background is not hidden from assistive technology.**
   - Mine: while my modal is open, `#root` has `aria-hidden=null` and
     `inert=false` (checked in the console). A screen reader can still reach
     the page behind the modal.
   - shadcn: while its dialog is open, `#root` has `aria-hidden="true"`.
   - Why it matters: `aria-modal="true"` alone is not reliably honored by every
     browser and screen reader combination, so hiding the background
     explicitly is safer.

2. **No `aria-describedby`.**
   - Mine: the dialog only has `aria-labelledby`.
   - shadcn: the dialog has both `aria-labelledby` and `aria-describedby`
     (through `DialogDescription`).
   - Why it matters: a screen reader can announce the supporting text when the
     dialog opens, not only the title.

3. **Focus escape is only handled for the Tab key.**
   - Mine: my trap only intercepts Tab and Shift+Tab inside the dialog. If
     focus leaves by any other route, nothing pulls it back.
   - shadcn (Base UI): it renders `data-base-ui-focus-guard` sentinel spans
     (`tabindex="0"`, `aria-hidden="true"`) before and after the dialog.
   - Why it matters: the guards catch focus that escapes by other means,
     and my code does not.

4. **Disabled tabs are not supported at all.**
   - Mine: `TabItem` has no `disabled` option, and I made no decision about how
     arrow keys should treat an unavailable tab.
   - shadcn: a disabled trigger gets `aria-disabled="true"`, `data-disabled`
     and `tabindex="-1"`. In my test the arrow keys still moved focus onto it
     (it was not skipped), but it was not selected, and the next arrow press
     moved on.
   - Why it matters: a user of assistive technology can discover that the tab
     exists, and the behavior is a deliberate, consistent policy.

5. **No built-in way to close the dialog.**
   - Mine: the consumer has to add their own Close button, and nothing forces
     them to.
   - shadcn: the dialog ships with an X close button (`data-slot="dialog-close"`).
   - Why it matters: a modal with no visible exit is a trap for keyboard users
     if the consumer forgets to add one. Escape still works, but it should not
     be the only way out.

## What I learned

- Writing the ARIA attributes was the easy part. The hard part was the
  behavior around them: focus management, restoring focus, and edge cases.
- A styled library component can look simple because the real accessibility
  work lives in the primitive underneath (Base UI here).
- Testing with the keyboard alone, and then inspecting the DOM, found gaps that
  looking at the screen never would have.

## What I'd do differently

- Set `aria-hidden` (or use `inert`) on the background while the modal is open,
  and remove it on close.
- Add `aria-describedby` support to `Modal`.
- Add `disabled` to `TabItem` and decide on one arrow-key policy for it.
- Add a `vertical` orientation to `Tabs` (Up and Down arrows).
- Add a built-in close button to `Modal`.
- Give the demo inputs visible labels instead of placeholder text only.