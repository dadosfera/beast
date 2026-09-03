NbBadge: tiny status label, optionally pinned to a corner of a relative parent, or a dot.

```jsx
<div style={{position:'relative'}}><Badge text="12" status="danger" position="top right" />…</div>
```

- `position`: "top left" | "top right" | "bottom left" | "bottom right" | "center left" | "center right".
- `dotMode` renders a .6rem dot with no text.
