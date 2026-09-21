# Plan: split Beast into Angular / React / agnostic packages

Status: proposed · Owner: Luis Martins · Branch: `integration/luis-martins` → `master`

## Goal
One repo, three layers with a single dependency direction:

```
packages/
  design-system/   agnostic: tokens (CSS custom properties), assets, guidelines, readme, SKILL.md, _ds_bundle.js
  angular/         @beast/theme, eva-icons, auth, security, date-fns, moment (today: src/framework/**)
  react/           React recreations of every Beast family + UI kits
docs/              showcase site (unchanged)
```

`design-system` depends on nothing. `angular` and `react` depend on `design-system` only. No hex/spacing literal is added outside `design-system/tokens`.

## Decisions

1. **Move `src/framework` → `packages/angular`.** Yes, but in a separate mechanical PR after this one merges. Scope: `git mv`, update `angular.json` project roots, `tsconfig` paths (`@beast/*`), `ng-package.json` dests, gulp/docs scripts, lint globs. No code changes. Acceptance: `npm run build:packages`, `npm test`, `npm run docs:build` green.
2. **Commit `_ds_bundle.js`.** Yes. It is the compiled runtime consumers load and there is no build step for it in the repo, so it ships as a versioned artifact at `packages/design-system/_ds_bundle.js` together with `_ds_manifest.json`. Rule: regenerate and commit both in the same PR as any change under `packages/react/components` or `tokens`. Add a CI check that fails if `components/**` or `tokens/**` changed and the bundle did not.

## Phases

| # | PR | Branch | Contents |
|---|----|--------|----------|
| 1 | feat(design-system): agnostic tokens + React recreations | `feat/design-system-packages` → `integration/luis-martins` | `packages/design-system`, `packages/react`, CONTRIBUTING layer rules, CHANGELOG entry, this plan |
| 2 | chore(angular): move src/framework → packages/angular | `chore/move-angular-package` → `integration/luis-martins` | mechanical move + config updates |
| 3 | docs: point showcase at packages | `docs/packages-paths` → `integration/luis-martins` | `docs/themes.scss`, `docs/app/@theme/styles/themes.scss` imports |
| 4 | Integration → master | `integration/luis-martins` → `master` | draft PR opened at phase 1, marked ready after 3 |

## Token sync rule
`packages/design-system/tokens/*.css` mirrors `_default.scss` / `_mapping.scss`. Any PR touching those Sass maps updates the matching token. Future: generate tokens from the Sass export (`docs/themes.scss` already emits `output.json`) to remove the manual step.

## Open questions
- Publish `packages/react` to CodeArtifact as `@beast/react`, or keep it design-only?
- Keep Google Fonts Quicksand or vendor the Drive font files into `packages/design-system/assets/fonts`?
