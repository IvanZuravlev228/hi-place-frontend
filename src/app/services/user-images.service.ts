import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserServiceImagesResponse} from "../models/UserServiceImagesResponse";
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserImagesService {

  constructor(private http: HttpClient) { }

  public getExampleImagesByTypeOfServiceAndUserId(typeOfServiceId: number, userId: number): Observable<UserServiceImagesResponse[]> {
    const params = new HttpParams()
      .set("typeOfServiceId", typeOfServiceId)
      .set("userId", userId);

    return this.http.get<UserServiceImagesResponse[]>(`${environment.backendURL}/images`, {
      params: params
    })
  }

  public getExampleImagesByMainTypeOfServiceAndUserId(mainTypeOfServiceId: number, userId: number): Observable<UserServiceImagesResponse[]> {
    const params = new HttpParams()
      .set("mainTypeOfServiceId", mainTypeOfServiceId)
      .set("userId", userId);

    return this.http.get<UserServiceImagesResponse[]>(`${environment.backendURL}/images/main`, {
      params: params
    })
  }

  public getExampleImagesByUserId(userId: number) {
    return this.http.get<UserServiceImagesResponse[]>(`${environment.backendURL}/images/user/${userId}`)
  }
}
