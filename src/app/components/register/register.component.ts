import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LeaderboardEntry} from "../../model/LeaderboardEntry";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  users: any[] = [{user: "User1", password: "xyz"}, {user: "User2", password: "123"}];
  isIncorrect = false;
  showLoadingPopup = false;
  showErrorMessage = false;
  tmp: number = 0

  constructor(private readonly router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('users') == null) {
      localStorage.setItem('users', JSON.stringify(this.users))
    }

  }

  onSubmit() {
    if (this.tmp == 0) {
      this.showLoadingPopup = true;

      setTimeout(() => {
        this.showLoadingPopup = false;
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 50000);
      }, 10000);
      this.tmp = 1;
    } else {
      if (this.users.some(obj => obj.user == this.username)) {
        this.isIncorrect = true;
      } else {
        this.users = JSON.parse(localStorage.getItem('users')!);
        this.users.push({user: this.username, password: this.password})
        localStorage.setItem('users', JSON.stringify(this.users))
        localStorage.setItem("username", this.username)
        this.router.navigate(['/menu']);
      }
    }
  }

  closeErrorMessage() {
    this.showErrorMessage = false;
  }

}
