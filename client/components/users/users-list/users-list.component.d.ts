import { Router } from '@angular/router';
import { ListElements } from '../../../abstract-components/list-elements';
import { User } from '../../../services/user';
import { UsersService } from '../../../services/users.service';
export declare class UsersListComponent extends ListElements<User> {
    constructor(usersService: UsersService, router: Router);
}
