import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlotComponent } from './plot.component';
import { DataService } from './data.service';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';

import { ChartDataService } from './chart-data.service';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent
    , PlotComponent
    , BarChartComponent
    , LineChartComponent
  ],
  providers: [
    DataService,
    ChartDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
