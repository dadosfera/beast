import * as React from 'react';
/** Renders an Eva Icons glyph (Beast default pack) or a Dadosfera custom icon (coletar, catalogo, inteligencia, data-app, pipelines…) by name. */
export interface IconProps { icon: string; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; size?: string; style?: React.CSSProperties; className?: string; }
export declare function Icon(props: IconProps): JSX.Element;

