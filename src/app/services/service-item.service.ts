import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {ServiceItem} from "../models/ServiceItem";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceItemService {

  constructor(private http: HttpClient) { }

  public getAllServiceItemsByTypeId(typeId: number): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${environment.backendURL}/service/${typeId}`);
  }
}
