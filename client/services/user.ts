import { IdentifiedElement } from './indentified-element';

export class User implements IdentifiedElement{

	constructor(public _id: string, public displayName?: String, public administrator?:boolean, public owner?:boolean){
	}

}