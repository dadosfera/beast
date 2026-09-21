import * as React from 'react';
/** NbAlert: block message filled with a status color (padding 1rem 1.125rem); `accent` adds a top bar, `outline` a colored border, `closable` a close icon. */
export interface AlertProps { children?: React.ReactNode; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; accent?: string; outline?: string; closable?: boolean; onClose?: () => void; size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'; style?: React.CSSProperties; }
export declare function Alert(props: AlertProps): JSX.Element;

