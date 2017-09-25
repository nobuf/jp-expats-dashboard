const csv = require('csv')
const fs = require('fs')
const d3 = require('d3')

const prefectures = d3.csvParse(fs.readFileSync('../../docs/assets/prefectures.csv', 'utf8'))

const transform = csv.transform((record) => {
  // nationality-201212.xls has a blank row at the end of the file
  if (record.length < 2) {
    return null
  }
  const prefecture = prefectures.find(d => d.prefecture_ja.replace(/[県府都]$/, '') === record[1].replace(/\s/g, ''))
  record[1] = prefecture ? prefecture.prefecture_id : record[1]

  // skip the first column
  return record.slice(1)
})

process.stdin
  .pipe(csv.parse())
  .pipe(transform)
  .pipe(csv.stringify({
    header: true
  }))
  .pipe(process.stdout)
