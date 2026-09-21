import React, { useState, useEffect } from 'react';
import { Icon } from '../core/Icon.jsx';

// NbSearch: full-screen search overlay. Trigger icon + a heading-1 sized input on a basic-1 backdrop (type "rotate-layout"/"modal-zoomin"/"modal-drop"...).
export function Search({ open: controlled, onOpenChange, onSearch, placeholder = 'Buscar...', hint = 'Pressione Enter para buscar', type = 'rotate-layout', style }) {
  const [internal, setInternal] = useState(false);
  const open = controlled !== undefined ? controlled : internal;
  const set = (v) => { setInternal(v); onOpenChange && onOpenChange(v); };
  const [q, setQ] = useState('');
  useEffect(() => { const h = (e) => { if (e.key === 'Escape') set(false); }; document.addEventListener('keydown', h); return () => document.removeEventListener('keydown', h); }, []);
  return (
    <>
      <button type="button" aria-label="Buscar" onClick={() => set(true)} style={{ border: 0, background: 'transparent', color: 'var(--text-basic-color)', cursor: 'pointer', padding: 0, display: 'inline-flex', ...style }}><Icon icon="search-outline" size="1.5rem" /></button>
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1050, background: 'var(--background-basic-color-1)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 15%', fontFamily: 'var(--font-family-primary)', animation: 'beast-search-in .25s ease' }}>
          <style>{'@keyframes beast-search-in{from{opacity:0;transform:scale(1.02)}to{opacity:1;transform:none}}'}</style>
          <button type="button" aria-label="Fechar" onClick={() => set(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 0, background: 'transparent', color: 'var(--text-hint-color)', cursor: 'pointer', display: 'inline-flex' }}><Icon icon="close-outline" size="2rem" /></button>
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} onKeyDown={(e) => { if (e.key === 'Enter') { onSearch && onSearch(q); set(false); } }}
            style={{ width: '100%', border: 0, borderBottom: '2px solid var(--border-basic-color-4)', outline: 0, background: 'transparent', color: 'var(--text-basic-color)', fontFamily: 'inherit', fontSize: 'var(--text-heading-1-font-size)', fontWeight: 700, lineHeight: 'var(--text-heading-1-line-height)', padding: '.5rem 0' }} />
          <span style={{ marginTop: '.75rem', color: 'var(--text-hint-color)', fontSize: 'var(--text-caption-font-size)' }}>{hint}</span>
        </div>
      )}
    </>
  );
}
