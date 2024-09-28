import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-price',
  templateUrl: './user-price.component.html',
  styleUrls: ['./user-price.component.css']
})
export class UserPriceComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params['userId']);
    })
  }
}
