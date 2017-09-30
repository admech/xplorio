import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Updatable } from '../updatable';

import { ChartData, ChartDataEntry } from '../chart-data';
import { ChartDataService } from '../chart-data.service';


@Component({
  selector: 'charting-area',
  templateUrl: './charting.component.html',
  styleUrls: ['./charting.component.css']
})
export class ChartingComponent implements OnInit {

  private lineChartData: Observable<ChartDataEntry[]>;
  private lineChartDataSubject: Subject<void>;

  constructor(
    private chartDataService: ChartDataService
  ) {
    this.lineChartDataSubject = chartDataService.getSubject();
  }

  ngOnInit() {
    this.lineChartData = this.lineChartDataSubject
      .switchMap(it => this.chartDataService.getChartData())
      .catch(error => {
        console.error('error on get chart data: ' + error);
        return Observable.of([]);
      });
  }

  deleteChart(index: number) {
    console.log('deleting chart #' + index);
    this.chartDataService.delete(index)
      .then(deleted => {
        if (deleted) {
          console.log('deleted chart #' + index);
          this.lineChartDataSubject.next();
        } else {
          console.error('could not delete chart');
        }
      });
  }

  bringToFront(index: number): void {
    console.log("Bringing to front chart #" + index);
    this.chartDataService.bringToFront(index)
      .then(broughtToFront => {
        if (broughtToFront) {
          console.log('broughtToFront chart #' + index);
          this.lineChartDataSubject.next();
        } else {
          console.error('could not broughtToFront chart');
        }
      });
  }

}
