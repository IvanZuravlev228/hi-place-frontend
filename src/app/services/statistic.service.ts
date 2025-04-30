import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";
import {Page} from "../models/Page";
import {User} from "../models/User";
import {AvgPriceByServiceItem} from "../components/user-statistic/AvgPriceByServiceItem";
import {UsersCountDto} from "../models/UsersCountDto";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }

  public clickTo(item: string, userId: number) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    this.http.post<void>(`${environment.backendURL}/statistics/user/${userId}/click/${item}`, headers).subscribe({
      next: value => {},
      error: err => {
        console.error(err)}
    })
  }

  public getClickCount(clickTo: string, userId: number, startTime: number, endTime: number): Observable<number> {
    const params = new HttpParams()
      .set('userId', userId)
      .set("startTime", startTime)
      .set("endTime", endTime);

    return this.http.get<number>(`${environment.backendURL}/statistics/click/${clickTo}`, {
      params: params
    });
  }

  public getVisitCount(userId: number, startTime: number, endTime: number) {
    const params = new HttpParams()
      .set('userId', userId)
      .set("startTime", startTime)
      .set("endTime", endTime);

    return this.http.get<number>(`${environment.backendURL}/statistics/visit`, {
      params: params
    });
  }

  public getListPosition(userId: number) {
    return this.http.get<number>(`${environment.backendURL}/statistics/user/${userId}/list-position`);
  }

  public getAvgPriceServiceItemByUserId(userId: number): Observable<AvgPriceByServiceItem[]> {
    return this.http.get<AvgPriceByServiceItem[]>(`${environment.backendURL}/statistics/user/${userId}/avg-price`);
  }

  public getUsersCount(): Observable<UsersCountDto> {
    return this.http.get<UsersCountDto>(`${environment.backendURL}/statistics/count/users`);
  }
}
