// Based on a tutorial by Keath Milligan
// https://keathmilligan.net/create-a-reusable-chart-component-with-angular-and-d3-js/

import { Component, OnInit, OnChanges, EventEmitter, ViewChild, ElementRef, Input, Output, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';
import { ScaleLinear, Line } from 'd3';

import { Observable } from 'rxjs/Observable';

import { ChartAxes } from '../chart-data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit, OnChanges {
  @ViewChild('lineChart') private chartContainer: ElementRef;
  @Input() private index: number;

  @Input() private left: number;
  @Input() private top: number;
  @Input() private indexOfZ: Observable<number>;

  @Input() private data: Array<any>;
  @Input() private axes: ChartAxes;

  @Output() deleteChart = new EventEmitter<number>();
  @Output() stoppedDrag = new EventEmitter<number>();
  @Output() startedDrag = new EventEmitter<number>();
  private margin: any = {top: 20, right: 20, bottom: 30, left: 50};
  private chart: any;
  private scales: { maxX: number, minY: number };
  private width: number;
  private height: number;
  private xScale: ScaleLinear<number, number>;
  private yScale: ScaleLinear<number, number>;
  private line: Line<[number, number]>;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  public equalAxes: () => { x: [number, number], y: [number, number]}
  = () => {
    let extent = this.extent(
      this.data,
      series => this.envelope(
        d3.extent(series, d => d[0] as number), 
        d3.extent(series, d => d[1] as number)
      )
    );
    return { x: extent, y: extent }
  };
  public simpleAxes: () => { x: [number, number], y: [number, number]}
  = () => { return { 
    x: this.extent(this.data, series => d3.extent(series, d => d[0] as number)), 
    y: this.extent(this.data, series => d3.extent(series, d => d[1] as number)) 
  }};

  constructor() { }

  ngOnInit() {
    this.createAndUpdateChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  createAndUpdateChart() {
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  recreateChart() {
    const element = this.chartContainer.nativeElement;
    d3.select(element).select('svg').remove();
    this.createAndUpdateChart();
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    let w = element.offsetWidth;
    let h = element.offsetHeight;
    this.width = w - this.margin.left - this.margin.right;
    this.height = h - this.margin.top - this.margin.bottom;
    const svg = d3.select(element).append('svg')
      .attr('width', w)
      .attr('height', h);

    this.chart = svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.scales = this.getAxisScales(this.width, this.height);
    this.xScale = d3.scaleLinear()
        .rangeRound([0, this.scales.maxX]);
    this.yScale = d3.scaleLinear()
        .rangeRound([this.scales.minY, 0]);
    this.line = d3.line()
        .x(d => this.xScale(d[0]))
        .y(d => this.yScale(d[1]))
        .curve(d3.curveBasis);

    this.colors = d3.scaleLinear()
      .domain([0, this.data.length])
      .range(<any[]>['blue', 'red']);

    this.xAxis = this.chart.append("g")
        .attr("transform", "translate(0," + this.scales.minY + ")");
    this.xAxis
        .call(d3.axisBottom(this.xScale));
    this.xAxis
        .append("text")
        .attr("fill", "#000")
        .attr("x", this.scales.maxX + 6)
        .attr("dx", "0.71em")
        .attr("text-anchor", "end")
        .text(this.axes.xName);

    this.yAxis = this.chart.append("g")
        .call(d3.axisLeft(this.yScale));
    this.yAxis
        .append("text")
        .attr("fill", "#000")
        .attr("x", 6)
        .attr("dx", "0.71em")
        .attr("text-anchor", "end")
        .text(this.axes.yName);
  }

  private envelope(pairA: [number, number], pairB: [number, number]): [number, number] {
    return [ Math.min(pairA[0], pairB[0]), Math.max(pairA[1], pairB[1]) ];
  }

  private extent(data: number[][][], listOfSeries: (series: number[][]) => [number, number]): [number, number] {
    return data.map(listOfSeries).reduce((extentA, extentB, i, extents) => this.envelope(extentA, extentB))
  }

  private getAxisScales(width: number, height: number): { maxX: number, minY: number } {
    if (this.axes.scale === 'equal') {
      let size = Math.min(width, height);
      return {
        maxX: size,
        minY: size
      };
    } else if (this.axes.scale === 'simple') {
      return {
        maxX: width,
        minY: height
      };
    } else {
      throw "Unsupported type of axes: " + this.axes.scale;
    }
  }

  updateChart() {
    let extentX = this.extent(this.data, series => d3.extent(series, d => d[0] as number));
    let extentY = this.extent(this.data, series => d3.extent(series, d => d[1] as number));
    this.xScale.domain(extentX);
    this.yScale.domain(extentY);

    this.colors.domain([0, this.data.length]);

    // this.xAxis.transition().call(d3.axisBottom(this.xScale));
    // this.yAxis.transition().call(d3.axisLeft(this.yScale));

    this.chart.selectAll('.chartLine').remove();

    for (var i = this.data.length - 1; i >= 0; i--) {
      this.chart.append("path")
          .datum(this.data[i])
          .attr('class', 'chartLine')
          .attr("fill", "none")
          .attr("stroke", this.colors(i))
          // .style('stroke', (d, i) => this.colors(i))
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", this.line);
    }
  }

  delete() {
    this.deleteChart.next(this.index);
  }

  startedDragging() {
    console.log('Started dragging chart #' + this.index);
    this.startedDrag.next(this.index);
  }

  stoppedDragging() {
    console.log('Stopped dragging chart #' + this.index);
    this.stoppedDrag.next(this.index);
  }

}