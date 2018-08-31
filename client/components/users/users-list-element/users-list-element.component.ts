import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { ElementComponent } from '../../../abstract-components/elements-component';;
import { User } from '../../../services/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'users-list-element',
  templateUrl: './users-list-element.component.html',
  styleUrls: ['./users-list-element.component.scss'],
  providers: [UsersService]
})
export class UsersListElementComponent extends ElementComponent<User> implements OnInit {

  @Input() element: User;
  @Input() elements: User[];


  constructor(usersService: UsersService, router: Router, route: ActivatedRoute) {
    super("/users/", usersService, router, route);
  }

  ngOnInit() {
    this.listOfElement = this.elements;

  }

  switchAdministrator() {
    if (this.element.administrator) {
      this.element.administrator = false;
    } else {
      this.element.administrator = true;
    }
    this.crudService.updateElement(this.element).subscribe();
  }

  removeUser(event: any) {
    this.deleteElement(event);
  }
}