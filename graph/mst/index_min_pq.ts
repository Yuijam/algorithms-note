// Fake IndexMinPQ
export class IndexMinPQ {
  private data: (number | undefined)[] = []
  private len: number
  constructor(len: number) {
    this.len = len
  }

  public insert(i: number, n: number) {
    this.data[i] = n
  }

  public change(i: number, n: number) {
    this.data[i] = n
  }

  public contains(i: number) {
    return this.data[i]
  }

  public delMin() {
    let minIdx = -1
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] !== undefined) {
        // 用叹号是因为即使在这个if判定里this.data[i]肯定不是undefined，但是ts还是会报错说TS2532: Object is possibly 'undefined'
        // 这里即使用typeof来判断也是一样的，我记得以前不会这样的，不知道咋回事
        const a = this.data[i]!  
        const b = this.data[minIdx]!
        if (minIdx === -1 || a < b) {
          minIdx = i
        }
      }
    }
    this.data[minIdx] = undefined
    return minIdx
  }

  public isEmpty() {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] !== undefined) {
        return false
      }
    }
    return true
  }
}
