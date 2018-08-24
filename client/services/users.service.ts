import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { CrudService } from './crud-service.service';
import { User } from './user';
import { AppSettings } from '../config/appSettings';

@Injectable()
export class UsersService extends CrudService<User>{
  private static connectedUser: Observable<User>;
  private static user: User;

  constructor(http: Http) {
    super(AppSettings.API_ENDPOINT + 'users/', http);
  }



  getConnectedUser(): Observable<User> {
    if (!UsersService.connectedUser) {
      UsersService.connectedUser = new Observable(observer => {
        if (!UsersService.user) {
          observer.next(null);

          this.http.get(AppSettings.API_ENDPOINT + 'me', this.options)
            .map(this.extractData)
            .subscribe(
              result => {
                observer.next(result);
                UsersService.user = result;

              },
              error => observer.error(error.status)
            );
        } else {
          observer.next(UsersService.user);
        }
      });
    }


    return UsersService.connectedUser;
  }
}
