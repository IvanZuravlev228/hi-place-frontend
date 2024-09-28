import {Component, EventEmitter, Output} from '@angular/core';
import {AddressService} from "../../services/address.service";
import {Address} from "../../models/Address";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  private countryCodes: string = "ua";

  public query: string = "";
  public addresses: any[] = [];
  public selectedAddresses: Address[] = [];
  @Output() selectedAddressEmit = new EventEmitter<Address[]>();

  constructor(private addressService: AddressService){ }

  public onQueryChange(): void {
    if (this.query.length > 4) {
      this.addressService.search(this.query, this.countryCodes, 'ua').subscribe({
        next: (data: any) => {
          this.addresses = data;

          if (this.addresses.length === 0) {
            this.addressService.search(this.query, this.countryCodes, 'en').subscribe({
              next: (data: any) => {
                this.addresses = data;
              },
              error: (error) => {
                console.log(error);
              }
            })
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  public selectAddress(address: any): void {
    const selectedAddressObject: Address = {
      id: address.id,
      country: address.address.country,
      city: address.address.city,
      borough: address.address.borough || '',
      road: address.address.road || '',
      houseNumber: address.address.house_number || '',
      suburb: address.address.suburb || '',
      lat: address.lat,
      lon: address.lon,
      userId: 1
    };

    this.selectedAddresses.push(selectedAddressObject);

    this.selectedAddressEmit.emit(this.selectedAddresses);

    this.query = "";
    this.addresses = [];
  }

  public deleteSelectedAddress(address: Address) {
    const index = this.selectedAddresses.indexOf(address);
    if (index !== -1) {
      this.selectedAddresses.splice(index, 1);
    }
  }
}
