import { Dayjs } from 'dayjs';

export type ChangeState = 'positive' | 'negative' | 'zero';

export type TimeRange = {
  title: string;
  id: PossibleTimeRanges;
};

export type PossibleTimeRanges =
  | '1h'
  | '24h'
  | '7d'
  | '30d'
  | '60d'
  | '1y'
  | 'ytd'
  | 'all';

export type TimeState = {
  timeRange: PossibleTimeRanges | null;
  custom: {
    startTime: Dayjs;
    endTime: Dayjs;
  } | null;
};
