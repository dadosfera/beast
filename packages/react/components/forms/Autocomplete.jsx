import React, { useState, useRef, useEffect } from 'react';
import { Input } from './Input.jsx';
import { OptionList } from './Select.jsx';

// nbAutocomplete + NbAutocomplete: text input with a filtered option list underneath.
export function Autocomplete({ options = [], value, onChange, onSelect, placeholder = 'Digite para buscar', status, size, fullWidth, disabled, filter, style }) {
  const [internal, setInternal] = useState('');
  const [open, setOpen] = useState(false);
  const v = value !== undefined ? value : internal;
  const ref = useRef(null);
  useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  const flat = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const shown = flat.filter((o) => (filter ? filter(o, v) : o.label.toLowerCase().includes((v || '').toLowerCase())));
  return (
    <div ref={ref} style={{ position: 'relative', display: fullWidth ? 'block' : 'inline-block', ...style }}>
      <Input value={v} placeholder={placeholder} status={status} size={size} fullWidth disabled={disabled} suffixIcon="search-outline"
        onChange={(e) => { setInternal(e.target.value); onChange && onChange(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} />
      {open && shown.length > 0 && <OptionList options={shown} value={v} onPick={(val) => { const o = flat.find((x) => x.value === val); setInternal(o.label); onChange && onChange(o.label); onSelect && onSelect(val); setOpen(false); }} style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 2, zIndex: 20 }} />}
    </div>
  );
}
