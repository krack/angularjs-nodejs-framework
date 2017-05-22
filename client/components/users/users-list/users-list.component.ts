import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { ListElements } from '../../../abstract-components/list-elements';

import { User } from '../../../services/user';
import { UsersService } from '../../../services/users.service';


@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers:[UsersService]
})
export class UsersListComponent  extends ListElements<User> {

  constructor (usersService: UsersService, router:Router) {
    super(usersService, router);
  }

}
