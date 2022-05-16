import { Edge } from './edge'
import { EdgeWightedGraph, TGraphData } from './edge_weighted_graph'
import { IndexMinPQ } from './index_min_pq'

class PrimMST {
  private edgeTo: Edge[] = []  // 保存到每个顶点的权重最小路径
  private distTo: number[] = []  // 保存到每个顶点的权重最小路径的权重 distTo[w] = edgeTo[w].weight()
  private marked: boolean[] = []
  private pq: IndexMinPQ  // 只保存有效的横切边

  constructor(g: EdgeWightedGraph) {
    for (let v = 0; v < g.getV(); v++) {
      this.distTo[v] = Infinity
    }

    this.pq = new IndexMinPQ(g.getV())

    this.distTo[0] = 0
    this.pq.insert(0, 0)
    while (!this.pq.isEmpty()) {
      this.visit(g, this.pq.delMin())
    }
  }

  private visit(g: EdgeWightedGraph, v: number) {
    this.marked[v] = true
    g.adjOf(v).forEach((e) => {
      const w = e.other(v)
      // this.marked[w]为true，则表示v-w这条路径失效，不做处理，直接略过
      if (!this.marked[w] && e.getWeight() < this.distTo[w]) {
        this.edgeTo[w] = e
        this.distTo[w] = e.getWeight()
        if (this.pq.contains(w)) {
          this.pq.change(w, e.getWeight())
        } else {
          this.pq.insert(w, e.getWeight())
        }
      }
    })
  }

  public getEdges() {
    return this.edgeTo
  }
}

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
    [6, 2, 0.4],
    [3, 6, 0.52],
    [6, 0, 0.58],
    [6, 4, 0.93],
  ],
}

const main = () => {
  const g = new EdgeWightedGraph(data)
  const mst = new PrimMST(g)

  mst.getEdges().forEach((e) => {
    const v = e.either()
    const w = e.other(v)
    const weight = e.getWeight()
    console.log(`${v}-${w} ${weight}`)
  })
}

/*
1-7 0.19
0-2 0.26
2-3 0.17
4-5 0.35
5-7 0.28
6-2 0.4
0-7 0.16
*/

main()
