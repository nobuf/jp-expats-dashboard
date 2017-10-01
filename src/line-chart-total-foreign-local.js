import * as d3 from 'd3'

export function renderTotalForeignAndLocalPopulationTransitions (containerForForeign, containerForLocal, dataForForeign, dataForLocal, valueKey = 'total') {
  const foreignPopulation = {
    id: 'Foreign',
    values: dataForForeign.map((value) => {
      return {
        year: d3.timeParse('%Y')(value.year),
        total: value.data[0].total
      }
    })
  }
  const localPopulation = {
    id: 'Local',
    values: dataForLocal.map((value) => {
      return {
        year: d3.timeParse('%Y')(value.year),
        total: value.data[0].total
      }
    })
  }

  const renderLineChart = (container, items) => {
    const margin = {top: 20, right: 100, bottom: 40, left: 100}
    const width = 600 - margin.left - margin.right
    const height = 200 - margin.top - margin.bottom
    const svg = container.append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    const x = d3.scaleTime().range([0, width])
    const y = d3.scaleLinear().range([height, 0])
    const z = d3.scaleOrdinal()
      .domain(['Foreign', 'Local'])
      .range(['steelblue', 'orange'])
      .unknown(['#ddd'])

    const line = d3.line()
      .x((d) => x(d.year))
      .y((d) => y(d[valueKey]))

    x.domain(d3.extent(items.values, (d) => d.year))
    y.domain([0, d3.max(items.values, (d) => d[valueKey])])

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickValues(x.domain()))

    const item = svg.selectAll('.item')
      .data([items])
      .enter().append('g')
      .attr('class', (d) => 'item item-' + d.id)

    const format = d3.format(',')

    item.append('text')
      .attr('x', d => x(d.values[d.values.length - 1].year))
      .attr('y', d => y(d.values[d.values.length - 1].total) - 10)
      .style('font-size', '9px')
      .style('text-anchor', 'middle')
      .text(d => format(d.values[d.values.length - 1].total))
    item.append('text')
      .attr('x', d => x(d.values[0].year))
      .attr('y', d => y(d.values[0].total) - 10)
      .style('font-size', '9px')
      .style('text-anchor', 'middle')
      .text(d => format(d.values[0].total))
    item.append('path')
      .attr('class', 'line')
      .attr('d', (d) => line(d.values))
      .style('stroke', (d) => z(d.id))
      .style('stroke-width', '1px')
  }

  renderLineChart(containerForLocal, localPopulation)
  renderLineChart(containerForForeign, foreignPopulation)
}
