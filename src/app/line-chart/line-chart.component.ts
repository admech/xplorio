// Based on a tutorial by Keath Milligan
// https://keathmilligan.net/create-a-reusable-chart-component-with-angular-and-d3-js/

import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';
import { ScaleLinear, Line } from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit, OnChanges {
  @ViewChild('lineChart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  private margin: any = {top: 20, right: 20, bottom: 30, left: 50};
  private chart: any;
  private size: number;
  private width: number;
  private height: number;
  private xScale: ScaleLinear<number, number>;
  private yScale: ScaleLinear<number, number>;
  private line: Line<[number, number]>;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor() { }

  ngOnInit() {
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    // let w = element.offsetWidth;
    // let h = element.offsetHeight;
    let w = 400;
    let h = 400;
    this.width = w - this.margin.left - this.margin.right;
    this.height = h - this.margin.top - this.margin.bottom;
    const svg = d3.select(element).append('svg')
      .attr('width', w)
      .attr('height', h);

    this.chart = svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.size = Math.max(this.width, this.height);
    this.xScale = d3.scaleLinear()
        .rangeRound([0, this.size]);
    this.yScale = d3.scaleLinear()
        .rangeRound([this.size, 0]);
    this.line = d3.line()
        .x(d => this.xScale(d[0]))
        .y(d => this.yScale(d[1]));

    this.xAxis = this.chart.append("g")
        .attr("transform", "translate(0," + this.height + ")");
    this.xAxis
        .call(d3.axisBottom(this.xScale));

    this.yAxis = this.chart.append("g")
        .call(d3.axisLeft(this.yScale));
    this.yAxis
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Price ($)");
  }

  updateChart() {
    let xExtent = d3.extent(this.data, d => d[0]);
    let yExtent = d3.extent(this.data, d => d[1]);
    let extent = [ Math.min(xExtent[0], yExtent[0]), Math.max(xExtent[1], yExtent[1]) ];
    this.xScale.domain(extent);
    this.yScale.domain(extent);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    this.chart.selectAll('.chartLine').remove();

    this.chart.append("path")
        .datum(this.data)
        .attr('class', 'chartLine')
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", this.line);
  }
}