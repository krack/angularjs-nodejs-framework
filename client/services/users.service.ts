import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { CrudService } from './crud-service.service';
import { User } from './user';


export class UsersService extends CrudService<User>{
  private connectedUser: Observable<User>;

  constructor (protected baseApi:string, http: Http) {
    super(baseApi+'users/', http);
  }



  getConnectedUser(): Observable<User>{
    if(!this.connectedUser){
      this.connectedUser= new Observable(observer => {

        observer.next(null);

        this.http.get(this.baseApi+'me', this.options)
        .map(this.extractData)
        .subscribe(
          result => {
            observer.next(result)
          },
          error=>observer.error(error.status)
        );
      });
    }


    return this.connectedUser;
  }
}
