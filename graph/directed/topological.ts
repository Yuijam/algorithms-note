import { DepthFirstOrder } from "./dfo";
import { Digraph, TGraphData } from "./digraph";
import { DirectedCycle } from './directed_cycle';

class Topological {
  private order: number[];

  constructor(g: Digraph) {
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
    // return this.order !== undefined;
    return this.order.length > 0;
  }
}

const data: TGraphData = {
  V: 13,
  edges: [
    [2, 3],
    [0, 5],
    [0, 1],
    [0, 6],
    [2, 0],
    [11, 12],
    [9, 11],
    [9, 12],
    [9, 10],
    [3, 5],
    [8, 7],
    [5, 4],
    [6, 4],
    [6, 9],
    [7, 6],
  ]
}

const main = () => {
  const g = new Digraph(data);
  const top = new Topological(g);

  console.log(top.getOrder().join(', '));
  // 8, 7, 2, 3, 0, 6, 9, 10, 11, 12, 1, 5, 4
}

main();