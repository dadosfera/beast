import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';

// MotionStage owns the choreography of everything inside it (tokens/motion.css).
// mode "all": every scene plays on entry, scene N starting N × --motion-scene-gap later.
// mode "scenes": the stage enters with scene 1 and reveals one more scene per next(). Hidden scenes are
// visibility: hidden, so they leave the accessibility tree and the tab order until they are revealed.
const TYPING = 'input,textarea,select,[contenteditable="true"]';
const CONTROL = 'a[href],button,summary';
const names = (...parts) => parts.filter(Boolean).join(' ');

export function MotionStage({ as: Tag = 'div', mode = 'all', scenes = 0, scene, defaultScene, onSceneChange, held = false, keyboard = true, controls, className, style, children, onKeyDown, tabIndex, ...rest }) {
  const stepped = mode === 'scenes' && scenes > 0;
  const first = Math.min(1, scenes);
  const clamp = (value) => Math.max(first, Math.min(value, scenes));
  const [inner, setInner] = useState(defaultScene === undefined ? first : defaultScene);
  const [replaying, setReplaying] = useState(false);
  const frame = useRef(0);
  const current = stepped ? clamp(scene === undefined ? inner : scene) : scenes;

  useEffect(() => { if (stepped) setInner(defaultScene === undefined ? first : defaultScene); }, [stepped]);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const goTo = (value) => {
    const target = clamp(value);
    if (!stepped || target === current) return false;
    setInner(target);
    if (onSceneChange) onSceneChange(target);
    return true;
  };
  const next = () => goTo(current + 1);
  const previous = () => goTo(current - 1);
  // Entrances restart when .is-held leaves after a painted frame; no timer, so no duration to keep in sync.
  const replay = () => {
    setReplaying(true);
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => { frame.current = requestAnimationFrame(() => setReplaying(false)); });
  };
  const api = { scene: current, scenes, mode: stepped ? 'scenes' : 'all', next, previous, replay, goTo, atStart: !stepped || current <= first, atEnd: !stepped || current >= scenes };
  useImperativeHandle(controls, () => api);

  const handleKeyDown = (event) => {
    if (onKeyDown) onKeyDown(event);
    if (!keyboard || !stepped || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target;
    if (target.closest && target.closest(TYPING)) return;
    const onControl = target !== event.currentTarget && target.closest && target.closest(CONTROL);
    let handled = false;
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || (event.key === ' ' && !onControl)) handled = next();
    else if (event.key === 'ArrowLeft' || event.key === 'PageUp') handled = previous();
    else if (event.key === 'Home') handled = goTo(first);
    else if (event.key === 'End') handled = goTo(scenes);
    if (handled) event.preventDefault();
  };

  const revealed = [];
  for (let index = 1; index <= current; index += 1) revealed.push(`at-${index}`);
  return (
    <Tag
      className={names('motion-stage', stepped && 'is-stepped', (held || replaying) && 'is-held', ...revealed, className)}
      style={style} tabIndex={tabIndex === undefined && keyboard && stepped ? 0 : tabIndex} onKeyDown={handleKeyDown} {...rest}>
      {typeof children === 'function' ? children(api) : children}
    </Tag>
  );
}

export function Scene({ index, as: Tag = 'div', className, children, ...rest }) {
  return <Tag className={names(`motion-scene-${index}`, className)} {...rest}>{children}</Tag>;
}
