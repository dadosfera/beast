import React from 'react';

// NbSidebar: 16rem (3.5rem compacted), basic-1 background, shadow. state expanded | compacted | collapsed.
export function Sidebar({ children, header, footer, state = 'expanded', right, fixed, style }) {
  const w = state === 'collapsed' ? 0 : state === 'compacted' ? 'var(--sidebar-width-compact)' : 'var(--sidebar-width)';
  return (
    <aside style={{ width: w, minWidth: w, height: fixed ? '100vh' : '100%', position: fixed ? 'sticky' : 'relative', top: 0, order: right ? 1 : -1, background: 'var(--background-basic-color-1)', boxShadow: 'var(--shadow)', color: 'var(--text-basic-color)', display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'width .3s ease, min-width .3s ease', zIndex: 9, ...style }}>
      {header && <div style={{ height: 'var(--sidebar-header-height)', padding: '0 var(--sidebar-padding)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>{header}</div>}
      <div style={{ flex: 1, overflowY: 'auto', padding: state === 'compacted' ? '0' : '0' }}>{children}</div>
      {footer && <div style={{ height: 'var(--sidebar-header-height)', padding: '0 var(--sidebar-padding)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>{footer}</div>}
    </aside>
  );
}
