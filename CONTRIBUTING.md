# Branch policy — read this first

**`master` is production.** This is not a pre-alpha branch.

- Every push to `master` **auto-deploys the public docs site** (`.github/workflows/deploy-docs.yml`, trigger `push: master`).
- `master` is the production source for package releases. `npm run release` validates and then runs `publish`; `publish` logs into the configured AWS CodeArtifact npm registry and invokes `tools/publish.sh`. **This is a separate command, not an automatic consequence of merging.** Client applications consume released packages in production.
- There is no `release/{stage}` promotion lane. A merge into `master` changes the production source and triggers the public docs deployment; package publication and consumer dependency updates remain explicit steps.

Because of that, `dadosfera/beast` is registered as **HIGH CRITICAL** in docs-fera and is
**out of scope for the branch-protection bypass command (`/gbyp_git_protection_bypass`)** in both
of its scenarios. The only way into `master` is:

1. a pull request,
2. with **observed-green CI** — `build-packages` at minimum,
3. **reviewed and merged by Allan Sene (CTO)**. Record the review in the promotion PR. No admin bypass, no `--admin` merge, no direct push.

Feature, design-system and documentation work targets **`integration/luis-martins` first**.
Create each topic branch from the fetched, pinned integration commit, and open its PR
against that integration branch. Framework upgrades and upstream syncs follow the
same path. Do not rename `master` to `main` or change a PR target to production as a
shortcut. Promotion is a separate reviewed PR from integration to `master`.

The promotion PR records the integration SHA, included changes, observed checks,
consumer validation, migration steps and rollback plan. Source approval, package
publication and application rollout are separate events; record each one when it
happens. See [brand governance and consumer tracking](docs/articles/design-system/brand-governance.md).

Canonical references (docs-fera): `references/dadosfera_apps_index/fera_repos_index.md`
(register of record), `standards/lifecycle/lifecycle_standard.md` §Delivery lanes,
`decisions/2026-09-04_main_merge_gate_is_ci_not_review_bypass.md` §Known exceptions.

---

# Contributing to Beast

Contributions to Beast should preserve the existing brand, component contracts and
the integration policy above.

