import { DirectedEdge } from './directed_edge'

// v, w, weight
export type TEdge = [number, number, number]

export type TGraphData = {
  V: number
  edges: TEdge[]
}

export class EdgeWightedGraph {
  private V: number
  private E: number
  private adj: DirectedEdge[][]

  constructor(data: TGraphData) {
    this.V = data.V
    this.E = 0
    this.adj = []

    data.edges.forEach(([v, w, weight]) => this.addEdge(new DirectedEdge(v, w, weight)))
  }

  public addEdge(e: DirectedEdge) {
    const from = e.from()
    const to = e.to()
    this.adj[from] = this.adj[from] || []
    this.adj[to] = this.adj[to] || []
    this.adj[from].push(e)
    this.E++
  }

  public adjOf(v: number) {
    return this.adj[v]
  }

  public getV() {
    return this.V
  }

  public getE() {
    return this.E
  }

  public getEdges() {
    return this.adj.flat();
  }
}
