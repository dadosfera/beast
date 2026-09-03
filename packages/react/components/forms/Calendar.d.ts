import * as React from 'react';
/** NbCalendar / NbCalendarRange: month grid (20.625rem, 2.75rem cells) with primary selected day and translucent today. */
export interface CalendarProps { date?: Date | null; defaultDate?: Date; onChange?: (d: Date) => void; range?: boolean; rangeValue?: { start: Date | null; end: Date | null }; onRangeChange?: (r: { start: Date | null; end: Date | null }) => void; min?: Date; max?: Date; size?: 'medium' | 'large'; boundingMonth?: boolean; style?: React.CSSProperties; }
export declare function Calendar(props: CalendarProps): JSX.Element;
export declare function CalendarRange(props: CalendarProps): JSX.Element;
