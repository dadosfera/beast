import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';
import { Button } from '../core/Button.jsx';

// NbCalendar / NbCalendarRange (day view). 20.625rem wide, 2.75rem cells, primary selection, today = primary-transparent.
const WD = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'];
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const same = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const key = (d) => d.toISOString().slice(0, 10);
export function Calendar({ date, defaultDate, onChange, range, rangeValue, onRangeChange, min, max, size = 'medium', boundingMonth = true, style }) {
  const today = new Date();
  const [internal, setInternal] = useState(defaultDate || null);
  const sel = date !== undefined ? date : internal;
  const [rng, setRng] = useState(rangeValue || { start: null, end: null });
  const r = rangeValue !== undefined ? rangeValue : rng;
  const [view, setView] = useState(() => { const d = sel || (r && r.start) || today; return new Date(d.getFullYear(), d.getMonth(), 1); });
  const cell = size === 'large' ? '3rem' : 'var(--calendar-day-cell-size)';
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(first); start.setDate(1 - offset);
  const days = Array.from({ length: 42 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d; });
  const pick = (d) => {
    if (range) {
      let next;
      if (!r.start || (r.start && r.end)) next = { start: d, end: null };
      else next = d < r.start ? { start: d, end: r.start } : { start: r.start, end: d };
      setRng(next); onRangeChange && onRangeChange(next);
    } else { setInternal(d); onChange && onChange(d); }
  };
  const inRange = (d) => range && r.start && r.end && d > r.start && d < r.end;
  const isEdge = (d) => range && (same(d, r.start) || same(d, r.end));
  const disabled = (d) => (min && d < min) || (max && d > max);
  return (
    <div style={{ width: size === 'large' ? '22.5rem' : 'var(--calendar-width)', background: 'var(--background-basic-color-1)', border: '.0625rem solid var(--border-basic-color-4)', borderRadius: 'var(--border-radius)', fontFamily: 'var(--font-family-primary)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--calendar-navigation-padding)' }}>
        <Button appearance="ghost" size="medium" icon="chevron-left-outline" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} />
        <Button appearance="ghost" size="medium" style={{ color: 'var(--text-basic-color)' }}>{MONTHS[view.getMonth()]} {view.getFullYear()}</Button>
        <Button appearance="ghost" size="medium" icon="chevron-right-outline" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 .5rem', borderBottom: '1px solid var(--divider-color)' }}>
        {WD.map((w) => <div key={w} style={{ height: cell, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-hint-color)', fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600 }}>{w}</div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '.5rem' }}>
        {days.map((d) => {
          const other = d.getMonth() !== view.getMonth();
          if (other && !boundingMonth) return <div key={key(d)} />;
          const s = (!range && same(d, sel)) || isEdge(d);
          const t = same(d, today);
          const ir = inRange(d);
          const dis = disabled(d);
          return (
            <button key={key(d)} type="button" disabled={dis} onClick={() => pick(d)}
              style={{ height: cell, border: `1px solid ${s ? 'var(--color-primary-default)' : t ? 'var(--color-primary-transparent-default)' : 'transparent'}`, borderRadius: range && ir ? 0 : 'var(--border-radius)', background: s ? 'var(--color-primary-default)' : ir ? 'var(--color-primary-transparent-200)' : t ? 'var(--color-primary-transparent-default)' : 'transparent', color: dis ? 'var(--text-disabled-color)' : s ? 'var(--text-control-color)' : other ? 'var(--text-hint-color)' : 'var(--text-basic-color)', opacity: other ? .5 : 1, fontFamily: 'inherit', fontSize: 'var(--text-subtitle-font-size)', fontWeight: 600, cursor: dis ? 'not-allowed' : 'pointer', transition: 'background .1s ease' }}
              onMouseEnter={(e) => { if (!s && !dis) e.currentTarget.style.background = 'var(--background-basic-color-2)'; }} onMouseLeave={(e) => { if (!s) e.currentTarget.style.background = ir ? 'var(--color-primary-transparent-200)' : t ? 'var(--color-primary-transparent-default)' : 'transparent'; }}>
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CalendarRange(props) { return <Calendar range {...props} />; }
