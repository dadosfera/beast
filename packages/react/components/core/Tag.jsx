import React, { useState } from 'react';
import { Icon } from './Icon.jsx';

// NbTag: pill-shaped chip. appearance filled | outline; removable shows a close icon.
export function Tag({ text, status = 'basic', appearance = 'filled', size = 'medium', removable, selected, disabled, onRemove, onClick, style }) {
  const [hover, setHover] = useState(false);
  const basic = status === 'basic';
  const st = selected ? 'active' : hover ? 'hover' : 'default';
  let bg, border, fg;
  if (appearance === 'filled') {
    bg = basic ? `var(--color-basic-${st})` : `var(--color-${status}-${st})`; border = bg; fg = basic ? 'var(--color-basic-800)' : 'var(--text-control-color)';
  } else {
    bg = basic ? `var(--color-basic-transparent-${st})` : `var(--color-${status}-transparent-${st})`; border = basic ? 'var(--color-basic-600)' : `var(--color-${status}-500)`; fg = basic ? 'var(--text-hint-color)' : `var(--color-${status}-default)`;
  }
  if (disabled) { bg = 'var(--color-basic-transparent-200)'; border = 'var(--color-basic-transparent-300)'; fg = 'var(--text-disabled-color)'; }
  const fs = size === 'small' ? 'var(--text-subtitle-2-font-size)' : size === 'large' ? 'var(--text-paragraph-font-size)' : 'var(--text-subtitle-font-size)';
  return (
    <span onClick={disabled ? undefined : onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '.625rem', padding: size === 'small' ? '.125rem .75rem' : size === 'large' ? '.3125rem 1.125rem' : 'var(--tag-medium-padding)', borderRadius: 'var(--tag-border-radius)', border: `var(--tag-border-width) solid ${border}`, background: bg, color: fg, fontFamily: 'var(--font-family-primary)', fontSize: fs, fontWeight: 600, lineHeight: 'var(--text-subtitle-line-height)', cursor: onClick && !disabled ? 'pointer' : 'default', whiteSpace: 'nowrap', transition: 'background .15s ease', ...style }}>
      {text}
      {removable && <Icon icon="close-outline" size="1rem" style={{ cursor: 'pointer', opacity: .8 }} onClick={(e) => { e.stopPropagation(); onRemove && onRemove(); }} />}
    </span>
  );
}

// NbTagList + nbTagInput: tags followed by an inline input.
export function TagList({ tags = [], onChange, placeholder = 'Adicionar tag', status = 'basic', appearance = 'filled', style }) {
  const [val, setVal] = useState('');
  const commit = () => { const t = val.trim(); if (t) { onChange && onChange([...tags, t]); setVal(''); } };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', alignItems: 'center', padding: '.375rem .75rem', border: '1px solid var(--input-border-color)', borderRadius: 'var(--input-rectangle-border-radius)', background: 'var(--background-basic-color-1)', minHeight: '2.5rem', ...style }}>
      {tags.map((t, i) => <Tag key={t + i} text={t} status={status} appearance={appearance} removable onRemove={() => onChange && onChange(tags.filter((_, j) => j !== i))} />)}
      <input value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); commit(); } if (e.key === 'Backspace' && !val && tags.length) onChange && onChange(tags.slice(0, -1)); }}
        placeholder={placeholder} style={{ flex: 1, minWidth: '6rem', border: 0, outline: 0, background: 'transparent', fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600, color: 'var(--text-basic-color)' }} />
    </div>
  );
}
