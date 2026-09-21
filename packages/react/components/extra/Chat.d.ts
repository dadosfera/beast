import * as React from 'react';
/** NbChat: message thread with a status header, primary bubbles for own messages, basic-2 bubbles for others, and a send form. */
export interface ChatProps { title?: React.ReactNode; messages: Array<any>; onSend?: (text: string) => void; status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'; size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'; scrollBottom?: boolean; placeholder?: string; style?: React.CSSProperties; }
export declare function Chat(props: ChatProps): JSX.Element;
export declare function ChatMessage(props: any): JSX.Element;
