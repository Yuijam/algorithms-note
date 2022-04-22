export type TEdge = [number, number];

export type TGraphData = {
  V: number;
  edges: TEdge[];
}

export class Digraph {
  private V: number;
  private E: number;
  private adj: number[][];
  private data: TGraphData;

  constructor(data: TGraphData) {
    this.V = data.V;
    this.E = 0;
    this.adj = [];

    this.data = data;  // just save for reverse();
    data.edges.forEach(([v, w]) => this.addEdge(v, w));
  }

  public addEdge(v: number, w: number) {
    this.adj[v] = this.adj[v] || [];
    this.adj[w] = this.adj[w] || [];
    this.adj[v].push(w);
    // this.adj[w].push(v);
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

  public reverse(): Digraph {
    const r = new Digraph(this.data);
    for (let v = 0; v < r.getV(); v++) {
        this.adjOf(v).forEach(w => r.addEdge(w, v));
    }
    return r;
  }
}

