import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';

// NbCheckbox: 1.25rem box, 3px radius, primary fill when checked; supports indeterminate.
export function Checkbox({ checked, defaultChecked, indeterminate, onChange, label, children, status = 'basic', disabled, style }) {
  const [internal, setInternal] = useState(!!defaultChecked);
  const isC = checked !== undefined ? checked : internal;
  const [hover, setHover] = useState(false);
  const color = status === 'basic' ? 'var(--color-primary-default)' : `var(--color-${status}-default)`;
  const on = isC || indeterminate;
  const bg = disabled ? 'var(--color-basic-transparent-200)' : on ? color : hover ? 'var(--color-basic-transparent-hover)' : 'var(--color-basic-transparent-default)';
  const border = disabled ? 'var(--color-basic-transparent-300)' : on ? color : 'var(--color-basic-transparent-default-border)';
  return (
    <label onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ display: 'inline-flex', alignItems: 'center', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-subtitle-2-font-size)', fontWeight: 600, lineHeight: 'var(--text-subtitle-2-line-height)', color: disabled ? 'var(--text-disabled-color)' : 'var(--text-basic-color)', ...style }}>
      <input type="checkbox" checked={isC} disabled={disabled} onChange={(e) => { setInternal(e.target.checked); onChange && onChange(e.target.checked); }} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{ width: 'var(--checkbox-size)', height: 'var(--checkbox-size)', borderRadius: 'var(--checkbox-border-radius)', border: `1px solid ${border}`, background: bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-control-color)', transition: 'background .15s ease, border-color .15s ease', flexShrink: 0 }}>
        {indeterminate && !isC ? <span style={{ width: '.625rem', height: '.125rem', background: '#fff', borderRadius: 1 }} /> : isC ? <Icon icon="checkmark-outline" size="1rem" /> : null}
      </span>
      {(label || children) && <span style={{ marginLeft: 'var(--checkbox-text-space)' }}>{label || children}</span>}
    </label>
  );
}
