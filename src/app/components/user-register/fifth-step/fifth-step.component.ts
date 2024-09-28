import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {UploadFileService} from "../../../services/upload-file.service";

@Component({
  selector: 'app-fifth-step',
  templateUrl: './fifth-step.component.html',
  styleUrls: ['./fifth-step.component.css', '../input-style.css', '../../user-preview/user-preview.component.css']
})
export class FifthStepComponent {
  @Input() userRegisteredId: number = 0;
  @Output() successSavedPhoto = new EventEmitter<boolean>();
  showErrorContainer: boolean = false;
  errorMessage: string = "";

  startLoading: boolean = false;
  selectedFiles?: FileList;
  preview: string | ArrayBuffer | null = null;

  constructor(private uploadService: UploadFileService) {
  }

  onSubmit() {
    this.startLoading = true;

    if (this.checkCorrectInputLogoFile()) {
      this.uploadUserLogoFile(this.userRegisteredId);
    }
  }

  public selectFile(event: any): void {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const file: File = this.selectedFiles[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  public uploadUserLogoFile(userId: number) {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.uploadService.uploadUserLogo(file, userId).subscribe({
          next: (event) => {
            this.startLoading = false;
            if (event.type === HttpEventType.UploadProgress) {
            } else if (event instanceof HttpResponse) {
              // this.messageAboutFile = event.body;
            }
            this.successSavedPhoto.emit(true);
          },
          error: (error) => {
            this.startLoading = false;
            this.showErrorContainer = true;
            this.errorMessage = "Щось пішло не так. Спробуйте ще раз";
            console.error(error);
          }
        })
      }
    }
  }

  private checkCorrectInputLogoFile(): boolean {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file && file.size / (1024 * 1024) < 10) {
        return true;
      }
    }
    this.startLoading = false;
    this.errorMessage = "Файл не повинен перевищувати 100MB";
    return false;
  }
}
