import './style.scss';
import * as d3 from 'd3'
import { renderTotalForeignAndLocalPopulationTransitions } from './line-chart-total-foreign-local'
import { renderBarChartForeignAndLocal } from './bar-chart-foreign-local'
import { renderBarChartTypeOfVisas } from './bar-chart-type-of-visas'
import { renderBarChartNationalities } from './bar-chart-nationalities'
import { parseNationalityCSV, parseVisaTypeCSV, parsePopulationCSV, parsePrefectureIdCSV } from './csv-parser'

d3.queue()
  .defer(d3.csv, 'assets/prefectures.csv', parsePrefectureIdCSV)
  .defer(d3.csv, 'assets/population-local-2013.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-local-2014.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-local-2015.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-local-2016.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-local-2017.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-local-2018.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-local-2019.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-local-2020.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-foreign-2013.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-foreign-2014.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-foreign-2015.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-foreign-2016.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-foreign-2017.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-foreign-2018.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-foreign-2019.csv', parsePopulationCSV)
  .defer(d3.csv, 'assets/population-foreign-2020.csv', parsePopulationCSV)
  .await((error, prefectureIds,
          l2013, l2014, l2015, l2016, l2017, l2018, l2019, l2020,
          f2013, f2014, f2015, f2016, f2017, f2018, f2019, f2020,
          ) => {
    if (error) throw error

    const foreign = [
      {year: 2013, data: f2013},
      {year: 2014, data: f2014},
      {year: 2015, data: f2015},
      {year: 2016, data: f2016},
      {year: 2017, data: f2017},
      {year: 2018, data: f2018},
      {year: 2019, data: f2019},
      {year: 2020, data: f2020},
    ]
    const local = [
      {year: 2013, data: l2013},
      {year: 2014, data: l2014},
      {year: 2015, data: l2015},
      {year: 2016, data: l2016},
      {year: 2017, data: l2017},
      {year: 2018, data: l2018},
      {year: 2019, data: l2019},
      {year: 2020, data: l2020},
    ]

    renderTotalForeignAndLocalPopulationTransitions(d3.select('#line-chart-total-foreign'), d3.select('#line-chart-total-local'), foreign, local)
    renderBarChartForeignAndLocal(d3.select('#bar-chart-foreign-and-local'), d3.select('#bar-chart-foreign-and-local-change'), prefectureIds, foreign, local, 2019)
  })

d3.queue()
  .defer(d3.csv, 'assets/visa-201906.csv', parseVisaTypeCSV)
  .defer(d3.csv, 'assets/visa-202006.csv', parseVisaTypeCSV)
  .await((error, previousYear, currentYear) => {
    if (error) throw error

    const visaTypes = [
      {year: 2019, data: previousYear[0]}, // [0] contains prefecture_id=null which is national total
      {year: 2020, data: currentYear[0]}
    ]

    renderBarChartTypeOfVisas(d3.select('#bar-chart-type-of-visas'), visaTypes)
  })

d3.queue()
  .defer(d3.csv, 'assets/nationality-201906.csv', parseNationalityCSV)
  .defer(d3.csv, 'assets/nationality-202006.csv', parseNationalityCSV)
  .await((error, previousYear, currentYear) => {
    if (error) throw error

    // The spreadsheet contains larger units like Asia, South America.
    const regions = ['アジア', '南米', 'ヨーロッパ', '北米', 'アフリカ', 'オセアニア']
    // We might want to prepare the list of countries/areas
    const nationalities = Array.from(
      new Set(
        [previousYear, currentYear]
          .map(f => f.columns.slice(2)) // skip `都道府県` and `総数`
          .reduce((a, b) => a.concat(b), [])
      )
    ).filter(d => !regions.includes(d))

    const nationalityDataRaw = [
      {year: 2019, data: previousYear[0]}, // [0] contains prefecture_id=null which is national total
      {year: 2020, data: currentYear[0]}
    ]

    renderBarChartNationalities(d3.select('#bar-chart-nationalities'), nationalities, nationalityDataRaw)
  })
