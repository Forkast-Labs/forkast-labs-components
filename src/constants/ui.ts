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
    all: () => dayjs.utc('2022-01-01'),
  };
