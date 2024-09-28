import {Component, EventEmitter, Output} from '@angular/core';
import {FirstUserRegisterRequestDto} from "../dtos/FirstUserRegisterRequestDto";
import {InputValidator} from "../util/InputValidator";
import {UserRegisterService} from "../service/user-register.service";
import {UserRegisterResponseDto} from "../dtos/UserRegisterResponseDto";

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.css', '../user-register.component.css', '../input-style.css']
})
export class FirstStepComponent {
  @Output() userRegisteredId = new EventEmitter<number>();

  firstRegisterDto: FirstUserRegisterRequestDto = new FirstUserRegisterRequestDto();
  showErrorContainer: boolean = false;
  errorMessage: string = "";

  startLoading: boolean = false;

  constructor(private userRegisterService: UserRegisterService) {
  }

  onSubmit() {
    this.startLoading = true;

    if (!InputValidator.validatePassword(this.firstRegisterDto.password)) {
      this.showErrorContainer = true;
      this.errorMessage = "Пароль має бути довшим за 5 символів"
      this.startLoading = false;
      return;
    }

    if (!InputValidator.validateEmail(this.firstRegisterDto.email)) {
      this.showErrorContainer = true;
      this.errorMessage = "Пошта некоректна";
      this.startLoading = false;
      return;
    }

    if (!InputValidator.validateName(this.firstRegisterDto.name)) {
      this.showErrorContainer = true;
      this.errorMessage = "Ім'я не повинно бути порожнім і не перевищувати довжину в 255 символів";
      this.startLoading = false;
      return;
    }

    if (!InputValidator.validatePhone(this.firstRegisterDto.phone)) {
      this.showErrorContainer = true;
      this.errorMessage = "Телефон введено некоректно";
      this.startLoading = false;
      return;
    }

    this.showErrorContainer = false;
    this.sendFirstStepData();
  }

  private sendFirstStepData() {
    this.userRegisterService.sendFirstStepUserRegisterData(this.firstRegisterDto).subscribe({
      next: (user) => {
        this.userRegisteredId.emit(user.id);
        this.startLoading = false;
      },
      error: (error) => {
        this.startLoading = false;
        this.showErrorContainer = true;

        if (error.status === 409) {
          this.errorMessage = "Цю пошту вже зареєстровано";
        }
        this.errorMessage = "Щось пішло не так. Спробуйте ще раз";
        console.error(error);
      }
    })
  }
}
