import {Component, OnInit} from '@angular/core';
import {DiscountService} from "../../services/discount.service";
import {Discount} from "../../models/Discount";
import {TypeOfServiceService} from "../../services/type-of-service.service";
import {TypeOfService} from "../../models/typeService/TypeOfService";
import {environment} from "../../../environment/environment";

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css', '../../../assets/styles/pagination-btns.css']
})
export class DiscountComponent implements OnInit{
  discounts: Discount[] = [];
  typeOfServices: TypeOfService[] = [];
  selectedTypeId: number | null = null;
  lastTypeOfServiceId: number = 0;
  totalPage: number = 0;
  pageCount: number = 0;
  pageCountByType: number = 0;
  disableNextBtn: boolean = false;
  disablePreviousBtn: boolean = true;

  constructor(private discountService: DiscountService,
              private typeOfServiceService: TypeOfServiceService) {
  }

  ngOnInit() {
    this.getAllDiscounts();
    this.getAllTypeOfServices();
  }

  public getDiscountsByTypeId(typeId: number) {
    this.selectedTypeId = typeId;
    this.getAllDiscountsByTypeOfServiceId(this.pageCountByType, typeId);
  }

  private getAllDiscounts() {
    this.pageCount = 0;
    this.fetchDiscounts(this.pageCount);
  }

  private fetchDiscounts(page: number) {
    this.discountService.getAll(page).subscribe({
      next: (pageDiscountsData) => {
        if (pageDiscountsData.content.length !== 0) {
          this.discounts = pageDiscountsData.content;
        }
        this.totalPage = pageDiscountsData.totalPages - 1;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  private getAllTypeOfServices() {
    this.typeOfServiceService.getAllWithDiscount().subscribe({
      next: (typeOfServices) => {
        this.typeOfServices = typeOfServices;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  private getAllDiscountsByTypeOfServiceId(page: number, typeOfServiceId: number) {
    this.lastTypeOfServiceId = 0;
    this.fetchDiscountsByTypeOfServiceId(page, typeOfServiceId);
  }

  private fetchDiscountsByTypeOfServiceId(page: number, typeOfServiceId: number) {
    this.discountService.getAllDiscountsByTypeOfServiceId(page, typeOfServiceId).subscribe({
      next: (pageDiscountsData) => {
        if (pageDiscountsData.content.length !== 0) {
          this.discounts = pageDiscountsData.content;
        }
        this.totalPage = pageDiscountsData.totalPages - 1;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  previousPage() {
    if (this.lastTypeOfServiceId === 0) {
      if (this.pageCount > 0) {
        this.fetchDiscounts(--this.pageCount);
      }
      return;
    }

    if (this.pageCountByType > 0 ) {
      this.fetchDiscountsByTypeOfServiceId(this.pageCountByType, this.lastTypeOfServiceId);
    }
  }

  nextPage() {
    if (this.lastTypeOfServiceId === 0) {
      if (this.pageCount < this.totalPage) {
        this.fetchDiscounts(++this.pageCount)
      }
      return;
    }

    if (this.pageCountByType < this.totalPage) {
      this.fetchDiscountsByTypeOfServiceId(++this.pageCountByType, this.lastTypeOfServiceId);
    }
  }
}
