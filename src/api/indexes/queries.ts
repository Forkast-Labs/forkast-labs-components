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

import { QueryClient, useQuery } from 'react-query';
import { TimeState } from '../../types/ui';
import {
  fetchIndexChanges,
  fetchIndexesHistory,
  fetchIndexesSummaries,
} from './module';

export enum QueryKeys {
  INDEXES_SUMMARIES = 'indexes-summaries',
  INDEXES_HISTORY = 'indexes-history',
  INDEX_CHANGES = 'index-changes',
}

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;

export const useIndexesSummaries = ({
  symbol,
  timeState,
  shouldRefetch = false,
}: {
  symbol: string;
  timeState: TimeState;
  shouldRefetch?: boolean;
}) =>
  useQuery(
    [QueryKeys.INDEXES_SUMMARIES, symbol, timeState],
    () => fetchIndexesSummaries(symbol, timeState),
    {
      staleTime: FIVE_MINUTES_IN_MS,
      refetchInterval: shouldRefetch ? FIVE_MINUTES_IN_MS : false,
      keepPreviousData: true,
    }
  );

export const prefetchIndexesSummaries = ({
  symbol,
  timeState,
  queryClient,
}: {
  symbol: string;
  timeState: TimeState;
  queryClient: QueryClient;
}) =>
  queryClient.fetchQuery(
    [QueryKeys.INDEXES_SUMMARIES, symbol, timeState],
    () => fetchIndexesSummaries(symbol, timeState),
    { staleTime: FIVE_MINUTES_IN_MS }
  );

export const useIndexesHistory = ({
  symbol,
  timeState,
}: {
  symbol: string;
  timeState: TimeState;
}) =>
  useQuery(
    [QueryKeys.INDEXES_HISTORY, symbol, timeState],
    () => fetchIndexesHistory(symbol, timeState),
    {
      staleTime: Infinity,
    }
  );

export const prefetchIndexesHistory = ({
  symbol,
  timeState,
  queryClient,
}: {
  symbol: string;
  timeState: TimeState;
  queryClient: QueryClient;
}) =>
  queryClient.fetchQuery(
    [QueryKeys.INDEXES_HISTORY, symbol, timeState],
    () => fetchIndexesHistory(symbol, timeState),
    { staleTime: Infinity }
  );

export const useIndexChanges = ({
  symbol,
  timeState,
}: {
  timeState: TimeState;
  symbol: string;
}) =>
  useQuery(
    [QueryKeys.INDEX_CHANGES, symbol, timeState],
    () => fetchIndexChanges(symbol, timeState),
    {
      staleTime: Infinity,
    }
  );
