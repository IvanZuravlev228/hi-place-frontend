import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AddressService} from "../../services/address.service";

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.css']
})
export class UserLocationComponent implements OnInit {
  userCityCookieName: string = "user_city";
  currentCity: string = "Kyiv";
  cities: string[] = [];

  constructor(private cookieService: CookieService,
              private addressService: AddressService) {
  }

  ngOnInit() {
    this.getAllCities();
    this.currentCity = this.cookieService.get(this.userCityCookieName);
  }

  public onCityChange(newCity: string): void {
    this.currentCity = newCity;
    this.cookieService.set(this.userCityCookieName, newCity, 7);
  }

  private getAllCities() {
    this.addressService.getAllCities().subscribe({
      next: (cities) => {
        this.cities = cities;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
