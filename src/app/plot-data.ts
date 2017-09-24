export class PlotData {
  constructor(
    public name: string,
    public axes: DataAxes,
    public series: DataSeries[]
  ) { }
}

export class DataAxes {
  constructor(
    public x: DataAxis,
    public y: DataAxis
  ) { }
}

export class DataAxis {
  constructor(
    public name: string,
    public min: number,
    public max: number
  ) { }
}

export class DataSeries {
  constructor(
    public name: string,
    public points: number[][] // [ [x1,y1], [x2,y2], ... ]
  ) { }
}