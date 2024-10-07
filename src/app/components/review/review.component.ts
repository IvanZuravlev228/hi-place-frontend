import {Component, Input, OnInit} from '@angular/core';
import {ReviewResponseDto} from "../../models/review/ReviewResponseDto";
import {ReviewService} from "../../services/review.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  @Input() userId: number = -1;
  reviews: ReviewResponseDto[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.getAllRevivesByUserId();
  }

  public getAllRevivesByUserId() {
    if (!this.userId || this.userId < 1) {
      return;
    }

    this.reviewService.getAllByUserId(this.userId).subscribe({
      next: (reviews) => {
        reviews.sort((a, b) => b.addedDate - a.addedDate);
        this.reviews = reviews;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
