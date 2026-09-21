import * as React from 'react';
/** nbContextMenu: a Menu inside a shadowed white panel (10–15rem) opened from a trigger. */
export interface ContextMenuProps { children: React.ReactNode; items: Array<any>; onSelect?: (item: any) => void; position?: 'top' | 'bottom' | 'left' | 'right'; trigger?: 'click' | 'hover'; style?: React.CSSProperties; }
export declare function ContextMenu(props: ContextMenuProps): JSX.Element;

