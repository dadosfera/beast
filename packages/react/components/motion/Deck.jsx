import React, { useState, useRef, createContext, useContext } from 'react';
import { Button } from '../core/Button.jsx';
import { MotionStage } from './MotionStage.jsx';

// Deck: a presentation player over MotionStage. One slide is mounted at a time, so its entrances replay on entry.
// next() reveals the slide's next sub-scene and only then moves on; previous() steps a scene back and only then
// returns to the previous slide, landing on its last scene. Slide declares how many sub-scenes it has (`scenes`).
const DeckContext = createContext(null);
const LABELS = {
  deck: 'Apresentação', previousSlide: 'Slide anterior', nextSlide: 'Próximo slide', previousScene: 'Cena anterior', nextScene: 'Próxima cena',
  replay: 'Repetir animações', byScenes: 'Revelar por cenas', slide: 'Slide', scene: 'cena', of: 'de',
};
const GUTTER = 'calc(var(--space-8) * 2)';
const SR_ONLY = { position: 'absolute', width: 1, height: 1, margin: -1, padding: 0, border: 0, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' };
const TYPING = 'input,textarea,select,[contenteditable="true"]';
const CONTROL = 'a[href],button,summary';
const pick = (value, fallback) => (value === undefined ? fallback : value);
const pad = (value) => String(value).padStart(2, '0');

export function Deck({ children, index, defaultIndex = 0, onIndexChange, mode, defaultMode = 'all', onModeChange, keyboard = true, labels, style, onKeyDown, ...rest }) {
  const slides = React.Children.toArray(children).filter(React.isValidElement);
  const count = slides.length;
  const text = { ...LABELS, ...labels };
  const [innerIndex, setInnerIndex] = useState(defaultIndex);
  const [innerMode, setInnerMode] = useState(defaultMode);
  // Which scenes of which slide are revealed. A value kept for another slide counts as "first".
  const [reveal, setReveal] = useState({ slide: defaultIndex, at: 'first' });
  const stage = useRef(null);

  const current = Math.max(0, Math.min(pick(index, innerIndex), count - 1));
  const activeMode = pick(mode, innerMode);
  const slide = slides[current];
  const scenes = slide ? Number(slide.props.scenes) || 0 : 0;
  const stepped = activeMode === 'scenes' && scenes > 0;
  const first = Math.min(1, scenes);
  const at = reveal.slide === current ? reveal.at : 'first';
  const scene = !stepped || at === 'last' ? scenes : at === 'first' ? first : Math.max(first, Math.min(at, scenes));

  const goToSlide = (target, land = 'first') => {
    if (target < 0 || target >= count || target === current) return false;
    setInnerIndex(target);
    setReveal({ slide: target, at: land });
    if (onIndexChange) onIndexChange(target);
    return true;
  };
  const revealScene = (value) => { setReveal({ slide: current, at: value }); return true; };
  const next = () => (stepped && scene < scenes ? revealScene(scene + 1) : goToSlide(current + 1, 'first'));
  const previous = () => (stepped && scene > first ? revealScene(scene - 1) : goToSlide(current - 1, 'last'));
  const setMode = (value) => {
    setInnerMode(value);
    setReveal({ slide: current, at: 'first' });
    if (onModeChange) onModeChange(value);
  };
  const replay = () => { if (stage.current) stage.current.replay(); };
  const api = {
    index: current, count, scene, scenes, mode: activeMode, stepped, text, next, previous, replay, setMode, goToSlide,
    atStart: current === 0 && (!stepped || scene <= first), atEnd: current >= count - 1 && (!stepped || scene >= scenes),
  };

  const handleKeyDown = (event) => {
    if (onKeyDown) onKeyDown(event);
    if (!keyboard || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target;
    if (target.closest && target.closest(TYPING)) return;
    const onControl = target !== event.currentTarget && target.closest && target.closest(CONTROL);
    let handled = false;
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || (event.key === ' ' && !onControl)) handled = next();
    else if (event.key === 'ArrowLeft' || event.key === 'PageUp') handled = previous();
    else if (event.key === 'Home') handled = goToSlide(0);
    else if (event.key === 'End') handled = goToSlide(count - 1);
    if (handled) event.preventDefault();
  };

  return (
    <DeckContext.Provider value={api}>
      <div role="region" aria-roledescription="apresentação" aria-label={text.deck} tabIndex={keyboard ? 0 : undefined} onKeyDown={handleKeyDown} {...rest}
        style={{ position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'var(--font-family-primary)', color: 'var(--text-basic-color)', ...style }}>
        <MotionStage key={current} controls={stage} mode={stepped ? 'scenes' : 'all'} scenes={scenes} scene={scene} keyboard={false}
          style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {slide}
        </MotionStage>
        <span aria-live="polite" style={SR_ONLY}>
          {`${text.slide} ${current + 1} ${text.of} ${count}${stepped ? `, ${text.scene} ${scene} ${text.of} ${scenes}` : ''}`}
        </span>
      </div>
    </DeckContext.Provider>
  );
}

export function Slide({ breadcrumb, title, chip, tone = 'light', footer, nav = true, scenes, children, style, ...rest }) {
  const deck = useContext(DeckContext);
  const dark = tone === 'primary';
  const soft = dark ? 'var(--color-primary-100)' : 'var(--text-hint-color)';
  return (
    <section {...rest}
      style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', background: dark ? 'var(--color-primary-500)' : 'var(--background-basic-color-1)', color: dark ? 'var(--text-control-color)' : 'var(--text-basic-color)', ...style }}>
      {(breadcrumb || chip || title) && (
        <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', padding: `var(--space-6) ${GUTTER} 0` }}>
          {(breadcrumb || chip) && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
              <span className="motion motion-fade caption" style={{ color: soft }}>{breadcrumb}</span>
              {chip && (
                <span className="motion motion-fade label" style={{ padding: 'var(--space-1) var(--space-3)', borderRadius: 'var(--border-radius-round)', background: dark ? 'var(--color-basic-100)' : 'var(--color-primary-500)', color: dark ? 'var(--color-primary-500)' : 'var(--text-control-color)' }}>{chip}</span>
              )}
            </div>
          )}
          {title && <h1 className="motion motion-rise motion-delay-1" style={{ color: dark ? 'var(--text-control-color)' : 'var(--text-primary-color)' }}>{title}</h1>}
        </header>
      )}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: `var(--space-4) ${GUTTER} 0` }}>{children}</div>
      {(footer || (nav && deck)) && (
        <footer style={{ minHeight: 'var(--footer-height)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', padding: `0 ${GUTTER}` }}>
          <div className="caption" style={{ color: soft }}>{footer}</div>
          {nav && deck && <DeckNav tone={tone} />}
        </footer>
      )}
    </section>
  );
}

