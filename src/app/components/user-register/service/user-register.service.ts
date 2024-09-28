import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FirstUserRegisterRequestDto} from "../dtos/FirstUserRegisterRequestDto";
import {environment} from "../../../../environment/environment";
import {Observable} from "rxjs";
import {SecondUserRegisterDto} from "../dtos/SecondUserRegisterDto";
import {UserRegisterResponseDto} from "../dtos/UserRegisterResponseDto";
import {ThirdUserRegisterDto} from "../dtos/ThirdUserRegisterDto";

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(private http: HttpClient) { }

  public sendFirstStepUserRegisterData(firstStepData: FirstUserRegisterRequestDto) : Observable<UserRegisterResponseDto> {
    const userLoginJSON = JSON.stringify(firstStepData);
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    return this.http.post<any>(`${environment.backendURL}/auth/register`, userLoginJSON, {
      headers: headers
    });

  }

  public sendSecondStepUserRegisterData(secondStepData: SecondUserRegisterDto) : Observable<UserRegisterResponseDto> {
    const body = JSON.stringify(secondStepData);
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    return this.http.put<any>(`${environment.backendURL}/auth/register/second`, body, {
      headers: headers
    })
  }

  public sendThirdStepUserRegisterData(secondStepData: ThirdUserRegisterDto) : Observable<UserRegisterResponseDto> {
    const body = JSON.stringify(secondStepData);
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    return this.http.put<any>(`${environment.backendURL}/auth/register/third`, body, {
      headers: headers
    })
  }
}
