import {Component, OnInit} from '@angular/core';
import {UsersCountDto} from "../../models/UsersCountDto";
import {StatisticService} from "../../services/statistic.service";

@Component({
  selector: 'app-count-users',
  templateUrl: './count-users.component.html',
  styleUrls: ['./count-users.component.css']
})
export class CountUsersComponent implements OnInit{
  usersCount: UsersCountDto = new UsersCountDto();

  constructor(private statisticService: StatisticService) {
  }

  ngOnInit() {
    this.getUsersCount();
  }

  private getUsersCount() {
    this.statisticService.getUsersCount().subscribe({
      next: (users) => {
        this.usersCount = users;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
