NbTag / NbTagList: pill chips (1.5rem radius) in filled or outline appearance, optionally removable; TagList adds an inline input.

```jsx
<Tag text="Coleta" status="primary" removable />
<TagList tags={tags} onChange={setTags} />
```

- Tag: `appearance` filled | outline, `size` small | medium | large, `selected`, `removable` + `onRemove`.
- TagList: Enter or comma commits a new tag; Backspace removes the last one.
