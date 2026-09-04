import * as React from 'react';
/**
 * NbLayout family: page shell with LayoutHeader (4.75rem, shadow), LayoutBody (sidebar + column row), LayoutColumn (padded content) and LayoutFooter.
 * @startingPoint section="Layout" subtitle="Header + sidebar + column shell" viewport="1280x720"
 */
export interface LayoutProps { children?: React.ReactNode; style?: React.CSSProperties; windowMode?: boolean; }
export declare function Layout(props: LayoutProps): JSX.Element;
export declare function LayoutHeader(props: { children?: React.ReactNode; fixed?: boolean; subheader?: boolean; style?: React.CSSProperties }): JSX.Element;
export declare function LayoutBody(props: { children?: React.ReactNode; style?: React.CSSProperties }): JSX.Element;
export declare function LayoutColumn(props: { children?: React.ReactNode; left?: boolean; style?: React.CSSProperties }): JSX.Element;
export declare function LayoutFooter(props: { children?: React.ReactNode; fixed?: boolean; style?: React.CSSProperties }): JSX.Element;
