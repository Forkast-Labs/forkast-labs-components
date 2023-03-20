import { PossibleTimeRanges, TimeRange, TimeState } from '../types/ui';
import dayjs from '../utils/dayjs';

export const TIME_RANGE: TimeRange[] = [
  { id: '24h', title: '1D' },
  { id: '7d', title: '7D' },
  { id: '30d', title: '30D' },
  { id: '60d', title: '60D' },
  { id: 'ytd', title: 'YTD' },
  { id: 'all', title: 'MAX' },
];

export const DEFAULT_TIME_RANGE: PossibleTimeRanges = '24h';

export const DEFAULT_TIME_STATE: TimeState = {
  timeRange: DEFAULT_TIME_RANGE,
  custom: null,
};

export const TIME_WITH_REFETCH: (PossibleTimeRanges | string)[] = ['1h', '24h'];

export const TIME_RANGE_OFFSET: Record<PossibleTimeRanges, () => dayjs.Dayjs> =
  {
    '1h': () => dayjs.utc().add(-1, 'h'),
    '24h': () => dayjs.utc().add(-24, 'h'),
    '7d': () => dayjs.utc().add(-7, 'd'),
    '30d': () => dayjs.utc().add(-30, 'd'),
    '60d': () => dayjs.utc().add(-60, 'd'),
    '1y': () => dayjs.utc().add(-1, 'y'),
    ytd: () => dayjs.utc(`${dayjs().year()}-01-01`),
    all: () => dayjs.utc('1980-1-4'),
  };
