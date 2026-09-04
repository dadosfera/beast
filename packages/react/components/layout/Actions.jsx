import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../core/Badge.jsx';

// NbActions / NbAction: horizontal row of icon actions separated by dividers (header toolbars). medium: 2.25rem tall, padding 0 1.25rem.
const H = { tiny: '1.5rem', small: '2rem', medium: 'var(--actions-medium-height)', large: '2.75rem', giant: '3.25rem' };
export function Actions({ items = [], size = 'medium', fullWidth, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: fullWidth ? '100%' : undefined, fontFamily: 'var(--font-family-primary)', ...style }}>
      {items.map((a, i) => (
        <a key={i} href={a.link || '#'} onClick={(e) => { e.preventDefault(); a.onClick && a.onClick(); }} title={a.title}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', height: H[size], padding: 'var(--actions-medium-padding)', flex: fullWidth ? 1 : undefined, borderLeft: i ? 'var(--divider-width) var(--divider-style) var(--divider-color)' : 0, color: a.disabled ? 'var(--text-disabled-color)' : 'var(--text-basic-color)', textDecoration: 'none', fontSize: 'var(--text-button-medium-font-size)', fontWeight: 700, lineHeight: 'var(--text-button-medium-line-height)', cursor: a.disabled ? 'not-allowed' : 'pointer', position: 'relative' }}>
          {a.icon && <Icon icon={a.icon} size="1.25rem" style={{ color: a.disabled ? 'var(--text-disabled-color)' : 'var(--text-hint-color)' }} />}
          {a.text && <span>{a.text}</span>}
          {a.content}
          {a.badge && <Badge text={a.badge.text} status={a.badge.status} dotMode={a.badge.dotMode} style={{ position: 'absolute', top: 0, right: '.75rem' }} />}
        </a>
      ))}
    </div>
  );
}
