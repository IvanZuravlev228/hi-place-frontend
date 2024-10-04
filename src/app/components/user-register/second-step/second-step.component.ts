import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SecondUserRegisterDto} from "../dtos/SecondUserRegisterDto";
import {UserRegisterService} from "../service/user-register.service";

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.css', '../input-style.css']
})
export class SecondStepComponent {
  @Input() userRegisteredId: number = 0;
  @Output() userRegisteredIdOutput = new EventEmitter<number>();
  secondRegisterDto: SecondUserRegisterDto = new SecondUserRegisterDto();
  showErrorContainer: boolean = false;
  errorMessage: string = "";
  startLoading: boolean = false;

  constructor(private userRegisterService: UserRegisterService ) {
  }

  onSubmit() {
    this.startLoading = true;

    if (!this.secondRegisterDto.type) {
      this.startLoading = false;
      this.showErrorContainer = true;
      this.errorMessage = "Ви салон чи майстер?";
      return;
    }

    if (this.secondRegisterDto.experience < 0 || this.secondRegisterDto.experience > 60) {
      this.startLoading = false;
      this.showErrorContainer = true;
      this.errorMessage = "Ваш досвід роботи не може бути меншим за 0 і більшим за 60";
      return;
    }

    if (this.secondRegisterDto.discountWithPromo < 0 || this.secondRegisterDto.discountWithPromo > 100) {
      this.startLoading = false;
      this.showErrorContainer = true;
      this.errorMessage = "Знижка не може бути меншою за 0 і більшою за 100";
      return;
    }

    this.secondRegisterDto.id = this.userRegisteredId;
    this.sendSecondRegisterData();
  }

  private sendSecondRegisterData() {
    this.userRegisterService.sendSecondStepUserRegisterData(this.secondRegisterDto).subscribe({
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
}
