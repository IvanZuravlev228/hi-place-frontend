import { Component } from '@angular/core';
import {UserLogin} from "./UserLogin";
import {UserService} from "../../services/user.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userLogin: UserLogin = new UserLogin();

  isEmailCorrect = false;
  isPasswordCorrect = false;
  messageAboutEmail = 'Incorrect email format';
  messageAboutPassword = 'Incorrect password format';

  constructor(private userService: UserService,
              private cookie: CookieService,
              private router: Router) {
  }

  onSubmit() {
    this.userService.login(this.userLogin).subscribe({
      next: (tokenObj) => {
        const expiresDate = new Date();
        expiresDate.setFullYear(expiresDate.getFullYear() + 2);
        this.cookie.set("jwt-token", tokenObj.token, { expires: expiresDate, path: "/"});
        this.cookie.set("user-id", tokenObj.userId, { expires: expiresDate, path: "/"});
        this.router.navigate(["user/profile"], {
          queryParams: {
            userId: tokenObj.userId
          }
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
