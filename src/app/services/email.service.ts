import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  public sendConfirmEmail(userId: number) {
    return this.http.get<boolean>(`${environment.backendURL}/email/send/user/${userId}`);
  }

  public confirmEmail(token: string) {
    const param = new HttpParams()
      .set("token", token);

    return this.http.get<boolean>(`${environment.backendURL}/email/confirm`, {
      params: param
    });
  }
}
