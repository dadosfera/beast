# UI kit — Beast showcase site (docs)

Recreation of the Beast documentation site (`dadosfera.github.io/beast`), the product surface that ships in the `dadosfera/beast` repo.

Screens (hash routes in `index.html`):
- `#home` — hero on `#4d69bd` with `bg.svg`, concave SVG divider, four illustration cards (Introdução, Branding, Componentes, Recursos), footer.
- `#docs` — documentation page: 4.25rem header with main menu + search, 16rem sidebar with the `docs/structure.ts` menu, content cards with page tabs (Overview / API / Theme / Examples), right TOC column.
- `#componentes`, `#cores`, `#recursos` — same shell, different content (copy from `docs/articles`).

Files: `Shared.jsx` (header, footer), `Home.jsx`, `DocsPage.jsx`. Composes DS components: Layout, Sidebar, Menu, Card, Tabset, Button, Input, Select, Checkbox, Toggle, Alert, Search.

Note: the docs site uses the system font stack (per `docs/app/@theme/styles/themes.scss`), not Quicksand; Quicksand is the product theme font.
