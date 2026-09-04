import * as React from 'react';
/** NbDialogService: a Card centered over a dimmed backdrop with title, body and footer actions. */
export interface DialogProps { open: boolean; onClose?: () => void; title?: React.ReactNode; children?: React.ReactNode; footer?: React.ReactNode; closeOnBackdropClick?: boolean; hasBackdrop?: boolean; width?: string; style?: React.CSSProperties; }
export declare function Dialog(props: DialogProps): JSX.Element;

