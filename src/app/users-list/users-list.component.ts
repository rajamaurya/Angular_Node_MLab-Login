import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Item } from '../Item';
import { User } from '../User';
//import { EventEmitter } from '../../../node_modules/protractor';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

    item: Item;
    @Input()  userList: Item[];
    @Output() notifyUD: EventEmitter<Item> = new EventEmitter<Item>();
    ifGetUserListClicked: boolean = false;
  constructor(private userServiceService: UserServiceService) { }

  ngOnInit() {
  }
  sendUserDetail(user: User){
        this.userServiceService.sendUserDetail(user);
  }
  notifyU(userItem: Item){
      this.item =  userItem;
    this.notifyUD.emit(this.item);
  }
}
