import fs from 'fs'

class Quick3string {
  private charAt(s: string, d: number) {
    return d < s.length ? s.charCodeAt(d) : -1
  }

  public sort(a: string[]) {
    this._sort(a, 0, a.length - 1, 0)
  }

  private _sort(a: string[], lo: number, hi: number, d: number) {
    if (hi <= lo) return
    let lt = lo,
      gt = hi,
      i = lo + 1
    
    const v = this.charAt(a[lo], d)
    while (i <= gt) {
      const t = this.charAt(a[i], d)
      if (t < v) {
        this.exch(a, lt++, i++) 
      } else if (t > v) {
        this.exch(a, gt--, i)
      } else {
        i++
      }
    }
    // while之后是这么个感觉 ....lt....gt....
    this._sort(a, lo, lt - 1, d)
    if (v >= 0) { // 这个判断是为了防止v==-1也就是超过长度范围的情况，这个时候，就没有必要进行下一个字符排序了
      this._sort(a, lt, gt, d + 1) // 只对lt...gt这一段进行下一个字符的递归，因为这一区间的首字母都是相同的
    }
    this._sort(a, gt + 1, hi, d)
  }

  private exch(a: string[], i: number, j: number) {
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }

  public sortFromFile(file: string, output?: string) {
    const contents = fs.readFileSync(file).toString()
    const start = Date.now()
    const arr = contents.split("\n")
    this.sort(arr)
    // const cost = Math.floor((Date.now() - start) / 1000)
    const cost = Date.now() - start
    console.log('const:', cost)
    if (output) {
      fs.writeFileSync(output, arr.join("\n"))
    }
  }
}

// const data = [
//   'she',
//   'sells',
//   'seashells',
//   'by',
//   'the',
//   'sea',
//   'shore',
//   'the',
//   'shells',
//   'she',
//   'sells',
//   'are',
//   'surely',
//   'seashells',
// ]
// new Quick3string().sort(data)
// data.forEach((d) => console.log(d))

// new Quick3string().sortFromFile(__dirname + '/big_strings')
// 100w个字符串 花费270毫秒
