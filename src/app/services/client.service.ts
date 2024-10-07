import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Client} from "../models/review/Client";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  public create(client: Client): Observable<Client> {
    const body = JSON.stringify(client);
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    return this.http.post<Client>(`${environment.backendURL}/clients`, body, {
      headers: headers
    })
  }

  public getById(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${environment.backendURL}/clients/${clientId}`);
  }
}
