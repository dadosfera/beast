import * as React from 'react';
/** NbActions: horizontal icon toolbar with dividers, used in headers (2.25rem tall, 0 1.25rem padding). */
export interface ActionsProps { items: Array<any>; size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'; fullWidth?: boolean; style?: React.CSSProperties; }
export declare function Actions(props: ActionsProps): JSX.Element;

