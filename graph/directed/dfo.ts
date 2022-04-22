import { Digraph } from "./digraph";

export class DepthFirstOrder {
  private marked: boolean[];
  private pre: number[];
  private post: number[];
  private reversePost: number[];

  constructor(g: Digraph) {
    this.pre = [];
    this.post = [];
    this.reversePost = [];
    this.marked = [];

    for (let v = 0; v < g.getV(); v++) {
      if (!this.marked[v]) {
        this.dfs(g, v);
      }
    }
  }

  private dfs(g: Digraph, v: number) {
    this.pre.push(v);
    this.marked[v] = true;
    g.adjOf(v).forEach(w => {
      if (!this.marked[w]) {
        this.dfs(g, w);
      }
    })

    this.post.push(v);
    this.reversePost.unshift(v);
  }

  public getPre() {
    return this.pre;
  }

  public getPost() {
    return this.post;
  }

  public getReversePost() {
    return this.reversePost;
  }
}