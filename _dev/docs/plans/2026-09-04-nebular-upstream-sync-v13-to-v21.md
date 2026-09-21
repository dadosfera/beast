# Nebular upstream sync — staged Angular 13 → 21 migration plan

**Status**: Scoped, not started
**Created**: 2026-09-04
**Repo**: dadosfera/beast
**Fork point**: `07ddd8cb` (2022-08-04, Nebular 9.1.0-rc.1)
**Target**: `upstream/master` `06095546` (2026-01-15, Nebular 17.0.0, Angular 21)

## Executive summary

`dadosfera/beast` forked `akveo/nebular` at Nebular 9.1.0-rc.1 in August 2022. Since then
upstream produced **48 commits** and we produced **203**. A plain `git merge upstream/master`
produces **78 conflicted files**, and none of them are trivial: zero are files we left untouched,
zero differ only by whitespace. Every conflict is code both sides genuinely changed.

**The key structural finding is that those 78 conflicts are not 78 decisions.**

Upstream's 48 commits split into two very different halves:

| Half | Commits | Nature | Conflicts |
|------|---------|--------|-----------|
| Feature work on Angular 13 (9.1.0-rc.2 → rc.8) | 17 | Real product changes to menu, theming, datepicker, select | **19** |
| Angular version bumps (Nebular 10 → 17) | 31 | `ng update` output: reformatting, `standalone: false`, dep bumps | the remaining 59 |

Merging only up to `5df8d50b` (v9.1.0-rc.8, **still Angular 13**) yields 19 conflicts, of which
only **three are real code**. The other 59 conflicts are *generated* by the version bumps — they
are `ng update` migration output, which you do not hand-resolve. You re-run the migration on our
code and let it produce the same transformation.

This turns an intimidating 78-file merge into: **3 real decisions, then 8 mechanical `ng update`
runs.** The plan below is built around that split.

## Version ladder

| Stage | Nebular | Angular | Upstream commit | Node |
|-------|---------|---------|-----------------|------|
| 1 | 9.1.0-rc.8 | **13 (unchanged)** | `5df8d50b` | 16 |
| 2 | 10.0.0 | 14.2 | `5b6edcd9` | 16 → 18 |
| 3 | 11.0.0 / 11.0.1 | 15 | `976deb3a` | 18 |
| 4 | 12.0.0 | 16 | `ae0f0280` | 18 |
| 5 | 13.0.0 | 17 | `4202d211` | 18 |
| 6 | 14.0.0 → 14.0.2 | 18 | `6b53c712` | 18 → 20 |
| 7 | 15.0.0 | **19** | `192a0de5` | 20 |
| 8 | 16.0.0 | 20 | `0f4f8df7` | 20 |
| 9 | 17.0.0 | 21 | `06095546` | 20.19.5 |

Current: `@angular/core ^13.0.0`, `typescript ~4.4.4`, `.nvmrc 16.13.0`.
Target: `@angular/core ^21.0.0`, `typescript ~5.9.2`, `.nvmrc 20.19.5`.

## The three focus areas

### Icons — LOW risk

**Upstream touched icon code exactly once in four years**, and only as part of the Angular 19
bump (`58f0db97`, adding `standalone: false`). There is no upstream redesign of the icon system
to reconcile with.

Our icon work (custom SVGs, `embed_analytics`, `magic`, menu lock icon, removed layer icons) is
**additive** — new entries in our own icon pack. None of those files conflict.

The only icon-adjacent conflicts are peripheral:

| File | Nature |
|------|--------|
| `src/framework/theme/components/icon/icon.component.spec.ts` | test formatting |
| `src/framework/eva-icons/package.json` | version bump |
| `src/playground/with-layout/tabset/tabset-icon.component.ts` | showcase, `standalone: false` |
| `src/playground/with-layout/toastr/toastr-icon.component.ts` | showcase, `standalone: false` |

**Action**: none in Stage 1. Icon risk is concentrated entirely in Stage 7 (standalone flip),
where custom icon packs registered via `NbIconLibraries` need their module registration checked.

### Menu — LOW/MEDIUM risk, and fully combinable

