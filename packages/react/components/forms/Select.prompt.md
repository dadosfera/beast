NbSelect with NbOption / NbOptionGroup: outline dropdown (min 13rem) opening a bordered option list; selected option is primary-filled.

```jsx
<Select options={['Coleta','Processamento','Catálogo']} placeholder="Módulo" />
<Select multiple options={[{group:'Fontes',options:['S3','Postgres']}]} />
```

- `multiple` shows checkboxes in the list. `appearance` outline | filled.
- `OptionList` is exported for Autocomplete and custom dropdowns.
