import { Digraph, TGraphData } from "./digraph";
import { DepthFirstOrder } from "./dfo";

class KosarajuSCC {
  private marked: boolean[];
  private count: number;  // 连通分量数
  private id: number[];  // 记录每一个顶点的连通分量的标识符

  constructor(g: Digraph) {
    this.marked = [];
    this.count = 0;
    this.id = [];

    // 用反向图来计算逆后序
    const order = new DepthFirstOrder(g.reverse());
    console.log(order.getReversePost());
    order.getReversePost().forEach(s => {
      if (!this.marked[s]) {
        this.dfs(g, s);
        // 每一次dfs走完都意味着走完了一个连通分量
        this.count++;
      }
    })
  }

  private dfs(g: Digraph, v: number) {
    this.marked[v] = true;
    this.id[v] = this.count;
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

  public getId(v: number) {
    return this.id[v];
  }

  public stronglyConnected(v: number, w: number) {
    return this.id[v] === this.id[w];
  }
}

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

const main = () => {
  const g = new Digraph(data);
  const search = new KosarajuSCC(g);

  console.log(`components: ${search.getCount()}`);

  const components: number[][] = [];
  for (let i = 0; i < g.getV(); i++) {
    const id = search.getId(i);
    components[id] = components[id] || [];
    components[id].push(i);
  }
  console.log(components);
}

main();
// components: 5
// [ [ 1 ], [ 0, 2, 3, 4, 5 ], [ 9, 10, 11, 12 ], [ 6 ], [ 7, 8 ] ]