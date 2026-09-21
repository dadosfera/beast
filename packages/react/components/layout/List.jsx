import React from 'react';

// NbList / NbListItem: vertical list, 1rem item padding, divider between items. Also used with nbInfiniteList (scroll to load more).
export function List({ children, items, renderItem, onScrollEnd, style }) {
  const content = items ? items.map((it, i) => <ListItem key={i}>{renderItem ? renderItem(it, i) : it}</ListItem>) : children;
  return (
    <ul role="list" onScroll={(e) => { const el = e.currentTarget; if (onScrollEnd && el.scrollTop + el.clientHeight >= el.scrollHeight - 8) onScrollEnd(); }}
      style={{ margin: 0, padding: 0, listStyle: 'none', overflowY: 'auto', fontFamily: 'var(--font-family-primary)', fontSize: 'var(--text-paragraph-font-size)', lineHeight: 'var(--text-paragraph-line-height)', color: 'var(--text-basic-color)', ...style }}>
      {content}
    </ul>
  );
}
export function ListItem({ children, style, onClick }) {
  return <li onClick={onClick} style={{ padding: 'var(--list-item-padding)', borderBottom: 'var(--divider-width) var(--divider-style) var(--divider-color)', cursor: onClick ? 'pointer' : undefined, ...style }}>{children}</li>;
}
