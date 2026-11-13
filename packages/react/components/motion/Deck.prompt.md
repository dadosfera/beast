Deck, Slide and DeckNav: a presentation player whose slides reveal everything on entry or one sub-scene per step.

```jsx
<Deck defaultMode="scenes" style={{ width: 1280, height: 720 }}>
  <Slide breadcrumb="2. Metodologia › Data First" chip="Visão executiva" title="IA começa pela fundação" scenes={2} footer="© Dadosfera">
    <Scene index={1}><Reveal>Cinco camadas sustentam a IA</Reveal></Scene>
    <Scene index={2}><Reveal>Saídas confiáveis e escala sustentável</Reveal></Scene>
  </Slide>
  <Slide title="Primeiro valor. Depois, escala." scenes={1}>
    <Scene index={1}><Reveal variant="left">MVP em produção</Reveal></Scene>
  </Slide>
</Deck>
```

- `Deck`: `mode` / `defaultMode` all | scenes; `index` / `defaultIndex` / `onIndexChange`. One slide is mounted at a time, so entrances replay on entry.
- Next reveals the slide's following sub-scene and only then moves to the next slide; previous steps a scene back and only then returns to the slide before, on its last scene.
- `Slide`: `breadcrumb`, `chip`, `title`, `tone` light | primary, `footer`, `scenes` (how many `Scene`s it has), `nav={false}` to hide the controls.
- `DeckNav` (rendered in the Slide footer): reveal-by-scenes toggle, previous, counter with scene dots, next, replay.
- Keyboard while focus is inside the deck: ArrowRight / PageDown / Space, ArrowLeft / PageUp, Home / End. A polite live region announces "Slide 2 de 10, cena 1 de 3".
- Copy is pt-BR sentence case; override with `labels`.
