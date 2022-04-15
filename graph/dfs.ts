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
  private marked: boolean[];  // 标记所有与s连通的点
  private count: number; // 与s连通点的顶点总数

  constructor(g: Graph, s: number) {
    this.marked = [];
    this.count = 0;
    this.dfs(g, s);
  }

  private dfs(g: Graph, v: number) {
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
  const g = new Graph(data);
  const search = new DepthFirstSearch(g, 0);

  const marked = [];
  for (let v = 0; v < g.getV(); v++) {
    if (search.getMarked(v)) {
      marked.push(v);
    }
  }
  console.log(marked.join(', '));

  if (search.getCount() != g.getV()) {
    console.log('not connected');
  } else {
    console.log('connected');
  }
}

main();