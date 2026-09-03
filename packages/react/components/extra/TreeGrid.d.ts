import * as React from 'react';
/** NbTreeGrid: data table with sortable headers, column filters and expandable child rows. */
export interface TreeGridProps { columns: Array<{ key: string; title: React.ReactNode; sortable?: boolean; filter?: boolean; width?: string | number; render?: (data: any, row: any) => React.ReactNode }>; rows: Array<{ data: any; children?: any[]; expanded?: boolean }>; equalColumnsWidth?: boolean; style?: React.CSSProperties; }
export declare function TreeGrid(props: TreeGridProps): JSX.Element;

