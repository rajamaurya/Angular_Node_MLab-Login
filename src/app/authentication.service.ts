import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { User } from './User';
import {Subject} from 'rxjs'; 
import { map } from '../../node_modules/rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url: string = "http://localhost:3000";
  private validUser = new Subject<User>();
  usr:User;
  constructor(private http: Http) { }

  login(userData:User){
      const postUserData: User = { username: userData.username , password: userData.password};
      // this.validUser.next(postUserData);
    let headers = new Headers({'Content-Type': 'application/application/x-www-form-urlencoded',
    'Access-Control-Allow-Credentials':true,
    'Access-Control-Allow-Origin':true});
    //alert(this.url);
     return  this.http.post(this.url+'/api/authenticate', {username: postUserData.username, password:postUserData.password},{headers : headers})
     .pipe(
         map(User =>{
          if(User){
              alert(postUserData.username);
            localStorage.setItem('currentUser',postUserData.username);
              // localStorage.setItem('currentUser',JSON.stringify(User));
          }
          
          return User;
          //return this.validUser.next(postUserData);
      })
    );
   
  }
  callValiduser(){
    return this.validUser.asObservable();
   }
  
}
