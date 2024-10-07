import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {AddressService} from "../../services/address.service";
import {Address} from "../../models/Address";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.css', './user-preview.optimization.component.css']
})
export class UserPreviewComponent implements OnInit{
  private hiddenPhoneMask: string = "+380 (**) *** ** **";

  @Input() userId: number = -1;
  @Input() inputUser: User = new User();
  user: User = new User();
  addresses: Address[] = [];

  constructor(private userService: UserService,
              private addressService: AddressService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.userId == -1 && this.inputUser.id > 0) {
      this.user = this.inputUser;
      this.hidePhone(this.user);
      return;
    }
    this.getUserById(this.userId);
  }

  public revealPhone(user: User): void {
    user.hiddenPhone = user.phone;
  }

  // public getStars(rating: number): string[] {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     if (i <= rating) {
  //       stars.push('fas fa-star');
  //     } else if (i - 0.5 <= rating) {
  //       stars.push('fas fa-star-half-alt');
  //     } else {
  //       stars.push('far fa-star');
  //     }
  //   }
  //   return stars;
  // }

  // public goToProfile() {
  //   this.router.navigate(["user/profile"], {
  //     queryParams: {
  //       userId: this.userId
  //     }
  //   })
  // }

  private getUserById(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.hidePhone(this.user);
        this.getAllAddressesByUserId();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  private hidePhone(user: User) {
    user.hiddenPhone = this.hiddenPhoneMask;
  }

  private getAllAddressesByUserId() {
    this.addressService.getAllByUserId(this.userId).subscribe({
      next: (addresses) => {
        this.addresses = addresses;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  scrollToReview() {
    const element = document.getElementById('scroll-review');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
