import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:any = {};
  
  userName:any;
  errorMssg = '';
  returnUrl: string = '';
  constructor(
      private authService: AuthenticationService, private router: Router,
      private activatedRoute: ActivatedRoute
   ) { }

  ngOnInit() {

      //this.authService.logout();

      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
      console.log(this.returnUrl);
  }

  

  login(formref: NgForm){
      const userData: User = {
        username: formref.value.username,
        password: formref.value.password
      }
    this.authService.login(userData).subscribe(user => {
        this.userName = user;
        alert("Logged in user" + JSON.stringify(user) + "successfully.." + "userName  " + this.userName);
       
        // console.log(JSON.stringify(data));
        
        localStorage.setItem('currentUser' , userData.username);
       this.router.navigate(['/api/dashboard']);
       //alert("returned url is   " + this.returnUrl + 'api/dashboard');
    },
    error => {
        this.errorMssg = error;
    }
    );
  }
  logout(){
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
  }
}
