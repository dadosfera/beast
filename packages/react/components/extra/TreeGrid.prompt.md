NbTreeGrid: data table with sortable headers, column filters and expandable child rows.

```jsx
<TreeGrid columns={[{key:'name',title:'Nome',sortable:true,filter:true},{key:'rows',title:'Linhas',sortable:true}]} rows={[{data:{name:'vendas',rows:1200},children:[{data:{name:'vendas_2024',rows:400}}]}]} />
```

- column.render(data,row) customizes a cell. `equalColumnsWidth` fixes the table layout.
