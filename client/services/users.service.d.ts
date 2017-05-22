import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { CrudService } from './crud-service.service';
import { User } from './user';
export declare class UsersService extends CrudService<User> {
    protected baseApi: string;
    private connectedUser;
    constructor(baseApi: string, http: Http);
    getConnectedUser(): Observable<User>;
}
