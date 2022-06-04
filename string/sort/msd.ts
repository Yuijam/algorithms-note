import fs from 'fs'

class MSD {
  private R: number = 256
  private M: number = 10
  private aux: string[] = []

  private charAt(s: string, d: number) {
    return d < s.length ? s.charCodeAt(d) : -1
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

  public sort(a: string[]) {
    const n = a.length
    this.aux = new Array(n)
    this._sort(a, 0, n - 1, 0)
  }

  private _sort(a: string[], lo: number, hi: number, d: number) {
    // 递归到死，不使用插入排序
    // if (lo >= hi) return

    // 根据阈值使用插入排序结束递归
    if (hi <= lo + this.M) {
      this.insertion(a, lo, hi, d)
      return
    }

    const count = new Array(this.R + 2).fill(0)
    for (let i = lo; i <= hi; i++) {
      count[this.charAt(a[i], d) + 2]++ // +2为了对付charAt为-1的情况
    }
    // i + 1 < this.R + 2
    for (let i = 0; i < this.R + 1; i++) {
      count[i + 1] += count[i]
    }
    for (let i = lo; i <= hi; i++) {
      this.aux[count[this.charAt(a[i], d) + 1]++] = a[i]
    }
    for (let i = lo; i <= hi; i++) {
      a[i] = this.aux[i - lo]
    }

    for (let r = 0; r < this.R; r++) {
      this._sort(a, lo + count[r], lo + count[r + 1] - 1, d + 1)
    }
  }

  private insertion(a: string[], lo: number, hi: number, d: number) {
    for (let i = lo; i <= hi; i++) {
      for (let j = i; j > lo && this.less(a[j], a[j - 1], d); j--) {
        this.exch(a, j, j - 1)
      }
    }
  }

  private exch(a: string[], i: number, j: number) {
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }

  private less(v: string, w: string, d: number) {
    for (let i = d; i < Math.min(v.length, w.length); i++) {
      if (v.charCodeAt(i) < w.charCodeAt(i)) return true
      if (v.charCodeAt(i) > w.charCodeAt(i)) return false
    }
    return v.length < w.length
  }
}

const data = [
  'she',
  'sells',
  'seashells',
  'by',
  'the',
  'sea',
  'shore',
  'the',
  'shells',
  'she',
  'sells',
  'are',
  'surely',
  'seashells',
]

new MSD().sort(data)
data.forEach((d) => console.log(d))

/*
are
by
sea
seashells
seashells
sells
sells
she
she
shells
shore
surely
the
the
*/


// new MSD().sortFromFile(__dirname + '/big_strings')
/*
是否使用插入排序话费时间（毫秒）
    不使用 使用
10w  77    26   33.77%
100w 525   218  41.52%
*/


// 防止ts报错
export {}
