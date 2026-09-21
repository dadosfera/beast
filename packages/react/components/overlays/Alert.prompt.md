NbAlert: block message filled with a status color (padding 1rem 1.125rem); `accent` adds a top bar, `outline` a colored border, `closable` a close icon.

```jsx
<Alert status="success">Pipeline executado com sucesso.</Alert>
<Alert outline="danger" closable onClose={…}>Falha na conexão.</Alert>
```


