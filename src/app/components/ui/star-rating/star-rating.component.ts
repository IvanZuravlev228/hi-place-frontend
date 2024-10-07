import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: []
})
export class StarRatingComponent {
  @Input() stars!: number;

  public getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('fas fa-star');
      } else if (i - 0.5 <= rating) {
        stars.push('fas fa-star-half-alt');
      } else {
        stars.push('far fa-star');
      }
    }
    return stars;
  }
}
