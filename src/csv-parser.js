export function parsePrefectureIdCSV (d) {
  return {
    id: d.prefecture_id,
    name: d.prefecture_en.replace(/\sPrefecture$/, ''), // use short name
    name_ja: d.prefecture_ja,
    name_ja_short: d.prefecture_ja.replace(/[県府都]$/, '')
  }
}

export function parsePopulationCSV (d) {
  return {
    id: d.id.substr(0, 2), // prefecture id
    total: +d.total,
    change: +d.change
  }
}

export function parseVisaTypeCSV (d) {
  delete d[''] // skip a blank column name
  for (let [k, v] of Object.entries(d)) {
    if (k !== 'prefecture_id') {
      d[k] = +v
    }
  }
  return d
}

export function parseNationalityCSV (d) {
  for (let [k, v] of Object.entries(d)) {
    if (k !== '都道府県') {
      d[k] = +v
    }
  }
  return d
}
