import * as React from 'react';
/** NbButtonGroup with nbButtonToggle: adjacent buttons sharing one rounded frame, single or multiple selection. */
export interface ButtonGroupProps { options: Array<string | { value: string; label: React.ReactNode; icon?: string }>; value?: any; defaultValue?: any; multiple?: boolean; onChange?: (v: any) => void; appearance?: 'filled' | 'outline' | 'ghost'; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'; shape?: 'rectangle' | 'semi-round' | 'round'; disabled?: boolean; style?: React.CSSProperties; }
export declare function ButtonGroup(props: ButtonGroupProps): JSX.Element;

