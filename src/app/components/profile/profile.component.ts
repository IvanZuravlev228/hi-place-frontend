import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Address} from "../../models/Address";
import {AddressService} from "../../services/address.service";
import {Price} from "../../models/price/Price";
import {PriceService} from "../../services/price.service";
import {TypeOfServiceService} from "../../services/type-of-service.service";
import {TypeOfServiceCount} from "../../models/typeService/TypeOfServiceCount";
import {UserImagesService} from "../../services/user-images.service";
import {UserServiceImagesResponse} from "../../models/UserServiceImagesResponse";
import {CookieService} from "ngx-cookie-service";
import {StatisticService} from "../../services/statistic.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './profile.optimization.component.css']
})
export class ProfileComponent implements OnInit {
  private DEFAULT_OPEN_PRICES: number = 1;

  userId: number = 0;
  addresses: Address[] = [];
  addressLat: number = 0;
  addressLon: number = 0;

  profilePriceData: TypeOfServiceCount[] = [];
  images: UserServiceImagesResponse[] = [];
  public receivedAddresses: Address[] | null = null;
  isLoading: boolean = false;

  showService: boolean = true;
  showAddService: boolean = false;
  showAddAddress: boolean = false;
  showModifyContainers: boolean = false;
  showAddDiscount: boolean = false;
  showStatistic: boolean = false;
  activeButtonIndex: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private addressService: AddressService,
              private priceService: PriceService,
              private typeOfServiceService: TypeOfServiceService,
              private userImagesService: UserImagesService,
              private statisticService: StatisticService,
              private cookie: CookieService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });

    this.checkOwner();

    this.getAllTypeOfServiceCountByUserId();
    this.getAllUserImages();
    this.getAllAddressesByUserId(this.userId);
  }

  public showMap(lat: number, lon: number) {
    this.addressLat = lat;
    this.addressLon = lon;
  }

  public getAllTypeOfServiceCountByUserId() {
    this.typeOfServiceService.getTypeOfServiceCountByUserId(this.userId).subscribe({
      next: (typeOfServiceCounts) => {
        typeOfServiceCounts.forEach(t => t.isOpen = false);
        this.profilePriceData = typeOfServiceCounts;

        for (let i = 0; i < this.DEFAULT_OPEN_PRICES; i++) {
          this.getPriceByTypeOfService(this.profilePriceData[i].typeOfServiceId, this.profilePriceData[i]);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public getPriceByTypeOfService(typeOfServiceId: number, typeCount: TypeOfServiceCount) {
    this.priceService.getAllPriceProfileByTypeOfServiceIdAndUserId(typeOfServiceId, this.userId).subscribe({
      next: (priceProfile) => {
        typeCount.priceProfile = priceProfile;
        this.toggleDropdown(typeCount);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public onAddressSelected(addresses: Address[]) {
    this.receivedAddresses = addresses;
  }

  public saveAddress() {
    this.isLoading = true;

    if (this.receivedAddresses) {
      this.receivedAddresses.forEach(address => {
        address.userId = this.userId;
        this.saveNewAddress(address);
      });
    }

    this.ngOnInit();
    this.showAddAddress = false;
    this.showService = true;
  }

  public showAddServiceOnClick() {
    this.showAddService = true;
    this.showService = false;
    this.showAddAddress = false;
    this.showAddDiscount = false;
  }

  public showAddAddressOnClick() {
    this.showAddService = false;
    this.showService = false;
    this.showAddAddress = true;
    this.showAddDiscount = false;
    this.showStatistic = false;
  }

  public showPriceOnClick() {
    this.showAddService = false;
    this.showService = true;
    this.showAddAddress = false;
    this.showAddDiscount = false;
    this.showStatistic = false;
  }

  public showDiscountOnClick() {
    this.showAddService = false;
    this.showService = false;
    this.showAddAddress = false;
    this.showAddDiscount = true;
    this.showStatistic = false;
  }

  public showStatisticOnClick() {
    this.showAddService = false;
    this.showService = false;
    this.showAddAddress = false;
    this.showAddDiscount = false;
    this.showStatistic = true;
  }

  public deleteAddress(addressId: number) {
    this.addressService.deleteAddressById(addressId).subscribe({
      next: () => {
        this.addresses = this.addresses.filter(address => address.id !== addressId);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  private getAllAddressesByUserId(userId: number) {
    this.addressService.getAllByUserId(userId).subscribe({
      next: (addresses) => {
        this.addresses = addresses;
        if (addresses.length > 0) {
          this.addressLat = addresses[0].lat;
          this.addressLon = addresses[0].lon;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private getAllUserImages() {
    this.userImagesService.getExampleImagesByUserId(this.userId).subscribe({
      next: (images) => {
        this.images = images;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  private saveNewAddress(address: Address) {
    this.addressService.saveNewAddress(address).subscribe({
      next: (address) => {
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }

  activateButton(index: number) {
    this.activeButtonIndex = index;
  }

  private checkOwner() {
    const idFromCookie = this.cookie.get("user-id");
    this.showModifyContainers = (idFromCookie === this.userId.toString(0));
  }

   private toggleDropdown(typeCounts: TypeOfServiceCount) {
    typeCounts.isOpen = true;
  }

  isAddReviewVisible = false;

  openModal() {
    this.isAddReviewVisible = true;
  }

  closeModal() {
    this.isAddReviewVisible = false;
  }
}
