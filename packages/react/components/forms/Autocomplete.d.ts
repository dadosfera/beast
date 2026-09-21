import * as React from 'react';
/** nbAutocomplete: text input that filters an option list as you type. */
export interface AutocompleteProps { options: Array<string | { value: any; label: string }>; value?: string; onChange?: (text: string) => void; onSelect?: (value: any) => void; placeholder?: string; status?: string; size?: string; fullWidth?: boolean; disabled?: boolean; filter?: (option: any, query: string) => boolean; style?: React.CSSProperties; }
export declare function Autocomplete(props: AutocompleteProps): JSX.Element;

