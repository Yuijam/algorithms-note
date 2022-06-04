// LSD
const sort = (a: string[], w: number) => {
  const R = 256
  const N = a.length
  const aux = new Array(a.length)

  for (let i = w-1; i >= 0; i--) {
    const count = new Array(R + 1).fill(0) // 因为在统计频率的时候索引0不会访问到
    for (let j = 0; j < N; j++) {
      count[a[j].charCodeAt(i) + 1]++
    }
    for (let j = 0; j + 1 < count.length; j++) {
      count[j + 1] += count[j]
    }
    for (let j = 0; j < N; j++) {
      aux[count[a[j].charCodeAt(i)]++] = a[j]
    }
    for (let j = 0; j < N; j++) {
      a[j] = aux[j]
    }
  }
}

const data = [
  '1I34ERB',
  '1I34E21',
  '1I34F21',
  '1I34ERB',
  '2IP234Q',
  'NUIE989',
  'NU338AM',
  'UQ89P2M',
  'ZM12W89',
  'O9BVEEW',
]

sort(data, data[0].length)
data.forEach(d => console.log(d))

/*
1I34E21
1I34ERB
1I34ERB
1I34F21
2IP234Q
NU338AM
NUIE989
O9BVEEW
UQ89P2M
ZM12W89
*/

// 防止ts报错
export {}