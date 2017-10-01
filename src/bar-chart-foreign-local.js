import { renderBarChartTwoDirections } from './bar-chart-two-directions'

export function renderBarChartForeignAndLocal (containerForTotal, containerForChange, prefectureIds, dataForForeign, dataForLocal, targetYear) {
  const foreignTargetYear = dataForForeign.find(d => d.year === targetYear).data
  const localTargetYear = dataForLocal.find(d => d.year === targetYear).data
  const prefectures = prefectureIds.map((prefecture) => {
    const foreignTargetPrefecture = foreignTargetYear.find((d) => d.id === prefecture.id)
    const localTargetPrefecture = localTargetYear.find((d) => d.id === prefecture.id)
    return {
      id: prefecture.id,
      name: prefecture.name,
      foreignTotal: foreignTargetPrefecture.total,
      localTotal: localTargetPrefecture.total,
      foreignChange: foreignTargetPrefecture.change,
      localChange: localTargetPrefecture.change,
      ratio: foreignTargetPrefecture.total / (foreignTargetPrefecture.total + localTargetPrefecture.total) * 100
    }
  })
  const prefectureNames = prefectureIds.sort((a, b) => +a.id > +b.id ? -1 : 1).map((prefecture) => prefecture.name)

  renderBarChartTwoDirections(containerForTotal, prefectures, prefectureNames, 'localTotal', 'foreignTotal')
  renderBarChartTwoDirections(containerForChange, prefectures, prefectureNames, 'localChange', 'foreignChange')
}
