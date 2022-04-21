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

class CC {
  private marked: boolean[];
  private count: number;  // 连通分量数
  private id: number[];  // 记录每一个顶点的连通分量的标识符

  constructor(g: Graph) {
    this.marked = [];
    this.count = 0;
    this.id = [];

    for (let s = 0; s < g.getV(); s++) {
      if (!this.marked[s]) {
        this.dfs(g, s);
        // 每一次dfs走完都意味着走完了一个连通分量
        this.count++;
      }
    }
  }

  private dfs(g: Graph, v: number) {
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

  public connected(v: number, w: number) {
    return this.id[v] === this.id[w];
  }
}

const main = () => {
  const g = new Graph(data);
  const search = new CC(g);

  console.log(`components: ${search.getCount()}`);

  const components: number[][] = [];
  for (let i = 0; i < g.getV(); i++) {
    const id = search.getId(i);
    components[id] = components[id] || [];
    components[id].push(i);
  }
  console.log(components);
  // components: 3
  // [
  //   [
  //     0, 1, 2, 3,
  //     4, 5, 6
  //   ], 
  //   [7, 8], 
  //   [9, 10, 11, 12]
  // ]
}

main();