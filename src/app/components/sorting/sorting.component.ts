import {Component, EventEmitter, Output} from '@angular/core';
import {Sort} from "./Sort";

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent {
  sort: Sort = new Sort();

  @Output() sortChanged = new EventEmitter<Sort>();

  public find() {
    this.sortChanged.emit(this.sort);
  }
}
