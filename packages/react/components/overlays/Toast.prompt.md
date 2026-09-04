NbToastr: Toast card (icon disc + title + message) and ToastContainer stacking toasts in a viewport corner.

```jsx
<ToastContainer position="top-right" toasts={[{id:1,status:'success',title:'Salvo',message:'Dataset atualizado.'}]} onClose={…} />
```

- positions: top-right | top-left | bottom-right | bottom-left (+ start/end aliases).
- `destroyByClick` (default) closes on click.
