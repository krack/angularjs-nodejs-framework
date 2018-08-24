import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { CrudService } from './crud-service.service';
import { User } from './user';
export declare class UsersService extends CrudService<User> {
    private static connectedUser;
    private static user;
    constructor(http: Http);
    getConnectedUser(): Observable<User>;
}
