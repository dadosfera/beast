NbCalendar / NbCalendarRange: month grid (20.625rem, 2.75rem cells) with primary selected day and translucent today.

```jsx
<Calendar defaultDate={new Date()} />
<CalendarRange onRangeChange={setRange} />
```

- Portuguese weekday/month labels (seg…dom).
- `min`/`max` disable days; `size="large"` uses 3rem cells.
