import React from 'react';

// NbLayout / NbLayoutHeader / NbLayoutColumn / NbLayoutFooter. Header 4.75rem, layout bg basic-3, column padding 2.25rem 2.25rem .75rem.
export function Layout({ children, style, windowMode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', background: 'var(--layout-background-color)', fontFamily: 'var(--font-family-primary)', color: 'var(--text-basic-color)', ...(windowMode ? { maxWidth: 'var(--layout-content-width)', margin: '0 auto', boxShadow: 'var(--shadow)' } : {}), ...style }}>{children}</div>
  );
}
export function LayoutHeader({ children, fixed, subheader, style }) {
  return (
    <header style={{ display: 'flex', alignItems: 'center', height: 'var(--header-height)', padding: 'var(--header-padding)', background: 'var(--background-basic-color-1)', color: 'var(--text-basic-color)', boxShadow: subheader ? 'none' : 'var(--shadow)', position: fixed ? 'sticky' : 'relative', top: 0, zIndex: 10, flexShrink: 0, ...style }}>{children}</header>
  );
}
export function LayoutBody({ children, style }) {
  return <div style={{ display: 'flex', flex: 1, minHeight: 0, ...style }}>{children}</div>;
}
export function LayoutColumn({ children, left, style }) {
  return <main style={{ flex: 1, minWidth: 0, order: left ? -1 : 0, padding: 'var(--layout-padding)', ...style }}>{children}</main>;
}
export function LayoutFooter({ children, fixed, style }) {
  return (
    <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'var(--footer-height)', padding: 'var(--footer-padding)', background: 'var(--background-basic-color-1)', borderTop: 'var(--divider-width) var(--divider-style) var(--divider-color)', boxShadow: 'var(--shadow)', position: fixed ? 'sticky' : 'relative', bottom: 0, flexShrink: 0, ...style }}>{children}</footer>
  );
}
