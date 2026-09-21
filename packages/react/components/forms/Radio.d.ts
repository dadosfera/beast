import * as React from 'react';
/** NbRadio / NbRadioGroup: 1.25rem circles with a primary inner dot; RadioGroup manages a single selection. */
export interface RadioProps { checked?: boolean; onChange?: (value: any) => void; label?: React.ReactNode; children?: React.ReactNode; value?: any; name?: string; status?: string; disabled?: boolean; style?: React.CSSProperties; }
export declare function Radio(props: RadioProps): JSX.Element;
export interface RadioGroupProps { options: Array<string | { value: any; label: React.ReactNode; disabled?: boolean }>; value?: any; defaultValue?: any; onChange?: (value: any) => void; name?: string; status?: string; disabled?: boolean; direction?: 'row' | 'column'; style?: React.CSSProperties; }
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
