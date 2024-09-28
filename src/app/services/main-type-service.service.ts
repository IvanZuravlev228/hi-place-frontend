import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MainTypeOfService} from "../models/typeService/MainTypeOfService";
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainTypeServiceService {

  constructor(private http: HttpClient) { }

  public getAllMainTypeOfService(): Observable<MainTypeOfService[]> {
    return this.http.get<MainTypeOfService[]>(`${environment.backendURL}/main-type-service`);
  }
}
