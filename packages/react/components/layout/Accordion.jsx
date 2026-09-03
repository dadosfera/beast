import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';

// NbAccordion / NbAccordionItem: items {title, content, disabled, expanded}. Header subtitle text, 1.25rem padding, shadow on the group.
export function Accordion({ items = [], multi, style }) {
  const [open, setOpen] = useState(() => new Set(items.map((it, i) => (it.expanded ? i : -1)).filter((i) => i >= 0)));
  const toggle = (i) => { const n = new Set(multi ? open : []); if (open.has(i)) n.delete(i); else n.add(i); setOpen(n); };
  return (
    <div style={{ borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)', background: 'var(--background-basic-color-1)', fontFamily: 'var(--font-family-primary)', overflow: 'hidden', ...style }}>
      {items.map((it, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} style={{ borderBottom: i < items.length - 1 ? '1px solid var(--border-basic-color-3)' : 0 }}>
            <button type="button" disabled={it.disabled} onClick={() => toggle(i)} aria-expanded={isOpen}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: 'var(--accordion-padding)', border: 0, background: 'transparent', textAlign: 'left', cursor: it.disabled ? 'not-allowed' : 'pointer', color: it.disabled ? 'var(--text-disabled-color)' : 'var(--text-basic-color)', fontFamily: 'inherit', fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600, lineHeight: 'var(--text-subtitle-line-height)' }}>
              <span>{it.title}</span>
              <Icon icon="chevron-down-outline" size="1.25rem" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease', color: 'var(--text-hint-color)' }} />
            </button>
            <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows .25s ease' }}>
              <div style={{ overflow: 'hidden' }}><div style={{ padding: '0 var(--accordion-padding) var(--accordion-padding)', fontSize: 'var(--text-paragraph-font-size)', lineHeight: 'var(--text-paragraph-line-height)' }}>{it.content}</div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
