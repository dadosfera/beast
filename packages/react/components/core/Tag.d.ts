import * as React from 'react';
/** NbTag / NbTagList: pill chips (1.5rem radius) in filled or outline appearance, optionally removable; TagList adds an inline input. */
export interface TagProps { text: string; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; appearance?: 'filled' | 'outline'; size?: 'small' | 'medium' | 'large'; removable?: boolean; selected?: boolean; disabled?: boolean; onRemove?: () => void; onClick?: () => void; style?: React.CSSProperties; }
export declare function Tag(props: TagProps): JSX.Element;
export interface TagListProps { tags: string[]; onChange?: (tags: string[]) => void; placeholder?: string; status?: string; appearance?: 'filled' | 'outline'; style?: React.CSSProperties; }
export declare function TagList(props: TagListProps): JSX.Element;
