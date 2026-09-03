import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../core/Badge.jsx';

// NbMenu: vertical navigation. items: {title, icon, link, group, children:[], badge:{text,status}, expanded, selected, hidden}
// Item padding .75rem 1rem, subtitle-2 text, active/hover = primary text, icon 1.25rem hint color. Sidebar highlights active item with a primary bar.
export function Menu({ items = [], selected, onSelect, compact, style }) {
  const [sel, setSel] = useState(selected || null);
  const [expanded, setExpanded] = useState(() => Object.fromEntries(items.filter((i) => i.expanded).map((i) => [i.title, true])));
  const cur = selected !== undefined ? selected : sel;
  const pick = (it) => { setSel(it.title); onSelect && onSelect(it); };
  const row = (it, depth) => {
    if (it.hidden) return null;
    if (it.group) return <li key={it.title} style={{ padding: 'var(--menu-item-padding)', color: 'var(--text-hint-color)', fontSize: 'var(--text-subtitle-2-font-size)', fontWeight: 600, lineHeight: 'var(--text-subtitle-2-line-height)', textTransform: 'uppercase', letterSpacing: '.02em' }}>{compact ? '' : it.title}</li>;
    const kids = it.children && it.children.length;
    const open = !!expanded[it.title];
    const active = cur === it.title || (kids && it.children.some((c) => cur === c.title));
    return (
      <li key={it.title} style={{ listStyle: 'none', borderBottom: depth ? 0 : 'var(--divider-width) var(--divider-style) var(--divider-color)' }}>
        <MenuRow it={it} depth={depth} active={active} compact={compact} open={open} kids={kids} onClick={() => (kids ? setExpanded({ ...expanded, [it.title]: !open }) : pick(it))} />
        {kids && open && !compact && <ul style={{ margin: 0, padding: 0, background: 'var(--background-basic-color-2)' }}>{it.children.map((c) => row(c, depth + 1))}</ul>}
      </li>
    );
  };
  return <nav style={{ fontFamily: 'var(--font-family-primary)', ...style }}><ul style={{ margin: 0, padding: 0 }}>{items.map((i) => row(i, 0))}</ul></nav>;
}

function MenuRow({ it, depth, active, compact, open, kids, onClick }) {
  const [hover, setHover] = useState(false);
  const color = active ? 'var(--text-primary-color)' : hover ? 'var(--text-primary-hover-color)' : 'var(--text-basic-color)';
  return (
    <a href={it.link || '#'} onClick={(e) => { e.preventDefault(); onClick(); }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', padding: 'var(--menu-item-padding)', paddingLeft: depth ? `calc(1rem + ${depth} * 1.25rem)` : compact ? '1.125rem' : undefined, color, textDecoration: 'none', fontSize: 'var(--text-subtitle-2-font-size)', fontWeight: 600, lineHeight: 'var(--text-subtitle-2-line-height)', position: 'relative', cursor: 'pointer', transition: 'color .15s ease', justifyContent: compact ? 'center' : undefined }}>
      {active && !depth && <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'var(--color-primary-default)', borderRadius: '0 2px 2px 0' }} />}
      {it.icon && <Icon icon={it.icon} size="var(--menu-item-icon-width)" style={{ margin: compact ? 0 : 'var(--menu-item-icon-margin)', color: active ? 'var(--text-primary-color)' : hover ? 'var(--text-primary-hover-color)' : 'var(--text-hint-color)' }} />}
      {!compact && <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.title}</span>}
      {!compact && it.badge && <Badge text={it.badge.text} status={it.badge.status} style={{ marginLeft: '.5rem' }} />}
      {!compact && kids && <Icon icon={open ? 'chevron-down-outline' : 'chevron-left-outline'} size="1.25rem" style={{ color: 'var(--text-hint-color)' }} />}
    </a>
  );
}
