import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TypeOfServiceService} from "../../services/type-of-service.service";
import {TypeOfServiceWithServiceItems} from "../../models/typeService/TypeOfServiceWithServiceItems";
import {ServiceItemService} from "../../services/service-item.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {UserImagesService} from "../../services/user-images.service";
import {environment} from "../../../environment/environment";
import {CookieService} from "ngx-cookie-service";
import {Sort} from "../sorting/Sort";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css', '../../../assets/styles/pagination-btns.css']
})
export class ServiceComponent implements OnInit {
  typesOfService: TypeOfServiceWithServiceItems[] = [];
  users: User[] = [];
  totalPages: number = 0;
  mainTypeId: number = 0;
  mainTypePaginationPageCount = 0;
  lastTypeOfServiceId: number = -1;
  lastServiceItemId: number = -1;
  serviceItemPaginationPageCount: number = 0;
  typeOfServicePaginationPageCount: number = 0;
  nextServiceItemOrTypeOfService: string = "";
  city: string = "";

  selectedItemId: number | null = null;
  selectedTypeOfServiceId: number | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private typeOfServiceService: TypeOfServiceService,
              private serviceItemService: ServiceItemService,
              private userService: UserService,
              private userImagesService: UserImagesService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.city = this.cookieService.get("user_city");

