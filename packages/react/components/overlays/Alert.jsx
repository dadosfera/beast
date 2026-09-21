import React from 'react';
import { Icon } from '../core/Icon.jsx';

// NbAlert: filled status block, padding 1rem 1.125rem, subtitle text. accent adds a top bar; outline adds a 1px status border on a basic bg.
export function Alert({ children, status = 'basic', accent, outline, closable, onClose, size, style }) {
  const basic = status === 'basic';
  const bg = outline ? 'var(--background-basic-color-1)' : basic ? 'var(--background-basic-color-2)' : status === 'control' ? 'var(--color-control-default)' : `var(--color-${status}-default)`;
  const fg = outline || basic || status === 'control' ? 'var(--text-basic-color)' : 'var(--text-control-color)';
  const H = { tiny: '3.5rem', small: '5.25rem', medium: '7rem', large: '8.75rem', giant: '10.5rem' };
  return (
    <div role="alert" style={{ position: 'relative', padding: 'var(--alert-padding)', paddingLeft: closable ? 'var(--alert-closable-start-padding)' : undefined, borderRadius: 'var(--alert-border-radius)', background: bg, color: fg, border: outline ? `1px solid var(--color-${outline}-default)` : 0, borderTop: accent ? `.25rem solid var(--color-${accent}-default)` : undefined, fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600, lineHeight: 'var(--text-subtitle-line-height)', minHeight: size ? H[size] : undefined, ...style }}>
      {closable && <button type="button" aria-label="Fechar" onClick={onClose} style={{ position: 'absolute', left: '1rem', top: '.875rem', border: 0, background: 'transparent', color: 'inherit', cursor: 'pointer', padding: 0, display: 'inline-flex' }}><Icon icon="close-outline" size="1.25rem" /></button>}
      {children}
    </div>
  );
}
