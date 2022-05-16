import { Edge } from "./edge";
import { EdgeWightedGraph, TGraphData } from "./edge_weighted_graph";
import { MinPQ } from "./min_pq";
import { UF } from "./union_find";

class KruskalMST {
  private mst: Edge[];

  constructor(g: EdgeWightedGraph) {
    this.mst = [];
    const pq = new MinPQ(g.getEdges());
    const uf = new UF(g.getV());

    while (!pq.isEmpty() && this.mst.length < g.getV() - 1) {
      const e = pq.delMin();
      const v = e.either();
      const w = e.other(v);
      if (uf.connected(v, w)) continue;
      uf.union(v, w);
      this.mst.push(e);
    }
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
  const mst = new KruskalMST(g);
  
  mst.getEdges().forEach(e => {
    const v = e.either();
    const w = e.other(v);
    const weight = e.getWeight();
    console.log(`${v}-${w} ${weight}`);
  });
}

/*
0-7 0.16
2-3 0.17
1-7 0.19
0-2 0.26
5-7 0.28
4-5 0.35
6-2 0.4
*/

main();