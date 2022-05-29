import { DirectedCycle } from "./directed_cycle"
import { DirectedEdge } from "./directed_edge"
import { EdgeWightedGraph, TEdge, TGraphData } from "./edge_weighted_graph"

export class BellmanFordSP {
  private distTo: number[] = []
  private edgeTo: DirectedEdge[] = []
  private onQ: boolean[] = []
  private queue: number[] = []
  private cost: number = 0
  private cycle: DirectedEdge[] =[]

  constructor(g: EdgeWightedGraph, s: number) {
    for (let v = 0; v < g.getV(); v++) {
      this.distTo[v] = Infinity
    }
    this.distTo[s] = 0
    this.queue.push(s)
    this.onQ[s] = true

    while (this.queue.length !== 0 && !this.hasNegativeCycle()) {
      const v = this.queue.shift() as number // queue.dequeue(); 这个shift是返回number|undefined，不用as会报错
      this.onQ[v] = false
      this.relax(g, v)
    }
  }

  private relax(g: EdgeWightedGraph, v: number) {
    g.adjOf(v).forEach(e => {
      const w = e.to()
      if (this.distTo[w] > this.distTo[v] + e.getWeight()) {
        this.distTo[w] = this.distTo[v] + e.getWeight()
        this.edgeTo[w] = e
        if (!this.onQ[w]) {
          this.queue.push(w)
          this.onQ[w] = true
        }
      }
      // 这个地方书上应该是写错了，写成了cost++，特意查了他们官网的代码是++cost
      if (++this.cost % g.getV() === 0) {  
        this.findNegativeCycle()
        if (this.hasNegativeCycle()) return
      }
    })
  }

  public negativeCycle() {
    return this.cycle
  }

  public hasNegativeCycle() {
    return this.cycle.length !== 0
  }

  public findNegativeCycle() {
    const v = this.edgeTo.length
    const edges: TEdge[] = []
    this.edgeTo.forEach(e => {
      if (e) {
        edges.push([e.from(), e.to(), e.getWeight()])
      }
    })
    const cycleGraph: TGraphData =  {
      V: v,
      edges
    }

    const spt = new EdgeWightedGraph(cycleGraph)
    const cyclefinder = new DirectedCycle(spt)

    this.cycle = cyclefinder.getCycle()
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

// 无负权重环
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
    [6, 2, -1.2],
    [3, 6, 0.52],
    [6, 0, -1.4],
    [6, 4, -1.25]
  ]
}

/*
0 to 0 (0): 
0 to 1 (0.9300000000000002): 0->2 0.26 2->7 0.34 7->3 0.39 3->6 0.52 6->4 -1.25 4->5 0.35 5->1 0.32 
0 to 2 (0.26): 0->2 0.26 
0 to 3 (0.9900000000000001): 0->2 0.26 2->7 0.34 7->3 0.39 
0 to 4 (0.26000000000000023): 0->2 0.26 2->7 0.34 7->3 0.39 3->6 0.52 6->4 -1.25 
0 to 5 (0.6100000000000002): 0->2 0.26 2->7 0.34 7->3 0.39 3->6 0.52 6->4 -1.25 4->5 0.35 
0 to 6 (1.5100000000000002): 0->2 0.26 2->7 0.34 7->3 0.39 3->6 0.52 
0 to 7 (0.6000000000000001): 0->2 0.26 2->7 0.34
*/

// 有负权重环
const data1: TGraphData = {
  V: 8,
  edges: [
    [4, 5, 0.35],
    [5, 4, -0.66],
    [4, 7, 0.37],
    [5, 7, 0.28],
    [7, 5, 0.28],
    [5, 1, 0.32],
    [0, 4, 0.38],
    [0, 2, 0.26],
    [7, 3, 0.39],
    [1, 3, 0.29],
    [2, 7, 0.34],
    [6, 2, 0.4],
    [3, 6, 0.52],
    [6, 0, 0.58],
    [6, 4, 0.93]
  ]
}

/*
cycle:
4->5 0.35
5->4 -0.66
*/

const main = () => {
  const g = new EdgeWightedGraph(data) 
  // const g = new EdgeWightedGraph(data1) 
  const s = 0
  const sp = new BellmanFordSP(g, s)
  
  if (sp.hasNegativeCycle()) {
    console.log('cycle:')
    sp.negativeCycle().forEach(e => console.log(`${e.from()}->${e.to()} ${e.getWeight()}`))
  } else {
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
  
}

// main()