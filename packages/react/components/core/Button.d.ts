import * as React from 'react';
/**
 * Beast/Nebular nbButton: filled, outline or ghost button in five sizes with status colors.
 * @startingPoint section="Core" subtitle="Filled / outline / ghost button" viewport="360x120"
 */
export interface ButtonProps { children?: React.ReactNode; appearance?: 'filled' | 'outline' | 'ghost' | 'hero'; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'; shape?: 'rectangle' | 'semi-round' | 'round'; fullWidth?: boolean; disabled?: boolean; icon?: string; iconEnd?: string; iconOnly?: boolean; onClick?: (e: React.MouseEvent) => void; type?: 'button' | 'submit' | 'reset'; style?: React.CSSProperties; }
export declare function Button(props: ButtonProps): JSX.Element;

