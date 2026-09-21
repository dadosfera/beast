import React, { useState, useRef, useEffect } from 'react';
import { Menu } from '../layout/Menu.jsx';

// nbContextMenu: a Menu inside a white shadowed panel (min 10rem, max 15rem), centered text, .25rem radius.
export function ContextMenu({ children, items = [], onSelect, position = 'bottom', trigger = 'click', style }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  const place = position === 'top' ? { bottom: '100%', marginBottom: 8 } : position === 'left' ? { right: '100%', top: 0, marginRight: 8 } : position === 'right' ? { left: '100%', top: 0, marginLeft: 8 } : { top: '100%', marginTop: 8 };
  const ev = trigger === 'hover' ? { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false) } : { onClick: () => setOpen(!open) };
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex', ...style }} {...(trigger === 'hover' ? ev : {})}>
      <span {...(trigger === 'hover' ? {} : ev)} style={{ display: 'inline-flex' }}>{children}</span>
      {open && (
        <div style={{ position: 'absolute', ...place, left: position === 'left' ? undefined : place.left, zIndex: 1000, minWidth: 'var(--context-menu-min-width)', maxWidth: 'var(--context-menu-max-width)', background: 'var(--background-basic-color-1)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)', textAlign: 'center', overflow: 'hidden' }}>
          <Menu items={items} onSelect={(it) => { setOpen(false); onSelect && onSelect(it); }} style={{ '--menu-item-padding': '.75rem 1rem' }} />
        </div>
      )}
    </span>
  );
}
