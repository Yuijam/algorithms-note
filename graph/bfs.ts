import { TGraphData, Graph, TEdge } from "./graph";

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

class BreadthFirstPaths {
  private marked: boolean[];
  private edgeTo: number[];
  private s: number;

  constructor(g: Graph, s: number) {
    this.marked = [];
    this.edgeTo = [];
    this.s = s;

    this.bfs(g, s);
  }

  private bfs(g: Graph, s: number) {
    let queue = [s];

    while (queue.length) {
      const v = queue[0];
      queue.shift();
      g.adjOf(v).forEach(adj => {
        if (!this.marked[adj]) {
          this.marked[adj] = true;
          this.edgeTo[adj] = v;
          queue.push(adj);
        }
      })
    }
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
  const bfs = new BreadthFirstPaths(g, 0);
  const path = bfs.pathTo(0);
  console.log(path);
}

main();