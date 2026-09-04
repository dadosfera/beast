import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';

// nbTooltip: caption text, .5rem 1rem padding, dark (basic-1000) bubble; status variants fill with the status color (primary uses primary-900). max-width 16rem.
export function Tooltip({ children, text, icon, status = 'basic', position = 'top', trigger = 'hover', style }) {
  const [open, setOpen] = useState(false);
  const dark = status === 'basic';
  const bg = dark ? 'var(--tooltip-background-color)' : status === 'primary' ? 'var(--tooltip-primary-background-color)' : status === 'control' ? 'var(--color-control-default)' : `var(--color-${status}-default)`;
  const fg = status === 'control' ? 'var(--color-basic-800)' : 'var(--text-alternate-color)';
  const place = { top: { bottom: '100%', left: '50%', transform: 'translate(-50%,-8px)' }, bottom: { top: '100%', left: '50%', transform: 'translate(-50%,8px)' }, left: { right: '100%', top: '50%', transform: 'translate(-8px,-50%)' }, right: { left: '100%', top: '50%', transform: 'translate(8px,-50%)' } }[position];
  const arrow = { top: { top: '100%', left: '50%', transform: 'translateX(-50%)', borderColor: `${bg} transparent transparent transparent` }, bottom: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', borderColor: `transparent transparent ${bg} transparent` }, left: { left: '100%', top: '50%', transform: 'translateY(-50%)', borderColor: `transparent transparent transparent ${bg}` }, right: { right: '100%', top: '50%', transform: 'translateY(-50%)', borderColor: `transparent ${bg} transparent transparent` } }[position];
  const ev = trigger === 'click' ? { onClick: () => setOpen(!open) } : { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false), onFocus: () => setOpen(true), onBlur: () => setOpen(false) };
  return (
    <span style={{ position: 'relative', display: 'inline-flex', ...style }} {...ev}>
      {children}
      {open && (
        <span role="tooltip" style={{ position: 'absolute', ...place, zIndex: 1100, display: 'inline-flex', alignItems: 'center', gap: '.375rem', padding: 'var(--tooltip-padding)', maxWidth: 'var(--tooltip-max-width)', borderRadius: 'var(--border-radius)', background: bg, color: fg, boxShadow: 'var(--shadow)', fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-caption-font-size)', lineHeight: 'var(--text-caption-line-height)', fontWeight: 400, whiteSpace: 'nowrap' }}>
          {icon && <Icon icon={icon} size="1rem" />}{text}
          <span style={{ position: 'absolute', ...arrow, width: 0, height: 0, borderStyle: 'solid', borderWidth: 6 }} />
        </span>
      )}
    </span>
  );
}
