import * as React from 'react';
/** NbProgressBar: horizontal bar 0–100 with optional percentage label. */
export interface ProgressBarProps { value: number; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'; displayValue?: boolean; style?: React.CSSProperties; }
export declare function ProgressBar(props: ProgressBarProps): JSX.Element;

