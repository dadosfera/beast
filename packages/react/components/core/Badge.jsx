import React from 'react';

// NbBadge: small status label, absolutely positioned inside a relative parent when `position` is set.
const POS = {
  'top left': { top: 0, left: 0 }, 'top right': { top: 0, right: 0 }, 'bottom left': { bottom: 0, left: 0 }, 'bottom right': { bottom: 0, right: 0 },
  'top start': { top: 0, left: 0 }, 'top end': { top: 0, right: 0 }, 'bottom start': { bottom: 0, left: 0 }, 'bottom end': { bottom: 0, right: 0 },
  'center left': { top: '50%', left: 0, transform: 'translateY(-50%)' }, 'center right': { top: '50%', right: 0, transform: 'translateY(-50%)' },
};
export function Badge({ text, status = 'basic', position, dotMode, style }) {
  const bg = status === 'basic' ? 'var(--background-basic-color-2)' : status === 'control' ? 'var(--color-control-default)' : `var(--color-${status}-default)`;
  const fg = status === 'basic' || status === 'control' ? 'var(--color-basic-800)' : 'var(--text-control-color)';
  return (
    <span style={{
      position: position ? 'absolute' : 'relative', ...(position ? POS[position] : {}), zIndex: 1,
      display: 'inline-block', padding: dotMode ? 'var(--badge-dot-padding)' : 'var(--badge-padding)', borderRadius: dotMode ? '.5rem' : 'var(--badge-border-radius)',
      fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-button-tiny-font-size)', lineHeight: 'var(--text-button-tiny-line-height)', fontWeight: 'var(--text-button-font-weight)',
      background: bg, color: fg, textAlign: 'center', whiteSpace: 'nowrap', ...style,
    }}>{dotMode ? '' : text}</span>
  );
}
