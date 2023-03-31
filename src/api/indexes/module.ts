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

export const fetchIndexesSummaries = async (
  symbol: string,
  timeState: TimeState
) => {
  const { startTime, endTime } = getApiTime(timeState);
  const startTimeString = startTime.format(INDEX_DATE_TIME_FORMAT);
  const endTimeString = endTime.format(INDEX_DATE_TIME_FORMAT);

  const url = `${WEB_API_URL}/indexes/summaries/?Symbols=${symbol}&StartTime=${startTimeString}&EndTime=${endTimeString}&InterimValues=true`;

  console.log('[Index info API request]:', url);

  const response = await HttpClient.get<IndexSummary[]>(url);

  return processResponse(response, (data) => data);
};

export const fetchIndexesHistory = async (
  symbol: string,
  timeState: TimeState
) => {
  const { startTime, endTime } = getApiTime(timeState);
  const startTimeString = startTime.format(INDEX_DATE_TIME_FORMAT);
  const endTimeString = endTime.format(INDEX_DATE_TIME_FORMAT);
  const url = `${WEB_API_URL}/indexes/history/?Symbols=${symbol}&StartTime=${startTimeString}&EndTime=${endTimeString}&InterimValues=true`;

  console.log('[Index info API request]:', url);

  const response = await HttpClient.get<IndexHistory[]>(url);

  return processResponse(response, (data) => data);
};

export const fetchIndexChanges = async (
  symbol: string,
  timeState: TimeState
) => {
  const { startTime, endTime } = getApiTime(timeState);
  const startTimeString = startTime.format(INDEX_DATE_TIME_FORMAT);
  const endTimeString = endTime.format(INDEX_DATE_TIME_FORMAT);
  const url = `${WEB_API_URL}/indexes/basis-price-changes/?Symbol=${symbol}&StartTime=${startTimeString}&EndTime=${endTimeString}&NumIncreases=5&NumDecreases=5`;

  console.log('[Change Index info API request]:', url);

  const response = await HttpClient.get<IndexChanges>(url);

  return processResponse(response, (data) => data);
};

export const exportIndexesHistory = async (
  symbol: string,
  timeState: TimeState
) => {
  try {
    const { startTime, endTime } = getApiTime(timeState);
    const formattedStartTime = startTime.format(INDEX_DATE_TIME_FORMAT);
    const formattedEndTime = endTime.format(INDEX_DATE_TIME_FORMAT);

    const url = `${WEB_API_URL}/indexes/csv/history?Symbols=${symbol}&StartTime=${formattedStartTime}&EndTime=${formattedEndTime}&InterimValues=true`;
    const response = await fetch(url, {
      headers: new Headers({ 'Content-Type': 'text/csv' }),
    });

    response.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.setAttribute(
        'download',
        `${symbol}(${formattedStartTime} - ${formattedEndTime}) - UTC.csv`
      );
      a.click();
    });
  } catch (error) {
    console.error('Failed to export csv', error);
  }
};
