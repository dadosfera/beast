import * as React from 'react';
/** NbToggle: 3.125rem pill switch with a white 1.75rem knob that shows a checkmark when on. */
export interface ToggleProps { checked?: boolean; defaultChecked?: boolean; onChange?: (checked: boolean) => void; label?: React.ReactNode; labelPosition?: 'left' | 'right'; status?: string; disabled?: boolean; style?: React.CSSProperties; }
export declare function Toggle(props: ToggleProps): JSX.Element;

