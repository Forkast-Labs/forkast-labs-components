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
