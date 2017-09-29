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
    private _data: any[],
    private position: ChartDataEntryPosition
  ) { }

  index() {
    return this._index;
  }

  data() {
    return this._data;
  }

  zIndex() {
    return this.position.zIndex;
  }

  setZIndex(zIndex: number) {
    console.log('Changing entry #' + this._index + ' zIndex from ' + this.position.zIndex + ' to ' + zIndex);
    this.position.zIndex = zIndex;
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

}

export class ChartDataEntryPosition {
  constructor(
    public left: number | null,
    public top: number | null,
    public zIndex: number
  ) {}
}