This is the conflict that looked most dangerous and turns out to be the cleanest.

Upstream `7ce24c03` (#3136, "improve accessibility") and our lock feature touched the same file,
`menu-item.component.html`, and **both sides applied the same prettier reformatting to it**. Once
formatting is discounted, the two changes are strictly additive:

| Side | Change to `NbMenuItem` |
|------|------------------------|
| Upstream | `ariaRole?: string;` + `[attr.role]="menuItem.ariaRole"` on each anchor |
| Ours | `locked?: { value: boolean; tooltip?: string; tooltipStatus?: string };` + `lockedTemplate` |

Our side also replaced `[class.active]="menuItem.selected"` with
`[class]="{ active: menuItem.selected, locked: menuItem.locked?.value }"` and gated the badge
behind `!menuItem.locked?.value`.

**There is no semantic collision.** Resolution is to keep both: upstream's `[attr.role]` binding
alongside our `[class]` object and locked/badge templates, on all four anchor variants.

**Watch**: `7ce24c03` also refactored property names in `menu.service.ts` and changed
`menu-autocollapse.component.ts`. Our `lockedTemplate` renders `nb-tooltip` — verify the tooltip
API across Stages 3–7, since `NbTooltip` positioning moved with CDK overlay changes.

### Theming — MEDIUM/HIGH risk, the real work

`_mapping.scss` is the single conflicted style file, and it carries **deliberate brand decisions**,
not drift. Confirmed examples of our customization:

```
button-filled-text-transform:   uppercase  →  none
button-outline-text-transform:  uppercase  →  none
button-ghost-text-transform:    uppercase  →  none
button-hero-text-transform:     uppercase  →  none
card-border-radius:             border-radius → border-radius-large
card-padding:                   1rem 1.5rem   → 1.25rem 1.5rem
card-padding-large:             (new)         → 2.625rem
button-outline-*-background-color: color-*-transparent-default → color-basic-100
input-basic-background-color:   background-basic-color-2 → background-basic-color-1
input-basic-border-color:       border-basic-color-4 → border-basic-color-6
```

The button text-transform change is corroborated by the design system's own contributing rule
("tabs uppercase, buttons never"), so these values are load-bearing brand and **must survive**.

Upstream's changes to the same file are:
- new `*-focus-and-hover-*` token pairs for input and select (`54da7145`, #3108)
- changed default hover values (`background-basic-color-2 → 3`, `border-basic-color-6 → 4`)

**Resolution rule for `_mapping.scss`: adopt every new upstream token key; keep our value for
every key we deliberately changed.** Where upstream changed a default we also changed, ours wins.

**Additional theming hazards by stage**:
- Stage 6: `364d6dae` (#3271) fixes a Sass strict-unary deprecation in `_get-value.scss`. Our 12
  style commits may contain the same pattern and will start warning, then erroring.
- Stages 7–9: Angular 19+ ships a modern Sass compiler. Upstream has partially migrated to `@use`
  namespacing (`theming-variables.$nb-theme-name`) while our tree is `@import`-based. This is the
  most likely source of a hard build break in the back half.

## Stage plan

### Stage 0 — Baseline and harness

Before any merge, establish that the current integration branch builds, so later failures are
attributable.

```bash
nvm install 16.13.0 && nvm use 16.13.0
npm ci --legacy-peer-deps
npm run build:packages
```

Note we still pass `--legacy-peer-deps` where upstream has dropped it; that flag is a standing
signal of peer-dependency debt and should be removable by Stage 9.

**Exit criteria**: green `build:packages` on the integration branch, recorded as the baseline.

### Stage 1 — Absorb Nebular 9.1.0-rc.2 → rc.8 (no Angular change)

```bash
git merge 5df8d50b
```

19 conflicts, in three classes:

| Class | Count | Handling |
|-------|-------|----------|
| Version/meta (`package.json` ×9, lockfiles ×2, `CHANGELOG.md`) | 12 | mechanical — take upstream versions, keep our name/scope fields |
| Playground module registration (datepicker, select, timepicker, with-layout routing) | 4 | mechanical — union of both module lists |
| **Real code** — `menu-item.component.html`, `_mapping.scss`, `date-timepicker.component.ts` | **3** | the decisions described above |

This stage also brings in features worth having independent of the migration: select-with-
autocomplete keyboard nav, more input color options, datepicker/timepicker combination inputs,
timepicker disabled state, and menu accessibility.

**Exit criteria**: `build:packages` green on Angular 13, menu lock still renders with tooltip,
button text-transform still `none` in a rendered theme.

**This is the only stage that requires product judgment. Everything after is mechanical.**

### Stages 2–9 — Version bumps

For each stage: merge the upstream release commit, then let Angular's own migrations do the work
rather than hand-resolving the conflicts they cause.

```bash
git merge <release-commit>          # accept upstream for ng-update-generated churn
npx ng update @angular/core@<N> @angular/cli@<N> @angular/cdk@<N>
npm run build:packages && npm test
```

Per-stage notes:

- **Stage 2 (Angular 14.2)** — `f3f05cec` removes the *bootstrap playground showcase*. The
  `src/framework/bootstrap` package itself survives upstream, and our prebuilt bootstrap themes
  are untouched. Accept the modify/delete conflicts on `src/playground/without-styles/bootstrap/*`
  by taking the deletion. Bump `.nvmrc` to 18.
- **Stage 3 (Angular 15)** — `MatDialog`/CDK overlay changes; check `NbDialog`, `NbPopover`,
  `NbTooltip` positioning.
- **Stage 4 (Angular 16)** — `takeUntilDestroyed` era; RxJS 7 strictness surfaces here.
- **Stage 5 (Angular 17)** — new control flow available but not mandatory; keep `*ngIf` to
  minimise diff against upstream.
- **Stage 6 (Angular 18)** — includes `63d1d6cb` (`NbTreeGrid` `CDK_TABLE` provider fix) and the
  Sass unary deprecation fix. Apply the same Sass fix to our style commits. Bump `.nvmrc` to 20.
- **Stage 7 (Angular 19) — highest risk.** Angular flips components to standalone by default;
  upstream's answer was to stamp `standalone: false` on every declaration. This is the source of
  the majority of the 59 version-bump conflicts. Our custom icon-pack registration and menu module
  need explicit review here, not just migration output.
- **Stage 8 (Angular 20)** — mostly dependency movement.
- **Stage 9 (Angular 21)** — final; set `.nvmrc` to 20.19.5 and align CI with upstream's matrix.

## Verification

Node versions needed are already available locally except 16 (`nvm install 16.13.0`); 18.20.8 and
20.19.5 are present. Per stage:

1. `npm run build:packages` — the gate; must be green before the next stage.
2. `npm test` — unit suite. Several conflicted files are `.spec.ts`, so expect churn.
3. Visual check of the three focus areas: menu lock + tooltip, button text-transform, card radius
   and padding, input background/border.
4. Commit each stage separately so a regression can be bisected to one Angular version.

## Risks

| Risk | Stage | Mitigation |
|------|-------|------------|
| Sass `@import` → `@use` break | 7–9 | budget a dedicated Sass migration pass; upstream's files show the target shape |
| Brand tokens silently reverted to upstream defaults | 1 | explicit keep-ours rule for `_mapping.scss`; visual check in exit criteria |
| `standalone: false` missed on our custom declarations | 7 | review our menu and icon-pack modules by hand, not just `ng update` output |
| Peer-dependency debt (`--legacy-peer-deps`) | all | track it; aim to drop the flag by Stage 9 |
| e2e suite (Protractor) is dead upstream | 5+ | Protractor was removed from Angular in v15; expect to drop or rewrite `e2e/` |

## Explicitly out of scope

`packages/` — the design system merged in PR #6 — **has zero conflicts with upstream** and is
framework-agnostic tokens plus React. It is unaffected by every stage here and must not be
coupled to this migration.

## Open question

This plan assumes beast keeps tracking `akveo/nebular`. With 203 divergent commits, a product
that is now largely Dadosfera's own, and 15 open PRs inherited from upstream, the alternative is
to de-fork and stop syncing. That decision should be made *before* Stage 1, because it makes the
entire plan moot.
