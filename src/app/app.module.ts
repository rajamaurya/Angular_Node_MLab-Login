import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UserServiceService } from './user-service.service';
import { AuthenticationService } from './authentication.service';
import { UserFormComponent } from './user-form/user-form.component';
import { FormComponent } from './form/form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.gaurd';
import { JwtInterceptor } from './JwtInterceptor';
import { HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponentComponent } from './profile-component/profile-component.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';

const approutes: Routes = [
    {path:'api/dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path:'api/login', component: LoginComponent},
    {path:'api/profile', component: ProfileComponentComponent},
    {path:'api/home', component: AppComponent},
    { path: '',
    redirectTo: 'api/login',
    pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent
    }
  //{ path: '**', component: null }
] 

@NgModule({
  declarations: [
      
    AppComponent,
    UsersListComponent,
    UsersDetailsComponent,
    UserFormComponent,
    FormComponent,
    ItemListComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ProfileComponentComponent,
    PostComponent,
    PostsComponent
  ],
  imports: [
      RouterModule.forRoot(
        approutes, {enableTracing: true}
      ),
    BrowserModule, HttpModule,RouterModule,FormsModule
  ],
  providers: [
    AuthGuard, 
    UserServiceService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi:true  
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
