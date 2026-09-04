# Beast — Dadosfera Design System

Beast is the design system of **Dadosfera** (dadosfera.ai), a Brazilian data platform ("Coletar, Explorar, Catalogar, Analisar, Inteligência, Entregar"). Created in January 2022, it is built on Akveo's **Eva Design System** specification and its Angular implementation **Nebular**, re-themed with Dadosfera's colors (indigo primary `#1700a2`), Quicksand typography and a set of custom module/data-type icons. Its platform attribute is **"Beautiful & Intuitive"**: simple, intuitive, beautiful experiences.

## Sources

- GitHub: https://github.com/dadosfera/beast (branch `master`) — Angular 13 monorepo. Key paths read:
  - `src/framework/theme/styles/themes/_default.scss` — the Dadosfera theme (all color/type/radius/shadow values in this DS)
  - `src/framework/theme/styles/themes/_mapping.scss` — Eva component variable mapping (paddings, sizes, states)
  - `src/framework/theme/styles/themes/_dark.scss` — dark theme overrides
  - `src/framework/eva-icons/customIcons.ts` — 72 Dadosfera custom SVG icons
  - `src/framework/theme/components/pagination/*` — Beast's own Pagination component
  - `docs/structure.ts`, `docs/articles/**`, `docs/app/**` — the showcase site (copy, layout, styles)
- Beast showcase: https://dadosfera.github.io/beast
- Referenced but not accessible from here (listed in `docs/articles/design-system/resources.md`): brand fonts and logos on Google Drive, a Google Slides presentation template, and the Figma UI kit `https://www.figma.com/proto/Nmq3X58lbHw5pUdRfM24wB/Index`.

Explore the repo for more detail; this DS is a faithful React recreation of the Angular library, not the library itself.

## Products represented

1. **Beast component library** (`@beast/theme`) — 40+ Angular components consumed by Dadosfera's platform. Recreated here as React components.
2. **Beast showcase/docs site** — the public documentation site (home + docs pages). Recreated in `ui_kits/beast-docs`.
3. *Dadosfera platform* — not in the repo; `ui_kits/platform-shell` is an illustrative app shell using the theme and module icons (see its README disclaimer).

## Content fundamentals

- **Language:** Brazilian Portuguese everywhere in product/docs copy ("Bem vindo ao Beast", "Selecione", "Recolher", "Exibir … de … itens"). Component/API names stay in English (`primary`, `outline`, `nbButton`). Mixed PT/EN headings are accepted in docs ("Tema dark", "Overview").
- **Tone:** institutional, explanatory, warm but formal. Sentences are complete and descriptive; no slang, no exclamation-heavy marketing. Example: "Nossas cores, quando utilizadas corretamente, melhoram a comunicação e reforçam nossa marca."
- **Voice:** first-person plural for the company ("Nós possuímos 5 cores semânticas", "nossa marca", "Nos siga") and direct second person for the reader ("você encontra", "Baixe as principais fontes").
- **Casing:** sentence case for headings and buttons ("Bem vindo ao Beast", "Documentação", "Novo dataset"). Tabs are the one uppercase element (`text-transform: uppercase` in tabset). Button text is `text-transform: none`.
- **Emoji:** none in product UI. The GitHub README uses a few (:boom:, :star:) — engineering culture only.
- **Numbers/dates:** pt-BR formats (dd/mm/yyyy, 1.482).
- **Pagination text:** "Exibir [select] de N itens".
- **Vibe:** clean, corporate-friendly SaaS; emphasis on clarity and consistency over flair.

## Visual foundations

