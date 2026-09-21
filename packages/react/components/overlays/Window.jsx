import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';

// NbWindowService: a draggable-looking panel docked bottom-right with minimize / full-screen / close controls.
export function Window({ title, children, state: controlled, onStateChange, onClose, width = '26rem', style }) {
  const [internal, setInternal] = useState('default');
  const state = controlled || internal;
  const set = (s) => { setInternal(s); onStateChange && onStateChange(s); };
  const full = state === 'full-screen', min = state === 'minimized';
  const btn = (icon, act, label) => <button type="button" aria-label={label} onClick={act} style={{ border: 0, background: 'transparent', color: 'var(--text-hint-color)', cursor: 'pointer', padding: 0, display: 'inline-flex' }}><Icon icon={icon} size="1.25rem" /></button>;
  return (
    <div style={{ position: full ? 'fixed' : 'relative', ...(full ? { inset: '1.5rem' } : { width }), background: 'var(--background-basic-color-1)', border: '.0625rem solid var(--border-basic-color-4)', borderRadius: 'var(--border-radius-large)', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'var(--font-family-primary)', color: 'var(--text-basic-color)', zIndex: full ? 1040 : undefined, ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1rem 1.5rem', background: 'var(--background-basic-color-2)', borderBottom: min ? 0 : '1px solid var(--divider-color)', fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600, lineHeight: 'var(--text-subtitle-line-height)' }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
        <span style={{ display: 'inline-flex', gap: '.5rem' }}>
          {btn(min ? 'expand-outline' : 'minus-outline', () => set(min ? 'default' : 'minimized'), 'Minimizar')}
          {btn(full ? 'collapse-outline' : 'expand-outline', () => set(full ? 'default' : 'full-screen'), 'Tela cheia')}
          {btn('close-outline', onClose, 'Fechar')}
        </span>
      </div>
      {!min && <div style={{ padding: '1.25rem 1.5rem', flex: 1, overflow: 'auto' }}>{children}</div>}
    </div>
  );
}
