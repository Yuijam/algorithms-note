type TStudent = {
  name: string
  group: number
}

const sort = (students: TStudent[], maxGroupNum: number) => {
  const count = new Array(maxGroupNum + 1).fill(0)

  // 频率统计
  students.forEach((s) => {
    count[s.group + 1]++ // group+1是一个巧妙的地方
  })

  // 频率转换为索引
  for (let i = 0; i + 1 < count.length; i++) {
    count[i + 1] += count[i]
  }

  // 数据分类（开始排序）
  const tmp = new Array(students.length)
  students.forEach((s) => {
    tmp[count[s.group]++] = s
  })

  // 回写
  tmp.forEach((t, i) => {
    students[i] = t
  })
}

const data: TStudent[] = [
  { name: 'Anderson', group: 2 },
  { name: 'Brown', group: 3 },
  { name: 'Davis', group: 3 },
  { name: 'Garcia', group: 4 },
  { name: 'Harris', group: 1 },
  { name: 'Jackson', group: 3 },
  { name: 'Johnson', group: 4 },
  { name: 'Jones', group: 3 },
  { name: 'Martin', group: 1 },
  { name: 'Martinez', group: 2 },
  { name: 'Miller', group: 2 },
  { name: 'Moore', group: 1 },
  { name: 'Robinson', group: 2 },
  { name: 'Smith', group: 4 },
  { name: 'Taylor', group: 3 },
  { name: 'Thomas', group: 4 },
  { name: 'Thompson', group: 4 },
  { name: 'White', group: 2 },
  { name: 'Williams', group: 3 },
  { name: 'Wilson', group: 4 },
]

sort(data, 4)
data.forEach((d) => console.log(`${d.group} ${d.name}`))

/*
1 Harris
1 Martin
1 Moore
2 Anderson
2 Martinez
2 Miller
2 Robinson
2 White
3 Brown
3 Davis
3 Jackson
3 Jones
3 Taylor
3 Williams
4 Garcia
4 Johnson
4 Smith
4 Thomas
4 Thompson
4 Wilson
*/

// 防止ts报错
export {}