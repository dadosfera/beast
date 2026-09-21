import * as React from 'react';
/** NbToastr: Toast card (icon disc + title + message) and ToastContainer stacking toasts in a viewport corner. */
export interface ToastProps { title?: string; message?: string; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; icon?: string; hasIcon?: boolean; destroyByClick?: boolean; onClose?: () => void; style?: React.CSSProperties; }
export declare function Toast(props: ToastProps): JSX.Element;
export declare function ToastContainer(props: { toasts: Array<ToastProps & { id: any }>; position?: string; onClose?: (id: any) => void; style?: React.CSSProperties }): JSX.Element;
