import * as React from 'react';
/** NbBadge: tiny status label, optionally pinned to a corner of a relative parent, or a dot. */
export interface BadgeProps { text?: string; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; position?: string; dotMode?: boolean; style?: React.CSSProperties; }
export declare function Badge(props: BadgeProps): JSX.Element;

