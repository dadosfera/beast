import React from 'react';

// NbSpinner: rotating ring. When `message` is given it renders inline with a label; when `overlay`, it covers the parent.
const SIZE = { tiny: '1.25rem', small: '1.5rem', medium: '2rem', large: '2.5rem', giant: '3rem' };
export function Spinner({ status = 'basic', size = 'medium', message, overlay, style }) {
  const c = status === 'basic' ? 'var(--color-basic-600)' : status === 'control' ? 'var(--color-control-default)' : `var(--color-${status}-default)`;
  const ring = (
    <span style={{ display: 'inline-block', width: SIZE[size], height: SIZE[size], borderRadius: '50%', border: `.125rem solid ${c}`, borderRightColor: 'transparent', animation: 'beast-spin .8s linear infinite', flexShrink: 0 }} />
  );
  return (
    <span style={{ display: overlay ? 'flex' : 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', ...(overlay ? { position: 'absolute', inset: 0, background: 'var(--color-basic-transparent-200)', backdropFilter: 'blur(1px)', zIndex: 5 } : {}), fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-button-medium-font-size)', fontWeight: 700, color: 'var(--text-basic-color)', ...style }}>
      <style>{'@keyframes beast-spin{to{transform:rotate(360deg)}}'}</style>
      {ring}{message && <span>{message}</span>}
    </span>
  );
}
