import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/last';

import { Updatable } from './updatable';

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

  constructor(
    private _index: number,
    private _name: string,
    private _data: any[],
    private position: ChartDataEntryPosition,
    private _axes: ChartAxes
  ) { }

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
    return this.position.getZIndex();
  }

  setZIndex(zIndex: number) {
    console.log('Changing entry #' + this._index + ' zIndex from ' + this.position.getZIndex().last() + ' to ' + zIndex);
    this.position.setZIndex(zIndex);
  }

  left() {
    return this.position.left;
  }

  setLeft(left: number) {
    console.log('Changing entry #' + this._index + ' left from ' + this.position.left + ' to ' + left);
    this.position.left = left;
  }

  top() {
    return this.position.top;
  }

  setTop(top: number) {
    console.log('Changing entry #' + this._index + ' top from ' + this.position.top + ' to ' + top);
    this.position.top = top;
  }

  axes() {
    return this._axes;
  }

}

export class ChartDataEntryPosition {
  private zIndex: Updatable<number>;

  constructor(
    public left: number | null,
    public top: number | null,
    private initialZIndex: number
  ) {
    this.zIndex = new Updatable(initialZIndex);
  }

  getZIndex() {
    return this.zIndex.get();
  }

  setZIndex(nextZIndex: number) {
    this.zIndex.set(nextZIndex);
  }

}

export type AxisScale = 'equal' | 'simple';

export class ChartAxes {
  
  constructor(
    public xName: string,
    public yName: string,
    public scale: AxisScale
  ) { }

}



