import { Edge } from './edge'
// Fake Min PQ
export class MinPQ {
  private data: Edge[];

  constructor(data: Edge[] = []) {
    this.data = data;
  }

  public insert(n: Edge) {
    this.data.push(n)
  }

  public delMin() {
    let minIdx = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (minIdx === -1 || this.data[i].getWeight() < this.data[minIdx].getWeight()) {
        minIdx = i
      }
    }
    const min = this.data[minIdx]
    this.data.splice(minIdx, 1)
    return min;
  }

  public isEmpty() {
    return this.data.length === 0;
  }
}