export function DeckNav({ tone = 'light', index, count, scene, scenes, mode, onPrevious, onNext, onReplay, onModeChange, labels, style }) {
  const deck = useContext(DeckContext) || {};
  const text = { ...LABELS, ...deck.text, ...labels };
  const slideIndex = pick(index, deck.index || 0);
  const slideCount = pick(count, deck.count || 0);
  const sceneCount = pick(scenes, deck.scenes || 0);
  const activeMode = pick(mode, deck.mode || 'all');
  const stepped = activeMode === 'scenes' && sceneCount > 0;
  const first = Math.min(1, sceneCount);
  const shown = stepped ? pick(scene, pick(deck.scene, first)) : sceneCount;
  const goPrevious = onPrevious || deck.previous;
  const goNext = onNext || deck.next;
  const doReplay = onReplay || deck.replay;
  const changeMode = onModeChange || deck.setMode;
  const sceneBack = stepped && shown > first;
  const sceneForward = stepped && shown < sceneCount;
  const dark = tone === 'primary';
  const status = dark ? 'control' : 'primary';
  const pressed = { background: dark ? 'var(--color-basic-control-transparent-300)' : 'var(--color-primary-transparent-200)' };
  const dots = [];
  for (let position = 1; position <= sceneCount; position += 1) {
    const on = position <= shown;
    dots.push(
      <span key={position} style={{ width: 'var(--space-2)', height: 'var(--space-1)', borderRadius: 'var(--border-radius)', background: on ? (dark ? 'var(--color-basic-100)' : 'var(--color-primary-500)') : (dark ? 'var(--color-basic-control-transparent-400)' : 'var(--color-basic-500)'), transition: 'background-color var(--motion-duration-instant) var(--motion-ease-state)' }} />,
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', ...style }}>
      <Button appearance="ghost" status={status} shape="round" icon="layers-outline" aria-label={text.byScenes} title={text.byScenes} aria-pressed={activeMode === 'scenes'}
        onClick={() => changeMode && changeMode(activeMode === 'scenes' ? 'all' : 'scenes')} style={activeMode === 'scenes' ? pressed : undefined} />
      <Button appearance="ghost" status={status} shape="round" icon="arrow-ios-back-outline" aria-label={sceneBack ? text.previousScene : text.previousSlide}
        disabled={slideIndex <= 0 && !sceneBack} onClick={() => goPrevious && goPrevious()} />
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-1)', minWidth: 'var(--space-10)' }}>
        <span className="label" style={{ color: dark ? 'var(--color-primary-100)' : 'var(--text-hint-color)' }}>{pad(slideIndex + 1)} / {pad(slideCount)}</span>
        {stepped && sceneCount > 1 && <span aria-hidden="true" style={{ display: 'flex', gap: 'calc(var(--space-1) / 2)' }}>{dots}</span>}
      </span>
      <Button appearance="ghost" status={status} shape="round" icon="arrow-ios-forward-outline" aria-label={sceneForward ? text.nextScene : text.nextSlide}
        disabled={slideIndex >= slideCount - 1 && !sceneForward} onClick={() => goNext && goNext()} />
      <Button appearance="ghost" status={status} shape="round" icon="refresh-outline" aria-label={text.replay} title={text.replay} onClick={() => doReplay && doReplay()} />
    </div>
  );
}
