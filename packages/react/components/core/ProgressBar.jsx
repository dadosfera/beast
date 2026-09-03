import React from 'react';

// NbProgressBar: value 0-100, optional displayValue label, sizes tiny..giant.
const H = { tiny: '.75rem', small: '1rem', medium: 'var(--progress-bar-medium-height)', large: '1.75rem', giant: '2.25rem' };
const FS = { tiny: '.625rem', small: '.75rem', medium: 'var(--text-subtitle-font-size)', large: '1rem', giant: '1.125rem' };
export function ProgressBar({ value = 0, status = 'basic', size = 'medium', displayValue, style }) {
  const v = Math.max(0, Math.min(100, value));
  const basic = status === 'basic';
  return (
    <div role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}
      style={{ height: H[size], borderRadius: 'var(--border-radius)', background: basic ? 'var(--background-basic-color-2)' : 'var(--background-basic-color-3)', overflow: 'hidden', ...style }}>
      <div style={{ width: `${v}%`, height: '100%', borderRadius: 'var(--border-radius)', background: basic ? 'var(--background-basic-color-4)' : `var(--color-${status}-default)`, transition: 'width var(--progress-bar-animation-duration) ease-in-out', display: 'flex', alignItems: 'center', justifyContent: 'center', color: basic ? 'var(--text-basic-color)' : 'var(--text-control-color)', fontFamily: 'var(--font-family-primary)', fontSize: FS[size], fontWeight: 600 }}>
        {displayValue && v > 8 ? `${v}%` : ''}
      </div>
    </div>
  );
}
