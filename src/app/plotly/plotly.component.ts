import { Component, EventEmitter, Input, Output, OnInit, ElementRef} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from  '@angular/router';

declare var Plotly: any;
declare var MathJax: any;

@Component({
  selector: 'plotlychart',
  templateUrl: 'plotly.component.html'
  // , styleUrls: ['./plotly.component.css']
})
export class PlotlyComponent implements OnInit {

    stuff = {
      name: "$$\\text{Trajectory on } Oxy$$",
      axes: {
        x: {
          name: "$$x$$",
          // min: 0,
          // max: 4
        },
        y: {
          name: "$$y$$",
          // min: 0,
          // max: 5
        },
      },
      series: [
        {
          name: "sol1", // "$$\\vec{\\nu_0} = (1, 0, 1)$$", // mathjax / latex add a weird scroll
          xs: [ 1, 2, 3, 2 ],
          ys: [ 1, 2, 3, 4 ]
        },
        {
          name: "sol",
          xs: [ 1.2, 2.2, 3.2, 2.2 ],
          ys: [ 1,   2,   3,   4   ]
        }
      ]
    };

    theThing = {
        "frames": [], 
        "layout": {
            "title": this.stuff.name,
            "autosize": true, 
            "showlegend": true, 
            // "legend": {
            //   x: 0,
            //   y: 0,
            //   width: 200,
            //   height: 100
            // },
            "breakpoints": [], 
            "yaxis": {
                "title": this.stuff.axes.y.name,
                "type": "linear", 
                "autorange": true, 
                // "range": [
                    // this.stuff.axes.y.min, 
                    // this.stuff.axes.y.max
                // ], 
                // "rangeslider": { // does not work for Y for some reason
                //     "bordercolor": "#444", 
                //     "visible": true, 
                //     "thickness": 0.15, 
                //     "bgcolor": "white", 
                //     "borderwidth": 0, 
                //     "autorange": true
                // }, 
            }, 
            "xaxis": {
                "title": this.stuff.axes.x.name,
                "type": "linear", 
                "autorange": true, 
                // "range": [
                    // this.stuff.axes.x.min, 
                    // this.stuff.axes.x.max
                // ], 
                // "rangeslider": { // causes a loop of typesetting math for some while when dragged
                //     "bordercolor": "#444", 
                //     "visible": true, 
                //     "thickness": 0.15, 
                //     "bgcolor": "white", 
                //     "borderwidth": 0, 
                //     "autorange": true
                // }, 
            }, 
            "hovermode": "closest"
        }, 
        "data": [
            {
                "name": this.stuff.series[0].name, 
                "x": this.stuff.series[0].xs,
                "y": this.stuff.series[0].ys, 
                "type": "scatter", 
                "mode": "lines", 
                "hoverinfo": "none", 
                "line": {
                    "width": 1.5
                }, 
                "opacity": 1.0, 
                // "autobinx": true, 
                // "autobiny": true
            }, 
            {
                "name": this.stuff.series[1].name, 
                "x": this.stuff.series[1].xs,
                "y": this.stuff.series[1].ys, 
                "type": "scatter", 
                "mode": "lines", 
                "hoverinfo": "none", 
                "line": {
                    "width": 1.0
                }, 
                "opacity": 0.5000000000000001, 
                // "autobinx": true, 
                // "autobiny": true
            }
        ]
    };


    data: any;
    layout: any;
    options: any;
    displayRawData: boolean = true;

    ngOnInit() {
        this.data = this.theThing.data;
        // [
        //   {
        //     x: [1, 2, 3, 4, 3],
        //     y: [1, 2, 4, 8, 16]
        //   }
        // ];
        this.layout = this.theThing.layout;
        // {
          // margin: { t: 0 }
        // };

        console.log("ngOnInit PlotlyComponent");
        console.log(this.data);
        console.log(this.layout);

        Plotly.newPlot('myPlotlyDiv', this.data, this.layout); //, this.options);
    }


}

