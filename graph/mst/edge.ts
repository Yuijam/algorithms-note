export class Edge {
  private v: number;
  private w: number;
  private weight: number;

  constructor(v: number, w: number, weight: number) {
    this.v = v;
    this.w = w;
    this.weight = weight;
  }

  public getWeight() {
    return this.weight;
  }

  public either() {
    return this.v;
  }

  public other(vertex: number) {
    if (vertex === this.v) {
      return this.w;
    } else if (vertex === this.w) {
      return this.v;
    } else {
      throw "Inconsistent edge";
    }
  }
}

export type TEdge = [number, number, number];

export type TGraphData = {
  V: number;
  edges: TEdge[];
}