import * as React from 'react';
/** nbTimepicker: an Input opening a 20rem hour/minute column picker with OK/Cancelar footer. */
export interface TimePickerProps { value?: { h: number; m: number; s?: number } | null; onChange?: (v: { h: number; m: number; s?: number }) => void; step?: number; withSeconds?: boolean; singleColumn?: boolean; placeholder?: string; status?: string; size?: string; fullWidth?: boolean; disabled?: boolean; style?: React.CSSProperties; }
export declare function TimePicker(props: TimePickerProps): JSX.Element;

