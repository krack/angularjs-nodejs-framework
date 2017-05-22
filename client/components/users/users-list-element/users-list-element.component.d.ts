import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ElementComponent } from '../../../abstract-components/elements-component';
import { User } from '../../../services/user';
import { CrudService } from '../../../services/crud-service.service';
export declare class UsersListElementComponent extends ElementComponent<User> implements OnInit {
    element: User;
    elements: User[];
    constructor(usersService: CrudService<User>, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    switchAdministrator(): void;
}
