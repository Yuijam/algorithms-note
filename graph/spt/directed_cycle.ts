import { DirectedEdge } from "./directed_edge";
import { EdgeWightedGraph } from "./edge_weighted_graph";

export class DirectedCycle {
  private marked: boolean[];
  private edgeTo: DirectedEdge[];
  private cycle: DirectedEdge[]; // 有向环中的所有顶点
  private onStack: boolean[];  // 递归调用栈上的所有顶点

  constructor(g: EdgeWightedGraph) {
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

  private dfs(g: EdgeWightedGraph, v: number) {
    this.onStack[v] = true;
    this.marked[v] = true;
    g.adjOf(v)?.forEach(w => {  // bellman_ford中检测环的时候调用到这里并不能保证g中adj的每个顶点都有值
      if (this.hasCycle()) {
        return;
      } else if (!this.marked[w.to()]) {
        this.edgeTo[w.to()] = w;
        this.dfs(g, w.to());
      } else if (this.onStack[w.to()]) {
        this.cycle.unshift(w);
        for (let x = v; x != w.to(); x = this.edgeTo[x].from()) {
          this.cycle.unshift(this.edgeTo[x])
        }
      }
    })
    this.onStack[v] = false;
  }

  public hasCycle(): boolean {
    return this.cycle.length > 0;
  }

  public getCycle() {
    return this.cycle;
  }
}