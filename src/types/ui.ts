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
