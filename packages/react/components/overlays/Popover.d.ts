import * as React from 'react';
/** nbPopover: white shadowed panel with an arrow anchored to its trigger. */
export interface PopoverProps { children: React.ReactNode; content: React.ReactNode; position?: 'top' | 'bottom' | 'left' | 'right'; trigger?: 'click' | 'hover' | 'hint' | 'focus' | 'noop'; open?: boolean; onOpenChange?: (o: boolean) => void; offset?: number; contentStyle?: React.CSSProperties; style?: React.CSSProperties; }
export declare function Popover(props: PopoverProps): JSX.Element;

