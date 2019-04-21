import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { Item } from '../Item';
import { UserServiceService } from '../user-service.service';
@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {

  userDetail: User;
  userItem: Item;
  constructor(private userService: UserServiceService) { 
  }

  ngOnInit() {
    this.userService.getUserDetails().subscribe( userDetail => this.userDetail = userDetail);
    console.log(this.userDetail);
  }
  
  handleUd(item: Item){
    this.userItem = item;
    alert(JSON.stringify(this.userItem));
}   

}
