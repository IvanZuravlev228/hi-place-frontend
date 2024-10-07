import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-select-stars',
  templateUrl: './select-stars.component.html',
  styleUrls: []
})
export class SelectStarsComponent {
  stars: number = 0;
  hoveredStar: number = 0;
  @Output() ratingSelected: EventEmitter<number> = new EventEmitter<number>();

  public getStars(): string[] {
    const starClasses = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= this.stars) {
        starClasses.push('fas fa-star');
      } else if (i - 0.5 <= this.stars) {
        starClasses.push('fas fa-star-half-alt');
      } else {
        starClasses.push('far fa-star');
      }
    }
    return starClasses;
  }

  selectRating(rating: number) {
    this.stars = rating;
    this.ratingSelected.emit(rating);
  }

  setHoveredStar(rating: number) {
    this.hoveredStar = rating;
  }

  clearHoveredStar() {
    this.hoveredStar = 0;
  }
}
