import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/last';

import { Updatable } from './updatable';

import { AxisScale } from './chart-types';

export class ChartData {

  private data = new Map<number, ChartDataEntry>();

  set(index: number, entry: ChartDataEntry) {
    console.log('Adding at ' + index + ', num series: ' + entry.data.length);
    this.data.set(index, entry);
  }

  get(index: number): ChartDataEntry {
    console.log('Getting at ' + index);
    return this.data.get(index);
  }

  delete(index: number) {
    console.log('Deleting at ' + index);
    this.data.delete(index);
  }

  entries(): ChartDataEntry[] {
    let zIndex = 0;
    return Array.from(
      this.data.entries(),
      (kv, i) => kv[1]
    );
  }

}

export class ChartDataEntry {
  private _zIndex: Updatable<number>;

  constructor(
    private _index: number,
    private _name: string,
    private _data: any[],
    private seriesNames: string[],
    private initialZIndex: number,
    private _axes: ChartAxes
  ) {
    this._zIndex = new Updatable(initialZIndex);
  }

  index() {
    return this._index;
  }

  name() {
    return this._name;
  }

  data() {
    return this._data;
  }

  zIndex() {
    return this._zIndex.get();
  }

  setZIndex(zIndex: number) {
    console.log('Changing entry #' + this._index + ' zIndex from ' + this._zIndex.get().last() + ' to ' + zIndex);
    this._zIndex.set(zIndex);
  }

  axes() {
    return this._axes;
  }

}

export class ChartAxes {
  
  constructor(
    public xName: string,
    public yName: string,
    public scale: AxisScale
  ) { }

}



