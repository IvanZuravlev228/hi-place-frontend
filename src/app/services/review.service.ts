import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ReviewRequestDto} from "../models/review/ReviewRequestDto";
import {Observable} from "rxjs";
import {ReviewResponseDto} from "../models/review/ReviewResponseDto";
import {environment} from "../../environment/environment";
import {Response} from "../models/Response";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  public create(review: ReviewRequestDto): Observable<Response> {
    const body = JSON.stringify(review);
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<Response>(`${environment.backendURL}/reviews`, body, {
      headers: headers
    })
  }

  public getAllByUserId(userId: number): Observable<ReviewResponseDto[]> {
    return this.http.get<ReviewResponseDto[]>(`${environment.backendURL}/reviews/${userId}`);
  }
}
