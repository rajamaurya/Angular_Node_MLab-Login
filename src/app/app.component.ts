import { Component, Input } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { LoginComponent } from './login/login.component'; 
import { Item } from './Item';
import { Observable } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    usersList: Item[];
    userItem: Item;
    doingEdit: boolean = false;
    isAddUserClicked: boolean = false;
    ifGetUserListClicked: boolean = false;
    isAddUserItemClicked: boolean = false;
    exitItemFormPage: boolean = true;
    
    constructor(private userServiceService: UserServiceService){}
    getUserList(){
      
        this.userServiceService.getUsersList().subscribe( userList => this.usersList = userList);
        this.ifGetUserListClicked = true;
    }
    addUser(){
       this.isAddUserClicked = true;
    }
    addItem(){
        this.isAddUserItemClicked = true;
        alert("exitItemFormPage status"+ "\t" + this.exitItemFormPage);
        this.exitItemFormPage = true;
        alert("exitItemFormPage status"+ "\t" + this.exitItemFormPage);
    }
    exitEventFired(gotitemFormStatus: boolean){
       // gotitemFormStatus = true;
        this.exitItemFormPage = gotitemFormStatus;
        //this.exitItemFormPage = event.
    }
    handleUd(item: Item){
        this.userItem = item;
        alert(JSON.stringify(this.userItem));
    }
    getEditingData(userItem: Item){
        this.doingEdit = true;
        alert(JSON.stringify(userItem));
    }
    saveEditFormData(userItemdata){
        this.userServiceService.updateUserItemBox(userItemdata).subscribe(data => {
            if(data){
                alert("saved successfully..");
            }
        },
            error =>{
                return Observable.throw(error);
            });
        this.doingEdit = false;
    }
    deleteIUsertem(userItem){
        this.userServiceService.deleteIUsertem(userItem).subscribe(data => {
            if(data){
                alert("Deleted successfully..");
            }
        },
            error =>{
                return Observable.throw(error);
            });
           userItem = false;
        this.doingEdit = false;
    }
}
