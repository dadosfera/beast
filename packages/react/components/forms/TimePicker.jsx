import React, { useState, useRef, useEffect } from 'react';
import { Input } from './Input.jsx';
import { Button } from '../core/Button.jsx';

// nbTimepicker + NbTimePicker: 20rem panel with hour/minute columns (2.75rem cells) and a confirm footer.
const pad = (n) => String(n).padStart(2, '0');
export function TimePicker({ value, onChange, step = 5, withSeconds, singleColumn, placeholder = 'Horário', status, size, fullWidth, disabled, style }) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(null);
  const v = value !== undefined ? value : internal;
  const [draft, setDraft] = useState({ h: 9, m: 0, s: 0 });
  const ref = useRef(null);
  useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  const text = v ? `${pad(v.h)}:${pad(v.m)}${withSeconds ? ':' + pad(v.s || 0) : ''}` : '';
  const col = (label, items, k) => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <div style={{ height: 'var(--timepicker-cell-height)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-hint-color)', fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600, borderBottom: '1px solid var(--divider-color)' }}>{label}</div>
      <div style={{ overflowY: 'auto', maxHeight: 'calc(var(--timepicker-cell-height) * 6)' }}>
        {items.map((n) => { const act = draft[k] === n; return (
          <div key={n} onClick={() => setDraft({ ...draft, [k]: n })} style={{ height: 'var(--timepicker-cell-height)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600, background: act ? 'var(--color-primary-default)' : 'transparent', color: act ? 'var(--text-control-color)' : 'var(--text-basic-color)' }}
            onMouseEnter={(e) => { if (!act) e.currentTarget.style.background = 'var(--background-basic-color-2)'; }} onMouseLeave={(e) => { if (!act) e.currentTarget.style.background = 'transparent'; }}>{pad(n)}</div>
        ); })}
      </div>
    </div>
  );
  const hours = Array.from({ length: 24 }, (_, i) => i), mins = Array.from({ length: 60 / step }, (_, i) => i * step);
  return (
    <div ref={ref} style={{ position: 'relative', display: fullWidth ? 'block' : 'inline-block', ...style }}>
      <Input value={text} readOnly placeholder={placeholder} status={status} size={size} fullWidth disabled={disabled} suffixIcon="clock-outline" onFocus={() => setOpen(true)} onSuffixClick={() => !disabled && setOpen(!open)} onChange={() => {}} />
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 30, width: 'var(--timepicker-container-width)', background: 'var(--background-basic-color-1)', border: '.0625rem solid var(--border-basic-color-4)', borderRadius: 'var(--border-radius)', fontFamily: 'var(--font-family-primary)' }}>
          <div style={{ display: 'flex' }}>
            {singleColumn
              ? col('Horário', hours.flatMap((h) => mins.map((m) => h * 100 + m)), 'hm')
              : <>{col('Hora', hours, 'h')}{col('Min', mins, 'm')}{withSeconds && col('Seg', mins, 's')}</>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '.5rem', padding: '.75rem 1rem', borderTop: '1px solid var(--divider-color)' }}>
            <Button appearance="ghost" size="small" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button appearance="ghost" status="primary" size="small" onClick={() => { const val = singleColumn ? { h: Math.floor((draft.hm || 0) / 100), m: (draft.hm || 0) % 100 } : draft; setInternal(val); onChange && onChange(val); setOpen(false); }}>OK</Button>
          </div>
        </div>
      )}
    </div>
  );
}
