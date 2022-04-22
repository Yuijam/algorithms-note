import { Digraph } from "./digraph";

export class DirectedCycle {
  private marked: boolean[];
  private edgeTo: number[];
  private cycle: number[]; // 有向环中的所有顶点
  private onStack: boolean[];  // 递归调用栈上的所有顶点

  constructor(g: Digraph) {
    this.marked = [];
    this.edgeTo = [];
    this.onStack = [];
    this.cycle = [];

    for (let v = 0; v < g.getV(); v++) {
      if (!this.marked[v]) {
        this.dfs(g, v);
      }
    }
  }

  private dfs(g: Digraph, v: number) {
    this.onStack[v] = true;
    this.marked[v] = true;
    g.adjOf(v).forEach(w => {
      if (this.hasCycle()) {
        return;
      } else if (!this.marked[w]) {
        this.edgeTo[w] = v;
        this.dfs(g, w);
      } else if (this.onStack[w]) {
        for (let x = v; x != w; x = this.edgeTo[x]) {
          this.cycle.push(x);
        }
        this.cycle.push(w);
        this.cycle.push(v);
      }
    })
    this.onStack[v] = false;
  }

  public hasCycle(): boolean {
    return this.cycle.length > 0;
  }

  public getCycle(): number[] {
    return this.cycle;
  }
}