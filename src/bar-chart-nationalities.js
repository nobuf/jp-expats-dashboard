import * as d3 from 'd3'
import { renderBarChartSlightlyOverlapped } from './bar-chart-slightly-overlapped'

const convertCountryNameJapaneseToEnglish = (d) => {
  const convertTable = {
    '中国': 'China',
    '韓国': 'South Korea',
    'フィリピン': 'Philippines',
    'ベトナム': 'Vietnam',
    'ブラジル': 'Brazil',
    'ネパール': 'Nepal',
    '米国': 'US',
    '台湾': 'Taiwan',
    'ペルー': 'Peru',
    'タイ': 'Thailand',
    'インドネシア': 'Indonesia',
    '朝鮮': 'Korea (朝鮮)',
    'インド': 'India',
    'ミャンマー': 'Myanmar',
    'スリランカ': 'Sri Lanka',
    '英国': 'UK',
    'パキスタン': 'Pakistan',
    'バングラデシュ': 'Bangladesh',
    'フランス': 'France',
    'オーストラリア': 'Australia',
    'カナダ': 'Canada',
    'マレーシア': 'Malaysia',
    'カンボジア': 'Cambodia',
    'ロシア': 'Russia',
    'モンゴル': 'Mongolia',
    'ドイツ': 'Germany',
    'ボリビア': 'Bolivia'
  }

  return convertTable[d] || d
}

export function renderBarChartNationalities (container, nationalities, nationalityRawData) {
  const nationalitiesData = nationalities.map((nationality) => {
    return {
      id: convertCountryNameJapaneseToEnglish(nationality),
      values: nationalityRawData.map((value) => {
        const lastYear = nationalityRawData.find(d => d.year === value.year - 1)
        return {
          year: d3.timeParse('%Y')(value.year),
          total: value.data[nationality] ? value.data[nationality] : 0,
          diff: value.data[nationality] && lastYear
            ? value.data[nationality] - lastYear.data[nationality] : 0
        }
      })
    }
  })

  renderBarChartSlightlyOverlapped(container, nationalitiesData, 5000)
}
