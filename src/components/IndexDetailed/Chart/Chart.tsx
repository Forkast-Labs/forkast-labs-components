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

import React from 'react';
import SeriesChart from '../../../components/common/Chart/SeriesChart/SeriesChart';
import { ChartTooltip } from '../../../components/common/Chart';
import { ChangeState, TimeState } from '../../../types/ui';
import { useIndexesHistory } from '../../../api/indexes';
import { getDateTimeUTCTimestamp } from '../../../helpers/lightweight-chart';
import { formatLargeNumber } from '../../../utils/formatting';
import { DEFAULT_CHART_HEIGHT } from './config';

type Props = {
  title: string;
  symbol: string;
  timeState: TimeState;
  state: ChangeState;
  onPointHover?: (timestamp: number | null) => void;
};

export const Chart: React.FunctionComponent<Props> = React.memo(
  ({ title, symbol, timeState, state, onPointHover }) => {
    const { data: indexHistory, isLoading } = useIndexesHistory({
      symbols: [symbol],
      timeState,
    });

    return (
      <SeriesChart
        chartHeight={DEFAULT_CHART_HEIGHT}
        type="Area"
        data={[
          {
            lineData:
              indexHistory?.map((item) => ({
                time: getDateTimeUTCTimestamp(item.timeAt),
                value: item.value,
              })) ?? [],
            priceFormat: {
              type: 'price',
              minMove: 1,
              precision: 0,
            },
            trend: state === 'negative' ? 'negative' : 'positive',
          },
        ]}
        isLoading={isLoading}
        chartOptions={{ isVisibleGrid: false, hasWatermark: true }}
        tooltipComponent={(props) => (
          <ChartTooltip
            {...props}
            title={title}
            formatValue={(value) => formatLargeNumber(value, true)}
          />
        )}
        onPointHover={onPointHover}
      />
    );
  }
);
