import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   user: User;
   username:string;
  constructor(private router: Router, public getValidUserFromAuthService: AuthenticationService ) { }

  ngOnInit() {
      this.getValidUserFromAuthService.callValiduser().subscribe((usr:User)=> {
          alert(usr);
       this.user = usr;
      });
      if(localStorage.getItem('currentUser') != null){
            this.username = localStorage.getItem('currentUser');
      }
  }
  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/api/login']);
}

}
