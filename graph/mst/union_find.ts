export class UF {
  private parent: number[] = [];
  private count: number;

  constructor(v: number) {
    for (let i = 0; i < v; i++) {
      this.parent[i] = i;
    }

    this.count = v;
  }

  private find(x: number) {
    while (this.parent[x] !== x) {
      x = this.parent[x];
    }
    return x;
  }

  public connected(p: number, q: number) {
    const rootP = this.find(p);
    const rootQ = this.find(q);
    return rootP === rootQ;
  }

  public union(p: number, q: number) {
    const rootP = this.find(p);
    const rootQ = this.find(q);
    if (rootP === rootQ) {
      return;
    }
    this.parent[rootP] = rootQ;
    this.count--;
  }

  public getCount() {
    return this.count;
  }
}

// const main = () => {
//   const uf = new UF(10);
//   console.log(uf.getCount());
//   uf.union(0, 1);
//   uf.union(0, 2);
//   uf.union(0, 3);
//   console.log(uf.getCount());
//   uf.union(5, 3);
//   console.log(uf.getCount());
//   uf.union(6, 3);
//   uf.union(7, 3);
//   uf.union(8, 9);
//   uf.union(1, 8);
//   console.log(uf.getCount());
//   uf.union(4, 9);
//   console.log(uf.getCount());
// }

// main();