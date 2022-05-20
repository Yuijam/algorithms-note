import { DirectedEdge } from "./directed_edge";
import { EdgeWightedGraph, TGraphData, TEdge } from "./edge_weighted_graph";
import { Topological } from './topological'

class AcyclicLP {
  private edgeTo: DirectedEdge[]
  private distTo: number[]

  constructor(g: EdgeWightedGraph, s: number) {
    this.edgeTo = []
    this.distTo = []

    const ng = this.negativeGraph(g);
    for (let v = 0; v < ng.getV(); v++) {
      this.distTo[v] = Infinity
    }
    this.distTo[s] = 0

    const top = new Topological(ng)
    console.log(top)
    top.getOrder().forEach(v => {
      this.relax(ng, v)
    })
  }

  private negativeGraph(g: EdgeWightedGraph) {
    const edges: TEdge[] = []
    g.getEdges().forEach(e => {
      edges.push([e.from(), e.to(), -e.getWeight()])
    })
    const data: TGraphData = {
      V: g.getV(),
      edges,
    }
    return new EdgeWightedGraph(data)
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
    return -this.distTo[w]
  }
}

type TTask = {
  V: number,
  tasks: number[][]
}

const data: TTask = {
  V: 10,
  tasks: [
    [41, 1, 7, 9],
    [51, 2],
    [50],
    [36],
    [38],
    [45],
    [21, 3, 8],
    [32, 3, 8],
    [32, 2],
    [29, 4, 6]
  ]
}

const main = () => {
  const n = data.V
  const V = 2 * n + 2
  const s = n * 2, t = 2 * n + 1
  const edges: TEdge[] = []
  for (let i = 0; i < data.tasks.length; i++) {
    const task = data.tasks[i]
    const [weight, ...next] = task
    edges.push([i, i + n, weight])
    edges.push([s, i, 0])
    edges.push([i + n, t, 0])

    for (let j = 0; j < next.length; j++) {
      const successor = next[j]
      edges.push([i + n, successor, 0])
    }
  }
  const graphData: TGraphData = {
    V,
    edges,
  }
  const g = new EdgeWightedGraph(graphData)
  const lp = new AcyclicLP(g, s)
  console.log('Start times:')
  for (let i = 0; i < n; i++) {
    console.log(`${i}: ${lp.getDistTo(i)}`)
  }
  console.log(`Finish time: ${lp.getDistTo(t)}`)
  
  const path: number[] = []
  lp.pathTo(t).forEach(e => {
    const from = e.from()
    if (from < n && !path.includes(from)) {
      path.push(from)
    }
  })
  console.log(`path: ${path.join(', ')}`)
}

main()