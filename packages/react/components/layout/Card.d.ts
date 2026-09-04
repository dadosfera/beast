import * as React from 'react';
/**
 * NbCard with CardHeader / CardBody / CardFooter, plus FlipCard and RevealCard variants. 1px basic-4 border, .5rem radius, no shadow.
 * @startingPoint section="Layout" subtitle="Card with header, body, footer" viewport="480x320"
 */
export interface CardProps { children?: React.ReactNode; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; accent?: string; size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'; style?: React.CSSProperties; }
export declare function Card(props: CardProps): JSX.Element;
export declare function CardHeader(props: { children?: React.ReactNode; status?: string; style?: React.CSSProperties }): JSX.Element;
export declare function CardBody(props: { children?: React.ReactNode; style?: React.CSSProperties }): JSX.Element;
export declare function CardFooter(props: { children?: React.ReactNode; style?: React.CSSProperties }): JSX.Element;
export declare function FlipCard(props: { front: React.ReactNode; back: React.ReactNode; flipped?: boolean; onFlip?: (f: boolean) => void; showToggleButton?: boolean; style?: React.CSSProperties }): JSX.Element;
export declare function RevealCard(props: { front: React.ReactNode; back: React.ReactNode; revealed?: boolean; onReveal?: (r: boolean) => void; showToggleButton?: boolean; style?: React.CSSProperties }): JSX.Element;
