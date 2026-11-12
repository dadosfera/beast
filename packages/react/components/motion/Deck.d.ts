import * as React from 'react';
/**
 * Deck: presentation player. Mounts one Slide at a time; next() reveals the slide's sub-scenes before moving on and previous() lands on the last scene of the slide before.
 * @startingPoint section="Motion" subtitle="Slide deck with sub-scenes and replay" viewport="1280x720"
 */
export interface DeckProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> { children?: React.ReactNode; index?: number; defaultIndex?: number; onIndexChange?: (index: number) => void; mode?: 'all' | 'scenes'; defaultMode?: 'all' | 'scenes'; onModeChange?: (mode: 'all' | 'scenes') => void; keyboard?: boolean; labels?: Partial<DeckLabels>; }
export declare function Deck(props: DeckProps): JSX.Element;
/** Copy used by Deck and DeckNav (pt-BR by default). */
export interface DeckLabels { deck: string; previousSlide: string; nextSlide: string; previousScene: string; nextScene: string; replay: string; byScenes: string; slide: string; scene: string; of: string; }
/** Slide: slide chrome (breadcrumb, view chip, h1, body, footer with DeckNav). `scenes` tells the Deck how many sub-scenes the slide has. */
export interface SlideProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> { breadcrumb?: React.ReactNode; title?: React.ReactNode; chip?: React.ReactNode; tone?: 'light' | 'primary'; footer?: React.ReactNode; nav?: boolean; scenes?: number; }
export declare function Slide(props: SlideProps): JSX.Element;
/** DeckNav: mode toggle, previous, "02 / 10" counter with scene dots, next and replay. Reads the enclosing Deck unless values are passed. */
export interface DeckNavProps { tone?: 'light' | 'primary'; index?: number; count?: number; scene?: number; scenes?: number; mode?: 'all' | 'scenes'; onPrevious?: () => void; onNext?: () => void; onReplay?: () => void; onModeChange?: (mode: 'all' | 'scenes') => void; labels?: Partial<DeckLabels>; style?: React.CSSProperties; }
export declare function DeckNav(props: DeckNavProps): JSX.Element;
