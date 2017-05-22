import { Router } from '@angular/router';
import { ListElements } from '../../../abstract-components/list-elements';
import { User } from '../../../services/user';
import { CrudService } from '../../../services/crud-service.service';
export declare class UsersListComponent extends ListElements<User> {
    constructor(usersService: CrudService<User>, router: Router);
}
