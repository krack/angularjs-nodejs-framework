import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ElementComponent } from '../../../abstract-components/elements-component';
import { User } from '../../../services/user';
import { UsersService } from '../../../services/users.service';
export declare class UsersListElementComponent extends ElementComponent<User> implements OnInit {
    element: User;
    elements: User[];
    constructor(usersService: UsersService, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
    switchAdministrator(): void;
    removeUser(): void;
}
