import { TGraphData, Graph, TEdge } from './graph';

const data: TGraphData = {
  V: 6,
  edges: Array.from<TEdge>([
    [0, 5],
    [2, 4],
    [2, 3],
    [1, 2],
    [0, 1],
    [3, 4],
    [3, 5],
    [0, 2],
  ]).reverse()
}

class DepthFirstPaths {
  private marked: boolean[];
  private edgeTo: number[];
  private s: number;

  constructor(g: Graph, s: number) {
    this.marked = [];
    this.edgeTo = [];
    this.s = s;

    this.dfs(g, s);
  }

  private dfs(g: Graph, v: number) {
    this.marked[v] = true;

    g.adjOf(v).forEach(adj => {
      if (!this.marked[adj]) {
        this.edgeTo[adj] = v;
        this.dfs(g, adj);
      }
    })
  }

  public hasPathTo(v: number) {
    return this.marked[v];
  }

  public pathTo(v: number) {
    if (!this.hasPathTo(v)) {
      return null;
    }

    const path = [];
    for (let x = v; x !== this.s; x = this.edgeTo[x]) {
      path.push(x);
    }
    path.push(this.s);
    return path;
  }
}

const main = () => {
  const g = new Graph(data);
  const dfp = new DepthFirstPaths(g, 0);
  const path = dfp.pathTo(5);
  console.log(path);
}

main();