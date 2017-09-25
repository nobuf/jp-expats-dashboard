const csv = require('csv')
const fs = require('fs')
const d3 = require('d3')

const prefectures = d3.csvParse(fs.readFileSync('../../docs/assets/prefectures.csv', 'utf8'))

const transform = csv.transform((record) => {
  const prefecture = prefectures.find(d => d.prefecture_ja.replace(/[県府都]$/, '') === record[1])
  record[1] = prefecture ? prefecture.prefecture_id : record[1]

  // skip the first column
  return record.map(d => d.replace(/\r?\n|\r/g, '')).slice(1)
})

process.stdin
  .pipe(csv.parse())
  .pipe(transform)
  .pipe(csv.stringify({
    header: true
  }))
  .pipe(process.stdout)
