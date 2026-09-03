import React, { useState } from 'react';

// NbRadio + NbRadioGroup: 1.25rem circle with primary inner dot.
export function Radio({ checked, onChange, label, children, value, name, status = 'basic', disabled, style }) {
  const color = status === 'basic' ? 'var(--color-primary-default)' : `var(--color-${status}-default)`;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-subtitle-2-font-size)', fontWeight: 600, lineHeight: 'var(--text-subtitle-2-line-height)', color: disabled ? 'var(--text-disabled-color)' : 'var(--text-basic-color)', ...style }}>
      <input type="radio" name={name} value={value} checked={!!checked} disabled={disabled} onChange={() => onChange && onChange(value)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{ width: 'var(--radio-size)', height: 'var(--radio-size)', borderRadius: '50%', border: `1px solid ${disabled ? 'var(--color-basic-transparent-300)' : checked ? color : 'var(--color-basic-transparent-default-border)'}`, background: disabled ? 'var(--color-basic-transparent-200)' : 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color .15s ease' }}>
        {checked && <span style={{ width: '.625rem', height: '.625rem', borderRadius: '50%', background: disabled ? 'var(--text-disabled-color)' : color }} />}
      </span>
      {(label || children) && <span style={{ marginLeft: '.6875rem' }}>{label || children}</span>}
    </label>
  );
}

export function RadioGroup({ options = [], value, defaultValue, onChange, name = 'radio', status, disabled, direction = 'column', style }) {
  const [internal, setInternal] = useState(defaultValue);
  const v = value !== undefined ? value : internal;
  return (
    <div role="radiogroup" style={{ display: 'flex', flexDirection: direction, gap: direction === 'row' ? '1.5rem' : '.75rem', ...style }}>
      {options.map((o) => { const opt = typeof o === 'string' ? { value: o, label: o } : o; return <Radio key={opt.value} name={name} value={opt.value} label={opt.label} status={status} disabled={disabled || opt.disabled} checked={v === opt.value} onChange={(val) => { setInternal(val); onChange && onChange(val); }} />; })}
    </div>
  );
}
