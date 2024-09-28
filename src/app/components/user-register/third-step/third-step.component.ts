import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ThirdUserRegisterDto} from "../dtos/ThirdUserRegisterDto";
import {UserRegisterService} from "../service/user-register.service";

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.css', '../input-style.css']
})
export class ThirdStepComponent {
  @Input() userRegisteredId: number = 0;
  @Output() userRegisteredIdOutput = new EventEmitter<number>();
  thirdUserRegister: ThirdUserRegisterDto = new ThirdUserRegisterDto();
  showErrorContainer: boolean = false;
  errorMessage: string = "";
  startLoading: boolean = false;

  constructor(private userRegisterService: UserRegisterService ) {
  }

  onSubmit() {
    this.startLoading = true;

    this.thirdUserRegister.id = this.userRegisteredId;
    this.sendThirdRegisterData();
  }

  private sendThirdRegisterData() {
    this.userRegisterService.sendThirdStepUserRegisterData(this.thirdUserRegister).subscribe({
      next: (user) => {
        this.startLoading = false;
        this.userRegisteredIdOutput.emit(user.id);
      },
      error: (error) => {
        this.startLoading = false;
        this.showErrorContainer = true;
        this.errorMessage = "Щось пішло не так. Спробуйте ще раз";
        console.error(error);
      }
    })
  }

  public validateTikTokLink(link: string): boolean {
    const urlPattern = /^(https?:\/\/)?(www\.)?tiktok\.com\/.+$/;
    return urlPattern.test(link);
  }

  public validateInstagramLink(link: string): boolean {
    const urlPattern = /^(https?:\/\/)?(www\.)?instagram\.com\/.+$/;
    return urlPattern.test(link);
  }

  public validateTelegramLink(link: string): boolean {
    const urlPattern = /^(https?:\/\/)?(www\.)?t\.me\/.+$/;
    return urlPattern.test(link);
  }

  public validateViberLink(link: string): boolean {
    const urlPattern = /^(https?:\/\/)?(www\.)?viber\.com\/.+$/;
    return urlPattern.test(link);
  }
}
