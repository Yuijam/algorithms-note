class BoyerMoore {
  private right: number[]
  private pat: string

  constructor(pat: string) {
    this.pat = pat
    const M = pat.length
    const R = 256
    this.right = new Array(R).fill(0)

    for (let c = 0; c < R; c++) {
      this.right[c] = -1
    }
    for (let j = 0; j < M; j++) {
      this.right[pat.charCodeAt(j)] = j
    }
  }

  public search(txt: string) {
    const N = txt.length
    const M = this.pat.length
    let skip: number
    for (let i = 0; i <= N - M; i += skip) {
      skip = 0
      for (let j = M - 1; j >= 0; j--) {
        if (this.pat.charAt(j) !== txt.charAt(i + j)) {
          skip = j - this.right[txt.charCodeAt(i + j)]
          if (skip < 1) skip = 1
          break
        }
      }
      if (skip === 0) return i
    }
    return N
  }
}

const bm = new BoyerMoore('caa');
console.log(bm.search('abcaaccaa'))  // 2
console.log(bm.search('epqacaaac'))  // 4

export {}