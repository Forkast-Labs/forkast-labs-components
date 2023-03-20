import {
  BarPrice,
  BarPrices,
  DeepPartial,
  LineData,
  PriceFormat,
} from 'lightweight-charts';
import dayjs from '../../../../utils/dayjs';

export enum PriceScaleIds {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum ChartColors {
  BLACK = '#434343',
  ORANGE = '#F19B10',
  BLUE = '#7cb5ec',
}

export type SeriesData = {
  lineData: LineData[];
  trend?: Trend;
  label?: string;
  priceScaleId?: PriceScaleIds;
  color?: ChartColors;
  priceFormat?: DeepPartial<PriceFormat>;
};

export type Trend = 'positive' | 'negative';

export type TooltipCoordinates = {
  x: number;
  y: number;
};

export type PointValue = BarPrice | BarPrices | number | undefined;

export type TooltipData = {
  values: PointValue[];
  date: dayjs.Dayjs;
};

export type TooltipInfo = { coordinates: TooltipCoordinates } & TooltipData;
