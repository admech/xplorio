export class ChartData {

  private data = new Map<number, Array<any>>();

  set(index: number, data: Array<any>) {
    console.log('Adding at ' + index + ': ' + data);
    this.data.set(index, data);
  }

  get(index: number): Array<any> {
    console.log('Getting at ' + index);
    return this.data.get(index);
  }

  remove(index: number) {
    console.log('Deleting at ' + index);
    this.data.delete(index);
  }

  entries(): IterableIterator<[number, any[]]> {
    return this.data.entries();
  }

}