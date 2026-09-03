import React, { useState } from 'react';
import { Icon } from './Icon.jsx';

const PAD = { tiny: 'var(--button-tiny-padding)', small: 'var(--button-small-padding)', medium: 'var(--button-medium-padding)', large: 'var(--button-large-padding)', giant: 'var(--button-giant-padding)' };
const ICON = { tiny: '.75rem', small: '1rem', medium: '1.25rem', large: '1.5rem', giant: '1.5rem' };
const OFFSET = { tiny: '.375rem', small: '.375rem', medium: '.5rem', large: '.75rem', giant: '.75rem' };
const RADIUS = { rectangle: 'var(--button-rectangle-border-radius)', 'semi-round': 'var(--button-semi-round-border-radius)', round: 'var(--button-round-border-radius)' };

function colors(appearance, status, hover, active, disabled) {
  const isBasic = status === 'basic';
  if (disabled) {
    if (appearance === 'ghost') return { bg: 'transparent', border: 'transparent', fg: 'var(--text-disabled-color)' };
    if (appearance === 'outline') return { bg: 'var(--color-basic-transparent-200)', border: 'var(--color-basic-transparent-300)', fg: 'var(--text-disabled-color)' };
    return { bg: 'var(--color-basic-transparent-300)', border: 'var(--color-basic-transparent-300)', fg: 'var(--text-disabled-color)' };
  }
  const st = active ? 'active' : hover ? 'hover' : 'default';
  if (appearance === 'filled' || appearance === 'hero') {
    if (isBasic) return { bg: `var(--color-basic-${st})`, border: `var(--color-basic-${st})`, fg: 'var(--color-basic-800)' };
    if (status === 'control') return { bg: `var(--color-control-${st})`, border: `var(--color-control-${st})`, fg: 'var(--color-basic-800)' };
    return { bg: `var(--color-${status}-${st})`, border: `var(--color-${status}-${st})`, fg: 'var(--text-control-color)' };
  }
  if (appearance === 'outline') {
    if (isBasic) return { bg: hover || active ? 'var(--color-basic-transparent-hover)' : 'var(--color-basic-100)', border: 'var(--color-basic-600)', fg: 'var(--text-hint-color)' };
    return { bg: hover || active ? `var(--color-${status}-transparent-${active ? 'active' : 'hover'})` : 'var(--color-basic-100)', border: `var(--color-${status}-500)`, fg: `var(--color-${status}-default)` };
  }
  // ghost
  if (isBasic) return { bg: hover || active ? 'var(--color-basic-transparent-100)' : 'transparent', border: 'transparent', fg: 'var(--color-basic-600)' };
  return { bg: hover || active ? `var(--color-${status}-transparent-${active ? 'active' : 'hover'})` : 'transparent', border: 'transparent', fg: `var(--color-${status}-${active ? 'active' : hover ? 'hover' : 'default'})` };
}

export function Button({ children, appearance = 'filled', status = 'basic', size = 'medium', shape = 'rectangle', fullWidth, disabled, icon, iconEnd, iconOnly, style, onClick, type = 'button', ...rest }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const c = colors(appearance, status, hover, active, disabled);
  const onlyIcon = iconOnly || (!children && (icon || iconEnd));
  return (
    <button type={type} disabled={disabled} onClick={onClick} {...rest}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)}
      style={{
        appearance: 'none', display: fullWidth ? 'flex' : 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 0,
        width: fullWidth ? '100%' : undefined, padding: onlyIcon ? (size === 'medium' ? 'var(--icon-button-medium-padding)' : PAD[size]) : PAD[size],
        fontFamily: 'var(--font-family-primary)', fontWeight: 'var(--text-button-font-weight)', fontSize: `var(--text-button-${size}-font-size)`, lineHeight: `var(--text-button-${size}-line-height)`,
        textTransform: 'none', borderRadius: RADIUS[shape], border: `1px solid ${c.border}`, background: c.bg, color: c.fg,
        cursor: disabled ? 'not-allowed' : 'pointer', transition: 'background-color .15s ease, border-color .15s ease, color .15s ease', outline: 'none', textDecoration: 'none', whiteSpace: 'nowrap', verticalAlign: 'middle',
        ...style,
      }}>
      {icon && <Icon icon={icon} size={ICON[size]} style={{ marginRight: children ? OFFSET[size] : 0, marginTop: '-.125rem', marginBottom: '-.125rem' }} />}
      {children}
      {iconEnd && <Icon icon={iconEnd} size={ICON[size]} style={{ marginLeft: children ? OFFSET[size] : 0, marginTop: '-.125rem', marginBottom: '-.125rem' }} />}
    </button>
  );
}
