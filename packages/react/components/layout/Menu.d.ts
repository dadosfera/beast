import * as React from 'react';
/** NbMenu: vertical navigation list with icons, groups, badges and expandable children; active item is primary with a left bar. */
export interface MenuProps { items: Array<any>; selected?: string; onSelect?: (item: any) => void; compact?: boolean; style?: React.CSSProperties; }
export declare function Menu(props: MenuProps): JSX.Element;

