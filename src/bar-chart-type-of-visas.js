import * as d3 from 'd3'
import { renderBarChartSlightlyOverlapped } from './bar-chart-slightly-overlapped'

export function renderBarChartTypeOfVisas (container, visaTypesRawData) {
  // const visaTypes = Array.from(
  //   new Set(
  //     [f2014, f2015, f2016, f2017]
  //       .map(f => f.columns.slice(2)) // skip `prefecture_id` and `総数`
  //       .reduce((a, b) => a.concat(b), [])
  //   )
  // )
  // http://www.immi-moj.go.jp/tetuduki/kanri/qaq5.html
  // http://www.immi-moj.go.jp/english/tetuduki/kanri/qaq5.html
  const visaTypes = {
    'Professor': ['教授'],
    'Artist': ['芸術'],
    'Religious Activities': ['宗教'],
    'Journalist': ['報道'],
    'Highly Skilled Professional': ['高度専門職１号イ', '高度専門職１号ロ', '高度専門職１号ハ', '高度専門職２号'],
    'Business Manager': ['経営・管理'],
    'Legal/Accounting Services': ['法律・会計業務'],
    'Medical Services': ['医療'],
    'Researcher': ['研究'],
    'Instructor': ['教育'],
    'Engineer/Specialist in Humanities/International Services': ['技術・人文知識・国際業務'],
    'Intra-company Transferee': ['企業内転勤'],
    'Entertainer': ['興行'],
    'Skilled Labor': ['技能'],
    'Technical Intern Training': ['特定技能１号', '特定技能２号', '技能実習１号イ', '技能実習１号ロ', '技能実習２号イ', '技能実習２号ロ', '技能実習３号イ', '技能実習３号ロ'],
    'Cultural Activities': ['文化活動'],
    'Student': ['留学'],
    'Trainee': ['研修'],
    'Dependent': ['家族滞在'],
    'Designated Activities': ['特定活動'],
    'Permanent Resident': ['永住者'],
    'Spouse or Child of Japanese National': ['日本人の配偶者等'],
    'Spouse or Child of Permanent Resident': ['永住者の配偶者等'],
    'Long Term Resident': ['定住者'],
    'Special Permanent Resident': ['特別永住者']
  }

  const sumOfGroup = (data, keys) => {
    let sum = 0
    for (let key of keys) {
      sum += data[key] ? data[key] : 0
    }
    return sum
  }

  const visaTypesData = Object.keys(visaTypes).map((id) => {
    const visas = visaTypes[id]
    return {
      id: id,
      values: visaTypesRawData.map((value) => {
        const lastYear = visaTypesRawData.find(d => d.year === value.year - 1)
        return {
          year: d3.timeParse('%Y')(value.year),
          total: sumOfGroup(value.data, visas) ? sumOfGroup(value.data, visas) : 0,
          diff: sumOfGroup(value.data, visas) && lastYear
            ? sumOfGroup(value.data, visas) - sumOfGroup(lastYear.data, visas) : 0
        }
      })
    }
  })

  renderBarChartSlightlyOverlapped(container, visaTypesData)
}
