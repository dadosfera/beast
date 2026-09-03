import * as React from 'react';
/** NbCheckbox: 1.25rem box with 3px radius that fills primary when checked; supports indeterminate. */
export interface CheckboxProps { checked?: boolean; defaultChecked?: boolean; indeterminate?: boolean; onChange?: (checked: boolean) => void; label?: React.ReactNode; children?: React.ReactNode; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; disabled?: boolean; style?: React.CSSProperties; }
export declare function Checkbox(props: CheckboxProps): JSX.Element;

