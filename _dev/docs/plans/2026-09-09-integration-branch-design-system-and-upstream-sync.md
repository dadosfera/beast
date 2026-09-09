# Integration branch — Beast design system + Nebular upstream sync

**Status**: Code complete and verified; one PR left to open and merge
**Created**: 2026-09-09
**Repo**: dadosfera/beast
**Integration branch**: `integration/luis-martins`
**Sync branch**: `chore/sync-upstream-nebular` (`8b5cdf13`, pushed)

## Objective

Produce one integration branch carrying three things at once:

1. the framework-agnostic design system (tokens, assets, guidelines),
2. the React component placeholders,
3. every upstream `akveo/nebular` change since the 2022 fork.

## Where it stands

| Piece                                             | State                                                                                                    |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Agnostic design system (`packages/design-system`) | **On `integration/luis-martins`** — 6 token files, 16 guidelines, assets, `_ds_bundle.js`                |
| React components (`packages/react`)               | **On `integration/luis-martins`** — 37 `.jsx` families with `.d.ts` contracts, showcase cards, 2 UI kits |
| Upstream sync (Angular 13 → 21)                   | **Resolved and built on `chore/sync-upstream-nebular`**, not yet merged into the integration branch      |

PR #6 (design system) merged into `integration/luis-martins` at `88b64880`.

## The sync, in three commits

Staged deliberately so a regression bisects to one stage:

| Commit     | Content                                                                     |
| ---------- | --------------------------------------------------------------------------- |
| `acb4df5a` | Nebular 9.1.0-rc.2 → rc.8, **no Angular change**. 19 conflicts, 3 real code |
| `ab0a1494` | Nebular 10.0.0 → 17.0.0, Angular 14 → 21. 54 conflicts, ng-update churn     |
| `8b5cdf13` | `standalone: false` on our pagination components                            |

A single `git merge upstream/master` conflicts in **78** files. Merging the
feature-only half first (all 17 commits that never touch the Angular version)
cut the real decisions to three, and left the rest as regenerable migration output.

## Conflict resolutions worth remembering

- **Menu** — upstream's accessibility work (`ariaRole`, `aria-expanded`) and our
  lock feature (`locked?: {value, tooltip, tooltipStatus}` + `lockedTemplate`) are
  strictly additive. Both sides had applied the same prettier formatting, which is
  the only reason the file conflicted. All four anchor variants now carry both.
- **Theming** — `_mapping.scss` keeps our brand values and adopts upstream's 56 new
  `*-focus-and-hover-*` tokens. Those new tokens reference the hover keys _by name_,
  so they inherit our values automatically. Verified in the compiled CSS: buttons
  `text-transform: none`, tabs `uppercase`.
- **Fork identity** — all 8 packages are `@beast/*`, not `@nebular/*`, and the root
  package is `beast` at `9.1.0`. Upstream reintroduced `@nebular/*` imports in files
  it added; those were rewritten. `tsconfig` keeps the `@beast/*` path mapping.
- **Angular 21 toolchain** taken wholesale from upstream: dependencies,
  `zone.js ~0.15.0`, `useDefineForClassFields`, lockfiles, CI node 20.19.5,
  and the move from `.eslintrc.json` to flat `eslint.config.mjs`.
- **Deletions honoured in both directions** — Akveo marketing components
  (hubspot CTA, services banner, for-business, eva, components-promo) stay deleted
  because we had removed them; the bootstrap _playground showcase_ accepted upstream's
  deletion while the `@beast/bootstrap` package and its prebuilt themes are retained.

## Verification actually performed

- `npm install` on node 20.19.5 — clean, 2190 packages, **no `--legacy-peer-deps` needed**
  (upstream dropped the flag; our tree no longer needs it either).
- `npm run build:packages` — **passes**. It first failed with `NG6008`/`NG6004` on
  `NbPaginationComponent`: Angular 19 flipped the standalone default, upstream's
  `ng update` stamped `standalone: false` across their declarations, but pagination
  is ours so the migration never reached it. Those two were the only declarations in
  the whole tree lacking an explicit flag.
- `ng test --browsers=ChromeHeadless` — 135 failing specs, and a control run of
  **pristine `upstream/master`** fails the _same 135_, set-identical. **Zero regressions.**
  The failures are pre-existing `NG0100 ExpressionChangedAfterItHasBeenCheckedError`
  in Nebular 17 on Angular 21 in this environment, not ours.
- `packages/` untouched by both merges — the design system has **zero** conflicts with
  upstream, being framework-agnostic tokens plus React.

## Remaining work

- [ ] Open PR `chore/sync-upstream-nebular` → `integration/luis-martins` and merge it.
      That is the last step that puts all three deliverables on one branch.
- [ ] Merge PR #7 (`docs/nebular-v13-v21-migration-plan`), which documents the staged
      migration this branch executed.
- [ ] Remove the two leftover worktrees: `beast-wt-live-upstream-sync` and
      `beast-wt-control-upstream` (the pristine-upstream control).
- [ ] Decide `integration/luis-martins` → `master`. Blocked earlier only because the
      integration branch had no commits over master; that is no longer true.
- [ ] Run the e2e suite. Protractor was removed from Angular in v15, so `e2e/` likely
      needs dropping or rewriting — untouched by this work.

## Open question, unchanged

Whether beast should keep tracking `akveo/nebular` at all. This sync proves it is
tractable, but the fork carries 203 divergent commits, a renamed package scope, its
own `packages/` tree, and 15 open PRs inherited from upstream. De-forking would make
every future sync moot. Worth settling before the next upstream release.

## Links

- PR #6 (design system, merged): https://github.com/dadosfera/beast/pull/6
- PR #7 (migration plan): https://github.com/dadosfera/beast/pull/7
- `_dev/docs/plans/2026-09-04-nebular-upstream-sync-v13-to-v21.md` — the staged plan
- `_dev/docs/plans/2026-09-03-package-split.md` — the design-system package split
