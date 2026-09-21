nbInput / NbFormField: text input (or textarea) with status border colors, sizes, shapes and prefix/suffix icon addons.

```jsx
<Input placeholder="E-mail" prefixIcon="email-outline" fullWidth />
<Input status="danger" defaultValue="abc" />
<Input multiline rows={4} />
```

- Text is subtitle (600); placeholder is paragraph (400) hint color.
- Focus ring: primary border + .375rem basic-transparent outline. Hover bg basic-2.
- `onSuffixClick` makes the suffix icon a button (clear/search).