- **Color:** deep indigo primary `#1700a2` (500) with hover 700 `#14008a`, focus/active 600; cyan secondary `#28a1ce`; three warm auxiliary accents (`#cc6d29`, `#cc3e29`, `#e10b69`); semantic green `#4db04f`, cyan info `#3bbff0`, orange warning `#ff9800`, red danger `#ef4444`. Neutrals are pure grays (`#fff` → `#101426`), text basic `#5c5c5c`. Every semantic color has six alpha tints (8–48%) used for outline/ghost hover & focus states. Docs site uses its own palette: hero `#4d69bd`, headings `#0d1c2e`, muted text `#919fb1`, highlight `#40dc7e`.
- **Type:** Quicksand for everything (primary = secondary family); headings 700 from 36/48 (h1) to 18/24 (h6); subtitle 15/22 600 is the control text (inputs, card headers, options); paragraph 16/24; labels/captions 12/16; buttons 700 in 10/12/14/16/18. The docs site itself uses the system font stack. Line heights are generous (1.5×).
- **Spacing:** rem based, literal per component (button md `.6875rem 1.125rem`, input `.5rem 1rem`, card `1.25rem 1.5rem`, menu item `.75rem 1rem`, tab `1rem 2rem`, layout `2.25rem 2.25rem .75rem`). Card bottom margin 1.875rem.
- **Backgrounds:** flat solid surfaces. Layout background `#f2f2f2` (basic-3), cards/header/sidebar white. No gradients in product UI; the docs hero is a solid blue with a subtle line texture (`bg.svg`) and a concave SVG curve into `#f9f9f9`. Code blocks use a dark blue gradient `linear-gradient(225deg,#333c66,#1d2447)`.
- **Corner radii:** `.25rem` default (buttons, inputs, badges, alerts, popovers), `.5rem` cards, `.75rem` semi-round, `1.5rem` round buttons and tags, `100px` toggle, `3px` checkbox, `50%` radio/stepper index.
- **Borders:** 1px everywhere. Inputs/selects `#c8c8c8` (basic-6) → primary on focus; cards `#eeeeee` (basic-4); dividers `#f2f2f2` (basic-3); tree grid cells basic-2.
- **Shadows:** a single token `0 0 8px rgba(0,0,0,.25)` on header, sidebar, footer, popover, context menu, toast, accordion, chat. **Cards have no shadow** (`card-shadow: none`), alerts none, option lists none. Docs cards: `0 8px 20px rgba(218,224,235,.6)`; docs feature cards hover `0 8px 24px rgba(0,31,97,.07)`.
- **Focus:** `.375rem` outline ring in `basic-transparent-200` on buttons/inputs.
- **Hover:** darker fill for filled buttons (500→700), translucent status tint (8→16%) for outline/ghost, basic-2 background for inputs/options/calendar cells, primary text for menu items and tabs. **Press:** 600 shade / 24% tint; no scale transforms.
- **Animation:** short eases (`.15s`) on colors; progress bar `400ms`; flip/reveal cards `.5–.6s cubic-bezier`. No bounces.
- **Transparency & blur:** alpha tints only for state layers, disabled (`basic-transparent-300` fills, `basic-transparent-600` text) and dialog backdrop (`rgba(0,0,0,.288)`). No blur except a hint on spinner overlays.
- **Layout:** fixed header 4.75rem, sidebar 16rem (compact 3.5rem), footer 4.725rem, content max 900px in window mode. Docs: header 4.25rem, content 1140/1440px, settings column 19rem.
- **Imagery:** flat vector illustrations (line + fill, blue/indigo) for docs features; component collage hero. No photography.
- **Dark theme** exists (basic backgrounds flip to 800–1100, shadow `0 .5rem 1rem #1a1f33`).

## Iconography

