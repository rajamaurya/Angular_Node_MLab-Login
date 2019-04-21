import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers, Response } from '@angular/http';
import { Observable, BehaviorSubject } from '../../node_modules/rxjs';
import { Item} from './Item';
import { map, find } from 'rxjs/operators';
import { ThrowStmt } from '../../node_modules/@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
    private userListUrl = "https://jsonplaceholder.typicode.com/posts";
    private userDetailSubject = new BehaviorSubject(null);

  constructor(private http: Http) { 
      this.getUsersList();
  }
  getUsersList(): Observable<Item[]>{
     return this.http.get(this.userListUrl).pipe(map( res=> res.json()));
}

createUser(user){
    //console.log(JSON.stringify(user));
    let headers = new Headers({'Content-Type': 'application/json'});
    let json = JSON.stringify({ userid : '11', title:'New update' , body : "Hello Josn"});
    let body = JSON.stringify(user);
    return this.http.post("https://jsonplaceholder.typicode.com/posts" , body,{headers : headers}).pipe(map(this.receivedData));
}
updateUserItemBox(userItem){
    let headers = new Headers({'Content-Type': 'application/json'});
    let itemBody = JSON.stringify(userItem);
    return this.http.put(this.userListUrl+ userItem.id,itemBody).pipe(map(this.receivedData)); 
}
deleteIUsertem(userItem){
    return this.http.delete(this.userListUrl+'/'+ userItem.id); 
}
receivedData(res: Response){
    return res.json()|| {}
}

sendUserDetail(user){
    // alert("form send user details");
   /* let detail = this.http.get(this.userListUrl).pipe( map(res => res.json()));
    console.log(detail); */
    this.userDetailSubject.next(user);
}
getUserDetails(){
    return this.userDetailSubject.asObservable();
}
}
