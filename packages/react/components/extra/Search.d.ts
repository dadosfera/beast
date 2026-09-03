import * as React from 'react';
/** NbSearch: a search icon trigger that opens a full-screen overlay with a heading-1 sized input. */
export interface SearchProps { open?: boolean; onOpenChange?: (o: boolean) => void; onSearch?: (q: string) => void; placeholder?: string; hint?: string; type?: string; style?: React.CSSProperties; }
export declare function Search(props: SearchProps): JSX.Element;

