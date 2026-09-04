import * as React from 'react';
/** NbSpinner: rotating ring, inline with an optional message or as an overlay covering its relative parent. */
export interface SpinnerProps { status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'; message?: string; overlay?: boolean; style?: React.CSSProperties; }
export declare function Spinner(props: SpinnerProps): JSX.Element;

