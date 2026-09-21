import React, { useState, useRef, useEffect } from 'react';

// nbPopover: white panel (.75rem 1rem padding), .25rem radius, shadow, .6875rem arrow. trigger click | hover | hint | focus | noop.
export function Popover({ children, content, position = 'top', trigger = 'click', open: controlled, onOpenChange, offset = 8, contentStyle, style }) {
  const [internal, setInternal] = useState(false);
  const open = controlled !== undefined ? controlled : internal;
  const set = (v) => { setInternal(v); onOpenChange && onOpenChange(v); };
  const ref = useRef(null);
  useEffect(() => { if (trigger !== 'click') return; const h = (e) => { if (ref.current && !ref.current.contains(e.target)) set(false); }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, [trigger]);
  const place = { top: { bottom: '100%', left: '50%', transform: `translate(-50%,-${offset}px)` }, bottom: { top: '100%', left: '50%', transform: `translate(-50%,${offset}px)` }, left: { right: '100%', top: '50%', transform: `translate(-${offset}px,-50%)` }, right: { left: '100%', top: '50%', transform: `translate(${offset}px,-50%)` } }[position];
  const a = 'var(--popover-arrow-size)';
  const arrow = { top: { top: '100%', left: '50%', transform: 'translateX(-50%) rotate(45deg)', marginTop: `calc(${a} / -2)` }, bottom: { bottom: '100%', left: '50%', transform: 'translateX(-50%) rotate(45deg)', marginBottom: `calc(${a} / -2)` }, left: { left: '100%', top: '50%', transform: 'translateY(-50%) rotate(45deg)', marginLeft: `calc(${a} / -2)` }, right: { right: '100%', top: '50%', transform: 'translateY(-50%) rotate(45deg)', marginRight: `calc(${a} / -2)` } }[position];
  const ev = trigger === 'click' ? { onClick: () => set(!open) } : trigger === 'hover' || trigger === 'hint' ? { onMouseEnter: () => set(true), onMouseLeave: () => set(false) } : trigger === 'focus' ? { onFocus: () => set(true), onBlur: () => set(false) } : {};
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex', ...style }}>
      <span {...ev} style={{ display: 'inline-flex' }}>{children}</span>
      {open && (
        <div style={{ position: 'absolute', ...place, zIndex: 1000, background: 'var(--background-basic-color-1)', border: '1px solid transparent', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)', padding: 'var(--popover-padding)', color: 'var(--text-basic-color)', fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-paragraph-font-size)', lineHeight: 'var(--text-paragraph-line-height)', ...contentStyle }}>
          {content}
          <span style={{ position: 'absolute', ...arrow, width: a, height: a, background: 'var(--background-basic-color-1)', boxShadow: '2px 2px 4px rgba(0,0,0,.08)' }} />
        </div>
      )}
    </span>
  );
}
