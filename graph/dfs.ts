import { TGraphData, Graph } from './graph';

const data: TGraphData = {
  V: 13,
  edges: [
    [0, 5],
    [4, 3],
    [0, 1],
    [9, 12],
    [6, 4],
    [5, 4],
    [0, 2],
    [11, 12],
    [9, 10],
    [0, 6],
    [7, 8],
    [9, 11],
    [5, 3],
  ]
}

class DepthFirstSearch {
  private marked: boolean[];
  private count: number;

  constructor(g: Graph, s: number) {
    this.marked = [];
    this.count = 0;
    this.dfs(g, s);
  }

  private dfs(g: Graph, v: number) {
    this.marked[v] = true;
    this.count++;
    g.adjOf(v).forEach(adj => {
      if (!this.marked[adj]) {
        this.dfs(g, adj);
      }
    })
  }

  public getMarked(w: number) {
    return this.marked[w];
  }

  public getCount() {
    return this.count;
  }
}

const main = () => {
  const g = new Graph(data);
  const search = new DepthFirstSearch(g, 9);

  for (let v = 0; v < g.getV(); v++) {
    if (search.getMarked(v)) {
      console.log(v);
    }
  }

  if (search.getCount() != g.getV()) {
    console.log('not connected');
  } else {
    console.log('connected');
  }
}

main();