import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Price} from "../models/price/Price";
import {environment} from "../../environment/environment";
import {PriceProfile} from "../models/price/PriceProfile";
import {PriceCreateRequestDto} from "../models/price/PriceCreateRequestDto";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http: HttpClient,
              private cookie: CookieService) { }

  public getAllByUser(userId: number): Observable<Price[]> {
    return this.http.get<Price[]>(`${environment.backendURL}/price/user/${userId}`);
  }

  public getAllPriceProfileByTypeOfServiceIdAndUserId(typeOfServiceId: number, userId: number): Observable<PriceProfile[]> {
    return this.http.get<PriceProfile[]>(`${environment.backendURL}/price/user/${userId}/type/${typeOfServiceId}`);
  }

  public getAllPriceWithoutPrice(typeOfServiceId: number, userId: number): Observable<PriceProfile[]> {
    return this.http.get<PriceProfile[]>(`${environment.backendURL}/price/type/${typeOfServiceId}/user/${userId}`);
  }

  public saveAllPrices(priceDtos: PriceCreateRequestDto[]): Observable<Boolean> {
    const token = this.cookie.get("jwt-token");
    console.log(`${environment.backendURL}/price`);

    const json = JSON.stringify(priceDtos);
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + token);

    return this.http.post<Boolean>(`${environment.backendURL}/price`, json, {
      headers: headers
    });
  }

  public updatePrice(price: PriceCreateRequestDto, prevPriceId: number): Observable<Boolean> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + this.cookie.get("jwt-token"));

    return this.http.put<Boolean>(`${environment.backendURL}/price/${prevPriceId}`, price, {
      headers: headers
    });
  }

  public deletePriceById(priceId: number): Observable<void>{
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + this.cookie.get("jwt-token"));

    return this.http.delete<void>(`${environment.backendURL}/price/${priceId}`, {
      headers: headers
    });
  }
}
