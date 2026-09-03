import React, { useState, useMemo } from 'react';
import { Icon } from '../core/Icon.jsx';

// NbTreeGrid: sortable, filterable table with expandable child rows. Cells .875rem 1.25rem padding, basic-2 borders, subtitle headers.
// columns: [{key, title, sortable, filter, render, width}]; rows: [{data:{...}, children:[...], expanded}]
export function TreeGrid({ columns = [], rows = [], equalColumnsWidth, style }) {
  const [sort, setSort] = useState({ key: null, dir: null });
  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState({});
  const flat = useMemo(() => {
    const cmp = (a, b) => { if (!sort.key || !sort.dir) return 0; const x = a.data[sort.key], y = b.data[sort.key]; const r = typeof x === 'number' ? x - y : String(x).localeCompare(String(y)); return sort.dir === 'asc' ? r : -r; };
    const out = [];
    const walk = (list, depth, path) => [...list].sort(cmp).forEach((r, i) => {
      const id = path + '/' + i;
      const match = Object.entries(filters).every(([k, v]) => !v || String(r.data[k] ?? '').toLowerCase().includes(v.toLowerCase()));
      if (match) out.push({ ...r, depth, id, hasKids: !!(r.children && r.children.length) });
      if (r.children && (open[id] ?? r.expanded)) walk(r.children, depth + 1, id);
    });
    walk(rows, 0, '');
    return out;
  }, [rows, sort, filters, open]);
  const cycle = (k) => setSort(sort.key !== k ? { key: k, dir: 'asc' } : sort.dir === 'asc' ? { key: k, dir: 'desc' } : { key: null, dir: null });
  const cell = { padding: 'var(--tree-grid-cell-padding)', borderBottom: '1px solid var(--tree-grid-cell-border-color)', textAlign: 'left', verticalAlign: 'middle' };
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: equalColumnsWidth ? 'fixed' : 'auto', background: 'var(--background-basic-color-1)', fontFamily: 'var(--font-family-primary)', color: 'var(--text-basic-color)', fontSize: 'var(--text-paragraph-font-size)', lineHeight: 'var(--text-paragraph-line-height)', ...style }}>
      <thead>
        <tr>{columns.map((c) => (
          <th key={c.key} style={{ ...cell, width: c.width, fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600, lineHeight: 'var(--text-subtitle-line-height)' }}>
            <button type="button" disabled={!c.sortable} onClick={() => cycle(c.key)} style={{ border: 0, background: 'transparent', padding: 0, font: 'inherit', color: 'inherit', cursor: c.sortable ? 'pointer' : 'default', display: 'inline-flex', alignItems: 'center', gap: '.25rem' }}>
              {c.title}{c.sortable && <Icon icon={sort.key === c.key && sort.dir === 'desc' ? 'chevron-down-outline' : 'chevron-up-outline'} size="1rem" style={{ opacity: sort.key === c.key ? 1 : .35 }} />}
            </button>
            {c.filter && <input placeholder="Filtrar" value={filters[c.key] || ''} onChange={(e) => setFilters({ ...filters, [c.key]: e.target.value })} style={{ display: 'block', marginTop: '.5rem', width: '100%', padding: '.25rem .5rem', border: '1px solid var(--input-border-color)', borderRadius: 'var(--border-radius)', font: 'inherit', fontSize: 'var(--text-paragraph-2-font-size)', fontWeight: 400, outline: 0 }} />}
          </th>
        ))}</tr>
      </thead>
      <tbody>
        {flat.map((r) => (
          <tr key={r.id} style={{ minHeight: 'var(--tree-grid-row-min-height)' }} onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--background-basic-color-2)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
            {columns.map((c, ci) => (
              <td key={c.key} style={{ ...cell, paddingLeft: ci === 0 ? `calc(1.25rem + ${r.depth} * 1.5rem)` : undefined }}>
                {ci === 0 && r.hasKids && <button type="button" onClick={() => setOpen({ ...open, [r.id]: !(open[r.id] ?? r.expanded) })} style={{ border: 0, background: 'transparent', padding: 0, marginRight: '.5rem', cursor: 'pointer', color: 'var(--text-hint-color)', display: 'inline-flex', verticalAlign: 'middle' }}><Icon icon={(open[r.id] ?? r.expanded) ? 'chevron-down-outline' : 'chevron-right-outline'} size="1.25rem" /></button>}
                {c.render ? c.render(r.data, r) : r.data[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
