import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  users: any[] = [{user: "User1", password: "xyz"}, {user: "User2", password: "123"}];
  isIncorrect = false;

  constructor(private readonly router: Router){

  }

  ngOnInit() {
    if (localStorage.getItem('users') !== null) {
      this.users = JSON.parse(localStorage.getItem('users')!)
    }

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
  }

  includesObject(list: any[], searchObject: { user: string, password: string}): boolean {
    return list.some(obj => obj.user === searchObject.user && obj.password === searchObject.password);
  }
}
