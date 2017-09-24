import { Component, EventEmitter, Input, Output, OnInit, ElementRef} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from  '@angular/router';

declare var Plotly: any;

@Component({
  selector: 'plotlychart',
  templateUrl: 'plotly.component.html'
  // , styleUrls: ['./plotly.component.css']
})
export class PlotlyComponent implements OnInit {

    data: any;
    layout: any;
    options: any;
    displayRawData: boolean = true;

    ngOnInit() {
        this.data = [
          {
            x: [1, 2, 3, 4, 3],
            y: [1, 2, 4, 8, 16]
          }
        ];
        this.layout = {
          margin: { t: 0 }
        };

        console.log("ngOnInit PlotlyComponent");
        console.log(this.data);
        console.log(this.layout);

        Plotly.newPlot('myPlotlyDiv', this.data, this.layout); //, this.options);
    }


}

