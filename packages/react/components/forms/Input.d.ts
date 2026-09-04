import * as React from 'react';
/**
 * nbInput / NbFormField: text input (or textarea) with status border colors, sizes, shapes and prefix/suffix icon addons.
 * @startingPoint section="Forms" subtitle="Text input with addons" viewport="360x120"
 */
export interface InputProps { value?: string; defaultValue?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; placeholder?: string; type?: string; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'; shape?: 'rectangle' | 'semi-round' | 'round'; fullWidth?: boolean; disabled?: boolean; prefixIcon?: string; suffixIcon?: string; onSuffixClick?: () => void; multiline?: boolean; rows?: number; style?: React.CSSProperties; inputStyle?: React.CSSProperties; [key: string]: any; }
export declare function Input(props: InputProps): JSX.Element;

