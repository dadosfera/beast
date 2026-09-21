import * as React from 'react';
/** NbStepper: numbered 2rem circles joined by connectors; completed steps fill primary, the active one has a primary border. */
export interface StepperProps { steps: Array<{ label: string; content?: React.ReactNode }>; active?: number; defaultActive?: number; onChange?: (i: number) => void; orientation?: 'horizontal' | 'vertical'; linear?: boolean; disableStepNavigation?: boolean; showControls?: boolean; style?: React.CSSProperties; }
export declare function Stepper(props: StepperProps): JSX.Element;

