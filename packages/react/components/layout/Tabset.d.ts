import * as React from 'react';
/** NbTabset / NbRouteTabset: uppercase bold tabs (padding 1rem 2rem) with a .25rem primary underline. */
export interface TabsetProps { tabs: Array<{ id: string; title: string; icon?: string; badge?: { text?: string; status?: string; dotMode?: boolean }; disabled?: boolean; content?: React.ReactNode }>; active?: string; defaultActive?: string; onChange?: (id: string) => void; fullWidth?: boolean; children?: React.ReactNode; style?: React.CSSProperties; }
export declare function Tabset(props: TabsetProps): JSX.Element;
export declare function RouteTabset(props: TabsetProps): JSX.Element;
