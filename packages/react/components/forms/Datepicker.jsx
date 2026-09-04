import React, { useState, useRef, useEffect } from 'react';
import { Input } from './Input.jsx';
import { Calendar } from './Calendar.jsx';

// nbDatepicker + NbDatepicker / NbRangepicker: input that opens a Calendar popup.
const fmt = (d) => (d ? `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}` : '');
export function Datepicker({ value, onChange, range, placeholder, status, size, fullWidth, disabled, style }) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(range ? { start: null, end: null } : null);
  const v = value !== undefined ? value : internal;
  const ref = useRef(null);
  useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  const text = range ? [fmt(v && v.start), fmt(v && v.end)].filter(Boolean).join(' - ') : fmt(v);
  return (
    <div ref={ref} style={{ position: 'relative', display: fullWidth ? 'block' : 'inline-block', ...style }}>
      <Input value={text} readOnly placeholder={placeholder || (range ? 'Período' : 'Data')} status={status} size={size} fullWidth disabled={disabled} suffixIcon="calendar-outline" onFocus={() => setOpen(true)} onSuffixClick={() => !disabled && setOpen(!open)} onChange={() => {}} />
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 30, background: 'var(--background-basic-color-1)' }}>
          {range
            ? <Calendar range rangeValue={v} onRangeChange={(r) => { setInternal(r); onChange && onChange(r); if (r.start && r.end) setOpen(false); }} />
            : <Calendar date={v} onChange={(d) => { setInternal(d); onChange && onChange(d); setOpen(false); }} />}
        </div>
      )}
    </div>
  );
}
export function Rangepicker(props) { return <Datepicker range {...props} />; }
