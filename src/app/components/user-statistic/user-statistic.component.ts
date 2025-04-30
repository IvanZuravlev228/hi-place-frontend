import {Component, Input, OnInit} from '@angular/core';
import {StatisticService} from "../../services/statistic.service";
import {StatisticData} from "./StatisticData";
import {AvgPriceByServiceItem} from "./AvgPriceByServiceItem";

@Component({
  selector: 'app-user-statistic',
  templateUrl: './user-statistic.component.html',
  styleUrls: ['./user-statistic.component.css']
})
export class UserStatisticComponent implements OnInit {
  @Input() userId: number = -1;

  statisticData: StatisticData = new StatisticData();
  animStatisticData: StatisticData = new StatisticData();
  avgPriceByServiceItems: AvgPriceByServiceItem[] = [];

  startTime: number = 0;
  endTime: number = 0;

  activeBtn: number = 1;

  public activateBtn(index: number) {
    this.activeBtn = index;
  }

  constructor(private statService: StatisticService) {
  }

  ngOnInit(): void {
    this.startTime = this.getUnixTimeXDaysAgo(30);
    this.endTime = this.getCurrentUnixTime();
    this.getAllData();
    this.getListPosition();
    this.getAvgPriceServiceItemByUserId();
  }

  setStartTime(xDaysAgo: number) {
    this.startTime = this.getUnixTimeXDaysAgo(xDaysAgo);
    this.getAllData();
    this.statisticData.interestingCoef = 0;
  }

  private animateDataUpdate(duration: number) {
    const startTime = Date.now(); // Время начала анимации
    const updateInterval = 25;

    const randomizeData = () => {
      this.animStatisticData.phone = this.getRandomValue();
      this.animStatisticData.instagram = this.getRandomValue();
      this.animStatisticData.tiktok = this.getRandomValue();
      this.animStatisticData.telegram = this.getRandomValue();
      this.animStatisticData.visit = this.getRandomValue();
      this.animStatisticData.listPosition = this.getRandomValue();
      this.animStatisticData.interestingCoef = this.getRandomValue();
    };

    // Каждую секунду обновляем значения случайными числами
    const intervalId = setInterval(() => {
      randomizeData();

      // Если прошло 5 секунд, останавливаем обновления и устанавливаем конечные значения
      if (Date.now() - startTime >= duration) {
        clearInterval(intervalId);
        this.animStatisticData = { ...this.statisticData }; // Устанавливаем значения из statisticData
        this.statisticData.interestingParam = this.statisticData.interestingCoef / this.statisticData.visit;
      }
    }, updateInterval);
  }

  private getRandomValue(): number {
    return Math.floor(Math.random() * 100); // Случайное число от 0 до 99
  }

  private getAllData() {
    this.getPhoneClicks();
    this.getInstagramClicks();
    this.getTiktokClicks();
    this.getTelegramClicks();
    this.getVisits();
    this.animateDataUpdate(1000);
  }

  private getListPosition() {
    this.statService.getListPosition(this.userId).subscribe({
      next: (count) => {
        this.statisticData.listPosition = count;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  private getVisits() {
    this.statService.getVisitCount(this.userId, this.startTime, this.endTime).subscribe({
      next: (count) => {
        this.statisticData.visit = count;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  private getClicks(clickType: string, fieldName: keyof StatisticData) {
    this.statService.getClickCount(clickType, this.userId, this.startTime, this.endTime).subscribe({
      next: (count) => {
        this.statisticData[fieldName] = count;
        this.statisticData.interestingCoef += count;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  private getInstagramClicks() {
    this.getClicks('instagram', 'instagram');
  }

  private getPhoneClicks() {
    this.getClicks('phone', 'phone');
  }

  private getTiktokClicks() {
    this.getClicks('tiktok', 'tiktok');
  }

  private getTelegramClicks() {
    this.getClicks('telegram', 'telegram');
  }

  private getUnixTimeXDaysAgo(xDaysAgo: number) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - xDaysAgo);
    currentDate.setHours(0, 0, 0, 0);
    return Math.floor(currentDate.getTime() / 1000);
  }

  private getCurrentUnixTime() {
    const currentDate = new Date();
    return Math.floor(currentDate.getTime() / 1000);
  }

  private getAvgPriceServiceItemByUserId() {
    this.statService.getAvgPriceServiceItemByUserId(this.userId).subscribe({
      next: (data) => {
        data.forEach(d => d.priceDifferentPercent = (d.avgPrice - d.price) / d.avgPrice * 100)
        this.avgPriceByServiceItems = data.filter(d => Math.abs(d.priceDifferentPercent) !> 1);
      },
      error: (err) => {
        console.error(err);
      }

    })
  }
}
