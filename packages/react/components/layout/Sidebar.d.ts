import * as React from 'react';
/** NbSidebar: 16rem white side panel (3.5rem when compacted) with optional header/footer slots. */
export interface SidebarProps { children?: React.ReactNode; header?: React.ReactNode; footer?: React.ReactNode; state?: 'expanded' | 'compacted' | 'collapsed'; right?: boolean; fixed?: boolean; style?: React.CSSProperties; }
export declare function Sidebar(props: SidebarProps): JSX.Element;

