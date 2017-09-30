import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { ChartData, ChartDataEntry } from './chart-data';
import { ChartDataService } from './chart-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private lineChartDataSubject: Subject<void>;

  constructor(
    private chartDataService: ChartDataService
  ) {
    this.lineChartDataSubject = chartDataService.getSubject();
  }

  ngOnInit() {
    this.newChart();
  }

  newChart() {
    console.log('creating a new chart');
    this.chartDataService.create()
      .then(entry => {
        console.log('created.');
        this.lineChartDataSubject.next();
        this.chartDataService.bringToFront(entry.index());
      });
  }


}
