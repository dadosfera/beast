# Thinking Orbs — Beast React motion

Canonical source: `packages/react/motion/BeastThinkingOrb.tsx` in `dadosfera/beast`.
Uses [Thinking Orbs](https://github.com/Jakubantalik/thinking-orbs) by Jakub Antalik,
MIT licensed. Install **`thinking-orbs@0.3.1`** (exact version) and React 18 or later.
The upstream renderer is an npm dependency, not copied into Beast.

```tsx
import { BeastThinkingOrb } from "./BeastThinkingOrb";

<BeastThinkingOrb state="searching" label="Buscando documentos" />
<BeastThinkingOrb state="working" size={64} label="Processando solicitação" />
```

## Contract

- Nine upstream states, exposed as `BEAST_ORB_STATES`; 20px inline and 64px avatar presets.
- Always supply a localized `label` describing actual work. Keep visible text beside the orb.
- Use `aria-hidden` when adjacent text already describes the same activity.
- Default to `working` when the backend does not expose a precise activity. Do not infer
  searching/listening from elapsed time or pretend a phase completed.
- Completed and failed states retain their static icons; an orb means work is active.
- `theme="auto"` follows ancestor `dark`/`light` classes or `data-theme`, then OS preference.
  Pin the theme only when a surface intentionally differs. Preserve the monochrome renderer
  and Beast typography/colors in the host; do not add glow filters or a new brand palette.
- Upstream handles reduced motion with a static frame, pauses offscreen/hidden tabs,
  caps device pixel ratio, and cleans up observers and animation frames on unmount.
- The client boundary makes the wrapper usable in Next.js. Animation runs after mount.

## Source distribution and downstream updates

Beast's default branch does not currently publish a React package. Until it does,
consumers copy this **single adapter source** from an immutable Beast commit and record
its repository, path, commit and SHA-256 beside the copy. Install the pinned upstream
npm dependency in the consumer and commit its lockfile. Do not install the Beast root
Angular package into a React app. Update the canonical adapter here first, then sync
consumers in linked PRs. Do not hand-edit a consumer's copy.

Autodrive is the first consumer: replace the active processing header indicator in
`ThinkingSteps`, keep terminal icons and existing timeline semantics, and expose all
nine variants on `/ux-ui` for design review. Merge Beast first; the consumer PR must
identify the reviewed Beast commit and verify source parity.

## Validation

Validate the copied adapter with the consumer's TypeScript build and component tests.
Review `/ux-ui` in light/dark themes, at mobile and desktop widths, and with reduced
motion. Verify processing → completion/failure removes active animation. This module
is independent of Beast's Angular build and does not change its exports.
