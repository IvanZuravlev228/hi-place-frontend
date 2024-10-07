import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  closeModal(event?: Event) {
    this.isVisible = false;
    this.close.emit();
  }
}
