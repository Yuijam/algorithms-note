class _Node<T> {
  public val?: T
  // 256=R, _Node本来是个内部类的，这样就能使用到R了
  public next: (_Node<T> | undefined)[] = new Array<_Node<T>>(256)
}

class TrieST<T> {
  private R = 256
  private root?: _Node<T>

  constructor(data: [string, T][]) {
    data.forEach(([k, v]) => this.put(k, v))
  }

  public put(key: string, val: T) {
    this.root = this._put(key, val, 0, this.root)
  }

  private _put(key: string, val: T, d: number, x?: _Node<T>) {
    if (x === undefined) {
      x = new _Node<T>()
    }
    if (d === key.length) {
      x.val = val
      return x
    }
    const c = key.charCodeAt(d)
    x.next[c] = this._put(key, val, d + 1, x.next[c])
    return x
  }

  public get(key: string) {
    const x = this._get(key, 0, this.root)
    return x === undefined ? undefined : x.val
  }

  private _get(key: string, d: number, x?: _Node<T>): _Node<T> | undefined {
    if (x === undefined) return undefined
    if (d === key.length) return x
    const c = key.charCodeAt(d)
    return this._get(key, d + 1, x.next[c])
  }

  public keys() {
    return this.keyWithPrefix('')
  }

  public keyWithPrefix(pre: string) {
    const queue: string[] = []
    // 先用_get找到以pre为根节点的结点，如果这样的结点不存在也就不需要继续查找了
    this.collect(pre, queue, this._get(pre, 0, this.root))
    return queue
  }

  private collect(pre: string, q: string[], x?: _Node<T>) {
    if (x === undefined) return
    if (x.val !== undefined) q.push(pre)
    for (let c = 0; c < this.R; c++) {
      this.collect(pre + String.fromCharCode(c), q, x.next[c])
    }
  }

  public keysThatMatch(pat: string) {
    const q: string[] = []
    this.collectWithPat('', pat, q, this.root)
    return q
  }

  private collectWithPat(pre: string, pat: string, q: string[], x?: _Node<T>) {
    const d = pre.length
    if (x === undefined) return
    if (d === pat.length && x.val !== undefined) q.push(pre)
    if (d === pat.length) return

    const next = pat.charAt(d)
    for (let c = 0; c < this.R; c++) {
      if (next === '.' || next.charCodeAt(0) === c) {
        this.collectWithPat(pre + String.fromCharCode(c), pat, q, x.next[c])
      }
    }
  }

  public longestPrefixOf(s: string) {
    const len = this.search(s, 0, 0, this.root)
    return s.substring(0, len)
  }

  private search(s: string, d: number, length: number, x?: _Node<T>): number {
    if (x === undefined) return length
    if (x.val !== undefined) length = d // 只有找到有值的结点才更新length
    if (d === s.length) return length
    const c = s.charAt(d)
    return this.search(s, d + 1, length, x.next[c.charCodeAt(0)])
  }

  public delete(key: string) {
    this.root = this._delete(key, 0, this.root)
  }

  private _delete(key: string, d: number, x?: _Node<T>) {
    if (!x) return undefined
    if (d === key.length) {
      x.val = undefined
    } else {
      const c = key.charCodeAt(d)
      x.next[c] = this._delete(key, d + 1, x.next[c])
    }

    // 上面的代码表示已经完成了key的删除工作，下面是开始递归回溯的过程
    // 如果结点有值，那么该结点需要被保留
    if (x.val) return x

    // 如果结点没有值，这个时候检查是否有其他结点，有则说明这个结点也不需要删除，否则返回undefined删除
    for (let c = 0; c < this.R; c++) {
      if (x.next[c]) return x
    }
    return undefined
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
  const st = new TrieST<number>(d)

  console.log(`keys: ${st.keys()}`)

  console.log(`get shells: ${st.get('shells')}`)
  console.log(`get shell: ${st.get('shell')}`)

  console.log(`key with prefix 'sea': ${st.keyWithPrefix('sea')}`)
  console.log(`key with prefix 'see': ${st.keyWithPrefix('see')}`)

  console.log(`key that match '.h.': ${st.keysThatMatch('.h.')}`)
  console.log(`key that match 's..': ${st.keysThatMatch('s..')}`)
  console.log(`key that match 's..l': ${st.keysThatMatch('s..l')}`)

  console.log(`longest prefix of 'shellsea': ${st.longestPrefixOf('shellsea')}`)
  console.log(`longest prefix of 'shed': ${st.longestPrefixOf('shed')}`)
  console.log(`longest prefix of 'see': ${st.longestPrefixOf('see')}`)

  console.log(`get seashells: ${st.get('seashells')}`)
  console.log(`delete seashells`)
  st.delete('seashells')
  console.log(`get seashells after delete: ${st.get('seashells')}`)
  console.log(`get sea after delete: ${st.get('sea')}`)
  st.delete('sea')
  console.log(`get sea after delete: ${st.get('sea')}`)
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
keys: are,by,sea,seashells,sells,she,shells,shore,surely,the
get shells: 8
get shell: undefined
key with prefix 'sea': sea,seashells
key with prefix 'see': 
key that match '.h.': she,the
key that match 's..': sea,she
key that match 's..l': 
longest prefix of 'shellsea': shells
longest prefix of 'shed': she
longest prefix of 'see': 
get seashells: 12
delete seashells
get seashells after delete: undefined
get sea after delete: 5
get sea after delete: undefined
*/

main()
