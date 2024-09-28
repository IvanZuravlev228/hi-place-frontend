import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isUserRegistered: boolean = true;

  constructor(private router: Router,
              private cookie: CookieService) {
  }

  ngOnInit() {
    if (!this.cookie.get("jwt-token")) {
      this.isUserRegistered = false;
    }
  }

  public goToHomePage() {
    this.router.navigate(["home"])
  }

  public goToLoginPage() {
    const token = this.cookie.get("jwt-token");
    if (token) {
      const userId = this.cookie.get("user-id");

      const url = this.router.createUrlTree(["/user/profile"], {
        queryParams: {
          userId: userId
        }
      }).toString();

      window.open(url, '_blank');
    } else {
      window.open(this.router.createUrlTree(["/user/auth/login"]).toString(), '_blank');
    }
  }

}
