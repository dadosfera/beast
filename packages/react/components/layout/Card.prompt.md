NbCard with CardHeader / CardBody / CardFooter, plus FlipCard and RevealCard variants. 1px basic-4 border, .5rem radius, no shadow.

```jsx
<Card status="primary"><CardHeader>Pipelines</CardHeader><CardBody>…</CardBody><CardFooter>…</CardFooter></Card>
```

- `status` colors the header; `accent` adds a top status bar; `size` tiny…giant fixes height.
- FlipCard {front, back} rotates on toggle; RevealCard slides the back up.
