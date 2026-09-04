import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../core/Icon.jsx';

// NbSelect + NbOption + NbOptionGroup. options: string | {value,label,disabled} | {group,options:[...]}
export function OptionList({ options = [], value, onPick, multiple, size = 'medium', style }) {
  const isSel = (v) => (multiple ? (value || []).includes(v) : value === v);
  const [hover, setHover] = useState(null);
  const render = (o, depth = 0) => {
    if (o && o.group) return (
      <React.Fragment key={o.group}>
        <div style={{ padding: 'var(--select-medium-padding)', color: 'var(--text-hint-color)', fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600 }}>{o.group}</div>
        {o.options.map((c) => render(c, 1))}
      </React.Fragment>
    );
    const opt = typeof o === 'string' ? { value: o, label: o } : o;
    const sel = isSel(opt.value);
    const h = hover === opt.value;
    return (
      <div key={opt.value} role="option" aria-selected={sel} onMouseEnter={() => setHover(opt.value)} onMouseLeave={() => setHover(null)} onClick={() => !opt.disabled && onPick && onPick(opt.value)}
        style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: 'var(--select-medium-padding)', paddingLeft: depth ? '2.25rem' : undefined, fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600, lineHeight: 'var(--text-subtitle-line-height)', background: sel ? (h ? 'var(--color-primary-hover)' : 'var(--color-primary-default)') : h ? 'var(--color-basic-transparent-hover)' : 'transparent', color: opt.disabled ? 'var(--text-disabled-color)' : sel ? 'var(--text-control-color)' : 'var(--text-basic-color)', cursor: opt.disabled ? 'not-allowed' : 'pointer' }}>
        {multiple && <span style={{ width: '1.125rem', height: '1.125rem', borderRadius: 3, border: `1px solid ${sel ? '#fff' : 'var(--color-basic-600)'}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{sel && <Icon icon="checkmark-outline" size=".875rem" />}</span>}
        {opt.label}
      </div>
    );
  };
  return (
    <div role="listbox" style={{ background: 'var(--background-basic-color-1)', border: '.0625rem solid var(--option-list-border-color)', borderRadius: 'var(--border-radius)', maxHeight: 'var(--option-list-max-height)', overflowY: 'auto', ...style }}>
      {options.map((o) => render(o))}
    </div>
  );
}

export function Select({ options = [], value, defaultValue, onChange, placeholder = 'Selecione', multiple, status = 'basic', size = 'medium', shape = 'rectangle', appearance = 'outline', fullWidth, disabled, style }) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(defaultValue ?? (multiple ? [] : undefined));
  const v = value !== undefined ? value : internal;
  const ref = useRef(null);
  useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  const flat = options.flatMap((o) => (o && o.group ? o.options : [o])).map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const labelOf = (val) => (flat.find((o) => o.value === val) || {}).label;
  const text = multiple ? (v || []).map(labelOf).join(', ') : labelOf(v);
  const pick = (val) => { const next = multiple ? ((v || []).includes(val) ? v.filter((x) => x !== val) : [...(v || []), val]) : val; setInternal(next); onChange && onChange(next); if (!multiple) setOpen(false); };
  const basic = status === 'basic';
  const filled = appearance === 'filled' && !basic;
  const border = disabled ? 'var(--border-basic-color-4)' : open ? (basic ? 'var(--color-primary-default)' : `var(--color-${status}-default)`) : basic ? 'var(--border-basic-color-6)' : `var(--color-${status}-default)`;
  return (
    <div ref={ref} style={{ position: 'relative', display: fullWidth ? 'block' : 'inline-block', minWidth: 'var(--select-min-width)', width: fullWidth ? '100%' : undefined, ...style }}>
      <button type="button" disabled={disabled} onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.5rem', padding: 'var(--select-medium-padding)', border: `1px solid ${border}`, borderRadius: shape === 'round' ? '1.5rem' : shape === 'semi-round' ? '.75rem' : 'var(--border-radius)', background: disabled ? 'var(--background-basic-color-2)' : filled ? `var(--color-${status}-default)` : 'var(--background-basic-color-1)', color: disabled ? 'var(--text-disabled-color)' : filled ? 'var(--text-control-color)' : text ? 'var(--text-basic-color)' : 'var(--text-hint-color)', fontFamily: 'var(--font-family-primary)', fontSize: text ? 'var(--text-subtitle-font-size)' : 'var(--text-paragraph-font-size)', fontWeight: text ? 600 : 400, lineHeight: 'var(--text-subtitle-line-height)', cursor: disabled ? 'not-allowed' : 'pointer', textAlign: 'left', outline: 'none', boxShadow: open ? '0 0 0 var(--outline-width) var(--outline-color)' : 'none', transition: 'border-color .15s ease, box-shadow .15s ease' }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text || placeholder}</span>
        <Icon icon="chevron-down-outline" size="1.25rem" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease', color: filled ? '#fff' : 'var(--text-hint-color)' }} />
      </button>
      {open && <OptionList options={options} value={v} multiple={multiple} onPick={pick} style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 2, zIndex: 20 }} />}
    </div>
  );
}
