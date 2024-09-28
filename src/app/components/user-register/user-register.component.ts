import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {WarningModuleComponent} from "../../modals/warning-module/warning-module.component";
import {MatDialog} from "@angular/material/dialog";
import {EmailService} from "../../services/email.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  private PATH_TO_ICON_FOR_FIRST_STEP_REG: string = "./assets/image/icons/money.svg";
  private PATH_TO_ICON_FOR_SECOND_STEP_REG: string = "./assets/image/icons/manicure.svg";
  private PATH_TO_ICON_FOR_THIRD_STEP_REG: string = "./assets/image/icons/social.svg";
  private PATH_TO_ICON_FOR_FOURTH_STEP_REG: string = "./assets/image/icons/map.svg";
  private PATH_TO_ICON_FOR_FIFTH_STEP_REG: string = "./assets/image/icons/map.svg";

  private TEXT_FOR_FIRST_STEP_REG_HEADER: string = "Давайте разом створимо профіль і збільшимо потік клієнтів";
  private TEXT_FOR_SECOND_STEP_REG_HEADER: string = "Заповніть дані, щоб клієнти знали про вас більше";
  private TEXT_FOR_THIRD_STEP_REG_HEADER: string = "Додайте посилання на свої соціальні мережі, щоб користувач знав як вас знайти";
  private TEXT_FOR_FOURTH_STEP_REG_HEADER: string = "Давайте покажемо користувачам, де ви перебуваєте. Введіть адресу та оберіть свою";
  private TEXT_FOR_FIFTH_STEP_REG_HEADER: string = "Додайте своє фото. За нашими спостереженнями, користувачам це подобається";

  userRegisteredId: number = 0;
  showFirstStep: boolean = true;
  showSecondStep: boolean = false;
  showThirdStep: boolean = false;
  showFourthStep: boolean = false;
  showFifthStep: boolean = false;
  currentHeaderMessage: string = this.TEXT_FOR_FIRST_STEP_REG_HEADER;
  currentPathToIcon: string = this.PATH_TO_ICON_FOR_FIRST_STEP_REG;

  constructor(private router: Router,
              public dialog: MatDialog,
              private emailService: EmailService) {
  }

  receiveDataFirstStep(id: number) {
    if (id) {
      this.userRegisteredId = id;
      this.showFirstStep = false;
      this.showSecondStep = true;

      this.currentHeaderMessage = this.TEXT_FOR_SECOND_STEP_REG_HEADER;
      this.currentPathToIcon = this.PATH_TO_ICON_FOR_SECOND_STEP_REG;
    }
  }

  receiveDataSecondStep(id: number) {
    if (id) {
      this.showSecondStep = false;
      this.showThirdStep = true;

      this.currentHeaderMessage = this.TEXT_FOR_THIRD_STEP_REG_HEADER;
      this.currentPathToIcon = this.PATH_TO_ICON_FOR_THIRD_STEP_REG;
    }
  }

  receiveDataThirdStep(id: number) {
    if (id) {
      this.showThirdStep = false;
      this.showFourthStep = true;

      this.currentHeaderMessage = this.TEXT_FOR_FOURTH_STEP_REG_HEADER;
      this.currentPathToIcon = this.PATH_TO_ICON_FOR_FOURTH_STEP_REG;
    }
  }

  receiveDataFourthStep(isSuccess: boolean) {
    if (isSuccess) {
      this.showFourthStep = false;
      this.showFifthStep = true;

      this.currentHeaderMessage = this.TEXT_FOR_FIFTH_STEP_REG_HEADER;
      this.currentPathToIcon = this.PATH_TO_ICON_FOR_FIFTH_STEP_REG;
    }
  }

  private isDialogOpen = false;

  receiveDataFifthStep(isSuccess: boolean) {
    if (isSuccess) {
      if (this.isDialogOpen) {
        return;
      }
      this.isDialogOpen = true;
      const dialogRef = this.dialog.open(WarningModuleComponent, {
        data: {
          title: 'Підтвердження вашої пошти',
          message: 'Ми надіслали лист на вашу пошту. Щоб підтвердити пошту дотримуйтесь інструкцій у листі. Перевірте папку спам'
        }
      });

      this.emailService.sendConfirmEmail(this.userRegisteredId).subscribe({
        next: (isSent) => {

        },
        error: (error) => {
          console.error(error)
        }
      })

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(["/user/auth/login"]);
        this.isDialogOpen = false;
      });
    }
  }
}
