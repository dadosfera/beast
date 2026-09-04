import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';

// nbInput + NbFormField (prefix/suffix addons). status basic | primary | success | info | warning | danger.
const PAD = { tiny: '.1875rem .5rem', small: '.3125rem .75rem', medium: 'var(--input-medium-padding)', large: '.6875rem 1.125rem', giant: '.9375rem 1.375rem' };
const FS = { tiny: '.75rem', small: '.8125rem', medium: 'var(--text-subtitle-font-size)', large: '1rem', giant: '1.125rem' };
const RADIUS = { rectangle: 'var(--input-rectangle-border-radius)', 'semi-round': '.75rem', round: '1.5rem' };
export function Input({ value, defaultValue, onChange, placeholder, type = 'text', status = 'basic', size = 'medium', shape = 'rectangle', fullWidth, disabled, prefixIcon, suffixIcon, onSuffixClick, multiline, rows = 3, style, inputStyle, ...rest }) {
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const basic = status === 'basic';
  const border = disabled ? 'var(--border-basic-color-4)' : focus ? (basic ? 'var(--color-primary-default)' : `var(--color-${status}-focus)`) : basic ? 'var(--border-basic-color-6)' : `var(--color-${status}-default)`;
  const bg = disabled ? 'var(--background-basic-color-2)' : hover && !focus ? 'var(--background-basic-color-2)' : 'var(--background-basic-color-1)';
  const Tag = multiline ? 'textarea' : 'input';
  const addon = (icon, side, click) => icon && (
    <span onClick={click} style={{ position: 'absolute', top: 0, bottom: 0, [side]: 0, width: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: focus ? 'var(--color-primary-500)' : 'var(--color-basic-600)', cursor: click ? 'pointer' : 'default' }}><Icon icon={icon} size="1.25rem" /></span>
  );
  return (
    <div style={{ position: 'relative', display: fullWidth ? 'block' : 'inline-block', width: fullWidth ? '100%' : undefined, maxWidth: fullWidth ? undefined : 'var(--input-medium-max-width)', ...style }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {addon(prefixIcon, 'left')}
      <Tag value={value} defaultValue={defaultValue} onChange={onChange} placeholder={placeholder} type={multiline ? undefined : type} rows={multiline ? rows : undefined} disabled={disabled} {...rest}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ width: '100%', display: 'block', padding: PAD[size], paddingLeft: prefixIcon ? '2.5rem' : undefined, paddingRight: suffixIcon ? '2.5rem' : undefined, border: `var(--input-border-width) solid ${border}`, borderRadius: RADIUS[shape], background: bg, color: disabled ? 'var(--text-disabled-color)' : 'var(--text-basic-color)', fontFamily: 'var(--font-family-primary)', fontSize: FS[size], fontWeight: 600, lineHeight: 'var(--text-subtitle-line-height)', outline: 'none', boxShadow: focus ? `0 0 0 var(--outline-width) var(--outline-color)` : 'none', transition: 'border-color .15s ease, box-shadow .15s ease, background .15s ease', resize: multiline ? 'vertical' : undefined, ...inputStyle }} />
      {addon(suffixIcon, 'right', onSuffixClick)}
      <style>{'input::placeholder,textarea::placeholder{color:var(--text-hint-color);font-weight:400;opacity:1}'}</style>
    </div>
  );
}
