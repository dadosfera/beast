import * as React from 'react';
/** NbPagination (Beast-specific): round ghost page buttons with the current page filled, optional page-size select and "Exibir N de M itens" text. */
export interface PaginationProps { totalCount: number; pageSize?: number; currentPage?: number; defaultPage?: number; onPageChange?: (p: number) => void; onPageSizeChange?: (s: number) => void; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; showPageSizeOptions?: boolean; pageSizeOptions?: number[]; textShow?: string; textOf?: string; textItems?: string; disabled?: boolean; style?: React.CSSProperties; }
export declare function Pagination(props: PaginationProps): JSX.Element;

