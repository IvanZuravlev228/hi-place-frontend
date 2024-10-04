import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css', './about.optimization.component.css']
})
export class AboutComponent {


  constructor(private router: Router) {
  }

  goToMainPage() {
    this.router.navigate(["/home"]);
  }

  goToRegisterPage() {
    this.router.navigate(["/user/auth/register"])
  }

  goToDiscountPage() {

  }
}
