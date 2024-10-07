import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReviewRequestDto} from "../../../models/review/ReviewRequestDto";
import { InputValidator } from '../../user-register/util/InputValidator';
import {ReviewService} from "../../../services/review.service";
import {WarningModuleComponent} from "../../../modals/warning-module/warning-module.component";
import {MatDialog} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  private COOKIE_CLIENT_NAME = "client-name";
  private COOKIE_CLIENT_EMAIL = "client-email";

  @Input() isVisible!: boolean;
  @Input() userId!: number;
  @Output() close = new EventEmitter<void>();

  review: ReviewRequestDto = new ReviewRequestDto();
  showErrorContainer: boolean = false;
  errorMessage: string = "";

  constructor(private reviewService: ReviewService,
              public dialog: MatDialog,
              private cookie: CookieService) {
  }

  ngOnInit() {
    this.review.clientName = this.cookie.get(this.COOKIE_CLIENT_NAME);
    this.review.clientEmail = this.cookie.get(this.COOKIE_CLIENT_EMAIL);
  }

  submit() {

    if (!InputValidator.validateEmail(this.review.clientEmail)) {
      this.showErrorContainer = true;
      this.errorMessage = "Пошта некоректна";
      return;
    }
    this.showErrorContainer = false;
    if (!InputValidator.validateName(this.review.clientName)) {
      this.showErrorContainer = true;
      this.errorMessage = "Ім'я не повинно бути порожнім і не перевищувати довжину в 255 символів";
      return;
    }
    this.showErrorContainer = false;
    if (this.review.point <= 0) {
      this.showErrorContainer = true;
      this.errorMessage = "Дайте хоча б одну зірочку ";
      return;
    }
    this.showErrorContainer = false;
    if (this.review.feedback.length < 10) {
      this.showErrorContainer = true;
      this.errorMessage = "Ваш відгук має бути трохи довшим";
      return;
    }

    this.showErrorContainer = false;
    if (this.review.feedback.length > 200) {
      this.showErrorContainer = true;
      this.errorMessage = "Не на стільки довгим";
      return;
    }
    this.showErrorContainer = false;

    this.review.userId = this.userId;
    this.isVisible = false;
    this.addNewReview(this.review);
  }

  handleModalClose() {
    this.close.emit();
  }

  private addNewReview(review: ReviewRequestDto) {
    this.reviewService.create(review).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.openWarningModal("Чудово", "Ви успішно додали відгук. Дякуємо за Ваш внесок. Ваш відгук скоро з'явиться на сайті");
        }

        if (response.status === 201) {
          this.openWarningModal("Вау! Раді Вас бачити", "Ми створили для Вас профіль клієнта, тому наступного разу, коли будете залишати відгук на нашому сайті, використовуйте пошту: " + this.review.clientEmail + ". Ваш відгук скоро з'явиться на сайті");
          this.setClientCookie(this.review.clientName, this.review.clientEmail)
        }
      },
      error: (err) => {
        console.error(err);
        if (err.status === 409) {
          this.openWarningModal("Нам дуже шкода", "Ви вже залишали відгук про цього майстра/салон");
        }
      }
    })
  }

  onRatingSelected(rating: number) {
    this.review.point = rating;
  }

  private isDialogOpen = false;

  private openWarningModal(title: string, text: string) {
    if (this.isDialogOpen) {
      return;
    }
    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(WarningModuleComponent, {
      data: {
        title: title,
        message: text
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false;
    });
  }

  private setClientCookie(clientName: string, clientEmail: string) {
    this.cookie.set(this.COOKIE_CLIENT_NAME, clientName);
    this.cookie.set(this.COOKIE_CLIENT_EMAIL, clientEmail);
  }
}
