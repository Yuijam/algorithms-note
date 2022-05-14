import { Edge, TGraphData } from './edge'

const data: TGraphData = {
  V: 8,
  edges: [
    [4, 5, 0.35],
    [4, 7, 0.37],
    [5, 7, 0.28],
    [0, 7, 0.16],
    [1, 5, 0.32],
    [0, 4, 0.38],
    [2, 3, 0.17],
    [1, 7, 0.19],
    [0, 2, 0.26],
    [1, 2, 0.36],
    [1, 3, 0.29],
    [2, 7, 0.34],
    [6, 2, 0.40],
    [3, 6, 0.52],
    [6, 0, 0.58],
    [6, 4, 0.93],
  ]
}

export class EdgeWightedGraph {
  private V: number;
  private E: number;
  private adj: Edge[][];

  constructor(data: TGraphData) {
    this.V = data.V;
    this.E = 0;
    this.adj = [];

    data.edges.forEach(([v, w]) => this.addEdge(v, w));
  }

  public addEdge(e: Edge) {
    const v = e.either();
    const w = e.other(v);
    this.adj[v] = this.adj[v] || [];
    this.adj[w] = this.adj[w] || [];
    this.adj[v].push(e);
    this.adj[w].push(e);
    this.E++;
  }

  public adjOf(v: number) {
    return this.adj[v];
  }

  public getV() {
    return this.V;
  }

  public getE() {
    return this.E;
  }
}