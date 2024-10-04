import {Component, Input} from '@angular/core';
import {Discount} from "../../../models/Discount";
import {Router} from "@angular/router";
import {DiscountService} from "../../../services/discount.service";

@Component({
  selector: 'app-discount-item',
  templateUrl: './discount-item.component.html',
  styleUrls: ['./discount-item.component.css', './discount-item.component.optimization.css']
})
export class DiscountItemComponent {
  @Input() discount!: Discount;
  @Input() showDeleteContainer: boolean = false;

  constructor(private router: Router,
              private discountService: DiscountService) {
  }

  public getFormatedDate(unixDate: number) {
    const date = new Date(unixDate * 1000);
    const currentYear = new Date().getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    if (year - currentYear >= 5) {
      return null;
    }

    return `${day}.${month}.${year}`;
  }


  public goToUserPage(userId: number) {
    this.router.navigate(["user/profile"], {
      queryParams: {
        userId: userId
      }
    });
  }

  deleteDiscount() {
    this.discountService.deleteDiscountById(this.discount.id).subscribe({
      next: (response) => {
        location.reload();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
