import { IdentifiedElement } from './indentified-element';
export declare class User implements IdentifiedElement {
    _id: string;
    displayName: String;
    administrator: boolean;
    owner: boolean;
    constructor(_id: string, displayName?: String, administrator?: boolean, owner?: boolean);
}
