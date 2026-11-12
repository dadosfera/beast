Reveal and Stagger: entrances, ambient loops and hover feedback from `tokens/motion.css` on any element.

```jsx
<Reveal as="h2" variant="rise">Data First</Reveal>
<Reveal variant="pop" loop="pulse" order={3}>IA</Reveal>
<Reveal variant="none" hover="lift" className="card">Saídas confiáveis</Reveal>
<div style={{ display: 'flex', gap: 'var(--space-2)' }}>
  <Stagger variant="rise" from={1}><Card>Fontes</Card><Card>Integração</Card><Card>Modelo</Card></Stagger>
</div>
```

- `variant`: rise (default) | fade | left | right | pop | grow-x | grow-y | draw | none. `draw` needs `pathLength="1"` on the svg path.
- `order`: place in the stagger; each step waits `--motion-stagger` (90ms). `scene`: sub-scene 1–12 of the enclosing `MotionStage`.
- `loop`: pulse | pulse-primary | float | march | blink. With an entrance it combines only with `pop` (float, pulse, pulse-primary); otherwise use `variant="none"`.
- `hover`: lift | tint. At most one or two loops per view, on the element that carries the message.
- `Stagger` clones its children instead of wrapping them; each child must accept `className` and `style`.
- Motion is short eases without bounce and is switched off under `prefers-reduced-motion`.
