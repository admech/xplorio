import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgResizableModule } from 'ngresizable';

// import { AngularDraggableModule } from 'angular2-draggable';
import { AngularDraggableDirective } from './drag/drag.directive';
export * from './drag/drag.directive';

import { AppComponent } from './app.component';
import { ChartingComponent } from './charting/charting.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';

import { ChartDataService } from './chart-data.service';
import { SolutionService } from './solution.service';
import { DataSelectorComponent } from './data-selector/data-selector.component';


@NgModule({
  imports: [
    BrowserModule
    , NgResizableModule
  ],
  declarations: [
    AppComponent
    , ChartingComponent
    , BarChartComponent
    , LineChartComponent
    , AngularDraggableDirective, DataSelectorComponent
  ],
  providers: [
    ChartDataService,
    SolutionService
  ],
  exports: [
    AngularDraggableDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
