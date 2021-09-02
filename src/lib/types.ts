import { CSSProperties } from 'react'
import { EChartOption } from 'echarts'

export interface IDefaultChartProps {
  data: TEntryData[]
  lineMarkValue?: number
  lineMarkColor?: string
  lineMakeName?: string
  yComplement?: string | 'money'
  tooltipComplement?: string
  tooltip?: TTooltipEntryProps
  color?: string
  forecastColor?: string
  xType?: 'time' | 'category'
  yType?: 'time' | 'value'
  barWidth?: number
  dateFormat?: string
  grid?: TGridProps
  width?: TWidthProps
  rotateLabel?: number
  fontLabelSize?: number
  showBarLabel?: boolean
  title?: string
  toolboxTooltip?: TToolboxEntryProps
  isMoreThanHundredPercent?: boolean
  labelWordSize?: number
  marginLeftTitle?: string
  marginRightToolbox?: string
  titleFontSize?: number
  scrollStart?: number
  formatterMoney?(value: string | number): string
  onClickBar?(
    itemProps?: Record<string, unknown>,
    itemFunctions?: Record<string, unknown>
  ): void
}

export type TToolboxEntryProps = {
  saveAsImage?: string
  dataView?: string
  saveAsImageWithTitle?: string
}

export type TCoordinates = {
  x: number
  y: number
}

export type TTuple = [number, number]

export type TWidthProps = number | null | undefined | 'auto'

export type TTooltipEntryProps = {
  label: string
  result?: string
  topResult?: string
  bottomResult?: string
  extraResult?: string
  lineResult?: string
  auxResult?: string
  complement?: string
  labelComplement?: string | number
  resultComplement?: string | number
}

export type TEntryDataLine = {
  name?: string
  values: TEntryData[]
}

export type TEntryData = {
  label: string
  result: number
  itemId?: string
  style?: TLabelProps
}

export type TEntryWithStyleData = {
  value: number
  label?: TLabelProps
}

export type TPictorialEntryData = {
  value: number
  symbol: string
}

export type TEntryDataNTuples =
  | [TEntryData[], TEntryData[]]
  | [TEntryData[], TEntryData[], TEntryData[]]
  | [TEntryData[], TEntryData[], TEntryData[], TEntryData[]]
  | [TEntryData[], TEntryData[], TEntryData[], TEntryData[], TEntryData[]]

export type TSeries = {
  stillShowZeroSum?: boolean
  name?: string
  xAxisIndex?: number
  yAxisIndex?: number
  label?: TLabelProps
  labelLine?: { show?: boolean, length?: number, length2?: number }
  areaStyle?: React.CSSProperties
  lineStyle?: React.CSSProperties & { type?: TLineStyleType }
  barGap?: string
  barCategoryGap?: string
  animation?: boolean
  itemStyle?: TLabelProps
  markLine?: TMarkLineProps
  markPoint?: TMarkPointProps
  barWidth?: number | string
  emphasis?: TNormalProps
  stack?: string
  silent?: boolean
  showAllSymbol?: boolean | 'auto'
  symbolSize?: number
  showSymbol?: boolean
  hoverAnimation?: boolean
  barMaxWidth?: number | string
  type?: 'line' | 'bar' | 'pie' | 'pictorialBar' | 'scatter'
  symbolClip?: boolean
  symbolBoundingData?: boolean | number
  animationDuration?: number
  radius?: string | [string, string]
  center?: [number, string] | [string, string] | string | number
  smooth?: boolean
  data?:
  | number[]
  | string[]
  | Date[]
  | TPieChartData[]
  | TEntryWithStyleData[]
  | TPictorialEntryData[]
  | TCostumizedSymbolData[]
  | TTuple[]
}

export type TCostumizedSymbolData = {
  value?: string | number
  symbol?: string
  symbolSize?: number
}

export type TDomainValues = {
  min: number
  max: number
}

export type TPieDataLabel = {
  data: TPieChartData
}

type TFormatterReturn = string[] | string | number

type TFormatterEntry =
  | string
  | number
  | TDomainValues
  | TDataTooltip
  | TDataTooltip[]
  | TPieDataLabel

export type TFormatterType =
  | string
  | ((item: TFormatterEntry | TAudiometryDataTooltip[]) => TFormatterReturn)

export type TFormatterSliderType =
  | string
  | ((yValue: string, xValue: string) => TFormatterReturn)

export type TPositionType =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'insideRight'
  | 'insideLeft'
  | 'insideTop'
  | 'insideBottom'
  | 'inside'
  | 'outside'
  | 'center'
  | [number, number]

export type TChartType = 'time' | 'category' | 'value' | 'log'

export type TLineStyleType = 'solid' | 'dashed' | 'dotted'

export type TLabelProps = {
  normal?: TNormalProps
  opacity?: number
  color?: string
  formatter?: TFormatterType | undefined | string | number
  show?: boolean
  position?: TPositionType
  fontSize?: number
  fontWeight?: number
  distance?: number
  borderColor?: string
  barBorderRadius?: number
  itemStyle?: TLabelProps
  margin?: string
  distanceToLabelLine?: number
  fontFamily?: string
}

