import * as React from 'react';
/** What a MotionStage hands to its render function and to the `controls` ref. */
export interface MotionStageApi { scene: number; scenes: number; mode: 'all' | 'scenes'; next: () => boolean; previous: () => boolean; replay: () => void; goTo: (scene: number) => boolean; atStart: boolean; atEnd: boolean; }
/** MotionStage: root that owns the choreography of its descendants. mode "all" plays every scene on entry; mode "scenes" enters with scene 1 and reveals one more per next(). */
export interface MotionStageProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> { as?: keyof JSX.IntrinsicElements | React.ComponentType<any>; mode?: 'all' | 'scenes'; scenes?: number; scene?: number; defaultScene?: number; onSceneChange?: (scene: number) => void; held?: boolean; keyboard?: boolean; controls?: React.Ref<MotionStageApi>; children?: React.ReactNode | ((api: MotionStageApi) => React.ReactNode); }
export declare function MotionStage(props: MotionStageProps): JSX.Element;
/** Scene: marks a block as sub-scene `index` (1–12) of the enclosing MotionStage. */
export interface SceneProps extends React.HTMLAttributes<HTMLElement> { index: number; as?: keyof JSX.IntrinsicElements | React.ComponentType<any>; }
export declare function Scene(props: SceneProps): JSX.Element;
