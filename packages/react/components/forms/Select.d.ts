import * as React from 'react';
/** NbSelect with NbOption / NbOptionGroup: outline dropdown (min 13rem) opening a bordered option list; selected option is primary-filled. */
export interface SelectProps { options: Array<any>; value?: any; defaultValue?: any; onChange?: (v: any) => void; placeholder?: string; multiple?: boolean; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'; shape?: 'rectangle' | 'semi-round' | 'round'; appearance?: 'outline' | 'filled'; fullWidth?: boolean; disabled?: boolean; style?: React.CSSProperties; }
export declare function Select(props: SelectProps): JSX.Element;
export interface OptionListProps { options: Array<any>; value?: any; onPick?: (v: any) => void; multiple?: boolean; size?: string; style?: React.CSSProperties; }
export declare function OptionList(props: OptionListProps): JSX.Element;
