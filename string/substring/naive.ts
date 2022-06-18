class Naive {
  public search(pat: string, txt: string) {
    const M = pat.length
    const N = txt.length
    for (let i = 0; i <= N - M; i++) {
      let j: number = 0
      for (j = 0; j < M; j++) {
        if (txt.charAt(i + j) !== pat.charAt(j)) {
          break
        }
      }
      if (j === M) {
        return i
      }
    }
    return N
  }
}

// Naive回退版本
class Naive1 {
  public search(pat: string, txt: string) {
    let i,
      M = pat.length
    let j,
      N = txt.length
    for (i = 0, j = 0; i < N && j < M; i++) {
      if (txt.charAt(i) === pat.charAt(j)) {
        j++
      } else {
        i -= j
        j = 0
      }
    }
    return j === M ? i - M : N
  }
}

const txt = 'abcaaccaa'

console.log(new Naive().search('caa', txt)) // 2
console.log(new Naive1().search('caa', txt)) // 2
