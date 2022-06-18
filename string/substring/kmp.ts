class KMP {
  private pat: string
  private dfa: number[][]

  constructor(pat: string) {
    this.pat = pat
    const M = pat.length
    const R = 256
    this.dfa = new Array(R).fill(0).map(_ => new Array(M).fill(0))
    this.dfa[pat.charCodeAt(0)][0] = 1
    for (let X = 0, j = 1; j < M; j++) {
      for (let c = 0; c < R; c++) {
        this.dfa[c][j] = this.dfa[c][X]
      }
      this.dfa[this.pat.charCodeAt(j)][j] = j + 1
      X = this.dfa[this.pat.charCodeAt(j)][X]
    }
  }

  public search(txt: string) {
    let i: number, j: number, N = txt.length, M = this.pat.length
    // i永不回头，然后通过查表来更新j
    for (i = 0, j = 0; i < N && j < M; i++) {
      j = this.dfa[txt.charCodeAt(i)][j]
    }
    if (j === M) return i - M
    else return N
  }
}

const kmp = new KMP('caa');
console.log(kmp.search('abcaaccaa'))  // 2
console.log(kmp.search('epqacaaac'))  // 4

export {}