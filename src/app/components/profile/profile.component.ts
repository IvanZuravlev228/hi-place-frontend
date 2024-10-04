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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './profile.optimization.component.css']
})
export class ProfileComponent implements OnInit {
  userId: number = 0;
  addresses: Address[] = [];
  addressLat: number = 0;
  addressLon: number = 0;

  prices: Price[] = [];
  profilePriceData: TypeOfServiceCount[] = [];
  images: UserServiceImagesResponse[] = [];
  public receivedAddresses: Address[] | null = null;
  isLoading: boolean = false;

  showService: boolean = true;
  showAddService: boolean = false;
  showAddAddress: boolean = false;
  showModifyContainers: boolean = false;
  showAddDiscount: boolean = false;
  activeButtonIndex: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private addressService: AddressService,
              private priceService: PriceService,
              private typeOfServiceService: TypeOfServiceService,
              private userImagesService: UserImagesService,
              private cookie: CookieService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });

    this.checkOwner();

    this.getAllTypeOfServiceCountByUserId();
    this.getAllPriceByUserId(this.userId);
    this.getAllUserImages();
    this.getAllAddressesByUserId(this.userId);
  }

  public getAllPriceByUserId(userId: number) {
    this.priceService.getAllByUser(userId).subscribe({
      next: (prices) => {
        this.prices = prices;
      },
      error: (error) => {
        console.log(error);
      }
    })
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
  }

  public showPriceOnClick() {
    this.showAddService = false;
    this.showService = true;
    this.showAddAddress = false;
    this.showAddDiscount = false;
  }

  public showDiscountOnClick() {
    this.showAddService = false;
    this.showService = false;
    this.showAddAddress = false;
    this.showAddDiscount = true;
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
}
