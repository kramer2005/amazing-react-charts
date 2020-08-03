import * as React from 'react'
import ReactCharts from 'echarts-for-react'
import {
    IDefaultChartProps,
    TDataTooltip,
    TEntryData,
    TEntryDataLine,
    TOptionsProps,
    TSaveAsImage,
    TSeries,
    TTitleProps,
    TTooltipProps,
    TZoomProps
} from './types'
import {
    formatTime,
    formatValueAxis,
    getDataView,
    getInitialValues,
    getSaveAsImage,
    timeConvert
} from './auxiliarFunctions'
import { formatToBRL } from 'brazilian-values'

interface IProps extends Omit<IDefaultChartProps, 'data'> {
    data: TEntryDataLine[]
    colors?: string[]
    showLabel?: boolean
    smooth?: boolean
    disableMarks?: boolean
    noTooltip?: boolean
    axisNames?: { x: string, y: string }
}

const takeYdata = (entryData: TEntryData[]) =>
    entryData.map(item => item.result)

const LineChart = (props: IProps) => {
    const {
        data,
        width,
        grid: gridProps,
        colors,
        xType,
        dateFormat,
        rotateLabel,
        fontLabelSize,
        yType,
        yComplement,
        title: titleProps,
        toolboxTooltip,
        showLabel,
        smooth,
        disableMarks,
        noTooltip,
        axisNames
    } = props

    const yAxis = axisNames && {
        type: 'value',
        name: axisNames.y,
        nameGap: 10,
        min: 0,
        max: 8,
        interval: 1
    }

    const xAxis = axisNames && {
        type: 'category',
        name: axisNames.x,
        min: 0,
        max: 8,
        interval: 2
    }

    const yData = data[0].values.map(item => item.result)
    const xData = data[0].values.map(item => item.label)
    const names = data.map(item => item.name)

    const series: TSeries[] = data.map(item => ({
        name: item.name,
        type: 'line',
        data: takeYdata(item.values),
        showSymbol: !disableMarks,
        lineStyle: {
            width: 1.5,
            type: item.name === 'ref' ? 'dashed' : undefined
        },
        smooth: smooth,
        label: {
            show: showLabel,
            position: 'top',
            fontSize: yType === 'time' ? 10 : 11.5,
            color: 'black',
            distance: 1.1
        }
    }))

    const arrayInitialSize = dateFormat === 'yyyy-MM' ? 12 : 30
    const tooltipLabelFormat = dateFormat === 'yyyy-MM' ? 'MMM/yy' : 'dd/MM/yyyy'

    const scrollable: TZoomProps[] = xData.length > arrayInitialSize
        ? [
            {
                type: 'inside',
                start: getInitialValues(xData.length, dateFormat),
                end: 100,
                zoomLock: true,
                zoomOnMouseWheel: 'shift'
            },
            {
                bottom: 0,
                show: true,
                type: 'slider',
                start: getInitialValues(xData.length, dateFormat),
                end: 100,
                labelFormatter: (
                    _: string,
                    item2: string
                ) => formatTime(item2, tooltipLabelFormat)
            }
        ]
        : []

    const formatLabel = (lines: TDataTooltip[]) => {
        const takeComplement = (value: number) => yComplement === 'money'
            ? formatToBRL(value)
            : yComplement ? formatValueAxis(value, yComplement) : value

        const linesTooltips = lines.map(line => (
            line.seriesName + ': ' + takeComplement(Number(line.value)) + '<br>'
        ))

        const tooltipTitle = xType === 'time'
            ? formatTime(
                dateFormat === 'yyyy-MM' ? lines[0].name + '-02' : lines[0].name,
                dateFormat === 'yyyy-MM' ? 'MMM/yy' : 'dd MMM'
            )
            : lines[0].name

        return `${tooltipTitle} <br> ${linesTooltips.join(' ')}`
    }

    const tooltip: TTooltipProps = !noTooltip && {
        formatter: formatLabel,
        trigger: 'axis',
        textStyle: { fontSize: 11.5 }
    }

    const toolbox = toolboxTooltip && (
        {
            showTitle: false,
            right: '9.52%',
            feature: {
                saveAsImage: toolboxTooltip.saveAsImage && (
                    getSaveAsImage(toolboxTooltip.saveAsImage) as TSaveAsImage
                ),
                dataView: toolboxTooltip.dataView && (
                    getDataView(toolboxTooltip.dataView)
                )
            },
            tooltip: {
                show: true,
                backgroundColor: 'grey',
                textStyle: {
                    fontSize: 12
                }
            }
        }
    )

    const title: TTitleProps = {
        id: 'chart-' + titleProps,
        left: '6.2%',
        show: titleProps !== undefined,
        text: titleProps,
        textAlign: 'left',
        textStyle: {
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontSize: 16,
            fontWeight: 400
        }
    }

    const options: TOptionsProps = {
        color: colors,
        series: series,
        xAxis: {
            ...xAxis,
            type: axisNames ? 'value' : 'category',
            data: xData,
            boundaryGap: false,
            showGrid: true,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dotted',
                    opacity: 0.8
                }
            },
            axisLabel: {
                formatter:
                    (item: string) => xType === 'time'
                        ? formatTime(
                            dateFormat === 'yyyy-MM' ? item + '-02' : item,
                            dateFormat === 'yyyy-MM' ? 'MMM/yy' : 'dd MMM'
                        )
                        : item,
                rotate: rotateLabel || 0,
                interval: 'auto',
                textStyle: {
                    fontSize: fontLabelSize || 11.5
                }
            }
        },
        yAxis: {
            ...yAxis,
            type: 'value',
            data: yData,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dotted',
                    opacity: 0.8
                }
            },
            axisLabel: {
                margin: yType === 'time' ? 16 : 14,
                formatter:
                    (item: number) => yType === 'time'
                        ? timeConvert(item) + 'h'
                        : item + (yComplement || ''),
                textStyle: {
                    fontSize: fontLabelSize || 11.5
                }
            }
        },
        grid: { ...gridProps || { bottom: 60 }, show: true },
        legend: {
            data: names,
            icon: 'line'
        },
        dataZoom: scrollable,
        title: title,
        toolbox,
        tooltip
    }

    return (
        <ReactCharts
            lazyUpdate
            notMerge
            style={{ width: '99.9%', height: 300 }}
            opts={{ width: width || 'auto' }}
            option={options}
        />
    )
}

export default LineChart
