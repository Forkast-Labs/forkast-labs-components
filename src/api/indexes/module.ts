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

import { WEB_API_URL } from '../../constants/variables';
import { INDEX_DATE_TIME_FORMAT } from '../../constants/date';
import { TimeState } from '../../types/ui';
import { processResponse } from '../../api/helpers';
import { HttpClient } from '../../services/HttpClient';
import { getApiTime } from '../../helpers/ui';
import { IndexChanges, IndexHistory, IndexSummary } from './types';
import { BasicResponse } from '../types';

export const fetchIndexesSummaries = async (
  symbols: string[],
  timeState: TimeState
) => {
  const { startTime, endTime } = getApiTime(timeState);
  const startTimeString = startTime.format(INDEX_DATE_TIME_FORMAT);
  const endTimeString = endTime.format(INDEX_DATE_TIME_FORMAT);

  const url = `${WEB_API_URL}/v1/indexes/summary?symbols=${symbols.join(
    ','
  )}&startAt=${startTimeString}&endAt=${endTimeString}`;

  const response = await HttpClient.get<BasicResponse<IndexSummary[]>>(url);

  return processResponse(response, (data) => data?.data);
};

export const fetchIndexesHistory = async (
  symbols: string[],
  timeState: TimeState
) => {
  const { startTime, endTime } = getApiTime(timeState);
  const startTimeString = startTime.format(INDEX_DATE_TIME_FORMAT);
  const endTimeString = endTime.format(INDEX_DATE_TIME_FORMAT);
  const url = `${WEB_API_URL}/v1/indexes/charts?symbols=${symbols.join(
    ','
  )}&startAt=${startTimeString}&endAt=${endTimeString}`;

  const response = await HttpClient.get<BasicResponse<IndexHistory[]>>(url);

  return processResponse(response, (data) => data?.data);
};

export const fetchIndexChanges = async (
  symbol: string,
  timeState: TimeState
) => {
  const { startTime, endTime } = getApiTime(timeState);
  const startTimeString = startTime.format(INDEX_DATE_TIME_FORMAT);
  const endTimeString = endTime.format(INDEX_DATE_TIME_FORMAT);
  const url = `${WEB_API_URL}/v1/indexes/basis-price-changes?symbol=${symbol}&startAt=${startTimeString}&endAt=${endTimeString}&numIncreases=5&numDecreases=5`;

  const response = await HttpClient.get<BasicResponse<IndexChanges>>(url);

  return processResponse(response, (data) => data?.data);
};

export const exportIndexesHistory = async (
  symbols: string[],
  timeState: TimeState
) => {
  try {
    const { startTime, endTime } = getApiTime(timeState);
    const formattedStartTime = startTime.format(INDEX_DATE_TIME_FORMAT);
    const formattedEndTime = endTime.format(INDEX_DATE_TIME_FORMAT);

    const url = `${WEB_API_URL}/v1/indexes/csv/history?symbols=${symbols.join(
      ','
    )}&startAt=${formattedStartTime}&endAt=${formattedEndTime}`;
    const response = await HttpClient.get(url, 'text/csv');

    if (response.status !== 200) {
      throw new Error('Failed to load');
    }

    response.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.setAttribute(
        'download',
        `${symbols.join(
          ','
        )}(${formattedStartTime} - ${formattedEndTime}) - UTC.csv`
      );
      a.click();
    });
  } catch (error) {
    console.error('Failed to export csv', error);
  }
};
