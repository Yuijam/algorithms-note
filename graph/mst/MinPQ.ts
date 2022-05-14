// Fake Min PQ
export class MinPQ<T> {
  private data: T[] = [];

  public insert(n: T) {
    this.data.push(n);
  }

  public delMin() {
    const min = Math.min(...this.data);
    const idx = this.data.indexOf(min);
    this.data.splice(idx, 1);
    return min;
  }
}