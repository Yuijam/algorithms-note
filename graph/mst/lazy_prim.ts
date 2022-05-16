import { Edge } from './edge'
import { MinPQ } from './min_pq'
import { EdgeWightedGraph, TGraphData } from './edge_weighted_graph'
class LazyPrimMST {
  private marked: boolean[] = []
  private mst: Edge[] = []
  private pq: MinPQ = new MinPQ()

  constructor(g: EdgeWightedGraph) {
    this.visit(g, 0);
    while (!this.pq.isEmpty()) {
      const e = this.pq.delMin();
      const v = e.either();
      const w = e.other(v);
      if (this.marked[v] && this.marked[w]) continue;
      this.mst.push(e);
      if (!this.marked[v]) this.visit(g, v);
      if (!this.marked[w]) this.visit(g, w);
    }
  }

  // 标记一个点v，扫描v的邻接点，将被没有被标记的邻接点的边加入到pq中
  // 而其余的边其实就是失效的边，之后也不会再用到了
  private visit(g: EdgeWightedGraph, v: number) {
    this.marked[v] = true
    g.adjOf(v).forEach((e) => {
      if (!this.marked[e.other(v)]) {
        this.pq.insert(e)
      }
    })
  }

  public getEdges() {
    return this.mst;
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
  const g = new EdgeWightedGraph(data);
  const mst = new LazyPrimMST(g);
  
  mst.getEdges().forEach(e => {
    const v = e.either();
    const w = e.other(v);
    const weight = e.getWeight();
    console.log(`${v}-${w} ${weight}`);
  });
}

/*
0-7 0.16
1-7 0.19
0-2 0.26
2-3 0.17
5-7 0.28
4-5 0.35
6-2 0.4
*/

main();