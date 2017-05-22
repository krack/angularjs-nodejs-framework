import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { ListElements } from '../../../abstract-components/list-elements';

import { User } from '../../../services/user';
import { CrudService } from '../../../services/crud-service.service';


@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers:[]
})
export class UsersListComponent  extends ListElements<User> {

  constructor (usersService: CrudService<User>, router:Router) {
    super(usersService, router);
  }

}
