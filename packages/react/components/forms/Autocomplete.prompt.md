nbAutocomplete: text input that filters an option list as you type.

```jsx
<Autocomplete options={['Snowflake','BigQuery','Redshift']} placeholder="Destino" />
```

- `onSelect(value)` fires on pick; `filter(option, query)` overrides the contains-match.
