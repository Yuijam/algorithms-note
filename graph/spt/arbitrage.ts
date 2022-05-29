import { stat } from "fs"
import { BellmanFordSP } from "./bellman_ford"
import { EdgeWightedGraph, TEdge, TGraphData } from "./edge_weighted_graph"

const data: TGraphData = {
  V: 5,
  edges: [
    [0, 1, 0.741],
    [0, 2, 0.657],
    [0, 3, 1.061],
    [0, 4, 1.005],
    [1, 0, 1.349],
    [1, 2, 0.888],
    [1, 3, 1.433],
    [1, 4, 1.366],
    [2, 0, 1.521],
    [2, 1, 1.126],
    [2, 3, 1.614],
    [2, 4, 1.538],
    [3, 0, 0.942],
    [3, 1, 0.698],
    [3, 2, 0.619],
    [3, 4, 0.953],
    [4, 0, 0.995],
    [4, 1, 0.732],
    [4, 2, 0.650],
    [4, 3, 1.049],
  ]
}

const names = ['USD', 'EUR', 'GBP', 'CHF', 'CAD']

const main = () => {
  const lnEdges = data.edges.map(([s, t, w]) => [s, t, -Math.log(w)] as TEdge)
  data.edges = lnEdges
  const g = new EdgeWightedGraph(data)
  const spt = new BellmanFordSP(g, 0)
  if (spt.hasNegativeCycle()) {
    let stake = 1000
    const cycle = spt.negativeCycle()
    cycle.forEach(e => {
      let str = `${stake} ${names[e.from()]} = `
      stake *= Math.exp(-e.getWeight())
      str += `${stake} ${names[e.to()]}`
      console.log(str)
    })   
  }
}

main()