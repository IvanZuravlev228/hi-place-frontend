import {Component, Input} from '@angular/core';
import {UserServiceImagesResponse} from "../../models/UserServiceImagesResponse";

@Component({
  selector: 'app-image-example',
  templateUrl: './image-example.component.html',
  styleUrls: ['./image-example.component.css']
})
export class ImageExampleComponent {
  @Input() examples: UserServiceImagesResponse[] = [];
  currentIndex: number = 0;
  isModalOpen: boolean = false;
  modalImageSrc: string = '';

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextImage() {
    if (this.currentIndex < this.examples.length - 1) {
      this.currentIndex++;
    }
  }

  openModal(imageSrc: string) {
    this.modalImageSrc = imageSrc;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
