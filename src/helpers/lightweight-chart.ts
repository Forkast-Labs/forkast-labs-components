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

import {
  isBusinessDay,
  BusinessDay,
  Time,
  UTCTimestamp,
} from 'lightweight-charts';
import dayjs from '../utils/dayjs';

export const businessDayToString = ({ year, month, day }: BusinessDay) =>
  dayjs(new Date(year, month - 1, day));

export const buildDateFromTime = (time: Time) =>
  isBusinessDay(time) ? businessDayToString(time) : dayjs(time);

export const getPreviousYear = (time: Time) => {
  const date = buildDateFromTime(time);

  return dayjs(date).set('year', date.get('year') - 1);
};

export const getDateTimeUTCTimestamp = (unixDateString: string) => {
  const localeDate = dayjs.utc(unixDateString).local();

  return (Date.UTC(
    localeDate.get('year'),
    localeDate.get('M'),
    localeDate.get('D'),
    localeDate.get('h'),
    localeDate.get('m'),
    localeDate.get('s'),
    localeDate.get('ms')
  ) / 1000) as UTCTimestamp;
};
