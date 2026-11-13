MotionStage and Scene: a root that owns the choreography of what is inside it, all at once or one sub-scene per step.

```jsx
<MotionStage mode="scenes" scenes={3}>
  {({ scene, scenes, next, previous, replay, atEnd }) => (
    <>
      <Scene index={1}><Reveal as="h3">Fundação</Reveal></Scene>
      <Scene index={2}><Reveal>Resultados</Reveal></Scene>
      <Scene index={3}><Reveal>Comparação</Reveal></Scene>
      <Button onClick={next} disabled={atEnd}>Próxima cena</Button>
    </>
  )}
</MotionStage>
```

- `mode`: all (default; scene N starts N × `--motion-scene-gap` after entry) | scenes (enters with scene 1, `next()` reveals the following one).
- `scenes`: how many sub-scenes exist. `scene` / `defaultScene` / `onSceneChange` for controlled use.
- `held` suspends every entrance; `replay()` restarts them.
- `controls`: a ref that receives `{ scene, scenes, mode, next, previous, replay, goTo, atStart, atEnd }`.
- Keyboard works only while focus is inside the stage: ArrowRight / PageDown / Space advance, ArrowLeft / PageUp go back, Home / End jump. `keyboard={false}` turns it off.
- A hidden scene is `visibility: hidden`: it keeps its space and leaves the accessibility tree until revealed.
