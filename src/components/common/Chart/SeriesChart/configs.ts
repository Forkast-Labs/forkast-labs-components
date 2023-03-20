import {
  AreaSeriesPartialOptions,
  BusinessDay,
  ChartOptions,
  ColorType,
  DeepPartial,
  isBusinessDay,
  LineSeriesPartialOptions,
  PriceFormat,
  SeriesType,
  TickMarkType,
  UTCTimestamp,
} from 'lightweight-charts';
import dayjs from 'utils/dayjs';
import { businessDayToString } from 'helpers/lightweight-chart';
import { ChartColors, PriceScaleIds, Trend } from './types';

export type ChartProps = {
  isRightPriceScaleEnabled?: boolean;
  isVisibleLeftPriceScale?: boolean;
  isVisibleGrid?: boolean;
  backgrouldColor?: string;
  textColor?: string;
  watermarkColor?: string;
  hasWatermark?: boolean;
  fontSize?: number;
};

export const getChartBaseOptions = ({
  isRightPriceScaleEnabled = false,
  isVisibleGrid = true,
  isVisibleLeftPriceScale = true,
  backgrouldColor,
  textColor,
  watermarkColor,
  hasWatermark = false,
  fontSize = 12,
}: ChartProps): DeepPartial<ChartOptions> => ({
  grid: {
    vertLines: {
      style: 2,
      visible: isVisibleGrid,
    },
    horzLines: {
      style: 2,
      visible: isVisibleGrid,
    },
  },
  watermark: {
    visible: hasWatermark,
    fontSize: 32,
    horzAlign: 'center',
    vertAlign: 'center',
    color: watermarkColor,
    text: 'forkastlabs',
  },
  layout: {
    fontFamily: 'Open Sans',
    textColor: textColor ?? '#4F4F4F',
    fontSize,
    ...(backgrouldColor
      ? {
          background: {
            type: ColorType.Solid,
            color: backgrouldColor,
          },
        }
      : {}),
  },
  leftPriceScale: {
    visible: isVisibleLeftPriceScale,
    borderVisible: false,
    drawTicks: false,
  },
  crosshair: {
    vertLine: {
      visible: false,
      labelVisible: false,
    },
    horzLine: {
      visible: false,
      labelVisible: false,
    },
  },
  rightPriceScale: {
    visible: isRightPriceScaleEnabled,
    borderVisible: false,
    drawTicks: false,
  },
  timeScale: {
    timeVisible: true,
    fixLeftEdge: true,
    fixRightEdge: true,
    borderVisible: false,
    tickMarkFormatter: (
      time: UTCTimestamp | BusinessDay,
      tick: TickMarkType
    ) => {
      const date = isBusinessDay(time)
        ? businessDayToString(time)
        : dayjs(time * 1000).utc();

      switch (tick) {
        case 0:
          return date.format('YYYY');
        case 1:
          return date.format('MMM');
        case 2:
          return date.format('MM/DD');
        case 3:
          return date.format('HH:mm');
        case 4:
          return date.format('HH:mm:ss');
      }
    },
  },
});

type BaseSeriesOptions = {
  priceFormat?: DeepPartial<PriceFormat>;
  color?: ChartColors;
  priceScaleId?: PriceScaleIds;
  trend?: Trend;
};

const getLineSeriesBaseConfig = ({
  priceFormat,
  color = ChartColors.BLUE,
  priceScaleId = PriceScaleIds.LEFT,
}: {
  priceFormat?: DeepPartial<PriceFormat>;
  color?: ChartColors;
  priceScaleId?: PriceScaleIds;
}): LineSeriesPartialOptions => ({
  baseLineVisible: false,
  priceLineColor: '#4F4F4F',
  lastValueVisible: false,
  priceLineVisible: false,
  crosshairMarkerRadius: 6,
  priceScaleId,
  color,
  priceFormat,
});

const getAreaSeriesBaseConfig = ({
  priceFormat,
  priceScaleId = PriceScaleIds.LEFT,
  trend,
}: BaseSeriesOptions): AreaSeriesPartialOptions => ({
  baseLineVisible: false,
  priceLineColor: '#4F4F4F',
  lastValueVisible: false,
  priceLineVisible: false,
  crosshairMarkerRadius: 6,
  priceScaleId,
  priceFormat,
  lineWidth: 1,
  ...(trend === 'negative'
    ? {
        topColor: 'rgb(235 51 51 / 40%)',
        bottomColor: 'rgb(235 125 125 / 0%)',
        lineColor: '#FD2F2F',
      }
    : {}),
});

export const SERIES_BASE_CONFIG: Record<
  SeriesType,
  (options: BaseSeriesOptions) => Record<string, any>
> = {
  Area: getAreaSeriesBaseConfig,
  Bar: () => ({}), // TODO: not implemented yet
  Baseline: () => ({}), // TODO: not implemented yet
  Candlestick: () => ({}), // TODO: not implemented yet
  Histogram: () => ({}), // TODO: not implemented yet
  Line: getLineSeriesBaseConfig,
};

export const TITLE_WIDTH = 18;
export const TOOLTIP_WIDTH = 240;
export const TOOLTIP_HEIGHT = 52;
export const TOOLTIP_MARGIN = 15;