- [Code of Conduct](#coc)
- [Question or Problem?](#question)
- [Issues and Bugs](#issue)
- [Feature Requests](#feature)
- [Submission Guidelines](#submit-pr)
- [Framework Structure](#framework-structure)
- [Coding Rules](#rules)
- [New Feature Checklist](#new-feature-checklist)
- [Commit Message Guidelines](#commit)

## <a name="coc"></a> Code of Conduct

Help us keep Nebular open and inclusive. Please read and follow our [Code of Conduct][coc].

## <a name="question"></a> Got a Question or Problem?

Please do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [StackOverflow][stackoverflow] where the questions should be tagged with tag `nebular`.

StackOverflow is a much better place to ask questions since:

- there are thousands of people willing to help on StackOverflow
- questions and answers stay available for public viewing so your question / answer might help someone else
- StackOverflow's voting system assures that the best answers are prominently visible.

To save your and our time, we will be systematically closing all the issues that are requests for general support and redirecting people to StackOverflow.

## <a name="issue"></a> Found an Issue?

If you find a bug in the source code or a mistake in the documentation, you can help us by
[submitting an issue](#submit-issue) to our [GitHub Repository][github]. Including an issue
reproduction (via CodePen, JsBin, Plunkr, GitHub repo, etc.) is the absolute best way to help the team quickly
diagnose the problem. Screenshots and error stack traces are also helpful.

Please follow this simple checklist before submitting:

- If you have a question about using Nebular, please ask on the [StackOverflow][stackoverflow].

- It is required that you clearly describe the steps necessary to reproduce the issue you are running into. Although we would love to help our users as much as possible, diagnosing issues without clear reproduction steps is extremely time-consuming and simply not sustainable.

- The issue list of this repository is exclusively for bug reports and feature requests. Non-conforming issues will be closed immediately.

- Issues with no clear steps to reproduce will not be triaged. If an issue is labeled with "needs info" and receives no further replies from the author of the issue for more than 5 days, it will be closed.

- If you think you have found a bug, or have a new feature idea, please start by making sure it hasn't already been [reported][issues]. You can search through existing issues to see if there is a similar one reported. Include closed issues as it may have been closed with a solution.

- Next, [create a new issue](#submit-issue) that thoroughly explains the problem. Please fill out the populated issue form before submitting the issue.

## <a name="feature"></a> Want a Feature?

You can _request_ a new feature by [submitting an issue](#submit-issue) to our [GitHub
Repository][github]. If you would like to _implement_ a new feature, please submit an issue with
a proposal for your work first, to be sure that we can use it.
Please consider what kind of change it is:

- For a **Major Feature**, first open an issue and outline your proposal so that it can be
  discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
  and help you to craft the change so that it is successfully accepted into the project.
- **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, search the archive, maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue.
Help us to maximize the effort we can spend fixing issues and adding new
features by not reporting duplicate issues. Please make sure to fill out the populated issue form before submitting the issue.

You can file new issues by providing the information [here][new_issue].

### <a name="submit-pr"></a> Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

- Search [GitHub][pulls] for an open or closed PR
  that relates to your submission. You don't want to duplicate effort.
- Make your changes in an isolated worktree from a freshly fetched integration commit:

  ```shell
  git fetch --no-tags origin refs/heads/integration/luis-martins:refs/remotes/origin/integration/luis-martins
  BEAST_BASE_SHA=$(git rev-parse --verify 'refs/remotes/origin/integration/luis-martins^{commit}')
  git worktree add --no-track -b fix/my-fix ../beast-wt-live-my-fix "$BEAST_BASE_SHA"
  ```

  Record the pinned base and owner in the local, git-ignored worktree status file,
  following the [Dadosfera worktree workflow](https://github.com/dadosfera/docs-fera/blob/main/guides/collaboration/multi_agent_worktree_workflow.md).
  Run subsequent edits and checks in that worktree; do not switch another agent's checkout.

- Create your patch, **including appropriate test cases**.
- Follow our [Coding Rules](#rules).
- Test your changes with our supported browsers.
- Commit your changes using a descriptive commit message that follows our
  [commit message conventions](#commit). Adherence to these conventions
  is necessary because release notes are automatically generated from these messages.

  ```shell
  git commit -a
  ```

  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

- Push your branch to GitHub:

  ```shell
  git push -u origin fix/my-fix
  ```

- In GitHub, send the pull request to **`dadosfera/beast:integration/luis-martins`**.
  Include the pinned base SHA, submitted SHA and verification results. A promotion
  PR to `master` follows the human approval rule at the top of this document.

That's it! Thank you for your contribution!

## <a name="framework-structure"></a> Framework Structure

- docs - Documentation and framework website built on top on the framework
- src
  - app - runner app for components playground
  - playground - independent module with runnable examples for each feature
  - backend - Small backend example
  - framework - Framework itself, divided into npm packages
    - theme - `@nebular/theme` npm package, main framework package
    - auth - `@nebular/auth` npm package, auth package (login, register, etc)
    - security - `@nebular/security` npm package, security framework package

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs (unit-tests).
- All public API methods **must be documented** following JsDoc notation.
- Never forget [document your changes add create some examples](#documentation)
- Create playground page per each new component/feature

## <a name="new-feature-checklist"></a> New Feature Checklist

- lint checks are passing
- tests are added/updated and passing
- showcase in the playground updated
- Styles variables added/updated
- tsdocs added/updated
- commit message is properly formatted
- for the override styles - registered in a list of overrides
- component \*.theme registered in a list of component themes
- looks great on all default themes
- supports bidirectionality
- requires approval from several core team contributors

## <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more
readable messages** that are easy to follow when looking through the **project history**. But also,
we use the git commit messages to **generate the Nebular change log**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of
the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is
the SHA of the commit being reverted.

### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system, CI configuration or external dependencies
  (example scopes: gulp, broccoli, npm)
- **chore**: Other changes that don't modify `src` or `test` files
- **release**: Release version commit

### Scope

The scope could be anything specifying place of the commit change. For example
`menu`, `sidebar`, etc.

### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

### Body

Optional. Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

Optional. The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.

[coc]: CODE_OF_CONDUCT.md
[github]: https://github.com/dadosfera/beast
[stackoverflow]: https://stackoverflow.com/questions/tagged/nebular
[issues]: https://github.com/dadosfera/beast/issues
[new_issue]: https://github.com/dadosfera/beast/issues/new
[pulls]: https://github.com/dadosfera/beast/pulls
## Design system layers

| Layer | Path | Contains | May depend on |
|---|---|---|---|
| Agnostic | `packages/design-system` | CSS tokens, assets, guidelines, readme, SKILL.md, `_ds_bundle.js` | nothing |
| Angular | `src/framework` (→ `packages/angular`) | Nebular-based components, Sass themes | design-system |
| React | `packages/react` | React recreations, UI kits | design-system |

Rules:
1. A visual value is added once, as a token in `packages/design-system/tokens`, and referenced by name in Sass and JSX. PRs that change `_default.scss` or `_mapping.scss` update the matching token.
2. Framework packages never ship brand assets; they reference `packages/design-system/assets`.
3. `_ds_bundle.js` and `_ds_manifest.json` are committed; regenerate them in the same PR as any change under `packages/react/components` or `tokens`.
4. New component families are added to `docs/structure.ts` first; React and Angular implementations share the name.
5. Copy is pt-BR sentence case; tabs uppercase, buttons never.
