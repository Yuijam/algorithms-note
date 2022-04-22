
import { TGraphData, Digraph } from './digraph';

const data: TGraphData = {
  V: 13,
  edges: [
    [4, 2],
    [2, 3],
    [3, 2],
    [6, 0],
    [0, 1],
    [2, 0],
    [11, 12],
    [12, 9],
    [9, 10],
    [9, 11],
    [8, 9],
    [10, 12],
    [11, 4],
    [4, 3],
    [3, 5],
    [7, 8],
    [8, 7],
    [5, 4],
    [0, 5],
    [6, 4],
    [6, 9],
    [7, 6],
  ]
}

class DirectedDFS {
  private marked: boolean[];  // 标记所有与s连通的点
  private count: number; // 与s连通点的顶点总数

  constructor(g: Digraph, s: number) {
    this.marked = [];
    this.count = 0;
    this.dfs(g, s);
  }

  private dfs(g: Digraph, v: number) {
    this.marked[v] = true;  // 每访问一个点v则标记为已访问
    this.count++;
    g.adjOf(v).forEach(adj => {  // 遍历v的每一个相邻点
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
  const g = new Digraph(data);
  const search = new DirectedDFS(g, 6);

  const marked = [];
  for (let v = 0; v < g.getV(); v++) {
    if (search.getMarked(v)) {
      marked.push(v);
    }
  }
  console.log(marked.join(', '));  // 0, 1, 2, 3, 4, 5, 6, 9, 10, 11, 12
}

main();