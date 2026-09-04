import * as React from 'react';
/** NbWindowService: floating panel with minimize / full-screen / close controls. */
export interface WindowProps { title: React.ReactNode; children?: React.ReactNode; state?: 'default' | 'minimized' | 'full-screen'; onStateChange?: (s: string) => void; onClose?: () => void; width?: string; style?: React.CSSProperties; }
export declare function Window(props: WindowProps): JSX.Element;

