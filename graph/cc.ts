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
  private count: number;
  private id: number[];

  constructor(g: Graph) {
    this.marked = [];
    this.count = 0;
    this.id = [];
    
    for (let s = 0; s < g.getV(); s++) {
      if (!this.marked[s]) {
        this.dfs(g, s);
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
}

main();