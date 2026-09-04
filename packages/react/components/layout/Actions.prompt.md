NbActions: horizontal icon toolbar with dividers, used in headers (2.25rem tall, 0 1.25rem padding).

```jsx
<Actions items={[{icon:'search-outline'},{icon:'bell-outline',badge:{text:'2',status:'danger'}},{content:<User name="Ana" />}]} />
```

- item: {icon, text, content, badge, link, onClick, disabled}. `fullWidth` distributes evenly.
