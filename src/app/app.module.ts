import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgResizableModule } from 'ngresizable';

// import { AngularDraggableModule } from 'angular2-draggable';
import { AngularDraggableDirective } from './drag/drag.directive';
export * from './drag/drag.directive';

import { AppComponent } from './app.component';
import { PlotComponent } from './plot.component';
import { DataService } from './data.service';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';

import { ChartDataService } from './chart-data.service';

@NgModule({
  imports: [
    BrowserModule
    // , AngularDraggableModule
    , NgResizableModule
  ],
  declarations: [
    AppComponent
    , PlotComponent
    , BarChartComponent
    , LineChartComponent
    , AngularDraggableDirective
  ],
  providers: [
    DataService,
    ChartDataService
  ],
  exports: [
    AngularDraggableDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
