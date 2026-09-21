import * as React from 'react';
/** NbList / NbListItem: divided vertical list (1rem item padding); `onScrollEnd` supports infinite loading. */
export interface ListProps { children?: React.ReactNode; items?: any[]; renderItem?: (item: any, i: number) => React.ReactNode; onScrollEnd?: () => void; style?: React.CSSProperties; }
export declare function List(props: ListProps): JSX.Element;
export declare function ListItem(props: { children?: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }): JSX.Element;
