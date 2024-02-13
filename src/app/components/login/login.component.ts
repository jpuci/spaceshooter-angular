import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  users: any[] = [{user: "User1", password: "xyz"}, {user: "User2", password: "123"}];
  isIncorrect = false;

  constructor(private readonly router: Router){

  }
  onSubmit(){
    console.log(this.users);
    console.log({user: this.username, password: this.password})

    if (this.includesObject(this.users, {user: this.username, password: this.password})){
      this.isIncorrect = false;
      localStorage.setItem("username", this.username)
      localStorage.setItem("password", this.password);
      this.router.navigate(['/menu']);
    } else {
      this.isIncorrect = true;
    }
    // this.userService.login({
    //   username: this.username,
    //   password: this.password
    // }).pipe(
    //   catchError(error => {
    //     this.isIncorrect = true;
    //     console.log("login failed")
    //     this.errorMessage = error.error
    //     return of(null);
    //
    //   }),
    //   tap((response: any) => {
    //     if (response){
    //       localStorage.setItem("username", this.username)
    //       localStorage.setItem("jwtToken", response.accessToken);
    //       this.router.navigate(['/menu']);
    //     }
    //   })).subscribe();
  }

  includesObject(list: any[], searchObject: { user: string, password: string}): boolean {
    return list.some(obj => obj.user === searchObject.user && obj.password === searchObject.password);
  }
}
