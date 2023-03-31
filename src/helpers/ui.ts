/*
 * Copyright (c) 2023 CryptoSlam, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  let { startTime, endTime } = timeRange
    ? getTimeRange(timeRange)
    : custom ?? getTimeRange(DEFAULT_TIME_RANGE);

  if (endTime.isAfter(dayjs.utc())) {
    // TODO: remove this override. It should be done on BE
    endTime = dayjs.utc();
  }

  return {
    startTime: startTime.utc(),
    endTime: endTime.utc(),
  };
};

export const getChangeState = (value: number): ChangeState =>
  value > 0 ? 'positive' : value === 0 ? 'zero' : 'negative';
