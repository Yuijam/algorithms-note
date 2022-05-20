import { DirectedEdge } from "./directed_edge";
import {IndexMinPQ} from '../mst/index_min_pq'
import { EdgeWightedGraph, TGraphData } from "./edge_weighted_graph";

class DijkstraSP {
  private edgeTo: DirectedEdge[]  // edgeTo[w]表示指向w的权值最小的边
  private distTo: number[]  // distTo[w]从s到w的最小权值
  private pq: IndexMinPQ

  constructor(g: EdgeWightedGraph, s: number) {
    this.edgeTo = []
    this.distTo = []
    this.pq = new IndexMinPQ(g.getV())

    for (let v = 0; v < g.getV(); v++) {
      this.distTo[v] = Infinity
    }
    this.distTo[s] = 0

    this.pq.insert(s, 0)
    while (!this.pq.isEmpty()) {
      this.relax(g, this.pq.delMin())
    }
  }

  private relax(g: EdgeWightedGraph, v: number) {
    g.adjOf(v).forEach(e => {
      const w = e.to()
      if (this.distTo[w] > this.distTo[v] + e.getWeight()) {
        this.distTo[w] = this.distTo[v] + e.getWeight()
        this.edgeTo[w] = e
        if (this.pq.contains(w)) this.pq.change(w, this.distTo[w])
        else  this.pq.insert(w, this.distTo[w])
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
    [4, 5, 0.35],
    [5, 4, 0.35],
    [4, 7, 0.37],
    [5, 7, 0.28],
    [7, 5, 0.28],
    [5, 1, 0.32],
    [0, 4, 0.38],
    [0, 2, 0.26],
    [7, 3, 0.39],
    [1, 3, 0.29],
    [2, 7, 0.34],
    [6, 2, 0.40],
    [3, 6, 0.52],
    [6, 0, 0.58],
    [6, 4, 0.93]
  ]
}

const main = () => {
  const g = new EdgeWightedGraph(data)
  const s = 0;
  const sp = new DijkstraSP(g, s)
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
0 to 0 (0): 
0 to 1 (1.05): 0->4 0.38 4->5 0.35 5->1 0.32 
0 to 2 (0.26): 0->2 0.26 
0 to 3 (0.9900000000000001): 0->2 0.26 2->7 0.34 7->3 0.39 
0 to 4 (0.38): 0->4 0.38 
0 to 5 (0.73): 0->4 0.38 4->5 0.35 
0 to 6 (1.5100000000000002): 0->2 0.26 2->7 0.34 7->3 0.39 3->6 0.52 
0 to 7 (0.6000000000000001): 0->2 0.26 2->7 0.34 
*/

main()

