import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { ChartData, ChartDataEntry } from './chart-data';
import { ChartDataService } from './chart-data.service';

import { SolutionService } from './solution.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private lineChartDataSubject: Subject<void>;

  constructor(
    private chartDataService: ChartDataService,
    private solutionService: SolutionService
  ) {
    this.lineChartDataSubject = chartDataService.getSubject();
  }

  ngOnInit() {
    
  }

  newChart() {
    console.log('creating a new chart');
    console.log(this.solutionService.getSelectedItems());
    this.chartDataService.createForData(this.solutionService.getDataForSelectedItems())
      .then(entry => {
        console.log('created.');
        this.lineChartDataSubject.next();
        this.chartDataService.bringToFront(entry.index());
      });
  }


}
