class _Node<T> {
  c: number = 0 // 该结点代表的字符
  left?: _Node<T>
  mid?: _Node<T>
  right?: _Node<T>
  val?: T
}

class TST<T> {
  private root?: _Node<T>

  constructor(data: [string, T][]) {
    data.forEach(([k, v]) => this.put(k, v))
  }

  public get(key: string) {
    const x = this._get(key, 0, this.root)
    return x?.val
  }

  private _get(key: string, d: number, x?: _Node<T>): (_Node<T> | undefined) {
    if (!x) return undefined
    const c = key.charCodeAt(d)
    if (c < x.c) return this._get(key, d, x.left)
    else if (c > x.c) return this._get(key, d, x.right)
    else if (d < key.length - 1) return this._get(key, d + 1, x.mid)
    else return x
  }

  public put(key: string, val: T) {
    this.root = this._put(key, val, 0, this.root)
  }

  private _put(key: string, val: T, d: number, x?: _Node<T>): _Node<T> {
    const c = key.charCodeAt(d)
    if (!x) {
      x = new _Node<T>()
      x.c = c
    }
    if (c < x.c) x.left = this._put(key, val, d, x.left)
    else if (c > x.c) x.right = this._put(key, val, d, x.right)
    else if (d < key.length - 1) x.mid = this._put(key, val, d + 1, x.mid)
    else x.val = val
    return x
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
  'are',
  'surely',
  'seashells',
]

const main = () => {
  const d = data.map((str, index) => [str, index] as [string, number])
  console.log(`input data:`, d)

  const st = new TST<number>(d)

  console.log(`get shells: ${st.get('shells')}`)
  console.log(`get shell: ${st.get('shell')}`)
  console.log(`get seashells: ${st.get('seashells')}`)
}

/*
input data: [
  [ 'she', 0 ],
  [ 'sells', 1 ],
  [ 'seashells', 2 ],
  [ 'by', 3 ],
  [ 'the', 4 ],
  [ 'sea', 5 ],
  [ 'shore', 6 ],
  [ 'the', 7 ],
  [ 'shells', 8 ],
  [ 'she', 9 ],
  [ 'are', 10 ],
  [ 'surely', 11 ],
  [ 'seashells', 12 ]
]
get shells: 8
get shell: undefined
get seashells: 12
*/

main()

export {}
