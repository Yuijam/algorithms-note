import fs from 'fs'
// [0-9A-z]
// 48~57, 65~90, 97~122

const getRandomInt = (max: number) => Math.floor(Math.random() * max)

function getRandomRange(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //不含最大值，含最小值
}

const numbers = [48, 57]
const lowercase = [65, 90]
const uppercase = [97, 122]
const allChars = [numbers, lowercase, uppercase]

const genstr = () => {
  let len = getRandomInt(7) + 1 // 1~7
  const chars = allChars[getRandomInt(3)]

  let str = ''
  while (len > 0) {
    const charcode = getRandomRange(chars[0], chars[1] + 1)
    const char = String.fromCharCode(charcode)
    str += char
    len--
  }
  return str
}

const appendFile = (content: string) => {
  fs.appendFileSync(__dirname + '/big_strings', content)
}

const gen = () => {
  let len = 1000000
  // let len = 11
  const chunk = 1000
  // const chunk = 10
  let arr = new Array(chunk)
  let arrLen = 0
  while (len > 0) {
    const str = genstr()
    arr[arrLen++] = str
    len--
    if (arrLen >= chunk) {
      const s = len > 0 ? arr.join('\n') + '\n' : arr.join('\n')
      appendFile(s)
      arrLen = 0
    }
  }
  appendFile(arr.slice(0, arrLen).join('\n'))
}

gen()