export type TDataMarkLine = {
  name?: string
  xAxis?: string
  yAxis?: string | number
  type?: string
}

export type TMarkLineProps = {
  silent?: boolean
  symbol?: string
  label?: TLabelProps
  animation?: boolean
  data: TDataMarkLine[]
  lineStyle: TLineStyle
}

export type TMarkPointProps = {
  symbolSize?: number
  hoverAnimation?: boolean
  data: TDataMarkLine[]
}

export type TLineStyle = {
  width?: number
  type?: string
  color?: string
  emphasis?: {
    lineStyle?: TLineStyle
  }
}

export type TNormalProps = {
  formatter?: TFormatterType
  show?: boolean
  position?: TPositionType
  fontSize?: number
  fontWeight?: number
  color?: string
  distance?: number
  borderColor?: string
  barBorderRadius?: number
  opacity?: number
  itemStyle?: TLabelProps
}

export type TGridProps = {
  show?: boolean
  right?: string | number
  left?: string | number
  top?: string | number
  bottom?: string | number
  height?: string | number
  containLabel?: boolean
}

export type TAxisLabelProps = {
  type?: TChartType
  formatter?: TFormatterType
  textStyle?: React.CSSProperties
  interval?: number | string | 'auto'
  rotate?: number
  show?: boolean
  inside?: boolean
  color?: string | string[]
  margin?: number
  align?: 'left' | 'right' | 'center'
}

type TSplitLineProps = {
  show?: boolean
  onZeroAxisIndex?: string
  alignWithLabel?: boolean
  lineStyle?: {
    color?: string | string[]
    width?: number
    opacity?: number
    type?: TLineStyleType
  }
}

export type TPieChartData = {
  name: string
  value: number
  marker?: string
}

export type TAxisProps = {
  name?: string
  nameGap?: number
  type?: TChartType
  nameTextStyle?: { padding?: number[], verticalAlign?: string }
  boundaryGap?: boolean
  data?:
  | number[]
  | string[]
  | Date[]
  | TPieChartData[]
  | TEntryWithStyleData[]
  | { name: string }[]
  gridIndex?: number
  showGrid?: boolean
  splitLine?: TSplitLineProps
  axisLabel?: TAxisLabelProps
  axisTick?: TAxisTickProps
  min?: number
  max?: number | string | TFormatterType
  position?: TPositionType
  axisLine?: TSplitLineProps
  interval?: number | string[]
  inverse?: boolean
}

export type TAxisLineProps = {
  show?: boolean
}

export type TAxisTickProps = {
  show?: boolean
  alignWithLabel?: boolean
  interval?: number
}

export type TOptionsProps = EChartOption

export type TZoomProps = {
  bottom?: number
  show?: boolean
  zoomLock?: boolean
  start?: number
  labelFormatter?: TFormatterSliderType
  type: 'inside' | 'slider'
  end?: number
  zoomOnMouseWheel?: 'ctrl' | 'shift' | boolean
  startValue?: number
  endValue?: number | Date | string
}

export type TLegendProps = {
  x?: 'center' | 'bottom'
  y?: 'center' | 'bottom'
  icon?: 'line' | 'rect' | 'shape'
  top?: number
  data: string[] | TSimpleLegend[]
  itemGap?: number
  selectedMode?: boolean
  color?: string[]
  type?: 'scroll' | 'plain'
  orient?: 'vertical' | 'horizontal'
  left?: number | string
}

export type TTooltipProps = {
  formatter: TFormatterType
  trigger?: 'axis' | 'item'
  textStyle?: React.CSSProperties
  axisPointer?: TAxisPointerProps
}

export type TAxisPointerProps = {
  type?: 'cross' | 'none' | 'shadow'
  label?: CSSProperties
  shadowStyle?: CSSProperties
}

export type TDataTooltip = {
  name?: string
  marker?: string
  seriesName?: string
  data?: number | string
  seriesType?: string
  value?: string | number
  axisValueLabel?: string
  axisValue?: string
  dataIndex?: number
  seriesIndex?: number
}

export type TParamsTooltip = {
  name: string
  value: number
  data?: number | string
  dataIndex?: number
}

export type TAudiometryDataTooltip = {
  data?: { value: number | string, boneValue: number | string }
  seriesName?: string
  axisValue?: string
  marker?: string
}

export type TTitleProps = {
  id?: string
  text?: string
  show?: boolean
  textAlign?: 'left' | 'right' | 'auto'
  textStyle?: CSSProperties
  left?: number | string
  top?: number | string
}

export type TDataView = {
  buttonColor?: string
  lang?: string[]
  title?: string
  icon?: string
  iconStyle?: CSSProperties
}

export type TDataZoomEventProps = {
  start: number
  end: number
}

export type TDataZoomChartProps = {
  setOption(option: TOptionsProps): void
}

export type TForecastAreaChartData = {
  current: TEntryData[]
  forecast: TEntryData[]
}

export type TAudiometryDataEntry = {
  result?: number
  symbol?: string
  boneResult?: number
  boneSymbol?: string
}

export type TSimpleLegend = { name: string, icon?: string }