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

import React, { useState } from 'react';
import classNames from 'classnames';
import {
  DEFAULT_TIME_RANGE,
  TIME_RANGE,
  TIME_WITH_REFETCH,
} from '../../constants/ui';
import { useIndexesSummaries } from '../../api/indexes';
import { getChangeState } from '../../helpers/ui';
import { useTheme } from '../../hooks/useTheme';
import { QueryProvider } from '../../components/common/QueryProvider/QueryProvider';
import UserTime from '../../components/common/UserTime/UserTime';
import { Menu } from '../../components/common/Menu/Menu';
import { Info } from '../../components/common/ui/icons';
import { Tooltip } from '../../components/common/Tooltip/Tooltip';
import { Content } from './Content/Content';
import Chart from './Chart/Chart';
import { Promo } from './Promo/Promo';
import { ContentError } from './ContentError/ContentError';
import { IndexProps } from './Index.types';

const IndexUI: React.FC<IndexProps> = ({ symbol }) => {
  const [timeRange, setTimeRange] = useState(DEFAULT_TIME_RANGE);
  const { colors } = useTheme();

  const { data, isLoading, isError, dataUpdatedAt, refetch } =
    useIndexesSummaries({
      symbol,
      timeState: { timeRange, custom: null },
      shouldRefetch: TIME_WITH_REFETCH.includes(timeRange),
    });

  if (isError) {
    return (
      <div
        className={classNames(
          'fkl-flex fkl-flex-col fkl-relative fkl-px-3 fkl-py-2 fkl-shadow-card fkl-rounded-2xl fkl-gap-1 fkl-justify-between',
          'sm:fkl-px-6 sm:fkl-py-3 sm:fkl-gap-2',
          'md:fkl-px-8 md:fkl-py-4'
        )}
        style={{ backgroundColor: colors.background }}
      >
        <ContentError reload={refetch} />
      </div>
    );
  }

  const indexInfo = data?.[0];

  return (
    <div
      className={classNames(
        'fkl-flex fkl-flex-col fkl-relative fkl-px-3 fkl-py-2 fkl-shadow-card fkl-rounded-2xl fkl-gap-1 fkl-justify-between',
        'sm:fkl-px-6 sm:fkl-py-3 sm:fkl-gap-2',
        'md:fkl-px-8 md:fkl-py-4'
      )}
      style={{ backgroundColor: colors.background }}
    >
      <div className="fkl-flex fkl-flex-row fkl-justify-end">
        <Menu items={TIME_RANGE} selected={timeRange} onClick={setTimeRange}>
          {TIME_RANGE.find((range) => range.id === timeRange)?.title ?? ''}
        </Menu>
      </div>

      <Content info={indexInfo} isLoading={isLoading} />

      <div className="fkl-h-[100px] fkl-hidden md:fkl-block">
        <Chart
          symbol={symbol}
          timeRange={timeRange}
          title={indexInfo?.name ?? ''}
          state={getChangeState(indexInfo?.percentChange ?? 0)}
        />
      </div>
      <div className="fkl-h-[100px] md:fkl-hidden">
        <Chart
          symbol={symbol}
          timeRange={timeRange}
          title={indexInfo?.name ?? ''}
          state={getChangeState(indexInfo?.percentChange ?? 0)}
          chartFontSize={8}
          chartHeight={80}
        />
      </div>

      <div
        className={classNames(
          'fkl-flex fkl-flex-row fkl-gap-4 fkl-items-center fkl-justify-between fkl-text-[6px] fkl-leading-[8px]',
          'sm:fkl-text-[9px] sm:fkl-leading-[12px]',
          'md:fkl-text-[12px] md:fkl-leading-[15px]'
        )}
        style={{ color: colors.text }}
      >
        <div
          className={classNames(
            'fkl-flex fkl-flex-row fkl-items-center fkl-gap-2'
          )}
        >
          <Tooltip content={indexInfo?.description}>
            <div className="fkl-flex fkl-flex-row fkl-items-center fkl-gap-2">
              <div>What&apos;s this?</div>
              <Info />
            </div>
          </Tooltip>
          <Promo />
        </div>
        <div className="fkl-flex fkl-flex-row fkl-gap-1">
          {isLoading ? (
            <div
              className={
                'fkl-bg-grey fkl-animate-pulse fkl-rounded-3xl fkl-h-[15px] fkl-w-36'
              }
            />
          ) : (
            <UserTime timestamp={dataUpdatedAt} />
          )}
        </div>
      </div>
    </div>
  );
};

export const Index: React.FC<IndexProps> = (props) => (
  <QueryProvider>
    <IndexUI {...props} />
  </QueryProvider>
);
