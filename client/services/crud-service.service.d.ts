import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { IdentifiedElement } from './indentified-element';
export declare class CrudService<T extends IdentifiedElement> {
    protected http: Http;
    protected url: string;
    protected options: RequestOptions;
    constructor(url: string, http: Http);
    getAlls(): Observable<T[]>;
    protected extractData(res: Response): any;
    private handleError(error);
    getById(id: String): Observable<T>;
    add(element: T): Observable<T>;
    updateElement(element: T): Observable<T>;
    deleteById(id: String): Observable<any>;
}
