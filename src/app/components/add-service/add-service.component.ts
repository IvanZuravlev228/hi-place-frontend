import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MainTypeServiceService} from "../../services/main-type-service.service";
import {TypeOfServiceService} from "../../services/type-of-service.service";
import {AllServiceForView} from "../../models/view/AllServiceForView";
import {PriceService} from "../../services/price.service";
import {TypeOfServiceView} from "../../models/view/TypeOfServiceView";
import {PriceProfile} from "../../models/price/PriceProfile";
import {PriceCreateRequestDto} from "../../models/price/PriceCreateRequestDto";
import {MatDialog} from "@angular/material/dialog";
import {WarningModuleComponent} from "../../modals/warning-module/warning-module.component";
import {UploadFileService} from "../../services/upload-file.service";
import {UserServiceImagesResponse} from "../../models/UserServiceImagesResponse";

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  private userId: number = 0;
  @Input() images: UserServiceImagesResponse[] = [];

  createModel: AllServiceForView[] = [];
  isLoading: boolean = false;
  private isDialogOpen = false;
  formDataImages: FormData = new FormData();

  constructor(private activatedRoute: ActivatedRoute,
              private mainTypeService: MainTypeServiceService,
              private typeOfServiceService: TypeOfServiceService,
              private priceService: PriceService,
              public dialog: MatDialog,
              private uploadFileService: UploadFileService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });

    this.getAllMainTypeOfService();
  }

  public onSubmit() {
    this.isLoading = true;
    if (this.formDataImages.get("files")) {
      this.saveImages();
    }
    this.saveOrUpdatePrice(this.createModel);
    this.showModalWarning();
  }

  public getTypeOfService(model: AllServiceForView) {
    this.typeOfServiceService.getAllTypeOfMainServiceView(model.mainTypes.id).subscribe({
      next: (types) => {
        model.typesOfService = types;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public getEmptyPrice(typeId: number, type: TypeOfServiceView) {
    this.priceService.getAllPriceWithoutPrice(typeId, this.userId).subscribe({
      next: (emptyPrices) => {
        type.prices = emptyPrices;
        type.imageCount = this.countImagesByTypeOfService(typeId);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public deletePrice(prices: PriceProfile[], priceId: number) {
    if (!priceId) {
      return;
    }
    this.isLoading = true;

    this.priceService.deletePriceById(priceId).subscribe({
      next: () => {
        const index = prices.findIndex(item => item.id === priceId);
        if (index !== -1) {
          prices.splice(index, 1);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public onFileSelected(event: any, type: TypeOfServiceView) {
    const file: File = event.target.files[0];
    if (file) {
      this.formDataImages.append("files", file);
      this.formDataImages.append("typeOfServiceIds", type.id.toString());
    }
  }

  public countImagesByTypeOfService(typeId: number): number {
    return this.images.filter(image => image.typeOfServiceId === typeId).length;
  }
  private getAllMainTypeOfService() {
    this.mainTypeService.getAllMainTypeOfService().subscribe({
      next: (mainTypes) => {
        this.createModel = mainTypes.map(mainType => {
          const serviceItemForCreateView = new AllServiceForView();
          serviceItemForCreateView.mainTypes = mainType;
          serviceItemForCreateView.typesOfService = [];
          return serviceItemForCreateView;
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  private saveOrUpdatePrice(modelForSave: AllServiceForView[]) {
    const priceProfilesCreate: PriceCreateRequestDto[] = [];
    modelForSave.forEach(serviceForView => {
      if (serviceForView.typesOfService) {
        serviceForView.typesOfService.forEach(typeOfService => {
          if(typeOfService.prices) {
            typeOfService.prices.forEach(priceProfile => {
              if (priceProfile.price !== undefined && priceProfile.price !== null && priceProfile.timeUnit) {
                const dto: PriceCreateRequestDto = {
                  serviceItemId: priceProfile.serviceItemId,
                  userId: this.userId,
                  price: priceProfile.price,
                  timeUnit: priceProfile.timeUnit
                }
                if (priceProfile.id) {
                  this.updatePrice(dto, priceProfile.id);
                  return;
                }
                priceProfilesCreate.push(dto);
              }
            });
          }
        });
      }
    });
    this.savePrice(priceProfilesCreate);
  }

  private savePrice(priseRequestDto: PriceCreateRequestDto[]) {
    if (priseRequestDto.length == 0) {
      this.isLoading = false;
      return;
    }

    this.priceService.saveAllPrices(priseRequestDto).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.createModel = [];
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  private updatePrice(priceProfile: PriceCreateRequestDto, prevPriceId: number) {
    this.priceService.updatePrice(priceProfile, prevPriceId).subscribe({
      next: (result) => {
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  private saveImages() {
    this.uploadFileService.uploadExampleImages(this.formDataImages, this.userId).subscribe({
      next: (resp) => {
        if (resp.status === 200) {

        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  private showModalWarning() {
    if (this.isDialogOpen) {
      return;
    }

    this.isDialogOpen = true;
    const dialogRef =this.dialog.open(WarningModuleComponent, {
      data: {
        title: 'Потрібно трохи почекати',
        message: 'Дані будуть оновлені найближчим часом. Будь ласка, зачекайте трохи)'
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isDialogOpen = false;
      location.reload();
    });
  }
}
