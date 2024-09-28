import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Address} from "../../../models/Address";
import {AddressService} from "../../../services/address.service";

@Component({
  selector: 'app-fourth-step',
  templateUrl: './fourth-step.component.html',
  styleUrls: ['./fourth-step.component.css', '../input-style.css']
})
export class FourthStepComponent {

  @Input() userRegisteredId: number = 0;
  @Output() successSavedAddress = new EventEmitter<boolean>();
  public receivedAddresses: Address[] | null = null;

  showErrorContainer: boolean = false;
  errorMessage: string = "";

  startLoading: boolean = false;

  constructor(private addressService: AddressService) {
  }

  submit() {
    this.startLoading = true;

    this.receivedAddresses?.forEach(address => {
      address.userId = this.userRegisteredId;
      this.saveNewAddress(address);
    })
  }

  onAddressSelected(addresses: Address[]) {
    this.receivedAddresses = addresses;
  }

  private saveNewAddress(address: Address) {
    this.addressService.saveNewAddress(address).subscribe({
      next: (address) => {
        this.startLoading = false;
        this.successSavedAddress.emit(true);
      },
      error: (error) => {
        this.startLoading = false;
        this.showErrorContainer = true;
        this.errorMessage = "Щось пішло не так. Спробуйте ще раз";
        console.error(error);
      }
    })
  }

  skipAddAddress() {
    this.successSavedAddress.emit(true);
  }
}
