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
  private readonly SECONDS_IN_DAY = 86400;
  private readonly SECONDS_IN_MONTH = 2592000;
  private readonly SECONDS_IN_YEAR = 31536000;

  @Input() review!: ReviewResponseDto;
  client: Client = new Client();

  constructor(private clientService: ClientService) {  }

  ngOnInit() {
    this.review.formatedAddedDate = this.unixDateToCorrectFormat(this.review.addedDate);
    this.getClientById();
  }

  public unixDateToCorrectFormat(unixDate: number): string {
    const now = Math.floor(Date.now() / 1000); // текущее время в секундах
    const diffInSeconds = now - unixDate;

    if (diffInSeconds < this.SECONDS_IN_DAY) {
      return 'Сьогодні';
    }

    const daysPassed = Math.floor(diffInSeconds / this.SECONDS_IN_DAY);
    const monthsPassed = Math.floor(diffInSeconds / this.SECONDS_IN_MONTH);
    const yearsPassed = Math.floor(diffInSeconds / this.SECONDS_IN_YEAR);

    if (daysPassed < 30) {
      if (daysPassed === 1) {
        return '1 день тому';
      } else if (daysPassed >= 2 && daysPassed <= 4) {
        return `${daysPassed} дні тому`;
      } else {
        return `${daysPassed} днів тому`;
      }
    }

    if (monthsPassed < 12) {
      if (monthsPassed === 1) {
        return 'місяць тому';
      } else if (monthsPassed >= 2 && monthsPassed <= 4) {
        return `${monthsPassed} місяця тому`;
      } else {
        return `${monthsPassed} місяців тому`;
      }
    }

    if (yearsPassed >= 1) {
      if (yearsPassed === 1) {
        return 'рік тому';
      } else {
        return `${yearsPassed} роки тому`;
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
