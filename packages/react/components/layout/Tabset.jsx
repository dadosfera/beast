import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../core/Badge.jsx';

// NbTabset / NbTab / NbRouteTabset: uppercase button-text tabs (padding 1rem 2rem) with a .25rem primary underline.
export function Tabset({ tabs = [], active, defaultActive, onChange, fullWidth, children, style }) {
  const [internal, setInternal] = useState(defaultActive ?? (tabs[0] && tabs[0].id));
  const cur = active !== undefined ? active : internal;
  const current = tabs.find((t) => t.id === cur);
  return (
    <div style={{ fontFamily: 'var(--font-family-primary)', ...style }}>
      <ul role="tablist" style={{ display: 'flex', margin: 0, padding: 0, listStyle: 'none', borderBottom: 'var(--divider-width) var(--divider-style) var(--divider-color)' }}>
        {tabs.map((t) => <TabButton key={t.id} tab={t} active={t.id === cur} fullWidth={fullWidth} onClick={() => { if (t.disabled) return; setInternal(t.id); onChange && onChange(t.id); }} />)}
      </ul>
      {(current && current.content) || children}
    </div>
  );
}
function TabButton({ tab, active, fullWidth, onClick }) {
  const [hover, setHover] = useState(false);
  const color = tab.disabled ? 'var(--text-disabled-color)' : active ? 'var(--text-primary-color)' : hover ? 'var(--text-primary-hover-color)' : 'var(--text-hint-color)';
  const line = tab.disabled ? 'transparent' : active ? 'var(--text-primary-color)' : hover ? 'var(--text-primary-hover-color)' : 'transparent';
  return (
    <li role="tab" aria-selected={active} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ flex: fullWidth ? 1 : undefined, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', padding: 'var(--tabset-tab-padding)', position: 'relative', cursor: tab.disabled ? 'not-allowed' : 'pointer', color, fontSize: 'var(--text-button-medium-font-size)', lineHeight: 'var(--text-button-medium-line-height)', fontWeight: 700, textTransform: 'var(--tabset-tab-text-transform)', transition: 'color .15s ease', whiteSpace: 'nowrap' }}>
      {tab.icon && <Icon icon={tab.icon} size="1.25rem" />}
      {tab.title}
      {tab.badge && <Badge text={tab.badge.text} status={tab.badge.status} dotMode={tab.badge.dotMode} style={tab.badge.dotMode ? { position: 'absolute', top: '.5rem', right: '.75rem' } : {}} />}
      <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 'var(--tabset-tab-underline-width)', background: line, transition: 'background .15s ease' }} />
    </li>
  );
}
export function RouteTabset(props) { return <Tabset {...props} />; }
