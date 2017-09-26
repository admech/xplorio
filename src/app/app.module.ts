import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlotComponent } from './plot.component';
import { DataService } from './data.service';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent
    , PlotComponent
    , ChartComponent
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
