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
  private edgeTo: number[]; // 记录每一个顶点的父节点
  private s: number;  // 起点

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
    // 因为edgeTo里面记录了每一个点的父节点，所以从树的最下面开始往上走，就能得到要的路径
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
  console.log(path); // [ 5, 3, 2, 0 ]
}

main();