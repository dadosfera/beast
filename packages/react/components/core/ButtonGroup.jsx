import React, { useState } from 'react';
import { Button } from './Button.jsx';

// NbButtonGroup + nbButtonToggle: adjacent buttons share a border-radius and are separated by a divider.
export function ButtonGroup({ options = [], value, defaultValue, multiple, onChange, appearance = 'filled', status = 'basic', size = 'medium', shape = 'rectangle', disabled, style }) {
  const [internal, setInternal] = useState(defaultValue ?? (multiple ? [] : null));
  const selected = value !== undefined ? value : internal;
  const isSel = (v) => (multiple ? (selected || []).includes(v) : selected === v);
  const toggle = (v) => {
    const next = multiple ? (isSel(v) ? selected.filter((x) => x !== v) : [...(selected || []), v]) : v;
    setInternal(next); onChange && onChange(next);
  };
  const divider = appearance === 'ghost' ? 'var(--color-basic-focus-border, var(--color-basic-500))' : status === 'basic' ? 'var(--color-basic-500)' : `var(--color-${status}-focus)`;
  return (
    <div role="group" style={{ display: 'inline-flex', ...style }}>
      {options.map((o, i) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        const sel = isSel(opt.value);
        const first = i === 0, last = i === options.length - 1;
        const r = shape === 'round' ? '1.5rem' : shape === 'semi-round' ? '.75rem' : 'var(--border-radius)';
        return (
          <Button key={opt.value} appearance={appearance} status={sel && appearance !== 'filled' ? status : status} size={size} disabled={disabled}
            icon={opt.icon} onClick={() => toggle(opt.value)} aria-pressed={sel}
            style={{
              borderRadius: `${first ? r : 0} ${last ? r : 0} ${last ? r : 0} ${first ? r : 0}`,
              borderLeftColor: first ? undefined : divider, borderLeftWidth: 1,
              background: sel && appearance === 'filled' ? (status === 'basic' ? 'var(--color-basic-active)' : `var(--color-${status}-active)`) : undefined,
              color: appearance === 'filled' && status === 'basic' ? 'var(--text-hint-color)' : undefined,
              ...(sel && appearance !== 'filled' ? { background: status === 'basic' ? 'var(--color-basic-transparent-300)' : `var(--color-${status}-transparent-active)` } : {}),
            }}>
            {opt.label}
          </Button>
        );
      })}
    </div>
  );
}
