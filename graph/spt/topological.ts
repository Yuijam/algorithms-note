import { DepthFirstOrder } from "./dfo";
import { EdgeWightedGraph } from "./edge_weighted_graph";
import { DirectedCycle } from './directed_cycle';

export class Topological {
  private order: number[];

  constructor(g: EdgeWightedGraph) {
    const cyclefinder = new DirectedCycle(g);
    this.order = [];
    if (!cyclefinder.hasCycle()) {
      const dfo = new DepthFirstOrder(g);
      this.order = dfo.getReversePost();
    }
  }

  public getOrder() {
    return this.order;
  }

  public isDAG() {
    return this.order.length > 0;
  }
}