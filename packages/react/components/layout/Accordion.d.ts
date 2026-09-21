import * as React from 'react';
/** NbAccordion: stacked expandable items with subtitle headers and a chevron, grouped in one shadowed panel. */
export interface AccordionProps { items: Array<{ title: React.ReactNode; content: React.ReactNode; disabled?: boolean; expanded?: boolean }>; multi?: boolean; style?: React.CSSProperties; }
export declare function Accordion(props: AccordionProps): JSX.Element;

