import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', './main.optimization.components.css']
})
export class MainComponent implements OnInit {
  serviceItems = [
    { id: 'manicure', name: 'Нігтьовий сервіс', image: './assets/image/main/manicure-main.jpg', dbID: 4 },
    { id: 'haircut', name: 'Перукарські послуги', image: './assets/image/main/haircut-main.jpg', dbID: 3  },
    { id: 'eyebrow', name: 'Брови / вії', image: './assets/image/main/eyebrow-main.jpg', dbID: 10  },
    { id: 'makeup', name: 'Візаж та макіяж', image: './assets/image/main/makeup-main.jpg', dbID: 2  },
    { id: 'tattoo', name: 'Тату / пірсинг', image: './assets/image/main/tattoo-main.jpg', dbID: 8  },
    { id: 'facial', name: 'Догляд за обличчям', image: './assets/image/main/facial-main.jpg', dbID: 1  },
    { id: 'injections', name: 'Уколи для краси', image: './assets/image/main/injection-main.jpg', dbID: 5  },
    { id: 'bodyCare', name: 'Догляд за тілом', image: './assets/image/main/body-care-main.jpg', dbID: 6  },
    { id: 'epilation', name: 'Епіляція / Депіляція', image: './assets/image/main/epilation.jpg', dbID: 7  },
    { id: 'eyebrowTattoo', name: 'Татуаж', image: './assets/image/main/eyebrow-tattoo-main.jpg', dbID: 9  },
    { id: 'photosession', name: 'Фотосесії', image: './assets/image/main/photosession.jpg', dbID: 11  },
    { id: 'fitness', name: 'Фітнес', image: './assets/image/main/fitness.jpg', dbID: 12  },
  ];

  visibleItemsCount = 9;
  userCityCookieName: string = "user_city";

  constructor(private router: Router,
              private cookieService: CookieService,
              private http: HttpClient) {
  }

  ngOnInit() {
    if (!this.cookieService.get(this.userCityCookieName)) {
      this.getUserLocation();
    }
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.getCityName(latitude, longitude);
      }, positionError => {
        console.error(positionError);
        this.cookieService.set(this.userCityCookieName, "Kyiv");
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  private getCityName(lat: number, lon: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const headers = new HttpHeaders({
      'Accept-Language': 'en'
    });

    this.http.get(url, { headers }).subscribe((data: any) => {
      const city = data.address.city || data.address.town || data.address.village;
      this.cookieService.set(this.userCityCookieName, city, 7);
    });
  }

  public showMoreItems() {
    this.visibleItemsCount = this.serviceItems.length;
  }

  public goToServicePage(dbID: number) {
    this.router.navigate(["/services"], {
      queryParams: {
        mainTypeId: dbID
      }});
  }
}
