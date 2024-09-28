import {Component, Input, OnInit} from '@angular/core';
import {Discount} from "../../../models/Discount";
import {DiscountService} from "../../../services/discount.service";
import {environment} from "../../../../environment/environment";
import {DiscountRequestDto} from "../../../models/DiscountRequestDto";
import {UploadFileService} from "../../../services/upload-file.service";
import {TypeOfService} from "../../../models/typeService/TypeOfService";
import {TypeOfServiceService} from "../../../services/type-of-service.service";
import {HttpEventType} from "@angular/common/http";
import {WarningModuleComponent} from "../../../modals/warning-module/warning-module.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css',
    '../../../../assets/styles/pagination-btns.css', '../discount-item/discount-item.component.css']
})
export class AddDiscountComponent implements OnInit{
  @Input() userId: number = 0;
  @Input() showChangeMode: boolean = false;

  discounts: Discount[] = [];
  pageCount: number = 0;
  totalPage: number = 0;
  disableNextButton: boolean = false;

  discountRequest: DiscountRequestDto = new DiscountRequestDto();
  hideDatePicker: boolean = true;
  showAddDiscountContainer: boolean = false;

  typesOfService: TypeOfService[] = [];

  avatarSrc: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private discountService: DiscountService,
              private uploadService: UploadFileService,
              private typeOfServiceService: TypeOfServiceService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllDiscountsByUserId(this.pageCount, this.userId);
    this.getAllTypesOfService();
  }

  submit() {
    this.discountRequest.userId = this.userId;

    if (!this.checkInputData(this.discountRequest)) {
      return;
    }

    this.discountService.createDiscount(this.discountRequest).subscribe({
      next: (discount) => {
        if (this.selectedFile) {
          this.uploadService.uploadDiscountPhoto(this.selectedFile, discount.id, discount.userId).subscribe({
            next: (response) => {
              if (response.type === HttpEventType.Response) {
                if (response.status === 200) {
                  location.reload();
                }
              }
            },
            error: (error) => {
              if (error.status === 502) {
                console.error("FILE ALREADY EXISTS");
              }
              console.error(error);
            }
          })
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  previousPage() {
    if (this.pageCount > 0) {
      this.getAllDiscountsByUserId(--this.pageCount, this.userId);
    }
  }

  nextPage() {
    if (this.pageCount < this.totalPage) {
      this.getAllDiscountsByUserId(++this.pageCount, this.userId);
    }
  }

  checkingInputNumber(value: string) {
    const cleanedValue = value.replace(/\D/g, '');
    let resultDiscount = cleanedValue ? parseInt(cleanedValue, 10) : 0;
    resultDiscount > 100 ? this.discountRequest.discount = 0 : this.discountRequest.discount = resultDiscount;
  }

  onStartDateChange(event: any) {
    const selectedDate = event.value;
    this.discountRequest.startDate = new Date(selectedDate).getTime() / 1000;
  }

  onEndDateChange(event: any) {
    const selectedDate = event.value;
    this.discountRequest.endDate = new Date(selectedDate).getTime() / 1000;
  }

  triggerFileInput() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.avatarSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  withoutEndDateBtnClick() {
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);
    const currentDateUnix = Math.floor(currentDate.getTime() / 1000);

    const futureDate = new Date(currentDate.getTime());
    futureDate.setFullYear(futureDate.getFullYear() + 5);
    const currentDatePlusFiveYearUnix = Math.floor(futureDate.getTime() / 1000);

    this.discountRequest.startDate = currentDateUnix;
    this.discountRequest.endDate = currentDatePlusFiveYearUnix;

    this.hideDatePicker = !this.hideDatePicker;
  }

  enableAddDiscountContainer() {
    this.showAddDiscountContainer = true;
  }

  onServiceChange(selectedId: number) {
    this.discountRequest.typeOfServiceId = selectedId;
  }

  private isDialogOpen = false;

  private openWarningModal(warningText: string) {
    if (this.isDialogOpen) {
      return;
    }
    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(WarningModuleComponent, {
      data: {
        title: 'Дані введені не коректно',
        message: warningText
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false;
    });
  }

  private getAllTypesOfService() {
    this.typeOfServiceService.getAll().subscribe({
      next: (types) => {
        this.typesOfService = types;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  private getAllDiscountsByUserId(page: number, userId: number) {
    this.discountService.getAllByUserId(page, userId).subscribe({
      next: (pageDiscountData) => {
        if (pageDiscountData.content.length !== 0) {
          this.discounts = pageDiscountData.content;
        }
        this.totalPage = pageDiscountData.totalPages - 1;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  private checkInputData(discount: DiscountRequestDto): boolean {
    if (discount.title.length < 3) {
      this.openWarningModal("Заголовок занадто короткий. Це може не зацікавити людей");
      return false;
    }

    if (discount.description.length < 10) {
      this.openWarningModal("На нашу думку, краще додати ще опису, щоб люди могли краще зрозуміти, що вони отримають");
      return false;
    }

    if (discount.discount === 0) {
      this.openWarningModal("Здається, ви забули додати знижку)");
      return false;
    }

    if (!discount.typeOfServiceId) {
      this.openWarningModal("Вам потрібно прив'язати цю акцію до будь-якої послуги");
      return false;
    }

    if (!discount.startDate || !this.discountRequest.endDate) {
      this.openWarningModal("Додайте діапазон дат до вашої акції");
      return false;
    }

    if (!this.selectedFile) {
      this.openWarningModal("За нашими спостереженнями, люди більше відгукуються, якщо бачать якусь картинку. Особливо, якщо картинка описує або демонструє щось");
      return false;
    }
    return true;
  }
}
