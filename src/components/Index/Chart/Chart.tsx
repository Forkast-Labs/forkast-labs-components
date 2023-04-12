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
import numbro from 'numbro';
import { ChangeState, PossibleTimeRanges } from '../../../types/ui';
import { useIndexesHistory } from '../../../api/indexes';
import { formatLargeNumber } from '../../../utils/formatting';
import { getDateTimeUTCTimestamp } from '../../../helpers/lightweight-chart';
import SeriesChart from '../../../components/common/Chart/SeriesChart/SeriesChart';
import { ChartTooltip } from '../../../components/common/Chart';

type Props = {
  symbol: string;
  title: string;
  timeRange: PossibleTimeRanges;
  state: ChangeState;
  chartFontSize?: number;
  chartHeight?: number;
};

export const Chart: React.FunctionComponent<Props> = ({
  symbol,
  title,
  timeRange,
  state,
  chartFontSize,
  chartHeight = 100,
}) => {
  const { data, isLoading } = useIndexesHistory({
    symbols: [symbol],
    timeState: { timeRange, custom: null },
  });

  return (
    <SeriesChart
      chartHeight={chartHeight}
      type="Area"
      data={[
        {
          lineData:
            data?.map((item) => ({
              time: getDateTimeUTCTimestamp(item.timeAt),
              value: item.value,
            })) ?? [],
          priceFormat: {
            type: 'custom',
            formatter: (price: number) =>
              `${numbro(price).format({
                average: true,
                mantissa: 2,
                optionalMantissa: true,
              })}`,
          },
          trend: state === 'negative' ? 'negative' : 'positive',
        },
      ]}
      isLoading={isLoading}
      tooltipComponent={(props) => (
        <ChartTooltip
          {...props}
          title={title}
          formatValue={(value) => formatLargeNumber(value, true)}
        />
      )}
      chartOptions={{
        isVisibleGrid: false,
        isVisibleLeftPriceScale: false,
        fontSize: chartFontSize,
      }}
    />
  );
};

export default React.memo(Chart);
