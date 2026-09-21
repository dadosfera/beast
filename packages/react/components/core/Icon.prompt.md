Renders an Eva Icons glyph (Beast default pack) or a Dadosfera custom icon (coletar, catalogo, inteligencia, data-app, pipelines…) by name.

```jsx
<Icon icon="search-outline" /> <Icon icon="catalogo" status="primary" size="1.5rem" />
```

- Eva names end in `-outline` for the outline style (e.g. `home-outline`); filled variants omit it.
- `status` colors the glyph with the semantic color; default is currentColor.
- Requires `https://unpkg.com/eva-icons@1.1.3/eva.min.js` and `assets/icons/custom-icons.js` loaded on the page.
