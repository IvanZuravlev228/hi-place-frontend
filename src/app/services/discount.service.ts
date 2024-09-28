import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Discount} from "../models/Discount";
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";
import {DiscountRequestDto} from "../models/DiscountRequestDto";
import {CookieService} from "ngx-cookie-service";
import {Address} from "../models/Address";
import {Page} from "../models/Page";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient,
              private cookie: CookieService) { }

  public getAll(page: number) : Observable<Page<Discount>>{
    const params = new HttpParams()
      .set("page", page)
      .set("size", environment.paginationUsersSize);

    return this.http.get<Page<Discount>>(`${environment.backendURL}/discounts`, {params: params});
  }

  public getAllDiscountsByTypeOfServiceId(page: number, typeId: number): Observable<Page<Discount>> {
    const params = new HttpParams()
      .set("page", page)
      .set("size", environment.paginationUsersSize);

    return this.http.get<Page<Discount>>(`${environment.backendURL}/discounts/type-service/${typeId}`, {params: params});
  }

  getAllByUserId(page: number, userId: number): Observable<Page<Discount>> {
    const params = new HttpParams()
      .set("page", page)
      .set("size", environment.paginationUsersSize);

    return this.http.get<Page<Discount>>(`${environment.backendURL}/discounts/user/${userId}`, {params: params})
  }

  createDiscount(discount: DiscountRequestDto): Observable<Discount> {
    const discountJSON = JSON.stringify(discount);
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + this.cookie.get("jwt-token"));

    return this.http.post<Discount>(`${environment.backendURL}/discounts`, discountJSON, {
      headers: headers
    });
  }

  deleteDiscountById(discountId: number): Observable<any> {
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + this.cookie.get("jwt-token"));
    return this.http.delete<any>(`${environment.backendURL}/discounts/${discountId}`, {
      headers: headers
    })
  }
}
