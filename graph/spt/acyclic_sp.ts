import { DirectedEdge } from "./directed_edge";
import { EdgeWightedGraph, TGraphData } from "./edge_weighted_graph";
import {Topological} from './topological'

class AcyclicSP {
  private edgeTo: DirectedEdge[]
  private distTo: number[]

  constructor(g: EdgeWightedGraph, s: number) {
    this.edgeTo = []
    this.distTo = []
    for (let v = 0; v < g.getV(); v++) {
      this.distTo[v] = Infinity
    }
    this.distTo[s] = 0

    const top = new Topological(g)
    top.getOrder().forEach(v => {
      this.relax(g, v)
    })
  }

  private relax(g: EdgeWightedGraph, v: number) {
    g.adjOf(v).forEach(e => {
      const w = e.to()
      if (this.distTo[w] > this.distTo[v] + e.getWeight()) {
        this.distTo[w] = this.distTo[v] + e.getWeight()
        this.edgeTo[w] = e
      }
    })
  }

  public hasPathTo(w: number) {
    return this.edgeTo[w] !== undefined;
  }

  public pathTo(w: number) {
    const path: DirectedEdge[] = []
    for (let v = w; this.edgeTo[v] !== undefined; v = this.edgeTo[v].from()) {
      path.unshift(this.edgeTo[v])
    }
    return path
  }

  public getDistTo(w: number) {
    return this.distTo[w]
  }
}

const data: TGraphData = {
  V: 8,
  edges: [
    [5, 4, 0.35],
    [4, 7, 0.37],
    [5, 7, 0.28],
    [5, 1, 0.32],
    [4, 0, 0.38],
    [0, 2, 0.26],
    [3, 7, 0.39],
    [1, 3, 0.29],
    [7, 2, 0.34],
    [6, 2, 0.40],
    [3, 6, 0.52],
    [6, 0, 0.58],
    [6, 4, 0.93]
  ]
}

const main = () => {
  const g = new EdgeWightedGraph(data)
  const s = 5;
  const sp = new AcyclicSP(g, s)
  for (let t = 0; t < g.getV(); t++) {
    let str = `${s} to ${t} (${sp.getDistTo(t)}): `;
    if (sp.hasPathTo(t)) {
      sp.pathTo(t).forEach(e => {
        str += `${e.from()}->${e.to()} ${e.getWeight()} `
      })
    }
    console.log(str)
  }
}

/*
5 to 0 (0.73): 5->4 0.35 4->0 0.38 
5 to 1 (0.32): 5->1 0.32 
5 to 2 (0.6200000000000001): 5->7 0.28 7->2 0.34 
5 to 3 (0.61): 5->1 0.32 1->3 0.29 
5 to 4 (0.35): 5->4 0.35 
5 to 5 (0): 
5 to 6 (1.13): 5->1 0.32 1->3 0.29 3->6 0.52 
5 to 7 (0.28): 5->7 0.28 
*/
main()