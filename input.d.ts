import { Attrs, MaybeObservable, Observable } from 'elt';
export interface InputAttributes extends Attrs {
    model: Observable<string>;
    disabled?: MaybeObservable<boolean>;
    type?: string;
    id?: string;
    label?: MaybeObservable<string>;
    placeholder?: MaybeObservable<string>;
    autocomplete?: 'on' | 'off' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'email' | 'nickname' | 'current-password' | 'organization-title' | 'organization' | 'street-address' | 'country' | 'country-name' | 'bday' | 'bday-day' | 'sex' | 'url' | 'tel' | 'photo';
    autocapitalize?: 'word' | 'words' | 'sentences' | 'sentence' | 'characters' | 'character' | 'off';
    autocorrect?: 'on' | 'off';
    spellcheck?: boolean;
    autofocus?: boolean;
    error?: Observable<string>;
}
export declare function Input(attrs: InputAttributes, content: DocumentFragment): Element;
