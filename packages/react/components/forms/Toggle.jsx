import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';

// NbToggle: 3.125rem × 1.875rem pill, 1.75rem white switcher with a primary checkmark when on.
export function Toggle({ checked, defaultChecked, onChange, label, labelPosition = 'right', status = 'basic', disabled, style }) {
  const [internal, setInternal] = useState(!!defaultChecked);
  const on = checked !== undefined ? checked : internal;
  const color = status === 'basic' ? 'var(--color-primary-default)' : `var(--color-${status}-default)`;
  const flip = () => { if (disabled) return; setInternal(!on); onChange && onChange(!on); };
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '.6875rem', flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-subtitle-2-font-size)', fontWeight: 600, lineHeight: 'var(--text-subtitle-2-line-height)', color: disabled ? 'var(--text-disabled-color)' : 'var(--text-basic-color)', ...style }}>
      <input type="checkbox" checked={on} disabled={disabled} onChange={flip} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{ position: 'relative', width: 'var(--toggle-width)', height: 'var(--toggle-height)', borderRadius: 'var(--toggle-border-radius)', border: `1px solid ${disabled ? 'var(--color-basic-transparent-300)' : on ? color : 'var(--color-basic-transparent-default-border)'}`, background: disabled ? 'var(--color-basic-transparent-200)' : on ? color : 'var(--color-basic-transparent-default)', transition: 'background .15s ease, border-color .15s ease', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 0, left: on ? 'calc(100% - var(--toggle-switcher-size))' : 0, width: 'var(--toggle-switcher-size)', height: 'var(--toggle-switcher-size)', borderRadius: '50%', background: 'var(--background-basic-color-1)', boxShadow: '0 1px 3px rgba(0,0,0,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color, transition: 'left .15s ease' }}>
          {on && <Icon icon="checkmark-outline" size=".75rem" />}
        </span>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
