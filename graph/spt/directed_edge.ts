export class DirectedEdge {
  private v: number
  private w: number
  private weight: number

  constructor(v: number, w: number, weight: number) {
    this.v = v
    this.w = w
    this.weight = weight
  }

  public getWeight() {
    return this.weight
  }

  public from() {
    return this.v
  }

  public to() {
    return this.w
  }
}