    this.activatedRoute.queryParams.subscribe(params => {
      this.mainTypeId = params['mainTypeId'];
      this.getAllTypeOfMainService(this.mainTypeId);
    })
    this.getAllUsersByMainTypeOfServiceId(this.mainTypeId);
  }

  currentSort: Sort = new Sort();

  public handleSortChanged(sort: Sort) {
    this.currentSort = sort;
    this.userSort();
  }

  public loadServiceItem(typeOfService: TypeOfServiceWithServiceItems) {
    this.selectedTypeOfServiceId = typeOfService.id;
    this.getAllUsersByTypeOfServiceId(typeOfService.id);
    // this.nextServiceItemOrTypeOfService = false;
    this.lastTypeOfServiceId = typeOfService.id;

    this.serviceItemService.getAllServiceItemsByTypeId(typeOfService.id).subscribe({
      next: (serviceItems) => {
        typeOfService.serviceItem = serviceItems;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  public getAllUsersByMainTypeOfServiceId(mainTypeId: number) {
    this.nextServiceItemOrTypeOfService = "";
    this.fetchUsersByMainTypeOfService(mainTypeId, this.city, this.mainTypePaginationPageCount, this.currentSort);
  }

  private fetchUsersByMainTypeOfService(mainTypeId: number, city: string, pageCount: number, sort: Sort) {
    this.userService.getAllUsersByMainTypeOfServiceId(mainTypeId, city, pageCount, sort).subscribe({
      next: (pageData) => {
        if (pageData.content.length !== 0) {
          this.users = pageData.content;
          this.users.forEach(user => this.getExampleImagesByMainTypeOfServiceAndUserId(mainTypeId, user.id, user));
        }
        this.totalPages = pageData.totalPages - 1;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public getUsersByServiceItemId(serviceItemId: number, typeOfServiceId: number) {
    this.selectedItemId = serviceItemId;
    this.nextServiceItemOrTypeOfService = "service_item";
    this.lastServiceItemId = serviceItemId;
    this.lastTypeOfServiceId = typeOfServiceId;
    this.fetchUsersByServiceItemId(typeOfServiceId, serviceItemId, this.city, 0, this.currentSort);
  }

  private fetchUsersByServiceItemId(typeOfServiceId: number, serviceItemId: number, city: string, pageCount: number, sort: Sort) {
    this.userService.getUsersByServiceItemId(serviceItemId, city, pageCount, sort).subscribe({
      next: (pageData) => {
        if (pageData.content.length !== 0) {
          this.users = pageData.content;
          this.users.forEach(user => this.getExampleImagesByTypeOfServiceAndUserId(typeOfServiceId, user.id, user));
        }
        this.totalPages = pageData.totalPages - 1;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public getAllUsersByTypeOfServiceId(typeOfServiceId: number) {
    this.nextServiceItemOrTypeOfService = "type_of_service";
    this.fetchUsersByTypeOfServiceId(typeOfServiceId, this.city, 0, this.currentSort);
  }

  private fetchUsersByTypeOfServiceId(typeOfServiceId: number, city: string, pageCount: number, sort: Sort) {
    this.userService.getAllUsersByTypeOfServiceId(typeOfServiceId, city, pageCount, sort).subscribe({
      next: (pageData) => {
        if (pageData.content.length !== 0) {
          this.users = pageData.content;
          this.users.forEach(user => this.getExampleImagesByTypeOfServiceAndUserId(typeOfServiceId, user.id, user));
        }
        this.totalPages = pageData.totalPages - 1;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public goToUserPricePage(id: number) {
    this.router.navigate(["user/profile"], {
      queryParams: {
        userId: id
      }
    });
  }

  public previousPage() {
    if (this.lastServiceItemId == -1 && this.lastTypeOfServiceId == -1 && this.mainTypePaginationPageCount > 0) {
      this.mainTypePaginationPageCount--;
      this.fetchUsersByMainTypeOfService(this.mainTypeId, this.city, this.mainTypePaginationPageCount, this.currentSort);
      return;
    }

    if (this.nextServiceItemOrTypeOfService === "service_item" && this.serviceItemPaginationPageCount > 0) {
      this.serviceItemPaginationPageCount--;
      this.fetchUsersByServiceItemId(this.lastTypeOfServiceId, this.lastServiceItemId, this.city, this.serviceItemPaginationPageCount, this.currentSort);
      return;
    }

    if (this.typeOfServicePaginationPageCount > 0) {
      this.typeOfServicePaginationPageCount--;
      this.fetchUsersByTypeOfServiceId(this.lastTypeOfServiceId, this.city, this.typeOfServicePaginationPageCount, this.currentSort);
    }

  }

  public nextPage() {
    if (this.lastServiceItemId == -1 && this.lastTypeOfServiceId == -1) {
      this.serviceItemPaginationPageCount = 0;
      this.typeOfServicePaginationPageCount = 0;
      if (this.mainTypePaginationPageCount < this.totalPages) {
        this.mainTypePaginationPageCount++;
        // this.getAllUsersByMainTypeOfServiceId(this.mainTypeId);
        this.fetchUsersByMainTypeOfService(this.mainTypeId, this.city, this.mainTypePaginationPageCount, this.currentSort);
      }
      return;
    }

    if (this.nextServiceItemOrTypeOfService == "service_item") {
      this.mainTypePaginationPageCount = 0;
      this.typeOfServicePaginationPageCount = 0;
      if (this.serviceItemPaginationPageCount < this.totalPages) {
        this.serviceItemPaginationPageCount++;
        // this.getUsersByServiceItemId(this.lastServiceItemId, this.lastTypeOfServiceId);
        this.fetchUsersByServiceItemId(this.lastTypeOfServiceId,
          this.lastServiceItemId,
          this.city,
          this.serviceItemPaginationPageCount,
          this.currentSort);
      }
      return;
    }

    if (this.typeOfServicePaginationPageCount < this.totalPages) {
      this.mainTypePaginationPageCount = 0;
      this.serviceItemPaginationPageCount = 0;
      this.typeOfServicePaginationPageCount++;
      // this.getAllUsersByTypeOfServiceId(this.lastTypeOfServiceId);
      this.fetchUsersByTypeOfServiceId(this.lastTypeOfServiceId, this.city, this.typeOfServicePaginationPageCount, this.currentSort);
      return;
    }
  }

  private getAllTypeOfMainService(mainTypeId: number) {
    this.typeOfServiceService.getAllTypeOfMainService(mainTypeId).subscribe({
      next: (data) => {
        this.typesOfService = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  private getExampleImagesByTypeOfServiceAndUserId(typeOfServiceId: number, userId: number, user: User) {
    this.userImagesService.getExampleImagesByTypeOfServiceAndUserId(typeOfServiceId, userId).subscribe({
      next: (userServiceImages) => {
        user.examples = userServiceImages;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  private getExampleImagesByMainTypeOfServiceAndUserId(mainTypeOfServiceId: number, userId: number, user: User) {
    this.userImagesService.getExampleImagesByMainTypeOfServiceAndUserId(mainTypeOfServiceId, userId).subscribe({
      next: (userServiceImages) => {
        user.examples = userServiceImages;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  private userSort() {
    this.city = this.cookieService.get("user_city");
    if (this.lastServiceItemId == -1 && this.lastTypeOfServiceId == -1) {
      this.getAllUsersByMainTypeOfServiceId(this.mainTypeId);
      return;
    }

    if (this.nextServiceItemOrTypeOfService === "service_item") {
      this.getUsersByServiceItemId(this.lastServiceItemId, this.lastTypeOfServiceId);
      return;
    }

    this.getAllUsersByTypeOfServiceId(this.lastTypeOfServiceId);
  }
}
