import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlotComponent } from './plot.component';
import { DataService } from './data.service';
import { PlotlyComponent } from './plotly/plotly.component';

@NgModule({
  declarations: [
    AppComponent
    , PlotComponent
    , PlotlyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
