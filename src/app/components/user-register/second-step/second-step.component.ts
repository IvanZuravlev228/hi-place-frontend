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
