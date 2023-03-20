import { DEFAULT_TIME_RANGE, TIME_RANGE_OFFSET } from '../constants/ui';
import { PossibleTimeRanges, ChangeState, TimeState } from '../types/ui';
import dayjs from '../utils/dayjs';

const getTimeRange = (timeRange: PossibleTimeRanges) => {
  const startTime = TIME_RANGE_OFFSET[timeRange]();
  const endTime = dayjs.utc();

  return {
    startTime,
    endTime,
  };
};

export const getApiTime = (timeState: TimeState) => {
  const { timeRange, custom } = timeState;
  const { startTime, endTime } = timeRange
    ? getTimeRange(timeRange)
    : custom ?? getTimeRange(DEFAULT_TIME_RANGE);

  return {
    startTime: startTime.utc(),
    endTime: endTime.utc(),
  };
};

export const getChangeState = (value: number): ChangeState =>
  value > 0 ? 'positive' : value === 0 ? 'zero' : 'negative';
