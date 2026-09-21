import * as React from 'react';
/** NbUser: avatar (picture or initials) with name and title. */
export interface UserProps { name: string; title?: string; picture?: string; size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'; shape?: 'rectangle' | 'semi-round' | 'round'; onlyPicture?: boolean; color?: string; badgeText?: string; badgeStatus?: string; style?: React.CSSProperties; }
export declare function User(props: UserProps): JSX.Element;

