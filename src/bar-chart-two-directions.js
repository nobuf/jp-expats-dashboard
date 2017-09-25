import * as d3 from 'd3'

export function renderBarChartTwoDirections (container, items, yDomains, keyForLeftSide, keyForRightSide) {
  const containerWidth = 980
  const margin = {top: 20, right: 20, bottom: 30, left: containerWidth / 2, focusText: 50}
  // Since there are two bar chars side by side, width in this case is
  // about the half of the container's width.
  const width = containerWidth - margin.left - margin.right - margin.focusText
  const height = 600 - margin.top - margin.bottom

  const xRightValue = (d) => d[keyForRightSide] > 0 ? d[keyForRightSide] : 0
  const xRightMap = (d) => xScale(xRightValue(d))

  const xLeftValue = (d) => d[keyForLeftSide] > 0 ? d[keyForLeftSide] : 0
  const xLeftMap = (d) => xScale(xLeftValue(d))

  const xScale = d3.scaleLinear().range([0, width])
  const yScale = d3.scaleBand().range([height, 0]).padding(0.15)

  xScale.domain([0, Math.max(d3.max(items, xLeftValue), d3.max(items, xRightValue))])
  yScale.domain(yDomains)

  // const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)
  const yAxisWidth = () => svg.select('.y.axis').node().getBBox().width

  const yValue = (d) => d.name
  const yMap = (d) => yScale(yValue(d))

  const svg = container.append('svg')
    .attr('width', containerWidth)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + (margin.left + margin.focusText) + ',' + margin.top + ')')

  svg.append('g')
    .attr('class', 'bars')

  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)

  const focus = svg.append('g')
    .attr('class', 'focus')
    .style('display', 'none')
  focus.append('text')
    .attr('class', 'right')
    .style('font-size', '8px')
  focus.append('text')
    .attr('class', 'left')
    .style('font-size', '8px')

  svg.append('rect')
    .attr('class', 'overlay')
    .attr('x', -containerWidth / 2)
    .attr('width', containerWidth)
    .attr('height', height)
    .on('mouseover', () => focus.style('display', null))
    .on('mouseout', () => focus.style('display', 'none'))
    .on('mousemove', function () {
      const yPosition = d3.mouse(this)[1] + 5
      const index = Math.round(yPosition / yScale.step())
      const item = items.find((d) => +d.id === index) // this assumes id is a serial number
      if (item) {
        focus.select('.right')
          .attr('x', () => 5 + xRightMap(item))
          .attr('y', () => 8 + yMap(item))
          .text(d3.format(',')(item[keyForRightSide]))
        const left = focus.select('.left')
        left
          .attr('y', () => 8 + yMap(item))
          .text(d3.format(',')(item[keyForLeftSide]))
        const textWidth = left.node().getComputedTextLength()
        left.attr('x', () => -20 - yAxisWidth() - textWidth - xLeftMap(item))
      }
    })

  const selectionRight = svg.select('.bars').selectAll('.bar-right')
    .data(items)
  selectionRight.exit().remove()
  const selectionRightEnter = selectionRight
    .enter().append('rect')
    .attr('class', 'bar-right')
  selectionRight.merge(selectionRightEnter)
    .attr('x', 0)
    .attr('y', yMap)
    .attr('width', xRightMap)
    .attr('height', yScale.bandwidth())
    .style('fill', 'steelblue')

  const selectionLeft = svg.select('.bars').selectAll('.bar-left')
    .data(items)
  selectionLeft.exit().remove()

  const selectionLeftEnter = selectionLeft
    .enter().append('rect')
    .attr('class', 'bar-left')
  selectionLeft.merge(selectionLeftEnter)
    .attr('x', (d) => -15 - yAxisWidth() - xLeftMap(d))
    .attr('y', yMap)
    .attr('width', xLeftMap)
    .attr('height', yScale.bandwidth())
    .style('fill', 'orange')
}
