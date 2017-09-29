export class ChartData {

  private data = new Map<number, Array<any>>();

  set(index: number, data: Array<any>) {
    console.log('Adding at ' + index + ', length: ' + data.length);
    this.data.set(index, data);
  }

  get(index: number): Array<any> {
    console.log('Getting at ' + index);
    return this.data.get(index);
  }

  delete(index: number) {
    console.log('Deleting at ' + index);
    this.data.delete(index);
  }

  entries(): ChartDataEntry[] {
    return Array.from(
      this.data.entries(),
      (entry, i) => new ChartDataEntry(entry)
    );
  }

}

export class ChartDataEntry {

  constructor(
    private entry: [number, any[]]
  ) { }

  index() {
    return this.entry[0];
  }

  data() {
    return this.entry[1];
  }

}