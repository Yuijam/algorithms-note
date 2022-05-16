import { Edge } from './edge'

// v, w, weight
export type TEdge = [number, number, number]

export type TGraphData = {
  V: number
  edges: TEdge[]
}

export class EdgeWightedGraph {
  private V: number
  private E: number
  private adj: Edge[][]

  constructor(data: TGraphData) {
    this.V = data.V
    this.E = 0
    this.adj = []

    data.edges.forEach(([v, w, weight]) => this.addEdge(new Edge(v, w, weight)))
  }

  public addEdge(e: Edge) {
    const v = e.either()
    const w = e.other(v)
    this.adj[v] = this.adj[v] || []
    this.adj[w] = this.adj[w] || []
    this.adj[v].push(e)
    this.adj[w].push(e)
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
}
