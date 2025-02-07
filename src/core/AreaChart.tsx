import React from 'react'
import ReactEcharts from 'echarts-for-react'
import {
  fixedDomain,
  formatTime,
  formatTooltip,
  getDataView,
  getDomain,
  getInitialValues,
  getSaveAsImage,
  timeConvert,
  toDate,
  takeLabelComplement
} from '../lib/auxiliarFunctions'
import {
  IDefaultChartProps,
  TDataZoomChartProps,
  DataZoomEventProps,
  EntryData,
  ZoomProps
} from './types'

export const STYLES = { width: '99.9%', height: 300 }
export const TOOLBOX_DEFAULT_PROPS = {
  showTitle: false,
  right: '9.52%',
  tooltip: {
    show: true,
    backgroundColor: 'grey',
    textStyle: {
      fontSize: 12
    }
  }
}

const AreaChart = (props: IDefaultChartProps) => {
  const {
    data,
    xType,
    color,
    tooltip: tooltipProps,
    yType,
    lineMarkValue,
    lineMarkColor,
    lineMakeName,
    tooltipComplement,
    yComplement,
    dateFormat,
    grid: gridProps,
    width,
    rotateLabel,
    fontLabelSize,
    title: titleProps,
    toolboxTooltip,
    scrollStart,
  } = props

  const markLine = lineMarkValue && data.map(() => lineMarkValue)
  const yData = data.map((item: EntryData) => item.result)
  const xData =
    xType === 'time'
      ? data.map((item: EntryData) => toDate(item.label, dateFormat))
      : data.map((item: EntryData) => item.label)

  const formatLabel = (chartValues: { data: number }) => {
    const { data } = chartValues

    return yType === 'time'
      ? timeConvert(Number(data as number)) + 'h'
      : takeLabelComplement(Number(data), yComplement)
  }

  const dinamicData = (
    item: DataZoomEventProps,
    charts: TDataZoomChartProps
  ) => {
    const isTime = (yType === 'time' ? 3400 : 4500)
    const dataRange = item.end - item.start
    const dataLimit = scrollStart 
      ? (scrollStart * 100 + 400) / xData.length
      : isTime / xData.length
        
    if (dataRange < dataLimit) {
      return charts.setOption({
        series: [
          {
            label: {
              formatter: formatLabel,
              show: true,
              position: 'top',
              fontSize: yType === 'time' ? 10 : 11.5,
              color: 'black',
              distance: 1.1
            }
          }
        ]
      })
    } else {
      charts.setOption({ series: [{ label: { show: false } }] })
    }
  }

  const formatSingleTooltip = (
    chartValues: { axisValueLabel: string, data: number }[]
  ) => {
    const { label, result } = tooltipProps
    const { axisValueLabel, data } = chartValues[0]
    const complement = tooltipComplement ? tooltipComplement : ''

    const values = yType === 'time'
      ? timeConvert(Number(data as number)) + 'h'
      : takeLabelComplement(Number(data), yComplement)

    return (
      `${label}: ${formatTooltip(axisValueLabel, dateFormat)} <br>
      ${result}: ${values} <br> 
      ${complement}`
    )
  }

  const toolbox = toolboxTooltip && {
    ...TOOLBOX_DEFAULT_PROPS,
    feature: {
      saveAsImage: toolboxTooltip && toolboxTooltip.saveAsImage && 
        getSaveAsImage(toolboxTooltip.saveAsImage),
      dataView: toolboxTooltip.dataView && getDataView(toolboxTooltip.dataView)
    }
  }

  const arrayInitialSize = scrollStart || (dateFormat === 'yyyy-MM' ? 12 : 30)
  const tooltipLabelFormat = dateFormat === 'yyyy-MM' ? 'MMM/yy' : 'dd/MM/yyyy'

  const scrollable: ZoomProps[] =
    xData.length > arrayInitialSize
      ? [
        {
          type: 'inside' as const,
          start: getInitialValues(xData.length, dateFormat, scrollStart),
          end: 100,
          zoomLock: true,
          zoomOnMouseWheel: 'shift'
        },
        {
          bottom: 0,
          show: true,
          type: 'slider' as const,
          start: getInitialValues(xData.length, dateFormat, scrollStart),
          end: 100,
          labelFormatter: (_: string, item: string) =>
            formatTime(item, tooltipLabelFormat)
        }
      ]
      : []

  const options = {
    series: [
      {
        type: 'line' as const,
        data: yData,
        label: {
          formatter: typeof yComplement === 'function' 
            ? yComplement 
            : formatLabel,
          show: true,
          position: 'top',
          fontSize: yType === 'time' ? 10 : 11.5,
          color: 'black',
          distance: 1.1
        },
        lineStyle: {
          color: color || 'blue'
        },
        areaStyle: {
          color: color || 'blue',
          opacity: 0.2
        },
        itemStyle: {
          color: color
        }
      },
      {
        name: lineMakeName,
        symbolSize: 0,
        showSymbol: false,
        hoverAnimation: false,
        type: 'line' as const,
        data: markLine,
        lineStyle: {
          color: lineMarkColor
        }
      }
    ],
    xAxis: {
      type: 'category' as const,
      boundaryGap: false,
      showGrid: true,
      data: xData as string[],
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted' as const,
          opacity: 0.8
        }
      },
      axisLabel: {
        formatter: (item: string) =>
          xType === 'time'
            ? formatTime(item, dateFormat === 'yyyy-MM' ? 'MMM/yy' : 'dd MMM')
            : item,
        rotate: rotateLabel || 0,
        rich: {
          textStyle: {
            fontSize: fontLabelSize || 11.5
          }
        }
      }
    },
    yAxis: {
      max: lineMarkValue ? fixedDomain : getDomain,
      type: 'value' as const,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted' as const,
          opacity: 0.8
        }
      },
      axisLabel: {
        margin: yType === 'time' ? 16 : 14,
        formatter: (item: number) =>
          yType === 'time'
            ? timeConvert(item) + 'h'
            : takeLabelComplement(item, yComplement),
        textStyle: {
          fontSize: fontLabelSize || 11.5
        }
      }
    },
    color: [lineMarkColor],
    grid: { ...(gridProps || { bottom: 60 }), show: true },
    legend: {
      x: 'center',
      y: 'bottom',
      icon: 'line',
      top: 30,
      data: [lineMakeName],
      itemGap: 30
    },
    title: {
      left: '6.2%',
      show: titleProps !== undefined,
      text: titleProps,
      textAlign: 'left',
      textStyle: {
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontSize: 16,
        fontWeight: '400' as const
      }
    },
    tooltip: tooltipProps && {
      formatter: formatSingleTooltip,
      trigger: 'axis' as const,
      textStyle: { fontSize: 11.5 }
    },
    dataZoom: scrollable,
    toolbox
  }

  const widthOpts = { width: width || 'auto' }
  const zoomEvent = { dataZoom: dinamicData }

  return (
    <ReactEcharts
      lazyUpdate
      notMerge
      style={STYLES}
      opts={widthOpts}
      onEvents={zoomEvent}
      option={options}
    />
  )
}

export default AreaChart
