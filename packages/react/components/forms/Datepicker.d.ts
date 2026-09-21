import * as React from 'react';
/** nbDatepicker / NbRangepicker: an Input with a calendar icon that opens a Calendar popup. */
export interface DatepickerProps { value?: any; onChange?: (v: any) => void; range?: boolean; placeholder?: string; status?: string; size?: string; fullWidth?: boolean; disabled?: boolean; style?: React.CSSProperties; }
export declare function Datepicker(props: DatepickerProps): JSX.Element;
export declare function Rangepicker(props: DatepickerProps): JSX.Element;
