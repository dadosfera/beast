import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';

// NbCard / NbCardHeader / NbCardBody / NbCardFooter. .0625rem basic-4 border, .5rem radius, no shadow, padding 1.25rem 1.5rem.
// status colors the header (primary/success/...); accent adds a top border line.
const HEIGHT = { tiny: '13.5rem', small: '21.1875rem', medium: '28.875rem', large: '36.5625rem', giant: '44.25rem' };
export function Card({ children, status, accent, size, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--background-basic-color-1)', border: 'var(--card-border-width) solid var(--card-border-color)', borderRadius: 'var(--card-border-radius)', boxShadow: 'var(--card-shadow)', color: 'var(--text-basic-color)', fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-paragraph-font-size)', lineHeight: 'var(--text-paragraph-line-height)', overflow: 'hidden', height: size ? HEIGHT[size] : undefined, borderTop: accent ? `.25rem solid var(--color-${accent}-default)` : undefined, ['--card-status']: status || '', ...style }} data-status={status}>
      {React.Children.map(children, (c) => (c && c.type === CardHeader ? React.cloneElement(c, { status: c.props.status || status }) : c))}
    </div>
  );
}
export function CardHeader({ children, status, style }) {
  const colored = status && status !== 'basic';
  return (
    <div style={{ padding: 'var(--card-padding)', borderBottom: 'var(--divider-width) var(--divider-style) var(--divider-color)', background: colored ? (status === 'control' ? 'var(--color-control-default)' : `var(--color-${status}-default)`) : 'var(--card-header-basic-background-color)', color: colored ? (status === 'control' ? 'var(--color-basic-800)' : 'var(--text-control-color)') : 'var(--text-basic-color)', fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600, lineHeight: 'var(--text-subtitle-line-height)', ...style }}>{children}</div>
  );
}
export function CardBody({ children, style }) {
  return <div style={{ padding: 'var(--card-padding)', flex: 1, overflow: 'auto', position: 'relative', ...style }}>{children}</div>;
}
export function CardFooter({ children, style }) {
  return <div style={{ padding: 'var(--card-padding)', borderTop: 'var(--divider-width) var(--divider-style) var(--divider-color)', ...style }}>{children}</div>;
}

// NbFlipCard: front/back with a toggle icon in the corner; click flips.
export function FlipCard({ front, back, flipped, onFlip, showToggleButton = true, style }) {
  const [f, setF] = useState(false);
  const isF = flipped !== undefined ? flipped : f;
  const toggle = () => { setF(!isF); onFlip && onFlip(!isF); };
  const face = (node, back) => (
    <div style={{ position: back ? 'absolute' : 'relative', inset: 0, backfaceVisibility: 'hidden', transform: back ? 'rotateY(180deg)' : 'none' }}>
      {node}
      {showToggleButton && <span onClick={toggle} style={{ position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer', color: 'var(--text-hint-color)' }}><Icon icon="chevron-right-outline" size="1.25rem" /></span>}
    </div>
  );
  return (
    <div style={{ perspective: 1200, ...style }}>
      <div style={{ position: 'relative', transformStyle: 'preserve-3d', transition: 'transform .6s cubic-bezier(.4,0,.2,1)', transform: isF ? 'rotateY(180deg)' : 'none' }}>
        {face(front, false)}{face(back, true)}
      </div>
    </div>
  );
}

// NbRevealCard: the back slides up from the bottom to cover the front.
export function RevealCard({ front, back, revealed, onReveal, showToggleButton = true, style }) {
  const [r, setR] = useState(false);
  const isR = revealed !== undefined ? revealed : r;
  const toggle = () => { setR(!isR); onReveal && onReveal(!isR); };
  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--card-border-radius)', ...style }}>
      {front}
      <div style={{ position: 'absolute', inset: 0, transform: isR ? 'translateY(0)' : 'translateY(calc(100% - 3.25rem))', transition: 'transform .5s cubic-bezier(.4,0,.2,1)' }}>{back}</div>
      {showToggleButton && <span onClick={toggle} style={{ position: 'absolute', top: isR ? '1rem' : 'calc(100% - 2.25rem)', right: '1rem', cursor: 'pointer', color: isR ? 'var(--text-control-color)' : 'var(--text-hint-color)', transition: 'top .5s cubic-bezier(.4,0,.2,1)', display: 'inline-flex', transform: isR ? 'rotate(180deg)' : 'none' }}><Icon icon="chevron-up-outline" size="1.25rem" /></span>}
    </div>
  );
}
