NbMenu: vertical navigation list with icons, groups, badges and expandable children; active item is primary with a left bar.

```jsx
<Menu items={[{title:'Coleta',icon:'coletar'},{group:true,title:'Dados'},{title:'Catálogo',icon:'catalogo',children:[{title:'Tabelas'}]}]} onSelect={…} />
```

- `compact` hides labels (for compacted sidebar).
- item: {title, icon, link, group, children, badge:{text,status}, expanded, hidden}.
