import {Component, Input, OnInit} from '@angular/core';
import {ReviewResponseDto} from "../../../models/review/ReviewResponseDto";
import {ClientService} from "../../../services/client.service";
import {Client} from "../../../models/review/Client";

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent implements OnInit{
  @Input() review!: ReviewResponseDto;
  client: Client = new Client();

  constructor(private clientService: ClientService) {  }

  ngOnInit() {
    this.review.formatedAddedDate = this.unixDateToCorrectFormat(this.review.addedDate);
    this.getClientById();
  }

  public unixDateToCorrectFormat(unixDate: number): string {
    console.log("unixDateToCorrectFormat")
    const secondsInDay = 86400;
    const secondsInMonth = 2592000;
    const secondsInYear = 31536000;

    const now = Math.floor(Date.now() / 1000); // текущее время в секундах
    const diffInSeconds = now - unixDate;

    if (diffInSeconds < secondsInDay) {
      return 'Сегодня';
    }

    const daysPassed = Math.floor(diffInSeconds / secondsInDay);
    const monthsPassed = Math.floor(diffInSeconds / secondsInMonth);
    const yearsPassed = Math.floor(diffInSeconds / secondsInYear);

    if (daysPassed < 30) {
      if (daysPassed === 1) {
        return '1 день назад';
      } else if (daysPassed >= 2 && daysPassed <= 4) {
        return `${daysPassed} дня назад`;
      } else {
        return `${daysPassed} дней назад`;
      }
    }

    if (monthsPassed < 12) {
      if (monthsPassed === 1) {
        return 'месяц назад';
      } else if (monthsPassed >= 2 && monthsPassed <= 4) {
        return `${monthsPassed} месяца назад`;
      } else {
        return `${monthsPassed} месяцев назад`;
      }
    }

    if (yearsPassed >= 1) {
      if (yearsPassed === 1) {
        return 'год назад';
      } else {
        return `${yearsPassed} года назад`;
      }
    }

    return '';
  }


  private getClientById() {
    this.clientService.getById(this.review.clientId).subscribe({
      next: (client) => {
        this.client = client;
      },
      error:(err) => {
        console.error(err);
      }
    })
  }
}
