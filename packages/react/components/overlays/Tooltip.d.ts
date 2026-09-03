import * as React from 'react';
/** nbTooltip: dark caption bubble (.5rem 1rem) with an arrow, shown on hover or click. */
export interface TooltipProps { children: React.ReactNode; text: string; icon?: string; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; position?: 'top' | 'bottom' | 'left' | 'right'; trigger?: 'hover' | 'click'; style?: React.CSSProperties; }
export declare function Tooltip(props: TooltipProps): JSX.Element;