- **Eva Icons** is the default and only icon pack (`NbEvaIconsModule`, 480+ glyphs). Outline style (`name-outline`) is the norm in menus, actions, inputs; filled for emphasis. Default size `1.25rem`, line-height 1, `text-hint-color` in menus/actions, status colors via `status`. Loaded here from CDN: `https://unpkg.com/eva-icons@1.1.3/eva.min.js`.
- **Dadosfera custom icons** — 72 SVGs registered into the eva pack (`assets/icons/custom-icons.js`, `window.BeastCustomIcons`): platform modules (`coletar`, `explorar`, `catalogo`, `analisar`, `inteligencia`, `entrega`, `controlar`, `verificar`, `qualidade`, `dashboard`, `dataset`, `report`, `data-app`, `models`, `notebooks`, `view`, `pipeline(s)`, `pipelines-ai`, `live-view`, `embed-analytics`, `app-builder-2`, `consulta`, `magic`, `metabase`, `workspaces`, `todos`, `dadosfera`, `relatorio`) and data types/formats (`string`, `integer`, `float`, `boolean`, `date`, `timestamp`, `geography`, `object`, `array`, `variant`, `csv`, `json`, `parquet`, `table`, …). Mostly `fill: currentColor` solid glyphs.
- Docs illustrations: `assets/img/{intro,themes,components,guides}.svg`, hero collage `hero-components.svg`, hero texture `bg.svg`, concave divider `concave.svg`.
- No icon font, no PNG icons, no emoji, no unicode-as-icon (except "…" in pagination dots).
- Social icons in the footer: eva `github`, `linkedin`, `facebook`.

## Logos

- `assets/img/beast-logo-1.png` — Beast wordmark with dragon mark (docs header). `beast-logo.png` — alternate.
- `assets/img/dadosfera-somente-d.svg` — Dadosfera "D" mark (footer). Full Dadosfera wordmark is **not** in the repo (lives on Drive) — use the D mark or plain type.

## Index

- `styles.css` — imports `tokens/fonts.css`, `colors.css`, `typography.css`, `layout.css`, `components.css`, `base.css`.
- `guidelines/` — 17 specimen cards (Colors, Type, Spacing, Brand groups).
- `assets/img/`, `assets/icons/custom-icons.js`.
- `components/` — React components, `.d.ts` contracts, `.prompt.md` usage, one card per group.
- `ui_kits/beast-docs/` — docs site (home + docs page). `ui_kits/platform-shell/` — app shell.
- `SKILL.md`, `github.md`, `thumbnail.html`.

## Components

Inventory = the Nebular/Beast component list from `docs/structure.ts`. Namespace: `window.BeastDadosferaDesignSystem_d7d0ae`.

- core/: `Icon`, `Button`, `ButtonGroup`, `Badge`, `Tag`, `TagList`, `Spinner`, `ProgressBar`, `User`
- forms/: `Input`, `Checkbox`, `Radio`, `RadioGroup`, `Toggle`, `Select`, `OptionList`, `Autocomplete`, `Calendar`, `CalendarRange`, `Datepicker`, `Rangepicker`, `TimePicker`
- layout/: `Layout`, `LayoutHeader`, `LayoutBody`, `LayoutColumn`, `LayoutFooter`, `Sidebar`, `Menu`, `Tabset`, `RouteTabset`, `Actions`, `Card`, `CardHeader`, `CardBody`, `CardFooter`, `FlipCard`, `RevealCard`, `Accordion`, `List`, `ListItem`, `Stepper`
- overlays/: `Alert`, `Toast`, `ToastContainer`, `Tooltip`, `Popover`, `ContextMenu`, `Dialog`, `Window`
- extra/: `Search`, `Chat`, `ChatMessage`, `Pagination`, `TreeGrid`

Not recreated (services/directives without UI): NbLayoutDirection (RTL), Infinite List directive (covered by `List.onScrollEnd`), Calendar Kit internals, Auth/Security modules, DateTimePicker (compose `Datepicker` + `TimePicker`).

Intentional additions: `LayoutBody` (flex row wrapper for sidebar + column, implicit in nb-layout), `OptionList` export (shared by Select/Autocomplete), `ToastContainer` (stands in for NbToastrService positions).

## Fonts

Quicksand is loaded from Google Fonts (`tokens/fonts.css`). The repo has no font binaries — the brand fonts are on a Dadosfera Google Drive. If the brand uses a licensed cut, drop the files into `assets/fonts/` and replace the `@import` with `@font-face` rules.
