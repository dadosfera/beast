import React, { useState } from 'react';
import { Button } from '../core/Button.jsx';
import { Select } from '../forms/Select.jsx';

// NbPagination (Beast addition, not in Nebular): round ghost medium buttons 33px square, current page filled with status; optional page-size select.
const DOTS = '…';
function range(cur, total, siblings = 1) {
  const n = siblings * 2 + 5;
  if (total <= n) return Array.from({ length: total }, (_, i) => i + 1);
  const left = Math.max(cur - siblings, 1), right = Math.min(cur + siblings, total);
  const showL = left > 2, showR = right < total - 1;
  if (!showL && showR) return [...Array.from({ length: 3 + 2 * siblings }, (_, i) => i + 1), DOTS, total];
  if (showL && !showR) return [1, DOTS, ...Array.from({ length: 3 + 2 * siblings }, (_, i) => total - (3 + 2 * siblings) + i + 1)];
  return [1, DOTS, ...Array.from({ length: right - left + 1 }, (_, i) => left + i), DOTS, total];
}
export function Pagination({ totalCount = 0, pageSize = 10, currentPage, defaultPage = 1, onPageChange, onPageSizeChange, status = 'primary', showPageSizeOptions, pageSizeOptions = [10, 20, 50], textShow = 'Exibir', textOf = 'de', textItems = 'itens', disabled, style }) {
  const [internal, setInternal] = useState(defaultPage);
  const [ps, setPs] = useState(pageSize);
  const cur = currentPage !== undefined ? currentPage : internal;
  const last = Math.max(1, Math.ceil(totalCount / ps));
  const go = (p) => { if (p < 1 || p > last) return; setInternal(p); onPageChange && onPageChange(p); };
  const sq = { width: 33, height: 33, padding: 0, margin: '0 2px', fontSize: 'var(--text-subtitle-font-size)', lineHeight: 'var(--text-subtitle-line-height)' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontFamily: 'var(--font-family-primary)', ...style }}>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        <li><Button appearance="ghost" shape="round" icon="chevron-left-outline" disabled={cur === 1 || disabled} onClick={() => go(cur - 1)} style={sq} /></li>
        {range(cur, last).map((p, i) => (
          <li key={i}>{p === DOTS ? <Button appearance="ghost" shape="round" disabled style={sq}>...</Button> : p === cur ? <Button status={status} shape="round" style={sq}>{p}</Button> : <Button appearance="ghost" shape="round" disabled={disabled} onClick={() => go(p)} style={{ ...sq, color: 'var(--text-basic-color)' }}>{p}</Button>}</li>
        ))}
        <li><Button appearance="ghost" shape="round" icon="chevron-right-outline" disabled={cur === last || disabled || !totalCount} onClick={() => go(cur + 1)} style={sq} /></li>
      </ul>
      {showPageSizeOptions && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <span>{textShow}</span>
          <Select options={pageSizeOptions.map((o) => ({ value: o, label: String(o) }))} value={ps} onChange={(v) => { setPs(v); setInternal(1); onPageSizeChange && onPageSizeChange(v); }} disabled={disabled} style={{ minWidth: '5rem' }} />
          <span>{textOf} {totalCount} {textItems}</span>
        </div>
      )}
    </div>
  );
}
