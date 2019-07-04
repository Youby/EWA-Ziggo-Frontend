import {Component, OnInit} from '@angular/core';
import {StatisticsService} from '../../../services/statistics.service';
import {Stats} from '../../../models/stats.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  stats: Stats = new Stats();
  barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{id: 'y-axis-1', ticks: {min: 0, stepSize: 1}}]
    }
  };
  myColors = [
    {
      backgroundColor: '#E92400',
      borderColor: '#E92400',
      pointBackgroundColor: '#E92400',
      pointBorderColor: '#E92400',
      pointHoverBackgroundColor: '#E92400',
      pointHoverBorderColor: '#E92400'
    }];
  barChartLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'];
  barChartType = 'bar';
  barChartLegend = false;
  barChartData = [
    {
      data: [0, 0, 0, 0, 0, 0, 0], label: 'Chats'
    }];

  constructor(private statService: StatisticsService) {
  }

  ngOnInit() {
    this.statService.getStats().subscribe(
      data => {
        this.stats = data;
        console.log(data);
        this.barChartData = [
          {
            data: [
              this.stats.chatsPerMonth.January,
              this.stats.chatsPerMonth.February,
              this.stats.chatsPerMonth.March,
              this.stats.chatsPerMonth.April,
              this.stats.chatsPerMonth.May,
              this.stats.chatsPerMonth.June,
              this.stats.chatsPerMonth.July,
              this.stats.chatsPerMonth.August,
              this.stats.chatsPerMonth.September,
              this.stats.chatsPerMonth.October,
              this.stats.chatsPerMonth.November,
              this.stats.chatsPerMonth.December,
            ], label: 'Chats'
          }];
      }
    );
  }
}
