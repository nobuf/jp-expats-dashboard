import * as d3 from 'd3'

export function renderBarChartSlightlyOverlapped (container, data, threshold = 0) {
  const xValueLatest = (d) => d.values[d.values.length - 1].total
  const xValueDiffLatest = (d) => d.values[d.values.length - 1].diff

  const sortedData = data.sort((a, b) => xValueLatest(a) < xValueLatest(b)
    ? -1 : xValueLatest(a) > xValueLatest(b) ? 1 : 0)
    .filter(d => xValueLatest(d) > threshold)

  const bandHeight = 20

  const margin = {top: 20, right: 70, bottom: 20, left: 50, xAxis: 220}
  const width = 600 - margin.left - margin.right - margin.xAxis
  const height = bandHeight * sortedData.length - margin.top - margin.bottom

  const xScale = d3.scaleLinear().range([0, width])
  const yScale = d3.scaleBand().range([height, 0]).padding(0.15)

  // const xAxis = d3.axisBottom(xScale).ticks(d3.timeYear.every(1))
  const yAxis = d3.axisLeft(yScale)

  const xMapLatest = (d) => xScale(xValueLatest(d))
  const xMapDiffLatest = (d) => xScale(xValueDiffLatest(d))
  const yMap = (d) => yScale(d.id)

  // xScale.domain([0, d3.max(sortedData, xValueLatest)])
  xScale.domain([0, 800000]) // TODO global max value
  yScale.domain(sortedData.map(d => d.id))

  const svg = container.append('svg')
    .attr('width', width + margin.left + margin.right + margin.xAxis)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  svg.append('g')
    .attr('class', 'bars')

  svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + margin.xAxis + ',0)')
    .call(yAxis)

  const focus = svg.append('g')
    .attr('class', 'focus')
    .style('display', 'none')
  focus.append('text')
    .attr('class', 'visa-number')
    .style('font-size', '8px')

  svg.append('rect')
    .attr('class', 'overlay')
    .attr('width', width + margin.left + margin.right + margin.xAxis)
    .attr('height', height + margin.top + margin.bottom)
    .on('mouseover', () => focus.style('display', null))
    .on('mouseout', () => focus.style('display', 'none'))
    .on('mousemove', function () {
      const yPosition = d3.mouse(this)[1] + 5
      const index = Math.round(yPosition / yScale.step())
      const item = sortedData[sortedData.length - index]
      if (item) {
        const diffFromLastYear = d3.format('+,')(xValueDiffLatest(item))
        focus.select('.visa-number')
          .attr('x', () => 8 + margin.xAxis + xMapLatest(item))
          .attr('y', () => 11 + yMap(item))
          .text(d3.format(',')(xValueLatest(item)) + ` (${diffFromLastYear})`)
      }
    })

  const selectionTotal = container.select('svg').select('.bars').selectAll('.bar')
    .data(sortedData)
  selectionTotal.exit().remove()
  const selectionEnter = selectionTotal
    .enter().append('rect')
    .attr('class', 'bar')
  selectionTotal.merge(selectionEnter)
    .attr('x', d => margin.xAxis)
    .attr('y', yMap)
    .attr('width', xMapLatest)
    .attr('height', yScale.bandwidth())
    .style('fill', 'teal')

  const selectionDiff = container.select('svg').select('.bars').selectAll('.bar-diff')
    .data(sortedData)
  selectionDiff.exit().remove()

  const selectionDiffEnter = selectionDiff
    .enter().append('rect')
    .attr('class', 'bar-diff')
  selectionDiff.merge(selectionDiffEnter)
    .attr('x', d => xMapDiffLatest(d) < 0 ? margin.xAxis + xMapDiffLatest(d) : margin.xAxis)
    .attr('y', yMap)
    .attr('width', d => Math.abs(xMapDiffLatest(d)))
    .attr('height', yScale.bandwidth())
    .style('fill', 'tan')
}
