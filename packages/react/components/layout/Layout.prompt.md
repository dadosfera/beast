NbLayout family: page shell with LayoutHeader (4.75rem, shadow), LayoutBody (sidebar + column row), LayoutColumn (padded content) and LayoutFooter.

```jsx
<Layout><LayoutHeader fixed>…</LayoutHeader><LayoutBody><Sidebar>…</Sidebar><LayoutColumn>…</LayoutColumn></LayoutBody><LayoutFooter>…</LayoutFooter></Layout>
```

- Layout background is basic-3 (#f2f2f2); column padding 2.25rem 2.25rem .75rem.
- `windowMode` constrains to 900px centered.
