import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserServiceService } from '../user-service.service';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

    user = new User();
    userl: User[];
    userData:{
        id: number,
        name: string
    }
  constructor(private userService: UserServiceService) { }

  ngOnInit() {
  }
  saveUserForm(user){
            
            console.log(user.id + "\t" + user.name);

            this.userService.createUser(user).subscribe(data => {
                   if(data)alert("successfully saved");
                // refresh user list
                /* llet rest = this.userService.getUsersList().subscribe(data => {
                    this.userl = data;
                    alert("successfully saved" + "data" + JSON.stringify(this.userl));
                console.log("final updated data" + "  " + JSON.stringify(data));
                return true;});   */
            },
            error => {
                alert(" Error while saving user data");
                return Observable.throw(error);
            }
            
        );
            
  }
  getUserDetail(){
      this.userService.getUserDetails().subscribe(data => data);
  }
}
