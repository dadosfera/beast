import * as React from 'react';
/** Reveal: an entrance, an ambient loop or hover feedback from tokens/motion.css on any element. `order` is its place in the stagger; `scene` assigns it to a sub-scene of the enclosing MotionStage. */
export interface RevealProps extends React.HTMLAttributes<HTMLElement> { as?: keyof JSX.IntrinsicElements | React.ComponentType<any>; variant?: 'rise' | 'fade' | 'left' | 'right' | 'pop' | 'grow-x' | 'grow-y' | 'draw' | 'pop-float' | 'pop-pulse' | 'pop-pulse-primary' | 'none'; order?: number; scene?: number; loop?: 'pulse' | 'pulse-primary' | 'float' | 'march' | 'blink'; hover?: 'lift' | 'tint'; }
export declare function Reveal(props: RevealProps): JSX.Element;
/** Stagger: gives consecutive children their place in the stagger without wrapping them. Children must accept `className` and `style`. */
export interface StaggerProps { children?: React.ReactNode; variant?: 'rise' | 'fade' | 'left' | 'right' | 'pop' | 'grow-x' | 'grow-y'; from?: number; step?: number; scene?: number; }
export declare function Stagger(props: StaggerProps): JSX.Element;
