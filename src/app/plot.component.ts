import { Component, OnInit } from '@angular/core';

import { DataService } from './data.service';
import { PlotData, DataAxes, DataAxis, DataSeries } from './plot-data';

// https://thenextweb.com/dd/2015/06/12/20-best-javascript-chart-libraries/
// http://dygraphs.com/
// https://dc-js.github.io/dc.js/

@Component({
  selector: 'plot',
  templateUrl: './plot.component.html',
  styleUrls: [ './plot.component.css' ],
  providers: [ DataService ]
})
export class PlotComponent implements OnInit {

  lines: PlotLine[];
  width: number;
  height: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // let data = this.dataService.getData();

    // this.width = data.axes.x.max - data.axes.x.min;
    // this.height = data.axes.y.max - data.axes.y.min;

    this.width = 200;
    this.height = 200;
    this.lines = [
      new PlotLine([0,0,255], [[100, 100, 200, 0]]),
      new PlotLine([0,0,255], [[100, 100, 200, 0]])
    ];
    // this.lines = Array.from(
    //   {length: data.series.length },
    //   (v0, i) => Array.from(
    //     {length: data.series[i].points.length - 1},
    //     (v1, j) => data.series[i].points[j].concat(data.series[i].points[j+1]).map(it => it*200)
    //   )
    // );

  }

}

class PlotLine {
  constructor(
    public rgb: number[],
    public segments: number[][]
  ) { }
}